import React, { useCallback } from 'react'
import { colorScale } from './utils'
import { scaleLinear } from 'd3-scale'

const Worm = React.memo(
  ({ racconto, circles, radius, labelSize, wormSize, onClick, isSelected }) => {
    const wormStart = radius - labelSize - wormSize
    const wormEnd = radius - labelSize

    const circleRadius = wormSize / circles.length / 2

    const yScale = scaleLinear()
      .domain([0, 2])
      .range([0, circleRadius * 2])

    return (
      <g
        style={{
          opacity: isSelected ? 1 : 0.3,
        }}
      >
        <g
          onClick={() => onClick(racconto)}
          style={{
            cursor: 'pointer',
          }}
        >
          {circles.map((circle, i) => {
            return (
              <g key={i}>
                <circle
                  className="movement"
                  style={{ fill: colorScale(circle.category) }}
                  r={circleRadius * 1.5}
                  cy={yScale(circle.level)}
                  cx={wormStart + i * circleRadius * 2 + circleRadius}
                ></circle>
                {circle.place && (
                  <circle
                    style={{ fill: '#fff' }}
                    r={circleRadius / 3}
                    cy={yScale(circle.level)}
                    cx={wormStart + i * circleRadius * 2 + circleRadius}
                  ></circle>
                )}
              </g>
            )
          })}
        </g>
        <text x={wormEnd}>&nbsp;&nbsp;{racconto.title}</text>
      </g>
    )
  }
)

export default function CircleWorms({
  size,
  circlesMap,
  selected,
  racconti,
  toggleSelect,
}) {
  const deltaAngle = 360 / racconti.length

  const handleClick = useCallback((racconto) => {
    toggleSelect(racconto.title)
  }, [toggleSelect])

  const allSelected = Object.keys(selected).length === 0

  return (
    <svg width={size} height={size}>
      <g transform={`translate(${size / 2}, ${size / 2})`}>
        {racconti.map((racconto, i) => (
          <g key={i} style={{ transform: `rotate(${i * deltaAngle}deg)` }}>
            <Worm
              isSelected={allSelected || !!selected[racconto.title]}
              onClick={handleClick}
              radius={size / 2}
              labelSize={size / 10}
              wormSize={(size / 10) * 2}
              racconto={racconto}
              circles={circlesMap[racconto.title]}
            ></Worm>
          </g>
        ))}
      </g>
    </svg>
  )
}
