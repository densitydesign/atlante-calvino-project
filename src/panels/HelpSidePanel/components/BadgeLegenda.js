import React from "react"

export default function BadgeLegenda({ name, color, border, italic }) {
  return (
    <>
      <div className="d-flex align-items-center mt-2">
        <div
          style={{
            width: "21px",
            height: "10px",
            background: color ? color : undefined,
            borderRadius: "6px",
            border: border ? "1px solid " + border : undefined,
            opacity: 1,
          }}
        ></div>
        <div className="ml-2">{name}</div>
      </div>
      {italic && (
        <small className="badge-legenda-small">
          <i>{italic}</i>
        </small>
      )}
    </>
  )
}
