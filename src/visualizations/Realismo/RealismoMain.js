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
import uniqBy from 'lodash/uniqBy'

import {
  datasetToCircles,
  dataset,
  raccontiDegs as racconti,
  yearsExtent,
  detailWormsCircles,
} from './utils'
import CircleWorms from './CircleWorms'
import WormDetail from './WormDetail'
import { groupBy } from 'lodash'

const LABEL_BEZIER_DELTA_A = 30
const RESET_BOX_HEIGHT = 70
const REALISMO_DIAMETER = 760
const REALISMO_RADIUS = REALISMO_DIAMETER / 2

const circlesMap = datasetToCircles(40)

const searchOptionsTitolo = racconti.map((racconto) => ({
  label: racconto.title,
  value: racconto.title,
}))
const searchOptionsVolume = (() => {
  const keyByTitolo = racconti.reduce((acc, r) => {
    acc[r.title] = true
    return acc
  }, {})
  return uniqBy(racconti, 'volume').map((racconto) => {
    const volume = racconto.volume
    let volumeLabel = volume
    if (keyByTitolo[volumeLabel]) {
      volumeLabel += ' (volume)'
    }
    return {
      label: volumeLabel,
      value: volumeLabel,
      volume: volume,
    }
  })
})()

const titoliByVolume = groupBy(racconti, 'volume')

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

const cercaOptions = [
  { label: 'Volume', value: 'volume' },
  { label: 'Titolo', value: 'titolo' },
]

