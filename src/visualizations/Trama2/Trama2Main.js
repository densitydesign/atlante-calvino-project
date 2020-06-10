import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react'

//data management
import keyBy from 'lodash/keyBy'
import sortBy from 'lodash/sortBy'

//data helpers
import { makeScalaMotivoY, makeVizData } from './utils'

//local components
import LineeTrama from './LineeTrama'
import TramaDetail from './TramaDetail'
import SideBar from './SideBar'

//VISUAL CONSTANTS
const MOTIVO_LINE_HEIGHT = 50

// SCALES
const scalaMotivoY = makeScalaMotivoY(MOTIVO_LINE_HEIGHT)

// GLOBAL DATA
const {
  tipologie,
  tipologieByTipologia,
  colors,
  racconti,
  byRacconto,
} = makeVizData(scalaMotivoY)

// main component
export default function Trama2Main() {
  const [sidePanelOpen, setSidePanelOpen] = useState(false)
  const toggleSidePanel = useCallback(() => {
    setSidePanelOpen(!sidePanelOpen)
  }, [sidePanelOpen])

  //lines selection
  const [selected, setSelected] = useState({})
  const toggleSelect = useCallback((titolo) => {
    setSelected((selected) => ({ ...selected, [titolo]: !!!selected[titolo] }))
  }, [])

  //bounds selection
  const [bounds, setBounds] = useState([])
  const addBound = useCallback(
    (item) => () => {
      if (bounds.length === 1 && bounds[0] === item) {
        setBounds([])
        return
      }
      if (bounds.length < 2) {
        setBounds(bounds.concat([item]))
      } else {
        setBounds([item])
      }
    },
    [bounds]
  )

  //actual dataset
  const raccontiFiltered = useMemo(() => {
    if (bounds.length === 2) {
      const orderedBounds = sortBy(
        bounds,
        (bound) => tipologieByTipologia[bound]['ordine tipologia']
      )
      return racconti.filter(
        (racconto) =>
          racconto.minDatum.motivo_type === orderedBounds[0] &&
          racconto.maxDatum.motivo_type === orderedBounds[1]
      )
    }

    return racconti
  }, [bounds])

  useEffect(() => {
    if (bounds.length === 2) {
      const orderedBounds = sortBy(
        bounds,
        (bound) => tipologieByTipologia[bound]['ordine tipologia']
      )

      const indexes = racconti
        .map((racconto, index) => [
          racconto.titolo,
          racconto.minDatum.motivo_type,
          racconto.maxDatum.motivo_type,
        ])
        .filter((x) => x[1] === orderedBounds[0] && x[2] === orderedBounds[1])
        .map((x) => x[0])

      const sel = keyBy(indexes)
      setSelected(sel)
    }
  }, [bounds])

  const listRef = useRef()
  const [currentView, setCurrentView] = useState('list')
  const [currentTramaDetail, setCurrentTramaDetail] = useState(null)

  const handleClickRacconto = useCallback((data) => {
    setCurrentTramaDetail(data)
    setCurrentView('detail')
  }, [])

  console.log('tipologie', tipologie)
  console.log('racconti', racconti)
  console.log('raccontiFiltered', raccontiFiltered)
  console.log('bounds', bounds)

  return (
    <div className="trama2-container">
      <div className={`trama2-side-panel ${sidePanelOpen ? 'open' : 'closed'}`}>
        <div className="trama2-side-panel-content">
          <SideBar
            tipologie={tipologie}
            bounds={bounds}
            addBound={addBound}
            setBounds={setBounds}
          ></SideBar>
        </div>

        <div
          className="trama2-side-panel-toggle "
          onClick={toggleSidePanel}
        ></div>

        <div
          className="trama2-side-panel-rotate"
          onClick={() => {
            listRef.current.rotateView(() => {
              setCurrentView('rotated')
            })
          }}
        ></div>
      </div>
      <div className="trama2-content-wrapper">
        <div
          className="trama2-content"
          style={{ display: currentView !== 'list' ? 'none' : undefined }}
        >
          <LineeTrama
            onRaccontoClick={handleClickRacconto}
            ref={listRef}
            selected={selected}
            toggleSelect={toggleSelect}
            racconti={racconti}
            tipologie={tipologie}
            tipologieByTipologia={tipologieByTipologia}
            data={byRacconto}
            height={MOTIVO_LINE_HEIGHT}
            scalaMotivoY={scalaMotivoY}
            colors={colors}
          ></LineeTrama>
        </div>

        {currentView === 'rotated' && <div className="trama2-content"></div>}
        {currentView === 'detail' && (
          <TramaDetail
            tipologieByTipologia={tipologieByTipologia}
            data={currentTramaDetail}
            onBack={() => {
              setCurrentTramaDetail(null)
              setCurrentView('list')
            }}
          />
        )}
      </div>
    </div>
  )
}
