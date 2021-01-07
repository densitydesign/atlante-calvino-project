import React, {
  useLayoutEffect,
  useState,
  useCallback,
  useEffect,
  useRef,
  createContext,
} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

//data management
import keyBy from 'lodash/keyBy'
import sortBy from 'lodash/sortBy'

//data helpers
import { MOTIVO_LINE_HEIGHT } from './utils'

//local components
import LineeTrama from './LineeTrama'
import BoxPlot from './BoxPlot'
import TramaDetail from './TramaDetail'
import SideBar from './SideBar'

export const CurretTramaViewContext = createContext('list')

// main component
export default function Trama2Content({
  scalaMotivoY,
  tipologie,
  tipologieByTipologia,
  colors,
  racconti,
  ricerca,
  setFindFor,
  byRacconto,
  selected,
  toggleSelect,
  setSelected,
  currentView,
  setCurrentView,
}) {
  const [sidePanelOpen, setSidePanelOpen] = useState(false)
  const toggleSidePanel = useCallback(() => {
    setSidePanelOpen(!sidePanelOpen)
  }, [sidePanelOpen])

  const containerRef = useRef()
  const [measures, setMeasures] = useState(null)
  useLayoutEffect(() => {
    const m = containerRef.current.getBoundingClientRect()
    setMeasures(m)
  }, [])

  //bounds selection
  const [bounds, setBounds] = useState([])
  const addBound = useCallback(
    (item) => {
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

  useEffect(() => {
    if (bounds.length === 2) {
      const orderedBounds = sortBy(
        bounds,
        (bound) => +tipologieByTipologia[bound]['ordine tipologia']
      )
      const indexes = racconti.reduce((acc, racconto, indenx) => {
        if (
          racconto.minDatum.motivo_type === orderedBounds[0] &&
          racconto.maxDatum.motivo_type === orderedBounds[1]
        ) {
          acc.push(racconto.titolo)
        }
        return acc
      }, [])

      const sel = keyBy(indexes)
      setSelected(sel, true)
    }
  }, [bounds, racconti, setSelected, tipologieByTipologia])

  useEffect(() => {
    if (
      Object.keys(selected).some((key) => selected[key].fromBounds === false)
    ) {
      setBounds([])
    }
  }, [selected])

  const listRef = useRef()
  const [currentTramaDetail, setCurrentTramaDetail] = useState(null)

  const handleClickRacconto = useCallback((data) => {
    setCurrentTramaDetail(data)
    setCurrentView('detail')
  }, [setCurrentView])

  const [years, setYears] = useState([
    racconti[0].anno,
    racconti[racconti.length - 1].anno,
  ])

  return (
    <div className="trama2-container" ref={containerRef}>
      <div className={`trama2-side-panel ${sidePanelOpen ? 'open' : 'closed'}`}>
        <div className="trama2-side-panel-content">
          {measures && (
            <SideBar
              tramaDetail={currentTramaDetail}
              racconti={racconti}
              height={measures.height - 140}
              tipologie={tipologie}
              bounds={bounds}
              addBound={addBound}
              setBounds={setBounds}
            ></SideBar>
          )}
        </div>

        <div
          className={`trama2-side-panel-toggle ${
            sidePanelOpen ? 'open-panel' : ''
          }`}
          onClick={toggleSidePanel}
        >
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </div>

        {currentView !== 'detail' && (
          <div
            className="trama2-side-panel-rotate"
            onClick={() => {
              if (currentView === 'list') {
                listRef.current.rotateView(() => {
                  setCurrentView('boxplot')
                })
              } else {
                setCurrentView('list')
              }
            }}
          >
            Routa la vista
          </div>
        )}
      </div>
      <div className="trama2-content-wrapper">
        {currentView === 'list' && (
          <>
            <div
              style={{
                position: 'absolute',
                top: 80 + MOTIVO_LINE_HEIGHT,
                borderBottom: 'solid #bbb 1px',
              }}
            >
              {years[0]}
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: MOTIVO_LINE_HEIGHT + 30,
                borderBottom: 'solid #bbb 1px',
              }}
            >
              {years[1]}
            </div>
          </>
        )}

        <CurretTramaViewContext.Provider value={currentView}>
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
              ricerca={ricerca}
              setFindFor={setFindFor}
              tipologie={tipologie}
              tipologieByTipologia={tipologieByTipologia}
              data={byRacconto}
              height={MOTIVO_LINE_HEIGHT}
              scalaMotivoY={scalaMotivoY}
              colors={colors}
              setYears={setYears}
            ></LineeTrama>
          </div>

          {currentView === 'boxplot' && measures && (
            <BoxPlot
              onRaccontoClick={handleClickRacconto}
              ref={listRef}
              selected={selected}
              toggleSelect={toggleSelect}
              racconti={racconti}
              tipologie={tipologie}
              tipologieByTipologia={tipologieByTipologia}
              data={byRacconto}
              height={measures.height}
              scalaMotivoY={scalaMotivoY}
              colors={colors}
            ></BoxPlot>
          )}
          {currentView === 'detail' && measures && (
            <TramaDetail
              tipologieByTipologia={tipologieByTipologia}
              detailHeight={measures.height - 140}
              data={currentTramaDetail}
              onBack={() => {
                setCurrentTramaDetail(null)
                setCurrentView('list')
              }}
            />
          )}
        </CurretTramaViewContext.Provider>
      </div>
    </div>
  )
}
