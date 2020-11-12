import React from "react";
import { Link } from "react-router-dom";
import styles from "./capta.module.css";

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

  export default saggi;