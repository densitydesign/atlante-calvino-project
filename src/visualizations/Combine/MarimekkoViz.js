import React, { useState, useMemo, useRef, useEffect } from "react";
import { scaleLinear } from "d3";
import sumBy from "lodash/sumBy";
import sum from "lodash/sum";
// import sumBy from 'lodash/sumBy'
import uniqBy from "lodash/uniqBy";
import groupBy from "lodash/groupBy";
import pick from "lodash/pick";
import get from "lodash/get";
import some from "lodash/some";
import keyBy from "lodash/keyBy";
import MarimekkoLegend from './MarimekkoLegend'
import MarimekkoTopAxis from './MarimekkoTopAxis'
import MarimekkoChart from './MarimekkoChart'

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
  aggregazione: "aggregato"
};

const computeChartBooksAggregated = (firstLevelRecords, opts) => {
  const dettaglioKey =
    opts.dettaglio === "ambito"
      ? "categorie di tipologia"
      : "Cluster tipolegie";

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
      : "Cluster tipolegie";

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

  const firstLevelRecords = data.filter(item => item.livello === "uno");
  let byTipologia = groupBy(
    uniqBy(data, item => `${item.textID}+${item.livello}`).map(x =>
      pick(x, ["textID", "livello"])
    ),
    "textID"
  );
  byTipologia = Object.keys(byTipologia).reduce((out, item) => {
    out[item] = byTipologia[item].map(x => x.livello).sort();
    return out;
  }, {});

  const tipologiaSorted = opts.tipologia.sort();
  const selectedByTipologia = Object.keys(byTipologia).filter(item => {
    const matches = byTipologia[item].map(
      x => tipologiaSorted.indexOf(x) !== -1
    );
    return some(matches);
  });
  const booksData = uniqBy(firstLevelRecords, "textID")
    .filter(item => selectedByTipologia.indexOf(item.textID) !== -1)
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

function MarimekkoViz({ data, dettaglio, aggregazione, tipologia }) {
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

  const { booksData, chartBooks } = useMemo(() => {
    return preprocessData(data, { dettaglio, aggregazione, tipologia });
  }, [data, dettaglio, aggregazione, tipologia]);

  const booksDataWithPositions = useMemo(() => {
    const totalChars = sumBy(booksData, "caratteri");
    const scaleChars = scaleLinear()
      .domain([0, totalChars])
      .range([0, dimensions.vizWidth]);
    const booksDataAnnotated = booksData.reduce((out, item, i) => {
      if (i === 0) {
        out.push({
          ...item,
          caratteriPos: 0,
          caratteriX: 0,
          caratteriWidth: scaleChars(item.caratteri)
        });
      } else {
        const caratteriPos = out[i - 1].caratteriPos + out[i - 1].caratteri;
        out.push({
          ...item,
          caratteriPos,
          caratteriX: scaleChars(caratteriPos),
          caratteriWidth: scaleChars(item.caratteri)
        });
      }
      return out;
    }, []);

    return booksDataAnnotated;
  }, [booksData, dimensions.vizWidth]);

  //current book handling
  //#TODO: move to url
  const [currentTextID, setCurrentTextID] = useState(null);

  return (
    <div className="container-fluid h-100 bg-light d-flex flex-column">
      <div className="row no-gutters h-100">
        <div className="col-sm-1"></div>
        <div className="col-sm-9 d-flex flex-column">
          <div className="row no-gutters" style={{ flex: 2, minHeight: 100 }}>
            <div className="col-sm-12" ref={topAxisContainerRef}>
              <MarimekkoTopAxis
                height={dimensions.topAxisHeight}
                width={dimensions.vizWidth}
                booksDataWithPositions={booksDataWithPositions}
                setCurrentTextID={setCurrentTextID}
              />
            </div>
          </div>

          <div className="row no-gutters w-100" style={{ flex: 10 }}>
            <div className="col-sm-12" ref={vizContainerRef}>
              {dimensions.vizWidth > 0 && dimensions.vizHeight > 0 && (
                <MarimekkoChart
                  booksDataWithPositions={booksDataWithPositions}
                  chartBooks={chartBooks}
                  height={dimensions.vizHeight}
                  width={dimensions.vizWidth}
                  selectedLegendEntries={selectedLegendEntries}
                  currentTextID={currentTextID}
                ></MarimekkoChart>
              )}
            </div>
          </div>
          <div className="row no-gutters" style={{ flex: 1 }}></div>
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
