
import React from 'react';
import ArrowButton from '../../../general/ArrowButton/ArrowButton';

import './TransformMainHelp.css';

export default class TransformMainHelp extends React.Component
{
  render()
  {
    return (
      <>
      <small>TAPPA 2 </small>
      <h1>TRASFORMARE</h1>
      <h2>L'opera di Italo Calvino come un trasformare</h2>
      <h3>Di cosa si tratta</h3>
      <p>Questa visualizzazione rappresenta il corpus delle opere narrative di Calvino: oltre duecento testi scritti e pubblicati tra il 1943 e il 1984.<br />A ogni elemento grafico corrisponde un testo, per cui l’unità minima della
      visualizzazione non sarà il volume ma il singolo testo. L’idea alla base di questo lavoro consiste nell’offrire un colpo d’occhio dell’intero corpus dell’autore, disegnando un trasformare che permetta un nuovo accesso
      all’opera.</p>
      <p>Di seguito scopri: come si legge, come si esplora e <a href="#st-insights">cosa ci può dire</a>.</p>
      <h3>Come si legge il trasformare</h3>
      <p>Per leggere correttamente la visualizzazione è necessario prestare attenzione a tre parametri: <em>la disposizione degli elementi, la loro dimensione, l’uso del colore</em>.</p>

<h4>Disposizione degli elementi</h4>
<p>Gli elementi sono posizionati sulla base di due criteri: l’appartenenza a uno stesso volume e la data di prima pubblicazione.
Questo significa che un principio di attrazione agisce sia sui testi pubblicati in uno stesso volume sia sui testi cronologicamente coevi.
Di conseguenza, osservando il trasformare, è possibile riconoscere un anello esterno e alcuni gruppi di testi interni. Questi ultimi sono i testi che confluiscono in raccolte.</p>
<h4>Dimensione</h4>
<p>La dimensione di ogni elemento è proporzionale alla lunghezza del testo che rappresenta; a colpo d’occhio è quindi possibile individuare le opere più consistenti del corpus.</p>
<h4>Uso del colore</h4>
<p>L’uso del colore introduce due differenti modalità esplorative: la scala cromatica che va dal verde al glicine, attiva nella modalità <em>Cronologia</em>, segnala l’ordine cronologico di prima pubblicazione di tutti i testi del corpus.</p>
<p >Selezionando invece la modalità Volumi, il colore consente di riconoscere tutti i volumi pubblicati in vita dall’autore, sia che si tratti di raccolte di racconti, sia che si tratti di altri tipi di testi.
Le raccolte di racconti sono riconoscibili con gli stessi colori anche in modalità Cronologia, attraverso l’utilizzo di alcuni contorni (metaballs).</p>

  <h3>Come si esplora il trasformare</h3>
<h4>Informazioni</h4>
<img src={process.env.PUBLIC_URL + '/panel/tooltip.png'} className="big" alt="information complement" />
<p>Interagendo con un singolo elemento grafico appaiono il titolo, l’anno di prima pubblicazione ed eventuali pubblicazioni successive.</p>
<h4>Filtro cronologico</h4>
<img src={process.env.PUBLIC_URL + '/panel/chronological-filter.png'} className="big" alt="information complement" />
<p>Il filtro a comparsa, o timeline, consente di riorganizzare il corpus su una linea temporale e, se necessario, selezionare un intervallo di tempo specifico (un anno, un decennio ecc.)</p>
<h4>Cerca</h4>
<img src={process.env.PUBLIC_URL + '/panel/cerca.png'} className="big" alt="information complement" />
<p>Utilizzando la funzione Cerca è possibile individuare singoli testi o raccolte di racconti.</p>

<div className="sheet--info">
  <ArrowButton arrowDirection="left" textAlign="right" text="TAPPA 1" route="/Phenomena/territory/spaceAnalysis" />
    <ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 3" route="/Problem/intro" />
</div>
      </>

    );
  }
}
