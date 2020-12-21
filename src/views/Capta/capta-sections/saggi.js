import React from "react";
import { Link } from "react-router-dom";
import styles from "./capta.module.css";

const saggi = {
  name: "Saggi",
  type: "data",
  license: "https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png",
  licenseUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  licenseAltAttr:
    "Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)",
  files: [{ label: "[Atlante Calvino] saggi - archipelago.csv", file: null }],
  jsx: (
    <>
      <p>
        Il dataset è frutto della rielaborazione e dell’ampliamento delle
        informazioni presenti nell’indice dei nomi dei <i>Saggi. 1945-1985</i>{" "}
        (a cura di Mario Barenghi, II, Milano, Mondadori, 1995, pp. 3045-3076).
        <br />
        Sull’indice è stato necessario applicare un algoritmo di riconoscimento
        del testo; a questo scopo è stato utilizzato Adobe Acrobat Reader.
        Successivamente il testo è stato convertito in .txt (
        <i className="italic-lang-ita">plain text</i>) ed è stato ripulito di
        errori e sbavature con l’aiuto di{" "}
        <i className="italic-lang-ita">regular expressions</i> o con accorte
        procedure manuali. Le informazioni contenute nei file di testo sono
        state poi strutturate con l’aiuto di{" "}
        <a
          href="https://github.com/densitydesign/atlante-calvino-scripts/tree/master/saggi"
          target="_blank"
          rel="noopener"
        >
          alcuni script
        </a>{" "}
        in node.js realizzati per l’occasione.
      </p>
      <p>
        Questa prima elaborazione ha permesso di ottenere una tabella che
        contiene, per ogni nome, le seguenti informazioni:
      </p>
      <ul>
        <li>
          identificativo univoco o <span className={styles.tag}>ID</span>;
        </li>
        <li>
          <span className={styles.tag}>occorrenza</span> (nome e cognome);
        </li>
        <li>
          <span className={styles.tag}>posizione nel testo</span> (pagina o
          pagine);
        </li>
        <li>
          <span className={styles.tag}>titoli</span> del testo in cui comprare l’occorrenza;
        </li>
        <li>
          <span className={styles.tag}>lunghezza</span> del testo (pagina di inizio e fine).
        </li>
      </ul>
      <p>
        A partire da queste informazioni è stata generata una tabella di
        collegamenti che indicano la compresenza dei nomi nello stesso saggio,
        in seguito visualizzata sotto forma di grafico a rete in{" "}
        <Link to="/compass">L’arcipelago dei nomi</Link>.
      </p>
      <p>
        Per ampliare le potenzialità della visualizzazione, ogni nome è stato
        collegato a un certo numero di informazioni biografiche (data di nascita
        e di morte, mestiere, nazionalità, ecc.) sfruttando la funzione di
        OpenRefine per il collegamento con le corrispondenti entità Wikidata.
        Alcune informazioni sono state aggiunte o modificate manualmente, nel
        caso in cui fossero mancanti o gravemente imprecise.
        <br />
        Tali informazioni non sono state ancora trasformate in una
        visualizzazione, ma la loro raccolta ha permesso di osservare da vicino
        il mondo dei <i className="italic-lang-ita">linked open data</i> e delle basi di conoscenza online
        collaborative, fornendo potenziali spunti di ricerca.
      </p>
    </>
  ),
};

export default saggi;
