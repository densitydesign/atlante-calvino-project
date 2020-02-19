
import React from 'react';

import HamburgerIntroHeader from '../../headers/HamburgerIntroHeader/HamburgerIntroHeader';

import ArrowButton from '../../general/ArrowButton/ArrowButton';

import '../../App.css';
import './Itineraries.css';
import '../../general/GridsWithScrollableColumns/GridWithScrollableLeftColumn.css';
import '../../general/GridsWithScrollableColumns/ScrollableColumn.css';

export default class Itineraries extends React.Component
{
  render()
  {
    return (
      <>
        <HamburgerIntroHeader />
        <div className="grid-with-scrollable-left-column">
          <div className="scrollable-column-2 col-md-12 col-lg-8">

          <section id="doubt">
            <h1>Il Dubbio</h1>
            <p>Nell’itinerario che pone al centro il dubbio, si tenterà di analizzare un fenomeno che tende a dilagare nell’opera di Calvino, soprattutto a partire dagli anni Sessanta. Tormentato da un dubbio fondamentale, che riguarda la capacità delle parole di dire le cose giuste, il testo torna continuamente indietro per cancellarsi e ricominciare. Trovando nel processo di negazione, rettifica e riformulazione una paradossale ma potente spinta narrativa: la scrittura si disperde nel dubbio e nello stesso tempo si salva, perché s’inventa un modo per non finire mai. Il testo dubitativo è un testo dove a un certo punto la nebbia sale, confondendo ogni cosa: da una parte c’è la grande paura di avere sbagliato strada, dall’altra quella di non vedere più nulla. In mezzo dovremo riconoscere la prossimità che la letteratura ha con la morte, mentre cammina in bilico sul suo rovescio vuoto e contempla la cancellazione di tutto quello che riuscirà a dire. Prima ancora di averlo detto.</p>

            <div className="sheet--info">
              <ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 1" route="/Process/intro" />
              <ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 2" route="/Process/intro" />
              <ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 3" route="/Problem/intro" />
            </div>

          </section>
          <section id="space">
            <h1>Lo Spazio</h1>
            <p>
            Nell’itinerario che pone al centro lo spazio, si tenterà di analizzare i modi in cui Calvino ha usato lo spazio per parlare della realtà. E nello stesso tempo per negarla. Perché un momento dopo averla nominata, la realtà si è già trasformata in qualcos’altro. Le parole, che vorrebbero fermare le cose in un punto dello spazio, si perdono in un inseguimento senza fine. Nell’opera di Calvino lo spazio sembra avere più importanza del tempo. Tale predominanza spaziale sembra inoltre essere collegata a quella “visuale” che caratterizza la sua scrittura. In quale misura tali impressioni siano vere e quali forme prendano nel corso del tempo è ciò che dovremo riuscire a capire meglio, percorrendo questo itinerario che ci porterà nel cuore stesso dell’idea di letteratura di Calvino. Sia che racconti della Liguria biografica sia che ci trasporti nell’astrazione cosmica, infatti, Calvino ci dimostra come la letteratura sia il più sofisticato strumento che l’umanità abbia per interrogarsi sul complesso e fondamentale rapporto che la realtà intrattiene con la finzione.
            </p>

            <div className="sheet--info">
              <ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 1" route="/Process/intro" />
              <ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 2" route="/Process/intro" />
              <ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 3" route="/Problem/intro" />
            </div>

          </section>

          <section id="shape">
            <h1>La Forma</h1>
            <p>Nell’itinerario che pone al centro la forma, si tenterà di studiare i modi in cui la scrittura di Calvino si sforza di dare forma alla realtà. Se esiste una battaglia delle battaglie che la letteratura ha il dovere di combattere, come un nobile paladino dell’esercito di Carlo Magno, questa è per Calvino la battaglia contro l’informe. L’informe che ci assedia e minaccia da ogni parte. Vincerla forse è impossibile, ma bisogna continuare a provarci. In che modo? Schierando per esempio le parole in lunghe file di elenchi, che facciano argine al caos; o al contrario lo riproducano, quel caos dilagante, nel tentativo di padroneggiarlo. Oppure costruendo elaborate strutture fatte di racconti in serie, concatenati. Per Calvino, l’arma della combinazione sembra sia quella che possa salvarci dall’assedio del magma. Alla ricerca di una trama che ormai il Novecento ha messo in soffitta da tempo, Calvino sperimenta le forme narrative più varie nel corso della sua carriera letteraria. Anche se forse non erano altro che travestimenti di un’unica trama, elementare e ossessiva.</p>

            <div className="sheet--info">
              <ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 1" route="/Process/intro" />
              <ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 2" route="/Process/intro" />
              <ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 3" route="/Problem/intro" />
            </div>

          </section>
          </div>

          <div className="unscrollable-column col-md-12 col-lg-8">
            <h1>I TRE ITINERARI</h1>
            <p className="intro">
              I tre itinerari sono autonomi, ma profondamente interconnessi. Prima viene il dubbio, elevato da Calvino a strumento conoscitivo e narrativo fondamentale. Poi lo spazio, che àncora la scrittura alla realtà e insieme la sbalza nell’astrazione. Infine il tormento principale: quello della forma che l’opera deve prendere. Quale trama inventarsi per chiamare dentro il testo lettori e lettrici? Il dubbio crea lo spazio del racconto, mentre il suo plot si costruisce e si disfa davanti ai nostri occhi come una tela di Penelope. 
            </p>

          </div>
        </div>

      </>
    );
  }
}
