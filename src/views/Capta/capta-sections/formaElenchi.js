import React from "react";
import { Link } from "react-router-dom";
import styles from "./capta.module.css";

const formaElenchi = {
  name: "Forma: Strutture elencatorie",
  type: "data",
  license: "https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png",
  licenseUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  licenseAltAttr:
    "Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)",
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
        Questo dataset registra le occorrenze di strutture elencatorie presenti
        nel corpus, raccolte tramite lo strumento Explorer.
      </p>
      <p>Per ogni occorrenza sono riportate le seguenti informazioni:</p>

      <ul>
        <li><span className={styles.tag}>ID del testo</span> in cui compare l’occorrenza; </li>
        <li><span className={styles.tag}>occorrenza</span>;</li>
        <li><span className={styles.tag}>posizione</span> nel testo (carattere di inizio e di fine);</li>
        <li><span className={styles.tag}>categoria</span> (parole/sintagmi/proposizioni/misto);</li>
        <li><span className={styles.tag}>totale dei caratteri</span> del testo in cui compare l’occorrenza;</li>
        <li><span className={styles.tag}>totale dei caratteri</span> dell’occorrenza;</li>
        <li>
          <span className={styles.tag}>percentuale</span> tra numero di caratteri dell’occorrenza e numero di
          caratteri del testo.
        </li>
      </ul>

      <p>
        Il dataset è stato utilizzato per la visualizzazione{" "}
        <Link to="/form/phase1">Elenchi</Link> e l’Approfondimento{" "}
        <Link to="form/phase1/focus">Per un’estetica elencatoria</Link>.
      </p>
    </>
  ),
};

export default formaElenchi;
