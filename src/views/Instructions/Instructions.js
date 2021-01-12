import React from "react";
import Footer from "../../headers/Footer/Footer";
import IndexMenuHeader from "../../headers/IndexMenuHeader";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";

export default function Instructions() {
  const { t } = useTranslation("instructions");

  return (
    <div>
      <IndexMenuHeader menuAction={"openIndex"} />
      <div className="ac-grid-24">
        <Trans i18nKey="instructions_text" ns="instructions" t={t}>
          <div className="content">
            <h1>Istruzioni per l'uso</h1>
            <p>
              L’Atlante si esplora con l’aiuto di una Bussola, muovendosi lungo
              3 itinerari, che si articolano ciascuno in 3 tappe.
            </p>
            <p>
              La
              <Link to="/compass">
                <strong> Bussola </strong>
              </Link>
              consente di avere a disposizione, in ogni punto dell’Atlante, 3
              visualizzazioni di orientamento:
            </p>
            <div>
              <ol type="1">
                <li>
                  Una mappa sintetica della carriera letteraria dell’autore (
                  <Link to="compass/time-and-works">Il tempo e le opere</Link>)
                </li>
                <li>
                  La ricostruzione della vicenda editoriale di tutti i racconti
                  (
                  <Link to="compass/flows-of-stories">
                    I flussi dei racconti
                  </Link>
                  )
                </li>
                <li>
                  La rappresentazione della biblioteca mentale dello scrittore (
                  <Link to="/compass">L’arcipelago dei nomi</Link>)
                </li>
              </ol>
            </div>
            <p>
              I{" "}
              <Link to="/itineraries">
                <strong>3 itinerari</strong>
              </Link>{" "}
              che abbiamo scelto di percorrere riguardano:
            </p>
            <div>
              <ol type="1">
                <li>
                  il dubbio, considerato come uno dei grandi motori della
                  scrittura calviniana
                </li>
                <li>
                  lo spazio, che consente di esplorare l’opera attraverso una
                  mappatura dei suoi luoghi
                </li>
                <li>la forma, che pone il problema fondamentale della trama</li>
              </ol>
            </div>
            <div>
            <p>
            Ciascuno dei 3 itinerari si sviluppa in <strong>3 tappe</strong>:
            </p>
              <ol type="1">
                <li>
                  La prima tappa (<Link to="/phases#phaenomenon">fenomeno</Link>
                  ) introduce all’itinerario nel suo aspetto più concreto e
                  tangibile
                </li>
                <li>
                  La seconda tappa (<Link to="/phases#process">processo</Link>)
                  cerca di cogliere la dinamica che sta dietro a ciascuno dei
                  tre fenomeni
                </li>
                <li>
                  La terza tappa (<Link to="/phases#problem">problema</Link>)
                  indaga la questione principale che muove verso il fenomeno,
                  dando avvio al processo
                </li>
              </ol>
            </div>
            <p>
              Ogni visualizzazione presente nell’Atlante contiene una
              <strong> legenda</strong> e una <strong>spiegazione </strong>
              (articolata in tre sezioni:{" "}
              <i>Di cosa si tratta, Come si legge, Qualche pista di lettura</i>)
              che guidano la lettura e che si possono consultare sul lato destro
              della pagina.
            </p>
            <p>
              Ogni itinerario prevede <strong>3 approfondimenti</strong>, uno
              per ciascuna tappa, che consentono di addentrarsi nell’analisi di
              alcuni aspetti della ricerca emersi nelle visualizzazioni
              principali.
            </p>
            <p>
              La maggior parte della ricerca è stata svolta sull’intero
              <strong> corpus </strong>
              narrativo, basandosi sul testo stabilito nell’edizione dei{" "}
              <i>Romanzi e racconti</i>, edizione diretta da Claudio Milanini, a
              cura di Mario Barenghi e Bruno Falcetto (Milano, Mondadori, 3
              voll., 1991, 1992, 1994: d’ora in avanti <i>RR</i>, seguito dal
              volume e dal numero di pagina) di cui la casa editrice Mondadori
              ci ha consentito l’utilizzo in formato digitale per la creazione
              dei dataset necessari alle elaborazioni visive. I casi in cui la
              visualizzazione riguardi invece una selezione del corpus, sono
              esplicitamente indicati.
            </p>
            <p>
              Il lavoro è stato collettivo, ma ciascuna delle tre ricercatrici
              dell’équipe letteraria dell’Università di Ginevra si è occupata in
              particolare di uno dei tre itinerari, secondo la seguente
              ripartizione:
            </p>
            <p>
              <Link to="/itineraries#doubt">Itinerario del dubbio</Link>:
              <strong> Margherita Parigini</strong>
              <br />
              <Link to="/itineraries#space">Itinerario dello spazio</Link>:
              <strong> Virginia Giustetto</strong>
              <br />
              <Link to="/itineraries#shape">Itinerario della forma</Link>:
              <strong> Valeria Cavalloro</strong>
            </p>
            <p>
              L’Atlante è stato scritto in italiano e tradotto in inglese,
              affinché fosse disponibile in una doppia versione. I titoli delle
              opere appaiono sempre in lingua originale. Per quanto riguarda le
              citazioni, laddove non è diversamente specificato, la traduzione è
              nostra.
            </p>
          </div>
        </Trans>
      </div>
      <Footer />
    </div>
  );
}
