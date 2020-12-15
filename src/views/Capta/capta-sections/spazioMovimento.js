import React from "react";
import { Link } from "react-router-dom";
import styles from "./capta.module.css";

const spazioMovimento = {
  name: "Spazio: luoghi interni, esterni e movimento",
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
        Questo dataset rappresenta una selezione e insieme un ampliamento di
        quanto descritto al punto precedente. Una selezione, perché prende in
        esame soltanto i luoghi d’ambientazione terrestri localizzabili e
        generici della produzione calviniana di narrativa breve. Un ampliamento,
        perchè alle caratteristiche precedentemente elencate in questo dataset
        si aggiungono alcune informazioni supplementari:
      </p>
      <ul>
        <li>
          la <span className={styles.tag}>tipologia</span> di luogo
          d’ambientazione (spazio esterno/spazio interno/mezzo di trasporto);
        </li>
        <li>
          il <span className={styles.tag}>movimento</span> (true/false);
        </li>
        <li>
          la <span className={styles.tag}>direzione del movimento</span> (avanti/indietro).
        </li>
      </ul>
      <p>
        Il dataset è stato utilizzato per la visualizzazione{" "}
        <Link to="/space/phase3">Realismo</Link>.
      </p>
    </>
  ),
};

export default spazioMovimento;
