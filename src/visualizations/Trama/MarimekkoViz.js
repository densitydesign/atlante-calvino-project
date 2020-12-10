import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback
} from "react";
import { scaleLinear } from "d3";
import sumBy from "lodash/sumBy";
import sum from "lodash/sum";
import uniqBy from "lodash/uniqBy";
import styles from "./Trama.module.css";
import sortBy from "lodash/sortBy";
import groupBy from "lodash/groupBy";
import pick from "lodash/pick";
import find from "lodash/find";
import get from "lodash/get";
import max from "lodash/max";
import maxBy from "lodash/maxBy";
import keyBy from "lodash/keyBy";
import findLastIndex from "lodash/findLastIndex";
import findIndex from "lodash/findIndex";
import range from "lodash/range"

import MarimekkoLegend from "./MarimekkoLegend";
import MarimekkoTopAxis from "./MarimekkoTopAxis";
import MarimekkoChart from "./MarimekkoChart";
import { MarimekkoSlider, MarimekkoSliderArrow } from "./MarimekkoSliderNative";
import {
  levelMaps,
  levelMapsInverted,
  computeHorizontalPositions,
  computeSequences,
  findAtChar
} from "./helpers";
import mappaCategorie from "./mappa-categorie.json";
import mappaClusterTipologie from "./mappa-cluster-tipologie.json";
import volumi from "./volumi.json";
import { useTranslation } from "react-i18next";

const volumiByID = keyBy(volumi, "textID");

const coloriCategorie = mappaCategorie.reduce((out, c) => {
  out[c.categoria] = c.colore;
  return out;
}, {});

const coloriClusterTipologie = mappaClusterTipologie
  .filter(x => x.gruppo)
  .reduce((out, c) => {
    out[c.valore] = c.colore;
    return out;
  }, {});

const defaultOptions = {
  dettaglio: "ambito",
  aggregazione: "aggregato",
  ricerca: []
};

const computeChartBooksAggregated = (firstLevelRecords, opts) => {
  const dettaglioKey =
    opts.dettaglio === "ambito"
      ? "categorie di tipologia"
      : "cluster tipologie";

  let chartBooks = groupBy(firstLevelRecords, "textID");
  chartBooks = Object.keys(chartBooks).reduce((out, item, idx) => {
    let chartBooksDetail = groupBy(chartBooks[item], dettaglioKey);

    out[item] = Object.keys(chartBooksDetail).reduce((o, x) => {
      o[x] = sumBy(chartBooksDetail[x], d => +d["somma ripetizioni"]);
      return o;
    }, {});

    //normalizing data and building an array of objects with {label, value, color}
    const totalForBook = sum(Object.values(out[item]));
    // const totalForBook = +chartBooks[item][0].caratteri

    out[item] = Object.keys(out[item]).reduce((o, k) => {
      const color =
        opts.dettaglio === "ambito"
          ? get(coloriCategorie, k)
          : get(coloriClusterTipologie, k);
      const obj = { label: k, value: out[item][k] / totalForBook, color };
      o.push(obj);
      return o;
    }, []);

    return out;
  }, {});

  return chartBooks;
};

const computeChartBooksDisaggregated = (firstLevelRecords, opts) => {
  const dettaglioKey =
    opts.dettaglio === "ambito"
      ? "categorie di tipologia"
      : "cluster tipologie";

  let chartBooks = groupBy(firstLevelRecords, "textID");
  chartBooks = Object.keys(chartBooks).reduce((out, textID, idx) => {
    const totalForBook = sumBy(
      chartBooks[textID],
      item => +item["somma ripetizioni"]
    );
    out[textID] = chartBooks[textID].map(record => {
      const label = get(record, dettaglioKey);
      const color =
        opts.dettaglio === "ambito"
          ? get(coloriCategorie, label)
          : get(coloriClusterTipologie, label);
      return {
        label,
        value: +record["somma ripetizioni"] / totalForBook,
        offset: +record.starts_at / totalForBook,
        color
      };
    });

    return out;
  }, {});
  return chartBooks;
};

