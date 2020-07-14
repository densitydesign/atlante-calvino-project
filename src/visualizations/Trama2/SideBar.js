import React, { useMemo } from 'react'
import keyBy from 'lodash/keyBy'
import groupBy from 'lodash/groupBy'
import { find } from 'lodash'

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

  const tipologieGrouped = useMemo(() => {
    return groupBy(tipologie, 'cluster tipologia')
  }, [tipologie])
  console.log('U.u', tipologieGrouped)

  const fromDarkItem = useMemo(() => {
    return (
      find(tipologie, { tipologia: 'visione' })?.['ordine tipologia'] ??
      -Infinity
    )
  }, [tipologie])

  return (
    <div className="trama2-sidebar">
      <div className="trama2-sidebar-header">
        Ordine <br />
        di turbamento
      </div>
      {Object.keys(tipologieGrouped).map((k) => {
        const tipologie = tipologieGrouped[k]
        return (
          <div className="trama2-sidebar-content" key={k}>
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
            ${
              fromDarkItem >= Number(tipologia['ordine tipologia'])
                ? 'item-dark'
                : 'item-light'
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
          </div>
        )
      })}
      <div className="trama2-sidebar-footer">
        Clicca per scegliere il <br />
        punto più alto e più basso
        <br />
        delle curve
      </div>
      {/* <div>
        {bounds.length > 0 && (
          <span
            onClick={() => {
              setBounds([])
            }}
          >
            Clear
          </span>
        )}
      </div> */}
    </div>
  )
}
