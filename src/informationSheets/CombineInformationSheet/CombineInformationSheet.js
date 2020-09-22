import React, { Component } from 'react';

import HamburgerCompassHeader from '../../headers/HamburgerCompassHeader/HamburgerCompassHeader';
import ArrowButton from '../../general/ArrowButton/ArrowButton';

import SheetStyles from '../SheetStyles.module.css';

import legenda from './legenda-01.svg'
import marimekko from './marimekko.svg'
import zoom_02 from './zoom_02.svg'
import zoom_03 from './zoom_03.svg'
import legenda_02 from './legenda_02.svg'
import legenda_03 from './legenda_03.svg'

class CombineInformationSheet extends Component {
  render() {
    return (
      <>

    <HamburgerCompassHeader />
    <main className={SheetStyles.main}>
    <div className={SheetStyles.gridRow}>
      <h4 className="ac-breadcrumb">Tappa 2 - Dubitare</h4>
      <h1 className={SheetStyles.titleH1}>La giornata di uno scrutatore</h1>
      <img className={SheetStyles.legend} style = {{gridColumn:'1 / span 9'}}  src={legenda}/>
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
        <h2 className={SheetStyles.titleH2}>Parole: istruzioni per l'uso</h2>
        <h3 className={SheetStyles.subtitleSheet}>Scegliere le parole</h3>
        <img className={SheetStyles.image} src={zoom_02} style={{position:'sticky',top:'calc(var(--navigation-height) + 2px)', width:'100%', paddingBottom: '50px'}} />
      </div>
      <div className={SheetStyles.paragraph}>
      <img className={SheetStyles.sideContent} style = {{gridColumn:'1 / span 9'}}  src={legenda_02}/>
      <div>
      <p>
      La riflessione che inaugura il capitolo è immediatamente coinvolta dal processo dubitativo. Con la promessa di una maggiore esattezza,
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

      <h3 className={SheetStyles.subtitleSheet}>Interpretare le parole</h3>
      <p>
      <span style={{textDecoration:'underline'}}>td9</span> afferma che il significato
      attribuito a un nome non sempre è stabile, ma può cambiare da individuo a individuo, a volte rivelandosi semanticamente incompatibile.
      Se un significato univoco non esiste,
      non è più possibile chiamare le cose con il proprio nome senza avere il timore di essere fraintesi.
      Assistiamo qui a una crisi delle capacità comunicative del linguaggio, altro tratto caratteristico del processo dubitativo.
      </p>

      <h3 className={SheetStyles.subtitleSheet}>Precisare le parole</h3>
      <div>
        <img className={SheetStyles.image} src={zoom_02} style={{position:'sticky',top:'calc(var(--navigation-height) + 2px)', width:'100%', paddingBottom: '50px'}} />
      </div>
      <img className={SheetStyles.legend} style = {{gridColumn:'1 / span 9'}}  src={legenda_03}/>
      <p>
      Il <span style={{textDecoration:'underline'}}>td10</span> fornisce un’informazione che aumenta la consapevolezza
      di un ipotetico lettore sulle funzioni del Cottolengo.
      Come conseguenza dell’instabilità semantica dietro le parole, l’unico modo per assicurarsi di essere compreso correttamente è «precisare»,
      ridefinendo ancora e ancora il concetto, sommando le puntualizzazioni (cfr. Mengaldo 1996, 278).
      Il <span style={{textDecoration:'underline'}}>td10</span>
      si trova all’interno di un inciso; qui il segno grafico delimita un’informazione, ma crea anche una deviazione nel testo principale.
      </p>

      <h3 className={SheetStyles.subtitleSheet}>Conclusione per 'Le parole: istruzioni per l'uso'</h3>
      <p> All’inizio del secondo capitolo della Giornata di uno scrutatore,
      l’accento è posto sulla difficoltà di comunicare correttamente con il lettore. Il significato delle parole è instabile e
      di conseguenza è necessario spiegare ogni termine per evitare il fraintendimento; tuttavia questi continui chiarimenti corrono
      il rischio di confondere ancora di più, soffocando la narrazione. Il testo procede accumulando ragionamenti digressivi,
      sviluppi laterali a volte racchiusi dentro segni grafici. In particolare il td10 inizia con la parola formula «ammesso che»,
      la stessa del td2 nella Nota dell’autore: sembra che il romanzo stia cercando di sabotarsi, minimizzando fin dal
      principio l’importanza del suo contenuto o diffidando apertamente del proprio lettore.</p>
      </div>

      <div className={SheetStyles.sideContent}>
      </div>
    </div>

    <div className={SheetStyles.gridRow}>
    <h2 className={SheetStyles.titleH2}>Gli strati del testo</h2>
        <div className={SheetStyles.paragraphBig}>
        <p>Il paragrafo finale nella versione cartacea si svolge per oltre due pagine senza punti fermi:
        è composto da una serie di riflessioni, incastrate l’una dentro l’altra, sovrapposte l’una sopra l’altra. L’argomento è la fede politica del protagonista.
        Dopo aver esaminato ogni elemento in grado di stabilirne l’origine e le motivazioni profonde (producendo un testo denso, ricco di informazioni ma di difficile lettura), improvvisamente il filo argomentativo si ritorce su se stesso.</p>
      <h3 className={SheetStyles.subtitleSheet}>Il processo: i livelli del testo dubitativo</h3>
      <div className={SheetStyles.paragraphBig}>
      <p>Questo paragrafo è un ottimo esempio di come il processo dubitativo “torna sui suoi passi”. Il testo oggetto di dubbio associato a <span style={{textDecoration:'underline'}}>td28</span> coincide con l’inizio del paragrafo e racchiude in sé dodici td (dal <span style={{textDecoration:'underline'}}>td16</span> al <span style={{textDecoration:'underline'}}>td27</span>, più della metà del numero totale di occorrenze del capitolo). L’improvviso incremento di occorrenze non è unicamente numerico; in parallelo assistiamo a un innalzamento di livello; il numero di livello equivale alla quantità di volte in cui il processo dubitativo insiste sulla stessa identica porzione di testo: accavallandosi fra loro le occorrenze “dubitano” della loro capacità di ristabilire il senso del discorso. Un altro esempio: il passaggio dal 6° al 7° livello avviene a causa del <span style={{textDecoration:'underline'}}>td29</span>; poteva sembrare che il <span style={{textDecoration:'underline'}}>td28</span> fosse riuscito una volta per tutte a bloccare la catena dubitativa, eppure ancora una volta c’è qualcosa da dire, da aggiungere, da precisare. E la precisazione non può che avvenire fra parentesi.</p>
      </div>
      </div>
      <h3 className={SheetStyles.subtitleSheet}>La forma: le parentesi</h3>
      <div className={SheetStyles.paragraphBig}>
      </div>
      <div className={SheetStyles.paragraph}>
      <p>
        Cinque delle occorrenze “intrappolate” dentro il testo oggetto di dubbio di td28 sono a loro volta contenute fra parentesi:
        <span style={{textDecoration:'underline'}}>td18</span>, <span style={{textDecoration:'underline'}}>td20</span>,
        <span style={{textDecoration:'underline'}}>td21</span>, <span style={{textDecoration:'underline'}}>td23</span>,
        <span style={{textDecoration:'underline'}}>td27</span>. Ma la quantità di segni grafici nel paragrafo è molto più alta: infatti circa il
        <a href="https://docs.google.com/spreadsheets/d/11gwVrrpqawYyHTUrlWQZ_ptM0O-vZmKZinNyW3ReYbM/edit#gid=1461625927&range=C2:C17">30%</a>
        del capitolo viene dislocata tra parentesi o dentro inciso, anche quando da un punto di vista narrativo potrebbe non trovarcisi.
        In alcuni casi le parentesi contengono a loro volta degli incisi, elaborando così una sorta di racconto a “matrioska”.
        La massiccia concentrazione di processo dubitativo proprio in quell’area è speculare alla presenza dei segni grafici che “stratificano” il testo.
      </p>
      </div>

</div>
        </main>

    </>
  );

  }
}

export default CombineInformationSheet;
