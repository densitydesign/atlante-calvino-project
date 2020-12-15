import React from "react";
import { Link } from "react-router-dom";
import styles from "./capta.module.css";

const dubbioNebbia = {
  name: "Dubbio: la nebbia, la cancellazione",
  type: "data",
  license: "https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png",
  licenseUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  licenseAltAttr:
    "Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)",
  open: false,
  files: [
    {
      label: "[Atlante Calvino] dubbio - nebbia e cancellazione.csv",
      file: null,
    },
  ],
  jsx: (
    <>
      <p>
        Il dataset cataloga la presenza nell’opera dei termini ‘nebbia’ e
        ‘cancellazione’. La loro diffusione è stata misurata sommando il numero
        di occorrenze di ‘nebbia’, ‘cancellazione’ e di eventuali sinonimi. Da
        questi dati è stato possibile risalire anche alla loro distribuzione
        cronologica. Utilizzando il numero di caratteri come unità di misura, è
        stata calcolata la proporzione tra i vari campi semantici e la loro
        frequenza rispetto al numero totale di caratteri di ogni singolo testo.
      </p>
      <p>Per ogni occorrenza sono riportate le seguenti informazioni:</p>
      <ul>
        <li>
          <span className={styles.tag}>ID del testo</span> in cui compare
          l’occorrenza;
        </li>
        <li>
          <span className={styles.tag}>occorrenza</span>;
        </li>
        <li>
          <span className={styles.tag}>campo lessicale</span> di appartenenza
          dell’occorrenza;
        </li>
        <li>
          <span className={styles.tag}>posizione</span> nel testo (carattere di
          inizio e di fine);
        </li>
        <li>
          <span className={styles.tag}>luogo del testo</span> (<i>incipit</i>/
          <i>explicit</i>/-);
        </li>
        <li>
          <span className={styles.tag}>uso</span> dell’occorrenza
          (astratto/concreto).
        </li>
      </ul>
      <p>
        Il dataset è stato utilizzato per realizzare la visualizzazione{" "}
        <Link to="/doubt/phase1">Nebbia</Link> e l’Approfondimento{" "}
        <Link to="/doubt/phase1/focus">L’effetto-nebbia</Link>.
      </p>
    </>
  ),
};

export default dubbioNebbia;
