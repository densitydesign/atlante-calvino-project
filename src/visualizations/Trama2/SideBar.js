import React, { useMemo } from 'react'
import keyBy from 'lodash/keyBy'
import groupBy from 'lodash/groupBy'
import find from 'lodash/find'
import orderBy from 'lodash/orderBy'
import uniq from 'lodash/uniq'

const SideBarItem = React.memo(
  ({
    tipologia,
    addBound,
    disabled,
    selected,
    fromDarkItem,
    itemHeight,
    disableEvents = false,
  }) => (
    <div
      key={tipologia.tipologia}
      onClick={() => addBound(tipologia.tipologia)}
      className={`trama2-sidebar-item
        ${disabled ? 'disabled' : ''}
        ${
          fromDarkItem >= Number(tipologia['ordine tipologia'])
            ? 'item-dark'
            : 'item-light'
        }
        ${disableEvents ? 'no-pointer-events' : ''}
        ${selected ? 'selected' : ''}`}
      style={{
        height: itemHeight,
        background: selected ? tipologia.colore.colori : undefined,
      }}
    >
      {tipologia.tipologia}
    </div>
  )
)

function SideBar({
  tipologie,
  racconti,
  height,
  bounds,
  addBound,
  setBounds,
  tramaDetail,
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

  const fromDarkItem = useMemo(() => {
    return (
      find(tipologie, { tipologia: 'visione' })?.['ordine tipologia'] ??
      -Infinity
    )
  }, [tipologie])

  const motiviDetail = useMemo(() => {
    if (tramaDetail) {
      return uniq(
        orderBy(tramaDetail, 'ordineMotivo', 'desc').map((x) => x.motivo_type)
      )
    }
    return null
  }, [tramaDetail])

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
            {tipologie.map((tipologia) => {
              let disabled
              let selected
              if (motiviDetail) {
                disabled = motiviDetail.indexOf(tipologia.tipologia) === -1
                selected =
                  motiviDetail[0] === tipologia.tipologia ||
                  motiviDetail[motiviDetail.length - 1] === tipologia.tipologia
              } else {
                disabled =
                  lookup !== null &&
                  tipologia.tipologia !== bounds[0] &&
                  (!lookup || !lookup[tipologia.tipologia])
                selected = !!boundsByKey[tipologia.tipologia]
              }
              return (
                <SideBarItem
                  key={tipologia.tipologia}
                  disableEvents={!!motiviDetail}
                  tipologia={tipologia}
                  addBound={addBound}
                  disabled={disabled}
                  selected={selected}
                  itemHeight={itemHeight}
                  fromDarkItem={fromDarkItem}
                />
              )
            })}
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

export default React.memo(SideBar)
