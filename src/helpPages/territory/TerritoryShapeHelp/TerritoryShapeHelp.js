import React, { useState } from "react"
import { Tabs, Tab } from "react-bootstrap"
import IntestazioneHelpPanel from "../../../panels/HelpSidePanel/components/IntestazioneHelpPanel"

import "./TerritoryShapeHelp.css"

export default function TerritoryShapeHelp() {
  const [key, setKey] = useState("info")
  return (
    <>
      <IntestazioneHelpPanel
        tappa={1}
        linkTappa1={"/form/phase1"}
        linkTappa2={"/form/phase3"}
        linkTappa3={"/phase3-problem"}
        titolo="Elenchi"
        linkApprofondimento="/"
        nomeItinerario={"ITINERARIO FORMA"}
      />
      <Tabs
        className="mt-5"
        id="info-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab tabClassName="tab-info" eventKey="info" title="Spiegazione">
          <p className="mt-4">
            <strong>Di cosa si tratta</strong>
          </p>
          <p>
            Perché gli elenchi? Perché Calvino è un autore fondamentalmente
            elencatorio, che usa gli elenchi in modo virtuosistico e con grande
            frequenza. Gli elenchi rappresentano il grado zero di quella forma
            “modulare” della sua scrittura che indagheremo nel corso di questo
            itinerario.
          </p>
          <p>
            Sono stati considerati elenchi tutte le sequenze composte da più di
            tre componenti, e i vari tipi sono stati distinti scegliendo come
            parametro la complessità degli elementi sintattici che li compongono
            (quando gli elenchi sono composti da tipi diversi si è seguito il
            criterio del tipo più presente), e sono segnalati da colori diversi:
            elenchi di singole <span style={{ color: "#00c19c" }}>parole</span>{" "}
            (nomi, aggettivi, verbi, avverbi, con o senza articoli), elenchi di{" "}
            <span style={{ color: "#FFA500" }}>sintagmi</span> (unità
            sintattiche complesse senza significato compiuto), elenchi di{" "}
            <span style={{ color: "#5151fc" }}>proposizioni</span> (unità
            sintattiche complesse con significato compiuto), elenchi{" "}
            <span style={{ color: "#FF3366" }}>misti</span> (sequenze in cui gli
            elementi precedenti sono mescolati in modo tale che nessuno è
            dominante sugli altri).
          </p>
          <p>
            <strong>Come funziona</strong>
          </p>
          <p>
            La visualizzazione mostra in primo luogo la distribuzione tra i tipi
            di elenchi: ogni cerchio del territorio è diviso in segmenti
            colorati di lunghezza diversa, che rispecchiano il rapporto tra le
            estensioni dei vari tipi di elenchi presenti all’interno di un certo
            testo, calcolata in base al numero di caratteri. Sulla base di
            questa rappresentazione grafica, un primo filtro permette di
            selezionare individualmente uno o più tipi per osservarne la
            distribuzione sul corpus.
          </p>
          <p>
            La modalità <em>Proporzione</em> permette di visualizzare nello
            specifico il rapporto tra la quantità di testo occupata dai vari
            elenchi, aggregati indipendentemente dalla suddivisione per
            tipologia, e la lunghezza complessiva di ogni opera.
          </p>
          <p>
            <strong>Qualche pista di lettura</strong>
          </p>
          <p>
            Nel complesso, la trasposizione grafica dei dati permette di avere
            una panoramica sull’uso delle strutture elencatorie da parte di
            Calvino, che rivela come primo dato evidente la pervasività di
            questo strumento stilistico: quasi la totalità del corpus presenta
            elenchi, e nella maggior parte dei casi la loro presenza supera il
            5% della lunghezza complessiva dei testi, il che rimarca la
            propensione dell’autore per l’espansione paradigmatica (elementi
            simili tra loro) rispetto allo sviluppo sintagmatico (elementi
            diversi tra loro) della narrazione. I dati rivelano anche una serie
            di informazioni sulle preferenze calviniane, e sulla loro
            oscillazione attraverso il tempo e i generi, tra cui la predominanza
            di elenchi che coinvolgono strutture complesse (sintagmi o frasi), e
            la tendenza a mescolare sempre i diversi tipi, il che segnala una
            precisa consapevolezza artistica e la ricerca di una forma di
            equilibrio nell’impiego di questa forma di accumulazione verbale
            (vedi <strong>Approfondimento</strong>).
          </p>
        </Tab>
        <Tab tabClassName="tab-info" eventKey="legenda" title="Legenda"></Tab>
      </Tabs>
    </>
  )
}
