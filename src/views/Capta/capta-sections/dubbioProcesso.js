import React from "react";
import { Link } from "react-router-dom";
import styles from "./capta.module.css";

const dubbioProcesso = {
  name: "Dubbio: dataset 2",
  type: "data",
  license: "https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png",
  licenseUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  licenseAltAttr:
    "Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)",
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
        Il dataset rappresenta la diffusione nell’opera di quello che abbiamo
        definito il testo dubitativo. Per raccogliere i dati necessari è stato
        utilizzato lo strumento{" "}
        <a
          href="https://densitydesign.github.io/atlante-calvino/wanderer/"
          target="_blank"
          rel="noopner noreferrer"
        >
          Wanderer
        </a>
        , evidenziando le parti di testo coinvolte nel processo dubitativo.
      </p>
      <p>Nel dataset, le informazioni raccolte sono strutturate come segue:</p>
      <ul>
        <li>
          <span className={styles.tag}>ID del testo</span> in cui compare
          l’occorrenza;
        </li>
        <li>
          <span className={styles.tag}>ID occorrenza</span> di testo dubitativo;
        </li>
        <li>
          <span className={styles.tag}>occorrenza</span> di testo dubitativo;
        </li>
        <li>
          <span className={styles.tag}>posizione</span> nel testo (carattere di
          inizio e di fine);
        </li>
        <li>
          <span className={styles.tag}>categoria</span>{" "}
          (contenuto/forma/significato);
        </li>
        <li>
          <span className={styles.tag}>stile</span>{" "}
          (esitazione/riformulazione/negazione);
        </li>
        <li>
          parole <span className={styles.tag}>formula</span>;
        </li>
        <li>
          <span className={styles.tag}>parentesi</span> nel testo dubitativo
          (true/false);
        </li>
        <li>
          <span className={styles.tag}>incisi</span> nel testo dubitativo
          (true/false);
        </li>

        <li>
          <span className={styles.tag}>occorrenza</span> di testo oggetto di
          dubbio;
        </li>
        <li>
          <span className={styles.tag}>posizione</span> nel testo (carattere di
          inizio e di fine);
        </li>
        <li>
          <span className={styles.tag}>parentesi</span> nel testo oggetto di
          dubbio (true/false);
        </li>
        <li>
          <span className={styles.tag}>incisi</span> nel testo oggetto di dubbio
          (true/false);
        </li>
        <li>
          <span className={styles.tag}>
            testo dubitativo e oggetto di dubbio
          </span>{" "}
          (yes/no).
        </li>
      </ul>
      <p>
        Attraverso il dataset è possibile conoscere la quantità, la posizione e
        il modo di funzionamento del processo dubitativo all’interno di un
        testo.
      </p>
      <p>
        Il dataset è stato utilizzato per realizzare le visualizzazioni{" "}
        <Link to="/doubt/phase2">Dubitare</Link>,{" "}
        <Link to="/doubt/phase3">Cancellazione</Link> e gli Approfondimenti
        della seconda e terza tappa intitolati{" "}
        <Link to="/doubt/phase2/focus">Il romanzo-saggio che dubita</Link> e{" "}
        <Link to="/doubt/phase3/focus">Il dubbio e la cancellazione</Link>.
      </p>
    </>
  ),
};

export default dubbioProcesso;
