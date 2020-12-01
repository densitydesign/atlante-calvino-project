import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import IntestazioneHelpPanel from "../../../panels/HelpSidePanel/components/IntestazioneHelpPanel";
import "./ProcessDoubtingMainHelp.css";
import { Link } from "react-router-dom";
import { ReactComponent as Legend01 } from "./icons/dubitare_disposizione.svg";
import { ReactComponent as Legend01En } from "./icons/dubitare_disposizione_en.svg";
import Legend02 from "./icons/dubitare_disposizioneGIF.gif";
import Legend02En from "./icons/dubitare_disposizioneGIF_en.gif";
import BadgeLegenda from "../../../panels/HelpSidePanel/components/BadgeLegenda";
import { useTranslation, Trans } from "react-i18next";

export default function ProcessDoubtingMainHelp() {
  const [key, setKey] = useState("info");
  const { t, i18n } = useTranslation(["translation", "doubting"]);
  return (
    <>
      <IntestazioneHelpPanel
        tappa={2}
        linkTappa1={"/doubt/phase1"}
        linkTappa2={"/doubt/phase2"}
        linkTappa3={"/doubt/phase3"}
        linkItinerario={"/itineraries#doubt"}
        titolo={t("dubitare")}
        linkApprofondimento="/doubt/phase2/focus"
        nomeItinerario={t("doubting:help_panel.itinerario_dubbio")}
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
          <Trans i18nKey={"help_panel.di_cosa_si_tratta"} t={t} ns="doubting">
            <p>
              Si definisce{" "}
              <span style={{ color: "#BBBBFF" }}>testo dubitativo</span> un tipo
              di testo che torna continuamente sui propri passi per cancellare e
              riscrivere quanto affermato in precedenza. Il lettore si trova di
              fronte a un testo instabile, all’interno del quale entrano in
              competizione e si sommano numerose versioni possibili della storia
              che il narratore cerca di raccontare con molti dubbi e difficoltà.
              La visualizzazione mostra la presenza del{" "}
              <span style={{ color: "#BBBBFF" }}>testo dubitativo</span>{" "}
              all’interno dell’opera e permette di indagare il modo in cui tale
              tipo di testo altera la linearità del meccanismo narrativo.
            </p>
          </Trans>
          <p>
            <strong>{t("help_panel.come_funziona")}</strong>
          </p>
          <Trans i18nKey={"help_panel.come_funziona"} t={t} ns="doubting">
            <p>
              La visualizzazione può essere esplorata in due modi:
              <br /> Il primo modo permette di avere un colpo d’occhio
              sull’estensione del processo in tutta l’opera. Le colonne, che
              rappresentano i testi, sono disposte cronologicamente per data di
              prima pubblicazione lungo l’asse orizzontale e colorate secondo la
              presenza di quattro tipi di testo:{" "}
              <span style={{ color: "#BBBBFF" }}>testo dubitativo</span> (zona
              di espressione del dubbio);{" "}
              <span style={{ color: "#FFD337" }}>testo oggetto di dubbio</span>{" "}
              (zona del testo messa in dubbio);{" "}
              <span style={{ color: "#00C19C" }}>
                testo dubitativo e oggetto di dubbio
              </span>{" "}
              (zona del testo in cui viene espresso un dubbio e di cui poi si
              dubita);{" "}
              <span style={{ color: "#AFAFAF" }}>testo non dubitativo</span>{" "}
              (zona neutra).
              <br />
              <br />
              Ogni colonna se selezionata si “apre” e mostra, tramite una scala
              cromatica d’intensità crescente, la quantità di caratteri che è
              stata messa in discussione una o più volte dal processo
              dubitativo; l’informazione è riportata in percentuale accanto al
              tipo di testo corrispondente. Il numero di volte che un{" "}
              <span style={{ color: "#BBBBFF" }}>testo dubitativo</span> o un{" "}
              <span style={{ color: "#FFD337" }}>testo oggetto di dubbio</span>{" "}
              sono stati messi in discussione determina il{" "}
              <i>Numero di livelli</i>.<br />
              <br />
              Varie funzioni permettono di esplorare i dati raccolti, filtrando
              i testi secondo diversi criteri (
              <i>
                Cerca per; Tipo di pubblicazione; Numero di livelli, Filtro
                cronologico
              </i>
              ) o modificando la loro scala di valore (<i>Lunghezza</i>).
              Inoltre è possibile riorganizzare la successione delle barre
              scegliendo un tipo di testo come parametro ordinante.
              <br />
              <br />
              Il secondo modo mostra l’andamento del processo dubitativo nel
              testo selezionato. In questo caso è possibile vedere le singole
              occorrenze dei diversi tipi di testo, ma soprattutto in che modo
              si creano i <i>livelli</i>.
            </p>
          </Trans>
          <p>
            <strong>{t("help_panel.qualche_pista_di_lettura")}</strong>
          </p>
          <Trans
            i18nKey={"help_panel.qualche_pista_di_lettura"}
            t={t}
            ns="doubting"
          >
            <p>
              Il primo aspetto che emerge dalla visualizzazione è la crescita
              esponenziale del fenomeno a partire dalla fine degli anni
              Cinquanta, ma non solo. Nello stesso periodo in cui si intensifica
              la presenza del{" "}
              <span style={{ color: "#BBBBFF" }}>testo dubitativo</span> anche
              la presenza di{" "}
              <span style={{ color: "#00C19C" }}>
                testo dubitativo e oggetto di dubbio
              </span>{" "}
              aumenta, suggerendoci che più il testo dubita di se stesso minando
              il proprio statuto, più il{" "}
              <span style={{ color: "#BBBBFF" }}>testo dubitativo</span> a sua
              volta diventa fragile e oggetto di continue negazioni e
              riformulazioni.
              <br />
              <br />
              Passando a esaminare la struttura interna dei singoli racconti o
              romanzi, la visualizzazione mostra la diversa configurazione del
              processo dubitativo a seconda del testo. In particolare, rispetto
              al modo in cui si strutturano i livelli, si possono individuare
              due tendenze: a) da un lato troviamo opere che si costruiscono su
              catene di ipotesi frammentate e di estensione contenuta,
              stabilendo così un percorso di lettura fortemente instabile (es.{" "}
              <i>Ti con Zero</i>); b) dall’altro invece opere che, dopo aver
              accumulato alcune occorrenze di{" "}
              <span style={{ color: "#BBBBFF" }}>testo dubitativo</span>,
              tendono verso la fine ad annullare il percorso compiuto,
              includendo nell’ultimo{" "}
              <span style={{ color: "#FFD337" }}>oggetto di dubbio</span> una
              grande quantità di testo (es. <i>L’inseguimento</i>). Nel primo
              caso il numero dei livelli sale molto di più che nel secondo.
              <br />
              <br />
              Le due tendenze sono più evidenti nelle forme brevi, ma anche nei
              romanzi si possono individuare strategie simili nella
              distribuzione delle occorrenze del processo dubitativo (vedi{" "}
              <Link to="/doubt/phase2/focus">Approfondimento</Link>
              ).
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
              <small>
                {t("doubting:help_panel.disposizione_sulle_colonne")}
              </small>
            </div>
            <div className="row">
              <div className="col-md-6">
                {i18n.language === "it" ? (
                  <Legend01 width="124" />
                ) : (
                  <Legend01En width="124" />
                )}
              </div>
              <div className="col-md-6 text-left">
                <img
                  width="157"
                  src={Legend02}
                  alt="Legenda"
                  style={{ maxWidth: "100%" }}
                />
                <div>
                  <Trans i18nKey={"help_panel.testo_gif"} t={t} ns="doubting">
                    <p className="text-legenda">
                      Testi disposti secondo data di prima pubblicazione.
                    </p>
                    <p className="text-legenda gray">
                      Apri la colonna cliccando, poi scorri verso il basso per
                      vedere l’andamento del processo dubitativo.
                    </p>
                  </Trans>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-12">
              <div>
                <small>{t("doubting:help_panel.tipo_di_fenomeno")}</small>
              </div>
              <div>
                <BadgeLegenda
                  color="#BBBBFF"
                  name={t("doubting:help_panel.testo_dubitativo_dt")}
                />
                <BadgeLegenda
                  color="#FFD337"
                  name={t("doubting:help_panel.oggetto_di_dubbio")}
                />
                <BadgeLegenda
                  color="#00C19C"
                  name={t("doubting:help_panel.dubitativo_e_oggetto_di_dubbio")}
                />
                <BadgeLegenda
                  color="#C6CACF"
                  name={t("doubting:help_panel.non_dubitativo")}
                />
              </div>
            </div>
          </div>
        </Tab>
      </Tabs>
    </>
  );
}
