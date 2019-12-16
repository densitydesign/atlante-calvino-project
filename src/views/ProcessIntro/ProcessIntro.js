import React from 'react'

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
              <small className="current-phase-subheader"><strong>FASE 2</strong></small>
              <h1>IL PROCESSO</h1>
              <p>Al centro dell'idea di letteratura in Calvino sta il concetto di metamorfosi. Trasformare è il verbo che meglio rappresenta il complesso
                legame tra cose, parole e immagini che la scritura mette in scena sotto i nostri occhi. D'altra parte ogni trasformazione conduce a un processo
                di ricombinazione. L'arte di combinare tra loro segmenti di realtà e di racconto, moduli narrativi e insiemi di figure è quella che Calvino ha praticato
                per tutta la vita. Senza dimenticarsi di dubitare ogni volta di quello che si sta facendo, per poter ricominciare.
              </p>
            </div>
            <div className="other-phases-subheader" >
              <ArrowButton arrowDirection="left" textAlign="right" text="FASE 1" route="/Phenomena/intro" />
              <ArrowButton arrowDirection="right" textAlign="left" text="FASE 3" route="/Problem/intro" />
            </div>
          </div>
          <div className="category-subentries-grid">
            <CategoryEntryBlock smallTitle="dubbio" title="Dubitare" description="Eine wunderbare Heiterkeit hat meine ganze Seele eingenommen, gleich den süßen Frühlingsmorgen, die ich mit ganzem Herzen genieße. Ich bin allein und freue mich meines Lebens in dieser Gegend, die für solche Seelen geschaffen ist wie die meine. Ich bin so glücklich, mein Bester, so ganz in dem Gefühle von ruhigem Dasein versunken, daß meine Kunst darunter leidet. Ich könnte jetzt nicht zeichnen, nicht einen Strich." />
            <CategoryEntryBlock smallTitle="spazio" title="Trasformare" description="Eine wunderbare Heiterkeit hat meine ganze Seele eingenommen, gleich den süßen Frühlingsmorgen, die ich mit ganzem Herzen genieße. Ich bin allein und freue mich meines Lebens in dieser Gegend, die für solche Seelen geschaffen ist wie die meine. Ich bin so glücklich, mein Bester, so ganz in dem Gefühle von ruhigem Dasein versunken, daß meine Kunst darunter leidet. Ich könnte jetzt nicht zeichnen, nicht einen Strich."/>
            <CategoryEntryBlock smallTitle="forma" title="Combinare" description="Eine wunderbare Heiterkeit hat meine ganze Seele eingenommen, gleich den süßen Frühlingsmorgen, die ich mit ganzem Herzen genieße. Ich bin allein und freue mich meines Lebens in dieser Gegend, die für solche Seelen geschaffen ist wie die meine. Ich bin so glücklich, mein Bester, so ganz in dem Gefühle von ruhigem Dasein versunken, daß meine Kunst darunter leidet. Ich könnte jetzt nicht zeichnen, nicht einen Strich."/>
            </div>
        </div>
        </div>
      </>
    );
  }
}
