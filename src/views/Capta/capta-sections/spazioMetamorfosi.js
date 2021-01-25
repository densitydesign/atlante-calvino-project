import React from "react";
import { Link } from "react-router-dom";
import styles from "./capta.module.css";

const spazioMetamorfosi = {
  name: "Spazio: dataset 3",
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
        Il racconto <i>Paura sul sentiero</i> è posto a fondamento del dataset
        in questione, nell’intento di trasformare il racconto in un oggetto
        visivo.
      </p>

      <p>
        Il dataset raccoglie tutte le parole del racconto, in ordine di
        apparizione. Per ogni occorrenza sono riportate le seguenti
        informazioni:
      </p>

      <ul>
        <li><span className={styles.tag}>ID</span> dell’occorrenza;</li>
        <li><span className={styles.tag}>occorrenza</span>;</li>
        <li><span className={styles.tag}>luogo d’ambientazione</span>;</li>
        <li>
          <span className={styles.tag}>tipologia di sequenza</span> narrativa
          (realtà/immaginazione/contestualizzazione);
        </li>
        <li><span className={styles.tag}>luogo geografico</span> (vero/falso);</li>
        <li><span className={styles.tag}>nome proprio</span> (vero/falso);</li>
        <li><span className={styles.tag}>sostantivo</span> (vero/falso);</li>
        <li><span className={styles.tag}>tipologia di sostantivo</span> (astratto/concreto);</li>
        <li><span className={styles.tag}>campo semantico</span> (guerra/natura/corpo/altro);</li>
        <li><span className={styles.tag}>metafora</span> (vero/falso);</li>
        <li><span className={styles.tag}>similitudine</span> (vero/falso);</li>
        <li><span className={styles.tag}>interrogativo-dubbio</span> (vero/falso);</li>
        <li><span className={styles.tag}>visione-desiderio</span> (vero/falso).</li>
      </ul>

      <p>
        Il dataset è stato utilizzato per l’Approfondimento <Link to="/space/phase3/focus">Metamorfosi della realtà: sulle tracce della paura</Link>.
      </p>
    </>
  ),
};

export default spazioMetamorfosi;
