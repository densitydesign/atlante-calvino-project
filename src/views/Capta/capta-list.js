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
        Il dataset è stato utilizzato per realizzare le visualizzazioni{" "}
        <Link to="/doubt/phase1">«Nebbia»</Link> e{" "}
        <Link to="/doubt/phase1/focus">«L’effetto-nebbia»</Link>; quest’ultima
        integra un’informazione supplementare rispetto al dataset della Tappa 1:
        nell’Approfondimento, infatti, ogni occorrenza è distinta a seconda che
        il suo uso venga considerato astratto o concreto.
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
  files: [
    {
      label: "[Atlante Calvino] dubbio - processo dubitativo.csv",
      file: null,
    },
  ],
  jsx: (
    <>
      <p>
        Il dataset rappresenta la diffusione nell’opera del processo dubitativo.
        Per raccogliere i dati necessari, la responsabile di questa ricerca ha
        utilizzato lo strumento Wanderer, evidenziando durante la sua lettura
        dell’opera le parti di testo coinvolte nel processo dubitativo.
        <br />
        L’analisi è basata su tre tipi di testo distinti:{" "}
        <i>testo dubitativo</i>, <i>testo oggetto di dubbio</i> e{" "}
        <i>testo dubitativo e oggetto di dubbio</i>.
        <br />A ogni occorrenza di <i>testo dubitativo</i> (parte del testo di
        estensione variabile che mette in discussione quanto affermato in
        precedenza nella narrazione) è associato un <i>oggetto di dubbio</i>{" "}
        (elemento della narrazione che viene messo in discussione).
        Un’occorrenza di <i>testo dubitativo</i>, può diventare a sua volta{" "}
        <i>oggetto di dubbio</i> nelle righe successive del racconto; in questo
        caso ci troviamo di fronte a un testo sia dubitativo che oggetto di
        dubbio, <i>definito testo dubitativo e oggetto di dubbio</i>. La
        dinamica e il meccanismo “a sovrapposizione” del fenomeno inficia
        ripetutamente il senso del testo, rivelandone la struttura gerarchica e
        nidificata.
      </p>
      <p>
        Per ogni testo, sono state identificate le occorrenze dei diversi tipi
        di testo; le occorrenze di testo dubitativo sono numerate
        progressivamente (e.g. t.d. 19, t.d. 20, ecc.).
        <br />
        Ogni occorrenza è una stringa di testo che ha un inizio e una fine
        segnalate nel dataset da un numero in caratteri che ne indica la
        posizione. Quando presente è stata registrata la “formula”, ovvero la
        sequenza di parole che collega logicamente un’occorrenza di{" "}
        <i>testo dubitativo</i> con il corrispondente{" "}
        <i>testo oggetto di dubbio</i>. Inoltre, è stata registrata la presenza
        di <i>parentesi</i> e <i>incisi</i>. Infine, a ogni occorrenza di{" "}
        <i>testo dubitativo</i> sono state attribuite due informazioni
        supplementari, in base a una griglia d’analisi prestabilita:
      </p>
      <ul>
        <li>
          una <i>categoria</i> che indica l’argomento dell’occorrenza di testo
          dubitativo (contenuto, forma, significato);
        </li>
        <li>
          uno <i>stile</i> che si riferisce alle modalità di espressione
          dell’occorrenza di testo dubitativo (negazione, esitazione,
          riformulazione).
        </li>
      </ul>
      <p>
        Attraverso il dataset è possibile conoscere la quantità, la posizione e
        le modalità di azione del processo dubitativo all’interno di un testo.
      </p>
      <p>
        Il dataset è stato utilizzato per realizzare le visualizzazioni
        «Dubitare», «Cancellazione» e gli Approfondimenti della seconda e terza
        tappa intitolati «Il romanzo-saggio che dubita» e «Il dubbio e la
        cancellazione».
      </p>
    </>
  ),
};

