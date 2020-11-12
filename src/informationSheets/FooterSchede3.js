import React from "react"
import { Link } from "react-router-dom"
import { HashLink } from "react-router-hash-link"
import classnames from "classnames"
import { useTranslation } from "react-i18next"

import SheetStyles from "./SheetStyles.module.css"

export default function FooterSchede3({
  tappa,
  linkTappaA,
  linkTappaB,
  linkAnalisi,
}) {
  const { t } = useTranslation("translation")
  return (
    <div className={SheetStyles.gridRow}>
      <HashLink to={linkAnalisi}>
        {" "}
        <u>
          {" "}
          <strong
            style={{ gridColumn: "2 / span 1" }}
            className="text-dark-blue text-uppercase"
          >
            {t("analisi")}
          </strong>{" "}
        </u>
      </HashLink>
      <strong className="text-uppercase" style={{ gridColumn: "5 / span 1" }}>
        {t('tappe')}
      </strong>

      <HashLink
        style={{ gridColumn: "6 / span 1" }}
        to={linkTappaA}
        className="link-tappa"
      >
        {" "}
        <div className={classnames("mr-2", "number-tappa")}>1</div>
      </HashLink>
      <HashLink
        style={{ gridColumn: "7 / span 1" }}
        to={linkTappaB}
        className="link-tappa"
      >
        <div className={classnames("mr-2", "number-tappa")}>2</div>
      </HashLink>
    </div>
  )
}
