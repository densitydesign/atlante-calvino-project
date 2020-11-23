import React from "react";
import { Link } from "react-router-dom";
import styles from "./capta.module.css";

const spazioLuoghi = {
  name: "Spazio: i luoghi dell’opera",
  type: "data",
  license: "https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png",
  licenseUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  licenseAltAttr: "Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)",
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
        Il dataset raccoglie la prima occorrenza di ogni luogo presente nel
        corpus delle opere di Calvino. Un luogo può essere ‘di ambientazione’
        quando ospita una parte della narrazione oppure ‘nominato’ quando è solo
        presente nel testo senza ospitare le azioni dei personaggi. Ad esempio:
      </p>
      <p className="cite cite2">
        – Colla Bracca, luogo di ambientazione:<br/>
        «Alle nove e un quarto [Briga] arrivò su Colla Bracca assieme alla luna»
        <br/>
        – Ceppo, luogo nominato:<br/>
        «le mine erano distanti, sull’altro versante di Ceppo»
      </p>
      <p>
        I luoghi sono stati registrati tramite lo strumento Explorer. Le
        informazioni originariamente raccolte tramite lo strumento sono state le
        seguenti:
      </p>
      <ul>
        <li>
          <span className={styles.tag}>ID</span> del testo in cui compare il
          luogo;
        </li>
        <li>
          <span className={styles.tag}>occorrenza</span> del nome di luogo;
        </li>
        <li>
          <span className={styles.tag}>posizione</span> nel testo (carattere di
          inizio e di fine);
        </li>
        <li>
          luogo <span className={styles.tag}>specifico o generico</span> (e.g.
          Londra oppure città);
        </li>
        <li>
          <span className={styles.tag}>Scala</span>;
        </li>
        <li>
          luogo <span className={styles.tag}>‘genitore’</span> (questo luogo è
          parte di un altro luogo);
        </li>
        <li>
          <span className={styles.tag}>parte di inizio</span> (true/false);
        </li>
        <li>
          <span className={styles.tag}>Parte di complicazione</span>{" "}
          (true/false);
        </li>
        <li>
          <span className={styles.tag}>Parte di fine</span> (true/false);
        </li>
        <li>
          <span className={styles.tag}>Localizzabile</span> (true/false)
        </li>
        <li>
          <span className={styles.tag}>Terrestre</span> (true/false)
        </li>
        <li>
          <span className={styles.tag}>Inventato</span> (si/no/non applicabile)
        </li>
        <li>Nota di servizio</li>
      </ul>
      <p>
        Con <i>scala</i>, si intende una descrizione qualitativa sulla
        dimensione del luogo, come: città antica, comune, contrada, continente.
        Non sempre è stato possibile inserire questo dato e la colonna che ne
        risulta presenta molte inconsistenze. Se presente, con{" "}
        <i>luogo genitore</i> viene indicato un luogo dello stesso testo che
        contiene quello in oggetto. Ad esempio, in Il Barone Rampante: il
        giardino è della Villa dove il protagonista risiede; a sua volta la
        Villa è parte di Ombrosa.
      </p>
      <p>
        Parte di <i>inizio</i>, <i>complicazione</i> e <i>fine</i>, con queste
        informazioni viene indicata la presenza del luogo in una delle tre fasi
        della narrazione.
      </p>
      <p>
        Con <i>localizzabile</i> è stata indicata la possibilità di localizzare
        il luogo di ambientazione, sul pianeta terra o nello spazio.
      </p>
      <p>
        Con <i>terrestre</i> è stata indicata la natura terrestre o
        extraterrestre del luogo.
      </p>
      <p>
        Con <i>inventato</i> è stata indicata la natura fantastica del luogo.
        Questa categoria non è quasi mai applicabile per i luoghi generici,
        mentre lo è quasi sempre per i luoghi localizzabili.
      </p>
      <p>
        Questi dati sono stati successivamente oggetto di numerose riflessioni
        concettuali ed esplorazioni. Il dataset finale riporta due ulteriori
        colonne frutto di questo processo:
      </p>
      <ul>
        <li>
          <span className={styles.tag}>ID</span> del luogo;
        </li>
        <li>
          <span className={styles.tag}>categoria sintetica</span> del luogo;
        </li>
        <li>
          <span className={styles.tag}>tema</span>.
        </li>
      </ul>

      <p>
        La <i>categoria sintetica</i> del luogo rappresenta un incrocio di
        alcune delle precedenti proprietà: specifico o generico, localizzabile,
        terrestre, inventato. Da queste deriva una tassonomia basata su sei
        classi che copre tutte le casistiche: terrestri generici, terrestri
        localizzabili, cosmici generici, cosmici localizzabili, terrestri
        inventati e nessun luogo.
      </p>
      <p>
        Il <i>tema</i> indica il contesto narrativo di apparizione del luogo,
        utile per trarre alcune considerazioni di carattere critico. I temi
        riportati sono sette: guerra, natura ligure, paesaggio urbano, mare,
        fabbrica e metropoli.
      </p>

      <p>
        Il dataset è stato rappresentato nelle visualizzazioni{" "}
        <Link to="/space/phase1">«luoghi»</Link>,{" "}
        <Link to="/space/phase2">«trasformare»</Link> e relative schede di
        approfondimento,{" "}
        <Link to="/space/phase1/focus">«Tassonomie dei luoghi inventati»</Link>{" "}
        e{" "}
        <Link to="/space/phase2/focus">
          «L'orizzonte geografico e letterario in Calvino»
        </Link>
        .
      </p>
    </>
  ),
};

export default spazioLuoghi;
