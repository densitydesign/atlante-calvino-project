import React, { useState } from "react"
import ArrowButton from "../../../general/ArrowButton/ArrowButton"
import { Tabs, Tab } from "react-bootstrap"
import { Link } from "react-router-dom"
import IntestazioneHelpPanel from "../../../panels/HelpSidePanel/components/IntestazioneHelpPanel"

import "./PlotMainHelp.css"

export default function PlotMainHelp() {
  const [key, setKey] = useState("info")
  return (
    <>
      <IntestazioneHelpPanel
        tappa={3}
        linkTappa1={"/Phenomena/territory/doubtAnalysis"}
        linkTappa2={"/Process/doubting"}
        linkTappa3={"/Problem/cancellation"}
        titolo="Trama"
        linkApprofondimento="/Process/doubting/Hesitation/informationSheet"
        nomeItinerario={"ITINERARIO FORMA"}
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
            La visualizzazione rappresenta le forme della trama che
            costituiscono l’ossatura narrativa dei testi del corpus. La trama di
            ogni testo pubblicato in vita da Calvino è sintetizzata nella forma
            di una linea colorata che, come un sismografo, si muove su due assi:
            quello orizzontale, orientato da destra a sinistra, rappresenta
            l’avanzamento lineare del testo dall’incipit alla conclusione,
            mentre quello verticale presenta un elenco ragionato dei più comuni
            tipi di sequenza narrativa riscontrati nel corpus, raggruppati e
            riordinati in base alla loro capacità di perturbare la vicenda
            narrata, dai più statici, come i brani metaletterari e descrittivi,
            a quelli intermedi, come i passaggi dedicati ai moti interiori, fino
            ai più dinamici, come gli incontri-scontri tra personaggi e
            l’esperienza della morte.
          </p>
          <p>
            <strong>Come si legge</strong>
          </p>
          <p>
            La visualizzazione è organizzata in modo da offrire una doppia
            direzione di lettura. Nella prima schermata, il panorama frontale
            delle linee mette a confronto tutte le trame dei testi calviniani,
            disponendole in uno spazio uniforme indipendentemente dalla loro
            lunghezza. Il movimento orizzontale di ogni linea è basato sulla
            scansione del tempo del racconto, cioè aderisce all’intreccio e alla
            disposizione che la materia narrativa segue nel testo reale,
            indipendentemente dalla presenza di flashback o anticipazioni.
            Interagendo con il panorama o con la barra di ricerca per titolo, è
            possibile portare in evidenza una o più linee, lungo le quali,
            scorrendo con un cursore, si possono leggere i nomi delle sequenze
            che articolano il percorso. Cliccando sull’etichetta che contiene il
            titolo del testo, si può inoltre isolare ogni linea per analizzare
            in dettaglio tutti i punti della sua struttura narrativa. Sfruttando
            l’opzione Ruota vista, si può poi accedere alla seconda modalità di
            lettura: l’intera visualizzazione compie un giro di 90° su se
            stessa, e permette di osservare il panorama “di profilo”, da una
            prospettiva che mette in risalto l’estensione verticale delle linee,
            calcolata sull’intervallo tra il suo punto più basso e quello più
            alto, e mostra quale parte dell’elenco dei motivi letterari
            ricorrenti è stata coinvolta da Calvino nella composizione di ogni
            trama. I due marcatori geometrici che si trovano sulle linee
            indicano rispettivamente la sequenza di apertura e di chiusura di
            ogni testo: in questo modo è possibile avere uno sguardo totale sui
            motivi letterari che l’autore sceglie di usare come incipit e finali
            dei suoi testi. Per entrambe le modalità di lettura è sempre
            possibile visualizzare l’elenco delle sequenze, che può anche essere
            usato per interrogare le visualizzazioni selezionando un proprio
            intervallo personalizzato e verificando se e quali trame hanno
            un’estensione che coincide esattamente con i confini scelti.Q
          </p>
          <p>
            <strong>Qualche pista di lettura</strong>
          </p>
          <p>
            Entrambe le modalità di lettura offerte dalla visualizzazione
            offrono la possibilità di immergersi nel mondo di trame di Calvino
            per scoprirne aspetti notevoli. Nella visione panoramica frontale,
            un esempio è l’uso del cursore su due o più linee evidenziate
            contemporaneamente: uno strumento che permette di rilevare eventuali
            coincidenze e divaricazioni tra le strutture dei testi, ad esempio
            mostrando la presenza della stessa sequenza nella stessa posizione
            in racconti di genere diverso, o composti a distanza di molti anni,
            oppure viceversa segnalando il disallineamento di racconti che, a
            prima vista, sembrerebbero invece collegati da una sostanziale
            somiglianza narrativa. La visione panoramica laterale, da parte sua,
            consente tra le altre cose di avere un resoconto visivo di una
            questione primaria per Calvino, quella del Cominciare e del Finire.
            Grazie alla redistribuzione delle linee si può vedere non soltanto
            il resoconto delle scelte dell’autore quando si tratta di decidere
            qual è il modo migliore per far aprire e chiudere una storia, ma si
            può anche avere una sintesi dell’orientamento complessivo delle
            trame: sapendo che le sequenze sono disposte in base alla loro
            potenzialità perturbante rispetto all’entropia della narrazione,
            possiamo subito dedurre dalla posizione dei marcatori di inizio-fine
            se l’asse complessivo di un racconto è ascendente o discendente,
            cioè se la vicenda termina in una situazione di maggiore o minore
            squilibrio rispetto al suo inizio.
          </p>
        </Tab>
        <Tab tabClassName="tab-info" eventKey="legenda" title="Legenda"></Tab>
      </Tabs>
    </>
  )
}
