import React from "react";
// import { Link } from "react-router-dom";
import styles from "./capta.module.css";

const formaElenchi = {
  name: "Forma: Presenza e tipologia di elenchi",
  type: "data",
  license: "https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png",
  licenseUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  licenseAltAttr: "Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)",
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
        Questo dataset registra le occorrenze di forme elencatorie presenti nel
        corpus, raccolte tramite lo strumento Explorer. Sono state identificate
        quattro categorie di elenco:
      </p>
      <ul>
        <li><span className={styles.tag}>parole</span></li>
        <li><span className={styles.tag}>frasi</span></li>
        <li><span className={styles.tag}>sintagmi</span></li>
        <li><span className={styles.tag}>elenchi misti</span></li>
      </ul>
      <p>
        Per ogni elenco è stata identificata la categoria di appartenenza, la
        posizione nel testo e la lunghezza in caratteri. Successivamente è stata
        calcolata la proporzione tra caratteri dedicati ad elenchi e resto del
        testo e la distribuzione delle quattro categorie rispetto al totale
        delle sole strutture elencatorie di ogni testo.
      </p>
      <p></p>
    </>
  ),
};

export default formaElenchi;
