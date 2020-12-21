import React, {
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
  useMemo,
} from "react"
import HelpSidePanel from "../../panels/HelpSidePanel/HelpSidePanel"
import MainMenu from "../../general/MainMenu"
import PageTitle from "../../general/PageTitle"
import AltOptions from "../../general/Options/AltOptions"
import SearchDropDown from "../../general/Search/SearchDropDownControlled"
import TextSearch from "../../general/TextSearch"
import MoreInfo from "../../general/MoreInfo"
import CompassButton from "../../general/CompassButton/CompassButton"
import useDimensions from "react-use-dimensions"
import GlobalData from "../../utilities/GlobalData"
import RangeFilterSnap from "../../general/RangeFilterSnap"
import { useTranslation, Trans } from "react-i18next"
import sortBy from "lodash/sortBy"
import difference from "lodash/difference"
import uniqBy from "lodash/uniqBy"

import {
  datasetToCircles,
  dataset,
  raccontiDegs as racconti,
  yearsExtent,
  detailWormsCircles,
} from "./utils"
import CircleWorms from "./CircleWorms"
import WormDetail from "./WormDetail"
import { groupBy } from "lodash"

import _titles from "../../general/TextSearch/titles.json"

const LABEL_BEZIER_DELTA_A = 30
const RESET_BOX_HEIGHT = 70
const REALISMO_DIAMETER_BASE = 760

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
  return uniqBy(racconti, "volume").map((racconto) => {
    const volume = racconto.volume
    let volumeLabel = volume
    if (keyByTitolo[volumeLabel]) {
      volumeLabel += " (volume)"
    }
    return {
      label: volumeLabel,
      value: volumeLabel,
      volume: volume,
    }
  })
})()

const titoliByVolume = groupBy(racconti, "volume")
// the following is for the textual search
const availableVolumes = Object.keys(titoliByVolume).map( d=>{
  const title = _titles.find(t=>{
    return t.label.toLowerCase()===d.toLowerCase() && t.value[0].includes("V")
  })
  return title.value
}).flat()

