import React, {
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
  useMemo,
} from 'react'
import HelpSidePanel from '../../panels/HelpSidePanel/HelpSidePanel'
import MainMenu from '../../general/MainMenu'
import PageTitle from '../../general/PageTitle'
import AltOptions from '../../general/Options/AltOptions'
import SearchDropDown from '../../general/Search/SearchDropDownControlled'
import MoreInfo from '../../general/MoreInfo'
import CompassButton from '../../general/CompassButton/CompassButton'
import useDimensions from "react-use-dimensions";
import GlobalData from '../../utilities/GlobalData'

import { datasetToCircles, dataset, racconti } from './utils'
import CircleWorms from './CircleWorms'
import WormDetail from './WormDetail'

const circlesMap = datasetToCircles(30)

const searchOptions = racconti.map((racconto) => ({
  label: racconto.title,
  value: racconto.title,
}))

// console.log('dataset', dataset)
// console.log('circlesMap', circlesMap)

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

  const selcted = useMemo(() => {
    const mapSelected = {}
    ricerca.forEach((item) => {
      mapSelected[item.value] = true
    })
    return mapSelected
  }, [ricerca])

  const toggleSelect = useCallback((title) => {
    setRicerca((ricerca) => {
      const newRicerca = ricerca.filter((item) => item.value !== title)
      if (ricerca.length === newRicerca.length) {
        return ricerca.concat({ label: title, value: title })
      }
      return newRicerca
    })
  }, [])

  const [ref, { x, y, width, height }] = useDimensions();

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
            setRicerca(newOptions)
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
        <div
          className="h-100 w-100 d-flex justify-content-center align-items-center"
          style={{
            position: 'relative',
          }}
        >
          <div className="realismo-reset">
            <div>Seleziona i test e poi scorri in basso</div>
            <button onClick={() => setRicerca([])}>reset</button>
          </div>
          <CircleWorms
            toggleSelect={toggleSelect}
            selected={selcted}
            circlesMap={circlesMap}
            racconti={racconti}
            size={size}
          ></CircleWorms>
        </div>
      </div>
      {ricerca.length > 0 && <div className="realismo-details-container" ref={ref}>
      {width && ricerca.map((item) => (
        <WormDetail
          width={width}
          key={item.value}
          title={item.value}
          circles={circlesMap[item.value]}
        />
      ))}
      </div>}
    </div>
  )
}
