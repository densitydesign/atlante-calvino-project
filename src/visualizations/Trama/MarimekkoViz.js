import React, { useState, useMemo, useRef, useEffect } from "react";
import { scaleLinear } from "d3";
import sumBy from "lodash/sumBy";
import sum from "lodash/sum";
import some from "lodash/some";
import uniqBy from "lodash/uniqBy";
import groupBy from "lodash/groupBy";
import pick from "lodash/pick";
import get from "lodash/get";
import maxBy from "lodash/maxBy";
import keyBy from "lodash/keyBy";
import MarimekkoLegend from "./MarimekkoLegend";
import MarimekkoTopAxis from "./MarimekkoTopAxis";
import MarimekkoChart from "./MarimekkoChart";
import { levelMaps, computeHorizontalPositions } from "./helpers";
import mappaCategorie from "./mappa-categorie.json";
import mappaClusterTipologie from "./mappa-cluster-tipologie.json";
import volumi from "./volumi.json";

const volumiByID = keyBy(volumi, "textID");

const coloriCategorie = mappaCategorie.reduce((out, c) => {
  out[c.categoria] = c.colore;
  return out;
}, {});

const coloriClusterTipologie = mappaClusterTipologie.reduce((out, c) => {
  out[c.valore] = c.colore;
  return out;
}, {});

const defaultOptions = {
  dettaglio: "ambito",
  aggregazione: "aggregato",
  ricerca: [],
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
  if(Array.isArray(opts.ricerca) && opts.ricerca.length > 0 ){
    const ricercaLookup = keyBy(opts.ricerca)
    firstLevelRecords = firstLevelRecords.filter(x => ricercaLookup[x.textID])
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

      const dataVolume = get(volumiByID, item.textID);
      return {
        ...out,
        titolo: dataVolume.titolo
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
  setCurrentTextID,
}) {
  const vizContainerRef = useRef();
  const topAxisContainerRef = useRef();

  const [selectedLegendEntries, setSelectedLegendEntries] = useState({});

  //resetting legend entries when dettaglio changes
  useEffect(() => {
    setSelectedLegendEntries({});
  }, [dettaglio]);

  const [dimensions, setDimensions] = useState({
    vizWidth: 0,
    vizHeight: 0,
    topAxisHeight: 0,
    widthScale: null,
    heightScale: null
  });

  const measure = () => {
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
  };

  // this is like "componentDidMount" (useEffect with empty deps is evaluated only after first render)
  useEffect(() => {
    measure();
    window.addEventListener("resize", measure, true);
    return () => {
      window.removeEventListener("resize", measure, true);
    };
  }, []);

  
  //resetting aggregazione
  useEffect(() => {
    if (!!currentTextID) {
      setOptionsForDetail();
    } 
  }, [currentTextID, setOptionsForDetail]);

  const { booksData, chartBooks } = useMemo(() => {
    return preprocessData(data, { dettaglio, aggregazione, tipologia, ricerca });
  }, [data, dettaglio, aggregazione, tipologia, ricerca]);

  const booksDataWithPositions = useMemo(() => {return computeHorizontalPositions(booksData, dimensions.vizWidth)}, [booksData, dimensions.vizWidth]);

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
          color: coloriClusterTipologie[tipologia],
          label: tipologia
        };
      });
  }, [currentTextID, data]);

  return (
    <div className="container-fluid h-100 bg-light d-flex flex-column">
      <div className="row no-gutters h-100">
        <div className="col-sm-1"></div>
        <div className="col-sm-9 d-flex flex-column">
          <div className="row no-gutters" style={{ flex: 2, minHeight: 160 }}>
            <div className="col-sm-12" ref={topAxisContainerRef}>
              {dimensions.vizWidth && (
                <MarimekkoTopAxis
                  height={dimensions.topAxisHeight}
                  width={dimensions.vizWidth}
                  booksData={booksData}
                  setCurrentTextID={setCurrentTextID}
                  currentTextID={currentTextID}
                />
              )}
            </div>
          </div>

          <div className="row no-gutters w-100" style={{ flex: 8 }}>
            <div className="col-sm-12" ref={vizContainerRef}>
              {dimensions.vizWidth > 0 && dimensions.vizHeight > 0 && (
                <MarimekkoChart
                  booksDataWithPositions={booksDataWithPositions}
                  chartBooks={chartBooks}
                  height={dimensions.vizHeight}
                  width={dimensions.vizWidth}
                  selectedLegendEntries={selectedLegendEntries}
                  setCurrentTextID={setCurrentTextID}
                  currentTextID={currentTextID}
                  iceCycleData={iceCycleData}
                ></MarimekkoChart>
              )}
            </div>
          </div>
          <div
            className="row no-gutters"
            style={{ flex: 1, minHeight: 80 }}
          ></div>
        </div>

        <div className="col-sm-2 pl-4 pt-5">
          <MarimekkoLegend
            legendMap={
              dettaglio === "ambito" ? mappaCategorie : mappaClusterTipologie
            }
            setSelectedLegendEntries={setSelectedLegendEntries}
            selectedLegendEntries={selectedLegendEntries}
          ></MarimekkoLegend>
        </div>
      </div>
    </div>
  );
}

export default MarimekkoViz;