export default function RealismoMain({ title }) {
  const [helpSidePanelOpen, setHelpSidePanelOpen] = useState(true)
  const toggleHelpSidePanel = useCallback(() => {
    setHelpSidePanelOpen((a) => !a)
  }, [])
  const [findFor, setFindFor] = useState("Titolo")
  const [ricerca, setRicerca] = useState([])
  const [ricerca2, setRicerca2] = useState([])

  const { t } = useTranslation(["translation", "realismo"])

  const helpPage = GlobalData.helpPages.realism.main

  const optionsMovimento = [
    {
      label: t("realismo:SI MOVIMENTO"),
      value: "SI MOVIMENTO",
    },
    {
      label: t("realismo:NO MOVIMENTO"),
      value: "NO MOVIMENTO",
    },
  ]

  const optionsSpace = [
    {
      label: t("realismo:INTERNO"),
      value: "indoor",
    },
    {
      label: t("realismo:ESTERNO"),
      value: "outdoor",
    },
    {
      label: t("realismo:MEZZO DI TRASPORTO"),
      value: "transportation",
    },
    {
      label: t("realismo:ASSENZA DI AMBIENTAZIONE"),
      value: "no_setting",
    },
  ]

  const cercaOptions = [
    { label: t("realismo:Titolo"), value: "titolo" },
  ]

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
        if (movimento === "SI MOVIMENTO") {
          keep = dataset[titolo].some((datum) => {
            if (movimento === "SI MOVIMENTO") {
              return datum.movement === "TRUE"
            }
            return false
          })
        } else {
          keep = dataset[titolo].every((datum) => {
            if (movimento === "NO MOVIMENTO") {
              return datum.movement === "FALSE"
            }
            return false
          })
        }
      }

      if (keep && spazioValues.length > 0) {
        const categories = dataset[titolo].map((i) => i.category)
        keep = spazioValues.some((category) => {
          if (category === "indoor" || category === "outdoor") {
            return categories.every((wormCateogry) => wormCateogry === category)
          }
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

  const selectedOnWorms = useMemo(() => {
    const selected2 = { ...selected }
    const omittedKeys = Object.keys(omitted)
    if (omittedKeys.length > 0) {
      const keeped = difference(Object.keys(dataset), omittedKeys)
      keeped.forEach((key) => {
        selected2[key] = true
      })
    }
    return selected2
  }, [selected, omitted])

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
      "value"
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

  const raccontiFontSize = lineHeightRight < 11 ? 11 : 12
  const realismoDiameter =
    heightCircle < REALISMO_DIAMETER_BASE
      ? heightCircle - 10
      : REALISMO_DIAMETER_BASE
  const realismoRadius = realismoDiameter / 2

  const raccontiJoinLines = useMemo(() => {
    const paddingTop = (heightCircle - realismoDiameter) / 2

    return racconti.reduce((acc, racconto) => {
      const isLeft = racconto.rotation >= 90 && racconto.rotation <= 270

      let x1, x2, y1, y2, pointAX, pointAY, pointBX, pointBY

      if (isLeft) {
        const angle = Math.abs(180 - racconto.rotation)
        const index = leftRacconti.indexOf(racconto)
        x2 = -(realismoDiameter / 2 + 100) + 5
        y2 =
          -(realismoDiameter / 2) +
          index * lineHeightLeft +
          lineHeightLeft / 2 -
          paddingTop +
          RESET_BOX_HEIGHT

        y1 =
          -Math.sin((Math.PI / 180) * angle) *
          (realismoRadius - 5) *
          (racconto.rotation > 180 ? 1 : -1)
        x1 = -Math.cos((Math.PI / 180) * angle) * (realismoRadius - 5)

        pointAY =
          -Math.sin((Math.PI / 180) * angle) *
          (realismoRadius + LABEL_BEZIER_DELTA_A) *
          (racconto.rotation > 180 ? 1 : -1)
        pointAX =
          -Math.cos((Math.PI / 180) * angle) *
          (realismoRadius + LABEL_BEZIER_DELTA_A)
      } else {
        const index = rightRacconti.indexOf(racconto)
        x2 = realismoDiameter / 2 + 100 - 5
        y2 =
          -(realismoDiameter / 2) +
          index * lineHeightRight +
          lineHeightRight / 2 -
          paddingTop

        const angle = Math.abs(racconto.rotation)

        y1 =
          -Math.sin((Math.PI / 180) * angle) *
          (realismoRadius - 5) *
          (racconto.rotation > 0 ? -1 : 1)
        x1 = Math.cos((Math.PI / 180) * angle) * (realismoRadius - 5)

        pointAY =
          -Math.sin((Math.PI / 180) * angle) *
          (realismoRadius + LABEL_BEZIER_DELTA_A) *
          (racconto.rotation > 0 ? -1 : 1)
        pointAX =
          Math.cos((Math.PI / 180) * angle) *
          (realismoRadius + LABEL_BEZIER_DELTA_A)
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
    heightCircle,
    realismoDiameter,
    leftRacconti,
    lineHeightLeft,
    realismoRadius,
    rightRacconti,
    lineHeightRight,
  ])

  return (
    <div>
      <HelpSidePanel
        open={helpSidePanelOpen}
        page={helpPage}
        closeButtonClicked={toggleHelpSidePanel}
      />
      <div className="top-nav navigations">
        <MainMenu className="main-menu" style={{ gridColumn: "span 1" }} />
        <PageTitle title={title} style={{ gridColumn: "span 9" }} />
        {/* <AltOptions
          multiple={false}
          title={t("cerca_per")}
          disabled
          options={cercaOptions}
          value={findFor}
          onChange={(x) => setFindFor(x.label)}
          style={{
            gridColumn: "span 3",
          }}
        />
        <SearchDropDown
          style={{
            gridColumn: "span 6",
          }}
          data={{
            options:
              findFor === "Titolo" ? searchOptionsTitolo : searchOptionsVolume,
          }}
          changeOptions={(newOptions) => {
            console.log(newOptions)
            setRicerca(newOptions)
          }}
          selectedOptions={ricerca}
        /> */}

        <TextSearch
          style={{ gridColumn: "span 12" }}
          changeOptions={(newOptions)=>{
            let temp = newOptions.map(d=>
              {
                return d.value.map(id=>
                  racconti.find(dd=>dd.id===id)
                )
              }
            )
            temp = temp.flat()
            temp = temp.filter(d=>d)
            // destination : {label:"title", value:"title"}
            temp = temp.map(d=>({label:d.title, value:d.title}))
            setRicerca(temp)
            setRicerca2(newOptions)
          }}
          selectedOptions={ricerca2}
          availableIds={racconti.map(d=>d.id)}
          availableVolumes={availableVolumes}
          availableOptions={["title","volume"]}
        />

        <MoreInfo
          style={{ gridColumn: "span 1" }}
          helpSidePanelOpen={helpSidePanelOpen}
          onClicked={toggleHelpSidePanel}
        />
        <CompassButton
          style={{
            gridColumn: "span 1",
          }}
        />
      </div>
      <div className="realismo-content">
        <div
          className="h-100 w-100 d-flex justify-content-center realismo-circle-wrapper"
          style={{
            position: "relative",
          }}
        >
          <div className="realismo-labels-container on-left text-right">
            <div className="realismo-reset">
              <div>
                <div>{t("realismo:seleziona_testo")}</div>
                <button
                  onClick={() => {
                    // Reset Selection
                    setRicerca([])
                    setRicerca2([])
                    // Reset Filters
                    setSpazio([])
                    setMovimento(null)
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
                    selected[racconto.title]
                      ? "realismo-label-selected"
                      : omitted[racconto.title]
                      ? "realismo-label-omitted"
                      : ""
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
                selected={selectedOnWorms}
                selectedByHand={selected}
                omitted={omitted}
                circlesMap={circlesMap}
                racconti={racconti}
                raccontiJoinLines={raccontiJoinLines}
                radius={realismoRadius}
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
                    fontSize: `${raccontiFontSize}px`,
                  }}
                  onClick={() => toggleSelect(racconto.title)}
                  className={`realismo-label ${
                    selected[racconto.title]
                      ? "realismo-label-selected"
                      : omitted[racconto.title]
                      ? "realismo-label-omitted"
                      : ""
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
              gridColumn: "span 8",
              textAlign: "center",
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
              gridColumn: "span 8",
              textAlign: "center",
            }}
          />
          <RangeFilterSnap
            style={{ gridColumn: "span 8" }}
            extent={timeFilter}
            update={(timeSpan) => {
              setTimeFilter(timeSpan)
            }}
          />
        </div>
      </div>
      {ricerca.length > 0 && (
        <div className="realismo-details-container" ref={ref}>
          <h4>{t("realismo:vedi_dettaglio")}</h4>
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
