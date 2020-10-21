import React, { useState } from "react"
import { Tabs, Tab } from "react-bootstrap"
import IntestazioneHelpPanel from "../../../panels/HelpSidePanel/components/IntestazioneHelpPanel"

import "./TerritoryMainHelp.css"

export default function TerritoryMainHelp() {
  const [key, setKey] = useState("info")
  return (
    <>
      <IntestazioneHelpPanel
        tappa={1}
        linkTappa1={"/Phenomena/intro"}
        linkTappa2={"/Process/intro"}
        linkTappa3={"/Problem/intro"}
        titolo="Esplorare l'opera come un territorio"
        nomeItinerario={"IL FENOMENO"}
      />
      <Tabs
        className="mt-5"
        id="info-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab tabClassName="tab-info" eventKey="info" title="Di cosa si tratta">
          <p className="mt-4">
            <strong>Di cosa si tratta</strong>
          </p>
          <p>
            Questa visualizzazione, che accomuna la prima tappa di tutti e tre
            gli itinerari, rappresenta il corpus delle opere narrative di
            Calvino: oltre duecento testi scritti e pubblicati tra il 1943 e il
            1985, distribuiti secondo criteri cronologici ed editoriali. A ogni
            elemento grafico corrisponde un testo, per cui l’unità minima della
            visualizzazione non sarà il volume ma il singolo testo. All’inizio
            dell’Atlante abbiamo sentito la necessità di rappresentare l’intero
            corpus dell’autore in un solo colpo d’occhio che fornisse una nuova
            visione generale dell’opera, invitando a esplorarla.
          </p>
          <p>
            <strong>Come funziona</strong>
          </p>
          <p>
            Per leggere correttamente la visualizzazione è necessario prestare
            attenzione a tre parametri: a) la disposizione degli elementi; b) la
            loro dimensione; c) l’uso del colore.
          </p>
        </Tab>
        <Tab tabClassName="tab-info" eventKey="legenda" title="Legenda"></Tab>
      </Tabs>
    </>
  )
}
