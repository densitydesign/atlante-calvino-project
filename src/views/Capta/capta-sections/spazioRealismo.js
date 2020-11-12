import React from "react";
import { Link } from "react-router-dom";
import styles from "./capta.module.css";

const spazioRealismo = {
    name: "Spazio: spazio realista nell’opera",
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
          Il dataset rappresenta un approfondimento di quanto descritto
          precedentemente (Spazio: i luoghi dell’Opera), focalizzandosi su un subset del
          corpus dell’autore. Questo sotto gruppo riguarda la produzione
          presumibilmente più realista di Calvino, ossia quei racconti in cui
          compaiono luoghi terrestri localizzabili o generici.
          <br />
          Riprendendo le stesse informazioni create precedentemente, per ogni
          luogo appartenente ad uno dei racconti presi in considerazione sono
          state aggiunte le seguenti proprietà:
        </p>
        <ul>
          <li>
            <span className={styles.tag}>Tipologia</span>
          </li>
          <li>
            <span className={styles.tag}>Livello</span>
          </li>
          <li>
            <span className={styles.tag}>Movimento</span>
          </li>
          <li>
            <span className={styles.tag}>Direzione del movimento</span>
          </li>
        </ul>
        <p>
          La <i>tipologia</i> indica se si tratta di un luogo interno, luogo esterno, di
          un mezzo di trasporto o se nel racconto è del tutto assente un luogo di
          ambientazione.
          <br />
          Il <i>livello</i> indica la gerarchia di appartenenza del luogo ad altri luoghi
          presenti nel racconto. Ad esempio, in Il Gatto e il Poliziotto: casa è
          luogo interno di livello 2 perché è parte di quartieri operai, luogo
          esterno di livello 1. Quartieri operai è di livello 1 perché a sua volta
          è parte di città, luogo esterno di livello 0, poiché nel racconto non
          sono presenti ulteriori cornici.
        </p>
        <p>Il dataset è stato rappresentato nella visualizzazione <Link to="/space/phase3">«Realismo»</Link>.</p>
      </>
    ),
  };

  export default spazioRealismo;