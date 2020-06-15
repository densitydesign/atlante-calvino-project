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

import { splitPath } from './utils'
import GradientsDefinitions from './GradientsDefinitions'
import RaccontoInfoBoxSvg from './RaccontoInfoBoxSvg'
import Brush, { BRUSH_HANDLE_WIDTH } from './Brush'

const lineGenerator = line()
  .x((d) => d.x)
  .y((d) => d.y)
  .curve(curveMonotoneX)

const SubPathsWithColors = React.memo(({ subPaths, data, itemSelected }) => {
  return (
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
    </g>
  )
})

const TramaPoints = React.memo(({ data }) => {
  return (
    <g>
      {data.map((d, i) => {
        if (i === 0) {
          return (
            <rect key={i} x={d.x} y={d.y} className="trama2-start-symbol">
              <title>{d.motivo_type}</title>
            </rect>
          )
        }
        if (i === data.length - 1) {
          return (
            <rect
              key={i}
              x={d.x}
              y={d.y}
              style={{
                transformOrigin: `${d.x - 2}px ${d.y - 2}px`,
              }}
              className="trama2-end-symbol"
            >
              <title>{d.motivo_type}</title>
            </rect>
          )
        }
        return (
          <circle className="trama2-circle" key={i} cx={d.x} cy={d.y} r={2}>
            <title>{d.motivo_type}</title>
          </circle>
        )
      })}
    </g>
  )
})

