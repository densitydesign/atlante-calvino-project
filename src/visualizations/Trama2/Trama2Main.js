import React, { useState, useCallback, useMemo, useEffect } from "react";

//data management
import groupBy from "lodash/groupBy";
import keyBy from "lodash/keyBy";
import sortBy from "lodash/sortBy";
import uniqBy from "lodash/uniqBy";
import minBy from "lodash/minBy";
import maxBy from "lodash/maxBy";
import mapValues from "lodash/mapValues";
import get from "lodash/get";
import take from "lodash/take";
import { extent } from "d3-array";

//visual helpers
import { scaleLinear } from "d3-scale";

//data loading
//#TODO: move to separate file?
import datasetLines from "./dati/dataset_lines.json";
import mappaMotivoTipologia from "./dati/mappa_motivo_tipologia.json";
import ordineColore from "./dati/ordine_colore_y.json";
import coloriPosizioni from "./dati/colori_posizioni.json";

//local components
import LineeTrama from "./LineeTrama";
import SideBar from "./SideBar";

//VISUAL CONSTANTS
const MOTIVO_LINE_HEIGHT = 50;

const clusterByMotivo = mapValues(
  keyBy(mappaMotivoTipologia, "motivo_type"),
  (item) => item["cluster tipologie"]
);
const ordineByCluster = keyBy(coloriPosizioni, "valore");
const ordineMotivoByMotivo = mapValues(
  keyBy(ordineColore, "tipologia"),
  (item) => +item["ordine tipologia"]
);

//scales
const motivoExtent = extent(ordineColore, (item) => +item["ordine tipologia"]);
const scalaMotivoY = scaleLinear()
  .domain(motivoExtent)
  .range([MOTIVO_LINE_HEIGHT, 0]);

// const colorsOrdered = sortBy(coloriPosizioni, (item) => +item.ordine);
// // const colorsExtent = extent(coloriPosizioni, item => +item.ordine)
// const scalaColore = scaleLinear()
//   .domain(colorsOrdered.map((item) => item.ordine))
//   .range(colorsOrdered.map((item) => item.colori));

const tipologie = ordineColore.map((item) => ({
  ...item,
  colore: get(ordineByCluster, item["cluster tipologia"]),
}));

const colors = sortBy(tipologie, (item) => item.colore.ordine).map(
  (x) => x.colore.colori
);

let racconti = sortBy(
  uniqBy(datasetLines, (item) => item["titolo racconto"]).map((item) => ({
    titolo: item["titolo racconto"],
    anno: item["anno"],
    mese: item["mese"],
  })),
  (item) => {
    const anno = +item.anno;
    const mese = +item.mese;

    return `${anno.toFixed(4)}${mese.toFixed(2)}`;
  }
);

//#TODO: remove this (limiting for debug)
//racconti = take(racconti,10)

const datasetLinesNormalized = datasetLines.map((item) => {
  const tot = +item["tot caratteri"];
  const motivo = item["motivo_type"];
  const cluster = get(clusterByMotivo, motivo);
  const coloreCluster = get(ordineByCluster, `[${cluster}].colori`);
  const ordineCluster = get(ordineByCluster, `[${cluster}].ordine`);
  const ordineMotivo = get(ordineMotivoByMotivo, motivo);

  const startMotivoNorm = +item.start_motivo / tot;
  const endMotivoNorm = +item.end_motivo / tot;
  const y = ordineMotivo !== undefined ? scalaMotivoY(ordineMotivo) : undefined;
  const x = (startMotivoNorm + endMotivoNorm) / 2;

  return {
    ...item,
    startMotivoNorm,
    endMotivoNorm,
    cluster,
    coloreCluster,
    ordineCluster: ordineCluster ? +ordineCluster : undefined,
    ordineMotivo,
    y,
    x,
  };
});

const byRacconto = groupBy(datasetLinesNormalized, "titolo racconto");

const tipologieByTipologia = keyBy(tipologie, (item) => item.tipologia);

//pre-computing filters
racconti = racconti.map((racconto) => {
  const minDatum = minBy(
    byRacconto[racconto.titolo],
    (item) => item.ordineMotivo
  );
  const maxDatum = maxBy(
    byRacconto[racconto.titolo],
    (item) => item.ordineMotivo
  );
  // console.log(123, racconto.titolo, minDatum, maxDatum)
  return { ...racconto, minDatum, maxDatum };
});

// main component
export default function Trama2Main() {
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const toggleSidePanel = useCallback(() => {
    setSidePanelOpen(!sidePanelOpen);
  }, [sidePanelOpen]);

  //lines selection
  const [selected, setSelected] = useState({});
  const toggleSelect = useCallback(
    (titolo) => () => {
      const newSelected = { ...selected, [titolo]: !!!selected[titolo] };
      setSelected(newSelected);
    },
    [selected]
  );

  //bounds selection
  const [bounds, setBounds] = useState([]);
  const addBound = useCallback(
    (item) => () => {
      if (bounds.length === 1 && bounds[0] === item) {
        setBounds([]);
        return;
      }
      if (bounds.length < 2) {
        setBounds(bounds.concat([item]));
      } else {
        setBounds([item]);
      }
    },
    [bounds]
  );

  //actual dataset
  const raccontiFiltered = useMemo(() => {
    if (bounds.length === 2) {
      const orderedBounds = sortBy(
        bounds,
        (bound) => tipologieByTipologia[bound]["ordine tipologia"]
      );
      return racconti.filter(
        (racconto) =>
          racconto.minDatum.motivo_type === orderedBounds[0] &&
          racconto.maxDatum.motivo_type === orderedBounds[1]
      );
    }

    return racconti;
  }, [bounds]);

  useEffect(() => {
    if (bounds.length === 2) {
      const orderedBounds = sortBy(
        bounds,
        (bound) => tipologieByTipologia[bound]["ordine tipologia"]
      );

      const indexes = racconti
        .map((racconto, index) => [
          racconto.titolo,
          racconto.minDatum.motivo_type,
          racconto.maxDatum.motivo_type,
        ])
        .filter((x) => x[1] === orderedBounds[0] && x[2] === orderedBounds[1])
        .map((x) => x[0]);

      const sel = keyBy(indexes);
      setSelected(sel);
    }
  }, [bounds]);


  // const raccontiOrdered = useMemo(() => {
  //   return sortBy(racconti, (racconto, j) => selected[racconto.titolo] ? j + 1000 : j)
  // }, [selected])

  console.log("tipologie", tipologie);
  console.log("racconti", racconti);
  console.log("raccontiFiltered", raccontiFiltered);
  console.log("bounds", bounds);

  return (
    <div className="trama2-container">
      <div className={`trama2-side-panel ${sidePanelOpen ? "open" : "closed"}`}>
        <div className="trama2-side-panel-content">
          <SideBar
            tipologie={tipologie}
            bounds={bounds}
            addBound={addBound}
            setBounds={setBounds}
          ></SideBar>
        </div>

        <div
          className="trama2-side-panel-toggle "
          onClick={toggleSidePanel}
        ></div>
      </div>
      <div className="trama2-content-wrapper">
        <div className="trama2-content">
          <LineeTrama
            selected={selected}
            toggleSelect={toggleSelect}
            racconti={racconti}
            data={byRacconto}
            height={MOTIVO_LINE_HEIGHT}
            scalaMotivoY={scalaMotivoY}
            colors={colors}
          ></LineeTrama>
        </div>
      </div>
    </div>
  );
}
