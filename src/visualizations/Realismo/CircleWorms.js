import React, { useCallback } from 'react'
import { colorScale, yearsArcs } from './utils'
import { scaleLinear } from 'd3-scale'
import { arc } from 'd3'

// const LABEL_VISIBLE_SIZE = 80
const LABEL_SIZE_PERCENT = 0
const WORM_SIZE_PERCENT = 0.55
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
    size,
    flipText = false,
  }) => {
    const wormStart = radius - labelSize - wormSize - LABEL_PADDING
    const wormEnd = radius - labelSize

    const circleRadius = wormSize / circles.length / 2

    const yScale = scaleLinear()
      .domain([0, 2])
      .range([0, circleRadius * 2])

    //var for animations delays
    const animationDelays = circles.reduce((acc, item) => {
      if (!acc[item.occurrence_location]) {
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

            if (circle.movement === 'TRUE') {
              animationGroups[circle.occurrence_location] =
                animationGroups[circle.occurrence_location] === undefined
                  ? 0
                  : animationGroups[circle.occurrence_location] + 1
            }

            const delay =
              circle.direction === 'forward'
                ? animationGroups[circle.occurrence_location] * 0.2
                : (animationDelays[circle.occurrence_location] -
                    animationGroups[circle.occurrence_location]) *
                  0.2

            return (
              <g key={i}>
                <circle
                  className={`${
                    circle.movement === 'TRUE' && !isOmitted ? 'movement' : ''
                  }`}
                  style={{
                    fill: colorScale(circle.category),
                    transformOrigin: `${cx}px ${cy}px`,
                    animationDelay: `${delay}s`,
                  }}
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
      </g>
    )
  }
)

// const WormLabel = React.memo(
//   ({
//     racconto,
//     circles,
//     radius,
//     labelSize,
//     wormSize,
//     onClick,
//     isSelected,
//     isOmitted,
//     size,
//     flipText = false,
//   }) => {
//     const wormStart = radius - labelSize - wormSize - LABEL_PADDING
//     const wormEnd = radius - labelSize

//     const circleRadius = wormSize / circles.length / 2
//     const flipTextStyle = flipText
//       ? {
//           transform: 'rotate(180deg)',
//           transformOrigin: `${wormEnd}px 0px`,
//         }
//       : undefined


//     return (
//       <g
//         className={`worm-label-container${flipText ? '-flipped' : ''}`}
//         style={{
//           opacity: isSelected ? 1 : 0.3,
//         }}
//       >
//         <g style={flipTextStyle}>
//           <text
//             style={{ alignmentBaseline: 'middle' }}
//             x={wormEnd - (flipText ? LABEL_VISIBLE_SIZE : 0)}>{racconto.title}</text>
//         </g>
//         <g>
//           {!flipText && (
//             <rect
//               className='worm-label-gradient-rect'
//               x={wormEnd + LABEL_VISIBLE_SIZE}
//               y={-7}
//               width={size / 2 - wormSize}
//               height={14}
//               fill="url(#label-gradient)"
//             />
//           )}
//           {flipText && (
//             <rect
//               className='worm-label-gradient-rect'
//               x={30}
//               y={-7}
//               width={wormEnd}
//               height={14}
//               fill="url(#label-gradient-flip)"
//             />
//           )}
//           </g>
//       </g>
//     )
//   }
// )

const CicrleYears = React.memo(({ x, y, radius, radiusStrokeSize }) => {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {yearsArcs.map((yearArc) => {
        const flipText = yearArc.angleLabel >= 90 && yearArc.angleLabel <= 270
        const textX = radius - radiusStrokeSize
        return (
          <g key={yearArc.year}>
            <g style={{ transform: `rotate(${yearArc.angleLabel}deg)` }}>
              <text
                textAnchor={flipText ? 'start' : 'end'}
                x={textX}
                y={0}
                style={{
                  transformOrigin: `${textX}px -3px`,
                  transform: flipText ? 'rotate(180deg)' : undefined,
                  fontSize: 10,
                }}
              >
                {yearArc.year}
              </text>
            </g>
            <path
              style={{ fill: '#ddd' }}
              d={arcGenerator({
                ...yearArc,
                outerRadius: radius - radiusStrokeSize / 2,
                innerRadius: radius + radiusStrokeSize / 2,
              })}
            />
          </g>
        )
      })}
    </g>
  )
})

const Legend = React.memo(
  ({ labelSize, x, wormSize, endLineStart, endLineEnd }) => {
    return (
      <g>
        <line
          y1={0}
          y2={labelSize}
          x1={x}
          x2={x}
          stroke="black"
          strokeWidth={2}
        />
        <text
          x={x}
          y={labelSize - LEGEND_TEXT_MARGIN}
          className="realismo-legend-text"
          style={{
            transformOrigin: `${x}px ${labelSize}px`,
            transform: 'rotate(270deg)',
          }}
        >
          TITOLO
        </text>
        <line
          y1={labelSize + LABEL_PADDING}
          y2={labelSize + LABEL_PADDING + wormSize}
          x1={x}
          x2={x}
          stroke="black"
          strokeWidth={2}
        />
        <text
          x={x}
          y={labelSize + LABEL_PADDING - LEGEND_TEXT_MARGIN}
          className="realismo-legend-text"
          textAnchor={'end'}
          style={{
            transformOrigin: `${x}px ${labelSize + LABEL_PADDING}px`,
            transform: 'rotate(270deg)',
          }}
        >
          FINE
        </text>
        <text
          x={x}
          y={labelSize + LABEL_PADDING + wormSize - LEGEND_TEXT_MARGIN}
          className="realismo-legend-text"
          textAnchor={'start'}
          style={{
            transformOrigin: `${x}px ${labelSize + LABEL_PADDING + wormSize}px`,
            transform: 'rotate(270deg)',
          }}
        >
          INIZIO DEL TESTO
        </text>

        <line
          y1={endLineStart}
          y2={endLineEnd}
          x1={x}
          x2={x}
          stroke="black"
          strokeWidth={2}
        />
        <g
          className="babu"
          style={{
            transform: `translate(${x - 14}px, ${endLineEnd}px) rotate(270deg)`,
          }}
        >
          <text
            x={0}
            y={0}
            className="realismo-legend-text"
            textAnchor={'start'}
          >
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
      </g>
    )
  }
)

export default function CircleWorms({
  radius,
  circlesMap,
  selected,
  omitted,
  racconti,
  toggleSelect,
}) {
  const size = radius * 2
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
    <svg width={size} height={size}>
      <defs>
        <linearGradient id="label-gradient">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0)"></stop>
          <stop offset="10%" stopColor="var(--bg)"></stop>
        </linearGradient>
        <linearGradient id="label-gradient-flip">
          <stop offset="90%" stopColor="var(--bg)"></stop>
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0)"></stop>
        </linearGradient>
      </defs>

      <g transform={`translate(${size / 2}, ${size / 2})`}>
        {/* {racconti.map((racconto, i) => {
          const angle = racconto.rotation
          return (
            <g
              key={i}
              className={`worm-label worm-label-${i}`}
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <WormLabel
                size={size}
                flipText={angle >= 90 && angle <= 270}
                isSelected={allSelected || !!selected[racconto.title]}
                isOmitted={!!omitted[racconto.title]}
                onClick={handleClick}
                radius={size / 2}
                labelSize={(size / 2) * LABEL_SIZE_PERCENT}
                wormSize={(size / 2) * WORM_SIZE_PERCENT}
                racconto={racconto}
                circles={circlesMap[racconto.title]}
              ></WormLabel>
            </g>
          )
        })} */}
        {/* <circle cx={0} cy={0} r={size / 2 - labelSize} fill='transparent' /> */}
        {racconti.map((racconto, i) => {
          const angle = racconto.rotation
          return (
            <g
              key={i}
              className={`worm-${i}`}
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <Worm
                size={size}
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
      <Legend
        x={radius}
        wormSize={wormSize}
        labelSize={labelSize}
        endLineStart={endLineStart}
        endLineEnd={endLineEnd}
      />

      <CicrleYears
        x={radius}
        y={radius}
        radius={innerRadius}
        radiusStrokeSize={INNER_CIRCLE_STROKE_WIDTH}
      />
    </svg>
  )
}
