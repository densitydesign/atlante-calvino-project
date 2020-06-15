import ReactDOM from 'react-dom'
import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useImperativeHandle,
  forwardRef,
} from 'react'
import { line, curveMonotoneX } from 'd3-shape'
import { scaleLinear } from 'd3-scale'
import { zoom } from 'd3-zoom'
import { select, selectAll, event as currentEvent } from 'd3-selection'

import range from 'lodash/range'
import keyBy from 'lodash/keyBy'
import head from 'lodash/head'
import _last from 'lodash/last'
import uniqBy from 'lodash/uniqBy'
import minBy from 'lodash/minBy'
import maxBy from 'lodash/maxBy'


import { splitPath, motivoExtent, makeScalaMotivoY } from './utils'
import BoxPlotGradientsDefinitions from './BoxPlotGradientsDefinitions'

const RaccontoInfoBox = ({ titolo, x, y = 0, onClick }) => {
  const containerRef = useRef(null)
  const [measures, setMeasures] = useState(null)
  useLayoutEffect(() => {
    const m = containerRef.current.getBoundingClientRect()
    setMeasures(m)
  }, [titolo])

  return (
    <g
      onClick={onClick}
      transform={`translate(${x}, ${y})`}
      style={{ cursor: 'pointer' }}
    >
      {measures && (
        <g transform={`translate(${-measures.width - 40}, -15)`}>
          <rect
            height={22}
            width={measures.width + 35}
            rx={5}
            className="trama2-info-box"
          />
          <line
            x1={measures.width + 18}
            x2={measures.width + 18}
            y1={0}
            y2={22}
            className="trama2-info-box"
          />
          <text stroke={'var(--dark-blue)'} x={measures.width + 22} y={15}>
            o
          </text>
        </g>
      )}
      <text
        ref={containerRef}
        x={-30}
        y={0}
        style={{ textAnchor: 'end', userSelect: 'none' }}
      >
        {titolo}
      </text>
    </g>
  )
}

const BoxPlotElement = React.memo(
  ({
    zoomFactor,
    racconto,
    data,
    xScale,
    width,
    height,
    index,
    gradient,
    itemSelected,
    toggleItem,
    yScale,
    onRaccontoClick,
  }) => {
    const handleClickRacconto = useCallback(
      (e) => {
        onRaccontoClick(data, e)
      },
      [onRaccontoClick, data]
    )

    const top = yScale(data.min.ordineMotivo)
    const bottom = yScale(data.max.ordineMotivo)
    const h = bottom - top

    const fill = itemSelected ? `url("#${data.racconto.titolo}")` : '#ddd'
    const widthBar = 10 * zoomFactor

    return (
      <g>
        <rect
          width={widthBar}
          height={h}
          y={top}
          style={{ fill }}
          onClick={() => toggleItem(data.racconto.titolo)}
          stroke="#ccc"
          fillOpacity={0.6}
        >
          <title>{data.racconto.titolo}</title>
        </rect>

        <rect
          width={widthBar}
          height={widthBar}
          style={{ fill: '#fff', stroke: '#000' }}
          y={yScale(data.first.ordineMotivo)}
        ></rect>
        <rect
          width={widthBar}
          height={widthBar}
          style={{ fill: '#ddd', stroke: '#000' }}
          y={yScale(data.last.ordineMotivo)}
        ></rect>
      </g>
    )
  }
)

