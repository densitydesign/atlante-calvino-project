import React, { useMemo, useRef, useLayoutEffect, useState } from 'react'
import { line, curveMonotoneX } from 'd3-shape'
import { scaleLinear } from 'd3-scale'
import { makeScalaMotivoY, splitPath } from './utils'
import GradientsDefinitions from './GradientsDefinitions'
import MiniInfoBox from '../../general/MiniInfoBox'
import { groupBy, countBy, sortBy, orderBy, mapValues } from 'lodash'

const TRESHOLD_LABEL = 100
function calculateLabelScore(data, i) {
  let score = null
  const datum = data[i]
  for (let j = i + 1; j < data.length; j++) {
    const lenX = Math.abs(data[j].x - datum.x)
    const lenY = Math.abs(data[j].y - datum.y)
    const len = Math.sqrt(lenX * lenX + lenY * lenY)

    if (len < TRESHOLD_LABEL) {
      if (score === null) {
        score = parseInt(len)
      } else {
        score = Math.min(score, parseInt(TRESHOLD_LABEL - len))
      }
    }
    if (lenX > TRESHOLD_LABEL) {
      break
    }
  }
  for (let j = i - 1; j >= 0; j--) {
    const lenX = Math.abs(data[j].x - datum.x)
    const lenY = Math.abs(data[j].y - datum.y)
    const len = Math.sqrt(lenX * lenX + lenY * lenY)

    if (len < TRESHOLD_LABEL) {
      if (score === null) {
        score = parseInt(len)
      } else {
        score = Math.min(score, parseInt(TRESHOLD_LABEL - len))
      }
    }
    if (lenX > TRESHOLD_LABEL) {
      break
    }
  }
  return score
}

const CHART_X_PADDING = 50

const lineGenerator = line()
  .x((d) => d.x)
  .y((d) => d.y)
  .curve(curveMonotoneX)

