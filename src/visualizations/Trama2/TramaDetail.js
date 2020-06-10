import React, { useMemo, useRef, useLayoutEffect, useState } from 'react'
import { line, curveMonotoneX } from 'd3-shape'
import { makeScalaMotivoY, splitPath } from './utils'
import GradientsDefinitions from './GradientsDefinitions'

const MOTIVO_LINE_HEIGHT_FULL_SCREEN = 500

const scalaMotivoY = makeScalaMotivoY(MOTIVO_LINE_HEIGHT_FULL_SCREEN)

const lineGenerator = line()
  .x((d) => d.x)
  .y((d) => d.y)
  .curve(curveMonotoneX)

export default function TramaDetail({ data, tipologieByTipologia, onBack }) {
  // Re-Scale Y for fullscreen
  const [subPaths, gradientsType] = useMemo(() => {
    const gradientsSet = new Set()
    const newData = data.reduce((acc, item, i) => {
      if (i > 0) {
        gradientsSet.add(item.motivo_type + '-' + acc[i - 1].motivo_type)
      }
      acc.push({
        ...item,
        y: scalaMotivoY(item.ordineMotivo),
      })
      return acc
    }, [])
    const d = lineGenerator(newData)
    const subPaths = splitPath(d)
    return [subPaths, Array.from(gradientsSet)]
  }, [data])

  const containerRef = useRef(null)
  const [measures, setMeasures] = useState(null)

  useLayoutEffect(() => {
    const m = containerRef.current.getBoundingClientRect()
    setMeasures(m)
  }, [])

  return (
    <div className="trama2-content">
      <button onClick={onBack}>BACK</button>

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
          >
            <GradientsDefinitions
              prefix='detail__'
              byTipologia={tipologieByTipologia}
              gradientsType={gradientsType}
            />
            {subPaths.map((subPath, i) => {
              const isFill = data[i + 1].motivo_type === data[i].motivo_type
              const stroke = isFill
                ? data[i].colori
                : `url('#detail__${data[i + 1].motivo_type}-${data[i].motivo_type}')`
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
          </svg>
        )}
      </div>
    </div>
  )
}
