import React from "react";
import { Link } from "react-router-dom";
import styles from "./capta.module.css";
import corpusTitles from "./datasets/[capta] corpus - titles.csv";
import corpusPublications from "./datasets/[capta] corpus - publications.csv";

const corpus = {
    name: "Corpus delle opere",
    type: "data",
    license: "https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png",
    licenseUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
    licenseAltAttr: "Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)",
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
          La casa editrice italiana Mondadori, che detiene i diritti sul lavoro di
          Italo Calvino, ha collaborato al progetto fornendo l’opera completa
          nella collana “I Meridiani”, che si compone in questo modo: l’opera
          narrativa integrale nei 3 volumi intitolati <i>Romanzi e racconti</i>;
          le <i>Fiabe italiane</i> curate dall’autore nel 1956; un’ampia parte
          della produzione saggistica pubblicata nei 2 volumi dei Saggi; la
          selezione di epistole pubblicata nel volume singolo <i>Lettere</i>; l’
          <i>Album Calvino</i>. Per realizzare i tre Itinerari abbiamo deciso di
          focalizzarci unicamente sull’opera narrativa pubblicata mentre Calvino
          era in vita. Il corpus di riferimento si compone di oltre venti volumi
          distribuiti tra il 1946 e il 1984: romanzi, raccolte di racconti, forme
          ibride a metà strada tra romanzi brevi e racconti lunghi, per un totale
          di 206 titoli (vedi <Link to="instructions">Istruzioni per l’uso</Link>
          ). Il dataset è composto da due tabelle relazionali che racchiudono le
          informazioni riguardanti la selezione dei testi studiati in questo
          progetto. Le informazioni provengono: dalla sezione{" "}
          <i>Note e notizie sui testi</i> a cura di Mario Barenghi, Bruno Falcetto
          e Claudio Milanini all’interno dei tre volumi <i>Romanzi e racconti</i>{" "}
          (I pp. 1242-1393; II pp. 1309-1475; III 1195-1350); dalla{" "}
          <i>Bibliografia di Italo Calvino</i> di Luca Baranelli (Pisa, Scuola
          Normale Superiore, 2007).
        </p>
        <p>
          La prima tabella elenca i titoli di ogni testo racconti, romanzi,
          raccolte di racconti e forme ibride di stesura. Ad ogni titolo
          corrispondono:
        </p>
        <ul>
          <li>
            un identificatore univoco o <span className={styles.tag}>ID</span>;
          </li>
          <li>
            la lunghezza in <span className={styles.tag}>caratteri</span> e in{" "}
            <span className={styles.tag}>parole</span>;
          </li>
          <li>
            il <span className={styles.tag}>genere</span>;
          </li>
          <li>
            il <span className={styles.tag}>volume</span> de «i Meridiani» in cui
            è possibile trovare il testo;
          </li>
          <li>
            il nome del <span className={styles.tag}>file .txt</span> che contiene
            la digitalizzazione del testo (disponibile solo per uso interno).
          </li>
        </ul>
        <p>
          La seconda tabella illustra il percorso editoriale di ciascun testo,
          elencando le sue varie pubblicazioni (vedi «I flussi dei racconti»). In
          questa tabella l’ID di ogni testo appare tante volte quante sono le sue
          pubblicazioni, accompagnato da:
        </p>
        <ul>
          <li>
            <span className={styles.tag}>sede di pubblicazione</span> (e.g. la
            rivista «Il caffè letterario e satirico»);
          </li>
          <li>
            <span className={styles.tag}>data</span> di pubblicazione;
          </li>
          <li>
            un <span className={styles.tag}>flag</span> (e.g. vero/falso) che
            indica se si tratta o meno della prima pubblicazione.
          </li>
        </ul>
        <p>
          Nei casi in cui la sede di pubblicazione sia un romanzo o una raccolta
          di racconti, viene indicato l’ID corrispondente.
        </p>
        <p>
          Tutte le visualizzazioni facenti parte dell'Atlante sono basate,
          direttamente o indirettamente, su questo dataset, fatta eccezione per{" "}
          <Link to="/compass" style={{whiteSpace:"nowrap"}}>«L’arcipelago dei nomi»</Link>.
        </p>
        <p>Consigliamo la consultazione di:</p>
        <ul>
          <li>
            <Link to="/compass">«Il tempo e le opere» (Bussola)</Link>
          </li>
          <li>
            <Link to="/compass">«I flussi dei racconti» (Bussola)</Link>
          </li>
          <li>
            <Link to="/archipelago">«Esplorare l’opera come un territorio»</Link>
          </li>
        </ul>
      </>
    ),
  };

export default corpus;