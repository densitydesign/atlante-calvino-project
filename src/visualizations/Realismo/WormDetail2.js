import React, { useMemo } from 'react'
import { colorScale } from './utils'
import range from 'lodash/range'
import find from 'lodash/find'
import MiniInfoBox from '../../general/MiniInfoBox'

const CHART_PADDING_X = 80
const LEGEND_TEXT_HEIGHT = 150

const MINI_RADIUS = 10
const LOCATION_RADIUS = 3
const OVERLAP_RADIUS = 0.4

const WORM_MARGIN_TOP = 50

function yScale(level) {
  return (
    (MINI_RADIUS + MINI_RADIUS * OVERLAP_RADIUS) * 2 * (level + 1) +
    level * WORM_MARGIN_TOP
  )
}

function CirclesLine({
  x1,
  x2,
  xLocation,
  color,
  level,
  circlesCount,
  locationCenterIndex,
}) {
  return (
    <g>
      <g
        transform={`translate(${
          x1 + MINI_RADIUS + MINI_RADIUS * OVERLAP_RADIUS
        }, ${yScale(level)})`}
      >
        {range(circlesCount).map((j) => (
          <circle
            style={{ fill: color }}
            key={j}
            cx={j * MINI_RADIUS * 2}
            cy={0}
            r={MINI_RADIUS + MINI_RADIUS * OVERLAP_RADIUS}
          />
        ))}
        {/* <circle
          fill="white"
          cx={locationCenterIndex * MINI_RADIUS * 2}
          r={LOCATION_RADIUS}
        /> */}
        {/* NOTE: THIS IS THE ~R E A L~ LOCATION */}
        {/* <circle
          fill='white'
          cx={xLocation + LOCATION_RADIUS}
          cy={0}
          r={LOCATION_RADIUS}
        /> */}
      </g>
    </g>
  )
}

function WormDetail2({ data, width: allWidth, title, year, toggleSelect }) {
  const width = allWidth - CHART_PADDING_X * 2
  const dataWorms = useMemo(() => {
    return data.map((item) => {
      const x1 = item.startTotalNorm * width + CHART_PADDING_X
      const x2 = item.endTotalNorm * width + CHART_PADDING_X
      const xLocation = item.locationTotalNorm * width + CHART_PADDING_X

      const widthWorm = x2 - x1
      const circlesCount = Math.ceil(widthWorm / (MINI_RADIUS * 2))

      // const locationCenterIndex = find(range(circlesCount), (j) => {
      //   const baseX = x1 + MINI_RADIUS + MINI_RADIUS * OVERLAP_RADIUS
      //   const cx = baseX + j * MINI_RADIUS * 2
      //   const xStart = cx - MINI_RADIUS
      //   const xEnd = cx + MINI_RADIUS
      //   console.log('X', xStart, xEnd, xLocation)
      //   return xLocation >= xStart && xLocation <= xEnd
      // })

      const color = colorScale(item.category)

      return {
        ...item,
        level: +item.level,
        color,
        x1,
        x2,
        circlesCount,
        xLocation,
        // locationCenterIndex,
      }
    })
  }, [data, width])

  const maxLevel = useMemo(() => {
    return Math.max(...dataWorms.map((d) => d.level))
  }, [dataWorms])

  const height = yScale(maxLevel + 1) + LEGEND_TEXT_HEIGHT

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
        {range(maxLevel + 1).map((level) => (
          <line
            key={level}
            x1={CHART_PADDING_X}
            x2={width + CHART_PADDING_X}
            y1={yScale(level)}
            y2={yScale(level)}
            className="worm-detail-y-grid"
          ></line>
        ))}
        {dataWorms.map((item) => (
          <g key={item.occurrence_location}>
            <CirclesLine
              color={item.color}
              x1={item.x1}
              x2={item.x2}
              level={item.level}
              xLocation={item.xLocation}
              circlesCount={item.circlesCount}
              locationCenterIndex={item.locationCenterIndex}
            />
            <line
              x1={item.x1}
              x2={item.x2}
              stroke={item.color}
              strokeWidth={10}
              y1={yScale(item.level) + MINI_RADIUS + WORM_MARGIN_TOP / 2}
              y2={yScale(item.level) + MINI_RADIUS + WORM_MARGIN_TOP / 2}
            />
          </g>
        ))}
        {dataWorms.map((item) => (
          <circle
            key={item.occurrence_location}
            fill="white"
            cx={item.xLocation + LOCATION_RADIUS}
            cy={yScale(item.level)}
            r={LOCATION_RADIUS}
          />
        ))}
        {/* {dataWorms.map((item) => {
          const x =
            item.x1 +
            MINI_RADIUS +
            MINI_RADIUS * OVERLAP_RADIUS +
            item.locationCenterIndex * MINI_RADIUS
          return (
            <text x={x} y={yScale(3)} key={item.occurrence_location}>
              {item.location}
            </text>
          )
        })} */}
      </svg>
    </div>
  )
}

export default React.memo(WormDetail2)
