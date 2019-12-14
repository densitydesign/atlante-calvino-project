import React from 'react'

import CategoryEntryBlock from '../CategoryEntryBlock/CategoryEntryBlock';
import HamburgerCompassHeader from '../../headers/HamburgerCompassHeader/HamburgerCompassHeader';
import ArrowButton from '../../general/ArrowButton/ArrowButton';

import '../../App.css';

export default class ProblemIntro extends React.Component
{
  render()
  {
    return (
      <>
        <HamburgerCompassHeader />
        <div className="category-intro-grid">
          <div className="category-intro-block-row">
            <div className="category-intro-main-block">
              <small className="current-phase-subheader"><strong>FASE 3</strong></small>
              <h1>IL PROBLEMA</h1>
              <p>Il problema del realismo accompagna tutti i narratori moderni, Calvino incluso, che si è formato in un'epoca di neo-realismo e poi
                se ne è allontanato anni-luce. Ma senza mai riuscire a superare il tormento che lega la descrizione del mondo alla costruzione di una trama.
                Trama che per Calvino tende spesso a prendere una forma modulare piuttosto che progressiva: legata all'incremento potenzialmente infinito della
                serie, ma anche sottoposta al minaccioso spettro della cancellazione.
              </p>
            </div>
            <div className="other-phases-subheader" >
              <ArrowButton arrowDirection="left" textAlign="right" text="FASE 1" route="/Phenomena/intro" />
              <ArrowButton arrowDirection="left" textAlign="left" text="FASE 2" route="/Process/intro" />
            </div>
          </div>
          <div className="category-subentries-grid">
            <CategoryEntryBlock smallTitle="dubbio" title="Cancellazione" description="Eine wunderbare Heiterkeit hat meine ganze Seele eingenommen, gleich den süßen Frühlingsmorgen, die ich mit ganzem Herzen genieße. Ich bin allein und freue mich meines Lebens in dieser Gegend, die für solche Seelen geschaffen ist wie die meine. Ich bin so glücklich, mein Bester, so ganz in dem Gefühle von ruhigem Dasein versunken, daß meine Kunst darunter leidet. Ich könnte jetzt nicht zeichnen, nicht einen Strich."/>
            <CategoryEntryBlock smallTitle="spazio" title="Realismo" description="Eine wunderbare Heiterkeit hat meine ganze Seele eingenommen, gleich den süßen Frühlingsmorgen, die ich mit ganzem Herzen genieße. Ich bin allein und freue mich meines Lebens in dieser Gegend, die für solche Seelen geschaffen ist wie die meine. Ich bin so glücklich, mein Bester, so ganz in dem Gefühle von ruhigem Dasein versunken, daß meine Kunst darunter leidet. Ich könnte jetzt nicht zeichnen, nicht einen Strich."/>
            <CategoryEntryBlock smallTitle="forma" title="Trama" description="Eine wunderbare Heiterkeit hat meine ganze Seele eingenommen, gleich den süßen Frühlingsmorgen, die ich mit ganzem Herzen genieße. Ich bin allein und freue mich meines Lebens in dieser Gegend, die für solche Seelen geschaffen ist wie die meine. Ich bin so glücklich, mein Bester, so ganz in dem Gefühle von ruhigem Dasein versunken, daß meine Kunst darunter leidet. Ich könnte jetzt nicht zeichnen, nicht einen Strich."/>  </div>
        </div>
      </>
    );
  }
}
