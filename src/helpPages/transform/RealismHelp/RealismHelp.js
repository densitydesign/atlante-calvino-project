import React, { useState } from "react"
import { Tabs, Tab } from "react-bootstrap"
import { useTranslation, Trans } from "react-i18next"
import IntestazioneHelpPanel from "../../../panels/HelpSidePanel/components/IntestazioneHelpPanel"
import BadgeLegenda from "../../../panels/HelpSidePanel/components/BadgeLegenda"
import { ReactComponent as Legend01 } from "./icons/realismo_disposizione.svg"
import { ReactComponent as Legend01En } from "./icons/realismo_disposizione_en.svg"
import Legend02 from "./icons/realismo_movimentoGIF.gif"
import Legend02En from "./icons/realismo_movimentoGIF_en.gif"
import { ReactComponent as Legend03 } from "./icons/realismo_dettaglio.svg"
import { ReactComponent as Legend03En } from "./icons/realismo_dettaglio_en.svg"
import { Link } from "react-router-dom"
import "./RealismHelp.css"

export default function RealismHelp() {
  const [key, setKey] = useState("info")
  const { t, i18n } = useTranslation(["translation", "realismo"])
  return (
    <>
      <IntestazioneHelpPanel
        tappa={3}
        linkTappa1={"/space/phase1"}
        linkTappa2={"/space/phase2"}
        linkTappa3={"/space/phase3"}
        linkItinerario={"/itineraries#space"}
        titolo={t("realismo")}
        linkApprofondimento="/space/phase3/focus"
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
          <Trans i18nKey={"help_panel.di_cosa_si_tratta"} t={t} ns="realismo">
            <p>
              Dopo aver esplorato lo spazio dell’opera calviniana in molte delle
              sue principali dimensioni, la questione della rappresentazione
              della realtà viene nuovamente affrontata restringendo l’analisi
              allo spazio d’ambientazione terrestre, localizzabile (es. <em>Sanremo</em>)
              e non localizzabile (es. una <em>città</em>), dei testi brevi pubblicati in
              volume tra il 1945 e il 1983. Questa specifica selezione concentra
              il<em>focus</em> sullo spazio che possiamo definire più <em>realista</em>
              all’interno dell’opera dell’autore, con l’obiettivo di comprendere
              in che modo questo complesso insieme di figurazioni spaziali si
              trasformi e si modifichi nel corso del tempo.
            </p>
          </Trans>
          <p>
            <strong>{t("help_panel.come_funziona")}</strong>
          </p>
          <Trans i18nKey={"help_panel.come_funziona"} t={t} ns="realismo">
            <div>
              La visualizzazione può essere esplorata in due modalità, che
              presentano rispettivamente una visione d’insieme di tutti i
              racconti e una visione in dettaglio di singoli testi che l’utente
              sceglie di selezionare.<br></br>
              Nel primo caso ogni racconto è
              rappresentato da un elemento grafico lineare che si dispone in
              ordine cronologico di pubblicazione all’interno di un cerchio.
              Ogni linea, di lunghezza uniforme, rivela tre aspetti principali:{" "}
              <ol type="1">
                <li>
                  il numero di ambientazioni attraverso cui si sviluppa la
                  storia, rappresentate da pallini neri;{" "}
                </li>
                <li>
                  la tipologia di ogni ambientazione:{" "}
                  <span style={{ color: "#FFD337" }}>spazio interno</span>,{" "}
                  <span style={{ color: "#00C19C" }}>spazio esterno</span>,{" "}
                  <span style={{ color: "#5151FF" }}>mezzo di trasporto</span>,
                  <span style={{ color: "#AFAFAF" }}>
                    assenza di ambientazione
                  </span>
                  ;
                </li>
                <li>
                  lo spostamento nello spazio, rappresentato dall’animazione che
                  mostra l’eventuale presenza di movimento all’interno del
                  testo.
                </li>
              </ol><br></br>
              Selezionando uno o più elementi e scorrendo verso il basso è
              possibile avere una visione in dettaglio che permette di scoprire
              altre tre importanti caratteristiche:{" "}
              <ol type="1">
                <li>
                  la lunghezza reale del racconto selezionato, particolarmente
                  utile nel caso in cui si confrontino più testi;
                </li>
                <li>la denominazione esatta di ciascuna ambientazione;</li>
                <li>
                  la presenza di livelli spaziali che si annidano l’uno dentro
                  l’altro, qualora ci si trovi di fronte ad ambientazioni
                  interne ad altri ambienti.
                </li>
              </ol>{" "}
            </div>
          </Trans>
          <p className="mt-3">
            <strong>{t("help_panel.qualche_pista_di_lettura")}</strong>
          </p>
          <Trans
            i18nKey={"help_panel.qualche_pista_di_lettura"}
            t={t}
            ns="realismo"
          >
            <p>
              Una prima importante considerazione riguarda il movimento.
              Mettendo a confronto i primi due decenni della carriera di Calvino
              con i secondi due, si assiste a un’evidente inversione di
              tendenza: se tra il 1945 e il 1965 il movimento nello spazio è
              molto spiccato e soltanto una minima parte dei racconti non
              contempla scene di spostamento (7 su 73, vale a dire meno del
              10%), dal 1965 in avanti i numeri si ribaltano a favore di un
              sostanziale immobilismo. Lo spostamento nello spazio non scompare
              ma si assottiglia notevolmente (è presente in 8 testi su 33, ossia
              circa nel 25% dei casi). Questo fenomeno è giustificato dalla
              nuova tendenza che emerge nella scrittura di Calvino a partire più
              o meno dalla metà degli anni Sessanta: l’azione, l’avventura e
              anche la carica fiabesca che caratterizzavano i testi partigiani,
              contadini o cittadini (si pensi a <i>Marcovaldo</i>, sempre intento a
              cimentarsi in qualche impresa) vengono meno, sostituiti da una
              forma e da un contenuto che si aprono piuttosto alla riflessione,
              alle digressioni descrittive e a alcuni procedimenti narrativi
              propri della scrittura saggistica.<br></br><br></br>
              Questa inversione di tendenza
              non ha un riflesso diretto, come si potrebbe supporre, sul
              rapporto tra spazi esterni e spazi interni. Se è vero che nei
              primissimi anni la produzione calviniana sembra prediligere
              ambientazioni all’aperto (pensiamo a racconti come{" "}
              <i>
                Paura sul sentiero, Uomo nei gerbidi, Campo di mine, Ultimo
                viene il corvo
              </i>
              ), il sopraggiungere dei primi racconti cittadini (<i>Visti alla
              mensa, Si dorme come cani, Il gatto e il poliziotto</i>) segna
              molto presto l’inizio di una sostanziale oscillazione tra
              ambientazioni esterne e ambientazioni interne (o ancora, come
              accade in molti casi, miste).<br></br><br></br>
              Tuttavia, mettendo a confronto la
              selezione dei racconti che presentano esclusivamente spazi esterni
              e quella dei racconti che presentano soltanto spazi interni e
              analizzando nel dettaglio le caratteristiche proprie di ogni
              testo, si nota come il secondo gruppo sia ragionevolmente molto
              omogeneo: i testi che ne fanno parte presentano, infatti,
              pochissimi ambienti e il movimento è quasi assente. Mentre il
              primo si trasforma in modo sorprendente con il passare degli anni:
              le numerosissime ambientazioni dei primi racconti all’aperto
              diminuiscono progressivamente fino a raggiungere la
              mono-ambientazione, passando da un movimento quasi febbrile ed
              esclusivamente orizzontale (privo, cioè, di livelli spaziali che
              si annidino uno dentro l’altro: vedi{" "}
              <Link to="/space/phase3/focus">Approfondimento</Link>) a un
              sostanziale immobilismo. Non stupisce, allora, che persino i mezzi
              di trasporto, di cui si trova ampia traccia nella produzione breve
              calviniana degli anni Cinquanta e Sessanta, scompaiano del tutto
              dopo il 1967.
            </p>
          </Trans>
        </Tab>
        <Tab
          tabClassName="tab-info"
          eventKey="legenda"
          title={t("help_panel.legenda")}
        >
          <div className="mt-2">
            <div>
              <small>{t("help_panel.disposizione")}</small>
            </div>
            <div>
              {i18n.language === "it" ? (
                <Legend01 width="288" className="mt-2" />
              ) : (
                <Legend01En width="288" className="mt-2" />
              )}
            </div>
          </div>
          <div className="mt-2">
            <small>{t("realismo:help_panel.colore")}</small>
            <div className="row">
              <div className="col-md-6">
                <BadgeLegenda
                  color="#FFD337"
                  name={t("realismo:help_panel.luogo_interno")}
                />
                <BadgeLegenda
                  color="#00C19C"
                  name={t("realismo:help_panel.luogo_esterno")}
                />
              </div>
              <div className="col-md-6">
                <BadgeLegenda
                  color="#5151FF"
                  name={t("realismo:help_panel.mezzo_di_trasporto")}
                />
                <BadgeLegenda
                  color="#C6CACF"
                  name={t("realismo:help_panel.assenza_di_ambientazione")}
                />
              </div>
            </div>
          </div>
          <div className="mt-2">
            <div>
              <small>{t("realismo:help_panel.movimento")}</small>
            </div>
            <div>
              {i18n.language === "it" ? (
                <img
                  src={Legend02}
                  width="200"
                  alt="Visione in dettaglio"
                  className="mt-2"
                />
              ) : (
                <img
                  src={Legend02En}
                  width="200"
                  alt="Visione in dettaglio"
                  className="mt-2"
                />
              )}
            </div>
          </div>
          <div className="mt-2">
            <div>
              <small>{t("realismo:help_panel.visione_in_dettaglio")}</small>
            </div>
            <div>
              {i18n.language === "it" ? (
                <Legend03 width="291" className="mt-2" />
              ) : (
                <Legend03En width="291" className="mt-2" />
              )}
            </div>
          </div>
        </Tab>
      </Tabs>
    </>
  )
}