function BoxPlot(
  {
    racconti = [],
    data = {},
    height,
    scalaColore,
    scalaMotivoY,
    colors,
    selected,
    toggleSelect,
    onRaccontoClick,
    tipologie,
    tipologieByTipologia,
  },
  ref
) {
  const containerRef = useRef(null)
  const svgRef = useRef(null)
  const [measures, setMeasures] = useState(null)
  const [translations, setTranslations] = useState([])
  const [zoomFactor, setZoomFactor] = useState(1)

  useLayoutEffect(() => {
    const m = containerRef.current.getBoundingClientRect()
    setMeasures(m)
  }, [])

  useEffect(() => {
    function declarativeTranslate(currentScaleX) {
      const newTranslates = racconti.map((r, i) => {
        return 'translate(' + currentScaleX(i) + ', 0)'
      })
      setTranslations(newTranslates)
    }

    function imperativeTranslate(currentScaleX) {
      selectAll('.box-racconto-container').attr(
        'transform',
        (d, i) => 'translate(' + currentScaleX(i) + ', 0)'
      )
    }

    if (measures) {
      const svg = svgRef.current
      const scaleX = scaleLinear()
        .domain([0, racconti.length])
        .range([10, measures.width - 10])

      imperativeTranslate(scaleX)
      // declarativeTranslate(scaleY)

      function handleZoom() {
        const newScaleX = currentEvent.transform.rescaleX(scaleX)
        imperativeTranslate(newScaleX)
        const zoomFactor = Math.round(currentEvent.transform.k / 2)

        const domain = newScaleX.domain()
        const lowIndex = Math.max(0, Math.floor(domain[0]))
        const hiIndex = Math.min(racconti.length - 1, Math.floor(domain[1]))
        const batchUpdates = ReactDOM.unstable_batchedUpdates || ((cb) => cb())
        batchUpdates(() => {
          setZoomFactor(zoomFactor)
          setYears(prevYears => {
            const newYears = [racconti[lowIndex].anno, racconti[hiIndex].anno]
            if (newYears[0] !== prevYears[0] || newYears[1] !== prevYears[1]) {
              return newYears
            }
            return prevYears
          })
        })
        // declarativeTranslate(newScaleX)
      }

      const selection = select(svg)
      selection.call(zoom().scaleExtent([1, 5]).on('zoom', handleZoom))
      return () => {
        selection.on('.zoom', null)
      }
    }
  }, [height, measures, racconti])

  const yScale = useMemo(() => {
    return scaleLinear().domain(motivoExtent).range([0, height])
  }, [height])

  const scalaMotivo = useMemo(() => {
    return scaleLinear().domain(motivoExtent).range([0, 1])
  }, [])

  const [dataRacconti, gradientsType] = useMemo(() => {
    if (!yScale) {
      return [[], []]
    }
    const gradientsSet = new Set()
    const finalDataRacconti = racconti.map((racconto, i) => {
      let dataForRacconto = data[racconto.titolo]
        .filter((d) => d.y !== undefined)
        .map((d) => ({
          ...d,
          colori: tipologieByTipologia[d.motivo_type].colore.colori,
        }))
      let first = head(dataForRacconto)
      let last = _last(dataForRacconto)
      let uniqueItems = uniqBy(
        dataForRacconto,
        (item) => item.motivo_type
      ).sort((item) => item.ordineMotivo)
      let min = minBy(dataForRacconto, (item) => item.ordineMotivo)
      let max = maxBy(dataForRacconto, (item) => item.ordineMotivo)

      let out = {
        racconto,
        first,
        last,
        min,
        max,
        uniqueItems,
        index: i,
      }

      gradientsSet.add(out)

      out.racconto = racconto

      return out
    })
    return [finalDataRacconti, Array.from(gradientsSet)]
  }, [data, racconti, tipologieByTipologia, yScale])

  // useImperativeHandle(ref, () => ({
  //   rotateView: (cb) => {
  //     const scaleY = scaleLinear()
  //       .domain([0, racconti.length])
  //       .range([0 + height, measures.height - height])

  //     const mainTransition = selectAll('.box-racconto-container')
  //       .transition()
  //       .duration(1000)
  //       .attr('transform', (d, i) => 'translate(0, ' + scaleY(i) + ')')
  //       .end()

  //     const selectedTransition = selectAll('.box-racconto-container-selected')
  //       .transition()
  //       .duration(1000)
  //       .attr('transform', (d, i) => 'translate(0, ' + scaleY(i) + ')')
  //       .end()

  //     Promise.all([mainTransition, selectedTransition]).then(cb)
  //   },
  // }))
  const [years, setYears] = useState([
    racconti[0].anno,
    racconti[racconti.length - 1].anno,
  ])

  return (
    <div className='trama2-boxplot-content'>
      <div
        ref={containerRef}
        className="w-100 h-100"
        style={{ overflow: 'hidden' }}
      >
        {measures && (
          <svg
            style={{
              height: height + 140,
              width: measures.width,
            }}
            ref={svgRef}
          >
            <BoxPlotGradientsDefinitions
              byTipologia={tipologieByTipologia}
              gradientsType={gradientsType}
              scalaMotivo={scalaMotivo}
              height={measures.height}
            />
            <g className="wrapper" style={{ transform: 'translate(0, 70px)' }}>
              {measures &&
                dataRacconti.map((datum, i) => {
                  return (
                    <g
                      key={i}
                      className="box-racconto-container"
                      style={{
                        transform: translations[i],
                      }}
                    >
                      <BoxPlotElement
                        zoomFactor={zoomFactor}
                        onRaccontoClick={onRaccontoClick}
                        scalaColore={scalaColore}
                        scalaMotivoY={scalaMotivoY}
                        index={i}
                        width={measures.width}
                        height={measures.height}
                        itemSelected={selected[racconti[i].titolo]}
                        toggleItem={toggleSelect}
                        racconto={racconti[i]}
                        yScale={yScale}
                        data={datum}
                      ></BoxPlotElement>
                    </g>
                  )
                })}
            </g>
          </svg>
        )}
      </div>
      <div className='trama2-box-plot-year'>
        <div>{years[0]}</div>
        <div>{years[1]}</div>
      </div>
    </div>
  )
}

export default forwardRef(BoxPlot)