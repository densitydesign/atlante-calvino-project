import React, { useMemo } from 'react'
import { linkVertical } from 'd3-shape'
import { colorScale } from './utils'
import range from 'lodash/range'
import MiniInfoBox from '../../general/MiniInfoBox'

const CHART_PADDING_X = 80
const LEGEND_TEXT_HEIGHT = 150

const MINI_RADIUS = 20
const LOCATION_RADIUS = 2

const LEVEL_HEIGHT = 40

const WORM_MARGIN_TOP = 20

const CHART_MARGIN_LEFT = 100

function yScale(level) {
  return WORM_MARGIN_TOP + LEVEL_HEIGHT * level
}

function WormDetail({ data, width: allWidth, title, year, toggleSelect }) {
  const width = allWidth - CHART_PADDING_X * 2 - CHART_MARGIN_LEFT
  const dataWorms = useMemo(() => {
    return data.map((item) => {
      const x1 =
        item.startTotalNorm * width + CHART_PADDING_X + CHART_MARGIN_LEFT
      const x2 = item.endTotalNorm * width + CHART_PADDING_X + CHART_MARGIN_LEFT
      const xLocation =
        item.locationTotalNorm * width + CHART_PADDING_X + CHART_MARGIN_LEFT
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

  const labalesData = useMemo(() => {
    let dataForLabels
    if (dataWorms.length < 13) {
      dataForLabels = dataWorms.map((item, i) => {
        const x = CHART_PADDING_X + CHART_MARGIN_LEFT + i * 60
        return {
          ...item,
          x,
          y: yScale(maxLevel),
        }
      })
    } else {
      const mul = width / (dataWorms.length - 1)
      dataForLabels = dataWorms.map((item, i) => {
        const x = CHART_PADDING_X + CHART_MARGIN_LEFT + i * mul
        return {
          ...item,
          x,
          y: yScale(maxLevel),
        }
      })
    }
    const link = linkVertical()
    return dataForLabels.map((item) => {
      const linePath = link({
        source: [item.xLocation, yScale(item.level)],
        target: [item.x, item.y - 5],
      })
      return {
        ...item,
        linePath,
      }
    })
  }, [dataWorms, width])

  const levelsData = useMemo(() => {
    return range(maxLevel).map((level) => {
      const dataLevelWorms = dataWorms.filter((d) => d.level === level)
      const hasData = dataLevelWorms.length > 0
      const dataLabel = labalesData.filter((d) => d.level === level)

      return {
        level,
        dataLevelWorms,
        hasData,
        dataLabel,
      }
    })
  }, [dataWorms, labalesData])

  const totalLength = data[0]?.length ?? 0
  let totalLabelX
  const height = yScale(maxLevel) + LEGEND_TEXT_HEIGHT

  let ghostWorm

  // GHOST (no ambientazione)
  if (dataWorms.length === 1 && dataWorms[0].occurrence_location === '0') {
    ghostWorm = {
      x1: 0 + CHART_PADDING_X + CHART_MARGIN_LEFT,
      x2:
        dataWorms[0].lengthTotalNorm * width +
        CHART_PADDING_X +
        CHART_MARGIN_LEFT,
    }
    totalLabelX = ghostWorm.x2
  } else {
    totalLabelX = dataWorms[dataWorms.length - 1]?.x2
  }

  return (
    <div className="realismo-detail">
      <div className="realismo-detail-info-legend">
        Livelli
        <br />
        di annidamento
        <br />
        dei luoghi
      </div>
      <div style={{ margin: `0px ${CHART_PADDING_X}px` }}>
        <MiniInfoBox
          onClose={() => toggleSelect(title)}
          style={{ marginLeft: CHART_MARGIN_LEFT }}
        >
          {title}, {year}
        </MiniInfoBox>
      </div>
      <svg className="worm-detail-svg" style={{ height }}>
        <linearGradient id="worm-detail-indoor">
          <stop offset={'0%'} stopColor={'#ffc33e'} />
          <stop offset={'50%'} stopColor={'#FFF3D7'}>
            <animate
              attributeName="offset"
              values="0;1;0"
              dur="8s"
              repeatCount="indefinite"
            ></animate>
          </stop>
          <stop offset={'100%'} stopColor={'#ffc33e'} />
        </linearGradient>
        <linearGradient id="worm-detail-outdoor">
          <stop offset={'0%'} stopColor={'#00c97c'} />
          <stop offset={'50%'} stopColor={'#63FFC3'}>
            <animate
              attributeName="offset"
              values="0;1;0"
              dur="8s"
              repeatCount="indefinite"
            ></animate>
          </stop>
          <stop offset={'100%'} stopColor={'#00c97c'} />
        </linearGradient>
        <linearGradient id="worm-detail-transportation">
          <stop offset={'0%'} stopColor={'#4a4aff'} />
          <stop offset={'50%'} stopColor={'#E3E3FF'}>
            <animate
              attributeName="offset"
              values="0;1;0"
              dur="8s"
              repeatCount="indefinite"
            ></animate>
          </stop>
          <stop offset={'100%'} stopColor={'#4a4aff'} />
        </linearGradient>
        <g transform={'translate(0, 10)'}>
          {levelsData.map((datum) => (
            <g
              key={datum.level}
              className={`worm-detail-grid-container ${
                datum.hasData ? 'level-enabled' : 'level-disabled'
              }`}
            >
              <line
                x1={CHART_PADDING_X + CHART_MARGIN_LEFT}
                x2={width + CHART_PADDING_X + CHART_MARGIN_LEFT}
                y1={yScale(datum.level)}
                y2={yScale(datum.level)}
                className={`worm-detail-y-grid`}
              ></line>
              <text
                className={'worm-detail-level-label'}
                y={yScale(datum.level) + 4}
                x={CHART_PADDING_X - 10 + CHART_MARGIN_LEFT}
              >
                {datum.level}
              </text>
            </g>
          ))}

          {levelsData.map((datum) => (
            <g key={datum.level}>
              {datum.dataLevelWorms.map((item) => (
                <g key={item.occurrence_location}>
                  <rect
                    rx={2}
                    ry={2}
                    x={item.x1}
                    width={item.x2 - item.x1}
                    height={MINI_RADIUS}
                    style={{
                      fill:
                        item.movement === 'FALSE'
                          ? item.color
                          : `url(#worm-detail-${item.category})`,
                    }}
                    y={yScale(item.level) - MINI_RADIUS / 2}
                  />
                </g>
              ))}
              {datum.dataLabel.map((item) => (
                <g key={item.occurrence_location}>
                  <path d={item.linePath} fill="none" stroke="#858585" />
                  <text
                    x={item.x}
                    y={item.y}
                    textAnchor="end"
                    style={{
                      transformOrigin: `${item.x}px ${item.y}px`,
                      transform: `rotate(-45deg)`,
                    }}
                  >
                    {item.occurrence}
                  </text>
                </g>
              ))}
              {datum.dataLevelWorms.map((item) => (
                <g key={item.occurrence_location}>
                  <circle
                    fill="black"
                    cx={item.xLocation}
                    cy={yScale(item.level)}
                    r={LOCATION_RADIUS}
                  />
                </g>
              ))}
            </g>
          ))}
          {ghostWorm && (
            <rect
              rx={2}
              ry={2}
              x={ghostWorm.x1}
              width={ghostWorm.x2 - ghostWorm.x1}
              height={MINI_RADIUS}
              style={{
                fill: 'rgba(95, 102, 100, 0.5)',
              }}
              y={yScale(0) - MINI_RADIUS / 2}
            />
          )}
        </g>

        <text
          textAnchor={totalLabelX / width >= 0.75 ? 'end' : 'middle'}
          x={totalLabelX}
          y={10}
          style={{ fontSize: 12 }}
        >
          {totalLength} caratteri
        </text>
        <line
          x1={totalLabelX}
          x2={totalLabelX}
          y1={12}
          y2={18}
          stroke={'black'}
        />
      </svg>
    </div>
  )
}

export default React.memo(WormDetail)
