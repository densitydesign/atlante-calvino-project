import React, { useMemo, useRef, useLayoutEffect, useState } from 'react'
import { line, curveMonotoneX } from 'd3-shape'
import { scaleLinear } from 'd3-scale'
import { makeScalaMotivoY, splitPath } from './utils'
import GradientsDefinitions from './GradientsDefinitions'

const MOTIVO_LINE_HEIGHT_FULL_SCREEN = 600
const CHART_X_PADDING = 50
const CHART_Y_PADDING = 80

const scalaMotivoY = makeScalaMotivoY(
  MOTIVO_LINE_HEIGHT_FULL_SCREEN - CHART_Y_PADDING
)

const lineGenerator = line()
  .x((d) => d.x)
  .y((d) => d.y)
  .curve(curveMonotoneX)

export default function TramaDetail({ data, tipologieByTipologia, onBack }) {
  const [measures, setMeasures] = useState(null)

  useLayoutEffect(() => {
    const m = containerRef.current.getBoundingClientRect()
    setMeasures(m)
  }, [])

  const xScale = useMemo(() => {
    if (!measures) {
      return null
    }
    return scaleLinear()
      .domain([0, 1])
      .range([CHART_X_PADDING, measures.width - CHART_X_PADDING])
  }, [measures])

  // Re-Scale X, Y for fullscreen
  const [fullData, subPaths, gradientsType] = useMemo(() => {
    if (!xScale) {
      return [null, null, null]
    }
    const gradientsSet = new Set()
    const newData = data.reduce((acc, item, i) => {
      if (i > 0) {
        gradientsSet.add(item.motivo_type + '-' + acc[i - 1].motivo_type)
      }
      acc.push({
        ...item,
        x: xScale(item.originalX),
        y: scalaMotivoY(item.ordineMotivo),
      })
      return acc
    }, [])
    const d = lineGenerator(newData)
    const subPaths = splitPath(d)
    return [newData, subPaths, Array.from(gradientsSet)]
  }, [data, xScale])
  const containerRef = useRef(null)

  return (
    <div className="trama2-detail-content">
      <div className="trama2-detail-header d-flex justify-content-center align-items-center">
        <div className="trama2-detail-label">
          <div className="trama2-label-inner-start">
            {data.racconto.titolo}, {data.racconto.anno}
          </div>
          <div className="trama2-label-inner-end" onClick={onBack}>
            &times;
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="w-100 h-100"
        style={{ overflow: 'hidden' }}
      >
        {measures && (
          <svg
            style={{
              height: MOTIVO_LINE_HEIGHT_FULL_SCREEN + 50,
              width: measures.width,
            }}
          >
            <GradientsDefinitions
              prefix="detail__"
              byTipologia={tipologieByTipologia}
              gradientsType={gradientsType}
            />
            <g transform={`translate(0, ${CHART_Y_PADDING})`}>
              {subPaths.map((subPath, i) => {
                const isFill = data[i + 1].motivo_type === data[i].motivo_type
                const stroke = isFill
                  ? data[i].colori
                  : `url('#detail__${data[i + 1].motivo_type}-${
                      data[i].motivo_type
                    }')`
                return (
                  <path
                    key={i}
                    d={subPath}
                    className="trama2-line"
                    style={{
                      stroke: stroke,
                      fill: 'none',
                    }}
                  ></path>
                )
              })}
              <g>
                {fullData.map((d, i) => (
                  <g key={i} transform={`translate(${d.x}, ${d.y})`}>
                    <circle className="trama2-circle" r={2} />
                    <text x={5} y={-5} style={{ transform: 'rotate(-30deg)' }}>
                      {d.motivo_type}
                    </text>
                  </g>
                ))}
              </g>
            </g>
          </svg>
        )}
      </div>
    </div>
  )
}
