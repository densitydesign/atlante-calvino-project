import React, { useState } from "react"
import { Tabs, Tab } from "react-bootstrap"
import { Link } from "react-router-dom"
import IntestazioneHelpPanel from "../../../panels/HelpSidePanel/components/IntestazioneHelpPanel"
import { ReactComponent as Legend01 } from "./icons/trasformare_aspetto.svg"
import { ReactComponent as Legend02 } from "./icons/trasformare_dimensione.svg"
import { ReactComponent as Legend03 } from "./icons/trasformare_posizione.svg"
import Legend04 from "./icons/trasformare_interazioneGIF.gif"
import "./TransformMainHelp.css"
import BadgeLegenda from "../../../panels/HelpSidePanel/components/BadgeLegenda"

export default function TransformMainHelp() {
  const [key, setKey] = useState("info")
  return (
    <>
      <IntestazioneHelpPanel
        tappa={2}
        linkTappa1={"/space/phase1"}
        linkTappa2={"/space/phase2"}
        linkTappa3={"/space/phase3"}
        linkItinerario={"/itineraries#space"}
        titolo="Trasformare"
        linkApprofondimento="/space/phase2/focus"
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
            Italo Calvino è uno degli scrittori italiani del secondo Novecento
            più sensibili alla dimensione narrativa dello spazio. Sia in senso
            orizzontale, nell’attenzione che dalla natura ligure lo conduce alla
            metropoli, passando per la città industriale italiana; sia in quello
            trasversale, che proietta il racconto in paesi e città immaginarie o
            fuori dai confini terrestri, verso spazi cosmici primordiali. In
            questo senso, mostrare tutte le ambientazioni della sua opera
            significa riflettere sul complesso rapporto di trasformazione della
            realtà rappresentata.
          </p>
          <p>
            <strong>Come funziona</strong>
          </p>
          <p>
            I luoghi sono raccolti in categorie, secondo il loro rapporto di
            aderenza alla realtà. Le categorie scelte, distribuite sull’asse
            verticale, sono quelle già presenti nella prima tappa:{" "}
            <span style={{ color: "#5151FC" }}>cosmici generici</span>,{" "}
            <span style={{ color: "#BBBBFF" }}>cosmici localizzabili</span>,
            <span style={{ color: "#FFA500" }}>terrestri localizzabili</span>,
            <span style={{ color: "#FF6C39" }}>terrestri generici</span>,
            <span style={{ color: "#00C19C" }}>terrestri inventati</span>,
            <span style={{ color: "#C6CACF" }}>nessun luogo</span>. Tutte le
            ambientazioni sono rappresentate da un cerchio. La dimensione dei
            cerchi non è uniforme, ma varia in rapporto al numero di luoghi che
            appartengono a una stessa ambientazione. Nel caso in cui la
            rappresentazione di un luogo includa al suo interno un altro luogo,
            quest’ultimo, da un punto di vista grafico, scompare e la
            circonferenza del primo aumenta, mettendo in evidenza la presenza di
            un contenuto nascosto. Per svelare questo contenuto interno è
            sufficiente selezionare e aprire il cerchio “contenitore”. È
            possibile attivare o disattivare un ampio numero di filtri, che
            permettono di trasformare il campo della ricerca, osservandolo da
            prospettive differenti. I risultati possono essere filtrati per
            categoria, per{" "}
            <i>
              Tipo di pubblicazione (romanzo, raccolta di racconti, periodico)
            </i>
            , per{" "}
            <i>
              Contesti (guerra, natura ligure, paesaggio urbano, mare, fabbrica,
              metropoli)
            </i>{" "}
            o attraverso il <i>Filtro cronologico</i>.
          </p>
          <p>
            <strong>Qualche pista di lettura</strong>
          </p>
          <p>
            Una prima considerazione riguarda la categoria dei luoghi terrestri
            localizzabili, che riflette con una certa precisione la geografia
            biografica dell’autore (vedi{" "}
            <Link to="/space/phase2/focus">Approfondimento</Link>
            ). La disposizione spaziale degli elementi rivela una coincidenza
            significativa con il tempo della storia: al centro dell’asse
            verticale della visualizzazione, salvo alcune eccezioni, il tempo
            della storia coincide con il momento storico in cui Calvino scrive;
            allontanandosi verso l’alto o verso il basso, questa corrispondenza
            viene meno e ci si trova catapultati all’indietro, in un passato
            recente o ai primordi del mondo. Un’ultima considerazione riguarda
            l’utilità dei filtri: selezionando l’opera per{" "}
            <i>Tipo di pubblicazione</i>, emergono differenze rilevanti: i
            romanzi esplorano maggiormente gli spazi del fantastico; invece i
            testi pubblicati in periodici e poi non più raccolti sono gli unici
            in cui l’interesse verso luoghi reali ben identificabili rimane
            abbastanza stabile nel tempo; infine, le raccolte di racconti si
            collocano nel mezzo: la spinta realista, inizialmente forte, a un
            certo punto è interrotta dalle esplorazioni cosmiche.
          </p>
        </Tab>
        <Tab tabClassName="tab-info" eventKey="legenda" title="Legenda">
          <div className="row mt-2">
            <div className="col-md-6">
              <div>
                <small>ASPETTO</small>
              </div>
              <Legend01 width="145" className="mt-2" />
            </div>
            <div className="col-md-6">
              <div>
                <small>DIMENSIONE</small>
              </div>
              <Legend02 width="123" className="mt-2" />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-6">
              <div>
                <small>POSIZIONE</small>
              </div>
              <Legend03 width="134" className="mt-2" />
            </div>
            <div className="col-md-6">
              <div>
                <small>INTERAZIONE</small>
              </div>
              <img src={Legend04} width="117" className="mt-2" alt="Legenda" />
              <small style={{ lineHeight: 0.5 }}>
                Facendo doppio click sull’elemento grafico compaiono i luoghi
                contenuti all’interno
              </small>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-12">
              <div>
                <small>TIPO DI LUOGO</small>
              </div>
              <div>
                <BadgeLegenda color="#FF6C39" name="Terrestri generici" />
                <BadgeLegenda color="#FFA500" name="Terrestri localizzabili" />
                <BadgeLegenda color="#5151FC" name="Cosmici generici" />
                <BadgeLegenda color="#BBBBFF" name="Cosmici localizzabili" />
                <BadgeLegenda color="#00C19C" name="Terrestri inventati" />
                <BadgeLegenda color="#C6CACF" name="Nessun luogo" />
              </div>
            </div>
          </div>
        </Tab>
      </Tabs>
    </>
  )
}
