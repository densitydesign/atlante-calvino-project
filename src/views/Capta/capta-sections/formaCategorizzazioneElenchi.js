import React from "react";
// import { Link } from "react-router-dom";
// import styles from "./capta.module.css";

const formaCategorizzazioneElenchi = {
  name: "Forma: Categorizzazione degli elenchi",
  type: "data",
  license: "https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png",
  licenseUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  licenseAltAttr: "Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)",
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
      <p>
        Ogni sotto-tipologia è organizzata in altre categorie che ne specificano
        il contenuto. Esteriore: eventi liminali, interazione, spostamento,
        intenzione, situazione. Interiore: stato euforico, stato disforico,
        stato riflessivo; stato sospeso. Forma: racconto incastonato,
        metanarrazione, cornice, struttura, terna.</p><p>Ogni volume contiene
        all’interno un numero specifico di sequenze che possono anche avere una
        struttura gerarchica a livelli. Infatti, ogni sequenza può contenere
        all’interno altre sottosequenze che appartengono a diverse categorie.
        Per esempio: un volume che presenta al primo livello una struttura
        esclusivamente formale composta da una serie limitata di sequenza, al
        secondo livello può evidenziare come una delle sequenze formali contenga
        al suo interno una sequenza riguardante un “evento liminale” e uno
        “stato euforico”. Grazie a questa struttura gerarchica e nidificata è
        possibile identificare e rappresentare fino a cinque livelli di
        sottosequenze nei volumi analizzati (ad esempio come in <i>Il castello dei
        destini incrociati (riediz)</i> e <i>Le cosmicomiche vecchie e nuove</i>). Questo
        tipo di comportamento è stato registrato nel dataset impostando delle
        concatenazioni di sequenze (per esempio: struttura;incontro
        femminile; inseguimento/ricerca), ordinate secondo il numero di
        caratteri. Ogni sequenza e le successive sono identificate con un ID che
        permette di concatenare la intera struttura.
      </p>
    </>
  ),
};

export default formaCategorizzazioneElenchi;
