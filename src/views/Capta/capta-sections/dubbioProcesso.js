import React from "react";
// import { Link } from "react-router-dom";
// import styles from "./capta.module.css";

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
        progressivamente (e.g. t.d. 19, t.d. 20). Ogni occorrenza è una stringa
        di testo che ha un inizio e una fine segnalate nel dataset da un numero
        in caratteri che ne indica la posizione. Quando presente è stata
        registrata la “formula”, ovvero la sequenza di parole che collega
        logicamente un’occorrenza di <i>testo dubitativo</i> con il
        corrispondente <i>testo oggetto di dubbio</i>. Inoltre, è stata
        registrata la presenza di <i>parentesi</i> e <i>incisi</i>. Infine, a
        ogni occorrenza di <i>testo dubitativo</i> sono state attribuite due
        informazioni supplementari, in base a una griglia d’analisi
        prestabilita:
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

export default dubbioProcesso;
