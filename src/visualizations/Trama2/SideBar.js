import React, { useMemo } from 'react'
import keyBy from 'lodash/keyBy'

export default function SideBar({
  tipologie,
  racconti,
  height,
  bounds,
  addBound,
  setBounds,
}) {
  const boundsByKey = keyBy(bounds)

  const itemHeight = height / tipologie.length

  const lookupMap = useMemo(() => {
    return racconti.reduce(
      (looks, racconto) => {
        const min = racconto.minDatum.motivo_type
        const max = racconto.maxDatum.motivo_type
        looks[min] = looks[min] || {}
        looks[max] = looks[max] || {}
        looks[min][max] = true
        looks[max][min] = true
        return looks
      },
      [{}]
    )
  }, [racconti])
  let lookup = null
  if (bounds.length === 1) {
    lookup = lookupMap[bounds[0]]
  }

  return (
    <div className="trama2-sidebar">
      <div className="trama2-sidebar-header"></div>
      {tipologie.map((tipologia) => (
        <div
          key={tipologia.tipologia}
          onClick={addBound(tipologia.tipologia)}
          className={`trama2-sidebar-item
          ${
            lookup !== null &&
            tipologia.tipologia !== bounds[0] &&
            (!lookup || !lookup[tipologia.tipologia])
              ? 'disabled'
              : ''
          }
          ${boundsByKey[tipologia.tipologia] ? 'selected' : ''}`}
          style={{
            height: itemHeight,
            background: boundsByKey[tipologia.tipologia]
              ? tipologia.colore.colori
              : undefined,
          }}
        >
          {tipologia.tipologia}
        </div>
      ))}
      <div>
        {bounds.length > 0 && (
          <span
            onClick={() => {
              setBounds([])
            }}
          >
            Clear
          </span>
        )}
      </div>
    </div>
  )
}