export default function RealismoMain({ title }) {
  const [helpSidePanelOpen, setHelpSidePanelOpen] = useState(false)
  const toggleHelpSidePanel = useCallback(() => {
    setHelpSidePanelOpen((a) => !a)
  }, [])
  const [findFor, setFindFor] = useState('Titolo')
  const [ricerca, setRicerca] = useState([])

  const helpPage = GlobalData.helpPages.plot.main

  // const containerRef = useRef()
  // const [measures, setMeasures] = useState(null)
  // useLayoutEffect(() => {
  //   const m = containerRef.current.getBoundingClientRect()
  //   setMeasures(m)
  // }, [])
  const [ref, { width }] = useDimensions({ liveMeasure: false })
  const [refCirlce, { height: heightCircle }] = useDimensions({
    liveMeasure: false,
  })

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
        if (movimento === 'SI MOVIMENTO') {
          keep = dataset[titolo].some((datum) => {
            if (movimento === 'SI MOVIMENTO') {
              return datum.movement === 'TRUE'
            }
            return false
          })
        } else {
          keep = dataset[titolo].every((datum) => {
            if (movimento === 'NO MOVIMENTO') {
              return datum.movement === 'FALSE'
            }
            return false
          })
        }
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

  const selected = useMemo(() => {
    const mapSelected = {}
    const volumeSelected = {}
    ricerca.forEach((item) => {
      if (!item.volume) {
        mapSelected[item.value] = true
      } else {
        volumeSelected[item.volume] = true
      }
    })
    racconti
      .filter((r) => volumeSelected[r.volume])
      .forEach((item) => {
        mapSelected[item.title] = true
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
    const ricercaTitoli = uniqBy(
      ricerca
        .filter((r) => r.volume)
        .reduce(
          (acc, r) =>
            acc.concat(
              titoliByVolume[r.volume].map((r) => ({
                value: r.title,
                label: r.title,
              }))
            ),
          []
        )
        .concat(ricerca.filter((r) => !r.volume)),
      'value'
    )
    return sortBy(ricercaTitoli, (item) => dataset[item.value]?.[0]?.year)
  }, [ricerca])

  const leftRacconti = useMemo(() => {
    return racconti
      .filter((r) => r.rotation >= 90 && r.rotation <= 270)
      .reverse()
  }, [])

  const rightRacconti = useMemo(() => {
    return racconti.filter((r) => !(r.rotation >= 90 && r.rotation <= 270))
  }, [])

  const lineHeightRight = heightCircle / rightRacconti.length
  const lineHeightLeft = (heightCircle - RESET_BOX_HEIGHT) / leftRacconti.length

  const raccontiJoinLines = useMemo(() => {
    const paddingTop = (heightCircle - REALISMO_DIAMETER) / 2

    return racconti.reduce((acc, racconto) => {
      const isLeft = racconto.rotation >= 90 && racconto.rotation <= 270

      let x1, x2, y1, y2, pointAX, pointAY, pointBX, pointBY

      if (isLeft) {
        const angle = Math.abs(180 - racconto.rotation)
        const index = leftRacconti.indexOf(racconto)
        x2 = -(REALISMO_DIAMETER / 2 + 100) + 5
        y2 =
          -(REALISMO_DIAMETER / 2) +
          index * lineHeightLeft +
          lineHeightLeft / 2 -
          paddingTop +
          RESET_BOX_HEIGHT

        y1 =
          -Math.sin((Math.PI / 180) * angle) *
          (REALISMO_RADIUS - 5) *
          (racconto.rotation > 180 ? 1 : -1)
        x1 = -Math.cos((Math.PI / 180) * angle) * (REALISMO_RADIUS - 5)

        pointAY =
          -Math.sin((Math.PI / 180) * angle) *
          (REALISMO_RADIUS + LABEL_BEZIER_DELTA_A) *
          (racconto.rotation > 180 ? 1 : -1)
        pointAX =
          -Math.cos((Math.PI / 180) * angle) *
          (REALISMO_RADIUS + LABEL_BEZIER_DELTA_A)
      } else {
        const index = rightRacconti.indexOf(racconto)
        x2 = REALISMO_DIAMETER / 2 + 100 - 5
        y2 =
          -(REALISMO_DIAMETER / 2) +
          index * lineHeightRight +
          lineHeightRight / 2 -
          paddingTop

        const angle = Math.abs(racconto.rotation)

        y1 =
          -Math.sin((Math.PI / 180) * angle) *
          (REALISMO_RADIUS - 5) *
          (racconto.rotation > 0 ? -1 : 1)
        x1 = Math.cos((Math.PI / 180) * angle) * (REALISMO_RADIUS - 5)

        pointAY =
          -Math.sin((Math.PI / 180) * angle) *
          (REALISMO_RADIUS + LABEL_BEZIER_DELTA_A) *
          (racconto.rotation > 0 ? -1 : 1)
        pointAX =
          Math.cos((Math.PI / 180) * angle) *
          (REALISMO_RADIUS + LABEL_BEZIER_DELTA_A)
      }

      pointBX = (x1 + x2) / 2
      pointBY = y2

      acc[racconto.title] = {
        x1,
        y1,
        x2,
        y2,
        pointAX,
        pointAY,
        pointBX,
        pointBY,
      }

      return acc
    }, {})
  }, [
    leftRacconti,
    rightRacconti,
    heightCircle,
    lineHeightRight,
    lineHeightLeft,
  ])

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
          multiple={false}
          title="Cerca per"
          options={cercaOptions}
          value={findFor}
          onChange={(x) => setFindFor(x.label)}
          style={{
            gridColumn: 'span 3',
          }}
        />
        <SearchDropDown
          style={{
            gridColumn: 'span 8',
          }}
          data={{
            options:
              findFor === 'Titolo' ? searchOptionsTitolo : searchOptionsVolume,
          }}
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
      <div className="realismo-content">
        <div
          className="h-100 w-100 d-flex justify-content-center realismo-circle-wrapper"
          style={{
            position: 'relative',
          }}
        >
          <div className="realismo-labels-container on-left text-right">
            <div className="realismo-reset">
              <div>
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
                  Reset
                </button>
              </div>
            </div>
            {leftRacconti.map((racconto, i) => {
              return (
                <div
                  onClick={() => toggleSelect(racconto.title)}
                  className={`realismo-label ${
                    selected[racconto.title] ? 'realismo-label-selected' : ''
                  }`}
                  style={{
                    height: `${lineHeightLeft}px`,
                    lineHeight: `${lineHeightLeft}px`,
                  }}
                  key={i}
                >
                  {racconto.title}
                </div>
              )
            })}
          </div>
          <div className="circle-worms-the-wrapper" ref={refCirlce}>
            {heightCircle && (
              <CircleWorms
                heightCircle={heightCircle}
                toggleSelect={toggleSelect}
                selected={selected}
                omitted={omitted}
                circlesMap={circlesMap}
                racconti={racconti}
                raccontiJoinLines={raccontiJoinLines}
                radius={REALISMO_RADIUS}
              ></CircleWorms>
            )}
          </div>
          <div className="realismo-labels-container on-right">
            {rightRacconti.map((racconto, i) => {
              return (
                <div
                  style={{
                    lineHeight: `${lineHeightRight}px`,
                    height: `${lineHeightRight}px`,
                  }}
                  onClick={() => toggleSelect(racconto.title)}
                  className={`realismo-label ${
                    selected[racconto.title] ? 'realismo-label-selected' : ''
                  }`}
                  key={i}
                >
                  {racconto.title}
                </div>
              )
            })}
          </div>
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
          <h4>VEDI IN DETTAGLIO I TESTI SELEZIONATI</h4>
          {width &&
            selctedTitoliSorted.map((item) => (
              <WormDetail
                data={detailWormsCircles[item.value]}
                year={detailWormsCircles[item.value]?.[0]?.year}
                title={item.value}
                width={width}
                key={item.value}
                toggleSelect={toggleSelect}
              />
            ))}
        </div>
      )}
    </div>
  )
}
