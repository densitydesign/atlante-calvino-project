import React, { useState, useMemo, useRef, useEffect } from "react";
import { scaleLinear } from "d3";
import sumBy from "lodash/sumBy";
import sum from "lodash/sum";
// import sumBy from 'lodash/sumBy'
import styles from "./Combine.module.css";
import uniqBy from "lodash/uniqBy";
import groupBy from "lodash/groupBy";
import pick from "lodash/pick";
import get from "lodash/get";
import some from "lodash/some"
import mappaCategorie from './mappa-categorie.json'


const coloriCategorie = mappaCategorie.reduce((out, c) => {
  out[c.categoria] = c.colore
  return out
},{})

console.log("coloriCategorie", coloriCategorie)


function MarimekkoTopAxis({ width, height, booksDataWithPositions }) {
  const margins = {
    bottom: 15
  };

  return (
    <div style={{ height, width, overflow: "hidden" }}>
      <svg style={{ height, width, overflow: "hidden" }}>
        <g transform={`translate(0 ${height - margins.bottom})`}>
          {booksDataWithPositions.map(book => (
            <g key={book.textID} transform={`translate(${book.caratteriX})`}>
              <rect
                className={styles.topAxisRect}
                width={book.caratteriWidth}
                height={4}
              ></rect>
              <g transform="translate(2 -2)">
                <text
                  className={styles.topAxisText}
                  x={5}
                  transform={`rotate(-45)`}
                >
                  {book.textID}
                </text>
              </g>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

function MarimekkoChart({ height, width, booksDataWithPositions, chartBooks }) {
  const heightScale = scaleLinear()
    .domain([0, 1])
    .range([0, height]);

  return (
    <svg style={{ height, width }}>
      {booksDataWithPositions.map(book => {
        const bookData = chartBooks[book.textID];

        //annotating with top and height
        const bookDataAnnotated = bookData
          .map(item => ({
            label: item.label,
            value: item.value, 
            color: item.color,
            height: heightScale(item.value)
          }))
          .reduce((out, item, i) => {
            if (i === 0) {
              out.push({ ...item, top: 0 });
            } else {
              out.push({ ...item, top: out[i - 1].top + out[i - 1].height });
            }
            return out;
          }, []);

        return (
          <g key={book.textID} transform={`translate(${book.caratteriX})`}>
            <rect
              className={styles.marimekkoRect}
              style={{ height, width: book.caratteriWidth }}
            ></rect>
            {bookDataAnnotated.map((d, i) => (
              <rect
                key={i}
                y={d.top}
                width={book.caratteriWidth}
                height={d.height}
                className={styles.marimekkoUnit}
                fill={d.color}
              ></rect>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

const defaultOptions = {
  dettaglio: "ambito",
  aggregazione: "aggregato",
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
      const color = opts.dettaglio === 'ambito' ? get(coloriCategorie, k) : "#333"
      const obj = {label: k, value: out[item][k] / totalForBook, color};
      o.push(obj)
      return o;
    }, []);

    return out;
  }, {});

  return chartBooks
}

const computeChartBooksDisaggregated = (firstLevelRecords, opts) => {

  const dettaglioKey =
  opts.dettaglio === "ambito"
    ? "categorie di tipologia"
    : "Cluster tipolegie";

  let chartBooks = groupBy(firstLevelRecords, "textID");
  chartBooks = Object.keys(chartBooks).reduce((out, textID, idx) => {
    const totalForBook = sumBy( chartBooks[textID], item => +item["somma ripetizioni"])
    out[textID] = chartBooks[textID].map(record => {
      const label = get(record, dettaglioKey)
      const color = opts.dettaglio === 'ambito' ? get(coloriCategorie, label) : '#333'
      return ({ 
        label,
        value: +record["somma ripetizioni"] / totalForBook,
        color
      })
    })

    return out;
  }, {});
  return chartBooks
}

const preprocessData = (data, options = {}) => {
  const opts = {
    ...defaultOptions,
    ...options
  };

  const firstLevelRecords = data.filter(item => item.livello === "uno");
  let byTipologia = groupBy(
      uniqBy(data,  item => `${item.textID}+${item.livello}`).map(x => pick(x, ['textID', 'livello'])),
      'textID'
  )
  byTipologia = Object.keys(byTipologia)
    .reduce((out, item) => {
      out[item] = byTipologia[item].map(x => x.livello).sort()
      return out
    }, {})
  
  const tipologiaSorted = opts.tipologia.sort()
  const selectedByTipologia = Object.keys(byTipologia).filter(item => {
    const matches = byTipologia[item].map(x => tipologiaSorted.indexOf(x) !== -1)
    return some(matches)
  } )
  const booksData = uniqBy(firstLevelRecords, "textID")
    .filter(item => selectedByTipologia.indexOf(item.textID) !== -1)
    .map(item => {
      let out = pick(item, ["textID", "anno", "mese", "caratteri"]);
      out.caratteri = +out.caratteri;
      out.mese = +out.mese;
      out.anno = +out.anno;
      return out;
    });

  const chartBooks = opts.aggregazione === 'aggregato' ?  computeChartBooksAggregated(firstLevelRecords, opts) : computeChartBooksDisaggregated(firstLevelRecords, opts)
  return {
    booksData,
    chartBooks
  };
};

function MarimekkoViz({ data, dettaglio, aggregazione, tipologia }) {
  const vizContainerRef = useRef();
  const topAxisContainerRef = useRef();

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

  return (
    <div className="container-fluid h-100 bg-light d-flex flex-column">
      <div className="row no-gutters" style={{ flex: 2, minHeight: 100 }}>
        <div className="col-sm-1"></div>
        <div className="col-sm-9" ref={topAxisContainerRef}>
          <MarimekkoTopAxis
            height={dimensions.topAxisHeight}
            width={dimensions.vizWidth}
            booksDataWithPositions={booksDataWithPositions}
          />
        </div>
      </div>

      <div className="row no-gutters w-100" style={{ flex: 10 }}>
        <div className="col-sm-1"></div>
        <div className="col-sm-9 border" ref={vizContainerRef}>
          {dimensions.vizWidth > 0 && dimensions.vizHeight > 0 && (
            <MarimekkoChart
              booksDataWithPositions={booksDataWithPositions}
              chartBooks={chartBooks}
              height={dimensions.vizHeight}
              width={dimensions.vizWidth}
            ></MarimekkoChart>
          )}
        </div>
        <div className="col-sm-2 px-2">legend here</div>
      </div>

      <div className="row no-gutters" style={{ flex: 1 }}></div>
    </div>
  );
}

export default MarimekkoViz;
