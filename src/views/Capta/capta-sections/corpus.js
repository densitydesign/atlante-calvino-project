import React from "react";
import { Link } from "react-router-dom";
import styles from "./capta.module.css";
import corpusTitles from "./datasets/[capta] corpus - titles.csv";
import corpusPublications from "./datasets/[capta] corpus - publications.csv";

const corpus = {
  name: "Corpus",
  type: "data",
  license: "https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png",
  licenseUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  licenseAltAttr:
    "Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)",
  open: true,
  files: [
    { label: "[Atlante Calvino] corpus - titles.csv", file: corpusTitles },
    {
      label: "[Atlante Calvino] corpus - publications.csv",
      file: corpusPublications,
    },
  ],
  jsx: (
    <>
      <p>
        Il dataset è composto da due tabelle relazionali che contengono le
        informazioni sui testi selezionati per il progetto. Tali informazioni
        provengono: a) dalla sezione <i>Note e notizie sui testi</i> a cura di
        Mario Barenghi, Bruno Falcetto e Claudio Milanini all’interno dei tre
        volumi{" "}
        <i>Romanzi e racconti</i> (<i>RR</i>, I, 1242-1393; <i>RR</i>, II,
        1309-1475; <i>RR</i>, III, 1195-1350); b) dalla{" "}
        <i>Bibliografia di Italo Calvino</i> di Luca Baranelli (Pisa, Edizioni
        della Normale, 2007).
      </p>
      <p>
        La prima tabella elenca i titoli di ogni testo. A ogni titolo
        corrispondono:
      </p>
      <ul>
        <li>
          un identificatore univoco o <span className={styles.tag}>ID</span>;
        </li>
        <li>
          lunghezza in <span className={styles.tag}>caratteri</span> e in{" "}
          <span className={styles.tag}>parole</span>;
        </li>
        <li>
          <span className={styles.tag}>genere</span>;
        </li>
        <li>
          <span className={styles.tag}>volume</span> dei <i>RR</i> in cui è
          possibile trovare il testo;
        </li>
        <li>
          il nome del file .txt che contiene
          la digitalizzazione del testo (disponibile solo per uso interno).
        </li>
      </ul>
      <p>
        La seconda tabella illustra il percorso editoriale di ciascun testo,
        elencando le sue varie pubblicazioni (vedi{" "}
        <Link to="/compass">I flussi dei racconti</Link>). In questa tabella
        l’ID di ogni testo appare tante volte quante sono le sue pubblicazioni,
        accompagnato da:
      </p>
      <ul>
        <li>
          <span className={styles.tag}>sede di pubblicazione</span> (es. la
          rivista «Il caffè letterario e satirico»);
        </li>
        <li>
          <span className={styles.tag}>data</span> di pubblicazione;
        </li>
        <li>
          un <span className={styles.tag}>flag</span> (es. vero/falso) che
          indica se si tratta o meno della prima pubblicazione.
        </li>
      </ul>
      <p>
        Nel caso in cui la sede di pubblicazione sia un romanzo o una raccolta
        di racconti, viene indicato l’ID corrispondente.
      </p>
      <p>
        Tutte le visualizzazioni che fanno parte di questo progetto sono basate,
        direttamente o indirettamente, su questo dataset ed in particolare
        consigliamo la consultazione di{" "}
        <Link to="/archipelago">Esplorare l’opera come un territorio</Link>.
      </p>
      <p>
        Unica eccezione è{" "}
        <Link to="/compass" style={{ whiteSpace: "nowrap" }}>
          L’arcipelago dei nomi
        </Link>{" "}
        che è l’unica visualizzazione che abbia preso in considerazione i saggi
        calviniani, per fornire un orientamento sull’universo intellettuale
        dell’autore.
      </p>
    </>
  ),
};

export default corpus;
