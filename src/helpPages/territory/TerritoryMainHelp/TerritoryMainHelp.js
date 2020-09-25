
import React from 'react';
import ArrowButton from '../../../general/ArrowButton/ArrowButton';

import './TerritoryMainHelp.css';

export default class TerritoryMainHelp extends React.Component
{
  render()
  {
    return (
      <>
      <small>TAPPA 1 </small>
      <h1>ESPLORARE L'OPERA</h1>

      <h3>Di cosa si tratta</h3>
      <p>Questa visualizzazione, che accomuna la prima tappa di tutti e tre gli itinerari, rappresenta il corpus delle opere narrative di Calvino: oltre duecento testi scritti e pubblicati tra il 1943 e il 1985, distribuiti secondo criteri cronologici ed editoriali. A ogni elemento grafico corrisponde un testo, per cui l’unità minima della visualizzazione non sarà il volume ma il singolo testo. All’inizio dell’Atlante abbiamo sentito la necessità di rappresentare l’intero corpus dell’autore in un solo colpo d’occhio che fornisse una nuova visione generale dell’opera, invitando a esplorarla.</p>

      <h3>Come funziona</h3>
      <p>Per leggere correttamente la visualizzazione è necessario prestare attenzione a tre parametri: a) la disposizione degli elementi; b) la loro dimensione; c) l’uso del colore.</p>
      <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-chronology-positioning.svg'} className="img-fluid" alt="information complement" />
      <p>a) Gli elementi sono posizionati sulla base di due criteri: l’appartenenza a uno stesso volume e la data di prima pubblicazione. Questo significa che un principio di attrazione agisce sia sui testi pubblicati in uno stesso volume sia sui testi cronologicamente coevi. Di conseguenza, osservando il territorio, è possibile riconoscere un anello esterno e alcuni gruppi di testi interni. Questi ultimi sono i testi che confluiscono in raccolte.</p>
      <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-noAnalysis-dimensione.svg'} className="img-fluid small" alt="information complement" />
      <p>b) La dimensione di ogni elemento è proporzionale alla lunghezza del testo che rappresenta; a colpo d’occhio è quindi possibile individuare le opere più consistenti del corpus.</p>
      <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-chronology-modalita.svg'} className="img-fluid" alt="information complement" />
      <p>c) L’uso del colore introduce due differenti modalità esplorative: la scala cromatica che va dal verde al viola, attiva nella modalità <em>Cronologia</em>, segnala l’ordine cronologico di prima pubblicazione di tutti i testi del corpus. Selezionando invece la modalità <em>Volumi</em>, il colore consente di riconoscere tutti i volumi pubblicati in vita dall’autore, sia che si tratti di raccolte di racconti, sia che si tratti di altri tipi di testi. Le raccolte di racconti sono riconoscibili con gli stessi colori anche in modalità <em>Cronologia</em>, attraverso l’utilizzo di alcune linee di contorno.</p>
      <img src={process.env.PUBLIC_URL + '/panel/tooltip.png'} className="big" alt="information complement" />
      <p>Interagendo con un singolo elemento grafico appaiono il titolo, l’anno di prima pubblicazione ed eventuali pubblicazioni successive.</p>
      <img src={process.env.PUBLIC_URL + '/panel/chronological-filter.png'} className="big" alt="information complement" />
      <p>Il Filtro cronologico consente di riorganizzare il corpus su una linea temporale e, se necessario, selezionare un intervallo di tempo specifico (un anno, un decennio ecc.).</p>
       <img src={process.env.PUBLIC_URL + '/panel/cerca.png'} className="big" alt="information complement" />
      <p>Utilizzando la funzione Cerca è possibile individuare singoli testi o raccolte di racconti.</p>


  <h3>Qualche pista di lettura</h3>
  <p>Il territorio può essere esplorato da vari punti di vista, in modo da sfruttare la sua capacità di sollecitare spunti di ricerca inediti come la prospettiva che presenta. Un esempio sono le tre <em>Analisi dei fenomeni</em> qui proposte, che elaborano la struttura di partenza del territorio in base a tre diverse interrogazioni.</p>


<div className="sheet--info">
  <ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 2" route="/Process/intro" />
  <ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 3" route="/Problem/intro" />
</div>


      </>
    );
  }
}
