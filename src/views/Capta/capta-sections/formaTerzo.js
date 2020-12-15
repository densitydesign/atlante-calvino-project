import React from "react";
import { Link } from "react-router-dom";
import styles from "./capta.module.css";

const formaTerzo = {
  name: "Forma: dataset 3",
  type: "data",
  license: "https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png",
  licenseUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  licenseAltAttr:
    "Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)",
  open: false,
  files: [
    {
      label: "[Atlante Calvino] spazio - spazio realista.csv",
      file: null,
    },
  ],
  jsx: (
    <>
      <p>
        Il dataset rappresenta, espande e rielabora il punto 5.2., estendendo
        l’analisi a tutti i testi del corpus.
        <br />
        Ogni testo è stato diviso in segmenti che riprendono la categorizzazione
        per <i>tipo di sequenza</i> del dataset precedente, ma abbandonano la
        strutturazione in livelli per seguire la successione lineare della trama
        (ogni segmento termina appena è individuabile un segmento diverso,
        indipendentemente dall’eventuale sovrapposizione o presenza di una
        sequenza interna).
      </p>
      <p>Per ogni occorrenza sono riportate le seguenti informazioni:</p>

      <ul>
        <li>
          <span className={styles.tag}>ID del testo</span> in cui compare
          l’occorrenza;
        </li>
        <li>
          <span className={styles.tag}>posizione</span> dell’occorrenza nel testo (carattere di inizio e di fine)
        </li>
        <li>
          <span className={styles.tag}>numero di caratteri</span> dell’occorrenza;
        </li>
        <li>
          <span className={styles.tag}>numero di caratteri</span> del testo in cui compare l’occorrenza.
        </li>
      </ul>

      <p>
        Il dataset è stato utilizzato per la visualizzazione{" "}
        <Link to="form/phase3">Trama</Link> e l’Approfondimento{" "}
        <Link to="form/phase3/focus">Leggere fra le trame</Link>.
      </p>
    </>
  ),
};

export default formaTerzo;
