import React from "react"
import ArrowButton from "../../../general/ArrowButton/ArrowButton"

import "./CompassTimeHelp.css"

export default class CompassTimeHelp extends React.Component {
  render() {
    return (
      <>
        <small>TAPPA 3 </small>
        <h1>LA TRAMA</h1>
        <h2>L'opera di Italo Calvino come una trama</h2>
        <h3>Spiegazione</h3>
        <p>
          Questa visualizzazione rappresenta il corpus delle opere narrative di
          Calvino: oltre duecento testi scritti e pubblicati tra il 1943 e il
          1984.
          <br />A ogni elemento grafico corrisponde un testo, per cui l’unità
          minima della visualizzazione non sarà il volume ma il singolo testo.
          L’idea alla base di questo lavoro consiste nell’offrire un colpo
          d’occhio dell’intero corpus dell’autore, disegnando una trama che
          permetta un nuovo accesso all’opera.
        </p>
        <p>
          Di seguito scopri: come si legge, come si esplora e{" "}
          <a href="#st-insights">cosa ci può dire</a>.
        </p>
        <h3>Come si legge la trama</h3>
        <p>
          Per leggere correttamente la visualizzazione è necessario prestare
          attenzione a tre parametri:{" "}
          <em>
            la disposizione degli elementi, la loro dimensione, l’uso del colore
          </em>
          .
        </p>

        <div className="sheet--info">
          <ArrowButton
            arrowDirection="right"
            textAlign="left"
            text="TAPPA 2"
            route="/phase2-process"
          />
          <ArrowButton
            arrowDirection="right"
            textAlign="left"
            text="TAPPA 3"
            route="/phase3-problem"
          />
        </div>
      </>
    )
  }
}
