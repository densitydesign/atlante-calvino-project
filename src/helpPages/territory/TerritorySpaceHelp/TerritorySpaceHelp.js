
import React from 'react';
import ArrowButton from '../../../general/ArrowButton/ArrowButton';



import './TerritorySpaceHelp.css';

import { Link } from 'react-router-dom';

export default class TerritorySpaceHelp extends React.Component

{
  render()
  {
    return (
      <>
      <strong>Itinerario ⟶ SPAZIO</strong>
      <h1>Il fenomeno dei luoghi</h1>

      <h3>La raccolta dei dati</h3>
      <p>Per dare una prima idea di come funzioni e si distribuisca il fenomeno spaziale nell’opera di Calvino, si è deciso di differenziare le tipologie di luoghi presenti nei testi, dando loro un nome e quindi una rappresentazione visiva generale.</p>
      <p> Abbiamo individuato cinque categorie, che ci permettessero di fornire una mappatura il più possibile completa: luoghi <span style={{color: '#bbbbff'}}>cosmici generici</span> (es. <em>lo spazio</em>), <span style={{color: '#5151fc'}}>cosmici nominati</span> (es. <em>la Luna</em>), luoghi <span style={{color: '#00c19c'}}>nominati terrestri</span> (es. <em>Sanremo</em>), luoghi <span style={{color: '#ffa500'}}>generici terrestri</span> (es. <em>una vallata</em>) e luoghi <span style={{color: '#ff6c39'}}>inventati</span>(es. <em>Ombrosa</em>). Generalmente, ogni testo presenta più luoghi d’ambientazione e non sempre appartenenti alla stessa categoria. Inoltre, può capitare che un luogo d’ambientazione contenga a sua volta un altro luogo e sia dunque necessario segnalare anche il rapporto gerarchico che li contraddistingue.</p>
<h3>Il livelli di visualizzazione</h3>
<p>Al termine dell’analisi, condotta sull’intero corpus delle opere di Calvino, abbiamo creato una visualizzazione esplorabile su tre livelli: </p>
<ol><li>il primo livello, che si attiva attraverso alcuni filtri, mostra la distribuzione delle cinque differenti categorie selezionate una alla volta;</li>
<li>il secondo livello evidenzia la compresenza di categorie differenti all’interno dello stesso testo, della stessa raccolta o dello stesso periodo;</li>
<li>il terzo livello consente, una volta selezionato uno specifico testo, di conoscere nel dettaglio i nomi dei luoghi e la loro stratificazione.</li></ol>
<h3>Cosa ci dice</h3>
<p>Il risultato più evidente riguarda la distribuzione piuttosto costante nel tempo di luoghi generici e nominati terrestri, su cui si innestano alcune aree di natura diversa. Queste non sono mai totalmente autonome o isolabili; al contrario, intrattengono rapporti significativi tra loro. Per ragioni di chiarezza, nei primi due livelli si è scelto di escludere i luoghi contenuti all’interno di altri luoghi, rinunciando a eventuali rapporti di gerarchia, che sono invece ricostruibili grazie al terzo livello. </p>

<div className="sheet--info">
  <ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 2" route="/Process/intro" />
  <ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 3" route="/Problem/intro" />
</div>


      </>
    );
  }
}
