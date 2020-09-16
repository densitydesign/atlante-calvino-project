import React from 'react'

const rad2 = Math.sqrt(2)
const points = [
  [0, 50 * rad2],
  [50 * (rad2 - 1), 50],
  [50, 50],
  [50, 50 * (rad2 - 1)],

  [50 * rad2, 0],
  [50, 50 * (1 - rad2)],
  [50, -50],
  [50 * (rad2 - 1), -50],
  [0, -50 * rad2],

  [50 * (1 - rad2), -50],
  [-50, -50],
  [-50, 50 * (1 - rad2)],
  [-50 * rad2, 0],

  [-50, 50 * (rad2 - 1)],
  [-50, 50],
  [50 * (1 - rad2), 50],
  [0, 50 * rad2],
]

export default function Star({ size, style, className, svgStyle, ...props }) {
  const strokeWidth = (100 * rad2) / size

  const move = `M ${points[0][0]} ${points[0][1]} L`
  const lines = points.map(([x, y]) => `${x} ${y}`).join(' L ')
  const d = move + lines
  return (
    <svg
      style={svgStyle}
      viewBox={`${-50 * rad2} ${-50 * rad2} ${100 * rad2} ${100 * rad2}`}
      width={size}
      height={size}
      {...props}
    >
      <path
        strokeWidth={strokeWidth}
        stroke="#000"
        className={className}
        style={style}
        d={d}
      />
    </svg>
  )
}
