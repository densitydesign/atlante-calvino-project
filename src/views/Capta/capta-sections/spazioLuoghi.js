import React from "react";
import { Link } from "react-router-dom";
import styles from "./capta.module.css";

const spazioLuoghi = {
  name: "Spazio: dataset 1",
  type: "data",
  license: "https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png",
  licenseUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  licenseAltAttr:
    "Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)",
  open: false,
  files: [
    {
      label: "[Atlante Calvino] luoghi - nominati e ambientazioni.csv",
      file: null,
    },
  ],
  jsx: (
    <>
      <p>
        Il dataset raccoglie tutti i luoghi d’ambientazione delle opere di
        Calvino. I luoghi sono stati identificati manualmente e classificati in
        parte grazie all’utilizzo dello strumento {" "}
        <a
          href="https://densitydesign.github.io/atlante-calvino/explorer/"
          target="_blank"
          rel="noopner noreferrer"
        >
          Explorer
        </a>.
      </p>
      <p>Per ogni occorrenza sono riportate le seguenti informazioni:</p>
      <ul>
        <li>
          <span className={styles.tag}>ID</span> del luogo;
        </li>
        <li>
          <span className={styles.tag}>ID del testo</span> in cui compare
          l’occorrenza;
        </li>
        <li>
          <span className={styles.tag}>occorrenza</span>;
        </li>
        
        <li>
          <span className={styles.tag}>appartenenza o dipendenza</span> da un
          altro luogo d’ambientazione esplicitamente citato;
        </li>
        <li>
          <span className={styles.tag}>scala</span>;
        </li>
        
        <li>
          luogo <span className={styles.tag}>localizzabile</span> (vero/falso);
        </li>
        <li>
          luogo <span className={styles.tag}>terrestre</span> (vero/falso);
        </li>
        <li>
          luogo <span className={styles.tag}>inventato</span> (vero/falso/non
          assegnato);
        </li>
        <li>
          <span className={styles.tag}>categoria</span> (cosmici generici/cosmici
          localizzabili/terrestri localizzabili/terrestri generici/terrestri
          inventati/nessun luogo);
        </li>
        <li>
          <span className={styles.tag}>contesto</span> (guerra/natura
          ligure/paesaggio urbano/mare/fabbrica/metropoli/nessun contesto).
        </li>
      </ul>

      <p>
        Con <i>scala</i> si fa riferimento alla descrizione qualitativa della
        dimensione del luogo (es. <i>landmark</i>, comune, nazione). Non sempre
        è stato possibile trovare una descrizione appropriata: per questo motivo
        tale categoria di informazioni è stata solo in minima parte utilizzata.
      </p>
      <p>
        Il dataset è stato utilizzato per la realizzazione delle visualizzazioni{" "}
        <Link to="/space/phase1">Luoghi</Link> e{" "}
        <Link to="/space/phase2">Trasformare</Link>, oltre che per i relativi
        Approfondimenti:{" "}
        <Link to="/space/phase1/focus">La forma della geografia inventata</Link>{" "}
        e <Link to="/space/phase2/focus">Cartografia dei luoghi terrestri</Link>
        . Il dataset di quest’ultimo, che prende in esame soltanto i luoghi
        terrestri localizzabili, integra due informazioni supplementari: le
        <span className={styles.tag}>coordinate geografiche</span> e la{" "}
        <span className={styles.tag}>
          classificazione del tempo della storia
        </span>{" "}
        dei testi che appartengono alla selezione.
      </p>
    </>
  ),
};

export default spazioLuoghi;