const preprocessData = (data, options = {}) => {
  const opts = {
    ...defaultOptions,
    ...options
  };

  let firstLevelRecords = data.filter(item => item.livello === "uno");
  if (Array.isArray(opts.ricerca) && opts.ricerca.length > 0) {
    const ricercaLookup = keyBy(opts.ricerca);
    firstLevelRecords = firstLevelRecords.filter(x => ricercaLookup[x.textID]);
  }
  const levelsMapped = uniqBy(data, item => `${item.textID}+${item.livello}`)
    .map(x => pick(x, ["textID", "livello"]))
    .map(x => ({ ...x, livelloNum: levelMaps[x.livello] }));

  const levelsMappedById = groupBy(levelsMapped, "textID");

  const tipologiaLookup = Object.keys(levelsMappedById).reduce(
    (acc, textID) => {
      acc[textID] = maxBy(levelsMappedById[textID], "livelloNum").livello;
      return acc;
    },
    {}
  );

  const booksData = uniqBy(firstLevelRecords, "textID")
    .filter(item => opts.tipologia.indexOf(tipologiaLookup[item.textID]) !== -1)
    .map(item => {
      let out = pick(item, ["textID", "anno", "mese", "caratteri"]);
      out.caratteri = +out.caratteri;
      out.mese = +out.mese;
      out.anno = +out.anno;

      //
      const sequencesMapForBook = computeSequences(data, item.textID);
      const sequencesMatchesForBook = sequencesMapForBook
        .reduce((acc, item) => {
          if (!acc[item.sequenceStr]) {
            acc[item.sequenceStr] = item.ids || {};
          } else {
            acc[item.sequenceStr] = { ...acc[item.sequenceStr], ...item.ids };
          }
          return acc;
        }, {});

      const filteredData = data.filter(x => x.textID === item.textID)
      const categoriesMatchesForBook = keyBy(filteredData.map(x => x['cluster tipologie']))

      const numLevels = max(filteredData.map(x => x.livello).map(x => levelMaps[x]))

      const dataVolume = get(volumiByID, item.textID);
      return {
        ...out,
        titolo: dataVolume.titolo,
        sequencesMapForBook,
        sequencesMatchesForBook,
        categoriesMatchesForBook,
        numLevels
      };
    });

  const chartBooks =
    opts.aggregazione === "aggregato"
      ? computeChartBooksAggregated(firstLevelRecords, opts)
      : computeChartBooksDisaggregated(firstLevelRecords, opts);
  return {
    booksData,
    chartBooks
  };
};

