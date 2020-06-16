import React, { useState, useCallback, useRef, useLayoutEffect } from 'react'
import HelpSidePanel from '../../panels/HelpSidePanel/HelpSidePanel'
import MainMenu from '../../general/MainMenu'
import PageTitle from '../../general/PageTitle'
import AltOptions from '../../general/Options/AltOptions'
import SearchDropDown from '../../general/Search/SearchDropDownControlled'
import MoreInfo from '../../general/MoreInfo'
import CompassButton from '../../general/CompassButton/CompassButton'

import GlobalData from '../../utilities/GlobalData'

import { datasetToCircles, dataset, racconti } from './utils'
import CircleWorms from './CircleWorms'

const circlesMap = datasetToCircles(30)

const searchOptions = racconti.map((racconto) => ({
  label: racconto.titolo,
  value: racconto.titolo,
}))

console.log('dataset', dataset)
console.log('circlesMap', circlesMap)

const cercaOptions = [{ label: 'Volume' }]

export default function RealismoMain({ title }) {
  const [helpSidePanelOpen, setHelpSidePanelOpen] = useState(false)
  const toggleHelpSidePanel = useCallback(() => {
    setHelpSidePanelOpen((a) => !a)
  }, [])
  const [ricerca, setRicerca] = useState([])

  const helpPage = GlobalData.helpPages.plot.main

  const containerRef = useRef()
  const [measures, setMeasures] = useState(null)
  useLayoutEffect(() => {
    const m = containerRef.current.getBoundingClientRect()
    setMeasures(m)
  }, [])
  const size =
    measures === null ? null : Math.min(measures.width, measures.height)
  console.log('MES', size)

  return (
    <div>
      <HelpSidePanel
        open={helpSidePanelOpen}
        page={helpPage}
        closeButtonClicked={toggleHelpSidePanel}
      />
      <div className="top-nav navigations">
        <MainMenu className="main-menu" style={{ gridColumn: 'span 1' }} />
        <PageTitle title={title} style={{ gridColumn: 'span 10' }} />
        <AltOptions
          title="Cerca per"
          options={cercaOptions}
          disabled={true}
          value={'Volume'}
          onChange={(x) => {}}
          style={{
            gridColumn: 'span 3',
          }}
        />
        <SearchDropDown
          style={{
            gridColumn: 'span 8',
          }}
          data={{ options: searchOptions }}
          changeOptions={(newOptions) => {
            setRicerca(
              newOptions.map((o) => ({
                ...o,
                fromBounds: false,
              }))
            )
          }}
          selectedOptions={ricerca}
        />
        <MoreInfo
          style={{ gridColumn: 'span 1' }}
          onClicked={toggleHelpSidePanel}
        />
        <CompassButton
          style={{
            gridColumn: 'span 1',
            color: 'white',
            backgroundColor: 'black',
          }}
        />
      </div>
      <div className="realismo-content " ref={containerRef}>
        <div className="h-100 w-100 d-flex justify-content-center align-items-center">
          <CircleWorms
            circlesMap={circlesMap}
            racconti={racconti}
            size={size}
          ></CircleWorms>
        </div>
      </div>
    </div>
  )
}
