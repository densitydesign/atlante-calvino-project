import React, { useCallback, useState, useMemo } from 'react'
import MainMenu from '../../general/MainMenu'
import PageTitle from '../../general/PageTitle'
import MoreInfo from '../../general/MoreInfo'
import CompassButton from '../../general/CompassButton/CompassButton'
import SearchDropDown from '../../general/Search/SearchDropDownControlled'
import HelpSidePanel from '../../panels/HelpSidePanel/HelpSidePanel'

import AltOptions from '../../general/Options/AltOptions'
import GlobalData from '../../utilities/GlobalData'
import Trama2Content from './Trama2Content'
import { makeScalaMotivoY, makeVizData, MOTIVO_LINE_HEIGHT } from './utils'
import keyBy from 'lodash/keyBy'
import flatMap from 'lodash/flatMap'
import uniq from 'lodash/uniq'
import uniqBy from 'lodash/uniqBy'
import './Trama2.css'
import { useTranslation } from 'react-i18next'

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

// we leverage react lazy+suspense to load core component at first render (it will load all json by importing it)

const searchOptions = racconti.map((racconto) => ({
  label: racconto.titolo,
  value: racconto.titolo,
  volume: racconto.volume,
}))

const searchOptonsVolume = uniq(
  racconti.map((r) => r.volume).filter(Boolean)
).map((v) => ({
  label: v,
  value: v,
  volume: true,
}))

const cercaOptions = [
  { label: 'Titolo', value: 'titolo' },
  { label: 'Volume', value: 'volume' },
]

function Trama2Main({ title }) {
  const [helpSidePanelOpen, setHelpSidePanelOpen] = useState(true)
  const [ricercaTop, setRicercaTop] = useState([])
  const [ricerca, setRicerca] = useState([])

  const [currentView, setCurrentView] = useState('list')

  const toggleHelpSidePanel = useCallback(() => {
    setHelpSidePanelOpen((a) => !a)
  }, [])

  const helpPage = GlobalData.helpPages.plot.main

  const setSelected = useCallback((selection, fromBounds = false) => {
    const newRicerca = Object.keys(selection).map((titolo) => ({
      label: titolo,
      value: titolo,
      fromBounds,
    }))
    setRicerca(newRicerca)
  }, [])

  const toggleSelect = useCallback((titolo) => {
    setRicerca((ricerca) => {
      let clearedBounds = false
      const newRicerca = ricerca.filter((item) => {
        // Remove from bounds items
        if (item.fromBounds === true) {
          clearedBounds = true
          return false
        }
        return item.label !== titolo
      })
      if (newRicerca.length < ricerca.length && !clearedBounds) {
        return newRicerca
      } else {
        return newRicerca.concat({ label: titolo, value: titolo })
      }
    })
  }, [])
  const selected = useMemo(() => {
    return keyBy(
      ricerca.map((item) => ({
        value: item.value,
        fromBounds: item.fromBounds === undefined ? false : item.fromBounds,
      })),
      'value'
    )
  }, [ricerca])

  const { t } = useTranslation('translation')
  const [findFor, setFindFor] = useState('titolo')

  return (
    <div className="trasformare main">
      <HelpSidePanel
        open={helpSidePanelOpen}
        page={helpPage}
        isFullPage={true}
        helpPages={currentView}
        closeButtonClicked={toggleHelpSidePanel}
      />

      <div className="top-nav navigations">
        <MainMenu className="main-menu" style={{ gridColumn: 'span 1' }} />
        <PageTitle title={title} style={{ gridColumn: 'span 10' }} />

        <AltOptions
          title={t('cerca_per')}
          options={cercaOptions}
          value={findFor}
          onChange={(x) => setFindFor(x.value)}
          style={{
            gridColumn: 'span 3',
          }}
        />

        <SearchDropDown
          style={{
            gridColumn: 'span 8',
          }}
          data={{
            options: findFor === 'titolo' ? searchOptions : searchOptonsVolume,
          }}
          changeOptions={(newOptions) => {
            // In top bar
            setRicercaTop(
              newOptions.map((o) => ({
                ...o,
                fromBounds: false,
              }))
            )
            // In chart...
            const racconti = newOptions.filter((o) => o.volume !== true)
            const volumi = newOptions.filter((o) => o.volume === true)
            const raccontiInVolumi = flatMap(volumi.map((v) =>
              searchOptions.filter((o) => o.volume === v.value)
            ))
            const finalRicerca = uniqBy(racconti.concat(raccontiInVolumi), v => v.value)
            setRicerca(finalRicerca)
          }}
          selectedOptions={ricercaTop}
        />

        <MoreInfo
          helpSidePanelOpen={helpSidePanelOpen}
          style={{ gridColumn: 'span 1' }}
          onClicked={toggleHelpSidePanel}
        />
        <CompassButton
          style={{
            gridColumn: 'span 1',
          }}
        />
      </div>

      <Trama2Content
        scalaMotivoY={scalaMotivoY}
        tipologie={tipologie}
        tipologieByTipologia={tipologieByTipologia}
        colors={colors}
        racconti={racconti}
        currentView={currentView}
        setCurrentView={setCurrentView}
        byRacconto={byRacconto}
        selected={selected}
        setSelected={setSelected}
        toggleSelect={toggleSelect}
      ></Trama2Content>
    </div>
  )
}

export default Trama2Main
