import React, { useState } from "react"
import { Tabs, Tab } from "react-bootstrap"
import { Link } from 'react-router-dom'
import IntestazioneHelpPanel from "../../../panels/HelpSidePanel/components/IntestazioneHelpPanel"

import "./ProcessCombiningMainHelp.css"

export default function ProcessCombiningMainHelp() {
  const [key, setKey] = useState("info")
  return (
    <>
      <IntestazioneHelpPanel
        tappa={1}
        linkTappa1={"/space/phase3/focus"}
        linkTappa2={"/form/phase1"}
        linkTappa3={"/phase3-problem"}
        titolo="Combinare"
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
            La visualizzazione rappresenta le dinamiche combinatorie nei volumi
            del corpus. Ogni volume di narrativa pubblicato in vita da Calvino è
            rappresentato da una colonna il cui spessore corrisponde alla
            lunghezza in caratteri. Ogni colonna è divisa in segmenti che
            mostrano l’organizzazione strutturale del contenuto in tre piani
            fondamentali: il piano{" "}
            <span style={{ color: "#00C19C" }}>esteriore</span> (che riunisce le
            azioni dei personaggi e gli eventi del mondo fisico), il piano
            <span style={{ color: "#5151FC" }}>interiore</span> (che riunisce
            sentimenti, pensieri e stati d’animo), il piano{" "}
            <span style={{ color: "#FFA500" }}>formale</span> (che riunisce
            cornici, inserti metaletterari, e strutture paratestuali).
          </p>
          <p>
            <strong>Come funziona</strong>
          </p>
          <p>
            La visualizzazione è organizzata su diversi livelli di
            approfondimento progressivo. In primo luogo, la segmentazione delle
            colonne mostra la struttura di superficie dei volumi: l’ampiezza e
            la disposizione dei tre tipi di segmenti colorati, che possono
            essere visualizzati in modo <i>Aggregato</i> o <i>Non aggregato</i>, rappresenta
            la modalità che Calvino sceglie per costruire lo scheletro portante
            dei propri volumi (ad esempio alternando scene del mondo esterno e
            parentesi di interiorità, oppure ponendo il lettore davanti a indici
            stratificati e soglie metaletterarie, o ancora con una combinazione
            di tutte le possibilità). Selezionando il filtro <i>Piani/Sequenze</i> si
            passa alla struttura intermedia: in questa configurazione la
            visualizzazione permette di vedere le sequenze narrative particolari
            che compongono i tre piani di superficie, rivelando più in dettaglio
            quali sono i blocchi ricorrenti delle narrazioni calviniane e come
            si distribuiscono all’interno dei volumi e nel corso del tempo.
            Cliccando su una specifica colonna, infine, si accede alla struttura
            di profondità: il volume selezionato si apre per rivelare tutti i
            livelli interni alle sequenze, esponendo la stratificazione dei
            singoli motivi che si annidano l’uno nell’altro nella geometria a
            scatole cinesi tipica della scrittura calviniana (esplorabili con un
            cursore che permette inoltre di evidenziare l’eventuale presenza di
            serie perfettamente identiche in altri volumi del corpus).
            Selezionando una o più delle sequenze elencate a margine, si possono
            inoltre isolare graficamente i segmenti che le rappresentano su
            tutti i livelli, così da poter misurare a colpo d’occhio la loro
            quantità nel volume, la loro frequenza relativa, e le loro
            interazioni reciproche. Attraverso il filtro <i>Livelli</i> è infine
            possibile restringere la visualizzazione in base al numero di
            annidamenti, isolando sullo schermo i volumi che hanno la stessa
            complessità strutturale, per confrontare più agevolmente le
            strategie compositive ricorrenti di Calvino.
          </p>
          <p>
            <strong>Qualche pista di lettura</strong>
          </p>
          <p>
            Nel complesso la visualizzazione offre una sintesi visiva delle
            abitudini compositive di Calvino, che tende a costruire i suoi testi
            secondo un procedimento modulare, in cui una quantità limitata di
            elementi narrativi viene continuamente riciclata e ricombinata in
            formule nuove ma imparentate da un’aria familiare. Rappresentando
            graficamente le varie stratificazioni strutturali permette di
            osservare la crescente passione dell’autore per il gioco a esibire
            costruzioni sempre più complesse, che legano precisione matematica
            (come gli indici di <i>Palomar</i>, raggruppati in terzetti esponenziali) e
            variazioni calcolate (come nella raccolta <i>Le cosmicomiche vecchie e
            nuove</i>, che ridispone in raggruppamenti nuovi i racconti già usciti
            nelle raccolte precedenti), e passano da esperimenti di minimalismo
            estremo come il livello unico delle Città invisibili a formule
            caotiche come la struttura composita di <i>Se una notte d’inverno un
            viaggiatore</i>. Ma, in modo più sottile, consente anche di ritrovare
            tracce di pratica combinatoria e una forte attenzione al calcolo
            degli equilibri strutturali in opere solitamente considerate
            “tradizionali” come i racconti realistici composti tra gli anni
            Cinquanta e Sessanta (vedi <Link to='/'>Approfondimento</Link>).
          </p>
        </Tab>
        <Tab tabClassName="tab-info" eventKey="legenda" title="Legenda"></Tab>
      </Tabs>
    </>
  )
}
