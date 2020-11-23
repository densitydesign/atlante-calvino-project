import React, { useState } from "react"
import { Tabs, Tab } from "react-bootstrap"
import { useTranslation, Trans } from "react-i18next"
import { Link } from "react-router-dom"
import IntestazioneHelpPanel from "../../../panels/HelpSidePanel/components/IntestazioneHelpPanel"
import { ReactComponent as Legend01 } from "./icons/trasformare_aspetto.svg"
import { ReactComponent as Legend02 } from "./icons/trasformare_dimensione.svg"
import { ReactComponent as Legend03 } from "./icons/trasformare_posizione.svg"
import { ReactComponent as Legend01En } from "./icons/trasformare_aspetto_en.svg"
import { ReactComponent as Legend02En } from "./icons/trasformare_dimensione_en.svg"
import { ReactComponent as Legend03En } from "./icons/trasformare_posizione_en.svg"
import Legend04 from "./icons/trasformare_interazioneGIF.gif"
import Legend04En from "./icons/trasformare_interazioneGIF_en.gif"
import "./TransformMainHelp.css"
import BadgeLegenda from "../../../panels/HelpSidePanel/components/BadgeLegenda"

export default function TransformMainHelp() {
  const [key, setKey] = useState("info")
  const { t, i18n } = useTranslation(["translation", "transform"])
  return (
    <>
      <IntestazioneHelpPanel
        tappa={2}
        linkTappa1={"/space/phase1"}
        linkTappa2={"/space/phase2"}
        linkTappa3={"/space/phase3"}
        linkItinerario={"/itineraries#space"}
        titolo={t("trasformare")}
        linkApprofondimento="/space/phase2/focus"
        nomeItinerario={t("help_panel.itinerario_spazio")}
      />
      <Tabs
        className="mt-2"
        id="info-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab
          tabClassName="tab-info"
          eventKey="info"
          title={t("help_panel.spiegazione")}
        >
          <p className="mt-3">
            <strong>{t("help_panel.di_cosa_si_tratta")}</strong>
          </p>
          <Trans i18nKey={"help_panel.di_cosa_si_tratta"} t={t} ns="transform">
            <p>
              Italo Calvino è uno degli scrittori italiani del secondo Novecento
              più sensibili alla dimensione narrativa dello spazio. Sia in senso
              orizzontale, nell’attenzione che dalla natura ligure lo conduce
              alla metropoli, passando per la città industriale italiana; sia in
              quello trasversale, che proietta il racconto in paesi e città
              immaginarie o fuori dai confini terrestri, verso spazi cosmici
              primordiali. In questo senso, mostrare tutte le ambientazioni
              della sua opera significa riflettere sul complesso rapporto di
              trasformazione della realtà rappresentata.
            </p>
          </Trans>
          <p>
            <strong>{t("help_panel.come_funziona")}</strong>
          </p>
          <Trans i18nKey={"help_panel.come_funziona"} t={t} ns="transform">
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
              cerchi non è uniforme, ma varia in rapporto al numero di luoghi
              che appartengono a una stessa ambientazione. Nel caso in cui la
              rappresentazione di un luogo includa al suo interno un altro
              luogo, quest’ultimo, da un punto di vista grafico, scompare e la
              circonferenza del primo aumenta, mettendo in evidenza la presenza
              di un contenuto nascosto. Per svelare questo contenuto interno è
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
                Contesti (guerra, natura ligure, paesaggio urbano, mare,
                fabbrica, metropoli)
              </i>{" "}
              o attraverso il <i>Filtro cronologico</i>.
            </p>
          </Trans>
          <p>
            <strong>{"help_panel.qualche_pista_di_lettura"}</strong>
          </p>
          <Trans
            i18nKey={"help_panel.qualche_pista_di_lettura"}
            t={t}
            ns="transform"
          >
            <p>
              Una prima considerazione riguarda la categoria dei luoghi
              terrestri localizzabili, che riflette con una certa precisione la
              geografia biografica dell’autore (vedi{" "}
              <Link to="/space/phase2/focus">Approfondimento</Link>
              ). La disposizione spaziale degli elementi rivela una coincidenza
              significativa con il tempo della storia: al centro dell’asse
              verticale della visualizzazione, salvo alcune eccezioni, il tempo
              della storia coincide con il momento storico in cui Calvino
              scrive; allontanandosi verso l’alto o verso il basso, questa
              corrispondenza viene meno e ci si trova catapultati all’indietro,
              in un passato recente o ai primordi del mondo. Un’ultima
              considerazione riguarda l’utilità dei filtri: selezionando l’opera
              per <i>Tipo di pubblicazione</i>, emergono differenze rilevanti: i
              romanzi esplorano maggiormente gli spazi del fantastico; invece i
              testi pubblicati in periodici e poi non più raccolti sono gli
              unici in cui l’interesse verso luoghi reali ben identificabili
              rimane abbastanza stabile nel tempo; infine, le raccolte di
              racconti si collocano nel mezzo: la spinta realista, inizialmente
              forte, a un certo punto è interrotta dalle esplorazioni cosmiche.
            </p>
          </Trans>
        </Tab>
        <Tab
          tabClassName="tab-info"
          eventKey="legenda"
          title={t("help_panel.legenda")}
        >
          <div className="row mt-2">
            <div className="col-md-6">
              <div>
                <small>{t("transform:help_panel.aspetto")}</small>
              </div>
              {i18n.language === "it" ? (
                <Legend01 width="145" className="mt-2" />
              ) : (
                <Legend01En width="145" className="mt-2" />
              )}
            </div>
            <div className="col-md-6">
              <div>
                <small>{t("help_panel.dimensione")}</small>
              </div>
              <Legend02 width="123" className="mt-2" />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-6">
              <div>
                <small>{t("transform:help_panel.posizione")}</small>
              </div>
              <Legend03 width="134" className="mt-2" />
            </div>
            <div className="col-md-6">
              <div>
                <small>{t("transform:help_panel.interazione")}</small>
              </div>
              <img src={Legend04} width="117" className="mt-2" alt="Legenda" />
              <small style={{ lineHeight: 0.5 }}>
                {t("transform:help_panel.testo_gif")}
              </small>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-12">
              <div>
                <small>{t("transform:help_panel.tipo_di_luogo")}</small>
              </div>
              <div>
                <BadgeLegenda
                  color="#FF6C39"
                  name={t("transform:help_panel.terrestri_generici")}
                />
                <BadgeLegenda
                  color="#FFA500"
                  name={t("transform:help_panel.terrestri_localizzabili")}
                />
                <BadgeLegenda
                  color="#5151FC"
                  name={t("transform:help_panel.cosmici_generici")}
                />
                <BadgeLegenda
                  color="#BBBBFF"
                  name={t("transform:help_panel.cosmici_localizzabili")}
                />
                <BadgeLegenda
                  color="#00C19C"
                  name={t("transform:help_panel.terrestri_inventati")}
                />
                <BadgeLegenda
                  color="#C6CACF"
                  name={t("transform:help_panel.nessun_luogo")}
                />
              </div>
            </div>
          </div>
        </Tab>
      </Tabs>
    </>
  )
}
