import React from "react";

import ToolMethodCell from "./ToolMethodCell";
import Footer from "../../headers/Footer/Footer";

import "../../App.css";
import "./ToolsAndMethods.css";
import "../../general/GridsWithScrollableColumns/GridWithScrollableColumn.css";
import "../../general/GridsWithScrollableColumns/ScrollableColumn.css";
import IndexMenuHeader from "../../headers/IndexMenuHeader";
import { HashLink as Link } from "react-router-hash-link";

export default class ToolsAndMethods extends React.Component {
  render() {
    return (
      <>
        <IndexMenuHeader menuAction={"openIndex"} />
        <div className="ac-grid-24 has-sidebar">
          <div className="sidebarLeft sticky-element">
            <h2 style={{ margin: "0.7142857143rem 0" }}>
              Elenco dei capta spiegati in dettaglio.{" "}
            </h2>
            <h3>Clicca su uno dei seguenti... </h3>
            <ol>
              <li>
                <Link to="/capta#CaptaUno">Capta Uno</Link>
              </li>
              <li>
                <Link to="/capta#CaptaDue">Capta Due</Link>
              </li>
              <li>Capta Uno</li>
              <li>Capta Uno</li>
            </ol>
          </div>
          <div className="contentRight">
            <h1>Capta / Dati</h1>
            <h2>Dati / Capta</h2>
            <p>
              In questa pagina è riportata una descrizione dei dataset che
              abbiamo costruito e che sono il fondamento delle visualizzazioni
              dell’Atlante. Spenderemo qualche parola sulle scelte progettuali,
              sui metodi e sugli strumenti che abbiamo usato per creare questo
              materiale.
              <br />
              Abbiamo deciso di intitolare questa sezione ‘Capta’ invece di
              ‘Dati’, per richiamare il concetto che ha ampiamente influenzato
              il nostro lavoro e che è ormai conosciuto nell’ambito delle
              Digital Humanities.
              <br />
              <br />
              <span className="cite">
                «Capta is “taken” actively while data is assumed to be a “given”
                able to be recorded and observed. From this distinction, a world
                of differences arises. Humanistic inquiry acknowledges the
                situated, partial, and constitutive character of knowledge
                production, the recognition that knowledge is constructed,
                taken, not simply given as a natural representation of
                pre-existing fact.»
              </span>
            </p>

            <div id="CaptaUno">
              <h2>Corpus</h2>
              <p>
                La casa editrice italiana Mondadori, che detiene i diritti sul
                lavoro di Italo Calvino, ha collaborato al progetto fornendo
                l’opera completa nella collana “I Meridiani”, che si compone in
                questo modo: l’opera narrativa integrale nei 3 volumi intitolati
                Romanzi e racconti; le Fiabe italiane curate dall’autore nel
                1956; un’ampia parte della produzione saggistica pubblicata nei
                2 volumi dei Saggi; la selezione di epistole pubblicata nel
                volume singolo Lettere; l’Album Calvino. Per realizzare i tre
                Itinerari abbiamo deciso di focalizzarci unicamente sull’opera
                narrativa pubblicata mentre Calvino era in vita. Il corpus di
                riferimento si compone di oltre venti volumi distribuiti tra il
                1946 e il 1984: romanzi, raccolte di racconti, forme ibride a
                metà strada tra romanzi brevi e racconti lunghi, per un totale
                di 206 titoli (vedi Istruzioni per l’uso). Il dataset è composto
                da due tabelle relazionali che racchiudono le informazioni
                riguardanti la selezione dei testi studiati in questo progetto.
                Le informazioni provengono: dalla sezione Note e notizie sui
                testi a cura di Mario Barenghi, Bruno Falcetto e Claudio
                Milanini all’interno dei tre volumi Romanzi e racconti (I pp.
                1242-1393; II pp. 1309-1475; III 1195-1350); dalla Bibliografia
                di Italo Calvino di Luca Baranelli (Pisa, Scuola Normale
                Superiore, 2007).
              </p>
            </div>

            <div id="CaptaDue">
              <h2>Corpus2</h2>
              <p>
                1-Corpus La casa editrice italiana Mondadori, che detiene i
                diritti sul lavoro di Italo Calvino, ha collaborato al progetto
                fornendo l’opera completa nella collana “I Meridiani”, che si
                compone in questo modo: l’opera narrativa integrale nei 3 volumi
                intitolati Romanzi e racconti; le Fiabe italiane curate
                dall’autore nel 1956; un’ampia parte della produzione saggistica
                pubblicata nei 2 volumi dei Saggi; la selezione di epistole
                pubblicata nel volume singolo Lettere; l’Album Calvino. Per
                realizzare i tre Itinerari abbiamo deciso di focalizzarci
                unicamente sull’opera narrativa pubblicata mentre Calvino era in
                vita. Il corpus di riferimento si compone di oltre venti volumi
                distribuiti tra il 1946 e il 1984: romanzi, raccolte di
                racconti, forme ibride a metà strada tra romanzi brevi e
                racconti lunghi, per un totale di 206 titoli (vedi Istruzioni
                per l’uso). Il dataset è composto da due tabelle relazionali che
                racchiudono le informazioni riguardanti la selezione dei testi
                studiati in questo progetto. Le informazioni provengono: dalla
                sezione Note e notizie sui testi a cura di Mario Barenghi, Bruno
                Falcetto e Claudio Milanini all’interno dei tre volumi Romanzi e
                racconti (I pp. 1242-1393; II pp. 1309-1475; III 1195-1350);
                dalla Bibliografia di Italo Calvino di Luca Baranelli (Pisa,
                Scuola Normale Superiore, 2007).
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
