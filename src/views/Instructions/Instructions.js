import React from "react"
import Footer from "../../headers/Footer/Footer"
import IndexMenuHeader from "../../headers/IndexMenuHeader"

export default function Instructions() {
  return (
    <div>
      <IndexMenuHeader menuAction={"openIndex"} />
      <div className="ac-grid-24">
        <div className="content">
          <h1>Istruzioni per l'uso</h1>
          <h2>Elementi che compongono l’Atlante</h2>
          <p>
            L’Atlante si esplora con l’aiuto di una Bussola, muovendosi lungo 3
            itinerari, che si articolano ciascuno in 3 tappe.
          </p>
          <p>
            La <strong>Bussola</strong> consente di avere a disposizione, in
            ogni punto dell’Atlante, 3 visualizzazioni di orientamento:
          </p>
          <div>
            <ol type="1">
              <li>
                una mappa sintetica della carriera letteraria dell’autore (Il
                tempo e le opere)
              </li>
              <li>
                la ricostruzione della vicenda editoriale di tutti i racconti (I
                flussi dei racconti)
              </li>
              <li>
                la rappresentazione della biblioteca mentale dello scrittore
                (L’arcipelago dei nomi)
              </li>
            </ol>
          </div>
          <p>
            I <strong>3 itinerari</strong> che abbiamo scelto di percorrere
            riguardano:
          </p>
          <div>
            <ol type="1">
              <li>
                la prima tappa (fenomeno) introduce all’itinerario nel suo
                aspetto più concreto e tangibile
              </li>
              <li>
                la seconda tappa (processo) cerca di cogliere la dinamica che
                sta dietro a ciascuno dei tre fenomeni
              </li>
              <li>
                la terza tappa (problema) indaga la questione principale che
                muove verso il fenomeno, dando avvio al processo
              </li>
            </ol>
          </div>
          <p>
            Ogni visualizzazione presente nell’Atlante contiene una{" "}
            <strong>legenda</strong> e una <strong>spiegazione</strong>{" "}
            (articolata in tre sezioni:{" "}
            <i>Di cosa si tratta, Come si legge, Qualche pista di lettura</i>)
            che guidano la lettura e che si possono consultare sul lato destro
            della pagina.
          </p>
          <p>
            Ogni itinerario prevede <strong>3 approfondimenti</strong>, uno per
            ciascuna tappa, che consentono di addentrarsi nell’analisi di alcuni
            aspetti della ricerca emersi nelle visualizzazioni principali.
          </p>
          <p>
            La maggior parte della ricerca è stata svolta sull’intero{" "}
            <strong>corpus</strong>
            narrativo, basandosi sul testo stabilito nell’edizione dei{" "}
            <i>Romanzi e racconti</i>, edizione diretta da Claudio Milanini, a
            cura di Mario Barenghi e Bruno Falcetto (3 voll., 1991, 1992, 1994:
            d’ora in avanti RR, seguito dal volume e dal numero di pagina) di
            cui la casa editrice Mondadori ci ha consentito l’utilizzo in
            formato digitale per la creazione dei dataset necessari alle
            elaborazioni visive. I casi in cui la visualizzazione riguardi
            invece una selezione del corpus, sono esplicitamente indicati.
          </p>
          <p>
            {" "}
            Il lavoro è stato collettivo, ma ciascuna delle tre ricercatrici
            dell’équipe letteraria dell’Università di Ginevra si è occupata in
            particolare di uno dei tre itinerari, secondo la seguente
            ripartizione:z
          </p>
          <p>
            {" "}
            itinerario del dubbio: <strong>Margherita Parigini</strong>
            <br />
            itinerario dello spazio: <strong>Virginia Giustetto</strong>
            <br />
            itinerario della forma: <strong>Valeria Cavalloro</strong>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
