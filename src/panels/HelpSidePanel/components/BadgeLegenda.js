import React from "react"

export default function BadgeLegenda({ name, color }) {
  return (
    <div className="d-flex align-items-center mt-2">
      <div
        style={{
          width: "21px",
          height: "10px",
          background: color,
          borderRadius: "6px",
          opacity: 1,
        }}
      ></div>
      <div className='ml-2'>{name}</div>
    </div>
  )
}
