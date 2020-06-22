import React, { useCallback } from 'react'
import { colorScale, yearsArcs } from './utils'
import { scaleLinear } from 'd3-scale'
import { transform } from 'lodash'
import { arc } from 'd3'

const LEGEND_DEG = 10
const LABEL_SIZE_PERCENT = 0.2
const WORM_SIZE_PERCENT = 0.45
const LABEL_PADDING = 10
const INNER_CIRCLE_PADDING = 10
const INNER_CIRCLE_STROKE_WIDTH = 5
const LEGEND_TEXT_MARGIN = 3

const arcGenerator = arc()

const Worm = React.memo(
  ({
    racconto,
    circles,
    radius,
    labelSize,
    wormSize,
    onClick,
    isSelected,
    isOmitted,
    flipText = false,
  }) => {
    const wormStart = radius - labelSize - wormSize - LABEL_PADDING
    const wormEnd = radius - labelSize

    const circleRadius = wormSize / circles.length / 2
    const flipTextStyle = flipText
      ? {
          transform: 'rotate(180deg)',
          transformOrigin: `${wormEnd}px 0px`,
        }
      : undefined

    const yScale = scaleLinear()
      .domain([0, 2])
      .range([0, circleRadius * 2])


    //var for animations delays
    const animationDelays = circles.reduce((acc, item) => {
      if(!acc[item.occurrence_location]){
        acc[item.occurrence_location] = 1
      }
        acc[item.occurrence_location] += 1
      return acc
    }, {})

    const animationGroups = {}


    
    return (
      <g
        style={{
          opacity: isSelected ? 1 : 0.3,
        }}
      >
        <g
          onClick={() => {
            if (!isOmitted) {
              onClick(racconto)
            }
          }}
          style={{
            cursor: isOmitted ? undefined : 'pointer',
          }}
        >
          {circles.map((circle, i) => {

            const cx = wormStart + i * circleRadius * 2 + circleRadius
            const cy = yScale(circle.level || 0)
            
            if(circle.movement === 'TRUE'){
              animationGroups[circle.occurrence_location] = animationGroups[circle.occurrence_location] === undefined  ?  0  : animationGroups[circle.occurrence_location] + 1

            }

            const delay =  circle.direction === 'forward' ? animationGroups[circle.occurrence_location] * 0.2 : (animationDelays[circle.occurrence_location] -  animationGroups[circle.occurrence_location]) * 0.2
          

            return (
              <g key={i}>
                <circle
                  className={`${circle.movement === 'TRUE' && !isOmitted ? 'movement' : ''}`}
                  style={{ fill: colorScale(circle.category), transformOrigin: `${cx}px ${cy}px`, animationDelay:`${delay}s` }}
                  r={isOmitted ? circleRadius * 0.5 : circleRadius * 1.5}
                  cy={cy}
                  cx={cx}
                ></circle>
                {circle.place && (
                  <circle
                    style={{ fill: '#fff' }}
                    r={circleRadius / 3}
                    cy={cy}
                    cx={cx}
                  ></circle>
                )}
              </g>
            )
          })}
        </g>
        <g style={flipTextStyle}>
          <text x={wormEnd} textAnchor={flipText ? 'end' : undefined}>
          {racconto.year} {racconto.title}
          </text>
        </g>
      </g>
    )
  }
)

