import React, { useState } from "react"
import { Tabs, Tab } from "react-bootstrap"
import { useTranslation, Trans } from "react-i18next"
import IntestazioneHelpPanel from "../../../panels/HelpSidePanel/components/IntestazioneHelpPanel"
import { ReactComponent as Legend01 } from "./icons/cancellazione_a_dimensione.svg"
import { ReactComponent as Legend02 } from "./icons/cancellazione_a_disposizione.svg"
import { ReactComponent as Legend03 } from "./icons/cancellazione_a_colore.svg"
import { ReactComponent as Legend04 } from "./icons/cancellazione_griglia.svg"
import { Link } from "react-router-dom"

export default function CancellazioneHelp() {
  const [key, setKey] = useState("info")
  const { t } = useTranslation(["translation", "cancellazione"])
  return (
    <>
      <IntestazioneHelpPanel
        tappa={3}
        linkTappa1={"/doubt/phase1"}
        linkTappa2={"/doubt/phase2"}
        linkTappa3={"/doubt/phase3"}
        titolo={t("cancellazione")}
        linkItinerario={"/itineraries#doubt"}
        linkApprofondimento="/doubt/phase3/focus"
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
          <Trans
            i18nKey={"help_panel.di_cosa_si_tratta"}
            t={t}
            ns="cancellazione"
          >
            <p>
              Il testo dubitativo tende a minare la stabilità della narrazione
              dal suo interno. La visualizzazione si focalizza su questo
              aspetto, mettendo da parte la visione dei singoli racconti o
              romanzi a favore di una diversa forma di aggregazione, un elemento
              grafico che rappresenta unicamente la presenza del testo
              dubitativo. Con il vantaggio di integrare due diverse prospettive
              di analisi: una che mostra il “comportamento” del testo dubitativo
              nell’opera tramite la disposizione spaziale dei vari elementi e il
              loro colore; l’altra a cui si accede, invece, “aprendo” i singoli
              elementi grafici e svelando la loro composizione legata a una
              determinata griglia d’analisi che ci ha guidato nella creazione
              del database che sta dietro a questa visualizzazione.
            </p>
          </Trans>
          <p>
            <strong>{t("help_panel.come_funziona")}</strong>
          </p>
          <Trans i18nKey={"help_panel.come_funziona"} t={t} ns="cancellazione">
            <p>
              La disposizione nello spazio si basa su due criteri: (1) la
              quantità di testo dubitativo in proporzione alla lunghezza totale
              dell’opera; (2) una griglia che descrive per ogni singola
              occorrenza cosa viene messo in dubbio (<i>Categoria</i>) e come il
              dubbio viene espresso (<i>Stile</i>). Le occorrenze analizzate
              tramite questo schema delineano un profilo di utilizzo del testo
              dubitativo: i testi con delle caratteristiche in comune sono
              collocati vicini, mentre i testi che condividono poco o nulla tra
              loro si allontanano. La griglia è composta da tre categorie:{" "}
              <span style={{ color: "#FFD337" }}>contenuto</span> (si dubita del
              contenuto che si vuole raccontare),{" "}
              <span style={{ color: "#00BFD3" }}>forma</span> (si dubita del
              modo in cui si vuole esprimere il contenuto della narrazione),
              <span style={{ color: "#FF3366" }}>significato</span> (si dubita
              dell’interpretazione del contenuto della narrazione). E da tre
              tipi di <i>stile</i>: <i>esitazione</i> (si esita sul contenuto,
              sulla forma o sul significato di quanto appena affermato),{" "}
              <i>riformulazione</i> (si riformula il contenuto, la forma o il
              significato di quanto appena affermato), <i>negazione</i> (si nega
              il contenuto, la forma o il significato di quanto appena
              affermato). Ogni occorrenza di testo dubitativo è stata analizzata
              attraverso il duplice <i>focus</i> dei
              <i>Livelli</i> e degli <i>Stili</i>. Il colore degli elementi
              grafici corrisponde alla percentuale di utilizzo delle diverse{" "}
              <i>Categorie</i> nel testo dubitativo di ogni singola opera. La
              loro dimensione corrisponde alla quantità in caratteri di testo
              dubitativo misurata in caratteri. Se selezionato, ogni{" "}
              <i>elemento grafico</i> si “apre”, mostrando la distribuzione
              interna delle occorrenze in base alla griglia con la quale il
              testo dubitativo è stato analizzato. La visualizzazione può essere
              esplorata tramite la ricerca per titolo (<i>Cerca per</i>) e i
              testi possono essere selezionati in base a un intervallo temporale
              (<i>Filtro cronologico</i>). Inoltre è possibile modificare la
              scala cromatica della visualizzazione, scegliendo come parametro
              uno stile (<i>olora per stile</i>): questa funzione permette di
              vedere l’intensità d’utilizzo nei vari <i>elementi grafici</i> del
              tipo di
              <i>stile</i> selezionato.
            </p>
          </Trans>
          <p>
            <strong>{t("help_panel.qualche_pista_di_lettura")}</strong>
          </p>
          <Trans i18nKey={"help_panel.qualche_pista_di_lettura"} t={t} ns="cancellazione">
            <p>
              La linea verticale è stata introdotta all’interno della
              visualizzazione per sottolineare una particolare distribuzione
              degli elementi nello spazio. A sinistra della linea abbiamo a che
              fare con un’area cromaticamente omogenea, tendente al giallo (
              <span style={{ color: "#FFD337" }}>contenuto</span>), in cui la
              presenza di testo dubitativo è quantitativamente inferiore; a
              destra invece la presenza di testo dubitativo si intensifica e il
              colore degli elementi grafici suggerisce una maggiore combinazione
              nell’utilizzo delle <i>Categorie</i>. Questa separazione, emersa
              spontaneamente dalla disposizione dei testi nello spazio in base
              ai dati raccolti, sembra rispecchiare una divisione cronologica; a
              sinistra tenderanno infatti a collocarsi i testi prima degli anni
              ’60, con qualche rara eccezione: “superano” la linea{" "}
              <i>Campo di mine</i>
              (1946), <i>L’avventura di un soldato</i> (1949) (vedi{" "}
              <Link to="/doubt/phase3/focus">Approfondimento</Link>),{" "}
              <i>La casa degli alveari</i> (1949),{" "}
              <i>L’avventura di un impiegato</i> (1953),
              <i>L’avventura di un fotografo</i> (1955),{" "}
              <i>Il cavaliere inesistente</i> (1959). Una maggiore densità di
              testo dubitativo spinge questi testi verso destra, suggerendoci
              che, nonostante l’utilizzo del testo dubitativo si intensifichi
              pienamente a partire dagli anni ’60, era presente fin dall’inizio
              dell’opera.
            </p>
          </Trans>
        </Tab>
        <Tab tabClassName="tab-info" eventKey="legenda" title="Legenda">
          <div className="row mt-2">
            <div className="col-md-12">
              <div>
                <small>{t('help_panel.dimensione')}</small>
              </div>
              <div className="mt-2">
                <Legend01 />
              </div>
            </div>
          </div>
          <div className="mt-2">
            <div>
              <small>{t('help_panel.disposizione')}</small>
            </div>
            <div className="mt-2">
              <Legend02 />
            </div>
          </div>
          <div className="mt-2">
            <div>
              <small>{t('cancellazione:help_panel.colore')}</small>
            </div>
            <div className="mt-2">
              <Legend03 />
            </div>
          </div>
          <div className="mt-2">
            <div>
              <small>{t('cancellazione:help_panel.griglia')}</small>
            </div>
            <div className="mt-2">
              <Legend04 height="auto" className="mb-4" />
            </div>
          </div>
        </Tab>
      </Tabs>
    </>
  )
}
