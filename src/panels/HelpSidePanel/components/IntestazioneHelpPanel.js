import React from "react"
import { Link } from "react-router-dom"
import classnames from "classnames"
import { ReactComponent as ApprofondimentoIcon } from "../../../helpPages/icons/approfondimento.svg"

export default function IntestazioneHelpPanel({
  tappa,
  titolo,
  nomeItinerario,
  linkApprofondimento,
  linkTappa1,
  linkTappa2,
  linkTappa3,
}) {
  return (
    <>
      <div className="d-flex justify-content-between">
        <strong className="text-dark-blue">
          <u>{nomeItinerario}</u>
        </strong>
        <div className="d-flex justify-content-between">
          <span className="text-dark-blue mr-2">
            <small>Tappa</small>
          </span>
          <Link to={linkTappa1}>
            <div
              className={classnames("mr-2", {
                "number-tappa": tappa !== 1,
                "number-tappa-active": tappa === 1,
              })}
            >
              1
            </div>
          </Link>
          <Link to={linkTappa2}>
            <div
              className={classnames("mr-2", {
                "number-tappa": tappa !== 2,
                "number-tappa-active": tappa === 2,
              })}
            >
              2
            </div>
          </Link>
          <Link to={linkTappa3}>
            <div
              className={classnames("mr-2", {
                "number-tappa": tappa !== 3,
                "number-tappa-active": tappa === 3,
              })}
            >
              3
            </div>
          </Link>
        </div>
      </div>
      <h1>{titolo}</h1>
      <div className="d-flex align-items-center">
        <ApprofondimentoIcon />
        <strong className="ml-2">
          <Link to={linkApprofondimento}>
            <u>APPROFONDIMENTO</u>
          </Link>
        </strong>
      </div>
    </>
  )
}
