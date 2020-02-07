import React from 'react';

import CategoryEntryBlock from '../CategoryEntryBlock/CategoryEntryBlock';
import HamburgerCompassHeader from '../../headers/HamburgerCompassHeader/HamburgerCompassHeader';
import ArrowButton from '../../general/ArrowButton/ArrowButton';

import '../../App.css';
import './ProcessIntro.css';

export default class ProcessIntro extends React.Component
{
  render()
  {
    return (
      <>
        <HamburgerCompassHeader />
        <div className="process">
          <div className="category-intro-grid">
            <div className="category-intro-block-row">
              <div className="category-intro-main-block">
                <strong className="current-phase-subheader">TAPPA 2</strong>
                <h1>IL PROCESSO</h1>
                <p className="intro">Con la seconda tappa, che riguarda i processi piuttosto che i fenomeni, ci spostiamo da oggetti di studio puntuali verso alcune azioni che cerchiamo di cogliere con tre verbi all’infinito. Dietro il fenomeno della nebbia andremo alla ricerca di come funziona il processo del dubitare, dietro lo spazio quello del trasformare e dietro gli elenchi quello del combinare.</p>
              </div>
              <div className="other-phases-subheader" >
                <ArrowButton arrowDirection="left" textAlign="right" text="TAPPA 1" route="/Phenomena/intro" />
                <ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 3" route="/Problem/intro" />
              </div>
            </div>
            <div className="category-subentries-grid">

              <CategoryEntryBlock
                smallTitle="Itinerario ⟶ DUBBIO"
                linkText="Dubitare"
                route="/Process/doubting"
                description="Dubitare vuol dire creare un testo che si rifiuta di rimanere sempre se stesso. Significa invitare il lettore e la lettrice a entrare dentro una scrittura simile a un campo di mine, che può esplodere in ogni momento."
              />

              <CategoryEntryBlock
                smallTitle="Itinerario ⟶ SPAZIO"
                linkText="Trasformare"
                route="/Process/transforming"
                description="Trasformare vuol dire affidarsi a uno dei processi fondamentali della scrittura di Calvino: quello della metamorfosi. Dietro tutti i luoghi visitati da Marco Polo, non si nasconde infatti sempre Venezia?"
              />

              <CategoryEntryBlock
                smallTitle="Itinerario ⟶ FORMA" 
                linkText="Combinare"
                route="/Process/combining"
                description="Combinare vuole dire mettere in dubbio la linearità della narrazione. A tal punto da tendere il più delle volte a riscrivere una stessa trama elementare, basata sulla serie e sulla concatenazione. "
              />

            </div>
          </div>
        </div>
      </>
    );
  }
}
