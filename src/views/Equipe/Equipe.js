import React from "react";
import { BsEnvelope } from "react-icons/bs";

import { FaTwitter, FaHashtag } from "react-icons/fa";

import HamburgerIntroHeader from "../../headers/HamburgerIntroHeader/HamburgerIntroHeader";
import Footer from "../../headers/Footer/Footer";

// import '../../general/GridsWithScrollableColumns/GridWithScrollableLeftColumn.css';
// import '../../general/GridsWithScrollableColumns/ScrollableColumn.css';
// import '../../App.css';
import "./Equipe.css";

import people from "./people.json";

export default class Equipe extends React.Component {
  render() {
    return (
      <>
        <HamburgerIntroHeader />
        <div className="ac-grid-24 has-sidebar" style={{marginBottom: '1rem'}}>
          <div className="content">
            <h1>Équipe</h1>
            <h2>
              Équipe letteraria, Unité d’italien
              <br />
              Département de langues et littératures romanes,
              <br />
              Université de Genève
            </h2>
            <p>
              L'équipe letteraria del progetto lavora all'interno dell'Unité
              d’italien del Département des langues et des littératures romanes
              dell'Université de Genève.
              <br />
              Il gruppo riunisce specialiste di critica letteraria e in
              particolare dell'opera di Italo Calvino, che hanno affrontato
              l'analisi dell'intero corpus narrativo calviniano, articolando i
              risultati della loro ricerca in modalità compatibili con gli
              strumenti di visualizzazione sviluppati dal DensityDesign Research
              Lab.
            </p>
            <ul>
              {people.unige.map((d, i) => {
                return (
                  <li key={"gin-" + i}>
                    <a href={d.url} target="_blank" rel="noopener noreferrer">
                      {d.name}
                    </a>{" "}
                    – {d.role}
                  </li>
                );
              })}
            </ul>
            <br />
            <h2>
              DensityDesign Research Lab
              <br />
              Dipartimento di Design
              <br />
              Politecnico di Milano
            </h2>
            <p>
              Il laboratorio di ricerca{" "}
              <a href="http://densitydesign.org/" rel="noopener noreferrer">
                DensityDesign
              </a>{" "}
              è parte del Dipartimento di Design del Politecnico di Milano.
              Obiettivo del laboratorio è la rappresentazione di fenomeni
              complessi di natura sociale, organizzativa o urbana. A questi temi
              va aggiunto il crescente interesse per le Digital Humanities ed in
              particolare per tutto ciò che sta all’intersezione fra le materie
              umanistiche e l’information design, come la progettazione di
              artefatti e metodi digitali per l’elaborazione, l’accesso e la
              visualizzazione dell’informazione.
            </p>
            <ul>
              {people.density.map((d, i) => {
                return (
                  <li key={"dd-" + i}>
                    <a href={d.url} target="_blank" rel="noopener noreferrer">
                      {d.name}
                    </a>{" "}
                    – {d.role}
                  </li>
                );
              })}
            </ul>
            <br />
            <p>
              Allo sviluppo delle visualizzazioni hanno collaborato Mauro
              Bianchi e Giovanni Fumagalli di{" "}
              <a href="https://inmagik.com/" rel="noopener noreferrer">
                Inmagik
              </a>
              .
            </p>
          </div>
          <div className="sidebar sticky-element">
            <h1>Contatti</h1>
            <p>
              <BsEnvelope /> atlantecalvino@unige.ch
            </p>
            <p>
              <FaTwitter />{" "}
              <a
                href="https://twitter.com/AtlanteCalvino"
                target="_blank"
                rel="noopener noreferrer"
              >
                @AtlanteCalvino
              </a>
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
