import React, { Component } from 'react';

import HamburgerCompassHeader from '../../headers/HamburgerCompassHeader/HamburgerCompassHeader';
import ArrowButton from '../../general/ArrowButton/ArrowButton';

import './HesitationInformationSheet.css';
import SheetStyles from '../SheetStyles.module.css';


import giornata from './scheda-dubitare-01.png'
import zoom_02 from './scheda-dubitare-02.png'
import zoom_03 from './scheda-dubitare-03.png'
import zoom_04 from './scheda-dubitare-04.png'



class HesitationInformationSheet extends Component {
  render()
  {
    return (
      <>
      <HamburgerCompassHeader />
      <main className={SheetStyles.main}>
      <div className={SheetStyles.gridRow}>
        <h4 className="ac-breadcrumb">Tappa 2 - Dubitare</h4>
        <h1 className={SheetStyles.titleH1}>La giornata di uno scrutatore</h1>
      <img className = {SheetStyles.image} style={{gridColumn:'1 / span 12'}} src={giornata}/>
      </div>

              <div className={SheetStyles.gridRow}>
              <p className={SheetStyles.paragraphBig}>
                La giornata d’uno scrutatore è uno dei romanzi di Calvino che presenta la più alta percentuale di quello che abbiamo denominato “testo dubitativo”: il 35%. Il dato non stupisce, considerando la natura profondamente ibrida del libro pubblicato nel 1963, «una sorta di romanzo-saggio, sospeso fra testimonianza, riflessione sui fondamenti etici del vivere associato, autoritratto morale» (Barenghi 2009, 56).
                In un’intervista del 1963 Calvino lo definì «un libro di punti interrogativi» (RR, II, 1311). Ma il segno interrogativo, per quanto simbolicamente così importante, non è l’unico a caratterizzare il romanzo: La giornata d’uno scrutatore è un libro anche di parentesi e di incisi. Segni che interrompono la continuità lineare del discorso, creando degli spazi di scrittura indipendenti che spezzano il testo principale, annidandovi dentro un secondo testo. Lo scopo di questo approfondimento è mostrare la distribuzione di tali segni grafici e soprattutto in che modo collaborano con il processo dubitativo, amplificando il suo effetto.
                La giornata d’uno scrutatore racconta l’esperienza di Amerigo Ormea, militante e intellettuale, nel ruolo di scrutatore durante le elezioni dell’8 giugno 1953, presso un istituto per persone con disabilità mentali e fisiche trasformato in seggio elettorale.
                Il libro è diviso in 15 capitoli e presenta un totale di 214 occorrenze di <span style={{color:'#cfcfff'}}>testo dubitativo</span>, distribuite in maniera diseguale all’interno del volume. Il secondo capitolo possiede una delle concentrazioni maggiori: 23 occorrenze. Abbiamo deciso di concentrarci sulla fine e l’inizio del capitolo, analizzando le due zone del testo separatamente.
              </p>
              </div>

            <div style={{gridColumn:'2 / span 22'}}>
              <h4 style={{textTransform:'none'}}>Numero di occorrenze di testo dubitativo attraverso i capitoli di <i>La giornata di uno scrutatore</i></h4>
              <h1>Parole: istruzioni per l'uso</h1>
            </div>
            <article className="focus">
              <div>
                <p><span style={{color:'#0E08F9'}}>Scegliere le parole</span><br/>
                La riflessione che inaugura il capitolo è immediatamente coinvolta dal processo dubitativo. Con la promessa di una maggiore esattezza, <span style={{textDecoration:'underline'}}>td7</span> e <span style={{textDecoration:'underline'}}>td8</span> cercano di giustificare la scelta di impiegare solo «termini generici», evitando i nomi propri. Subito però il testo infrange questa regola di comportamento: viene infatti svelata l’identità del «partito di sinistra» a cui appartiene il protagonista (ovvero «partito comunista») e l’«istituto religioso» anonimo diventa «il Cottolengo di Torino».</p>
                <p>Ci troviamo di fronte a una figura retorica, la <span style={{textDecoration:'underline'}}>preterizione</span>, che spesso collabora (non a caso) con il processo dubitativo: informare negando infatti è in linea con il funzionamento del testo dubitativo, che alimenta la narrazione tramite un’operazione tutta volta alla sottrazione, ossia mettendo in discussione quanto detto in precedenza.</p>

                <p><span style={{color:'#0E08F9'}}>Interpretare le parole</span><br/>
                Il <span style={{textDecoration:'underline'}}>td9</span> afferma che il significato attribuito a un nome non sempre è stabile, ma può cambiare da individuo a individuo, a volte rivelandosi semanticamente incompatibile.</p>
                <p>Se un significato univoco non esiste, non è più possibile chiamare le cose con il proprio nome senza avere il timore di essere fraintesi. Assistiamo qui a una crisi delle capacità comunicative del linguaggio, altro tratto caratteristico del processo dubitativo.</p>

                <p><span style={{color:'#0E08F9'}}>Precisare le parole</span><br/>
                Il <span style={{textDecoration:'underline'}}>td10</span> fornisce un’informazione che aumenta la consapevolezza di un ipotetico lettore sulle funzioni del Cottolengo.</p>
                <p>Come conseguenza dell’instabilità semantica dietro le parole, l’unico modo per assicurarsi di essere compreso correttamente è «precisare», ridefinendo ancora e ancora il concetto, sommando le puntualizzazioni (cfr. Mengaldo 1996, 278). Il <span style={{textDecoration:'underline'}}>td10</span> si trova all’interno di un inciso; qui il segno grafico delimita un’informazione, ma crea anche una deviazione nel testo principale.</p>

                <p><b>Conclusione per 'Le parole: istruzioni per l'uso'</b><br/>
                All’inizio del secondo capitolo della Giornata di uno scrutatore, l’accento è posto sulla difficoltà di comunicare correttamente con il lettore. Il significato delle parole è instabile e di conseguenza è necessario spiegare ogni termine per evitare il fraintendimento; tuttavia questi continui chiarimenti corrono il rischio di confondere ancora di più, soffocando la narrazione. Il testo procede accumulando ragionamenti digressivi, sviluppi laterali a volte racchiusi dentro segni grafici. In particolare il td10 inizia con la parola formula «ammesso che», la stessa del td2 nella Nota dell’autore: sembra che il romanzo stia cercando di sabotarsi, minimizzando fin dal principio l’importanza del suo contenuto o diffidando apertamente del proprio lettore.</p>
              </div>
            </article>
            <div style={{gridColumn:'17 / span 7'}}>
              {/* Parole: instruzioni per l'uso immagine sticky */}
              <img className="sticky-element" src={process.env.PUBLIC_URL + "/informationSheets/scheda-dubitare-03.png"} alt="information complement" style={{width:'100%', top: '75px'}}/>
            </div>
            <div style={{gridColumn:'2 / span 22'}}>
              <h1>Gli strati del testo</h1>

              <article className="focus" style={{display:'grid', gridTemplateColumns: 'repeat(24, 1fr)'}}>
                <div style={{gridColumn:'1 / span 15'}}>
                  <img className="sticky-element" src={process.env.PUBLIC_URL + "/informationSheets/scheda-dubitare-04.png"} alt="information complement" style={{width:'100%', paddingBottom: '50px'}}/>

                  <p>Il paragrafo finale nella versione cartacea si svolge per oltre due pagine senza punti fermi: è composto da una serie di riflessioni, incastrate l’una dentro l’altra, sovrapposte l’una sopra l’altra. L’argomento è la fede politica del protagonista. Dopo aver esaminato ogni elemento in grado di stabilirne l’origine e le motivazioni profonde (producendo un testo denso, ricco di informazioni ma di difficile lettura), improvvisamente il filo argomentativo si ritorce su se stesso.</p>

                  <p><span style={{color:'#0E08F9'}}>Il processo: i livelli del testo dubitativo</span><br/>
                  Questo paragrafo è un ottimo esempio di come il processo dubitativo “torna sui suoi passi”. Il testo oggetto di dubbio associato a <span style={{textDecoration:'underline'}}>td28</span> coincide con l’inizio del paragrafo e racchiude in sé dodici td (dal <span style={{textDecoration:'underline'}}>td16</span> al <span style={{textDecoration:'underline'}}>td27</span>, più della metà del numero totale di occorrenze del capitolo). L’improvviso incremento di occorrenze non è unicamente numerico; in parallelo assistiamo a un innalzamento di livello; il numero di livello equivale alla quantità di volte in cui il processo dubitativo insiste sulla stessa identica porzione di testo: accavallandosi fra loro le occorrenze “dubitano” della loro capacità di ristabilire il senso del discorso. Un altro esempio: il passaggio dal 6° al 7° livello avviene a causa del <span style={{textDecoration:'underline'}}>td29</span>; poteva sembrare che il <span style={{textDecoration:'underline'}}>td28</span> fosse riuscito una volta per tutte a bloccare la catena dubitativa, eppure ancora una volta c’è qualcosa da dire, da aggiungere, da precisare. E la precisazione non può che avvenire fra parentesi.</p>
                </div>
                <div style={{gridColumn:'1 / span 15'}}>
                  <p><span style={{color:'#0E08F9'}}>La forma: le parentesi</span><br/>
                  Cinque delle occorrenze “intrappolate” dentro il testo oggetto di dubbio di td28 sono a loro volta contenute fra parentesi: <span style={{textDecoration:'underline'}}>td18</span>, <span style={{textDecoration:'underline'}}>td20</span>, <span style={{textDecoration:'underline'}}>td21</span>, <span style={{textDecoration:'underline'}}>td23</span>, <span style={{textDecoration:'underline'}}>td27</span>. Ma la quantità di segni grafici nel paragrafo è molto più alta: infatti circa il <a href="https://docs.google.com/spreadsheets/d/11gwVrrpqawYyHTUrlWQZ_ptM0O-vZmKZinNyW3ReYbM/edit#gid=1461625927&range=C2:C17">30%</a> del capitolo viene dislocata tra parentesi o dentro inciso, anche quando da un punto di vista narrativo potrebbe non trovarcisi. In alcuni casi le parentesi contengono a loro volta degli incisi, elaborando così una sorta di racconto a “matrioska”. La massiccia concentrazione di processo dubitativo proprio in quell’area è speculare alla presenza dei segni grafici che “stratificano” il testo.</p>
                </div>
              </article>
            </div>
            <div style={{gridColumn:'2 / span 22'}}>
              <img src={process.env.PUBLIC_URL + "/informationSheets/scheda-dubitare-05.png"} alt="information complement" style={{width:'100%', paddingBottom: '50px'}}/>
            </div>
            <article className="focus">
              <div>
                <p><b>Conclusione</b><br/>
                Alla fine del secondo capitolo della <i>Giornata di uno scrutatore</i>, il lettore è confrontato a un testo sviluppato su piani diversi, a volte in collaborazione altre in conflitto fra loro; tuttavia la struttura a “strati” sovrapposti, come le «foglie d’un carciofo»,  solo in apparenza garantisce una maggiore chiarezza: in realtà disorienta il lettore, costringendolo a muoversi dentro una narrazione simile a una «pasta collosa». È un meccanismo narrativo basato sul rapporto dinamico fra l’esattezza della scrittura e la difficoltà dell’atto interpretativo; l’unico modo per parlare della «complessità delle cose» è organizzarla in strati (<i>RR</i>, II, 9). La parentesi (così come l’inciso) sono di certo un’interruzione nel discorso, eppure grazie ai due archi di cerchio (o ai trattini) la spinta digressiva è confinata, “intrappolata” da quelle barriere fisiche che la separano dalla <i>vera</i> narrazione. Il processo dubitativo non funziona così. Se le parentesi e gli incisi generano un secondo testo che accompagna quello principale, il processo dubitativo attraversa e modifica profondamente entrambi, rivelandosi il più efficace motore di stratificazione.</p>
              </div>
            </article>
            <article className="focus">
              <div className="sheet--info">
                <ArrowButton arrowDirection="none" textAlign="left" text="ANALISI" route="/Phenomena/territory/spaceAnalysis" />
                <ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 2" route="/Process/intro" />
                <ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 3" route="/Problem/intro" />
              </div>
            </article>
          </main>

      </>
    );
  }
}

export default HesitationInformationSheet;