const LineaTrama = React.memo(
  ({
    racconto,
    data,
    xScale,
    selectedPoint,
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
        <SubPathsWithColors
          subPaths={subPaths}
          data={data}
          itemSelected={itemSelected}
        />
        <path
          d={d}
          onClick={() => toggleItem(racconto.titolo)}
          className={`trama2-pointer ${itemSelected ? 'selected' : ''}`}
        ></path>

        {itemSelected && (
          <g>
            <TramaPoints data={data} />
            <RaccontoInfoBoxSvg
              onClick={handleClickRacconto}
              y={-10}
              x={width}
              titolo={`${data.racconto.titolo}, ${data.racconto.anno}`}
            />
          </g>
        )}
        {selectedPoint && (
          <g>
            <text
              style={{
                transformOrigin: `${selectedPoint.x}px ${selectedPoint.y}px`,
                transform: `rotate(-30deg) translateX(-10px)`,
              }}
              x={selectedPoint.x}
              y={selectedPoint.y}
              textAnchor={'end'}
            >
              {selectedPoint.motivo_type}
            </text>
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

const SelectedContainers = React.memo(({ n }) => {
  return (
    <g>
      {range(n).map((i) => (
        <g key={i} className="linea-container-selected" />
      ))}
    </g>
  )
})

const LineeTramaList = React.memo(({
  measures,
  dataRacconti,
  currentXHoverRacconti,
  racconti,
  onRaccontoClick,
  height,
  scalaColore,
  scalaMotivoY,
  selected,
  toggleSelect,
  xScale,
}) => {
  return (
    <g>
      {dataRacconti.map((datum, i) => {
        return (
          <g key={i} className="linea-container">
            <LineaTrama
              selectedPoint={
                currentXHoverRacconti &&
                currentXHoverRacconti[racconti[i].titolo]
                  ? currentXHoverRacconti[racconti[i].titolo]
                  : null
              }
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
    </g>
  )
})

function LineeTramaWithMeasures({
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
  measures,
}) {
  const svgRef = useRef(null)

  useEffect(() => {
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

      function handleZoom() {
        const newScaleY = currentEvent.transform.rescaleY(scaleY)
        imperativeTranslate(newScaleY)

        const domain = newScaleY.domain()
        const lowIndex = Math.max(0, Math.floor(domain[0]))
        const hiIndex = Math.min(racconti.length - 1, Math.floor(domain[1]))

        setYears((prevYears) => {
          const newYears = [racconti[lowIndex].anno, racconti[hiIndex].anno]
          if (newYears[0] !== prevYears[0] || newYears[1] !== prevYears[1]) {
            return newYears
          }
          return prevYears
        })
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

  const [dataRacconti, dataByRacconti, gradientsType] = useMemo(() => {
    if (!xScale) {
      return [[], []]
    }
    const dataByRaccontiFinal = {}
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
      dataByRaccontiFinal[racconto.titolo] = out
      return out
    })
    return [finalDataRacconti, dataByRaccontiFinal, Array.from(gradientsSet)]
  }, [data, racconti, xScale, tipologieByTipologia])

  const [x, setX] = useState(measures.width - BRUSH_HANDLE_WIDTH / 2)

  const handleNexPoint = useCallback(() => {
    const nextPoints = Object.keys(selected).reduce((acc, titolo) => {
      const dataTrama = dataByRacconti[titolo]
      dataTrama.forEach((datum) => {
        if (datum.x > x + BRUSH_HANDLE_WIDTH / 2) {
          acc.push(datum.x)
        }
      })
      return acc
    }, [])
    if (nextPoints.length) {
      const nextX = Math.min(...nextPoints) - BRUSH_HANDLE_WIDTH / 2
      if (nextX >= 0 && x <= measures.width - BRUSH_HANDLE_WIDTH / 2) {
        setX(nextX)
      }
    }
  }, [dataByRacconti, measures, selected, x])

  const handlePrevPoint = useCallback(() => {
    const nextPoints = Object.keys(selected).reduce((acc, titolo) => {
      const dataTrama = dataByRacconti[titolo]
      dataTrama.forEach((datum) => {
        if (datum.x < x + BRUSH_HANDLE_WIDTH / 2) {
          acc.push(datum.x)
        }
      })
      return acc
    }, [])
    if (nextPoints.length) {
      const nextX = Math.max(...nextPoints) - BRUSH_HANDLE_WIDTH / 2
      if (nextX >= 0 && x <= measures.width - BRUSH_HANDLE_WIDTH / 2) {
        setX(nextX)
      }
    }
  }, [dataByRacconti, selected, measures, x])

  const trameByPoints = useMemo(() => {
    return Object.keys(selected).reduce((acc, titolo) => {
      const racconto = dataByRacconti[titolo]
      racconto.forEach((datum) => {
        const xKey = datum.x.toFixed(0)
        acc[xKey] = acc[xKey] || {}
        acc[xKey][titolo] = {
          motivo_type: datum.motivo_type,
          x: datum.x,
          y: datum.y,
        }
      })
      return acc
    }, {})
  }, [selected, dataByRacconti])

  const xPoint = +x.toFixed(0) + BRUSH_HANDLE_WIDTH / 2
  const currentXHoverRacconti = trameByPoints[xPoint]

  return (
    <>
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
          <LineeTramaList
            measures={measures}
            dataRacconti={dataRacconti}
            currentXHoverRacconti={currentXHoverRacconti}
            racconti={racconti}
            onRaccontoClick={onRaccontoClick}
            height={height}
            scalaColore={scalaColore}
            scalaMotivoY={scalaMotivoY}
            selected={selected}
            toggleSelect={toggleSelect}
            xScale={xScale}
          />
          <SelectedContainers n={dataRacconti.length} />
        </g>
      </svg>
      <Brush
        x={x}
        onXChange={setX}
        onPrevClick={handlePrevPoint}
        onNextClick={handleNexPoint}
        width={measures.width}
        className="trama2-brush-for-list"
      />
      <div className="trama2-brush-legend-list">
        <div>Inizio del testo</div>
        <div>Lunghezza del testo in caratteri</div>
        <div>Fine del testo</div>
      </div>
    </>
  )
}

function LineeTrama(props, ref) {
  const containerRef = useRef(null)
  const [measures, setMeasures] = useState(null)

  useLayoutEffect(() => {
    const m = containerRef.current.getBoundingClientRect()
    setMeasures(m)
  }, [])

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
      {measures && <LineeTramaWithMeasures {...props} measures={measures} />}
    </div>
  )
}

export default React.memo(forwardRef(LineeTrama))
