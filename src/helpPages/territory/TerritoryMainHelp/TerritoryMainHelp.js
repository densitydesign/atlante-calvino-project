
import React from 'react';
import ArrowButton from '../../../general/ArrowButton/ArrowButton';
import { Link } from 'react-router-dom';


import './TerritoryMainHelp.css';

export default class TerritoryMainHelp extends React.Component
{
  render()
  {
    return (
      <>
      <small>TAPPA 1 </small>
      <h1>IL FENOMENO</h1>
      <h2>L'opera di Italo Calvino come un territorio</h2>
      <h3>Di cosa si tratta</h3>
      <p>Questa visualizzazione rappresenta il corpus delle opere narrative di Calvino: oltre duecento testi scritti e pubblicati tra il 1943 e il 1984.<br />A ogni elemento grafico corrisponde un testo, per cui l’unità minima della
      visualizzazione non sarà il volume ma il singolo testo. L’idea alla base di questo lavoro consiste nell’offrire un colpo d’occhio dell’intero corpus dell’autore, disegnando un territorio che permetta un nuovo accesso
      all’opera.</p>
      <p>Di seguito scopri: come si legge, come si esplora e <a href="#st-insights">cosa ci può dire</a>.</p>
      <h3>Come si legge il territorio</h3>
      <p>Per leggere correttamente la visualizzazione è necessario prestare attenzione a tre parametri: <em>la disposizione degli elementi, la loro dimensione, l’uso del colore</em>.</p>

<h4>Disposizione degli elementi</h4>
<img src={process.env.PUBLIC_URL + '/territory-legend-chronology-positioning.svg'} className="img-fluid"/>
<p>Gli elementi sono posizionati sulla base di due criteri: l’appartenenza a uno stesso volume e la data di prima pubblicazione.
Questo significa che un principio di attrazione agisce sia sui testi pubblicati in uno stesso volume sia sui testi cronologicamente coevi.
Di conseguenza, osservando il territorio, è possibile riconoscere un anello esterno e alcuni gruppi di testi interni. Questi ultimi sono i testi che confluiscono in raccolte.</p>
<h4>Dimensione</h4>
<img src={process.env.PUBLIC_URL + '/territory-legend-noAnalysis-dimensione.svg'} className="img-fluid small"/>
<p>La dimensione di ogni elemento è proporzionale alla lunghezza del testo che rappresenta; a colpo d’occhio è quindi possibile individuare le opere più consistenti del corpus.</p>
<h4>Uso del colore</h4>
<img src={process.env.PUBLIC_URL + '/territory-legend-chronology-modalita.svg'} className="img-fluid"/>
<p>L’uso del colore introduce due differenti modalità esplorative: la scala cromatica che va dal verde al glicine, attiva nella modalità <em>Cronologia</em>, segnala l’ordine cronologico di prima pubblicazione di tutti i testi del corpus.</p>
<p >Selezionando invece la modalità Volumi, il colore consente di riconoscere tutti i volumi pubblicati in vita dall’autore, sia che si tratti di raccolte di racconti, sia che si tratti di altri tipi di testi.
Le raccolte di racconti sono riconoscibili con gli stessi colori anche in modalità Cronologia, attraverso l’utilizzo di alcuni contorni (metaballs).</p>

  <h3>Come si esplora il territorio</h3>
<h4>Informazioni</h4>
<img src={process.env.PUBLIC_URL + '/panel/tooltip.png'} className="big"/>
<p>Interagendo con un singolo elemento grafico appaiono il titolo, l’anno di prima pubblicazione ed eventuali pubblicazioni successive.</p>
<h4>Filtro cronologico</h4>
<img src={process.env.PUBLIC_URL + '/panel/chronological-filter.png'} className="big"/>
<p>Il filtro a comparsa, o timeline, consente di riorganizzare il corpus su una linea temporale e, se necessario, selezionare un intervallo di tempo specifico (un anno, un decennio ecc.)</p>
<h4>Cerca</h4>
<img src={process.env.PUBLIC_URL + '/panel/cerca.png'} className="big"/>
<p>Utilizzando la funzione Cerca è possibile individuare singoli testi o raccolte di racconti.</p>

<div className="sheet--info">
  <ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 2" route="/Process/intro" />
  <ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 3" route="/Problem/intro" />
</div>


      </>
    );
  }
}
