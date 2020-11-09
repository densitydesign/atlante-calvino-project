import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import SheetStyles from "../SheetStyles.module.css";
import HamburgerCompassHeader from "../../headers/HamburgerCompassHeader/HamburgerCompassHeader";
import FooterSchede2 from '../FooterSchede2';

import "./TransformInformationSheet.css";

import inquadramento from "./inquadramento.svg";
import table from "./table.svg";

import legenda_0 from "./legenda_0.svg";
import legenda_01 from "./legenda_01.svg";
import legenda_02 from "./legenda_02.svg";
import legenda_03 from "./legenda_03.svg";
import legenda_04 from "./legenda_04.svg";

import zoom_1 from "./zoom_01.svg";
import zoom_2 from "./zoom_02.svg";
import zoom_3 from "./zoom_03.svg";
import zoom_4 from "./zoom_04.svg";

import slide_01 from "./slide-01.svg";
import slide_02 from "./slide-02.svg";
import slide_03 from "./slide-03.svg";
import slide_04 from "./slide-04.svg";

class TransformInformationSheet extends Component {
  render() {
    return (
      <>
        <HamburgerCompassHeader />
        <main className={SheetStyles.main}>
          <div className={SheetStyles.gridRow}>
            <div style={{ gridColumn: "1 / span 12" }}>
              <h4 className="ac-breadcrumb">Tappa 2 > trasformare</h4>
              <h1>Cartografia dei luoghi terrestri</h1>
              <img className={SheetStyles.image} src={inquadramento} />
            </div>
            <div style={{ gridColumn: "1 / span 7" }}>
              <img className={SheetStyles.legend} src={legenda_0} />
            </div>

            <h2 className={SheetStyles.titleH2}>L'analisi</h2>
            <h3 className={SheetStyles.subtitleSheet}>Geoletteratura</h3>
            <p className={SheetStyles.paragraph}>
              La categoria dei luoghi terrestri localizzabili, rielaborata a
              partire dalla definizione inglese di <em>imported places</em>
              (Piatti <em>et al.</em> 2009), è l’unica che per caratteristiche
              intrinseche si presta a una rappresentazione cartografica. Si
              tratta infatti di ambientazioni localizzabili su una mappa, poiché
              «the setting corresponds with the geographical reality by
              realistically portraying the surrounding» (Reuschel-Hurni 2011,
              296). Analizzando il tempo della storia (cfr. Genette 1972) dei
              testi del corpus calviniano che presentano ambientazioni di questo
              tipo è necessario operare un’ulteriore distinzione in tre
              tipologie:
              <ol>
                <li>
                  Ambientazioni di testi in cui il tempo della storia è
                  collocato nella contemporaneità, vale a dire nel Novecento.
                </li>
                <li>
                  Ambientazioni di testi in cui il tempo della storia è
                  collocato nel passato o in un tempo indefinito (ad es.
                  <em>Il visconte dimezzato</em> è ambientato al tempo di Carlo
                  Magno, <em>Le città invisibili</em> nel 1200).
                </li>
                <li>
                  Ambientazioni di testi in cui presente e passato si fondono in
                  un tempo della storia misto (ad es. nel racconto
                  <em>I cristalli</em> l’ambientazione pre-cosmica e primordiale
                  presenta riferimenti geografici della New York contemporanea).
                </li>
              </ol>
              Questo approfondimento si propone di mostrare tutte e tre le
              tipologie di ambientazione, con una particolare predilezione per
              quelle che intrattengono un rapporto evidente con il Novecento.
              L’obiettivo primario, infatti, è dimostrare come queste ultime
              coincidano abbastanza meticolosamente con la geografia biografica
              di Calvino. Per evidenziare al meglio questo aspetto, si è scelto
              di far seguire a una prima visione di insieme di tutti i luoghi
              terrestri localizzabili del corpus quattro differenti mappe che
              mostrano una selezione degli stessi luoghi sulla base del decennio
              di pubblicazione delle opere (1945-1955; 1956-1965; 1966-1975;
              1976-1984). È allora piuttosto significativo rilevare come, nel
              passaggio dagli anni Quaranta agli anni Ottanta del Novecento,
              l’orizzonte geografico dello scrittore si ampli progressivamente,
              arrivando infine a comprendere tutto il mondo.
            </p>
            <div className={SheetStyles.sideContent}>
              <img
                className={SheetStyles.image}
                style={{ position: "sticky", top: "var(--navigation-height)" }}
                src={table}
              />
            </div>
          </div>

          <div className={SheetStyles.gridRow}>
            <div className="CarouselSlide" data-interval="false">
              <h2 className={SheetStyles.titleH2}>Approfondimento</h2>
              <Carousel>
                <Carousel.Item>
                  <Carousel.Caption>
                    <h2
                      className={SheetStyles.titleH2}
                      style={{ fontStyle: "italic", color: "#5151fc" }}
                    >
                      1945 - 1955
                    </h2>
                    <br />
                    <div className={SheetStyles.gridRow}>
                      <img
                        className={SheetStyles.legend}
                        style={{
                          gridColumn: "1 / span 7",
                          marginBottom: "0px",
                          paddingBottom: "0px",
                        }}
                        src={legenda_01}
                      />
                      <img
                        className={
                          SheetStyles.sideContent + " " + SheetStyles.image
                        }
                        style={{ gridColumn: "10 / span 3", marginTop: "20px" }}
                        src={zoom_1}
                      />
                      <p
                        className="captionLeft"
                        style={{
                          gridColumn: "9 / span 5",
                          marginTop: "0px",
                          paddingTop: "0px",
                        }}
                      >
                        Orizzonte dal 1945 al 1955
                      </p>
                    </div>
                  </Carousel.Caption>
                  <img
                    className="d-block w-100"
                    src={slide_01}
                    alt="First slide"
                  />
                </Carousel.Item>

                <Carousel.Item>
                  <Carousel.Caption>
                    <h2
                      className={SheetStyles.titleH2}
                      style={{ fontStyle: "italic", color: "#5151fc" }}
                    >
                      1956 - 1965
                    </h2>
                    <br />
                    <div className={SheetStyles.gridRow}>
                      <img
                        className={SheetStyles.legend}
                        style={{
                          gridColumn: "1 / span 7",
                          marginBottom: "0px",
                          paddingBottom: "0px",
                        }}
                        src={legenda_02}
                      />
                      <img
                        className={
                          SheetStyles.sideContent + " " + SheetStyles.image
                        }
                        style={{ gridColumn: "10 / span 3", marginTop: "20px" }}
                        src={zoom_2}
                      />
                      <p
                        className="captionLeft"
                        style={{
                          gridColumn: "9 / span 5",
                          marginTop: "0px",
                          paddingTop: "0px",
                        }}
                      >
                        Orizzonte dal 1956 al 1965
                      </p>
                    </div>
                  </Carousel.Caption>
                  <img
                    className="d-block w-100"
                    src={slide_02}
                    alt="First slide"
                  />
                </Carousel.Item>

                <Carousel.Item>
                  <Carousel.Caption>
                    <h2
                      className={SheetStyles.titleH2}
                      style={{
                        fontStyle: "italic",
                        color: "#5151fc",
                        color: "#5151fc",
                      }}
                    >
                      1966 - 1975
                    </h2>
                    <br />
                    <div className={SheetStyles.gridRow}>
                      <img
                        className={SheetStyles.legend}
                        style={{
                          gridColumn: "1 / span 7",
                          marginBottom: "0px",
                          paddingBottom: "0px",
                        }}
                        src={legenda_03}
                      />
                      <img
                        className={
                          SheetStyles.sideContent + " " + SheetStyles.image
                        }
                        style={{ gridColumn: "10 / span 3", marginTop: "20px" }}
                        src={zoom_3}
                      />
                      <p
                        className="captionLeft"
                        style={{
                          gridColumn: "9 / span 5",
                          marginTop: "0px",
                          paddingTop: "0px",
                        }}
                      >
                        Orizzonte dal 1966 al 1975
                      </p>
                    </div>
                  </Carousel.Caption>
                  <img
                    className="d-block w-100"
                    src={slide_03}
                    alt="First slide"
                  />
                </Carousel.Item>

                <Carousel.Item>
                  <Carousel.Caption>
                    <h2
                      className={SheetStyles.titleH2}
                      style={{ fontStyle: "italic", color: "#5151fc" }}
                    >
                      1976 - 1985
                    </h2>
                    <br />
                    <div className={SheetStyles.gridRow}>
                      <img
                        className={SheetStyles.legend}
                        style={{
                          gridColumn: "1 / span 7",
                          marginBottom: "0px",
                          paddingBottom: "0px",
                        }}
                        src={legenda_04}
                      />
                      <img
                        className={
                          SheetStyles.sideContent + " " + SheetStyles.image
                        }
                        style={{ gridColumn: "10 / span 3", marginTop: "20px" }}
                        src={zoom_4}
                      />
                      <p
                        className="captionLeft"
                        style={{
                          gridColumn: "9 / span 5",
                          marginTop: "0px",
                          paddingTop: "0px",
                        }}
                      >
                        Orizzonte dal 1976 al 1985
                      </p>
                    </div>
                  </Carousel.Caption>
                  <img
                    className="d-block w-100"
                    src={slide_04}
                    alt="First slide"
                  />
                </Carousel.Item>
              </Carousel>
            </div>
          </div>

          <div className={SheetStyles.gridRow}>
            <h2 className={SheetStyles.titleH2}>Bibliografia</h2>
            <ol className={[SheetStyles.paragraph, "references"].join(" ")}>
              <li className="referenceItem">
                Piatti <em>et al.</em> 2009: B. Piatti, H. R. Bär, A. Reuschel,
                L. Hurni. W. Cartwright,
                <em>Mapping Literature: Towards A Geography of Fiction</em> in
                W. Cartwright, G. Gartner, A. Lehn,
                <em>Cartography and Art</em>, Berlin, Springer, pp. 177-192.
              </li>
              <li className="referenceItem">
                Reuschel-Hurni 2011: A. Reuschel, L. Hurni,
                <em>
                  Mapping Literature: Visualisation of Spatial Uncertainty in
                  Fiction
                </em>
                , in «The Cartographic Journal», vol. 48, n. 4, pp. 293-308.
              </li>
              <li className="referenceItem">
                Genette 1972: G. Genette, <em>Figures III</em>, Paris, Seuil.
              </li>
            </ol>
          </div>


          <FooterSchede2
            linkTappaA={"/space/phase1"}
            linkTappaB={"/space/phase3"}
            linkAnalisi={"/space/phase2"}
          />
        </main>
      </>
    );
  }
}

export default TransformInformationSheet;
