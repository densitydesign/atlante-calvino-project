import React from "react"
import { Link } from "react-router-dom"
import { HashLink } from "react-router-hash-link"
import { useTranslation } from "react-i18next"
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
  linkItinerario,
}) {

  const { t } = useTranslation()

  return (
    <div style={{ height: "10vh" }}>
      <div className="d-flex justify-content-between">
        <strong>
          <HashLink to={linkItinerario}>
            <u>
              <small className="text-dark-blue">{nomeItinerario}</small>
            </u>
          </HashLink>
        </strong>
        <div className="d-flex justify-content-between">
          <span className="text-dark-blue mr-2">
            <small className="text-dark-blue text-uppercase">{t('help_panel.tappa')}</small>
          </span>
          <Link to={linkTappa1} className="link-tappa">
            <div
              className={classnames("mr-2", {
                "number-tappa": tappa !== 1,
                "number-tappa-active": tappa === 1,
              })}
            >
              1
            </div>
          </Link>
          <Link to={linkTappa2} className="link-tappa">
            <div
              className={classnames("mr-2", {
                "number-tappa": tappa !== 2,
                "number-tappa-active": tappa === 2,
              })}
            >
              2
            </div>
          </Link>
          <Link to={linkTappa3} className="link-tappa">
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
      <h2 className="text-dark-blue">{titolo}</h2>
      {linkApprofondimento && (
        <div className="d-flex align-items-center">
          <ApprofondimentoIcon />
          <strong className="ml-2">
            <Link to={linkApprofondimento}>
              <u style={{ color: "#000" }}>
                <small className='text-uppercase'>{t('help_panel.approfondimento')}</small>
              </u>
            </Link>
          </strong>
        </div>
      )}
    </div>
  )
}