export default function CircleWorms({
  width,
  height,
  circlesMap,
  selected,
  omitted,
  racconti,
  toggleSelect,
}) {
  const deltaAngle = (360 - LEGEND_DEG) / racconti.length
  const size = Math.min(width, height)

  const handleClick = useCallback(
    (racconto) => {
      toggleSelect(racconto.title)
    },
    [toggleSelect]
  )

  const allSelected = Object.keys(selected).length === 0

  const labelSize = (size / 2) * LABEL_SIZE_PERCENT
  const wormSize = (size / 2) * WORM_SIZE_PERCENT
  const innerRadius =
    size / 2 - labelSize - wormSize - LABEL_PADDING - INNER_CIRCLE_PADDING

  const endLineStart =
    labelSize +
    LABEL_PADDING +
    wormSize +
    INNER_CIRCLE_PADDING -
    INNER_CIRCLE_STROKE_WIDTH / 2
  const endLineEnd = endLineStart + 90

  // 0 - 90
  return (
    <svg width={width} height={size}>
      <line
        y1={0}
        y2={labelSize}
        x1={width / 2}
        x2={width / 2}
        stroke="black"
        strokeWidth={2}
      />
      <text
        x={width / 2}
        y={labelSize - LEGEND_TEXT_MARGIN}
        className="realismo-legend-text"
        style={{
          transformOrigin: `${width / 2}px ${labelSize}px`,
          transform: 'rotate(270deg)',
        }}
      >
        TITOLO
      </text>
      <line
        y1={labelSize + LABEL_PADDING}
        y2={labelSize + LABEL_PADDING + wormSize}
        x1={width / 2}
        x2={width / 2}
        stroke="black"
        strokeWidth={2}
      />
      <text
        x={width / 2}
        y={labelSize + LABEL_PADDING - LEGEND_TEXT_MARGIN}
        className="realismo-legend-text"
        textAnchor={'end'}
        style={{
          transformOrigin: `${width / 2}px ${labelSize + LABEL_PADDING}px`,
          transform: 'rotate(270deg)',
        }}
      >
        FINE
      </text>
      <text
        x={width / 2}
        y={labelSize + LABEL_PADDING + wormSize - LEGEND_TEXT_MARGIN}
        className="realismo-legend-text"
        textAnchor={'start'}
        style={{
          transformOrigin: `${width / 2}px ${
            labelSize + LABEL_PADDING + wormSize
          }px`,
          transform: 'rotate(270deg)',
        }}
      >
        INIZIO DEL TESTO
      </text>
      <circle
        cx={width / 2}
        cy={size / 2}
        fill={'transparent'}
        stroke={'#ddd'}
        strokeWidth={INNER_CIRCLE_STROKE_WIDTH}
        r={innerRadius}
      />

      <g transform={`translate(${width/2}, ${size/2})`}>
      {yearsArcs.map(yearArc => <path 
        style={{stroke: '#222', fill: 'transparent'}}
        d={arcGenerator({...yearArc, outerRadius:100, innerRadius: 90})}>
          <title>{yearArc.year} {yearArc.s} {yearArc.e}</title>
        </path>)}
      </g>




      <line
        y1={endLineStart}
        y2={endLineEnd}
        x1={width / 2}
        x2={width / 2}
        stroke="black"
        strokeWidth={2}
      />
      <g
        className="babu"
        style={{
          transform: `translate(${
            width / 2 - 14
          }px, ${endLineEnd}px) rotate(270deg)`,
        }}
      >
        <text x={0} y={0} className="realismo-legend-text" textAnchor={'start'}>
          ANNO PRIMA
        </text>
        <text
          x={0}
          y={10}
          className="realismo-legend-text"
          textAnchor={'start'}
        >
          PUBBLICAZIONE
        </text>
      </g>

      <g transform={`translate(${width / 2} , ${size / 2})`}>
        {racconti.map((racconto, i) => {
          // let angle = i * deltaAngle + deltaAngle / 2 + 270 + LEGEND_DEG / 2
          // if (angle > 360) {
          //   angle -= 360
          // }
          let angle = racconto.rotation

          return (
            <g
              key={i}
              className={`worm-${i}`}
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <Worm
                flipText={angle >= 90 && angle <= 270}
                isSelected={allSelected || !!selected[racconto.title]}
                isOmitted={!!omitted[racconto.title]}
                onClick={handleClick}
                radius={size / 2}
                labelSize={(size / 2) * LABEL_SIZE_PERCENT}
                wormSize={(size / 2) * WORM_SIZE_PERCENT}
                racconto={racconto}
                circles={circlesMap[racconto.title]}
              ></Worm>
            </g>
          )
        })}
      </g>
    </svg>
  )
}
