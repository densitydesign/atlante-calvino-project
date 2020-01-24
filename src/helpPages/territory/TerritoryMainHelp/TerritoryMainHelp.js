
import React from 'react';

import './TerritoryMainHelp.css';

export default class TerritoryMainHelp extends React.Component
{
  render()
  {
    return (
      <div className = "help-side-panel">
      <strong>TAPPA 1 </strong>
      <h1>IL FENOMENO</h1>
      <h3>L'opera di Italo Calvino come un territorio</h3>
      <p>Questa visualizzazione rappresenta il corpus delle opere narrative di Calvino: oltre duecento testi scritti e pubblicati tra il 1943 e il 1984.
A ogni elemento grafico corrisponde un testo, per cui l’unità minima della visualizzazione non sarà il volume ma il singolo testo. L’idea alla base di questo lavoro consiste nell’offrire un colpo d’occhio dell’intero corpus dell’autore, disegnando un territorio che permetta un nuovo accesso all’opera.</p>

<h4>Come si legge il territorio</h4>
<p>Per leggere correttamente la visualizzazione è necessario prestare attenzione a tre parametri: la disposizione degli elementi, la loro dimensione, l’uso del colore.</p>

<h4>Disposizione degli elementi</h4>
<p>Gli elementi sono posizionati sulla base di due criteri: l’appartenenza a uno stesso volume e la data di prima pubblicazione. Questo significa che un principio di attrazione agisce sia sui testi pubblicati in uno stesso volume sia sui testi cronologicamente coevi.
Di conseguenza, osservando il territorio, è possibile riconoscere un anello esterno e alcuni gruppi di testi interni. Questi ultimi sono i testi che confluiscono in raccolte.</p>
<h4>Dimensione</h4>
<p>La dimensione di ogni elemento è proporzionale alla lunghezza del testo che rappresenta; a colpo d’occhio è quindi possibile individuare le opere più consistenti del corpus.</p>
<h4>Uso del colore</h4>
<p>L’uso del colore introduce due differenti modalità esplorative: la scala cromatica che va dall’arancione al grigio, attiva nella modalità Cronologia, segnala l’ordine cronologico di prima pubblicazione di tutti i testi del corpus.
Selezionando invece la modalità Volumi, il colore consente di riconoscere tutti i volumi pubblicati in vita dall’autore,
sia che si tratti di raccolte di racconti, sia che si tratti di altri tipi di testi. Le raccolte di racconti sono riconoscibili con gli stessi colori anche in modalità Cronologia,
attraverso l’utilizzo di alcuni contorni (metaballs).</p>

<h4>Informazioni</h4>
<p>Interagendo con un singolo elemento grafico appaiono il titolo, l’anno di prima pubblicazione ed eventuali pubblicazioni successive.</p>
<h5>Posiziona il cursore su un elemento per mostrare le informazioni corrispondenti.</h5>
<h5>Clicca filtro cronologico per mostrare il filtro.</h5>
<h5>Cerca: utilizzando la funzione Cerca è possibile individuare singoli testi o raccolte di racconti.</h5>
<h5>Clicca cerca per attivare la barra di ricerca</h5>
<h5>Zoom: utilizzando la scrollwheel o il pinchzoom è possibile vedere da vicino una porzione del territorio.</h5>
</div>
    );
  }
}
