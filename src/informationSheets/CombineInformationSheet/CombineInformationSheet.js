import React, { Component } from 'react';

import HamburgerCompassHeader from '../../headers/HamburgerCompassHeader/HamburgerCompassHeader';
import ArrowButton from '../../general/ArrowButton/ArrowButton';

import SheetStyles from '../SheetStyles.module.css';

import legenda from './legenda-01.svg'
import marimekko from './marimekko.svg'
import zoom_02 from './zoom_02.svg'
import zoom_03 from './zoom_03.svg'
import zoom_04 from './zoom_04.svg'
import legenda_02 from './legenda_02.svg'
import legenda_03 from './legenda_03.svg'
import legenda_04 from './legenda_04.svg'

class CombineInformationSheet extends Component {
  render() {
    return (
      <>

    <HamburgerCompassHeader />
    <main className={SheetStyles.main}>
    <div className={SheetStyles.gridRow}>
      <h4 className="ac-breadcrumb">Tappa 2 - Combinare</h4>
      <h1 className={SheetStyles.titleH1}>La giornata di uno scrutatore</h1>
      </div>
          <div className={SheetStyles.gridRow}>
      <img className={SheetStyles.legend} style = {{gridColumn:'1 / span 22'}}  src={legenda}/>
        <img className={SheetStyles.image100w} style = {{gridColumn:'1 / span 12'}}  src={marimekko}/>
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
      <h2 className={SheetStyles.titleH2}>Varietà nascosta</h2>
      <h3 className={SheetStyles.subtitleSheet}></h3>
    <div className={SheetStyles.paragraphBig}>
      <div>
        <img className={SheetStyles.image} src={zoom_02} />
        <img className={SheetStyles.sideLegend} style = {{gridColumn:' 18 / span 4'}}  src={legenda_02}/>
      </div>
    </div>
    </div>

    <div className={SheetStyles.gridRow}>
    <div className={SheetStyles.paragraphBig}>
      <p>La riflessione che inaugura il capitolo è immediatamente coinvolta dal processo dubitativo. Con la promessa di una maggiore esattezza,
      <span style={{textDecoration:'underline'}}>td7</span> e <span style={{textDecoration:'underline'}}>td8</span> cercano di giustificare
      la scelta di impiegare solo «termini generici», evitando i nomi propri. Subito però il testo infrange questa regola di comportamento:
      viene infatti svelata l’identità del «partito di sinistra» a cui appartiene il protagonista (ovvero «partito comunista») e l’«istituto
      religioso» anonimo diventa «il Cottolengo di Torino».
      Ci troviamo di fronte a una figura retorica,
      la <span style={{textDecoration:'underline'}}>preterizione</span>,
      che spesso collabora (non a caso) con il processo dubitativo: informare negando infatti è in linea con il funzionamento
      del testo dubitativo, che alimenta la narrazione tramite un’operazione tutta volta alla sottrazione, ossia mettendo in discussione
      quanto detto in precedenza.
      </p>
    </div>
  </div>

    <div className={SheetStyles.gridRow}>
    <h2 className={SheetStyles.titleH2}>Salti di ambito</h2>
        <div className={SheetStyles.paragraphBig}>
        <p>Il paragrafo finale nella versione cartacea si svolge per oltre due pagine senza punti fermi:
        è composto da una serie di riflessioni, incastrate l’una dentro l’altra, sovrapposte l’una sopra l’altra. L’argomento è la fede politica del protagonista.
        Dopo aver esaminato ogni elemento in grado di stabilirne l’origine e le motivazioni profonde (producendo un testo denso, ricco di informazioni ma di difficile lettura), improvvisamente il filo argomentativo si ritorce su se stesso.
        </p></div>

      <div className={SheetStyles.paragraphBig}>
        <div>
          <img className={SheetStyles.image} src={zoom_03} />
          <img className={SheetStyles.sideLegend} style = {{gridColumn:' 18 / span 4'}}  src={legenda_03}/>
        </div>
      </div>
      </div>

      <div className={SheetStyles.gridRow}>
      <h2 className={SheetStyles.titleH2}>Salti di ambito</h2>
          <div className={SheetStyles.paragraphBig}>
          <p>Il paragrafo finale nella versione cartacea si svolge per oltre due pagine senza punti fermi:
          è composto da una serie di riflessioni, incastrate l’una dentro l’altra, sovrapposte l’una sopra l’altra. L’argomento è la fede politica del protagonista.
          Dopo aver esaminato ogni elemento in grado di stabilirne l’origine e le motivazioni profonde (producendo un testo denso, ricco di informazioni ma di difficile lettura), improvvisamente il filo argomentativo si ritorce su se stesso.
          </p></div>

        <div className={SheetStyles.paragraphBig}>
          <div>
            <img className={SheetStyles.image} src={zoom_04} />
            <img className={SheetStyles.sideLegend} style = {{gridColumn:' 18 / span 4'}}  src={legenda_04}/>
          </div>
        </div>
        </div>

        </main>

    </>
  );

  }
}

export default CombineInformationSheet;
