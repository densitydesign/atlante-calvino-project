import React from "react";
import { withTranslation, Trans } from "react-i18next";
import { BsEnvelope } from "react-icons/bs";
import { FaTwitter, FaHashtag } from "react-icons/fa";
import Footer from "../../headers/Footer/Footer";
import IndexMenuHeader from "../../headers/IndexMenuHeader";

import "./Equipe.css";

import people from "./people.json";

class Equipe extends React.Component {
  render() {
    return (
      <>
        <IndexMenuHeader menuAction={"openIndex"} />
        <div className="ac-grid-24 has-sidebar">
          <Trans i18nKey={"testo_equipe"} t={this.props.t} ns="equipe">
            <div className="content">
              <h1>Équipe</h1>
              <h2>Unité d’italien</h2>
              <h3 style={{ color: "black" }}>
                Département de langues et des littératures romanes
                <br />
                Université de Genève
              </h3>
              <p>
                L'équipe letteraria del progetto lavora all'interno dell'Unité
                d’italien del Département des langues et des littératures
                romanes dell'Université de Genève.
                <br />
                Il gruppo riunisce specialiste di critica letteraria e in
                particolare dell'opera di Italo Calvino, che hanno affrontato
                l'analisi dell'intero corpus narrativo calviniano, articolando i
                risultati della loro ricerca in modalità compatibili con gli
                strumenti di visualizzazione sviluppati dal DensityDesign
                Research Lab.
              </p>
              <ul>
                {people.unige.map((d, i) => {
                  return (
                    <li key={"gin-" + i}>
                      <a href={d.url} target="_blank" rel="noopener noreferrer">
                        {d.name + " "}
                      </a>
                      {d.showRole && " - " + d.role}
                    </li>
                  );
                })}
              </ul>
              <br />
              <h2>DensityDesign Research Lab</h2>
              <h3 style={{ color: "black" }}>
                Dipartimento di Design
                <br />
                Politecnico di Milano
              </h3>
              <p>
                Il laboratorio di ricerca{" "}
                <a href="http://densitydesign.org/" rel="noopener noreferrer">
                  DensityDesign
                </a>{" "}
                fa afferenza al{" "}
                <a
                  href="http://www.dipartimentodesign.polimi.it/"
                  rel="noopener noreferrer"
                >
                  Dipartimento di Design
                </a>{" "}
                del Politecnico di Milano. Studia le implicazioni legate
                all’utilizzo di dati, tecnologie digitali e metodi visuali negli
                ambiti sociali, progettuali e di ricerca. L’equipe di design ha
                contribuito alla co-progettazione di metodologie di
                visualizzazione in sinergia con l’equipe letteraria, impiegando
                conoscenze maturate in ambito Digital Humanities e competenze
                legate alla rappresentazione, analisi e comunicazione dei dati.
              </p>
              <ul>
                {people.density.map((d, i) => {
                  return (
                    <li key={"dd-" + i}>
                      <a href={d.url} target="_blank" rel="noopener noreferrer">
                        {d.name}
                      </a>
                      {d.showRole && " - " + d.role}
                    </li>
                  );
                })}
              </ul>
              <br />
              <p>
                Il progetto è iniziato con{" "}
                <a
                  href="https://densitydesign.org/person/paolo-ciuccarelli/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Paolo Ciuccarelli
                </a>{" "}
                alla direzione delle attività di design.
              </p>
              <p>
              Alla ricerca, progettazione e realizzazione dell’Atlante hanno partecipato anche: Matteo
                Banal,{" "}
                <a
                  href="https://densitydesign.org/person/gabriele-colombo/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Gabriele Colombo
                </a>
                , Serena Del Nero, Giovanni Lombardi.
              </p>
              <p>
                Allo sviluppo delle visualizzazioni hanno collaborato Mauro
                Bianchi, Giovanni Fumagalli e Matteo Scaffidi di{" "}
                <a
                  href="https://inmagik.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Inmagik
                </a>
                .
              </p>
              <p>
                Ringraziamo Lorenzo Faggi per la registrazione, presso lo spazio
                occupato Piano Terra, dell’audio del video introduttivo.
              </p>
              <p>
                La voce narrante italiana è di Beatrice Gobbo e quella inglese
                di Marwa Boukarim.
              </p>
              <p>
                La traduzione inglese dei testi dell’Atlante è di Ilaria
                Bruzzone.
              </p>
            </div>
          </Trans>
          <div className="sidebar sticky-element">
            <div className="content">
              <h1>{this.props.t("contatti")}</h1>
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
        </div>
        <Footer />
      </>
    );
  }
}

export default withTranslation("equipe")(Equipe);
