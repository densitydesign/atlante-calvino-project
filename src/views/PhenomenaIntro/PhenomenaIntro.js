import React from 'react'

import HamburgerCompassHeader from '../../headers/HamburgerCompassHeader/HamburgerCompassHeader';
import LinkParagraph from './LinkParagraph';
import ArrowButton from '../../general/ArrowButton/ArrowButton';
import { Link } from 'react-router-dom';

import './PhenomenaIntro.css';
import '../../App.css';


export default class PhenomenaIntro extends React.Component
{
  render()
  {
    return (
      <>
        <HamburgerCompassHeader />
        <div className="phenomena-intro-grid">
          <div className="currentPhase">
            <div className="subheaders-container">
              <small className="current-phase-subheader"><strong>TAPPA 1</strong></small>
              <div className="other-phases-subheader">
                <ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 2" route="/Process/intro" />
                <ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 3" route="/Problem/intro" />
              </div>
            </div>
            <div className="col-md-12 col-lg-8">
              <h1>IL FENOMENO</h1>
              <p className="intro">Per la prima tappa, quella dei fenomeni, abbiamo deciso di disegnare un territorio comune che i tre itinerari ci faranno esplorare.
              <br /> Il territorio è formato ancora una volta dal corpus di tutte le opere di Calvino, che ci sforziamo di riunire in una forma visiva che possa aiutarci a meglio comprenderle.   </p>
                <Link to="/Phenomena/territory"><button type="button" className="button-text">Territorio</button></Link>
            </div>
          </div>
          <div className="itineraries-subgrid">
            <LinkParagraph route="/territory" smallTitle="Itinerario > DUBBIO" linkText="Nebbia" description="All’inizio c’è la nebbia. Una fitta nebbia, dove il territorio si cancella e il suo significato ci sfugge. La nebbia è uno dei grandi fenomeni della scrittura calviniana, per questo abbiamo scelto di cominciare da qui." />
            <LinkParagraph route="/" smallTitle="Itinerario > SPAZIO" linkText="Luoghi" description="I luoghi sono l’appiglio, incerto ma fondamentale, per connettere il visibile all’invisibile. Il corporeo all’incorporeo. Niente meglio di un tentativo di vederli tutti insieme, ci farà entrare nel cuore di cosa significhi rappresentare il reale." />
            <LinkParagraph route="/" smallTitle="Itinerario > FORMA" linkText="Elenchi" description="Calvino è sempre stato un maniaco degli elenchi. L’elenco può funzionare come marca di realismo o all’opposto come fuga nell’astrazione. Fa vedere alcune cose, ma se aumenta il suo voltaggio, scivolando nel delirio elencatorio, non fa vedere più nulla." />
          </div>
        </div>
      </>

    );
  }
}
