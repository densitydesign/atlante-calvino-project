import React from 'react'

function BoxPlotGrandientsDefinitions({ prefix = '', gradientsType, byTipologia, scalaMotivo, height }) {

  const colorsItems = Object.values(byTipologia).sort(item => +item.ordineMotivo)
  const delta = 100 / (colorsItems.length - 1)

  return (
    <defs>
      {gradientsType.map(({racconto, uniqueItems}) => {




        const motivi = uniqueItems.map(item => item.motivo_type)


        return (
          <linearGradient
            x1="0"
            x2="0"
            y1="0"
            y2={height}
            key={racconto.titolo}
            id={prefix + racconto.titolo}
            gradientUnits={'userSpaceOnUse'}
          >
            {colorsItems.map((item, i) => {
              if(motivi.indexOf(item.tipologia) === -1){
                return null
              }
              return <stop key={i} offset={`${delta*i}%`} stopColor={item.colore.colori}>


              </stop>
            })}
            {/* <stop offset="0%" stopColor="#000"></stop>
            <stop offset="100%" stopColor="#fff"></stop> */}
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
