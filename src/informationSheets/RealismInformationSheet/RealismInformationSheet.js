import React, { Component } from 'react';
import SheetStyles from '../SheetStyles.module.css';
import HamburgerCompassHeader from '../../headers/HamburgerCompassHeader/HamburgerCompassHeader';
import ArrowButton from '../../general/ArrowButton/ArrowButton';

import map1x from './mappa-ver02@1x.png';
import map2x from './mappa-ver02@2x.png';

import legend01 from './legend01.svg';
import legend02 from './legend02.svg';
import textWall01 from './textWall01.svg';
import textWall02 from './textWall02.svg';
import treemap from './TreemapAbsoluteWordsConcreteAbstract.svg';

class RealismInformationSheet extends Component {
  render() {
    return <>
      <HamburgerCompassHeader />
      <main className={SheetStyles.main}>
        <div className={SheetStyles.gridRow}>
          <h4 className="ac-breadcrumb">Tappa 3 > realismo</h4>
          <h1 className={SheetStyles.titleH1}>Metamorfosi della realtà: sulle tracce della paura</h1>
          <h2 className={SheetStyles.titleH2}>L'idea</h2>
          <p className={SheetStyles.paragraph}>
            Questa scheda nasce come approfondimento della terza tappa dell’itinerario spaziale, nella quale si è scelto di rappresentare la presenza o l’assenza di movimento all’interno dei racconti della produzione breve di Calvino che presentano ambientazioni di tipo terrestre. In particolare, in questa scheda si prende in esame uno solo di questi testi, Paura sul sentiero, racconto pubblicato nel 1946 sulla rivista «Darsena nuova» e in seguito nei volumi Ultimo viene il corvo (1949) e I racconti (1958). Paura sul sentiero è uno dei primi racconti dell’autore e presenta non a caso caratteristiche tematiche e stilistiche conformi alla prima fase della scrittura di Calvino. Protagonista del testo è Binda, giovane staffetta partigiana che durante la notte si inoltra a piedi nei boschi dell’entroterra ligure di ponente per raggiungere nel minor tempo possibile il casolare in cui si trova la sua brigata partigiana, con l’intento di comunicare ai compagni l’ordine di spostarsi. Siamo dunque nelle terre natali di Calvino, durante gli ultimi anni della Seconda guerra mondiale, in un contesto specifico che l’autore ha conosciuto direttamente e che descrive con dovizia di dettagli fornendo indicazioni geografiche molto precise che ci consentono di ricostruire per filo e per segno il percorso compiuto dal protagonista.<br/><br/>
            Tuttavia, a questo impianto narrativo fortemente realista, complice il sentimento di paura provato dal personaggio, si accompagna fin da subito una descrizione della realtà che si trasforma e si sfalda in continuazione sotto gli effetti di visioni, pensieri e immaginazioni, al punto che in più di un’occasione il racconto partigiano prende le sembianze di una fiaba d’avventura: l’eroe-Binda, lontano dalla sua bella-Regina, deve raggiungere la meta ma lungo il cammino è inseguito dal nemico Gund, un terribile tedesco gigante munito di elmo e armatura che tenta in tutti i modi di ostacolargli il cammino.<br/>
            L’idea è dunque quella di mostrare questa duplice natura nel racconto: da un lato l’ossatura realista del testo - i riferimenti geo-spaziali in cui il giovane Calvino ha effettivamente trascorso una parte della Resistenza - che testimonia senza dubbio la volontà dell’autore di raccontare e lasciare traccia di una delle esperienze più fondanti della propria vita; dall’altro una certa propensione al linguaggio fiabesco, d’avventura, e la tendenza dei suoi personaggi a dubitare della realtà che si presenta alla vista, a intravedere dietro la superficie delle cose altre storie e altre possibilità.
          </p>
          <div className={SheetStyles.sideContent}>
            <img className={SheetStyles.image+' '+SheetStyles.image100w} src={window.devicePixelRatio>1?map2x:map1x} style={{border:'0px solid #333333', borderRadius: 3}} />
            <p className="captionLeft">
              I luoghi del racconto: le tappe del percorso di Binda sono collegate dalle frecce, gli altri luoghi sono nominati nel racconto ma non attraversati.
            </p>
            <p className="captionLeft">
              <a href="https://www.openstreetmap.org/#map=14/43.9894/7.7688" target="_blank" rel="noopener noreferrer" >Vai a una mappa più dettagliata</a>
            </p>
          </div>
        </div>
        <div className={SheetStyles.gridRow}>
          <h2 className={SheetStyles.titleH2}>Realtà VS immaginazione</h2>
          <img className={SheetStyles.image+' '+SheetStyles.translucentBackground} src={legend01} style={{ borderBottom: '1px solid #5151fc', gridColumn:'1 / span 12', marginBottom:'1rem', position:'sticky', top:'calc(var(--navigation-height) - 0px)',width:'100%'}} />
          <img className={SheetStyles.image} src={textWall01} style={{gridColumn:'1 / span 12',width:'100%'}}/>
        </div>
        <div className={SheetStyles.gridRow}>
          <p className={SheetStyles.paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <h2 className={SheetStyles.titleH2}>Il lessico della realtà</h2>
          <p className={SheetStyles.paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit.
          </p>
          <img className={SheetStyles.image} src={treemap} style={{gridColumn:'1 / span 12',width:'100%',marginTop:'2rem'}}/> 
        </div>
        <div className={SheetStyles.gridRow}>
          <h2 className={SheetStyles.titleH2}>Trasformazioni, visioni, dubbi</h2>
          <img className={SheetStyles.image+' '+SheetStyles.translucentBackground} src={legend02} style={{ borderBottom: '1px solid #5151fc', gridColumn:'1 / span 12', marginBottom:'1rem', position:'sticky', top:'calc(var(--navigation-height) - 0px)',width:'100%'}} />
          <img className={SheetStyles.image} src={textWall02} style={{gridColumn:'1 / span 12',width:'100%'}}/>
        </div>
        <div className={SheetStyles.gridRow}>
          <p className={SheetStyles.paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit
          </p>
        </div>
        <div className={SheetStyles.gridRow}>
          <h2 className={SheetStyles.titleH2}>Bibliografia</h2>
          <p className={SheetStyles.paragraph + ' references'}>
            <ol className={SheetStyles.references}>
              <li className={SheetStyles.referenceItem}>
                Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer.
              </li>
              <li className={SheetStyles.referenceItem}>
                Linke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich. Vogel Quax zwickt Johnys.
              </li>
              <li className={SheetStyles.referenceItem}>
                Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer.
              </li>
              <li className={SheetStyles.referenceItem}>
                Linke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich. Vogel Quax zwickt Johnys.
              </li>
            </ol>
          </p>
        </div>
        <div className={SheetStyles.gridRow}>
          <div style={{gridColumn:'1 / span 3'}}><ArrowButton arrowDirection="none" textAlign="left" text="RITORNA ALL'ANALISI" route="/space/phase3" /></div>
          <div style={{gridColumn:'4 / span 2'}}><ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 1" route="/space/phase1" /></div>
          <div style={{gridColumn:'6 / span 2'}}><ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 2" route="/space/phase2" /></div>
        </div>
      </main>

    </>;
  }
}

export default RealismInformationSheet;
