import React from "react";

import ToolMethodCell from "./ToolMethodCell";
import Footer from "../../headers/Footer/Footer";

import "../../App.css";
import "./ToolsAndMethods.css";
import "../../general/GridsWithScrollableColumns/GridWithScrollableColumn.css";
import "../../general/GridsWithScrollableColumns/ScrollableColumn.css";
import IndexMenuHeader from "../../headers/IndexMenuHeader";

export default class ToolsAndMethods extends React.Component {
  render() {
    return (
      <>
        <IndexMenuHeader menuAction={"openIndex"} />
        <div className="ac-grid-24 has-sidebar">
          <div className="sidebarLeft sticky-element">
            <h1>Capta</h1>
            <ol>
              <li>Capta Uno</li>
              <li>Capta Uno</li>
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

            <br />
            <h2>DensityDesign Research Lab</h2>
            <h3 style={{ color: "black" }}>
              Dipartimento di Design
              <br />
              Politecnico di Milano
            </h3>
            <p>
              Il laboratorio di ricerca
              <a href="http://densitydesign.org/" rel="noopener noreferrer">
                DensityDesign
              </a>
              è parte del Dipartimento di Design del Politecnico di Milano.
              Obiettivo del laboratorio è la rappresentazione di fenomeni
              complessi di natura sociale, organizzativa o urbana. A questi temi
              va aggiunto il crescente interesse per le Digital Humanities ed in
              particolare per tutto ciò che sta all’intersezione fra le materie
              umanistiche e l’information design, come la progettazione di
              artefatti e metodi digitali per l’elaborazione, l’accesso e la
              visualizzazione dell’informazione.
            </p>

            <br />
            <p>
              Allo sviluppo delle visualizzazioni hanno collaborato Mauro
              Bianchi, Giovanni Fumagalli e Matteo Scaffidi di
              <a href="https://inmagik.com/" rel="noopener noreferrer">
                Inmagik
              </a>
              .
              <br />
              Ringraziamo Lorenzo Faggi per la registrazione, presso lo spazio
              occupato Piano Terra, dell’audio del video introduttivo
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
