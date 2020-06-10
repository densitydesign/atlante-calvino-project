import React from 'react'

function GrandientsDefinitions({ prefix = '', gradientsType, byTipologia }) {
  return (
    <defs>
      {gradientsType.map((gradientType) => {
        const [tipoFromName, tipoToName] = gradientType.split('-')
        const tipoFrom = byTipologia[tipoFromName]
        const tipoTo = byTipologia[tipoToName]
        return (
          <linearGradient
            x1="0"
            x2="0"
            y1="0"
            y2="1"
            key={gradientType}
            id={prefix + gradientType}
          >
            {+tipoFrom['ordine tipologia'] > +tipoTo['ordine tipologia'] && (
              <>
                <stop offset="0%" stopColor={tipoFrom.colore.colori}></stop>
                <stop offset="100%" stopColor={tipoTo.colore.colori}></stop>
              </>
            )}
            {+tipoFrom['ordine tipologia'] < +tipoTo['ordine tipologia'] && (
              <>
                <stop offset="0%" stopColor={tipoTo.colore.colori}></stop>
                <stop offset="100%" stopColor={tipoFrom.colore.colori}></stop>
              </>
            )}
          </linearGradient>
        )
      })}
    </defs>
  )
}

export default React.memo(GrandientsDefinitions)
