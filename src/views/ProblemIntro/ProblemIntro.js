import React from 'react'

import CategoryEntryBlock from '../CategoryEntryBlock/CategoryEntryBlock';
import HamburgerCompassHeader from '../../headers/HamburgerCompassHeader/HamburgerCompassHeader';
import ArrowButton from '../../general/ArrowButton/ArrowButton';

import '../../App.css';
import './ProblemIntro.css';

export default class ProblemIntro extends React.Component
{
  render()
  {
    return (
      <>
        <HamburgerCompassHeader />
        <div className="problem">
        <div className="category-intro-grid">
          <div className="category-intro-block-row">
            <div className="category-intro-main-block">
              <strong className="current-phase-subheader">TAPPA 3</strong>
              <h1>IL PROBLEMA</h1>
              <p className="intro">Nella terza tappa cercheremo di inseguire l’ombra dei problemi dietro ai fenomeni e ai processi. Il timore della cancellazione, che nasconde a sua volta quello della cecità e della illeggibilità del testo. Il grande totem del realismo. E infine la tormentosa questione di come si costruisce una trama.
              </p>
            </div>
            <div className="other-phases-subheader" >
              <ArrowButton arrowDirection="left" textAlign="right" text="TAPPA 1" route="/phase1-phenomena" />
              <ArrowButton arrowDirection="left" textAlign="left" text="TAPPA 2" route="/phase2-process" />
            </div>
          </div>
          <div className="category-subentries-grid">

            <CategoryEntryBlock
              smallTitle="Itinerario ⟶ DUBBIO"
              linkText="Cancellazione"
              route="/doubt/phase3"
              description="Scrivere è un modo per opporsi al vuoto della pagina. Ma anche per accogliere quel vuoto dentro la scrittura, che in Calvino combatte sempre ad armi impari contro la tendenza alla cancellazione del testo e alla scomparsa del suo significato. "
            />

            <CategoryEntryBlock
              smallTitle="Itinerario ⟶ SPAZIO"
              linkText="Realismo"
              route="/space/phase3"
              description="Dopo aver attraversato gli spazi dell’opera di Calvino, il problema della rappresentazione della realtà resta intatto: dopo le infinite metamorfosi alle quali abbiamo assistito, come riconoscere il vero dal falso? "
            />

            <CategoryEntryBlock
              smallTitle="Itinerario ⟶ FORMA" 
              linkText="Trama"
              route="/form/phase3"
              description="Senza trame non ci sono narrazioni. Ma le narrazioni possono avere rapporti molto complicati con le trame. Come l’opera di Calvino dimostra in modo esemplare."
            />

            </div>
        </div>
        </div>
      </>
    );
  }
}
