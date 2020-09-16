import React from 'react'
import './MiniInfoBox.css'

export default function MiniInfoBox({ children, onClose, style }) {
  return (
    <div className="MiniInfoBox" style={style}>
      <div className="MiniInfoBox-start">{children}</div>
      <div className="MiniInfoBox-end" onClick={onClose}>
        &times;
      </div>
    </div>
  )
}
