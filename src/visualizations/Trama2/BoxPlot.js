import ReactDOM from 'react-dom'
import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
  useLayoutEffect,
  forwardRef,
} from 'react'
import { scaleLinear } from 'd3-scale'
import { zoom } from 'd3-zoom'
import { select, selectAll, event as currentEvent } from 'd3-selection'

import head from 'lodash/head'
import _last from 'lodash/last'
import uniqBy from 'lodash/uniqBy'
import minBy from 'lodash/minBy'
import maxBy from 'lodash/maxBy'

import { motivoExtent } from './utils'
import BoxPlotGradientsDefinitions from './BoxPlotGradientsDefinitions'
import Brush from './Brush'

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
    showBoxInOpacity,
  }) => {
    const handleClickRacconto = useCallback(
      (e) => {
        onRaccontoClick(data, e)
      },
      [onRaccontoClick, data]
    )

    const bottom = yScale(data.min.ordineMotivo)
    const top = yScale(data.max.ordineMotivo)
    const h = bottom - top

    const fill = itemSelected ? `url("#${data.racconto.titolo}")` : '#ddd'
    const widthBar = 5 * zoomFactor

    return (
      <g>
        {itemSelected && (
          <text
            style={{ transform: 'rotate(-30deg)', fontSize: 12 }}
            x={0}
            y={0}
          >
            {data.racconto.titolo}
          </text>
        )}
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

        {itemSelected && showBoxInOpacity && (
          <g>
            <rect
              width={widthBar}
              className="trama2-box-plot-partial-hide-bar"
              y={top}
              height={
                Math.min(
                  yScale(data.first.ordineMotivo),
                  yScale(data.last.ordineMotivo)
                ) - top
              }
            />
            <rect
              width={widthBar}
              className="trama2-box-plot-partial-hide-bar"
              y={Math.max(
                yScale(data.first.ordineMotivo),
                yScale(data.last.ordineMotivo)
              )}
              height={
                bottom -
                Math.max(
                  yScale(data.first.ordineMotivo),
                  yScale(data.last.ordineMotivo)
                )
              }
            />
          </g>
        )}

        {data.first.ordineMotivo === data.last.ordineMotivo ? (
          <rect
            width={widthBar}
            height={widthBar}
            style={{
              transformOrigin: `0px ${
                yScale(data.first.ordineMotivo) + widthBar / 4
              }px`,
              transform: `rotate(45deg)`,
            }}
            className="trama2-box-plot-same-start-end-symbol"
            y={yScale(data.first.ordineMotivo) - widthBar / 2}
          ></rect>
        ) : (
          <g>
            <rect
              width={widthBar}
              height={widthBar}
              style={{ fill: '#fff', stroke: '#000' }}
              y={yScale(data.first.ordineMotivo) - widthBar / 2}
            ></rect>
            <rect
              width={widthBar}
              height={widthBar}
              style={{ fill: '#ddd', stroke: '#000' }}
              y={yScale(data.last.ordineMotivo) - widthBar / 2}
            ></rect>
          </g>
        )}
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

  const actualScaleX = useRef(null)

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

      actualScaleX.current = scaleX
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
          setYears((prevYears) => {
            const newYears = [racconti[lowIndex].anno, racconti[hiIndex].anno]
            if (newYears[0] !== prevYears[0] || newYears[1] !== prevYears[1]) {
              return newYears
            }
            return prevYears
          })
        })
        actualScaleX.current = newScaleX
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
    return scaleLinear()
      .domain(motivoExtent)
      .range([height - 140, 0])
  }, [height])

  const scalaMotivo = useMemo(() => {
    return scaleLinear().domain(motivoExtent).range([0, 1])
  }, [])

  const [dataRacconti, dataByRacconti, gradientsType] = useMemo(() => {
    if (!yScale) {
      return [[], []]
    }
    const finalDataByRacconti = {}
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
      finalDataByRacconti[racconto.titolo] = out
      gradientsSet.add(out)

      out.racconto = racconto

      return out
    })
    return [finalDataRacconti, finalDataByRacconti, Array.from(gradientsSet)]
  }, [data, racconti, tipologieByTipologia, yScale])

  const handleNexPoint = useCallback(
    (x, setX) => {
      const widthBar = 5 * zoomFactor
      const scaleX = actualScaleX.current
      const nextPoints = Object.keys(selected).reduce((acc, titolo) => {
        const dataTrama = dataByRacconti[titolo]
        const realX = scaleX(dataTrama.index)
        if (realX > x - widthBar / 2) {
          acc.push(realX)
        }
        return acc
      }, [])
      if (nextPoints.length) {
        setX(Math.min(...nextPoints) + widthBar / 2)
      }
    },
    [dataByRacconti, selected, zoomFactor]
  )

  const handlePrevPoint = useCallback(
    (x, setX) => {
      const widthBar = 10 * zoomFactor
      const scaleX = actualScaleX.current
      const nextPoints = Object.keys(selected).reduce((acc, titolo) => {
        const dataTrama = dataByRacconti[titolo]
        const realX = scaleX(dataTrama.index)
        if (realX < x - widthBar / 2) {
          acc.push(realX)
        }
        return acc
      }, [])
      if (nextPoints.length) {
        console.log('PREV', nextPoints, x)
        setX(Math.max(...nextPoints) + widthBar / 2)
      }
    },
    [dataByRacconti, selected, zoomFactor]
  )

  const [years, setYears] = useState([
    racconti[0].anno,
    racconti[racconti.length - 1].anno,
  ])

  const [showBoxInOpacity, setShowBoxInOpacity] = useState(false)

  return (
    <div className="trama2-boxplot-content">
      <div
        ref={containerRef}
        className="w-100 h-100"
        style={{ overflow: 'hidden' }}
      >
        <button
          onClick={() => setShowBoxInOpacity(!showBoxInOpacity)}
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
          }}
        >
          Toggle Box Opacity
        </button>
        {measures && (
          <svg
            style={{
              height: height,
              width: measures.width,
            }}
            ref={svgRef}
          >
            <BoxPlotGradientsDefinitions
              byTipologia={tipologieByTipologia}
              gradientsType={gradientsType}
              scalaMotivo={scalaMotivo}
              height={height}
            />
            <g className="wrapper" style={{ transform: 'translate(0, 80px)' }}>
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
                        showBoxInOpacity={showBoxInOpacity}
                        zoomFactor={zoomFactor}
                        onRaccontoClick={onRaccontoClick}
                        scalaColore={scalaColore}
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
      {/* {measures && (
        <Brush
          className='trama2-brush-for-detail'
          width={measures.width}
          onNextClick={handleNexPoint}
          onPrevClick={handlePrevPoint}
        />
      )} */}
      {/* <div className="trama2-box-plot-year">
        <div>{years[0]}</div>
        <div>Testi per ordine cronologico</div>
        <div>{years[1]}</div>
      </div> */}
    </div>
  )
}

export default forwardRef(BoxPlot)
