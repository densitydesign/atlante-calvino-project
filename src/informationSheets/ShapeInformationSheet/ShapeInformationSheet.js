import React from 'react';

import HamburgerCompassHeader from '../../headers/HamburgerCompassHeader/HamburgerCompassHeader';
import ListTypePerTextWrapper from '../../visualizations/ListTypesPerText/ListTypesPerTextWrapper';
import ArrowButton from '../../general/ArrowButton/ArrowButton';

import '../../App.css';
import './ShapeInformationSheet.css';
import SheetStyles from '../SheetStyles.module.css';


import legenda from './legenda.svg'
import zoom_01 from './zoom_01.png'
import zoom_02 from './zoom_02.png'
import zoom_03 from './zoom_03.png'
import zoom_04 from './zoom_04.png'


export default class ShapeInformationSheet extends React.Component
{
  render()
  {
    return (
      <>
        <HamburgerCompassHeader />
        <main className={SheetStyles.main}>
        <div className={SheetStyles.gridRow}>
          <h4 className="ac-breadcrumb">Tappa 1 - Elenchi</h4>
          <h1 className={SheetStyles.titleH1}>Analisi di occorrenze del campo semantico del dubbio</h1>
        </div>
        <div className={SheetStyles.gridRow}>
          <img className={SheetStyles.legend} style = {{gridColumn:'1 / span 9'}}  src={legenda}/>
        </div>

        <div id="mainviz" className={SheetStyles.gridRow}>
          <ListTypePerTextWrapper  />
        </div>

        <div className={SheetStyles.gridRow}>
        <h2 className={SheetStyles.titleH2}> Per un'estetica elencatoria </h2>
        <h3 className={SheetStyles.subtitleSheet}>I picchi (1945, 1951, 1962, 1966, 1972)</h3>
        <p className={SheetStyles.paragraphBig}>
        Sono tutti anni in cui Calvino pubblica pochi titoli: nel 1945 solo Angoscia in caserma, nel 1951 solo Il reggimento smarrito e L’avventura di una bagnante, nel 1962 solo La strada di San Giovanni, nel 1966 solo Ti con zero, nel 1972 solo Il nome, il naso e Le città invisibili. Tutti i testi in questione sono composti negli anni della rispettiva pubblicazione, tranne La strada e Le città, che cominciano a essere scritti rispettivamente a partire dal 1960 e dal 1970, in periodi in cui le pubblicazioni si diradano. Il risultato sembra suggerire una forma di correlazione tra la rarefazione del numero di testi e un uso più intenso degli elenchi, come se l’espansione orizzontale ed enumerativa della scrittura fosse legata al ridursi della varietà di storie elaborate.
        </p>

      <h3 className={SheetStyles.subtitleSheet}>Il picco, 1945</h3>
      <p className={SheetStyles.paragraph}>Nella tradizione letteraria occidentale l’andamento enumerativo è il procedimento retorico che si oppone alla peripezia, e che con la sua presenza «ostacola, rallenta o differisce il resoconto delle vicende» e «mette in dubbio la possibilità stessa di organizzare gerarchicamente gli eventi di una vita in forma unitaria» (Inglese 2012, 80). Risulta quindi molto interessante che il picco più alto del grafico corrisponda al 1945, anno in cui Calvino pubblica un solo racconto: Angoscia in caserma. Il testo in questione, infatti, è composto dalle riflessioni di un partigiano che, durante un’esperienza di prigionia, viene colto dal «male dei simboli» (RR, I, 237) vale a dire dall’ossessione di vedere oscuri segnali premonitori in tutti i singoli dettagli dell’ambiente circostante, che vengono isolati dal contesto e riempiti di un eccesso di significato che finisce per cancellare la loro interpretabilità di primo grado, fino a renderli irriconoscibili. Ne deriva l’effetto generale di una realtà sgretolata in minuscole monadi, che è impossibile ricomporre in uno schema organico e che quindi inibisce la capacità del personaggio di intraprendere un’azione e quindi di generare una vicenda.
      </p>
      <div className={SheetStyles.sideContent}>
        <img className={SheetStyles.image} style={{position:'sticky', top:'calc(var(--navigation-height) + 1rem)'}} src={zoom_01}/>
      </div>

      <h3 className={SheetStyles.subtitleSheet}>Parole, 1965</h3>
      <p className={SheetStyles.paragraph}>Tra le variazioni diacroniche che interessano le proporzioni tra le diverse tipologie elencatorie usate da Calvino, spicca nel 1965 una presenza particolarmente alta di elenchi di singole parole. Questa modalità, che nello spettro della figura retorica dell’enumerazione coincide pienamente con il polo dell’accumulazione,(<em>A. Marchese, Dizionario di retorica e stilistica, Mondadori, Milano 1991</em>) erode ogni residuo di complessità sintattica riducendo gli elementi della serie a unità grammaticali di base, e quindi porta sulla pagina il massimo effetto di frammentazione e caos. Nella storia letteraria occidentale, proprio questo particolare tipo di elenco subisce un ribaltamento totale di significato a partire dal XVI secolo, quando le forme simboliche medievali cominciano a trasformarsi nell’estetica della modernità: l’accumulazione passa dal rappresentare un omaggio all’organicità divina del creato ("Dio possiede il catalogo dell’universo e il primo privilegio che assegna ad Adamo è non a caso quello di dare un nome agli animali dell’Eden") al configurare un mondo abbandonato dall’ordine divino, in cui «le cose divengono autonome e iniziano ad accalcarsi intorno all’uomo, mischiandosi con le creature, con l’uomo stesso, con i suoi utensili, le sue idee, i sentimenti e perfino le parole».<em>L. Spitzer, L’enumerazione caotica nella poesia moderna, in «L’Asino d’Oro», 3, II, 1991</em>).
      Un passaggio che genera la tendenza opposta, tipica ad esempio del Barocco, per cui «quanto più le cose – e le parole – tendono ad emanciparsi, tanto più le forze coercitive aumentano di numero, per farle ritornare al corrispondente stato naturale». Diventa allora interessante notare che il 1965 è l’anno che Calvino dedica interamente a costruire la galassia delle «storie cosmicomiche» (scrive 8 dei 12 testi del volume <em>Le cosmicomiche</em>, uscito l’anno stesso, e 3 dei testi che confluiranno nella “raccolta sorella” <em>La memoria del mondo</em> del 1968): testi in cui una fortissima cornice concettuale, ancorata direttamente alle scienze dure, viene usata per imbrigliare storie dominate da eventi dispersivi e forze centrifughe, presenti sia sul piano dei contenuti sia su quello della forma. Non è un caso che simili incrementi nell’uso di questa modalità elencatoria corrispondano a due opere che condividono questa impostazione: <em>Le città invisibili</em> e <em>Palomar</em>.
      </p>
      <div className={SheetStyles.sideContent}>
        <img className={SheetStyles.image} style={{position:'sticky', top:'calc(var(--navigation-height) + 1rem)'}} src={zoom_02}/>
      </div>
      </div>

      <div className={SheetStyles.gridRow}>
      <h3 className={SheetStyles.subtitleSheet}>Sintagmi e Preposizioni</h3>
      <img className={SheetStyles.image} style={{gridColumn:'1 / span 12'}} src={zoom_03}/>
      <img className={SheetStyles.image} style={{gridColumn:'1 / span 12'}} src={zoom_04}/>
      <p className={SheetStyles.paragraph}>Un dato trasversale all’intero corpus, che colpisce per la costanza con cui si mantiene stabile su un’estensione di oltre quarant’anni che attraversa generi e stili molto diversi, è la netta preferenza di Calvino per una procedura elencatoria che coinvolga elementi complessi come sintagmi e addirittura intere proposizioni, gesto che, in termini retorici, costituisce il polo opposto all’accumulazione, vale a dire la distribuzione: quel formato enumerativo in cui la ripetizione non si limita alla ripresa di un oggetto grammaticale, ma coinvolge delle porzioni di testo anche molto estese, la cui “riconoscibilità seriale” non deriva solo dal piano sintattico ma anche da quello semantico. Questo dato rappresenta bene l’elemento di ambiguità presente nella poetica calviniana: nello stesso punto in cui si registra la più forte tendenza a far proliferare l’elemento orizzontale dell’elenco a discapito dell’elemento verticale dell’architettura compositiva, con un gesto che sembrerebbe suggerire una volontà di semplificazione e di sfida alla struttura classica dell’arco drammatico,(<em>G. Freytag, Technique of the Drama. An Exposition of Dramatic Composition and Art, Scott, Foresman & Company, Chicago 1900</em>) si manifesta anche la massima ricerca di complessità nella costruzione delle “unità” elencate, che in alcuni casi si espandono e articolano fin quasi a oscurare la riconoscibilità dell’elenco in quanto tale. Ma questi elenchi, e quelli di proposizioni in particolare, sono anche un segnale importante delle scelte estetiche generali dell’autore, perché cancellando i nessi causali a favore della semplice sequenza temporale (in cui un evento è raccontato mettendo in fila i singoli momenti che lo compongono, come un film che venga mostrato un fermo-immagine alla volta) rievocano l’andamento delle cronache e degli annali, forme tradizionalmente considerate opposte all’arte narrativa perché prive di trama, e in questo modo contribuiscono a posizionare Calvino in una lunga tradizione di letteratura «non-aristotelica» che risale fino a Sterne..
      </p>
  </div>


      <div className={SheetStyles.gridRow}>
        <div style={{gridColumn:'1 / span 3'}}><ArrowButton arrowDirection="none" textAlign="left" text="ANALISI" route="/space/phase2" /></div>
        <div style={{gridColumn:'4 / span 2'}}><ArrowButton arrowDirection="left" textAlign="right" text="TAPPA 1" route="/space/phase1"/></div>
        <div style={{gridColumn:'6 / span 2'}}><ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 3" route="/space/phase3" /></div>
      </div>
    </main>
  </>

    );
  }
}
