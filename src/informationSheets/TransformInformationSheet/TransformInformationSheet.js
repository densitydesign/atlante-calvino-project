import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'

import HamburgerCompassHeader from '../../headers/HamburgerCompassHeader/HamburgerCompassHeader';
import ArrowButton from '../../general/ArrowButton/ArrowButton';


import './TransformInformationSheet.css';

class TransformInformationSheet extends Component {
  render()
  {
    return (
      <>
        <HamburgerCompassHeader />
        <div>
        <main>
        <div className="viz--meta">
        <h1>Trasformare</h1>
          <h2>Ci vuole un sottotitolo</h2>
          </div>
        <div className="viz--meta--full">
                <img className="d-block w-100 mainImage" src={process.env.PUBLIC_URL + "/informationSheets/inquadramento.png"} alt="information complement" />

                  </div>

                  <article className="focus">
                            <div>
                            <p>
                            Questa scheda nasce come approfondimento o spin-off del lavoro di rappresentazione di tutti i luoghi del corpus (la matrice). L’idea di partenza è quella di concentrarsi soltanto sulla categoria delle ambientazioni specifiche terrestri, mostrando come queste coincidano abbastanza meticolosamente con la biografia geografica di Calvino. In ragione di ciò la scheda si propone anche di evidenziare come, nel passaggio dagli anni Quaranta del ‘900 agli anni Ottanta, l’orizzonte geografico dello scrittore si amplia progressivamente, arrivando alla fine a comprendere tutto il mondo.</p>

                  <div className="carouselVizFocus">
                  <p className="notes">
                  Questa scheda nasce come approfondimento o spin-off del lavoro di rappresentazione di tutti i luoghi del corpus (la matrice). L’idea di partenza è quella di concentrarsi soltanto sulla categoria delle ambientazioni specifiche terrestri, mostrando come queste coincidano abbastanza meticolosamente con la biografia geografica di Calvino. In ragione di ciò la scheda si propone anche di evidenziare come, nel passaggio dagli anni Quaranta del ‘900 agli anni Ottanta, l’orizzonte geografico dello scrittore si amplia progressivamente, arrivando alla fine a comprendere tutto il mondo.
        </p>
        <img
          className="carouselLeg"
          src={process.env.PUBLIC_URL + "/informationSheets/viz_ball.png"}
          alt="Second slide"
        />
                  </div>

                  </div>


                                            </article>
  <div className="CarouselSlide">
                            <Carousel>

  <Carousel.Item>
  <Carousel.Caption>
  <h1><strong>1945 - 1955</strong></h1>
  <div className="carouselVizFocus">
      <img
        className="carouselLeg"
        src={process.env.PUBLIC_URL + "/informationSheets/leg_1.png"}
        alt="Second slide"
      />

        <img
          className="carouselSmall"
          src={process.env.PUBLIC_URL + "/informationSheets/map_1.png"}
          alt="Second slide"
        />

      </div>

  </Carousel.Caption>
    <img
      className="d-block w-100"
      src={process.env.PUBLIC_URL + "/informationSheets/s3_1945-1955.png"}
      alt="First slide"
    />
  </Carousel.Item>
  <Carousel.Item>
      <Carousel.Caption>
        <h1><strong>1956 - 1965</strong></h1>
      <div className="carouselVizFocus">
      <img
        className="carouselLeg"
        src={process.env.PUBLIC_URL + "/informationSheets/leg_2.png"}
        alt="Second slide"
      />
        <img
          className="carouselSmall"
          src={process.env.PUBLIC_URL + "/informationSheets/map_2.png"}
          alt="Second slide"
        />
          </div>

      </Carousel.Caption>
    <img
      className="d-block w-100"
      src={process.env.PUBLIC_URL + "/informationSheets/s3_1956-1965.png"}
      alt="Second slide"
    />
  </Carousel.Item>

  <Carousel.Item>

      <Carousel.Caption>
                <h1><strong>1966 - 1975</strong></h1>
      <div className="carouselVizFocus">
      <img
        className="carouselLeg"
        src={process.env.PUBLIC_URL + "/informationSheets/leg_3.png"}
        alt="Second slide"
      />
          <img
            className="carouselSmall"
            src={process.env.PUBLIC_URL + "/informationSheets/map_3.png"}
            alt="Second slide"
          />
            </div>
      </Carousel.Caption>

    <img
      className="d-block w-100"
      src={process.env.PUBLIC_URL + "/informationSheets/s3_1966-1975.png"}
      alt="Third slide"
    />

  </Carousel.Item>

  <Carousel.Item>
  <Carousel.Caption>
  <h1><strong>1976 - 1985</strong></h1>
  <div className="carouselVizFocus">

    <img
      className="carouselLeg"
      src={process.env.PUBLIC_URL + "/informationSheets/leg_4.png"}
      alt="Second slide"
    />
    <img
      className="carouselSmall"
      src={process.env.PUBLIC_URL + "/informationSheets/map_4.png"}
      alt="Second slide"
    />
      </div>

  </Carousel.Caption>
    <img
      className="d-block w-100"
      src={process.env.PUBLIC_URL + "/informationSheets/s3_1976-1985.png"}
      alt="Third slide"
    />
  </Carousel.Item>
</Carousel>
</div>

                  <div className="sheet--info">
                    <ArrowButton arrowDirection="none" textAlign="left" text="ANALISI" route="/Phenomena/territory/spaceAnalysis" />
                    <ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 2" route="/Process/intro" />
                    <ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 3" route="/Problem/intro" />
                  </div>

        </main>
        </div>
      </>
    );
  }
}

export default TransformInformationSheet;
