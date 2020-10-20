import React, { useState } from "react"
import { Tabs, Tab } from "react-bootstrap"
import IntestazioneHelpPanel from "../../../panels/HelpSidePanel/components/IntestazioneHelpPanel"
import "./ProcessDoubtingMainHelp.css"
import { Link } from "react-router-dom"

export default function ProcessDoubtingMainHelp() {
  const [key, setKey] = useState("info")
  return (
    <>
      <IntestazioneHelpPanel
        tappa={2}
        linkTappa1={"/Phenomena/territory/doubtAnalysis"}
        linkTappa2={"/Process/doubting"}
        linkTappa3={"/Problem/cancellation"}
        titolo="Dubitare"
        linkApprofondimento="/Process/doubting/Hesitation/informationSheet"
        nomeItinerario={"ITINERARIO DUBBIO"}
      />
      <Tabs
        className="mt-5"
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab tabClassName="tab-info" eventKey="info" title="Di cosa si tratta">
          <p className="mt-4">
            <strong>Di cosa si tratta</strong>
          </p>
          <p>
            Si definisce{" "}
            <span style={{ color: "#BBBBFF" }}>testo dubitativo</span> un tipo
            di testo che torna continuamente sui propri passi per cancellare e
            riscrivere quanto affermato in precedenza. Il lettore si trova di
            fronte a un testo instabile, all’interno del quale entrano in
            competizione e si sommano numerose versioni possibili della storia
            che il narratore cerca di raccontare con molti dubbi e difficoltà.
            La visualizzazione mostra la presenza del testo dubitativo
            all’interno dell’opera e permette di indagare il modo in cui tale
            tipo di testo altera la linearità del meccanismo narrativo.
          </p>
          <p>
            <strong>Come funziona</strong>
          </p>
          <p>
            La visualizzazione può essere esplorata in due modi:
            <br /> Il primo modo permette di avere un colpo d’occhio
            sull’estensione del processo in tutta l’opera. Le colonne, che
            rappresentano i testi, sono disposte cronologicamente per data di
            prima pubblicazione lungo l’asse orizzontale e colorate secondo la
            presenza di quattro tipi di testo:
            <span style={{ color: "#BBBBFF" }}>testo dubitativo</span> (zona di
            espressione del dubbio);{" "}
            <span style={{ color: "#FFD337" }}>testo oggetto di dubbio</span>{" "}
            (zona del testo messa in dubbio); testo dubitativo e oggetto di
            dubbio (zona del testo in cui viene espresso un dubbio e di cui poi
            si dubita); testo non dubitativo (zona neutra).
            <br />
            Ogni colonna se selezionata si “apre” e mostra, tramite una scala
            cromatica d’intensità crescente, la quantità di caratteri che è
            stata messa in discussione una o più volte dal processo dubitativo;
            l’informazione è riportata in percentuale accanto al tipo di testo
            corrispondente. Il numero di volte che un testo dubitativo o un
            testo oggetto di dubbio sono stati messi in discussione determina il
            Numero di livelli. Varie funzioni permettono di esplorare i dati
            raccolti, filtrando i testi secondo diversi criteri (Cerca per; Tipo
            di pubblicazione; Numero di livelli, Filtro cronologico) o
            modificando la loro scala di valore (Lunghezza). Inoltre è possibile
            riorganizzare la successione delle barre scegliendo un tipo di testo
            come parametro ordinante. Il secondo modo mostra l’andamento del
            processo dubitativo nel testo selezionato. In questo caso è
            possibile vedere le singole occorrenze dei diversi tipi di testo, ma
            soprattutto in che modo si creano i livelli.
          </p>
          <p>
            <strong>Qualche pista di lettura</strong>
          </p>
          <p>
            Il primo aspetto che emerge dalla visualizzazione è la crescita
            esponenziale del fenomeno a partire dalla fine degli anni Cinquanta,
            ma non solo. Nello stesso periodo in cui si intensifica la presenza
            del <span style={{ color: "#BBBBFF" }}>testo dubitativo</span> anche
            la presenza di{" "}
            <span style={{ color: "#00C19C" }}>
              testo dubitativo e oggetto di dubbio
            </span>{" "}
            aumenta, suggerendoci che più il testo dubita di se stesso minando
            il proprio statuto, più il{" "}
            <span style={{ color: "#BBBBFF" }}>testo dubitativo</span> a sua
            volta diventa fragile e oggetto di continue negazioni e
            riformulazioni. Passando a esaminare la struttura interna dei
            singoli racconti o romanzi, la visualizzazione mostra la diversa
            configurazione del processo dubitativo a seconda del testo. In
            particolare, rispetto al modo in cui si strutturano i livelli, si
            possono individuare due tendenze: a) da un lato troviamo opere che
            si costruiscono su catene di ipotesi frammentate e di estensione
            contenuta, stabilendo così un percorso di lettura fortemente
            instabile (es. Ti con Zero); b) dall’altro invece opere che, dopo
            aver accumulato alcune occorrenze di{" "}
            <span style={{ color: "#BBBBFF" }}>testo dubitativo</span>, tendono
            verso la fine ad annullare il percorso compiuto, includendo
            nell’ultimo{" "}
            <span style={{ color: "#FFD337" }}>oggetto di dubbio</span> una
            grande quantità di testo (es. L’inseguimento). Nel primo caso il
            numero dei livelli sale molto di più che nel secondo. Le due
            tendenze sono più evidenti nelle forme brevi, ma anche nei romanzi
            si possono individuare strategie simili nella distribuzione delle
            occorrenze del processo dubitativo (vedi{" "}
            <Link to="/Process/doubting/Hesitation/informationSheet">
              Approfondimento
            </Link>
            ).
          </p>
        </Tab>
        <Tab tabClassName="tab-info" eventKey="legenda" title="Legenda"></Tab>
      </Tabs>
    </>
  )
}
