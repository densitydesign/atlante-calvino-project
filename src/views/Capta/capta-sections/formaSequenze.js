import React from "react";
import { Link } from "react-router-dom";
import styles from "./capta.module.css";

const formaSequenze = {
  name: "Forma: sequenze narrative",
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
        Il dataset è costruito a partire dai volumi pubblicati in vita da
        Calvino, escludendo quindi i racconti dispersi, che non sono mai stati
        raccolti.
        <br />
        Ogni volume è stato diviso in sequenze narrative, e per ogni sequenza
        (identificata con un ID) è stata segnalata l’eventuale presenza di
        sequenze interne, mostrando la stratificazione dei motivi nel testo.
        Tutti i segmenti così ricavati sono stati categorizzati in base al{" "}
        <i>tipo di sequenza</i> e distribuiti fra <i>tre piani</i>. All’interno
        di ogni piano, il
        <i>tipo di sequenza</i> specifica il contenuto o il ruolo strutturale
        dei singoli segmenti.
      </p>
      <p>Per ogni occorrenza sono riportate le seguenti informazioni:</p>

      <ul>
        <li><span className={styles.tag}>ID del volume</span> in cui compare l’occorrenza;</li>
        <li><span className={styles.tag}>ID</span> dell’occorrenza;</li>
        <li><span className={styles.tag}>serie dei tipi di sequenze</span> presenti sulla stessa riga;</li>
        <li><span className={styles.tag}>livello 1</span>;</li>
        <li>
          <span className={styles.tag}>posizione</span> dell’occorrenza nel testo (carattere di inizio e di fine);
        </li>
        <li><span className={styles.tag}>tipo</span> di sequenza;</li>
        <li><span className={styles.tag}>livello 2</span>;</li>
        <li><span className={styles.tag}>posizione</span> nel testo (carattere di inizio e di fine);</li>
        <li><span className={styles.tag}>tipo</span> di sequenza;</li>
        <li><span className={styles.tag}>livello 3</span>;</li>
        <li><span className={styles.tag}>posizione</span> nel testo (carattere di inizio e di fine);</li>
        <li><span className={styles.tag}>tipo</span> di sequenza;</li>
        <li><span className={styles.tag}>livello 4</span>;</li>
        <li><span className={styles.tag}>posizione</span> nel testo (carattere di inizio e di fine);</li>
        <li><span className={styles.tag}>tipo</span> di sequenza;</li>
        <li><span className={styles.tag}>livello 5</span>;</li>
        <li><span className={styles.tag}>posizione</span> nel testo (carattere di inizio e di fine);</li>
        <li><span className={styles.tag}>tipo</span> di sequenza.</li>
      </ul>

      <p>
        Il dataset è stato utilizzato per la visualizzazione{" "}
        <Link to="form/phase2">Combinare</Link> e l’approfondimento{" "}
        <Link to="form/phase2/focus">Costruire la varietà</Link>.
      </p>
    </>
  ),
};

export default formaSequenze;
