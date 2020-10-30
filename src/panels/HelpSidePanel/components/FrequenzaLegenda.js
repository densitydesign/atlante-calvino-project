import React from "react"

export default function FrequenzaLegenda({ color, isLast = false }) {
  return (
    <div className="mt-2">
      <div
        style={{
          width: "120px",
          height: "15px",
          background: `linear-gradient(270deg, #FFFFFF 0%, ${color}15 0%, ${color} 100%) 0% 0% no-repeat padding-box`,
          border: `0.25px solid ${color}`,
          opacity: 1,
        }}
      ></div>
      {isLast && (
        <div style={{ width: 120 }} className="d-flex justify-content-between">
          <div>+</div>
          <div>-</div>
        </div>
      )}
    </div>
  )
}
