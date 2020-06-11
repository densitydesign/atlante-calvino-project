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

import { splitPath } from './utils'
import GradientsDefinitions from './GradientsDefinitions'

const lineGenerator = line()
  .x((d) => d.x)
  .y((d) => d.y)
  .curve(curveMonotoneX)

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

const LineaTrama = React.memo(
  ({
    racconto,
    data,
    xScale,
    width,
    height,
    index,
    gradient,
    itemSelected,
    toggleItem,
    onRaccontoClick,
  }) => {
    const [d, subPaths] = useMemo(() => {
      const d = lineGenerator(data)
      const subPaths = splitPath(d)
      return [d, subPaths]
    }, [data])

    const handleClickRacconto = useCallback(
      (e) => {
        onRaccontoClick(data, e)
      },
      [onRaccontoClick, data]
    )

    const element = (
      <g>
        {subPaths.map((subPath, i) => {
          const isFill = data[i + 1].motivo_type === data[i].motivo_type
          const strokeSelected = isFill
            ? data[i].colori
            : `url('#${data[i + 1].motivo_type}-${data[i].motivo_type}')`
          return (
            <path
              key={i}
              d={subPath}
              className="trama2-line"
              style={{
                stroke: itemSelected ? strokeSelected : '#ddd',
                fill: 'none',
              }}
            ></path>
          )
        })}

        <path
          d={d}
          onClick={() => toggleItem(racconto.titolo)}
          className={`trama2-pointer ${itemSelected ? 'selected' : ''}`}
        ></path>

        {itemSelected && (
          <g>
            {data.map((d, i) => {
              if (i === 0) {
                return (
                  <rect
                    x={d.x}
                    y={d.y}
                    key={i}
                    className="trama2-start-symbol"
                  >
                    <title>{d.motivo_type}</title>
                  </rect>
                )
              }
              if (i === data.length - 1) {
                return (
                  <rect
                    x={d.x}
                    y={d.y}
                    key={i}
                    style={{
                      transformOrigin: `${d.x - 2}px ${d.y - 2}px`
                    }}
                    className="trama2-end-symbol"
                  >
                    <title>{d.motivo_type}</title>
                  </rect>
                )
              }
              return (
                <circle
                  key={i}
                  className="trama2-circle"
                  cx={d.x}
                  cy={d.y}
                  r={2}
                >
                  <title>{d.motivo_type}</title>
                </circle>
              )
            })}
            <RaccontoInfoBox
              onClick={handleClickRacconto}
              y={-10}
              x={width}
              titolo={`${data.racconto.titolo}, ${data.racconto.anno}`}
            />
          </g>
        )}
      </g>
    )
    if (itemSelected) {
      return ReactDOM.createPortal(
        element,
        document.getElementsByClassName('linea-container-selected')[index]
      )
    }
    return element
  }
)

const SelectedContainers = React.memo(({ n, translations }) => {
  return (
    <g>
      {range(n).map((i) => (
        <g
          key={i}
          className="linea-container-selected"
          style={{
            transform: translations[i],
          }}
        />
      ))}
    </g>
  )
})

