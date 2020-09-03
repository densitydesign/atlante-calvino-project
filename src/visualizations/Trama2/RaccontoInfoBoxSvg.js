import React, { useRef, useState, useLayoutEffect, useContext } from 'react'
import { CurretTramaViewContext } from './Trama2Content'

const RaccontoInfoBoxSvg = ({ titolo, x, y = 0, onClick }) => {
  const containerRef = useRef(null)
  const [measures, setMeasures] = useState(null)
  const view = useContext(CurretTramaViewContext)

  useLayoutEffect(() => {
    const m = containerRef.current.getBoundingClientRect()
    setMeasures(m)
  }, [titolo, view])

  return (
    <g
      onClick={onClick}
      transform={`translate(${x}, ${y})`}
      style={{ cursor: 'pointer' }}
    >
      {measures && (
        <g transform={`translate(${-measures.width - 40}, -15)`}>
          <rect
            height={22}
            width={measures.width + 35}
            rx={5}
            className="trama2-info-box"
          />
          <line
            x1={measures.width + 18}
            x2={measures.width + 18}
            y1={0}
            y2={22}
            className="trama2-info-box"
          />
          <text stroke={'var(--dark-blue)'} x={measures.width + 22} y={15}>
            o
          </text>
        </g>
      )}
      <text
        ref={containerRef}
        x={-30}
        y={0}
        style={{ textAnchor: 'end', userSelect: 'none' }}
      >
        {titolo}
      </text>
    </g>
  )
}

export default RaccontoInfoBoxSvg
