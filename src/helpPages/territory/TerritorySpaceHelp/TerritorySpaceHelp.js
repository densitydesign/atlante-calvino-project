import React, { useState } from "react"
import { Tabs, Tab } from "react-bootstrap"
import IntestazioneHelpPanel from "../../../panels/HelpSidePanel/components/IntestazioneHelpPanel"
import { Link } from "react-router-dom"
import "./TerritorySpaceHelp.css"
import { ReactComponent as Analisi01 } from "./icons/analisi_disposizione.svg"
import { ReactComponent as Analisi02 } from "./icons/analisi_dimensione.svg"
import { ReactComponent as LegendaProporzione } from "./icons/luoghi_b_proporzione.svg"
import { ReactComponent as LegendaLivelli } from "./icons/luoghi_c_livelli.svg"
import BadgeLegenda from "../../../panels/HelpSidePanel/components/BadgeLegenda"
import FrequenzaLegenda from "../../../panels/HelpSidePanel/components/FrequenzaLegenda"

export default function TerritorySpaceHelp({ helpProps }) {
  const [key, setKey] = useState("info")
  return (
    <>
      <IntestazioneHelpPanel
        tappa={1}
        linkTappa1={"/space/phase1"}
        linkTappa2={"/space/phase2"}
        linkItinerario={"/itineraries#space"}
        linkTappa3={"/space/phase3"}
        titolo="Luoghi"
        linkApprofondimento="/space/phase1/focus"
        nomeItinerario={"ITINERARIO SPAZIO"}
      />
      <Tabs
        className="mt-2"
        id="info-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab tabClassName="tab-info" eventKey="info" title="Spiegazione">
          <p className="mt-3">
            <strong>Di cosa si tratta</strong>
          </p>
          <p>
            Perché i luoghi? Perché Calvino è un autore che dà molto rilievo
            alla dimensione narrativa dello spazio. Esplorare il corpus
            dell’opera narrativa di Italo Calvino attraverso la mappatura di
            tutti i suoi luoghi permette di comprendere come lo scrittore abbia
            usato lo spazio per parlare della realtà nelle sue molteplici forme.
            I luoghi presi in esame sono quelli d’ambientazione, vale a dire i
            luoghi in cui si sviluppa l’azione, in presenza dei personaggi. Sono
            esclusi i luoghi di cui si parla in quanto ricordi passati, mete
            future o desiderate, così come quelli soltanto menzionati, privi di
            significato ai fini della trama.
          </p>
          <p>
            <strong>Come funziona</strong>
          </p>
          <p>
            Rielaborando alcuni modelli teorici sulle categorie spaziali
            letterarie ideati all’inizio degli anni Duemila, a ogni luogo
            d’ambientazione, sulla base del rapporto di aderenza alla realtà, è
            stata assegnata una categoria. Le categorie scelte sono cinque:
            luoghi <span style={{ color: "#bbbbff" }}>cosmici generici</span>{" "}
            (es. lo “spazio” o le “galassie”), luoghi{" "}
            <span style={{ color: "#5151fc" }}>cosmici localizzabili</span> (es.
            la “Luna” o il pianeta “Terra”), luoghi{" "}
            <span style={{ color: "#00c19c" }}>terrestri localizzabili</span>{" "}
            (es. “Sanremo” o “Parigi”), luoghi{" "}
            <span style={{ color: "#ffa500" }}>terrestri generici</span> (es.
            una “città” o una “vallata”) e luoghi luoghi{" "}
            <span style={{ color: "#ff6c39" }}>terrestri inventati</span> (es.
            il paese di “Ombrosa” o una delle cinquantacinque città invisibili).
            A queste se ne aggiunge, <em>ex negativo</em>, una sesta, che
            accoglie al suo interno i testi dell’autore privi di luoghi di
            ambientazione.
          </p>
          <p>
            Ogni testo può presentare più luoghi d’ambientazione, non per forza
            appartenenti alla medesima categoria. Può inoltre capitare che di un
            luogo d’ambientazione si conoscano anche ambientazioni più
            specifiche interne (es. <em>Il barone rampante</em> è ambientato nel
            paese di Ombrosa; tuttavia, a seconda della scena, gli eventi si
            svolgono nelle stanze della villa della famiglia, su uno dei tanti
            alberi abitati da Cosimo, nel giardino dei D’Ondariva e così via) e
            sia necessario tenere conto del rapporto di dipendenza che li
            contraddistingue.
          </p>
          <p>
            Sulla base di queste caratteristiche è possibile esplorare la
            visualizzazione in tre modalità.
          </p>
          <p>
            <em>Tipo di luogo</em> permette di filtrare il territorio
            selezionando le categorie una alla volta.
          </p>
          <p>
            <em>Proporzione</em> evidenzia la compresenza di categorie
            differenti all’interno di uno stesso testo (escludendo però tutti i
            luoghi interni ad altri luoghi).
          </p>
          <p>
            <em>Livelli spaziali</em> consente di ricostruire i rapporti di
            dipendenza tra i luoghi di uno stesso testo, mostrando anche la loro
            denominazione.
          </p>
          <p>
            <strong>Qualche pista di lettura</strong>
          </p>
          <p>
            Alcune categorie sono circoscritte a periodi specifici e altre, come
            i luoghi terrestri localizzabili e i luoghi inventati, sono
            distribuite in modo uniforme. Il fatto che i luoghi terrestri
            localizzabili, che sono in prevalenza legati a testi di stampo
            realista, siano stabili nel tempo, sembra smentire l’idea vulgata di
            un autore che sia stato fondamentalmente “realista” soltanto nella
            prima parte della sua carriera.
          </p>
          <p>
            Attraverso i <em>Livelli spaziali</em> è possibile notare come i
            luoghi d’invenzione, maggiormente concentrati nell’anello esterno
            del territorio, siano spesso incorniciati all’interno di luoghi
            terrestri localizzabili. Inoltre, in Calvino, l’invenzione prende
            forma non soltanto all’interno di spazi noti ma in molti casi anche
            familiari (vedi{" "}
            <strong>
              <Link to="/space/phase1/focus">Approfondimento</Link>
            </strong>
            ).
          </p>
          <p>
            L’assenza di ambientazione è quasi esclusivamente concentrata in
            testi brevi, scritti nell’ultimo decennio, testimoniando il
            progressivo orientarsi dell’autore verso narrazioni in cui
            l’interesse per l’azione decade e viceversa cresce quello verso una
            prosa di tipo saggistico.
          </p>
        </Tab>
        <Tab tabClassName="tab-info" eventKey="legenda" title="Legenda">
          <div className="row mt-3">
            <div className="col-md-6">
              <div>
                <small>DISPOSIZIONE</small>
              </div>
              <Analisi01 width='119' className="mt-2" />
            </div>
            <div className="col-md-6">
              <div>
                <small>DIMENSIONE</small>
              </div>
              <Analisi02 width='70' className="mt-2" />
            </div>
          </div>
          {(helpProps.helpPages.spaceAnalysisMode === "genericTerrestrial" ||
            helpProps.helpPages.spaceAnalysisMode === "genericCosmic" ||
            helpProps.helpPages.spaceAnalysisMode === "invented" ||
            helpProps.helpPages.spaceAnalysisMode === "namedCosmic" ||
            helpProps.helpPages.spaceAnalysisMode === "namedTerrestrial" ||
            helpProps.helpPages.spaceAnalysisMode === "noSetting") && (
            <div className="row mt-2">
              <div className="col-md-6">
                <div>
                  <small>TIPO DI FENOMENO</small>
                </div>
                <div>
                  <BadgeLegenda color="#FF6C39" name="Terrestri generici" />
                  <BadgeLegenda
                    color="#FFA500"
                    name="Terrestri localizzabili"
                  />
                  <BadgeLegenda color="#5151FC" name="Cosmici generici" />
                  <BadgeLegenda color="#BBBBFF" name="Cosmici localizzabili" />
                  <BadgeLegenda color="#00C19C" name="Terrestri inventati" />
                  <BadgeLegenda color="#C6CACF" name="Nessun luogo" />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <small>FREQUENZA</small>
                </div>
                <div>
                  <FrequenzaLegenda color="#FF6C39" />
                  <FrequenzaLegenda color="#FFA500" />
                  <FrequenzaLegenda color="#5151FC" />
                  <FrequenzaLegenda color="#BBBBFF" />
                  <FrequenzaLegenda color="#00C19C" />
                  <FrequenzaLegenda color="#C6CACF" isLast={true} />
                </div>
              </div>
            </div>
          )}
          {helpProps.helpPages.spaceAnalysisMode === "space_proportion" && (
            <div className="row mt-2">
              <div className="col-md-6">
                <div>
                  <small>TIPO DI FENOMENO</small>
                </div>
                <div>
                  <BadgeLegenda color="#FF6C39" name="Terrestri generici" />
                  <BadgeLegenda
                    color="#FFA500"
                    name="Terrestri localizzabili"
                  />
                  <BadgeLegenda color="#5151FC" name="Cosmici generici" />
                  <BadgeLegenda color="#BBBBFF" name="Cosmici localizzabili" />
                  <BadgeLegenda color="#00C19C" name="Terrestri inventati" />
                  <BadgeLegenda color="#C6CACF" name="Nessun luogo" />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <small>PROPORZIONE</small>
                </div>
                <div>
                  <LegendaProporzione width='119' />
                </div>
              </div>
            </div>
          )}
          {helpProps.helpPages.spaceAnalysisMode === "placeHierarchies" && (
            <div className="row mt-2">
              <div className="col-md-6">
                <div>
                  <small>TIPO DI FENOMENO</small>
                </div>
                <div>
                  <BadgeLegenda color="#FF6C39" name="Terrestri generici" />
                  <BadgeLegenda
                    color="#FFA500"
                    name="Terrestri localizzabili"
                  />
                  <BadgeLegenda color="#5151FC" name="Cosmici generici" />
                  <BadgeLegenda color="#BBBBFF" name="Cosmici localizzabili" />
                  <BadgeLegenda color="#00C19C" name="Terrestri inventati" />
                  <BadgeLegenda color="#C6CACF" name="Nessun luogo" />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <small>LIVELLI SPAZIALI</small>
                </div>
                <div>
                  <LegendaLivelli width="137" />
                </div>
              </div>
            </div>
          )}
        </Tab>
      </Tabs>
    </>
  )
}