export default function TramaDetail({
  data,
  tipologieByTipologia,
  onBack,
  detailHeight,
}) {
  const [measures, setMeasures] = useState(null)

  useLayoutEffect(() => {
    const m = containerRef.current.getBoundingClientRect()
    setMeasures(m)
  }, [])

  const scalaMotivoY = useMemo(() => {
    return makeScalaMotivoY(detailHeight)
  }, [detailHeight])

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
  }, [data, scalaMotivoY, xScale])
  const containerRef = useRef(null)

  const raccontiIncastonati = useMemo(() => {
    if (!fullData) {
      return null
    }

    const inkMap = groupBy(
      fullData.filter((x) => x['racconto incastonato']),
      'racconto incastonato'
    )
    return Object.keys(inkMap).map((key) => {
      const racconti = inkMap[key]
      const minX = Math.min(...racconti.map((d) => d.x))
      const maxX = Math.max(...racconti.map((d) => d.x))
      const inkY = scalaMotivoY(
        +tipologieByTipologia['racconto incastonato']['ordine tipologia']
      )
      return {
        key,
        startY: racconti[0].y,
        endY: racconti[racconti.length - 1].y,
        x1: minX,
        x2: maxX,
        y: inkY,
      }
    })
  }, [fullData, scalaMotivoY, tipologieByTipologia])

  const labelsData = useMemo(() => {
    if (fullData === null) {
      return null
    }
    // const countData = countBy(fullData, (x) => x.motivo_type)
    // const maxCount = Math.max(...Object.values(countData))

    const dataWithScore = fullData.map((labelData, i) => ({
      ...labelData,
      // score: parseInt(
      //   (calculateLabelScore(fullData, i) * countData[labelData.motivo_type]) /
      //     maxCount
      // ),
      score: calculateLabelScore(fullData, i),
    }))

    const byTypeWithScore = dataWithScore.reduce(
      (acc, datum, i) => ({
        ...acc,
        [datum.motivo_type]: orderBy(
          [{ datum, score: datum.score, i }].concat(
            acc[datum.motivo_type] ?? []
          ),
          'score',
          'desc'
        ),
      }),
      []
    )

    const keepByType = mapValues(byTypeWithScore, (dataWithScore) => {
      const keep = [...dataWithScore]
      dataWithScore.forEach((datum, i) => {
        if (datum.score !== null && datum.score < 50 && keep.length > 1) {
          keep.splice(keep.indexOf(datum), 1)
        }
      })
      return keep
    })

    const finalLabels = [...dataWithScore]
    Object.keys(keepByType).forEach((key) => {
      const keep = keepByType[key]
      keep.forEach((datum) => {
        finalLabels[datum.i] = {
          ...finalLabels[datum.i],
          keepLabel: true,
        }
      })
    })

    return finalLabels
  }, [fullData])

  const [hoverMotivo, setHoverMotivo] = useState(null)

  return (
    <div className="trama2-detail-content">
      <div className="trama2-detail-header d-flex justify-content-center align-items-center">
        <MiniInfoBox onClose={onBack}>
          {data.racconto.titolo}, {data.racconto.anno}
        </MiniInfoBox>
      </div>

      <div
        ref={containerRef}
        className="w-100 h-100"
        style={{ overflow: 'hidden' }}
      >
        {measures && (
          <svg
            style={{
              height: detailHeight + 100,
              width: measures.width,
            }}
          >
            <GradientsDefinitions
              prefix="detail__"
              byTipologia={tipologieByTipologia}
              gradientsType={gradientsType}
            />
            <g transform={`translate(0, 80)`}>
              {/* <defs>
                <linearGradient
                  id="racconto-incastonato-gradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stop-color="#F3F3F3" />
                  <stop offset="50%" stop-color="#dadada" />
                  <stop offset="100%" stop-color="#F3F3F3" />
                </linearGradient>
              </defs> */}
              {raccontiIncastonati &&
                raccontiIncastonati.map((racconto) => (
                  <g key={racconto.key}>
                    <rect
                      y={0}
                      height={racconto.y}
                      className="trama2-racconto-incastonato-rect"
                      x={racconto.x1}
                      width={racconto.x2 - racconto.x1}
                    />
                    {/* <line
                      className="trama2-racconto-incastonato-line"
                      x1={racconto.x1}
                      x2={racconto.x2}
                      y1={racconto.y}
                      y2={racconto.y}
                    />
                    <line
                      className="trama2-racconto-incastonato-step-line"
                      x1={racconto.x1}
                      x2={racconto.x1}
                      y1={racconto.startY}
                      y2={racconto.y}
                    />
                    <line
                      className="trama2-racconto-incastonato-step-line"
                      x1={racconto.x2}
                      x2={racconto.x2}
                      y1={racconto.endY}
                      y2={racconto.y}
                    /> */}
                  </g>
                ))}
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
                    stroke={stroke}
                    fill="transparent"

                    // style={{
                    //   // stroke: stroke,
                    //   // fill: 'none',
                    // }}
                  ></path>
                )
              })}
              <g>
                {labelsData.map((d, i) => {
                  let element
                  if (i === 0) {
                    element = (
                      <rect x={0} y={0} className="trama2-start-symbol" />
                    )
                  } else if (i === data.length - 1) {
                    element = <rect x={0} y={1} className="trama2-end-symbol" />
                  } else {
                    element = <circle className="trama2-circle" r={2} />
                  }
                  return (
                    <g
                      className={`trama2-label-container ${
                        hoverMotivo === d.motivo_type
                          ? 'trama2-label-hover'
                          : hoverMotivo === null
                          ? ''
                          : 'trama2-label-not-hover'
                      }`}
                      onMouseEnter={() => setHoverMotivo(d.motivo_type)}
                      onMouseLeave={() => setHoverMotivo(null)}
                      key={i}
                      transform={`translate(${d.x}, ${d.y})`}
                    >
                      {element}
                      {d.keepLabel === true && (
                        <text
                          x={5}
                          y={-5}
                          style={{ transform: 'rotate(-30deg)' }}
                        >
                          {d.motivo_type}
                        </text>
                      )}
                    </g>
                  )
                })}
              </g>
            </g>
          </svg>
        )}
      </div>
    </div>
  )
}
