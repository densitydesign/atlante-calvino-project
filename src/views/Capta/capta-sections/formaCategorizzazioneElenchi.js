import React from "react";
// import { Link } from "react-router-dom";
// import styles from "./capta.module.css";

const formaCategorizzazioneElenchi = {
  name: "Forma: Categorizzazione degli elenchi",
  type: "data",
  license: "https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png",
  licenseUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  open: false,
  files: [
    {
      label: "[Atlante Calvino] spazio - spazio realista.csv",
      file: null,
    },
  ],
  jsx: (
    <>
      <p>
        Il dataset è costruito a partire dai volumi dell'opera letteraria di
        Calvino, escludendo quindi i racconti singoli. È escluso anche{" "}
        <i>Eremita a Parigi</i> nonostante si tratti di un volume.
        <br />
        Per ogni volume, il dataset identifica sequenze narrative di testo che
        si susseguono dal primo all’ultimo carattere. Ogni sequenza narrativa
        (identificata con un ID univoco) può avere più livelli nidificati al suo
        interno.
        <br />
        La sequenza è una stringa di testo che ha un inizio e una fine
        identificate nel dataset da un numero in caratteri che ne indica la
        posizione nel testo rispetto al titolo.
        <br />
        Sono state identificate due principali tipologie di dettaglio:{" "}
        <i>ambito</i> e<i>categoria</i>. Per la tipologia dell’ambito sono state
        identificate altre sotto-tipologie di sequenza.
      </p>
      <p>Ambientazione</p>
      <ul>
        <li>
          Esteriore (sequenze che descrivono situazioni che avvengono
          all’esterno del personaggio)
        </li>
        <li>
          Interiore (sequenze che riguardano l’aspetto interiore del
          personaggio)
        </li>
      </ul>
      <p>Struttura</p>
      <ul>
        <li>Formale (Sequenze che riguardano la struttura del testo)</li>
      </ul>
    </>
  ),
};

export default formaCategorizzazioneElenchi;
