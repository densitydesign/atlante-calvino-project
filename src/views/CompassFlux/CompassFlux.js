import React from "react";
import Lische from "./Lische"
import { Trans, withTranslation } from "react-i18next";

// import {ReactComponent as LischeSVG} from './lische-web-005-01.svg';

import HamburgerCompassHeader from "../../headers/HamburgerCompassHeader/HamburgerCompassHeader";
// import CompassLische from "../../visualizations/CompassLische/CompassLische";

import legend_it from "./lische-legend.svg";

import "./CompassFlux.css";

class CompassFlux extends React.Component {
  render() {
    const rhythm = 70;

    return (
      <>
        <HamburgerCompassHeader
          toggleFlowOfStories={this.props.toggleFlowOfStories}
          isSubPageBussola
        />
        <div id="main--bones">
          <div className="container">
            <h4>{this.props.t("bussola")}</h4>
            <div className="row intro">
              <div className="col-12">
                <Trans i18nKey={"title"} t={this.props.t} ns="compass-flux">
                  <h1>I flussi dei racconti</h1>
                </Trans>
              </div>
              <div className="col-7 col-xl-7">
                <Trans
                  i18nKey={"blocco_testo_1"}
                  t={this.props.t}
                  ns="compass-flux"
                >
                  <p>
                    La visualizzazione ricostruisce le vicende editoriali dei
                    racconti pubblicati da Italo Calvino, che hanno spesso visto
                    la luce su riviste e quotidiani prima di confluire nelle
                    raccolte. La scrittura dei racconti ha occupato Calvino per
                    tutto l&#x2019;arco della sua carriera e costituisce la
                    spina dorsale della sua opera. La maggior parte dei testi
                    &#xE8; uscita in prima battuta su quotidiani e riviste
                    (mostrati sulla sinistra), che nel corso del Novecento hanno
                    largamente contribuito alla fortuna della narrativa breve.
                  </p>
                  <p>
                    Per Calvino, i singoli racconti trovano un ulteriore senso
                    una volta collocati all&#x2019;interno delle raccolte
                    (mostrate invece sulla destra), grazie al loro combinarsi
                    con altri testi. Combinarsi ma anche ricombinarsi,
                    perch&#xE9; spesso le raccolte sono soggette a
                    ricomposizione e il flusso di un singolo racconto pu&#xF2;
                    attraversare diverse tappe editoriali.
                  </p>
                  <p>
                    Le tre grandi famiglie genealogiche dei racconti gravitano
                    intorno all’antologia dei{" "}
                    <span className="font-italic">Racconti</span>, alla serie
                    delle <span className="font-italic">Cosmicomiche</span> e
                    infine a <span className="font-italic">Palomar</span>.
                  </p>
                </Trans>
              </div>
              <div className="col-5 col-xl-5">
                <h4 style={{ marginBottom: "2rem" }}>
                  {this.props.t(
                    "compass-flux:Come si legge la visualizzazione"
                  )}
                </h4>
                <div className="legend">
                  <img
                    src={legend_it}
                    style={{ width: "100%" }}
                    alt="information complement"
                  />
                </div>
              </div>
              <div className="compass-credits" style={{ marginTop: "2em" }}>
                <div className="col-12">
                  <Trans
                    i18nKey={"referenze"}
                    t={this.props.t}
                    ns="compass-flux"
                  >
                    <p>
                      &#x201C;I racconti di Italo Calvino: dai periodici alle
                      raccolte&#x201D; &#xA9; UNIGE/DensityDesign
                    </p>
                    <p>
                      <strong>Coordinatrice e coordinatore scientifici</strong>:
                      Francesca Serra, Paolo Ciuccarelli.
                      <br />
                      <strong>Autor*</strong>: Serena Del Nero, Virginia
                      Giustetto, Valeria Cavalloro, Margherita Parigini, Tommaso
                      Elli.
                    </p>
                  </Trans>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="col-12 lische my-lg-3 py-1 py-md-4">
              {/* <CompassLische id="lische" /> */}
              <Lische />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withTranslation(["translation", "compass-flux"])(CompassFlux);
