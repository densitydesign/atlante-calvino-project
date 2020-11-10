import React from "react";
import { Link } from "react-router-dom";
import corpusTitles from "./datasets/[capta] corpus - titles.csv";
import corpusPublications from "./datasets/[capta] corpus - publications.csv";

const corpus = {
  name: "Corpus",
  type: "data",
  license: "https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png",
  licenseUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
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
        narrativa integrale nei 3 volumi intitolati Romanzi e racconti; le Fiabe
        italiane curate dall’autore nel 1956; un’ampia parte della produzione
        saggistica pubblicata nei 2 volumi dei Saggi; la selezione di epistole
        pubblicata nel volume singolo Lettere; l’Album Calvino. Per realizzare i
        tre Itinerari abbiamo deciso di focalizzarci unicamente sull’opera
        narrativa pubblicata mentre Calvino era in vita. Il corpus di
        riferimento si compone di oltre venti volumi distribuiti tra il 1946 e
        il 1984: romanzi, raccolte di racconti, forme ibride a metà strada tra
        romanzi brevi e racconti lunghi, per un totale di 206 titoli (vedi
        Istruzioni per l’uso). Il dataset è composto da due tabelle relazionali
        che racchiudono le informazioni riguardanti la selezione dei testi
        studiati in questo progetto. Le informazioni provengono: dalla sezione
        Note e notizie sui testi a cura di Mario Barenghi, Bruno Falcetto e
        Claudio Milanini all’interno dei tre volumi Romanzi e racconti (I pp.
        1242-1393; II pp. 1309-1475; III 1195-1350); dalla Bibliografia di Italo
        Calvino di Luca Baranelli (Pisa, Scuola Normale Superiore, 2007).
      </p>
      <p>
        La prima tabella elenca i titoli di ogni testo racconti, romanzi,
        raccolte di racconti e forme ibride di stesura. Ad ogni titolo
        corrispondono:
      </p>
      <ul>
        <li>un identificatore univoco o ID;</li>
        <li>la lunghezza in caratteri e in parole;</li>
        <li>il genere;</li>
        <li>il volume de «i Meridiani» in cui è possibile trovare il testo;</li>
        <li>
          il nome del file .txt che contiene la digitalizzazione del testo
          (disponibile solo per uso interno).
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
          sede di pubblicazione (e.g. la rivista «Il caffè letterario e
          satirico»);
        </li>
        <li>data di pubblicazione;</li>
        <li>
          un flag (e.g. vero/falso) che indica se si tratta o meno della prima
          pubblicazione.
        </li>
      </ul>
      <p>
        Nei casi in cui la sede di pubblicazione sia un romanzo o una raccolta
        di racconti, viene indicato l’ID corrispondente.
      </p>
      <p>
        Tutte le visualizzazioni facenti parte di questo progetto sono basate,
        direttamente o indirettamente, su questo dataset, fatta eccezione per
        <Link to="/compass">«L’arcipelago dei nomi»</Link>.
        <br />
        Consigliamo la consultazione di:
      </p>
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

const saggi = {
  name: "Saggi: L’arcipelago dei nomi",
  type: "data",
  license: "https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png",
  licenseUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  files: [],
  jsx: <h2>Saggi: L’arcipelago dei nomi</h2>,
};

const dubbioNebbia = {
  name: "Dubbio: la nebbia, la cancellazione",
  type: "data",
  license: "https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png",
  licenseUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  open: false,
  files: [],
  jsx: <h2>Dubbio: la nebbia, la cancellazione</h2>,
};

const dubbioProcesso = {
  name: "Dubbio: il processo dubitativo",
  type: "data",
  license: "https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png",
  licenseUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  open: false,
  files: [],
  jsx: <h2>Dubbio: il processo dubitativo</h2>,
};

const spazioLuoghi = {
  name: "Spazio: i luoghi dell’opera",
  type: "data",
  license: "https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png",
  licenseUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  open: false,
  files: [],
  jsx: <h2>Spazio: i luoghi dell’opera</h2>,
};

const spazioRealismo = {
  name: "Spazio: spazio realista nell’opera",
  type: "data",
  license: "https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png",
  licenseUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  open: false,
  files: [],
  jsx: <h2>Spazio: spazio realista nell’opera</h2>,
};

const spazioMovimento = {
  name: "Spazio: luoghi interno ed esterni",
  type: "data",
  license: "https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png",
  licenseUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  open: false,
  files: [],
  jsx: <h2>Spazio: luoghi interno ed esterni</h2>,
};

const formaElenchi = {
  name: "Forma: Presenza e tipologia di elenchi",
  type: "data",
  license: "https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png",
  licenseUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  open: false,
  files: [],
  jsx: <h2>Forma: Presenza e tipologia di elenchi</h2>,
};

const formaCategorizzazioneElenchi = {
  name: "Forma: Categorizzazione degli elenchi",
  type: "data",
  license: "https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png",
  licenseUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  open: false,
  files: [],
  jsx: <h2>Forma: Categorizzazione degli elenchi</h2>,
};

const explorer = {
  name: "Explorer",
  type: "tool",
  open: true,
  files: [],
  jsx: <h2>Explorer</h2>,
};

const wanderer = {
  name: "Wanderer",
  type: "tool",
  open: true,
  files: [],
  jsx: <h2>Wanderer</h2>,
};

const capta = [
  corpus,
  saggi,
  dubbioNebbia,
  dubbioProcesso,
  spazioLuoghi,
  spazioRealismo,
  spazioMovimento,
  formaElenchi,
  formaCategorizzazioneElenchi,
  explorer,
  wanderer,
];
export default capta;
