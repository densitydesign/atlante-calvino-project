import React, { useState } from "react"
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

export default function LanguageSwitch() {
  const { i18n } = useTranslation()

  const [openLang, setOpenLang] = useState(false)

  const langNotSelected = i18n.language === "it" ? "en" : "it"

  return (
    <div>
      <div className="cursor-pointer" onClick={() => setOpenLang(!openLang)}>
        {i18n.language === "it" ? "IT" : "EN"}
      </div>
      {openLang && (
        <div className="lang-switch" onClick={() => swithLang(langNotSelected)}>
          {i18n.language === "it" ? "EN" : "IT"}
        </div>
      )}
    </div>
  )
}
