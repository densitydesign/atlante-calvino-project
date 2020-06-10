import ReactDOM from 'react-dom'
import React, {
  useRef,
  useState,
  useMemo,
  useEffect,
  useLayoutEffect,
  useImperativeHandle,
  forwardRef,
} from 'react'
import { line, curveMonotoneX } from 'd3-shape'
import { scaleLinear } from 'd3-scale'
import range from 'lodash/range'

import { zoom } from 'd3-zoom'
import { select, selectAll, event as currentEvent } from 'd3-selection'
import keyBy from 'lodash/keyBy'

const splitPath = (d) => {
  const pieces = d.split('C')
  const paths = pieces.reduce((acc, item, i) => {
    if (i === 0) {
      return acc
    }
    if (i === 1) {
      const path = pieces[0] + 'C' + pieces[i]
      acc.push(path)
    } else {
      const [a, b] = pieces[i - 1].split(',').reverse()
      const path = `M${b},${a}C${pieces[i]}`
      acc.push(path)
    }

    return acc
  }, [])

  return paths
}

const lineGenerator = line()
  .x((d) => d.x)
  .y((d) => d.y)
  .curve(curveMonotoneX)

const TramaTitoloBox = ({ titolo, x, onClick }) => {
  const containerRef = useRef(null)
  const [measures, setMeasures] = useState(null)
  useLayoutEffect(() => {
    const m = containerRef.current.getBoundingClientRect()
    setMeasures(m)
  }, [titolo])

  console.log('M.M', measures)

  return (
    <g>
      <text ref={containerRef} x={x} y={0} style={{ textAnchor: 'end' }}>
        {titolo}
      </text>
      {measures && (
        <rect
          style={{
            stroke: 'var(--dark-blue)',
            strokeWidth: 2,
          }}
          fill='transparent'
          x={x - measures.width}
          y={-15}
          rx={5}
          height={20}
          width={measures.width}
        />
      )}
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
  }) => {
    const [d, subPaths] = useMemo(() => {
      const d = lineGenerator(data)
      const subPaths = splitPath(d)
      return [d, subPaths]
    }, [data])

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
                stroke: itemSelected ? strokeSelected : '#fff',
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
            <TramaTitoloBox x={width} titolo={data.racconto.titolo} />
            {data.map((d, i) => (
              <circle key={i} className="trama2-circle" cx={d.x} cy={d.y} r={2}>
                <title>{d.motivo_type}</title>
              </circle>
            ))}
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

const GrandientsDefinitions = React.memo(({ gradientsType, byTipologia }) => {
  return (
    <defs>
      {gradientsType.map((gradientType) => {
        const [tipoFromName, tipoToName] = gradientType.split('-')
        const tipoFrom = byTipologia[tipoFromName]
        const tipoTo = byTipologia[tipoToName]
        return (
          <linearGradient
            x1="0"
            x2="0"
            y1="0"
            y2="1"
            key={gradientType}
            id={gradientType}
          >
            {+tipoFrom['ordine tipologia'] > +tipoTo['ordine tipologia'] && (
              <>
                <stop offset="0%" stopColor={tipoFrom.colore.colori}></stop>
                <stop offset="100%" stopColor={tipoTo.colore.colori}></stop>
              </>
            )}
            {+tipoFrom['ordine tipologia'] < +tipoTo['ordine tipologia'] && (
              <>
                <stop offset="0%" stopColor={tipoTo.colore.colori}></stop>
                <stop offset="100%" stopColor={tipoFrom.colore.colori}></stop>
              </>
            )}
          </linearGradient>
        )
      })}
    </defs>
  )
})

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

function LineeTrama({
  racconti = [],
  data = {},
  height,
  scalaColore,
  scalaMotivoY,
  colors,
  selected,
  toggleSelect,
  tipologie,
}, ref) {
  const containerRef = useRef(null)
  const svgRef = useRef(null)
  const [measures, setMeasures] = useState(null)
  const [translations, setTranslations] = useState([])

  useEffect(() => {
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
      }

      const selection = select(svg)
      selection.call(zoom().on('zoom', handleZoom))
      return () => {
        selection.on('.zoom', null)
      }
    }
  }, [height, measures, racconti])

  const xScale = useMemo(() => {
    if (!measures) {
      return null
    }
    return scaleLinear().domain([0, 1]).range([0, measures.width])
  }, [measures])

  const byTipologia = useMemo(() => keyBy(tipologie, 'tipologia'), [tipologie])
  const [dataRacconti, gradientsType] = useMemo(() => {
    if (!xScale) {
      return [[], []]
    }
    const grandientsSet = new Set()
    const finalDataRacconti = racconti.map((racconto) => {
      let out = data[racconto.titolo].filter((d) => d.y !== undefined)
      out = out.map((d, i) => {
        if (i > 0) {
          grandientsSet.add(d.motivo_type + '-' + out[i - 1].motivo_type)
        }
        return {
          ...d,
          colori: byTipologia[d.motivo_type].colore.colori,
          x: xScale(d.x),
          y: d.y,
        }
      })
      out.racconto = racconto
      return out
    })
    return [finalDataRacconti, Array.from(grandientsSet)]
  }, [data, racconti, xScale, byTipologia])
  

  useImperativeHandle(ref, () => ({
    rotateView: (cb) => {
      const scaleY = scaleLinear()
        .domain([0, racconti.length])
        .range([0 + height, measures.height - height])
      
        
        const mainTransition = selectAll('.linea-container')
        .transition()
        .duration(1000)
        .attr(
          'transform',
          (d, i) => 'translate(0, ' + scaleY(i) + ')'
        ).end()

        const selectedTransition = selectAll('.linea-container-selected')
        .transition()
        .duration(1000)
        .attr(
          'transform',
          (d, i) => 'translate(0, ' + scaleY(i) + ')'
        ).end()

        Promise.all([mainTransition, selectedTransition]).then(cb) 
      
    }
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
          <GrandientsDefinitions
            byTipologia={byTipologia}
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

export default forwardRef(LineeTrama)