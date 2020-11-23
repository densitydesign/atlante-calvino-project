import React from "react";
import { Link } from "react-router-dom";
// import styles from "./capta.module.css";

const dubbioNebbia = {
    name: "Dubbio: la nebbia, la cancellazione",
    type: "data",
    license: "https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png",
    licenseUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
    licenseAltAttr: "Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)",
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

  export default dubbioNebbia;