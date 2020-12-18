import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useTranslation, Trans } from "react-i18next";
import IntestazioneHelpPanel from "../../../panels/HelpSidePanel/components/IntestazioneHelpPanel";
import { ReactComponent as Info01 } from "./icons/territorio_a_disposizione_cronologia.svg";
import { ReactComponent as Info02 } from "./icons/territorio_dimensione.svg";
import { ReactComponent as Info03 } from "./icons/territorio_a_cronologia.svg";
import { ReactComponent as Info04 } from "./icons/territorio_b_situazione_editoriale_1.svg";
import { ReactComponent as Info05 } from "./icons/territorio_b_situazione_editoriale_2.svg";
import { ReactComponent as Info06 } from "./icons/territorio_b_situazione_editoriale_3.svg";
import { ReactComponent as Info07 } from "./icons/territorio_b_situazione_editoriale_4.svg";
import { ReactComponent as Info01En } from "./icons/territorio_a_disposizione_cronologia_en.svg";
import { ReactComponent as Info02En } from "./icons/territorio_dimensione_en.svg";
import { ReactComponent as Info03En } from "./icons/territorio_a_cronologia_en.svg";
import { ReactComponent as Info04En } from "./icons/territorio_b_situazione_editoriale_1_en.svg";
import { ReactComponent as Info05En } from "./icons/territorio_b_situazione_editoriale_2_en.svg";
import { ReactComponent as Info06En } from "./icons/territorio_b_situazione_editoriale_3_en.svg";
import { ReactComponent as Info07En } from "./icons/territorio_b_situazione_editoriale_4_en.svg";
import BadgeLegenda from "../../../panels/HelpSidePanel/components/BadgeLegenda";

import "./TerritoryMainHelp.css";

