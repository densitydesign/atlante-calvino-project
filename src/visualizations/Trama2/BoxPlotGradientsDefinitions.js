import React from 'react'

function BoxPlotGrandientsDefinitions({ prefix = '', gradientsType, byTipologia, scalaMotivo }) {
  return (
    <defs>
      {gradientsType.map(({racconto, uniqueItems}) => {
        
        console.log(123, uniqueItems)
        
        
        // const [tipoFromName, tipoToName] = gradientType.split('-')
        // const tipoFrom = byTipologia[tipoFromName]
        // const tipoTo = byTipologia[tipoToName]
        return (
          <linearGradient
            x1="0"
            x2="0"
            y1="0"
            y2="1"
            key={racconto.titolo}
            id={prefix + racconto.titolo}
          >
            {uniqueItems.map(item => (<stop key={item.ordineMotivo} offset={`${scalaMotivo(item.ordineMotivo)}%`} stopColor={item.colori}>


            </stop>))}
            {/* {+tipoFrom['ordine tipologia'] > +tipoTo['ordine tipologia'] && (
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
            )} */}
          </linearGradient>
        )
      })}
    </defs>
  )
}

export default React.memo(BoxPlotGrandientsDefinitions)