function MarimekkoViz({
  data,
  dettaglio,
  aggregazione,
  setOptionsForDetail,
  tipologia,
  ricerca,
  currentTextID,
  setCurrentTextID
}) {
  const { t } = useTranslation('combining')

  const vizContainerRef = useRef();
  const topAxisContainerRef = useRef();

  const [selectedLegendEntries, setSelectedLegendEntries] = useState({});

  const [dimensions, setDimensions] = useState({
    vizWidth: 0,
    vizHeight: 0,
    topAxisHeight: 0,
    widthScale: null,
    heightScale: null
  });

  const measure = useCallback(() => {
    const vizRect = vizContainerRef.current.getBoundingClientRect();
    const topAxisRect = topAxisContainerRef.current.getBoundingClientRect();
    const widthScale = scaleLinear()
      .domain([0, 100])
      .range(0, vizRect.height);
    const heightScale = scaleLinear()
      .domain([0, 100])
      .range(0, vizRect.height);

    const dimensions = {
      vizWidth: vizRect.width,
      vizHeight: vizRect.height,
      topAxisHeight: topAxisRect.height,
      widthScale,
      heightScale
    };

    setDimensions({ ...dimensions });
  }, []);

  // this is like "componentDidMount" (useEffect with empty deps is evaluated only after first render)
  useEffect(() => {
    measure();
    window.addEventListener("resize", measure, true);
    return () => {
      window.removeEventListener("resize", measure, true);
    };
  }, [measure]);


  const icycleWidth = useMemo(() => (dimensions.vizWidth / 10) * 8, [
    dimensions.vizWidth
  ]);
  const columnWidth = useMemo(() => icycleWidth / 5, [icycleWidth]);


  //resetting aggregazione
  useEffect(() => {
    if (!!currentTextID) {
      setOptionsForDetail();
    }
  }, [currentTextID, setOptionsForDetail]);

  const { booksData, chartBooks } = useMemo(() => {
    return preprocessData(data, {
      dettaglio,
      aggregazione,
      tipologia,
      ricerca
    });
  }, [data, dettaglio, aggregazione, tipologia, ricerca]);

  const availableWidth = useMemo(() => {
    if(booksData.length === 1 && !currentTextID){
      return columnWidth
    }
    return booksData.length > 4 ? dimensions.vizWidth: columnWidth * 4

  }, [booksData.length, columnWidth, currentTextID, dimensions.vizWidth])


  const booksDataWithPositions = useMemo(() => {
    return computeHorizontalPositions(booksData, availableWidth, false, booksData.length >= 4);
  }, [booksData, availableWidth]);

  //getting al data for current text for displaying icecycle
  const iceCycleData = useMemo(() => {
    if (!currentTextID) {
      return null;
    }
    return data
      .filter(row => row.textID === currentTextID)
      .map(item => {
        const tipologia = item["cluster tipologie"];
        return {
          ...item,
          starts_at: +item.starts_at,
          ends_at: +item.ends_at,
          color: coloriClusterTipologie[tipologia],
          label: tipologia
        };
      });
  }, [currentTextID, data]);


  const [currentPosition, setCurrentPosition] = useState(0);
  const [currentSequences, setCurrentSequences] = useState([]);
  const [currentSequencesSelected, setCurrentSequencesSelected] = useState([]);

  const sequencesSelected = useMemo(() => {
    if (!currentSequencesSelected) {
      return null;
    }
    return currentSequencesSelected.map(x => x['tipologia']).join("-")
  }, [currentSequencesSelected]);

  useEffect(() => {
    setCurrentPosition(0);
    setCurrentSequences([]);
    if(!currentTextID){
      setCurrentSequencesSelected([]);
    }

  }, [currentTextID]);

  const currentBook = useMemo(() => {
    return find(booksDataWithPositions, x => x.textID === currentTextID);
  }, [booksDataWithPositions, currentTextID]);

  //current sequence stuff
  const sequences = useMemo(() => {
    if (!currentBook) {
      return [];
    }
    return sortBy(currentBook.sequencesMapForBook, x => x.starts_at);
  }, [currentBook]);

  const currentIndex = useMemo(() => {
    if (!currentBook) {
      return -1;
    }
    return findLastIndex(sequences, item => findAtChar(item, currentPosition));
  }, [currentBook, currentPosition, sequences]);

  const sequencesIndexing = useMemo(() => {
    if (!currentBook) {
      return {
        currentIndex: null,
        prevPosition: null,
        nextPosition: null
      };
    }

    const prevIndex = findLastIndex(
      sequences,
      x => x.starts_at < currentPosition
    );
    const nextIndex = findIndex(sequences, x => x.starts_at > currentPosition);
    const prevPosition =
      prevIndex === -1 ? null : sequences[prevIndex].starts_at;
    const nextPosition =
      nextIndex === -1 ? null : sequences[nextIndex].starts_at;
    return {
      currentIndex,
      prevPosition,
      nextPosition
    };
  }, [currentBook, currentIndex, currentPosition, sequences]);


  //resetting legend entries when dettaglio changes
  useEffect(() => {
    setSelectedLegendEntries({});
  }, [dettaglio]);

  useEffect(() => {
    if(currentSequencesSelected.length){
      setSelectedLegendEntries({});
    }
  }, [currentSequencesSelected]);

  //resetting current sequences selcted when setting legend entries
  useEffect(() => {
    if(Object.keys(selectedLegendEntries).length){
      setCurrentSequencesSelected([]);
    }
  }, [selectedLegendEntries]);

  const currentSequencesDisplay = useMemo(() => {
    if(currentSequencesSelected && currentSequencesSelected.length){
      return currentSequencesSelected
    }
    return currentSequences
  }, [currentSequences, currentSequencesSelected])

  return (
    <div className="container-fluid h-100 bg-light d-flex flex-column">
      <div className="row no-gutters h-100">
        <div className="col-sm-1 d-flex flex-column">
          <div className="row no-gutters" style={{ flex: 2, minHeight: 160 }}>
            <MarimekkoSliderArrow
              up
              currentBook={currentBook}
              setCurrentPosition={setCurrentPosition}
              nextPosition={sequencesIndexing.nextPosition}
              prevPosition={sequencesIndexing.prevPosition}
            ></MarimekkoSliderArrow>
          </div>
          <div
            className="row no-gutters w-100 d-flex flex-row justify-content-center"
            style={{ flex: 8 }}
          >
            {currentBook && (
              <MarimekkoSlider
                currentBook={currentBook}
                iceCycleData={iceCycleData}
                booksData={booksData}
                setCurrentSequences={setCurrentSequences}
                currentPosition={currentPosition}
                setCurrentPosition={setCurrentPosition}
                currentSequencesSelected={currentSequencesSelected}
                setCurrentSequencesSelected={setCurrentSequencesSelected}
              ></MarimekkoSlider>
            )}
          </div>
          <div className="row no-gutters" style={{ flex: 1, minHeight: 80 }}>
            <MarimekkoSliderArrow
              down
              currentBook={currentBook}
              setCurrentPosition={setCurrentPosition}
              nextPosition={sequencesIndexing.nextPosition}
              prevPosition={sequencesIndexing.prevPosition}
            ></MarimekkoSliderArrow>
          </div>
        </div>
        <div className="col-sm-9 d-flex flex-column">
          <div className="row no-gutters" style={{ flex: 2, minHeight: 160 }}>
            <div className="col-sm-12" ref={topAxisContainerRef}>
              {availableWidth > 0 && (
                <MarimekkoTopAxis
                  height={dimensions.topAxisHeight}
                  width={availableWidth}
                  fullWidth={dimensions.vizWidth}
                  booksData={booksData}
                  setCurrentTextID={setCurrentTextID}
                  currentTextID={currentTextID}
                  currentPosition={currentPosition}
                  sequencesSelected={sequencesSelected}
                />
              )}
            </div>
          </div>

          <div className="row no-gutters w-100" style={{ flex: 8 }}>
            <div className="col-sm-12" ref={vizContainerRef}>
              {availableWidth > 0 && dimensions.vizHeight > 0 && (
                <MarimekkoChart
                  booksDataWithPositions={booksDataWithPositions}
                  chartBooks={chartBooks}
                  height={dimensions.vizHeight}
                  width={availableWidth}
                  selectedLegendEntries={selectedLegendEntries}
                  setCurrentTextID={setCurrentTextID}
                  currentTextID={currentTextID}
                  currentBook={currentBook}
                  iceCycleData={iceCycleData}
                  icycleWidth={icycleWidth}
                  currentPosition={currentPosition}
                  currentSequencesSelected={currentSequencesSelected}
                ></MarimekkoChart>
              )}
            </div>
          </div>
          <div className="row no-gutters" style={{ flex: 1, minHeight: 80 }}>
            <div className="position-absolute w-100">
            {currentTextID && range(currentBook.numLevels).map((r, i) => (
                <div
                  className="position-absolute text-center px-2"
                  style={{ width: columnWidth, left: columnWidth * i }}
                  key={i}
                >
                  <div
                    className={`w-100 text-center ${styles.currentSequenceLevel}`}
                  >
                    {t('ui.livello')} {levelMapsInverted[r+1]}
                  </div>

                </div>
              ))}
              {currentTextID && currentSequencesDisplay.map((seq, i) => (
                <div
                  className="position-absolute text-center px-2"
                  style={{ width: columnWidth, left: columnWidth * i, top: 14 }}
                  key={i}
                >
                  <div
                    className={`text-center w-100 ${styles.currentSequenceLabel}`}
                    style={{
                      borderBottom: `solid 3px ${
                        coloriClusterTipologie[seq["cluster tipologie"]]
                      }`
                    }}
                  >
                    {seq["tipologia"]}
                  </div>
                  {/* <div className="text-center w-100">
                    <small>
                      <b>{seq["ID SEQ"]}</b> s:{seq["starts_at"]} e:
                      {seq["ends_at"]} {seq["livello"]}
                    </small>
                  </div> */}
                </div>
              ))}
              {!currentTextID && <div className={styles.marimekkoXaxisText}>
                {t('ui.footer_chart')}
              </div>}
            </div>
          </div>
        </div>

        <div className="col-sm-2 pl-3">
          <div
            className="row no-gutters w-100"
            style={{ flex: 2, minHeight: 160 }}
          >
            <div className="position-relative">
              <button
                className="btn btn-sm btn-outline-dark position-absolute"
                style={{ bottom: 15 }}
                onClick={() => {
                  setSelectedLegendEntries({});
                }}
              >
                RESET
              </button>
            </div>
          </div>
          <div className="row no-gutters d-flex flex-row" style={{ flex: 8 }}>
            <MarimekkoLegend
              legendMap={
                dettaglio === "ambito" ? mappaCategorie : mappaClusterTipologie
              }
              dettaglio={dettaglio}
              currentBook={currentBook}
              setSelectedLegendEntries={setSelectedLegendEntries}
              selectedLegendEntries={selectedLegendEntries}
            ></MarimekkoLegend>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarimekkoViz;
