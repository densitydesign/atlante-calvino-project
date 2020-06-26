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
import useDimensions from 'react-use-dimensions'
import GlobalData from '../../utilities/GlobalData'
import RangeFilter from '../../general/RangeFilter'

import sortBy from 'lodash/sortBy'

import {
  datasetToCircles,
  dataset,
  raccontiDegs as racconti,
  yearsExtent,
  detailWormsCircles,
} from './utils'
import CircleWorms from './CircleWorms'
import WormDetail from './WormDetail'
import WormDetail2 from './WormDetail2'

const circlesMap = datasetToCircles(40)

const searchOptions = racconti.map((racconto) => ({
  label: racconto.title,
  value: racconto.title,
}))

const optionsMovimento = [
  {
    label: 'SI MOVIMENTO',
  },
  {
    label: 'NO MOVIMENTO',
  },
]

const optionsSpace = [
  {
    label: 'INTERNO',
    value: 'indoor',
  },
  {
    label: 'ESTERNO',
    value: 'outdoor',
  },
  {
    label: 'MEZZO DI TRANSPORTO',
    value: 'transportation',
  },
  {
    label: 'ASSENZA DI AMBIENTAZIONE',
    value: 'no_setting',
  },
]

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

  const [movimento, setMovimento] = useState(null)
  const [spazio, setSpazio] = useState([])
  const [timeFilter, setTimeFilter] = useState(yearsExtent)
  const spazioLabels = useMemo(() => spazio.map((s) => s.label), [spazio])

  const omitted = useMemo(() => {
    const omittedStuff = {}
    const spazioValues = spazio.map((s) => s.value)
    Object.keys(dataset).forEach((titolo) => {
      let keep = true

      if (keep && movimento !== null) {
        keep = dataset[titolo].some((datum) => {
          if (movimento === 'SI MOVIMENTO') {
            return datum.movement === 'TRUE'
          }
          if (movimento === 'NO MOVIMENTO') {
            return datum.movement === 'FALSE'
          }
          return false
        })
      }

      if (keep && spazioValues.length > 0) {
        const categories = dataset[titolo].map((i) => i.category)
        keep = spazioValues.some((category) => {
          return categories.indexOf(category) !== -1
        })
      }

      if (keep) {
        keep = dataset[titolo].every((d) => {
          return (
            d.year >= timeFilter[0].getFullYear() &&
            d.year <= timeFilter[1].getFullYear()
          )
        })
      }

      if (!keep) {
        omittedStuff[titolo] = true
      }
    })
    return omittedStuff
  }, [movimento, spazio, timeFilter])

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

  const selctedTitoliSorted = useMemo(() => {
    return sortBy(ricerca, (item) => dataset[item.value]?.[0]?.year)
  }, [ricerca])

  const [ref, { width }] = useDimensions({ liveMeasure: false })

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
            <button
              onClick={() => {
                // Reset Selection
                setRicerca([])
                // Reset Filters
                // setSpazio([])
                // setMovimento(null)
                // setTimeFilter(yearsExtent)
              }}
            >
              reset
            </button>
          </div>
          {measures && (
            <CircleWorms
              toggleSelect={toggleSelect}
              selected={selcted}
              omitted={omitted}
              circlesMap={circlesMap}
              racconti={racconti}
              width={measures.width}
              height={measures.height}
            ></CircleWorms>
          )}
        </div>
        <div className="bottom-nav navigations">
          <AltOptions
            title="Movimento"
            options={optionsMovimento}
            value={movimento}
            allowEmpty={true}
            onChange={(m) => {
              if (m) {
                setMovimento(m.label)
              } else {
                setMovimento(null)
              }
            }}
            style={{
              gridColumn: 'span 8',
              textAlign: 'center',
            }}
          />
          <AltOptions
            title="Spazio"
            multiple
            options={optionsSpace}
            value={spazioLabels}
            allowEmpty={true}
            onChange={(s) => {
              setSpazio(s)
            }}
            style={{
              gridColumn: 'span 8',
              textAlign: 'center',
            }}
          />
          <RangeFilter
            style={{ gridColumn: 'span 8' }}
            data={timeFilter}
            changeOptions={(timeSpan) => {
              setTimeFilter(timeSpan)
            }}
          />
        </div>
      </div>
      {ricerca.length > 0 && (
        <div className="realismo-details-container" ref={ref}>
          {width &&
            selctedTitoliSorted.map((item) => (
              <WormDetail2
                data={detailWormsCircles[item.value]}
                year={detailWormsCircles[item.value]?.[0]?.year}
                title={item.value}
                width={width}
                key={item.value}
                toggleSelect={toggleSelect}
              />
              // <WormDetail
              //   width={width}
              //   key={item.value}
              //   title={item.value}
              //   year={dataset[item.value]?.[0]?.year}
              //   circles={circlesMap[item.value]}
              //   toggleSelect={toggleSelect}
              // />
            ))}
        </div>
      )}
    </div>
  )
}
