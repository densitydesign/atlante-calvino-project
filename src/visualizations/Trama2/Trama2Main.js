import React, { useState, useCallback } from "react";

//data management
import groupBy from "lodash/groupBy";
import keyBy from "lodash/keyBy";
import sortBy from "lodash/sortBy";
import mapValues from "lodash/mapValues";
import get from "lodash/get";
import { extent } from 'd3-array'

//visual helpers
import { scaleLinear } from 'd3-scale'

//data loading
//#TODO: move to separate file?
import datasetLines from "./dati/dataset_lines.json";
import mappaMotivoTipologia from './dati/mappa_motivo_tipologia.json'
import ordineColore from "./dati/ordine_colore_y.json";
import coloriPosizioni from "./dati/colori_posizioni.json";

//local components
import LineeTrama from './LineeTrama'

//VISUAL CONSTANTS
const MOTIVO_LINE_HEIGHT = 50



const clusterByMotivo = mapValues(keyBy(mappaMotivoTipologia, "motivo_type"), item => item['cluster tipologie']);
const ordineByCluster = keyBy(coloriPosizioni, "valore");
const ordineMotivoByMotivo = mapValues(keyBy(ordineColore, 'tipologia'), item => +item['ordine tipologia'])

const datasetLinesNormalized = datasetLines.map((item) => {
  const tot = +item["tot caratteri"]
  const motivo = item['motivo_type']
  const cluster = get(clusterByMotivo, motivo)
  const coloreCluster = get(ordineByCluster, `[${cluster}].colori`)
  const ordineCluster = get(ordineByCluster, `[${cluster}].ordine`)
  const ordineMotivo = get(ordineMotivoByMotivo, motivo)

  return {
    ...item,
    startMotivoNorm: +item.start_motivo / tot,
    endMotivoNorm: +item.end_motivo / tot,
    cluster,
    coloreCluster,
    ordineCluster: ordineCluster ? +ordineCluster : undefined,
    ordineMotivo,
  };
});
const byRacconto = groupBy(datasetLinesNormalized, "titolo racconto");
console.log("byRacconto", byRacconto);
const racconti = Object.keys(byRacconto);

console.log("racconti", racconti)


//scales
const motivoExtent = extent(ordineColore, item => +item['ordine tipologia'])
const scalaMotivoY = scaleLinear().domain(motivoExtent).range([0, MOTIVO_LINE_HEIGHT])
const colorsOrdered = sortBy(coloriPosizioni, item => +item.ordine)
// const colorsExtent = extent(coloriPosizioni, item => +item.ordine)
const scalaColore = scaleLinear().domain(colorsOrdered.map(item => item.ordine)).range(colorsOrdered.map(item => item.colori))



// main component
export default function Trama2Main() {
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const toggleSidePanel = useCallback(() => {
    setSidePanelOpen(!sidePanelOpen);
  }, [sidePanelOpen]);

  return (
    <div className="trama2-container">
      <div className={`trama2-side-panel ${sidePanelOpen ? "open" : "closed"}`}>
        <div className="trama2-side-panel-content"></div>

        <div
          className="trama2-side-panel-toggle "
          onClick={toggleSidePanel}
        ></div>
      </div>
      <div className="trama2-content">
        <LineeTrama racconti={racconti} MOTIVO_LINE_HEIGHT={MOTIVO_LINE_HEIGHT}></LineeTrama>

      </div>
    </div>
  );
}
