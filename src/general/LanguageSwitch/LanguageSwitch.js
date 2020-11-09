import React from 'react'
import { useTranslation } from 'react-i18next'
import { parse, stringify } from 'query-string'

function swithLang(lang) {
  const query = parse(window.location.search)
  const newQuery = { ...query, lang }
  window.location =
    window.location.origin +
    window.location.pathname +
    '?' +
    stringify(newQuery)
}

export default function LanguageSwitch() {
  const { i18n } = useTranslation()

  return (
    <div>
      <button
        style={{
          backgroundColor: i18n.language === 'it' ? 'purple' : undefined,
        }}
        onClick={() => swithLang('it')}
      >
        IT
      </button>
      <span> </span>
      <button
        style={{
          backgroundColor: i18n.language === 'en' ? 'purple' : undefined,
        }}
        onClick={() => swithLang('en')}
      >
        EN
      </button>
    </div>
  )
}
