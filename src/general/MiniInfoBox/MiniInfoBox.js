import React from 'react'
import './MiniInfoBox.css'

export default function MiniInfoBox({ children, onClose }) {
  return (
    <div className="MiniInfoBox">
      <div className="MiniInfoBox-start">{children}</div>
      <div className="MiniInfoBox-end" onClick={onClose}>
        &times;
      </div>
    </div>
  )
}
