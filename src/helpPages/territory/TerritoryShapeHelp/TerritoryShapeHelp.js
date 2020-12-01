import React, { useState } from "react"
import { Tabs, Tab } from "react-bootstrap"
import { useTranslation, Trans } from "react-i18next"
import IntestazioneHelpPanel from "../../../panels/HelpSidePanel/components/IntestazioneHelpPanel"
import { ReactComponent as Legend01 } from "./icons/analisi_disposizione.svg"
import { ReactComponent as Legend01En } from "./icons/analisi_disposizione_en.svg"
import { ReactComponent as Legend02 } from "./icons/analisi_dimensione.svg"
import { ReactComponent as Legend02En } from "./icons/analisi_dimensione_en.svg"
import { ReactComponent as LegendProporzione } from "./icons/elenchi_a_proporzione.svg"
import { ReactComponent as LegendProporzioneEn } from "./icons/elenchi_a_proporzione_en.svg"
import { ReactComponent as LegendPercentuale } from "./icons/elenchi_b_percentuale.svg"
import { ReactComponent as LegendPercentualeEn } from "./icons/elenchi_b_percentuale_en.svg"
import BadgeLegenda from "../../../panels/HelpSidePanel/components/BadgeLegenda"
import { Link } from "react-router-dom"

export default function TerritoryShapeHelp({ helpProps }) {
  const [key, setKey] = useState("info")
  const { t, i18n } = useTranslation(["translation", "elenchi"])
  return (
    <>
      <IntestazioneHelpPanel
        tappa={1}
        linkTappa1={"/form/phase1"}
        linkItinerario={"/itineraries#form"}
        linkTappa2={"/form/phase2"}
        linkTappa3={"/form/phase3"}
        titolo={t("elenchi")}
        linkApprofondimento="/form/phase1/focus"
        nomeItinerario={t("help_panel.itinerario_forma")}
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
          <Trans i18nKey={"help_panel.di_cosa_si_tratta"} t={t} ns="elenchi">
            <p>
              Perché gli elenchi? Perché Calvino è un autore fondamentalmente
              elencatorio, che usa gli elenchi in modo virtuosistico e con
              grande frequenza. Gli elenchi rappresentano il grado zero di
              quella forma “modulare” della sua scrittura che indagheremo nel
              corso di questo itinerario.
            </p>
            <p>
              Sono stati considerati elenchi tutte le sequenze composte da più
              di tre componenti, e i vari tipi sono stati distinti scegliendo
              come parametro la complessità degli elementi sintattici che li
              compongono (quando gli elenchi sono composti da tipi diversi si è
              seguito il criterio del tipo più presente), e sono segnalati da
              colori diversi: elenchi di singole{" "}
              <span style={{ color: "#00c19c" }}>parole</span> (nomi, aggettivi,
              verbi, avverbi, con o senza articoli), elenchi di{" "}
              <span style={{ color: "#FFA500" }}>sintagmi</span> (unità
              sintattiche complesse senza significato compiuto), elenchi di{" "}
              <span style={{ color: "#5151fc" }}>proposizioni</span> (unità
              sintattiche complesse con significato compiuto), elenchi{" "}
              <span style={{ color: "#FF3366" }}>misti</span> (sequenze in cui
              gli elementi precedenti sono mescolati in modo tale che nessuno è
              dominante sugli altri).
            </p>
          </Trans>
          <p>
            <strong>{t("help_panel.come_funziona")}</strong>
          </p>
          <Trans i18nKey={"help_panel.come_funziona"} t={t} ns="elenchi">
            <p>
              La visualizzazione mostra in primo luogo la distribuzione tra i
              tipi di elenchi: ogni cerchio del territorio è diviso in segmenti
              colorati di lunghezza diversa, che rispecchiano il rapporto tra le
              estensioni dei vari tipi di elenchi presenti all’interno di un
              certo testo, calcolata in base al numero di caratteri. Sulla base
              di questa rappresentazione grafica, un primo filtro permette di
              selezionare individualmente uno o più tipi per osservarne la
              distribuzione sul corpus.
            </p>
            <p>
              La modalità <em>Proporzione</em> permette di visualizzare nello
              specifico il rapporto tra la quantità di testo occupata dai vari
              elenchi, aggregati indipendentemente dalla suddivisione per
              tipologia, e la lunghezza complessiva di ogni opera.
            </p>
          </Trans>
          <p>
            <strong>{t("help_panel.qualche_pista_di_lettura")}</strong>
          </p>
          <Trans
            i18nKey={"help_panel.qualche_pista_di_lettura"}
            t={t}
            ns="elenchi"
          >
            <p>
              Nel complesso, la trasposizione grafica dei dati permette di avere
              una panoramica sull’uso delle strutture elencatorie da parte di
              Calvino, che rivela come primo dato evidente la pervasività di
              questo strumento stilistico: quasi la totalità del corpus presenta
              elenchi, e nella maggior parte dei casi la loro presenza supera il
              5% della lunghezza complessiva dei testi, il che rimarca la
              propensione dell’autore per l’espansione paradigmatica (elementi
              simili tra loro) rispetto allo sviluppo sintagmatico (elementi
              diversi tra loro) della narrazione. I dati rivelano anche una
              serie di informazioni sulle preferenze calviniane, e sulla loro
              oscillazione attraverso il tempo e i generi, tra cui la
              predominanza di elenchi che coinvolgono strutture complesse
              (sintagmi o frasi), e la tendenza a mescolare sempre i diversi
              tipi, il che segnala una precisa consapevolezza artistica e la
              ricerca di una forma di equilibrio nell’impiego di questa forma di
              accumulazione verbale (vedi{" "}
              <Link to={"/form/phase1/focus"}>Approfondimento</Link>
              ).
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
                <small>{t("help_panel.disposizione")}</small>
              </div>
              {i18n.language === "it" ? (
                <Legend01 width="119.9" className="mt-2" />
              ) : (
                <Legend01En width="119.9" className="mt-2" />
              )}
            </div>
            <div className="col-md-6">
              <div>
                <small>{t("help_panel.dimensione")}</small>
              </div>
              {i18n.language === "it" ? (
                <Legend02 width="70.4" className="mt-2" />
              ) : (
                <Legend02En width="70.4" className="mt-2" />
              )}
            </div>
          </div>
          {helpProps.helpPages.shapeAnalysisMode === "types" && (
            <div className="row mt-2">
              <div className="col-md-6">
                <div>
                  <small>{t("elenchi:help_panel:tipi_di_elenco")}</small>
                </div>
                <div>
                  <BadgeLegenda
                    color="#FC0303"
                    name={t("elenchi:help_panel.misto")}
                  />
                  <BadgeLegenda
                    color="#00C19C"
                    name={t("elenchi:help_panel.parole")}
                  />
                  <BadgeLegenda
                    color="#FFA500"
                    name={t("elenchi:help_panel.sintagmi")}
                  />
                  <BadgeLegenda
                    color="#5151FC"
                    name={t("elenchi:help_panel.frasi")}
                  />
                  <BadgeLegenda
                    border="#C6CACF"
                    name={t("elenchi:help_panel.senza_elenco")}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <small>{t("help_panel.proporzione")}</small>
                </div>
                <div className="mt-2">
                  {i18n.language === "it" ? (
                    <LegendProporzione width="126" />
                  ) : (
                    <LegendProporzioneEn width="126" />
                  )}
                </div>
              </div>
            </div>
          )}
          {helpProps.helpPages.shapeAnalysisMode === "shape_proportion" && (
            <div className="row mt-2">
              <div className="col-md-6">
                <div>
                  <small>{t("elenchi:help_panel:tipi_di_elenco")}</small>
                </div>
                <div>
                  <BadgeLegenda
                    color="#FC0303"
                    name={t("elenchi:help_panel.misto")}
                  />
                  <BadgeLegenda
                    color="#00C19C"
                    name={t("elenchi:help_panel.parole")}
                  />
                  <BadgeLegenda
                    color="#FFA500"
                    name={t("elenchi:help_panel.sintagmi")}
                  />
                  <BadgeLegenda
                    color="#5151FC"
                    name={t("elenchi:help_panel.frasi")}
                  />
                  <BadgeLegenda
                    border="#C6CACF"
                    name={t("elenchi:help_panel.senza_elenco")}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <small>{t("help_panel.proporzione")}</small>
                </div>
                <div className="mt-2">
                  {i18n.language === "it" ? (
                    <LegendPercentuale width="145.922" />
                  ) : (
                    <LegendPercentualeEn width="145.922" />
                  )}
                </div>
              </div>
            </div>
          )}
        </Tab>
      </Tabs>
    </>
  )
}
