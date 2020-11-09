import React from "react"
import { Link } from "react-router-dom"
import { HashLink } from "react-router-hash-link"
import classnames from "classnames"

import SheetStyles from "./SheetStyles.module.css";

export default function FooterSchede1({
  tappa,
  linkTappaA,
  linkTappaB,
  linkAnalisi,
}) {


  return (

      <div className={SheetStyles.gridRow}>

        <HashLink to={linkAnalisi}> <u> <strong style={{gridColumn:'2 / span 1'}}
        className="text-dark-blue">ANALISI</strong> </u>
        </HashLink>
        <strong style={{gridColumn:'5 / span 1'}}>TAPPE</strong>

        <HashLink  style={{gridColumn:'6 / span 1'}} to={linkTappaA} className="link-tappa"> <div
        className={classnames("mr-2", "number-tappa")}>2</div>
        </HashLink>
        <HashLink style={{gridColumn:'7 / span 1'}}
        to={linkTappaB} className="link-tappa"><div
        className={classnames("mr-2", "number-tappa")}>3</div>
        </HashLink>
      </div>

  )
}
