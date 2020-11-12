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
  files: [{ label: "[Atlante Calvino] saggi - archipelago.csv", file: null }],
  jsx: (
    <>
      <p>
        Il dataset è frutto della rielaborazione e dell’accrescimento delle
        informazioni presenti nell’indice alfabetico del secondo volume dei
        <i>Saggi. 1945-1985</i> (a cura di Mario Barenghi, Milano, Mondadori,
        1995, 2 voll.). <br />
        Il dataset raccoglie le informazioni biografiche dei personaggi nominati
        da Calvino nei suoi saggi e indica la loro compresenza all’interno dello
        stesso saggio.
      </p>
      <p>
        Nell’indice si trova, a fianco di ogni nome, l’indicazione delle pagine
        in cui è presente. Ad esempio:
      </p>
      <p className="cite cite2">
        Balzac, Honoré de
        <br />
        34-6, <wbr />
        110, <wbr />
        272, <wbr />
        343, <wbr />
        458, <wbr />
        474-5, <wbr />
        516, <wbr />
        <b>711-4</b>, <wbr />
        730, <wbr />
        775-80, <wbr />
        782-9, <wbr />
        817, <wbr />
        851, <wbr />
        959, <wbr />
        965, <wbr />
        967, <wbr />
        996, <wbr />
        1079, <wbr />
        1090, <wbr />
        1143, <wbr />
        1166, <wbr />
        1176, <wbr />
        1257, <wbr />
        <b style={{ whiteSpace: "nowrap" }}>1365 n. 1</b>, <wbr />
        1390, <wbr />
        1396, <wbr />
        1481, <wbr />
        1485, <wbr />
        1529, <wbr />
        1533, <wbr />
        1580, <wbr />
        1658, <wbr />
        1816, <wbr />
        2240, <wbr />
        2492, <wbr />
        2723, <wbr />
        2785
      </p>
      <p>
        Il trattino indica pagine contigue (e.g. 711-4 corrisponde a 711, 712,
        713, 714) mentre la lettera “n” indica la presenza del nome del
        personaggio all’interno di una nota.
      </p>
      <p>
        L’indice è stato ricevuto in un file PDF su quale è stato necessario
        applicare un algoritmo di text recognition; a questo scopo è stato
        utilizzato Adobe Acrobat Reader. Successivamente il testo è stato
        convertito in .txt (plain text) ed è stato ripulito di errori e
        sbavature con l’aiuto di regular expressions o con accorte procedure
        manuali. <br />
        Le informazioni contenute nei file di testo sono state poi strutturate
        con l’aiuto di{" "}
        <a
          href="https://github.com/densitydesign/atlante-calvino-scripts/tree/master/saggi"
          target="_blank"
          rel="noopner noreferrer"
        >
          alcuni script in node.js scritti per l’evenienza
        </a>
        .
      </p>
      <p>
        Questa prima elaborazione ha permesso di ottenere una tabella
        contenente, per ogni personaggio, le seguenti informazioni:
      </p>
      <ul>
        <li>
          identificativo univoco o <span className={styles.tag}>ID</span>;
        </li>
        <li>
          <span className={styles.tag}>nome</span>;
        </li>
        <li>
          <span className={styles.tag}>pagine</span> in cui viene nominato;
        </li>
        <li>
          <span className={styles.tag}>titoli</span> dei saggi in cui viene
          nominato.
        </li>
      </ul>
      <p>
        A partire da queste informazioni è stata creata una tabella di
        collegamenti che indicano la compresenza dei personaggi nello stesso
        saggio, in seguito visualizzata sotto forma di grafico a rete in{" "}
        <Link to="/compass">«L’arcipelago dei nomi»</Link>
      </p>
      <p>
        Per ampliare le potenzialità della visualizzazione, sono state raccolte
        informazioni biografiche dei personaggi nominati da Calvino (data di
        nascita e di morte, mestiere, nazionalità, ecc.). Questo processo è
        stato condotto in maniera semi-manuale, sfruttando la funzione di
        OpenRefine per la riconciliazione di entità Wikidata. Alcune
        informazioni sono state aggiunte o modificate manualmente nel caso in
        cui fossero mancanti o visibilmente imprecise. Queste informazioni non
        sono state ancora trasformate in una visualizzazione, ma la loro
        raccolta ha permesso di osservare da vicino il mondo dei linked open
        data e delle basi di conoscenza online collaborative, fornendo
        potenziali spunti di ricerca.
      </p>
    </>
  ),
};

const dubbioNebbia = {
  name: "Dubbio: la nebbia, la cancellazione",
  type: "data",
  license: "https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png",
  licenseUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
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
        Il dataset rappresenta l’uso nell’opera dei termini ‘nebbia’ e
        ‘cancellazione’. La loro diffusione è stata misurata sommando il numero
        di occorrenze di ‘nebbia’, ‘cancellazione’ e di eventuali sinonimi
        riportati in seguito:
      </p>
      <ul>
        <li>Nebbia: nebbia, bruma, caligine, foschia (e derivati).</li>
        <li>Cancellazione: cancellare, cancellazione (e derivati).</li>
      </ul>
      <p>
        Da questi dati è stato possibile risalire anche alla loro distribuzione
        cronologica. Utilizzando il numero di caratteri come unità di misura, è
        stata calcolata la proporzione tra i vari campi semantici e la loro
        frequenza rispetto al numero totale di caratteri di ogni singolo testo.
      </p>
      <p>
        Il dataset è stato utilizzato per realizzare le visualizzazioni <Link to="/doubt/phase1">«Nebbia»</Link>{" "}
        e <Link to="/doubt/phase1/focus">«L’effetto-nebbia»</Link>; quest’ultima integra un’informazione
        supplementare rispetto al dataset della Tappa 1: nell’Approfondimento,
        infatti, ogni occorrenza è distinta a seconda che il suo uso venga
        considerato astratto o concreto.
      </p>
    </>
  ),
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
