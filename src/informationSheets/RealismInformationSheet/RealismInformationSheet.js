import React, { Component } from 'react';
import SheetStyles from '../SheetStyles.module.css';
import HamburgerCompassHeader from '../../headers/HamburgerCompassHeader/HamburgerCompassHeader';
import ArrowButton from '../../general/ArrowButton/ArrowButton';

import map1x from './mappa-ver02@1x.png';
import map2x from './mappa-ver02@2x.png';

import legend01 from './legend01.svg';
import textWall01 from './textWall01.png';
import textWall02 from './textWall02.png';
import treemap from './treemapRatioWordsConcreteAbstract.svg';

class RealismInformationSheet extends Component {
  render() {
    return <>
      <HamburgerCompassHeader />
      <main className={SheetStyles.main}>
        <div className={SheetStyles.gridRow}>
          <h4 className={SheetStyles.titleH4}>Tappa 3 > realismo</h4>
          <h1 className={SheetStyles.titleH1}>Virgi Scheda 3</h1>
          <h2 className={SheetStyles.titleH2}>L'idea</h2>
          <p className={SheetStyles.paragraph}>
            Questa scheda nasce come approfondimento della terza tappa dell’itinerario spaziale, nella quale si è scelto di rappresentare la presenza o l’assenza di movimento all’interno dei racconti della produzione breve di Calvino che presentano ambientazioni di tipo terrestre. In particolare, in questa scheda si prende in esame uno solo di questi testi, Paura sul sentiero, racconto pubblicato nel 1946 sulla rivista «Darsena nuova» e in seguito nei volumi Ultimo viene il corvo (1949) e I racconti (1958). Paura sul sentiero è uno dei primi racconti dell’autore e presenta non a caso caratteristiche tematiche e stilistiche conformi alla prima fase della scrittura di Calvino. Protagonista del testo è Binda, giovane staffetta partigiana che durante la notte si inoltra a piedi nei boschi dell’entroterra ligure di ponente per raggiungere nel minor tempo possibile il casolare in cui si trova la sua brigata partigiana, con l’intento di comunicare ai compagni l’ordine di spostarsi. Siamo dunque nelle terre natali di Calvino, durante gli ultimi anni della Seconda guerra mondiale, in un contesto specifico che l’autore ha conosciuto direttamente e che descrive con dovizia di dettagli fornendo indicazioni geografiche molto precise che ci consentono di ricostruire per filo e per segno il percorso compiuto dal protagonista.<br/><br/>
            Tuttavia, a questo impianto narrativo fortemente realista, complice il sentimento di paura provato dal personaggio, si accompagna fin da subito una descrizione della realtà che si trasforma e si sfalda in continuazione sotto gli effetti di visioni, pensieri e immaginazioni, al punto che in più di un’occasione il racconto partigiano prende le sembianze di una fiaba d’avventura: l’eroe-Binda, lontano dalla sua bella-Regina, deve raggiungere la meta ma lungo il cammino è inseguito dal nemico Gund, un terribile tedesco gigante munito di elmo e armatura che tenta in tutti i modi di ostacolargli il cammino.<br/>
            L’idea è dunque quella di mostrare questa duplice natura nel racconto: da un lato l’ossatura realista del testo - i riferimenti geo-spaziali in cui il giovane Calvino ha effettivamente trascorso una parte della Resistenza - che testimonia senza dubbio la volontà dell’autore di raccontare e lasciare traccia di una delle esperienze più fondanti della propria vita; dall’altro una certa propensione al linguaggio fiabesco, d’avventura, e la tendenza dei suoi personaggi a dubitare della realtà che si presenta alla vista, a intravedere dietro la superficie delle cose altre storie e altre possibilità.
          </p>
          <div className={SheetStyles.sideContent}>
            <img className={SheetStyles.image+' '+SheetStyles.image100w} src={window.devicePixelRatio>1?map2x:map1x} style={{border:'0px solid #333333', borderRadius: 3}} />
            <p className={SheetStyles.caption}>
              I luoghi del racconto: le tappe del percorso di Binda sono collegate dalle frecce, gli altri luoghi sono nominati nel racconto ma non attraversati.
            </p>
            <p className={SheetStyles.caption}>
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
          <div className={SheetStyles.sideContent}>
            <img className={SheetStyles.image+' '+SheetStyles.image100w} src={treemap} style={{position:'sticky',top:'calc(var(--navigation-height) + 2px)'}} />
            <p className={SheetStyles.caption}>
              Treemap
            </p>
          </div>
          <p style={{
            gridColumn:'1 / span 4',
            color:'#4500FF',
            fontSize:12
          }}>
            <b>Natura 44%</b> — sentiero, luna, bivio, alberi, scorciatoie, buio, sassi, cespugli, salite, sassi, notte, buio, vallate, legno, castagne, boschi, sentieri, capre, legna, fieno, sassi, castagno, tronco, lichene, pietra, spiazzo, carbonaia, capra, faina, caccia, cespugli, pendio, prati, valli, cane, coda, monte, valle, valle, monte, creste, monte, valle, campagne, vallata, latte, valle, notte, notte, paglia, braci, buio, boschi, valle, l’alba, cresta, ali, pipistrello, costone, buio, vento, erba, foglie, castagno, ricci, foglie, ricci, foglie, ricci, sciacquio, ghiri, alberi, notte, sentiero, mare, foglie, costiera, pista, vallata, rive, riva, buio, pendio, cespugli, stormi, pernici, luce, lume, riva, lumi, sentieri, bestia, orme, lumi, cespuglio, cespuglio, bestia, rami, larici, bestia, bestia, scimmia, prato, luna, versante, sottoterra, montagne, ragni, terra, funghi, bosco, buio, tronchi, cespugli, prato, luna, gufo, fischio, fischio, bestia, cespo, d’eriche, lepre, volpe, arbusti, cespuglio, albero, ghiri, pietraie, rami, radici, alberi siepe, foglie, gufo, aria, sentiero, pietre, strada, sentiero, pietre, alberi, muschio, pietre, alberi, muschio, gradino, sassi, dirupo, roveto, costone, cespo, ginestra, agrifoglio, rigagnolo, acqua, rane, rane, vallata, rane, nicchia, neve, neve, pini, aghi, terriccio, formicaio, nicchia, bosco, fuoco, castagne, ghiri, luce, fuoco, fuoco, alba, cresta, castagne, sperone, roccia, dirupo, cespugli, cespugli
          </p>
          <p style={{
            gridColumn:'5 / span 4',
            color:'#4500FF',
            fontSize:12
          }}>
            <b>Guerra 21%</b> — staffetta, battaglione, staffetta, brigata, compagni, accampamento, notizie, ordini, compito, arma, fuciletto, distaccamento, risposta, cuoco, marmitte, gavettata, compito, partigiani, marina, guerra, guerra, spari, salvataggi, guerra, partigiani, bersaglieri, militi, rastrellamento, partigiani, bersaglieri, militi, tedeschi, partigiani, rastrellamenti, marcia, militi, distaccamenti, ordine, battaglione, ordine, comandante, consegna, marcia, tedeschi, tedeschi, battaglioni, tedeschi, compagni, compagni, mine, mine, mine, mine, mine, tedeschi, tedeschi, tedesco, tedesco, tedesco, elmi, fucili, tedeschi, tedeschi, armi, mitraglia, elmo, mitra, tedeschi, tedeschi, tedesco, elmi, bandoliere, armi, inseguimento, accampamento, commissario, ordine, tedeschi, elmo, accampamento, compagni, compagni, tedeschi, fascisti, munizioni, treppiede, compagni, marcia
          </p>
          <p style={{
            gridColumn:'9 / span 4',
            color:'#4500FF',
            fontSize:12
          }}>
            <b>Corpo 18%</b> —  passo, corpo, petto, petto, respiro, gambe, volto, faccia, pugno, faccia, labbro, corpo, muscoli, spalle, gola, piedi, gomito, gomito, gomiti, gambe, polmoni, mano, alito, baffi, narici, pelle, piedi, occhi, cuore, palpebre, passi, gola, corpi, teste, capelli, passo, tempie, dita, saliva, nervi, sangue, collo, passi, piedi, occhi, urlo, piedi, petto, sorriso, mani, spalle, mani, dito, fianco, mani, bocche, mani, pelle, mano, testa, gola, petto, passi, man, mano, occhi, sorriso, labbra, faccia, pugno, fiato, palpebre, mani, spalle, passi
          </p>
        </div>
        <div className={SheetStyles.gridRow}>
          <h2 className={SheetStyles.titleH2}>Trasformazioni, visioni, dubbi</h2>
          <img className={SheetStyles.image+' '+SheetStyles.translucentBackground} src={legend01} style={{ borderBottom: '1px solid #5151fc', gridColumn:'1 / span 12', marginBottom:'1rem', position:'sticky', top:'calc(var(--navigation-height) - 0px)',width:'100%'}} />
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
          <div style={{gridColumn:'1 / span 3'}}><ArrowButton arrowDirection="none" textAlign="left" text="RITORNA ALL'ANALISI" route="/Problem/realism" /></div>
          <div style={{gridColumn:'4 / span 2'}}><ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 1" route="/Phenomena/territory/spaceAnalysis" /></div>
          <div style={{gridColumn:'6 / span 2'}}><ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 2" route="/Process/transforming" /></div>
        </div>
      </main>

    </>;
  }
}

export default RealismInformationSheet;
