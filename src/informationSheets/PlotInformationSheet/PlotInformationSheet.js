import React, { Component } from 'react';

import HamburgerCompassHeader from '../../headers/HamburgerCompassHeader/HamburgerCompassHeader';
import ArrowButton from '../../general/ArrowButton/ArrowButton';

import './PlotInformationSheet.css';
import SheetStyles from '../SheetStyles.module.css';

import legenda from './legenda_01.svg'
import incastonati from './incastonati.svg'
import zoom_01 from './zoom_01.svg'
import zoom_02 from './zoom_02.svg'
import info_01 from './info_01.svg'
import info_02 from './info_02.svg'

class PlotInformationSheet extends Component {
  render()
  {
    return (
      <>
        <HamburgerCompassHeader />
        <main className={SheetStyles.main}>
        <div className={SheetStyles.gridRow}>
          <h4 className="ac-breadcrumb">Tappa 3 - Trama</h4>
          <h1 className={SheetStyles.titleH1}>Se una notte d'inverno un viaggiatore</h1>
          </div>
          <div className={SheetStyles.gridRow}>
          <img className={SheetStyles.legend} style = {{gridColumn:'1 / span 9'}}  src={legenda}/>
            <img className={SheetStyles.image} style = {{gridColumn:'1 / span 12'}}  src={incastonati}/>
        </div>
        <div className={SheetStyles.gridRow}>
          <p className= ' captionLeft ' style={{gridColumn:'1 / span 22'}}> Numero di occorrenze di testo dubitativo attraverso i capitoli di <i>La giornata di uno scrutatore</i></p>
        </div>
        <div className={SheetStyles.gridRow}>
          <p className={SheetStyles.paragraphBig}>
            La giornata d’uno scrutatore è uno dei romanzi di Calvino che presenta la più alta percentuale di quello che abbiamo denominato “testo dubitativo”: il 35%. Il dato non stupisce, considerando la natura profondamente ibrida del libro pubblicato nel 1963, «una sorta di romanzo-saggio, sospeso fra testimonianza, riflessione sui fondamenti etici del vivere associato, autoritratto morale» (Barenghi 2009, 56).
            In un’intervista del 1963 Calvino lo definì «un libro di punti interrogativi» (RR, II, 1311). Ma il segno interrogativo, per quanto simbolicamente così importante, non è l’unico a caratterizzare il romanzo: La giornata d’uno scrutatore è un libro anche di parentesi e di incisi. Segni che interrompono la continuità lineare del discorso, creando degli spazi di scrittura indipendenti che spezzano il testo principale, annidandovi dentro un secondo testo. Lo scopo di questo approfondimento è mostrare la distribuzione di tali segni grafici e soprattutto in che modo collaborano con il processo dubitativo, amplificando il suo effetto.
            La giornata d’uno scrutatore racconta l’esperienza di Amerigo Ormea, militante e intellettuale, nel ruolo di scrutatore durante le elezioni dell’8 giugno 1953, presso un istituto per persone con disabilità mentali e fisiche trasformato in seggio elettorale.
            Il libro è diviso in 15 capitoli e presenta un totale di 214 occorrenze di <span style={{color:'#cfcfff'}}>testo dubitativo</span>, distribuite in maniera diseguale all’interno del volume. Il secondo capitolo possiede una delle concentrazioni maggiori: 23 occorrenze. Abbiamo deciso di concentrarci sulla fine e l’inizio del capitolo, analizzando le due zone del testo separatamente.
          </p>
        </div>

        <div className={SheetStyles.gridRow}>
          <h2 className={SheetStyles.titleH2}>Intro sulla struttura e storia lettore</h2>
            <div className={SheetStyles.paragraph} style = {{gridColumn:' 1 / span 10', float:'right'}}>
              <p>
              Come è stato largamente studiato,[nota1?] nella tradizione letteraria occidentale l’andamento enumerativo è il procedimento retorico che si oppone alla peripezia, e che con la sua presenza «ostacola, rallenta o differisce il resoconto delle vicende» e «mette in dubbio la possibilità stessa di organizzare gerarchicamente gli eventi di una vita in forma unitaria».[nota2] Risulta quindi molto interessante che il picco più alto del grafico corrisponda al 1945, anno in cui Calvino pubblica un solo racconto: Angoscia in caserma.
              </p>
            </div>
            <div>
              <p className= ' captionLeft '> Incipit e trama del lettore</p>
              <img className={SheetStyles.sideLegend} src={info_01}/>
            </div>
        </div>

        <div className={SheetStyles.gridRow}>
          <img className={SheetStyles.image100w} src={zoom_01} style = {{gridColumn:' 1 / span 17'}} />
        </div>

        <div className={SheetStyles.gridRow}>
        <h2 className={SheetStyles.titleH2}>Gli strati del testo</h2>
            <div className={SheetStyles.paragraph}>
            <p>
            Il paragrafo finale nella versione cartacea si svolge per più di due pagine senza punti fermi: è composto da una serie di riflessioni, che si incastrano e talvolta sovrappongono. L’argomento principale è la fede politica del protagonista. Dopo aver esaminato ogni elemento in grado di stabilirne l’origine e le motivazioni profonde, producendo un testo denso e ricco di informazioni, il filo del discorso si interrompe bruscamente poiché il narratore afferma di «aver capito finalmente quel che non ci voleva poi tanto a capire» (RR, II, 10).</p>
        </div>
          </div>

        <div className={SheetStyles.gridRow}>
        <div className={SheetStyles.paragraph} style = {{gridColumn:' 1 / span 10', float:'right'}}>
          <img className={SheetStyles.image100w} src={zoom_02} />
        </div>
        <div>
          <p className= ' captionLeft '> Dove siamo</p>
          <img className={SheetStyles.sideLegend} src={info_02}/>
        </div>
        </div>

          <div className={SheetStyles.gridRow}>
          <h2 className={SheetStyles.titleH2}>Bibliografia</h2>
            <ol className={SheetStyles.paragraph+' references '}>
              <li className={SheetStyles.referenceItem}>
              Mengaldo 1996: P.V. Mengaldo, Aspetti della lingua di Calvino, in Id., La tradizione del Novecento, Torino, Einaudi, pp. 227-291.
              </li>
              <li className={SheetStyles.referenceItem}>
              Barenghi 2009: M. Barenghi, Calvino, Bologna, Mulino.
              </li>
          </ol>
          </div>

        <div className={SheetStyles.gridRow}>
          <div style={{gridColumn:'1 / span 3'}}><ArrowButton arrowDirection="none" textAlign="left" text="ANALISI" route="/Problem/plot" /></div>
          <div style={{gridColumn:'4 / span 2'}}><ArrowButton arrowDirection="left" textAlign="right" text="TAPPA 1" route="/Phenomena/territory/shapeAnalysis"/></div>
          <div style={{gridColumn:'6 / span 2'}}><ArrowButton arrowDirection="left" textAlign="right" text="TAPPA 2" route="/Process/combining" /></div>
        </div>

      </main>
      </>
    );
  }
}


export default PlotInformationSheet;