const spazioLuoghi = {
  name: "Spazio: i luoghi dell’opera",
  type: "data",
  license: "https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png",
  licenseUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  open: false,
  files: [
    {
      label: "[Atlante Calvino] luoghi - nominati e ambientazioni.csv",
      file: null,
    },
  ],
  jsx: (
    <>
      <p>
        Il dataset raccoglie la prima occorrenza di ogni luogo presente nel
        corpus delle opere di Calvino. Un luogo può essere ‘di ambientazione’
        quando ospita una parte della narrazione oppure ‘nominato’ quando è solo
        presente nel testo senza ospitare le azioni dei personaggi. Ad esempio:
      </p>
      <p className="cite cite2">
        Colla Bracca, luogo di ambientazione: «Alle nove e un quarto [Briga]
        arrivò su Colla Bracca assieme alla luna»
      </p>
      <p className="cite cite2">
        Ceppo, luogo nominato: «le mine erano distanti, sull’altro versante di
        Ceppo»
      </p>
      <p>
        I luoghi sono stati registrati tramite lo strumento Explorer. Le
        informazioni originariamente raccolte tramite lo strumento sono state le
        seguenti:
      </p>
      <ul>
        <li>
          <span className={styles.tag}>ID</span> del testo in cui compare il
          luogo;
        </li>
        <li>
          <span className={styles.tag}>occorrenza</span> del nome di luogo;
        </li>
        <li>
          <span className={styles.tag}>posizione</span> nel testo (carattere di
          inizio e di fine);
        </li>
        <li>
          luogo <span className={styles.tag}>specifico o generico</span> (e.g.
          Londra oppure città);
        </li>
        <li>
          <span className={styles.tag}>Scala</span>;
        </li>
        <li>
          luogo <span className={styles.tag}>‘genitore’</span> (questo luogo è
          parte di un altro luogo);
        </li>
        <li>
          <span className={styles.tag}>parte di inizio</span> (true/false);
        </li>
        <li>
          <span className={styles.tag}>Parte di complicazione</span>{" "}
          (true/false);
        </li>
        <li>
          <span className={styles.tag}>Parte di fine</span> (true/false);
        </li>
        <li>
          <span className={styles.tag}>Localizzabile</span> (true/false)
        </li>
        <li>
          <span className={styles.tag}>Terrestre</span> (true/false)
        </li>
        <li>
          <span className={styles.tag}>Inventato</span> (si/no/non applicabile)
        </li>
        <li>Nota di servizio</li>
      </ul>
      <p>
        Con <i>scala</i>, si intende una descrizione qualitativa sulla
        dimensione del luogo, come: città antica, comune, contrada, continente.
        Non sempre è stato possibile inserire questo dato e la colonna che ne
        risulta presenta molte inconsistenze. Se presente, con{" "}
        <i>luogo genitore</i> viene indicato un luogo dello stesso testo che
        contiene quello in oggetto. Ad esempio, in Il Barone Rampante: il
        giardino è della Villa dove il protagonista risiede; a sua volta la
        Villa è parte di Ombrosa.
      </p>
      <p>
        Parte di <i>inizio</i>, <i>complicazione</i> e <i>fine</i>, con queste
        informazioni viene indicata la presenza del luogo in una delle tre fasi
        della narrazione.
      </p>
      <p>
        Con <i>localizzabile</i> è stata indicata la possibilità di localizzare
        il luogo di ambientazione, sul pianeta terra o nello spazio.
      </p>
      <p>
        Con <i>terrestre</i> è stata indicata la natura terrestre o
        extraterrestre del luogo.
      </p>
      <p>
        Con <i>inventato</i> è stata indicata la natura fantastica del luogo.
        Questa categoria non è quasi mai applicabile per i luoghi generici,
        mentre lo è quasi sempre per i luoghi localizzabili.
      </p>
      <p>
        Questi dati sono stati successivamente oggetto di numerose riflessioni
        concettuali ed esplorazioni. Il dataset finale riporta due ulteriori
        colonne frutto di questo processo:
      </p>
      <ul>
        <li>
          <span className={styles.tag}>ID</span> del luogo;
        </li>
        <li>
          <span className={styles.tag}>categoria sintetica</span> del luogo;
        </li>
        <li>
          <span className={styles.tag}>tema</span>.
        </li>
      </ul>

      <p>
        La <i>categoria sintetica</i> del luogo rappresenta un incrocio di alcune delle
        precedenti proprietà: specifico o generico, localizzabile, terrestre,
        inventato. Da queste deriva una tassonomia basata su sei classi che
        copre tutte le casistiche: terrestri generici, terrestri localizzabili,
        cosmici generici, cosmici localizzabili, terrestri inventati e nessun
        luogo.
      </p>
      <p>
        Il <i>tema</i> indica il contesto narrativo di apparizione del luogo, utile per
        trarre alcune considerazioni di carattere critico. I temi riportati sono
        sette: guerra, natura ligure, paesaggio urbano, mare, fabbrica e
        metropoli.
      </p>

      <p>
        Il dataset è stato rappresentato nelle visualizzazioni luoghi,
        trasformare e relative schede di approfondimento.
      </p>
    </>
  ),
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
