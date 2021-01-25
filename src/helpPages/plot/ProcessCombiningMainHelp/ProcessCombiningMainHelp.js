import React, { useState } from "react"
import { Tabs, Tab } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useTranslation, Trans } from "react-i18next"
import BadgeLegenda from "../../../panels/HelpSidePanel/components/BadgeLegenda"
import IntestazioneHelpPanel from "../../../panels/HelpSidePanel/components/IntestazioneHelpPanel"
import { ReactComponent as Legend01 } from "./icons/combinare_disposizione_posizione.svg"
import { ReactComponent as Legend01En } from "./icons/combinare_disposizione_posizione_en.svg"

import "./ProcessCombiningMainHelp.css"

export default function ProcessCombiningMainHelp() {
  const [key, setKey] = useState("info")
  const { t, i18n } = useTranslation(["translation", "combining"])
  return (
    <>
      <IntestazioneHelpPanel
        tappa={2}
        linkTappa1={"/form/phase1"}
        linkTappa2={"/form/phase2"}
        linkTappa3={"/form/phase3"}
        linkItinerario={"/itineraries#form"}
        linkApprofondimento={"/form/phase2/focus"}
        titolo={t("combinare")}
        nomeItinerario={t("combining:help_panel.itinerario_forma")}
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
          <Trans i18nKey={"help_panel.di_cosa_si_tratta"} t={t} ns="combining">
            <p>
              La visualizzazione rappresenta le dinamiche combinatorie nei
              volumi del corpus. Ogni volume di narrativa pubblicato in vita da
              Calvino è rappresentato da una colonna il cui spessore corrisponde
              alla lunghezza in caratteri. Ogni colonna è divisa in segmenti che
              mostrano l’organizzazione strutturale del contenuto in tre piani
              fondamentali: il piano{" "}
              <span style={{ color: "#00C19C" }}>esteriore</span> (che riunisce
              le azioni dei personaggi e gli eventi del mondo fisico), il piano{" "}
              <span style={{ color: "#5151FC" }}>interiore</span> (che riunisce
              sentimenti, pensieri e stati d’animo), il piano{" "}
              <span style={{ color: "#FFA500" }}>formale</span> (che riunisce
              cornici, inserti metaletterari, e strutture paratestuali).
            </p>
          </Trans>
          <p>
            <strong>{t("help_panel.come_funziona")}</strong>
          </p>
          <Trans i18nKey={"help_panel.come_funziona"} t={t} ns="combining">
            <p>
              La visualizzazione è organizzata su diversi livelli di
              approfondimento progressivo.<br /><br /><br /><br />
              In primo luogo, la segmentazione
              delle colonne mostra la struttura di superficie dei volumi:
              l’ampiezza e la disposizione dei tre tipi di segmenti colorati,
              che possono essere visualizzati in modo <i>Aggregato</i> o{" "}
              <i>Non aggregato</i>, rappresenta la modalità che Calvino sceglie
              per costruire lo scheletro portante dei propri volumi (ad esempio
              alternando scene del mondo esterno e parentesi di interiorità,
              oppure ponendo il lettore davanti a indici stratificati e soglie
              metaletterarie, o ancora con una combinazione di tutte le
              possibilità).<br /><br /><br /><br />
              Selezionando il filtro <i>Piani/Sequenze</i> si
              passa alla struttura intermedia: in questa configurazione la
              visualizzazione permette di vedere le sequenze narrative
              particolari che compongono i tre piani di superficie, rivelando
              più in dettaglio quali sono i blocchi ricorrenti delle narrazioni
              calviniane e come si distribuiscono all’interno dei volumi e nel
              corso del tempo.<br /><br />
              Cliccando su una specifica colonna, infine, si
              accede alla struttura di profondità: il volume selezionato si apre
              per rivelare tutti i livelli interni alle sequenze, esponendo la
              stratificazione dei singoli motivi che si annidano l’uno
              nell’altro nella geometria a scatole cinesi tipica della scrittura
              calviniana (esplorabili con un cursore che permette inoltre di
              evidenziare l’eventuale presenza di serie perfettamente identiche
              in altri volumi del corpus). Selezionando una o più delle sequenze
              elencate a margine, si possono inoltre isolare graficamente i
              segmenti che le rappresentano su tutti i livelli, così da poter
              misurare a colpo d’occhio la loro quantità nel volume, la loro
              frequenza relativa, e le loro interazioni reciproche. Attraverso
              il filtro <i>Livelli</i> è infine possibile restringere la
              visualizzazione in base al numero di annidamenti, isolando sullo
              schermo i volumi che hanno la stessa complessità strutturale, per
              confrontare più agevolmente le strategie compositive ricorrenti di
              Calvino.
            </p>
          </Trans>
          <p>
            <strong>{t("help_panel.qualche_pista_di_lettura")}</strong>
          </p>
          <Trans
            i18nKey={"help_panel.qualche_pista_di_lettura"}
            t={t}
            ns="combining"
          >
            <p>
              Nel complesso la visualizzazione offre una sintesi visiva delle
              abitudini compositive di Calvino, che tende a costruire i suoi
              testi secondo un procedimento modulare, in cui una quantità
              limitata di elementi narrativi viene continuamente riciclata e
              ricombinata in formule nuove ma imparentate da un’aria familiare.
              Rappresentando graficamente le varie stratificazioni strutturali
              permette di osservare la crescente passione dell’autore per il
              gioco a esibire costruzioni sempre più complesse, che legano
              precisione matematica (come gli indici di <i>Palomar</i>,
              raggruppati in terzetti esponenziali) e variazioni calcolate (come
              nella raccolta <i>Cosmicomiche vecchie e nuove</i>, che
              ridispone in raggruppamenti nuovi i racconti già usciti nelle
              raccolte precedenti), e passano da esperimenti di minimalismo
              estremo come il livello unico delle <i>Città invisibili</i> a formule
              caotiche come la struttura composita di{" "}
              <i>Se una notte d’inverno un viaggiatore</i>. Ma, in modo più
              sottile, consente anche di ritrovare tracce di pratica
              combinatoria e una forte attenzione al calcolo degli equilibri
              strutturali in opere solitamente considerate “tradizionali” come i
              racconti realistici composti tra gli anni Cinquanta e Sessanta
              (vedi <Link to="/form/phase2/focus">Approfondimento</Link>).
            </p>
          </Trans>
        </Tab>
        <Tab
          tabClassName="tab-info"
          eventKey="legenda"
          title={t("help_panel.legenda")}
        >
          <div className="row mt-2">
            <div className="col-md-12">
              <div>
                <small>
                  {t("combining:help_panel.disposizione_e_posizione")}
                </small>
              </div>
              <div className="text-center">
                {i18n.language === "it" ? (
                  <Legend01 className="mt-2" />
                ) : (
                  <Legend01En className="mt-2" />
                )}
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-4">
              <div
                className="mt-2 font-weight-bold"
                style={{ color: "#5151FC" }}
              >
                {t("combining:help_panel.piano_esteriore")}
              </div>
            </div>
            <div className="col-md-8">
              <BadgeLegenda
                color="#8131F4"
                name={t("trama:eventi liminali")}
                italic={`${t("trama:morte")}, ${t(
                  "trama:rivelazione"
                )}`}
              />
              <BadgeLegenda
                color="#0000FF"
                name={t("trama:Interazione")}
                italic={`${t("trama:Guerra")}, ${t(
                  "trama:aggressione/scontro"
                )}, ${t("trama:aiuto/salvataggio")}, ${t(
                  "trama:compito/missione"
                )}, ${t("trama:incontro animale")}, ${t(
                  "trama:incontro di gruppo"
                )}, ${t("trama:incontro femminile")}, ${t(
                  "trama:incontro maschile"
                )}, ${t("trama:matrimonio")}, ${t(
                  "trama:offerta"
                )}, ${t("trama:rifiuto")}, ${t(
                  "trama:scena erotica"
                )}, ${t("trama:scommessa")}, ${t(
                  "trama:telefonata"
                )}`}
              />
              <BadgeLegenda
                color="#5151FC"
                name={t("trama:Spostamento")}
                italic={`${t("trama:Arrivo/ritorno")}, ${t(
                  "trama:fuga"
                )}, ${t("trama:inseguimento/ricerca")}, ${t(
                  "trama:partenza/sparizione"
                )}, ${t("trama:viaggio")}`}
              />
              <BadgeLegenda
                color="#6E94F4"
                name={t("trama:Intenzione")}
                italic={`${t("trama:Iniziativa/piano")}, ${t(
                  "trama:ostacolo"
                )}, ${t("trama:successo")}`}
              />
              <BadgeLegenda
                color="#00FFFF"
                name={t("trama:Situazione")}
                italic={`${t("trama:Cambiamento")}, ${t(
                  "trama:città magica"
                )},${t(
                  "trama:situazione"
                )}`}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div
                className="mt-2 font-weight-bold"
                style={{ color: "#00FFCC" }}
              >
                {t("combining:help_panel.piano_interiore")}
              </div>
            </div>
            <div className="col-md-8">
              <BadgeLegenda
                color="#009959"
                name={t("trama:Stato euforico")}
                italic={`${t("trama:Illusione/speranza")}, ${t(
                  "trama:innamoramento"
                )}`}
              />
              <BadgeLegenda
                color="#00C19C"
                name={t("trama:Stato disforico")}
                italic={`${t("trama:Angoscia/delusione")}, ${t(
                  "trama:smarrimento/dubbio"
                )}`}
              />
              <BadgeLegenda
                color="#67E9B1"
                name={t("trama:Stato riflessivo")}
                italic={`${t("trama:Visione")}, ${t(
                  "trama:riflessione"
                )}, ${t("trama:mistero/assurdità")}, ${t(
                  "trama:tipologia.ipotesi"
                )}`}
              />
              <BadgeLegenda
                color="#00FFB6"
                name={t("trama:Stato sospeso")}
                italic={`${t("trama:Pausa/sospensione")}, ${t("trama:attesa")}`}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div
                className="mt-2 font-weight-bold"
                style={{ color: "#FFA500" }}
              >
                {t("combining:help_panel.piano_formale")}
              </div>
            </div>
            <div className="col-md-8">
              <BadgeLegenda
                color="#FFF800"
                name={t("combining:help_panel.racconto_incastonato")}
              />
              <BadgeLegenda
                color="#F2CA22"
                name={t("combining:help_panel.metanarrazione")}
              />
              <BadgeLegenda
                color="#EFA625"
                name={t("combining:help_panel.cornice")}
              />
              <BadgeLegenda
                color="#ED6826"
                name={t("combining:help_panel.struttura")}
              />
              <BadgeLegenda
                color="#FF3366"
                name={t("combining:help_panel.terra")}
              />
            </div>
          </div>
        </Tab>
      </Tabs>
    </>
  )
}
