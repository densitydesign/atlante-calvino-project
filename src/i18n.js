import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { parse, stringifyUrl, stringify } from 'query-string'

import { createBrowserHistory as createHistory } from "history"

import Backend from 'i18next-http-backend'
// import LanguageDetector from 'i18next-browser-languagedetector'
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init


// TODO: Can be improved ... use navigation.languages fuck offf
// i18next-browser-languagedetector'
const query = parse(window.location.search)
const queryLng = query.lang ?? 'it'
const lng = ['it', 'en'].includes(queryLng) ? queryLng : 'it'

function hackToWithLang(to) {
  if (typeof to === 'string') {
    return stringifyUrl({ url: to, query: { lang: lng } })
  } else if (typeof to === 'object' && to !== null) {
    const query = parse(to.search ?? '')
    const search = stringify({ ...query, lang: lng })
    return {
      ...to,
      search,
    }
  } else {
    return to
  }
}

export function createHistoryHackedWithI18n(options) {
  const history = createHistory(options)

  // NOTE: HACKER TIME
  const originalCreateHref = history.createHref

  function hackCreateHref(to) {
    const href = originalCreateHref(to)
    const nextHref = stringifyUrl({ url: href, query: { lang: lng } })
    return nextHref
  }
  history.createHref = hackCreateHref

  const originalPush = history.push
  function hackPush(to, state) {
    return originalPush(hackToWithLang(to), state)
  }
  history.push = hackPush

  const originalReplace = history.replace
  function hackReplace(to, state) {
    return originalReplace(hackToWithLang(to), state)
  }
  history.replace = hackReplace

  return history
}

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  // .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'it',
    lng,
    debug: process.env.NODE_ENV !== 'production',

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    saveMissing: process.env.NODE_ENV !== 'production',
    //saveMissing: false,


    ns: ['translation'],
    defaultNS: "translation",

    // TODO: Handle in a more generic way....
    backend: {
      loadPath: process.env.PUBLIC_URL + '/locales/{{lng}}/{{ns}}.json',

      // path to post missing resources
      addPath: '/api/front/locales/add/{{lng}}/{{ns}}',
    }
  })
