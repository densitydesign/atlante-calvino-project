import React from "react";
// import { Link } from "react-router-dom";
// import styles from "./capta.module.css";

const tools = {
  name: "Strumenti per la raccolta dati",
  type: "tool",
  urls: [
    {
      label: "Explorer",
      url: "https://densitydesign.github.io/atlante-calvino/explorer",
    },
    {
      label: "Wanderer",
      url: "https://densitydesign.github.io/atlante-calvino/wanderer",
    },
  ],
  jsx: (
    <>
      <p>
        La raccolta di dati sopra descritta è avvenuta direttamente sulle opere
        di Calvino, fornite dalla casa editrice Mondadori che detiene tutti i
        diritti sull’opera.
        <br />
        Di conseguenza è stato necessario prestare una particolare attenzione a
        non infrangerne il copyright. Da qui viene lo spunto per la creazione di
        nuovi strumenti orientati alla raccolta di dati e annotazioni sui testi.
      </p>
      <p>
        Applicazioni con simili funzionalità esistono già, ma in certi casi sono
        risultate obsolete e in altri utilizzabili solamente previo upload del
        proprio materiale su un server di terze parti e in altri casi ancora, la
        curva di apprendimento è risultata troppo ripida.
      </p>
      <p>
        Anche se in forma di ‘sito internet’, gli strumenti che proponiamo qui
        di seguito risolvono all’origine ogni problematica legata alla
        diffusione inappropriata di testo e dati, utilizzando un approccio
        completamente client-side come già fatto da altre applicazioni diffuse
        nel mondo della visualizzazione (e.g.{" "}
        <a
          href="https://rawgraphs.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          RAWGraphs
        </a>
        ).
      </p>
    </>
  ),
};

export default tools;
