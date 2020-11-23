import React, { useState } from "react"
import { Tabs, Tab } from "react-bootstrap"
import { useTranslation, Trans } from "react-i18next"
import IntestazioneHelpPanel from "../../../panels/HelpSidePanel/components/IntestazioneHelpPanel"
import { ReactComponent as Analisi01 } from "./icons/analisi_disposizione.svg"
import { ReactComponent as Analisi01En } from "./icons/analisi_disposizione_en.svg"
import { ReactComponent as Analisi02 } from "./icons/analisi_dimensione.svg"
import { ReactComponent as Analisi02En } from "./icons/analisi_dimensione_en.svg"
import { ReactComponent as LegendaProporzione } from "./icons/nebbia_b_proporzione.svg"
import { ReactComponent as LegendaProporzioneEn } from "./icons/nebbia_b_proporzione_en.svg"
import BadgeLegenda from "../../../panels/HelpSidePanel/components/BadgeLegenda"
import FrequenzaLegenda from "../../../panels/HelpSidePanel/components/FrequenzaLegenda"

export default function TerritoryDoubtHelp({ helpProps }) {
  const [key, setKey] = useState("info")
  const { t, i18n } = useTranslation(["translation", "nebbia"])
  return (
    <>
      <IntestazioneHelpPanel
        tappa={1}
        linkTappa1={"/doubt/phase1"}
        linkTappa2={"/doubt/phase2"}
        linkTappa3={"/doubt/phase3"}
        linkItinerario={"/itineraries#doubt"}
        titolo={t("nebbia")}
        linkApprofondimento="/doubt/phase1/focus"
        nomeItinerario={t("help_panel.itinerario_dubbio")}
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
          <Trans i18nKey={"help_panel.di_cosa_si_tratta"} t={t} ns="nebbia">
            <p>
              Perché la nebbia? Perché è un fenomeno concreto di messa in dubbio
              dell’esistenza della realtà e di destabilizzazione della sua
              rappresentazione, che sembra tornare in varie parti dell’opera di
              Calvino. Prendendo la nebbia come oggetto di studio, abbiamo
              cercato di tracciare la ricorrenza di questo elemento atmosferico
              nell’opera di Calvino. A tal fine, sono state catalogate tutte le
              occorrenze delle parole derivate dal termine nebbia; inoltre, sono
              stati presi in considerazione anche elementi atmosferici non
              esattamente coincidenti ma simili, quali “bruma”, “caligine”,
              “foschia” e eventuali derivati. Infine, abbiamo deciso di
              integrare un altro parametro alla ricerca: sono state catalogate
              le occorrenze delle parole derivate dal termine{" "}
              <span style={{ color: "#00c19c" }}>cancellazione</span> (comprese
              le varie forme del verbo “cancellare”), che rappresenta il
              principale effetto prodotto dall’elemento atmosferico della{" "}
              <span style={{ color: "#5151fc" }}>nebbia</span>.
            </p>
          </Trans>
          <p>
            <strong>{t("help_panel.come_funziona")}</strong>
          </p>
          <Trans i18nKey={"help_panel.come_funziona"} t={t} ns="nebbia">
            <p>
              Il territorio può essere visualizzato in due diversi modi, che
              mostrano da due differenti punti di vista i dati raccolti.
            </p>
            <p>
              <em>Presenza del fenomeno</em> segnala la presenza e l’intensità
              dei due fenomeni analizzati (
              <span style={{ color: "#5151fc" }}>nebbia</span> e{" "}
              <span style={{ color: "#00c19c" }}>cancellazione</span>) in tutta
              l’opera, testo per testo. La visualizzazione consente di vedere
              separatamente l’evoluzione nel tempo dell’utilizzo di un solo
              fenomeno, unendo a questo parametro l’intensità con il quale è
              stato impiegato. Si può vedere anche la presenza e l’intensità dei
              due fenomeni riuniti (
              <span style={{ color: "#ff6c39" }}>entrambi</span>
              ).
            </p>
            <p>
              <em>Proporzione</em> segnala il rapporto dei due fenomeni
              all’interno di uno stesso testo: il perimetro di ogni elemento
              grafico viene colorato a seconda della proporzione quantitativa
              del fenomeno analizzato.
            </p>
          </Trans>
        </Tab>
        <Tab
          tabClassName="tab-info"
          eventKey="legenda"
          title={t("help_panel.legenda")}
        >
          <div className="row mt-3">
            <div className="col-md-6">
              <div>
                <small>{t("help_panel.disposizione")}</small>
              </div>
              {i18n.language === "it" ? (
                <Analisi01 width="119" className="mt-2" />
              ) : (
                <Analisi01En width="119" className="mt-2" />
              )}
            </div>
            <div className="col-md-6">
              <div>
                <small>{t("help_panel.dimensione")}</small>
              </div>
              {i18n.language === "it" ? (
                <Analisi02 width="70" className="mt-2" />
              ) : (
                <Analisi02En width="70" className="mt-2" />
              )}
            </div>
          </div>
          {helpProps.helpPages.doubtAnalysisMode === "fog" ||
          helpProps.helpPages.doubtAnalysisMode === "cancellation" ||
          helpProps.helpPages.doubtAnalysisMode === "all" ? (
            <div className="row mt-2">
              <div className="col-md-6">
                <div>
                  <small>{t("nebbia:help_panel.tipo_di_fenomeno")}</small>
                </div>
                <div>
                  <BadgeLegenda color="#5151FC" name={t("nebbia")} />
                  <BadgeLegenda
                    color="#00C19C"
                    name={t("nebbia:help_panel.cancellazione")}
                  />
                  <BadgeLegenda
                    color="#FF6C39"
                    name={t("nebbia:help_panel.entrambi")}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <small>{t("help_panel.frequenza")}</small>
                </div>
                <div>
                  <FrequenzaLegenda color="#5151FC" />
                  <FrequenzaLegenda color="#00C19C" />
                  <FrequenzaLegenda color="#FF6C39" isLast={true} />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="row mt-2">
                <div className="col-md-12">
                  <div>
                    <small>{t("nebbia:help_panel.tipo_di_fenomeno")}</small>
                  </div>
                  <div>
                    <BadgeLegenda color="#5151FC" name={t("nebbia")} />
                    <BadgeLegenda
                      color="#00C19C"
                      name={t("nebbia:help_panel.cancellazione")}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-12">
                  <div>
                    <small>{t("help_panel.proporzione")}</small>
                  </div>
                  <div>
                    {i18n.language === "it" ? (
                      <LegendaProporzione width="274" className="mt-2" />
                    ) : (
                      <LegendaProporzioneEn width="274" className="mt-2" />
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </Tab>
      </Tabs>
    </>
  )
}
