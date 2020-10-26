import React, { useState } from "react"
import { Tabs, Tab } from "react-bootstrap"
import IntestazioneHelpPanel from "../../../panels/HelpSidePanel/components/IntestazioneHelpPanel"
import { ReactComponent as Info01 } from "./icons/territorio_a_disposizione_cronologia.svg"
import { ReactComponent as Info02 } from "./icons/territorio_dimensione.svg"
import { ReactComponent as Info03 } from "./icons/territorio_a_cronologia.svg"
import { ReactComponent as Info04 } from "./icons/territorio_b_situazione_editoriale_1.svg"
import { ReactComponent as Info05 } from "./icons/territorio_b_situazione_editoriale_2.svg"
import { ReactComponent as Info06 } from "./icons/territorio_b_situazione_editoriale_3.svg"
import { ReactComponent as Info07 } from "./icons/territorio_b_situazione_editoriale_4.svg"
import BadgeLegenda from "../../../panels/HelpSidePanel/components/BadgeLegenda"

import "./TerritoryMainHelp.css"

export default function TerritoryMainHelp({ helpProps }) {
  const [key, setKey] = useState("info")

  return (
    <>
      <IntestazioneHelpPanel
        tappa={1}
        linkTappa1={"/phase1-phenomena"}
        linkTappa2={"/phase2-process"}
        linkTappa3={"/phase3-problem"}
        titolo="Esplorare l'opera come un territorio"
        nomeItinerario={"IL FENOMENO"}
      />
      <Tabs
        className="mt-2"
        id="info-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab tabClassName="tab-info" eventKey="info" title="Spiegazione">
          <p className="mt-4">
            <strong>Di cosa si tratta</strong>
          </p>
          <p>
            Questa visualizzazione, che accomuna la prima tappa di tutti e tre
            gli itinerari, rappresenta il corpus delle opere narrative di
            Calvino: oltre duecento testi scritti e pubblicati tra il 1943 e il
            1985, distribuiti secondo criteri cronologici ed editoriali. A ogni
            elemento grafico corrisponde un testo, per cui l’unità minima della
            visualizzazione non sarà il volume ma il singolo testo. All’inizio
            dell’Atlante abbiamo sentito la necessità di rappresentare l’intero
            corpus dell’autore in un solo colpo d’occhio che fornisse una nuova
            visione generale dell’opera, invitando a esplorarla.
          </p>
          <p>
            <strong>Come funziona</strong>
          </p>
          <p>
            Per leggere correttamente la visualizzazione è necessario prestare
            attenzione a tre parametri: a) la disposizione degli elementi; b) la
            loro dimensione; c) l’uso del colore.
          </p>
          <p className="text-center">
            <Info01 width='145' />
          </p>
          <p>
            a) Gli elementi sono posizionati sulla base di due criteri:
            l’appartenenza a uno stesso volume e la data di prima pubblicazione.
            Questo significa che un principio di attrazione agisce sia sui testi
            pubblicati in uno stesso volume sia sui testi cronologicamente
            coevi. Di conseguenza, osservando il territorio, è possibile
            riconoscere un anello esterno e alcuni gruppi di testi interni.
            Questi ultimi sono i testi che confluiscono in raccolte.
          </p>
          <p className="text-center">
            <Info02 width='84.5' />
          </p>
          <p>
            b) La dimensione di ogni elemento è proporzionale alla lunghezza del
            testo che rappresenta; a colpo d’occhio è quindi possibile
            individuare le opere più consistenti del corpus.
          </p>
          <div className="text-center">
            <small>CRONOLOGIA</small>
          </div>
          <p className="text-center">
            <Info03 width='220.4' className="mt-3" />
          </p>
          <p>
            c) L’uso del colore introduce due differenti modalità esplorative:
            la scala cromatica che va dal verde al viola, attiva nella modalità
            Cronologia, segnala l’ordine cronologico di prima pubblicazione di
            tutti i testi del corpus.
          </p>
          <div className="text-center">
            <small>SITUAZIONE EDITORIALE</small>
          </div>
          <p className="d-flex justify-content-center">
            <Info04 width='75.5' />
            <Info05 width='75.5' />
            <Info06 width='75.5' />
            <Info07 width='75.5' />
          </p>
          <p>
            Selezionando invece la modalità Volumi, il colore consente di
            riconoscere tutti i volumi pubblicati in vita dall’autore, sia che
            si tratti di raccolte di racconti, sia che si tratti di altri tipi
            di testi. Le raccolte di racconti sono riconoscibili con gli stessi
            colori anche in modalità Cronologia, attraverso l’utilizzo di alcune
            linee di contorno.
          </p>
          <p>
            Interagendo con un singolo elemento grafico appaiono il titolo,
            l’anno di prima pubblicazione ed eventuali pubblicazioni successive.
            Il Filtro cronologico consente di riorganizzare il corpus su una
            linea temporale e, se necessario, selezionare un intervallo di tempo
            specifico (un anno, un decennio ecc.) Utilizzando la funzione Cerca
            è possibile individuare singoli testi o raccolte di racconti.
          </p>
        </Tab>
        <Tab tabClassName="tab-info" eventKey="legenda" title="Legenda">
          <div className="row mt-4">
            <div className="col-md-4">
              <div>
                <small>DIMENSIONE</small>
              </div>
              <Info02 width='84.5' className="mt-2" />
            </div>
            <div className="offset-md-2 col-md-5">
              <div>
                <small>DISPOSIZIONE</small>
              </div>
              <Info01 width='145.5' className="mt-2" />
            </div>
          </div>
          {helpProps.helpPages.noAnalysisMode === "chronology" && (
            <div className="row mt-2">
              <div className="col-md-8">
                <div>
                  <small>CRONOLOGIA</small>
                </div>
                <Info03 width='220.4' className="mt-2" />
              </div>
            </div>
          )}
          {helpProps.helpPages.noAnalysisMode === "volumes" && (
            <>
              <div className="mt-2">
                <small>SITUAZIONE EDITORIALE</small>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <Info04 width='75.5' />
                </div>
                <div className="col-md-3">
                  <Info05 width='75.5' />
                </div>
                <div className="col-md-3">
                  <Info06 width='75.5' />
                </div>
                <div className="col-md-3">
                  <Info07 width='75.5' />
                </div>
              </div>
            </>
          )}
          {helpProps.helpPages.noAnalysisMode === "volumes" && (
            <>
              <div className="mt-2">
                <small>RACCOLTE</small>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <BadgeLegenda color="#00C19C" name="Ultimo viene il corvo" />
                  <BadgeLegenda color="#8AE297" name="L’entrata in guerra" />
                  <BadgeLegenda color="#5151FC" name="I racconti" />
                  <BadgeLegenda color="#BBBBFF" name="Marcovaldo" />
                  <BadgeLegenda color="#97DADD" name="Le Cosmicomiche" />
                </div>
                <div className="col-md-6">
                  <BadgeLegenda color="#FF3366" name="Ti con Zero" />
                  <BadgeLegenda color="#FFA500" name="La memoria del mondo" />
                  <BadgeLegenda color="#FFD337" name="Gli amori difficili" />
                  <BadgeLegenda color="#FF6C39" name="Palomar" />
                  <BadgeLegenda color="#00BFD3" name="Le Cosmicomiche vecchie e nuove" />
                </div>
              </div>
            </>
          )}
        </Tab>
      </Tabs>
    </>
  )
}
