import React, { Component } from 'react';

import HamburgerCompassHeader from '../../headers/HamburgerCompassHeader/HamburgerCompassHeader';
import ArrowButton from '../../general/ArrowButton/ArrowButton';

import './HesitationInformationSheet.css';
import SheetStyles from '../SheetStyles.module.css';


import giornata from './scheda-dubitare-01.png'
import legenda_01 from './legenda_01.svg'
import zoom_01 from './zoom_01.svg'
import zoom_02 from './zoom_02.svg'
import info_02 from './info_02.svg'
import legenda_02 from './legenda_02.svg'
import zoom_03 from './zoom_03.svg'
import zoom_04 from './zoom_04.svg'
import legenda_04 from './legenda_04.svg'



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
        </div>
        <div className={SheetStyles.gridRow}>
          <p className={SheetStyles.paragraphBig}>
          <img className={SheetStyles.legend} style = {{gridColumn:' 16 / span 6', float:'left'}}  src={legenda_01}/>
          <img className = {SheetStyles.image100w} style={{gridColumn:'1 / span 12'}} src={zoom_01}/>
            La giornata d’uno scrutatore è uno dei romanzi di Calvino che presenta la più alta percentuale di quello che abbiamo denominato “testo dubitativo”: il 35%. Il dato non stupisce, considerando la natura profondamente ibrida del libro pubblicato nel 1963, «una sorta di romanzo-saggio, sospeso fra testimonianza, riflessione sui fondamenti etici del vivere associato, autoritratto morale» (Barenghi 2009, 56).
            In un’intervista del 1963 Calvino lo definì «un libro di punti interrogativi» (RR, II, 1311). Ma il segno interrogativo, per quanto simbolicamente così importante, non è l’unico a caratterizzare il romanzo: La giornata d’uno scrutatore è un libro anche di parentesi e di incisi. Segni che interrompono la continuità lineare del discorso, creando degli spazi di scrittura indipendenti che spezzano il testo principale, annidandovi dentro un secondo testo. Lo scopo di questo approfondimento è mostrare la distribuzione di tali segni grafici e soprattutto in che modo collaborano con il processo dubitativo, amplificando il suo effetto.
            La giornata d’uno scrutatore racconta l’esperienza di Amerigo Ormea, militante e intellettuale, nel ruolo di scrutatore durante le elezioni dell’8 giugno 1953, presso un istituto per persone con disabilità mentali e fisiche trasformato in seggio elettorale.
            Il libro è diviso in 15 capitoli e presenta un totale di 214 occorrenze di <span style={{color:'#cfcfff'}}>testo dubitativo</span>, distribuite in maniera diseguale all’interno del volume. Il secondo capitolo possiede una delle concentrazioni maggiori: 23 occorrenze. Abbiamo deciso di concentrarci sulla fine e l’inizio del capitolo, analizzando le due zone del testo separatamente.
          </p>
        </div>
        <div className={SheetStyles.gridRow}>
          <img className={SheetStyles.image} style={{gridColumn:'1 / span 22'}} src={zoom_02} />
          <p className= ' captionLeft ' style={{gridColumn:'1 / span 22'}}> Numero di occorrenze di testo dubitativo attraverso i capitoli di <i>La giornata di uno scrutatore</i></p>
        </div>

        <div className={SheetStyles.gridRow}>
            <h2 className={SheetStyles.titleH2}>Parole: istruzioni per l'uso</h2>
            <h3 className={SheetStyles.subtitleSheet}>Scegliere le parole</h3>

          <div className={SheetStyles.paragraph}>

          <p className =' cite '> Se si usano dei termini generici come «partito di sinistra»,
           «istituto religioso», non è perché non si vogliano chiamare le cose con il loro nome, ma perché… (RR, II, p. 7).
          </p>
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

          <h3 className={SheetStyles.subtitleSheet}>Interpretare le parole</h3>
          <p className =' cite '> Alla parola «comunismo» o alla parola «Cottolengo»,
          capita che ognuno, secondo le proprie cognizioni ed esperienze, è portato ad attribuire valori diversi o magari contrastanti… (ibidem).</p>
          <p><span style={{textDecoration:'underline'}}>td9</span> afferma che il significato
          attribuito a un nome non sempre è stabile, ma può cambiare da individuo a individuo, a volte rivelandosi semanticamente incompatibile.
          Se un significato univoco non esiste,
          non è più possibile chiamare le cose con il proprio nome senza avere il timore di essere fraintesi.
          Assistiamo qui a una crisi delle capacità comunicative del linguaggio, altro tratto caratteristico del processo dubitativo.
          </p>

          <h3 className={SheetStyles.subtitleSheet}>Precisare le parole</h3>
          <p className =' cite '>…quanto al «Cottolengo», altrimenti detto «Piccola Casa della Divina Provvidenza» – ammesso che tutti sappiano la funzione di quell’enorme ospizio… (ibidem).</p>
          <p>Il <span style={{textDecoration:'underline'}}>td10</span> fornisce un’informazione che aumenta la consapevolezza
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
            <img className={SheetStyles.legend} style = {{gridColumn:' 16 / span 6', float:'left', marginTop:'0px', position:'sticky' ,top:'calc(var(--navigation-height) + 1rem'}}  src={legenda_02}/>
            <img className={SheetStyles.image} src={info_02} style={{position:'sticky',top:'calc(var(--navigation-height) + 2px)'}} />
          </div>
        </div>

        <div className={SheetStyles.gridRow}>
        <h2 className={SheetStyles.titleH2}>Gli strati del testo</h2>
            <div className={SheetStyles.paragraph}>
            <p>
            Il paragrafo finale nella versione cartacea si svolge per più di due pagine senza punti fermi: è composto da una serie di riflessioni, che si incastrano e talvolta sovrappongono. L’argomento principale è la fede politica del protagonista. Dopo aver esaminato ogni elemento in grado di stabilirne l’origine e le motivazioni profonde, producendo un testo denso e ricco di informazioni, il filo del discorso si interrompe bruscamente poiché il narratore afferma di «aver capito finalmente quel che non ci voleva poi tanto a capire» (RR, II, 10).</p>

            <h3 className={SheetStyles.subtitleSheet}>Il processo: i livelli del testo dubitativo</h3>
          <div>
            <img className={SheetStyles.image} src={zoom_03} style={{position:'sticky',top:'calc(var(--navigation-height) + 1rem)', background:'#fffffa', width:'100%', paddingBottom:'0.5rem'}} />
          <p>Questo paragrafo è un ottimo esempio di come il processo dubitativo consista nel “tornare sui propri passi”. Il testo oggetto di dubbio associato a td28 coincide con l’inizio del paragrafo e racchiude in sé dodici td (dal td16 al td27, più della metà del numero totale di occorrenze del capitolo). L’improvviso incremento di occorrenze non è unicamente numerico; in parallelo assistiamo a un innalzamento di livello: il numero di livello equivale alla quantità di volte in cui il processo dubitativo insiste sulla stessa identica porzione di testo. Accavallandosi fra loro le occorrenze “dubitano” della loro capacità di ristabilire il senso del discorso. Un altro esempio: il passaggio dal 6° al 7° livello avviene a causa del td29; poteva sembrare che il td28 fosse riuscito una volta per tutte a bloccare la catena dubitativa, eppure ancora una volta c’è qualcosa da dire, da aggiungere, da precisare. E la precisazione non può che avvenire fra parentesi.</p>
          </div>
          </div>
          </div>

          <div className={SheetStyles.gridRow}>
            <h3 className={SheetStyles.subtitleSheet}>La forma: le parentesi</h3>
            <h4 className={SheetStyles.titleH4}>Capitolo 2</h4>
            </div>

            <div className={SheetStyles.gridRow}>
          <img className={SheetStyles.legend} style = {{gridColumn:' 1 / span 6', float:'left'}}  src={legenda_04}/>
          <img className = {SheetStyles.image100w} style={{gridColumn:'1 / span 22'}} src={zoom_04}/>
        </div>
           
            <div className={SheetStyles.gridRow}>
            <div className={SheetStyles.paragraph}>
            <p>Cinque delle occorrenze “intrappolate” dentro il testo oggetto di dubbio di td28 sono a loro volta contenute fra parentesi: td18, td20, td21, td23, td27. Ma la quantità di segni grafici nel paragrafo è molto più alta: infatti circa il 30% del capitolo viene dislocata tra parentesi o dentro un inciso, anche quando da un punto di vista narrativo non sembrerebbe necessario. In alcuni casi le parentesi contengono a loro volta degli incisi, elaborando così una sorta di racconto a “matrioska”. La massiccia concentrazione del processo dubitativo proprio in quell’area è collegata alla presenza dei segni grafici che “stratificano” il testo.
            </p>

            <h2 className={SheetStyles.titleH2}>Conclusione</h2>
            <p>Alla fine del secondo capitolo della Giornata d’uno scrutatore, il testo si sviluppa su piani diversi, i quali a volte collaborano, a volte confliggono. La struttura a “strati” sovrapposti, come le «foglie d’un carciofo», da una parte si sforza di garantire maggiore chiarezza al lettore/lettrice, dall’altra li disorienta. Si tratta di un meccanismo narrativo basato sul difficile rapporto fra la ricerca dell’esattezza della scrittura e il fallimento dell’atto interpretativo, per cui l’unico modo per parlare della «complessità delle cose» sembra essere quello di organizzarla in strati (ibidem).
            La parentesi e l’inciso generano questa stratificazione,
            attraverso una forma grafica che introduce un “altro” spazio,
            un altrove rispetto al discorso principale. Tale sdoppiamento del testo viene ulteriormente potenziato dal processo dubitativo,
            che rinforza l’effetto di stratificazione in una modalità meno visibile.</p>
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
          <div style={{gridColumn:'1 / span 3'}}><ArrowButton arrowDirection="none" textAlign="left" text="ANALISI" route="/Process/" /></div>
          <div style={{gridColumn:'4 / span 2'}}><ArrowButton arrowDirection="left" textAlign="right" text="TAPPA 1" route="/doubt/phase1"/></div>
          <div style={{gridColumn:'6 / span 2'}}><ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 3" route="/doubt/phase3" /></div>
        </div>

      </main>
      </>
    );
  }
}

export default HesitationInformationSheet;