export default function TerritoryMainHelp({ helpProps }) {
  const [key, setKey] = useState("info");
  const { t, i18n } = useTranslation(["translation", "territorio"]);
  return (
    <>
      <IntestazioneHelpPanel
        tappa={1}
        linkTappa1={"/phases#phenomena"}
        linkTappa2={"/phases#process"}
        linkTappa3={"/phases#problem"}
        linkItinerario={"/phases#tappa1"}
        titolo={t("territorio:Esplorare l'opera come un territorio")}
        nomeItinerario={t("help_panel.il_fenomeno")}
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
          <Trans i18nKey={"help_panel.di_cosa_si_tratta"} t={t} ns="territorio">
            <p>
              Questa visualizzazione, che accomuna la prima tappa di tutti e tre
              gli itinerari, rappresenta il corpus delle opere narrative di
              Calvino: oltre duecento testi scritti e pubblicati tra il 1943 e
              il 1985, distribuiti secondo criteri cronologici ed editoriali. A
              ogni elemento grafico corrisponde un testo, per cui l’unità minima
              della visualizzazione non sarà il volume ma il singolo testo.
              All’inizio dell’Atlante abbiamo sentito la necessità di
              rappresentare l’intero corpus dell’autore in un solo colpo
              d’occhio che fornisse una nuova visione generale dell’opera,
              invitando a esplorarla.
            </p>
          </Trans>
          <p>
            <strong>{t("help_panel.come_funziona")}</strong>
          </p>
          <Trans i18nKey={"help_panel.come_funziona"} t={t} ns="territorio">
            <p>
              Per leggere correttamente la visualizzazione è necessario prestare
              attenzione a tre parametri: a) la disposizione degli elementi; b)
              la loro dimensione; c) l’uso del colore.
            </p>

            <p className="text-center">
              {i18n.language === "it" ? (
                <Info01 width="145" />
              ) : (
                <Info01En width="145" />
              )}
            </p>
            <p>
              a) Gli elementi sono posizionati sulla base di due criteri:
              l’appartenenza a uno stesso volume e la data di prima
              pubblicazione. Questo significa che un principio di attrazione
              agisce sia sui testi pubblicati in uno stesso volume sia sui testi
              cronologicamente coevi. Di conseguenza, osservando il territorio,
              è possibile riconoscere un anello esterno e alcuni gruppi di testi
              interni. Questi ultimi sono i testi che confluiscono in raccolte.
            </p>
            <p className="text-center">
              {i18n.language === "it" ? (
                <Info02 width="84.5" />
              ) : (
                <Info02En width="84.5" />
              )}
            </p>
            <p>
              b) La dimensione di ogni elemento è proporzionale alla lunghezza
              del testo che rappresenta; a colpo d’occhio è quindi possibile
              individuare le opere più consistenti del corpus.
            </p>
          </Trans>
          <div className="text-center">
            <small>{t("territorio:help_panel.cronologia")}</small>
          </div>
          <p className="text-center">
            {i18n.language === "it" ? (
              <Info03 width="220.4" className="mt-3" />
            ) : (
              <Info03En width="220.4" className="mt-3" />
            )}
          </p>
          <Trans i18nKey={"help_panel.testo_cronologia"} t={t} ns="territorio">
            <p>
              c) L’uso del colore introduce due differenti modalità esplorative:
              la scala cromatica che va dal verde al viola, attiva nella
              modalità <i>Cronologia</i>, segnala l’ordine cronologico di prima
              pubblicazione di tutti i testi del corpus.
            </p>
          </Trans>
          <div className="text-center">
            <small>{t("territorio:help_panel.situazione_editoriale")}</small>
          </div>
          <p className="d-flex justify-content-center">
            {i18n.language === "it" ? (
              <>
                <Info04 width="75.5" />
                <Info05 width="75.5" />
                <Info06 width="75.5" />
                <Info07 width="75.5" />
              </>
            ) : (
              <>
                <Info04En width="75.5" />
                <Info05En width="75.5" />
                <Info06En width="75.5" />
                <Info07En width="75.5" />
              </>
            )}
          </p>
          <Trans
            i18nKey={"help_panel.testo_situazione_editoriale"}
            t={t}
            ns="territorio"
          >
            <p>
              Selezionando invece la modalità <i>Volumi</i>, il colore consente
              di riconoscere tutti i volumi pubblicati in vita dall’autore, sia
              che si tratti di raccolte di racconti, sia che si tratti di altri
              tipi di testi. Le raccolte di racconti sono riconoscibili con gli
              stessi colori anche in modalità <i>Cronologia</i>, attraverso
              l’utilizzo di alcune linee di contorno.
            </p>
            <p>
              Interagendo con un singolo elemento grafico appaiono il titolo,
              l’anno di prima pubblicazione ed eventuali pubblicazioni
              successive. Il <i>Filtro cronologico</i> consente di riorganizzare
              il corpus su una linea temporale e, se necessario, selezionare un
              intervallo di tempo specifico (un anno, un decennio ecc.)
              Utilizzando la funzione <i>Cerca per</i> è possibile individuare
              singoli testi o raccolte di racconti.
            </p>
          </Trans>
          <p>
            <strong>
              {t("help_panel.qualche_pista_di_lettura")}
            </strong>
          </p>
          <Trans
            i18nKey={"help_panel.qualche_pista_di_lettura"}
            t={t}
            ns="territorio"
          >
            <p>
              Il territorio può essere esplorato da vari punti di vista, in modo
              da sfruttare la sua capacità di sollecitare spunti di ricerca
              inediti come la prospettiva che presenta. Un esempio sono le tre{" "}
              <i>Analisi dei fenomeni</i> qui proposte, che elaborano la struttura di
              partenza del territorio in base a tre diverse interrogazioni.
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
                <small>{t("help_panel.dimensione")}</small>
              </div>
              {i18n.language === "it" ? (
                <Info02 width="84.5" className="mt-2" />
              ) : (
                <Info02En width="84.5" className="mt-2" />
              )}
            </div>
            <div className="col-md-6">
              <div>
                <small>{t("help_panel.disposizione")}</small>
              </div>
              {i18n.language === "it" ? (
                <Info01 width="145.5" className="mt-2" />
              ) : (
                <Info01En width="145.5" className="mt-2" />
              )}
            </div>
          </div>
          {helpProps.helpPages.noAnalysisMode === "chronology" && (
            <div className="row mt-2">
              <div className="col-md-12">
                <div>
                  <small>{t("territorio:help_panel.cronologia")}</small>
                </div>
                {i18n.language === "it" ? (
                  <Info03 width="220.4" className="mt-2" />
                ) : (
                  <Info03En width="220.4" className="mt-2" />
                )}
              </div>
            </div>
          )}
          {helpProps.helpPages.noAnalysisMode === "volumes" && (
            <>
              <div className="mt-2">
                <small>
                  {t("territorio:help_panel.situazione_editoriale")}
                </small>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  {i18n.language === "it" ? (
                    <Info04 width="75.5" />
                  ) : (
                    <Info04En width="75.5" />
                  )}
                </div>
                <div>
                  {i18n.language === "it" ? (
                    <Info05 width="75.5" />
                  ) : (
                    <Info05En width="75.5" />
                  )}
                </div>
                <div>
                  {i18n.language === "it" ? (
                    <Info06 width="75.5" />
                  ) : (
                    <Info06En width="75.5" />
                  )}
                </div>
                <div>
                  {i18n.language === "it" ? (
                    <Info07 width="75.5" />
                  ) : (
                    <Info07En width="75.5" />
                  )}
                </div>
              </div>
            </>
          )}
          {helpProps.helpPages.noAnalysisMode === "volumes" && (
            <>
              <div className="mt-2">
                <small>{t("territorio:help_panel.raccolte")}</small>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <BadgeLegenda color="#00C19C" name="Ultimo viene il corvo" />
                  <BadgeLegenda color="#8AE297" name="L’entrata in guerra" />
                  <BadgeLegenda color="#5151FC" name="I racconti" />
                  <BadgeLegenda color="#BBBBFF" name="Marcovaldo" />
                  <BadgeLegenda color="#97DADD" name="Le cosmicomiche" />
                </div>
                <div className="col-md-6">
                  <BadgeLegenda color="#FF3366" name="Ti con zero" />
                  <BadgeLegenda color="#FFA500" name="La memoria del mondo" />
                  <BadgeLegenda color="#FFD337" name="Gli amori difficili" />
                  <BadgeLegenda color="#FF6C39" name="Palomar" />
                  <BadgeLegenda
                    color="#00BFD3"
                    name="Cosmicomiche vecchie e nuove"
                  />
                </div>
              </div>
            </>
          )}
        </Tab>
      </Tabs>
    </>
  );
}