function LineeTrama(
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
    setYears,
  },
  ref
) {
  const containerRef = useRef(null)
  const svgRef = useRef(null)
  const [measures, setMeasures] = useState(null)
  const [translations, setTranslations] = useState([])

  useLayoutEffect(() => {
    const m = containerRef.current.getBoundingClientRect()
    setMeasures(m)
  }, [])

  useEffect(() => {
    function declarativeTranslate(currentScaleY) {
      const newTranslates = racconti.map((r, i) => {
        return 'translate(0, ' + currentScaleY(i) + 'px)'
      })
      setTranslations(newTranslates)
    }

    function imperativeTranslate(currentScaleY) {
      selectAll('.linea-container').attr(
        'transform',
        (d, i) => 'translate(0, ' + currentScaleY(i) + ')'
      )
      selectAll('.linea-container-selected').attr(
        'transform',
        (d, i) => 'translate(0, ' + currentScaleY(i) + ')'
      )
    }

    if (measures) {
      const svg = svgRef.current
      const scaleY = scaleLinear()
        .domain([0, racconti.length])
        .range([0 + height, measures.height - height])

      imperativeTranslate(scaleY)
      // declarativeTranslate(scaleY)

      function handleZoom() {
        const newScaleY = currentEvent.transform.rescaleY(scaleY)
        imperativeTranslate(newScaleY)
        // declarativeTranslate(newScaleY)

        const domain = newScaleY.domain()
        const lowIndex = Math.max(0, Math.floor(domain[0]))
        const hiIndex = Math.min(racconti.length - 1, Math.floor(domain[1]))

        setYears([racconti[lowIndex].anno, racconti[hiIndex].anno])
      }

      const selection = select(svg)
      selection.call(
        zoom()
          .scaleExtent([1, 10])
          .translateExtent([
            [0, 0],
            [measures.width, measures.height],
          ])
          .on('zoom', handleZoom)
      )
      return () => {
        selection.on('.zoom', null)
      }
    }
  }, [height, measures, racconti, setYears])

  const xScale = useMemo(() => {
    if (!measures) {
      return null
    }
    return scaleLinear().domain([0, 1]).range([0, measures.width])
  }, [measures])

  const [dataRacconti, gradientsType] = useMemo(() => {
    if (!xScale) {
      return [[], []]
    }
    const gradientsSet = new Set()
    const finalDataRacconti = racconti.map((racconto) => {
      let out = data[racconto.titolo].filter((d) => d.y !== undefined)
      out = out.map((d, i) => {
        if (i > 0) {
          gradientsSet.add(d.motivo_type + '-' + out[i - 1].motivo_type)
        }
        return {
          ...d,
          colori: tipologieByTipologia[d.motivo_type].colore.colori,
          originalX: d.x,
          x: xScale(d.x),
          y: d.y,
        }
      })
      out.racconto = racconto
      return out
    })
    return [finalDataRacconti, Array.from(gradientsSet)]
  }, [data, racconti, xScale, tipologieByTipologia])

  useImperativeHandle(ref, () => ({
    rotateView: (cb) => {
      cb()
      // const scaleY = scaleLinear()
      //   .domain([0, racconti.length])
      //   .range([0 + height, measures.height - height])

      // const mainTransition = selectAll('.linea-container')
      //   .transition()
      //   .duration(1000)
      //   .attr('transform', (d, i) => 'translate(0, ' + scaleY(i) + ')')
      //   .end()

      // const selectedTransition = selectAll('.linea-container-selected')
      //   .transition()
      //   .duration(1000)
      //   .attr('transform', (d, i) => 'translate(0, ' + scaleY(i) + ')')
      //   .end()

      // Promise.all([mainTransition, selectedTransition]).then(cb)
    },
  }))

  return (
    <div
      ref={containerRef}
      className="w-100 h-100"
      style={{ overflow: 'hidden' }}
    >
      {measures && (
        <svg
          style={{
            height: measures.height,
            width: measures.width,
          }}
          ref={svgRef}
        >
          <GradientsDefinitions
            byTipologia={tipologieByTipologia}
            gradientsType={gradientsType}
          />
          <g className="wrapper">
            {measures &&
              dataRacconti.map((datum, i) => {
                return (
                  <g
                    key={i}
                    className="linea-container"
                    style={{
                      transform: translations[i],
                    }}
                  >
                    <LineaTrama
                      onRaccontoClick={onRaccontoClick}
                      scalaColore={scalaColore}
                      scalaMotivoY={scalaMotivoY}
                      index={i}
                      width={measures.width}
                      height={height}
                      itemSelected={selected[racconti[i].titolo]}
                      toggleItem={toggleSelect}
                      xScale={xScale}
                      racconto={racconti[i]}
                      data={datum}
                    ></LineaTrama>
                  </g>
                )
              })}
            <SelectedContainers
              n={dataRacconti.length}
              translations={translations}
            />
          </g>
        </svg>
      )}
    </div>
  )
}

export default React.memo(forwardRef(LineeTrama))
