import React from "react";
import { BsBoxArrowUpRight } from "react-icons/bs";
// import { Link } from "react-router-dom";
// import styles from "./capta.module.css";

const tools = {
  name: "Strumenti per la raccolta dati",
  type: "tool",
  urls: [
    {
      label: "Explorer",
      url: "https://densitydesign.github.io/atlante-calvino/explorer",
      repo: "https://github.com/densitydesign/atlante-calvino/explorer",
    },
    {
      label: "Wanderer",
      url: "https://densitydesign.github.io/atlante-calvino/wanderer",
      repo: "https://github.com/densitydesign/atlante-calvino/wanderer",
    },
  ],
  jsx: null, // jsx declared after
};

tools.jsx = (
  <>
    <p>
      La raccolta di dati sopra descritta è avvenuta direttamente sulle opere di
      Calvino, fornite da Mondadori che detiene tutti i diritti sull’opera.
      <br />
      Di conseguenza è stato necessario prestare una particolare attenzione a
      non infrangerne il copyright e da qui viene lo spunto per la creazione di
      nuovi strumenti orientati alla raccolta di dati e annotazioni sui testi.
    </p>
    <p>
      Applicazioni con simili funzionalità esistono già, ma in certi casi sono
      risultate obsolete, in altri utilizzabili solamente previo upload del
      proprio materiale su un server di terze parti e, in altri casi ancora, la
      curva di apprendimento è risultata troppo ripida.
    </p>
    <p>
      Anche se in forma di ‘sito internet’, gli strumenti che proponiamo qui di
      seguito risolvono all’origine ogni problematica legata alla diffusione
      inappropriata di testo e dati, utilizzando un approccio completamente
      client-side come già fatto da altre applicazioni diffuse nel mondo della
      visualizzazione (e.g.{" "}
      <a href="https://rawgraphs.io" target="_blank" rel="noopener noreferrer">
        RAWGraphs
      </a>
      ).
    </p>
    <br />
    <h2>
      Annotazioni semplici: Explorer{" "}
      <span role="img" aria-label="telescope">
        🔭
      </span>
    </h2>
    <p>Lo strumento necessita del caricamento di due files:</p>

    <ul>
      <li>un file di testo in formato .txt sul quale applicare annotazioni</li>
      <li>un file in formato .tsv contenente lo schema per la raccolta.</li>
    </ul>

    <p>
      Lo strumento permette di evidenziare parti del testo, risalire alla
      posizione in caratteri del testo evidenziato, specificare un certo numero
      di proprietà a seconda dello schema dati caricato ed infine esportare
      queste informazioni in formato tabulare.
    </p>
    <p>
      La lunghezza di alcuni testi come i romanzi o i racconti lunghi, non ne
      permette l'analisi in una sola sessione. In questi casi è possibile
      esportare il proprio lavoro e ricaricarlo successivamente per riprendere
      ciò che è stato lasciato in sospeso.
    </p>
    <p>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={tools.urls.find((d) => d.label === "Explorer").repo}
      >
        Tutorial e codice sorgente <BsBoxArrowUpRight />
      </a>
    </p>
    <p>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={tools.urls.find((d) => d.label === "Explorer").url}
      >
        Usa lo strumento <BsBoxArrowUpRight />
      </a>
    </p>
    <br />
    <h2>
      Annotazioni annidate: Wanderer{" "}
      <span role="img" aria-label="telescope">
        🔬
      </span>
    </h2>
    <p>
      Lo strumento è un’evoluzione del precedente e ne eredita tutte le
      funzionalità. In aggiunta, permette di selezionare contemporaneamente due
      porzioni di testo tra le quali si vuole indicare una relazione (e.g. testo
      dubitativo).
    </p>
    <p>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={tools.urls.find((d) => d.label === "Wanderer").repo}
      >
        Tutorial e codice sorgente <BsBoxArrowUpRight />
      </a>
    </p>
    <p>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={tools.urls.find((d) => d.label === "Wanderer").url}
      >
        Usa lo strumento <BsBoxArrowUpRight />
      </a>
    </p>
  </>
);

export default tools;
