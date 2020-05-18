import React, { useState, useCallback } from "react";

//data management
import groupBy from "lodash/groupBy";
import keyBy from "lodash/keyBy";
import sortBy from "lodash/sortBy";
import uniqBy from "lodash/uniqBy";
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


//scales
const motivoExtent = extent(ordineColore, item => +item['ordine tipologia'])
const scalaMotivoY = scaleLinear().domain(motivoExtent).range([0, MOTIVO_LINE_HEIGHT])
const colorsOrdered = sortBy(coloriPosizioni, item => +item.ordine)
// const colorsExtent = extent(coloriPosizioni, item => +item.ordine)
const scalaColore = scaleLinear().domain(colorsOrdered.map(item => item.ordine)).range(colorsOrdered.map(item => item.colori))

const racconti = sortBy(uniqBy(datasetLines, item => item["titolo racconto"]).map(item => ({
  titolo: item["titolo racconto"],
  anno: item["anno"],
  mese: item["mese"]
})), item => {
  const anno = +item.anno
  const mese = +item.mese
  
  return `${anno.toFixed(4)}${mese.toFixed(2)}`
})


const datasetLinesNormalized = datasetLines.map((item) => {
  const tot = +item["tot caratteri"]
  const motivo = item['motivo_type']
  const cluster = get(clusterByMotivo, motivo)
  const coloreCluster = get(ordineByCluster, `[${cluster}].colori`)
  const ordineCluster = get(ordineByCluster, `[${cluster}].ordine`)
  const ordineMotivo = get(ordineMotivoByMotivo, motivo)

  const startMotivoNorm =  +item.start_motivo / tot
  const endMotivoNorm =  +item.end_motivo / tot
  const y = ordineMotivo !== undefined ? scalaMotivoY(ordineMotivo)  : undefined
  const x = (startMotivoNorm + endMotivoNorm) / 2

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
        <LineeTrama 
        racconti={racconti} data={byRacconto} MOTIVO_LINE_HEIGHT={MOTIVO_LINE_HEIGHT}
        scalaColore={scalaColore}
        scalaMotivoY={scalaMotivoY}

        ></LineeTrama>

      </div>
    </div>
  );
}
