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
                        {d.name}
                      </a>{" "}
                      – {d.role}
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
                è parte del Dipartimento di Design del Politecnico di Milano.
                Obiettivo del laboratorio è la rappresentazione di fenomeni
                complessi di natura sociale, organizzativa e urbana. A questi
                temi va aggiunto il crescente interesse per le Digital
                Humanities ed in particolare per la progettazione di artefatti e
                metodi digitali che riguardano l’elaborazione, l’accesso e la
                visualizzazione dell’informazione per chi lavora a contatto con
                materie umanistiche.
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
                Alla ricerca e alla progettazione dell’Atlante hanno partecipato
                anche: Matteo Banal,{" "}
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
                Il progetto è iniziato con{" "}
                <a
                  href="https://densitydesign.org/person/paolo-ciuccarelli/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Paolo Ciuccarelli
                </a>{" "}
                alla guida dell’équipe DDL.
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
                Ringraziamo Lorenzo Faggi per la registrazione avvenuta presso
                lo spazio occupato Piano Terra dell’audio del video
                introduttivo. La voce narrante italiana è di Beatrice Gobbo,
                quella inglese di Marwa Boukarim.
              </p>
              <p>
                La traduzione inglese dei testi dell’Atlante è di Ilaria
                Bruzzone.
              </p>
            </div>
          </Trans>
          <div className="sidebar sticky-element">
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
        <Footer />
      </>
    );
  }
}

export default withTranslation("equipe")(Equipe);
