import React, { useMemo } from 'react'
import { colorScale } from './utils'
import range from 'lodash/range'
import MiniInfoBox from '../../general/MiniInfoBox'

const CHART_PADDING_X = 80
const LEGEND_TEXT_HEIGHT = 150

const MINI_RADIUS = 20
const LOCATION_RADIUS = 2

const LEVEL_HEIGHT = 40

const WORM_MARGIN_TOP = 20

function yScale(level) {
  return WORM_MARGIN_TOP + LEVEL_HEIGHT * level
}

function WormDetail2({ data, width: allWidth, title, year, toggleSelect }) {
  const width = allWidth - CHART_PADDING_X * 2
  const dataWorms = useMemo(() => {
    return data.map((item) => {
      const x1 = item.startTotalNorm * width + CHART_PADDING_X
      const x2 = item.endTotalNorm * width + CHART_PADDING_X
      const xLocation = item.locationTotalNorm * width + CHART_PADDING_X
      const color = colorScale(item.category)
      return {
        ...item,
        level: +item.level,
        color,
        x1,
        x2,
        xLocation,
      }
    })
  }, [data, width])

  const maxLevel = 3
  const levelsData = useMemo(() => {
    return range(maxLevel).map((level) => {
      return dataWorms.some((d) => d.level === level)
    })
  }, [dataWorms])

  const height = yScale(maxLevel) + LEGEND_TEXT_HEIGHT

  return (
    <div className="realismo-detail">
      <div style={{ margin: `0px ${CHART_PADDING_X}px` }}>
        <MiniInfoBox onClose={() => toggleSelect(title)}>
          {title}, {year}
        </MiniInfoBox>
      </div>
      <svg className="worm-detail-svg" style={{ height }}>
        {dataWorms.map((item) => (
          <g key={item.occurrence_location}>
            <line
              className="worm-detail-x-place"
              x1={item.xLocation + LOCATION_RADIUS}
              x2={item.xLocation + LOCATION_RADIUS}
              y1={yScale(item.level)}
              y2={yScale(maxLevel + 1) + 20}
              stroke="black"
            />
            <text
              style={{
                transformOrigin: `${item.xLocation + LOCATION_RADIUS + 5}px ${
                  yScale(maxLevel + 1) + 30
                }px`,
                transform: `rotate(-45deg)`,
              }}
              textAnchor="end"
              x={item.xLocation + LOCATION_RADIUS + 5}
              y={yScale(maxLevel + 1) + 30}
            >
              {item.occurrence}
            </text>
          </g>
        ))}
        {levelsData.map((enabled, level) => (
          <g
            key={level}
            className={`worm-detail-grid-container ${
              enabled ? 'level-enabled' : 'level-disabled'
            }`}
          >
            <line
              x1={CHART_PADDING_X}
              x2={width + CHART_PADDING_X}
              y1={yScale(level)}
              y2={yScale(level)}
              className={`worm-detail-y-grid`}
            ></line>
            <text
              className={'worm-detail-level-label'}
              y={yScale(level) + 4}
              x={CHART_PADDING_X - 10}
            >
              {level + 1}
            </text>
          </g>
        ))}
        {dataWorms.map((item) => (
          <g key={item.occurrence_location}>
            <rect
              rx={2}
              ry={2}
              x={item.x1}
              width={item.x2 - item.x1}
              fill={item.color}
              height={MINI_RADIUS}
              y={yScale(item.level) - MINI_RADIUS / 2}
            />
            <circle
              fill="black"
              cx={item.xLocation + LOCATION_RADIUS}
              cy={yScale(item.level)}
              r={LOCATION_RADIUS}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}

export default React.memo(WormDetail2)
