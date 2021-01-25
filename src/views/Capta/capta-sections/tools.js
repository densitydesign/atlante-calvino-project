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
      La raccolta dati è avvenuta in forma di annotazione sul testo tramite
      strumenti digitali appositamente realizzati. Le applicazioni per
      l’annotazione già esistenti si sono rivelate inadatte al nostro lavoro per
      varie ragioni. Tra queste, la necessità di caricare il testo su server di
      terze parti, problemi di obsolescenza e di incompatibilità, oppure a causa
      di una curva di apprendimento troppo ripida.
      <br />
      Nel rispetto del copyright dell’opera, gli strumenti introdotti risolvono
      il problema della diffusione inappropriata del materiale utilizzando un
      approccio <i className="italic-lang-ita">client-side</i>, come già succede
      nel caso di altre applicazioni diffuse nel mondo della visualizzazione
      (es. <a href="https://rawgraphs.io/" target="_blank" rel="noopener">RAWGraphs</a>).
    </p>
    <br />
    <h2>
      Explorer{" "}
      <span role="img" aria-label="telescope">
        🔭
      </span>
    </h2>
    <p>
      Lo strumento permette di evidenziare parti del testo, risalire alla
      posizione in caratteri del testo evidenziato, specificare un certo numero
      di proprietà a seconda di uno schema dati definito dal ricercatore e
      infine esportare queste informazioni in formato tabulare.
    </p>
    <p>Lo strumento necessita del caricamento di due file:</p>
    <ul>
      <li>un file di testo in formato .txt sul quale applicare annotazioni</li>
      <li>un file in formato .tsv contenente lo schema per la raccolta.</li>
    </ul>
    <p>
      La lunghezza di alcuni testi come i romanzi o i racconti lunghi non ne
      permette l'analisi in una sola sessione. In questi casi è possibile
      esportare il proprio lavoro e ricaricarlo successivamente per riprendere
      quanto è stato lasciato in sospeso.
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
      Wanderer{" "}
      <span role="img" aria-label="telescope">
        🔬
      </span>
    </h2>
    <p>
      Lo strumento è un’evoluzione del precedente e ne eredita tutte le
      funzionalità. In aggiunta, Wanderer permette di selezionare
      contemporaneamente due porzioni di testo tra le quali si vuole indicare
      una relazione.
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
