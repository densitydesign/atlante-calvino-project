import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useTranslation, Trans } from "react-i18next";
import IntestazioneHelpPanel from "../../../panels/HelpSidePanel/components/IntestazioneHelpPanel";
import { ReactComponent as LegendDimensione01 } from "./icons/trama_a_dimensione_colore.svg";
import { ReactComponent as LegendDimensione01En } from "./icons/trama_a_dimensione_colore_en.svg";
import { ReactComponent as LegendDimensione02 } from "./icons/trama_b_dimensione_colore.svg";
import { ReactComponent as LegendDimensione02En } from "./icons/trama_b_dimensione_colore_en.svg";
import { ReactComponent as LegendForma01 } from "./icons/trama_a_forma.svg";
import { ReactComponent as LegendForma01En } from "./icons/trama_a_forma_en.svg";
import { ReactComponent as LegendForma02 } from "./icons/trama_b_forma.svg";
import { ReactComponent as LegendForma02En } from "./icons/trama_b_forma_en.svg";

import "./PlotMainHelp.css";
import BadgeLegenda from "../../../panels/HelpSidePanel/components/BadgeLegenda";

export default function PlotMainHelp({ helpProps }) {
  const [key, setKey] = useState("info");
  const { t, i18n } = useTranslation(["translation", "trama"]);
  return (
    <>
      <IntestazioneHelpPanel
        tappa={3}
        linkTappa1={"/form/phase1"}
        linkTappa2={"/form/phase2"}
        linkItinerario={"/itineraries#form"}
        linkTappa3={"/doubt/phase3"}
        titolo={t("trama")}
        linkApprofondimento="/form/phase3/focus"
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
          <Trans i18nKey={"help_panel.di_cosa_si_tratta"} t={t} ns="trama">
            <p>
              La visualizzazione rappresenta le forme della trama che
              costituiscono l’ossatura narrativa dei testi del corpus.
            </p>
          </Trans>
          <Trans i18nKey={"help_panel.di_cosa_si_tratta_pt2"} t={t} ns="trama">
            <p>
              La trama di ogni testo pubblicato in vita da Calvino è sintetizzata
              nella forma di una linea colorata che, come un sismografo, si muove
              su due assi: quello orizzontale, orientato da destra a sinistra,
              rappresenta l’avanzamento lineare del testo dall’incipit alla
              conclusione, mentre quello verticale presenta un elenco ragionato
              dei più comuni tipi di sequenza narrativa riscontrati nel corpus,
              raggruppati e riordinati in base alla loro capacità di perturbare la
              vicenda narrata, dai più statici, come i{" "}
              <span style={{ color: "#f2ca22" }}>brani metaletterari</span> e{" "}
              <span style={{ color: "#0fd4d4" }}>descrittivi</span>, a quelli
              intermedi, come i passaggi dedicati ai{" "}
              <span style={{ color: "#52c392" }}>moti interiori</span>, fino ai
              più dinamici, come gli{" "}
              <span style={{ color: "#0000ff" }}>incontri-scontri</span> tra
              personaggi e l’esperienza della{" "}
              <span style={{ color: "#8131f4" }}>morte</span>.
            </p>
          </Trans>
          <p>
            <strong>{t("help_panel.come_funziona")}</strong>
          </p>
          <Trans i18nKey={"help_panel.come_funziona"} t={t} ns="trama">
            <p>
              La visualizzazione è organizzata in modo da offrire una doppia
              direzione di lettura.
            </p>
            <p>
              Nella prima schermata, il panorama frontale delle linee mette a
              confronto tutte le trame dei testi calviniani, disponendole in uno
              spazio uniforme indipendentemente dalla loro lunghezza. Il
              movimento orizzontale di ogni linea è basato sulla scansione del
              tempo del racconto, cioè aderisce all’intreccio e alla
              disposizione che la materia narrativa segue nel testo reale,
              indipendentemente dalla presenza di flashback o anticipazioni.
              Interagendo con il panorama o con la barra di ricerca per titolo,
              è possibile portare in evidenza una o più linee, lungo le quali,
              scorrendo con un cursore, si possono leggere i nomi delle sequenze
              che articolano il percorso. Cliccando sull’etichetta che contiene
              il titolo del testo, si può inoltre isolare ogni linea per
              analizzare in dettaglio tutti i punti della sua struttura
              narrativa.
            </p>
            <p>
              Sfruttando l’opzione Ruota vista, si può poi accedere alla seconda
              modalità di lettura: l’intera visualizzazione compie un giro di
              90° su se stessa, e permette di osservare il panorama “di
              profilo”, da una prospettiva che mette in risalto l’estensione
              verticale delle linee, calcolata sull’intervallo tra il suo punto
              più basso e quello più alto, e mostra quale parte dell’elenco dei
              motivi letterari ricorrenti è stata coinvolta da Calvino nella
              composizione di ogni trama. I due marcatori geometrici che si
              trovano sulle linee indicano rispettivamente la sequenza di
              apertura e di chiusura di ogni testo: in questo modo è possibile
              avere uno sguardo totale sui motivi letterari che l’autore sceglie
              di usare come incipit e finali dei suoi testi.
            </p>
            <p>
              Per entrambe le modalità di lettura è sempre possibile
              visualizzare l’elenco delle sequenze, che può anche essere usato
              per interrogare le visualizzazioni selezionando un proprio
              intervallo personalizzato e verificando se e quali trame hanno
              un’estensione che coincide esattamente con i confini scelti.
            </p>
          </Trans>
          <p>
            <strong>{t("help_panel.qualche_pista_di_lettura")}</strong>
          </p>
          <Trans
            i18nKey={"help_panel.qualche_pista_di_lettura"}
            t={t}
            ns="trama"
          >
            <p>
              Entrambe le modalità di lettura offerte dalla visualizzazione
              offrono la possibilità di immergersi nel mondo di trame di Calvino
              per scoprirne aspetti notevoli.
            </p>
            <p>
              Nella visione panoramica frontale, un esempio è l’uso del cursore
              su due o più linee evidenziate contemporaneamente: uno strumento
              che permette di rilevare eventuali coincidenze e divaricazioni tra
              le strutture dei testi, ad esempio mostrando la presenza della
              stessa sequenza nella stessa posizione in racconti di genere
              diverso, o composti a distanza di molti anni, oppure viceversa
              segnalando il disallineamento di racconti che, a prima vista,
              sembrerebbero invece collegati da una sostanziale somiglianza
              narrativa.
            </p>
            <p>
              La visione panoramica laterale, da parte sua, consente tra le
              altre cose di avere un resoconto visivo di una questione primaria
              per Calvino, quella del Cominciare e del Finire. Grazie alla
              redistribuzione delle linee si può vedere non soltanto il
              resoconto delle scelte dell’autore quando si tratta di decidere
              qual è il modo migliore per far aprire e chiudere una storia, ma
              si può anche avere una sintesi dell’orientamento complessivo delle
              trame: sapendo che le sequenze sono disposte in base alla loro
              potenzialità perturbante rispetto all’entropia della narrazione,
              possiamo subito dedurre dalla posizione dei marcatori di
              inizio-fine se l’asse complessivo di un racconto è ascendente o
              discendente, cioè se la vicenda termina in una situazione di
              maggiore o minore squilibrio rispetto al suo inizio.
            </p>
          </Trans>
        </Tab>
        <Tab tabClassName="tab-info" eventKey="legenda" title={t("help_panel.legenda")}>
          {helpProps.helpPages === "list" && (
            <>
              <div className="row mt-2">
                <div className="col-md-12">
                  <div>
                    <small>{t("trama:help_panel.dimensione_e_colore")}</small>
                  </div>
                  {i18n.language === "it" ? (
                    <LegendDimensione01 className="mt-2" />
                  ) : (
                    <LegendDimensione01En className="mt-2" />
                  )}
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-12">
                  <div>
                    <small>{t("trama:help_panel.forma")}</small>
                  </div>
                  {i18n.language === "it" ? (
                    <LegendForma01 className="mt-2" />
                  ) : (
                    <LegendForma01En className="mt-2" />
                  )}
                </div>
              </div>
            </>
          )}
          {helpProps.helpPages === "boxplot" && (
            <>
              <div className="row mt-2">
                <div className="col-md-12">
                  <div>
                    <small>{t("trama:help_panel.dimensione_e_colore")}</small>
                  </div>
                  {i18n.language === "it" ? (
                    <LegendDimensione02 width="300" className="mt-2" />
                  ) : (
                    <LegendDimensione02En width="300" className="mt-2" />
                  )}
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-12">
                  <div>
                    <small>{t("trama:help_panel.forma")}</small>
                  </div>
                  {i18n.language === "it" ? (
                    <LegendForma02 className="mt-2" />
                  ) : (
                    <LegendForma02En className="mt-2" />
                  )}
                </div>
              </div>
            </>
          )}
          <div className="row mt-3">
            <div className="col-md-12">
              <div>
                <small>{t("trama:help_panel.tipo_di_sequenza")}</small>
              </div>
              <BadgeLegenda
                color="#8131F4"
                name={t("trama:eventi liminali")}
                italic={`${t("trama:morte")}, ${t("trama:Rivelazione")}`}
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
                )}, ${t("trama:matrimonio")}, ${t("trama:offerta")}, ${t(
                  "trama:rifiuto"
                )}, ${t("trama:scena erotica")}, ${t("trama:scommessa")}, ${t(
                  "trama:telefonata"
                )}`}
              />
              <BadgeLegenda
                color="#5151FC"
                name={t("trama:Spostamento")}
                italic={`${t("trama:Arrivo/ritorno")}, ${t(
                  "trama:arrivo/fuga"
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
                )}, ${t("trama:situazione")}`}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
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
                italic={`${t("trama:Visione")}, ${t("trama:riflessione")}, ${t(
                  "trama:mistero/assurdità"
                )}, ${t("trama:tipologia.ipotesi")}`}
              />
              <BadgeLegenda
                color="#00FFB6"
                name={t("trama:Stato sospeso")}
                italic={`${t("trama:Pausa/sospensione")}, ${t("trama:attesa")}`}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <BadgeLegenda
                color="#FFF800"
                name={t("trama:racconto_incastonato")}
              />
              <BadgeLegenda color="#F2CA22" name={t("trama:metanarrazione")} />
              <BadgeLegenda color="#EFA625" name={t("trama:cornice")} />
              <BadgeLegenda color="#ED6826" name={t("trama:struttura")} />
            </div>
          </div>
        </Tab>
      </Tabs>
    </>
  );
}
