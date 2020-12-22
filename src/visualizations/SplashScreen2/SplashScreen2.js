import React, { Component } from "react"
import { Link } from "react-router-dom"
import { BsArrowDown } from "react-icons/bs"
import InteractiveLogo from "./InteractiveLogo.js"

import S from "./SplashScreen2.module.css"

import logoFnsnf from "./logo-fnsnf.svg"

import logoUnige from "./logo-unige.svg"
import logoDensityDesign from "./logo-densitydesign.svg"
import logoPolitecnico from "./logo-politecnico.svg"

import logoMondadori from "./logo-mondadori.svg"
import { useTranslation } from "react-i18next"
import { parse, stringify } from "query-string"

function swithLang(lang) {
  const query = parse(window.location.search)
  const newQuery = { ...query, lang }
  window.location =
    window.location.origin +
    window.location.pathname +
    "?" +
    stringify(newQuery)
}

export default function SplashScreen2() {
  const { t, i18n } = useTranslation("translation")
  const langNotSelected = i18n.language === "it" ? "en" : "it"
  return (
    <div className={S["splash-container"]}>
      <svg
        className={S["bg-svg"]}
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          className={S["line"]}
          d="M0,12.5 C 25,12.5 75,62.5 100,62.5"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className={S["line"]}
          d="M-50,12.5 C 50,12.5 50,112.5 150,112.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className={S["project-logo"]}>
        <Link to="/navigation" style={{ width: "100%", height: "100%" }}>
          <InteractiveLogo />
        </Link>
      </div>
      <div className={S["subtitle"]}>
        <Link to="/navigation" className={S["disabled-link"]}>
          <h2
            style={{ backgroundColor: "var(--cool-bg)", textAlign: "center" }}
          >
            {t("Letteratura e visualizzazione")}
          </h2>
        </Link>
      </div>
      <div className={S["arrow-down"]}>
        <Link to="/navigation" className={S["disabled-link"]}>
          <div>
            <BsArrowDown color="var(--dark-blue)" />
          </div>
        </Link>
      </div>
      <div className={S["logos-left"]}>
        <a href="http://www.snf.ch/">
          <img src={logoFnsnf} alt="" />
        </a>
      </div>
      <div className={S["logos-center"]}>
        <a href="https://www.unige.ch/">
          <img src={logoUnige} alt="" />
        </a>
        <a href="http://densitydesign.org/">
          <img src={logoDensityDesign} alt="Density Design" />
        </a>
        <a href="http://www.dipartimentodesign.polimi.it/">
          <img src={logoPolitecnico} alt="Polimi" />
        </a>
      </div>
      <div className={S["logos-right"]}>
        <a href="https://www.mondadori.it/">
          <img src={logoMondadori} alt="Mondadori" />
        </a>
      </div>
      <div
        className="position-absolute d-flex cursor-pointer"
        style={{ top: 20, right: 40 }}
      >
        <div
          className="text-center pb-1 font-weight-bold"
          style={{
            borderBottom:
              i18n.language === "it"
                ? "2.5px solid #5151FC"
                : "2.5px solid #C6CACF",
            fontSize: 10,
            color: i18n.language === "it" ? "#5151FC" : "#C6CACF",
            width: 42,
          }}
          onClick={() => swithLang("it")}
        >
          IT
        </div>
        <div
          className="text-center pb-1 font-weight-bold"
          style={{
            borderBottom:
              i18n.language === "en"
                ? "2.5px solid #5151FC"
                : "2.5px solid #C6CACF",
            fontSize: 10,
            color: i18n.language === "en" ? "#5151FC" : "#C6CACF",
            width: 42,
          }}
          onClick={() => swithLang("en")}
        >
          EN
        </div>
      </div>
    </div>
  )
}
