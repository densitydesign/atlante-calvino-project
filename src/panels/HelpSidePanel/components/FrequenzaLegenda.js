import React from "react"

export default function BadgeLegenda({ color }) {
  return (
    <div className="mt-2">
      <div
        style={{
          width: "120px",
          height: "20px",
          background: `linear-gradient(270deg, #FFFFFF 0%, ${color}15 0%, ${color} 100%) 0% 0% no-repeat padding-box`,
          border: `0.25px solid ${color}`,
          opacity: 1,
        }}
      ></div>
    </div>
  )
}
