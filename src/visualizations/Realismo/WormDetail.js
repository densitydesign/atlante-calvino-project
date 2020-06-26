import React from 'react'
import { scaleLinear } from 'd3-scale'
import { colorScale } from './utils'
import MiniInfoBox from '../../general/MiniInfoBox'

function WormDetail({ title, year, circles, width, toggleSelect }) {
  const margins = {
    h: 50,
    v: 50,
  }
  const circleRadius = width / circles.length / 2

  const yScale = scaleLinear()
    .domain([0, 2])
    .range([
      margins.v + circleRadius * 2,
      circleRadius * 4 + margins.v * 2 - circleRadius,
    ])

  return (
    <div className="realismo-detail border-dark">
      <MiniInfoBox onClose={() => toggleSelect(title)}>
        {title}, {year}
      </MiniInfoBox>
      <svg className="worm-detail-svg">
        <line
          x1={0}
          x2={width}
          y1={yScale(0)}
          y2={yScale(0)}
          className="worm-detail-y-grid"
        ></line>
        <line
          x1={0}
          x2={width}
          y1={yScale(1)}
          y2={yScale(1)}
          className="worm-detail-y-grid"
        ></line>
        <line
          x1={0}
          x2={width}
          y1={yScale(2)}
          y2={yScale(2)}
          className="worm-detail-y-grid"
        ></line>

        {circles.map((circle, i) => {
          return (
            <g key={i}>
              {circle.place && (
                <g>
                  <line
                    className="worm-detail-x-place"
                    x1={i * circleRadius * 2 + circleRadius}
                    x2={i * circleRadius * 2 + circleRadius}
                    y1={yScale(circle.level || 0)}
                    y2={250 - margins.v}
                  ></line>
                  <text
                    // style={{transformOrigin:`${i * circleRadius * 2 + circleRadius}px, ${200}px`}}
                    className="worm-detail-place-label"
                    x={i * circleRadius * 2 + circleRadius}
                    y={200}
                  >
                    {circle.occurrence}
                  </text>
                </g>
              )}

              <circle
                // className="movement"
                style={{ fill: colorScale(circle.category) }}
                r={circleRadius}
                cy={yScale(circle.level || 0)}
                cx={i * circleRadius * 2 + circleRadius}
              ></circle>
              {circle.place && (
                <circle
                  style={{ fill: '#fff' }}
                  r={circleRadius / 3}
                  cy={yScale(circle.level)}
                  cx={i * circleRadius * 2 + circleRadius}
                ></circle>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default React.memo(WormDetail)
