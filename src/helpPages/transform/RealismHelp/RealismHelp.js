import React, { useState } from "react"
import { Tabs, Tab } from "react-bootstrap"
import IntestazioneHelpPanel from "../../../panels/HelpSidePanel/components/IntestazioneHelpPanel"
import { Link } from "react-router-dom"
import "./RealismHelp.css"

export default function RealismHelp() {
  const [key, setKey] = useState("info")
  return (
    <>
      <IntestazioneHelpPanel
        tappa={3}
        linkTappa1={"/space/phase1"}
        linkTappa2={"/space/phase2"}
        linkTappa3={"/space/phase3"}
        titolo="Realismo"
        linkApprofondimento="/combining/Combine/informationSheet"
        nomeItinerario={"ITINERARIO SPAZIO"}
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
            Dopo aver esplorato lo spazio dell’opera calviniana in molte delle
            sue principali dimensioni, la questione della rappresentazione della
            realtà viene nuovamente affrontata restringendo l’analisi allo
            spazio d’ambientazione terrestre, localizzabile (es. Sanremo) e non
            localizzabile (es. una città), dei testi brevi pubblicati in volume
            tra il 1945 e il 1983. Questa specifica selezione concentra il focus
            sullo spazio che possiamo definire più realista all’interno
            dell’opera dell’autore, con l’obiettivo di comprendere in che modo
            questo complesso insieme di figurazioni spaziali si trasformi e si
            modifichi nel corso del tempo.
          </p>
          <p>
            <strong>Come funziona</strong>
          </p>
          <p>
            La visualizzazione può essere esplorata in due modalità, che
            presentano rispettivamente una visione d’insieme di tutti i racconti
            e una visione in dettaglio di singoli testi che l’utente sceglie di
            selezionare. Nel primo caso ogni racconto è rappresentato da un
            elemento grafico lineare che si dispone in ordine cronologico di
            pubblicazione all’interno di un cerchio. Ogni linea, di lunghezza
            uniforme, rivela tre aspetti principali:{" "}
            <ol type="1">
              <li>
                il numero di ambientazioni attraverso cui si sviluppa la storia,
                rappresentate da pallini neri;{" "}
              </li>
              <li>
                la tipologia di ogni ambientazione:{" "}
                <span style={{ color: "#FFD337" }}>spazio interno</span>,{" "}
                <span style={{ color: "#00C19C" }}>spazio esterno</span>,{" "}
                <span style={{ color: "#5151FF" }}>mezzo di trasporto</span>,
                <span style={{ color: "#C6CACF" }}>
                  assenza di ambientazione
                </span>
                ;
              </li>
              <li>
                lo spostamento nello spazio, rappresentato dall’animazione che
                mostra l’eventuale presenza di movimento all’interno del testo.
              </li>
            </ol>
            Selezionando uno o più elementi e scorrendo verso il basso è
            possibile avere una visione in dettaglio che permette di scoprire
            altre tre importanti caratteristiche:{" "}
            <ol type="1">
              <li>
                la lunghezza reale del racconto selezionato, particolarmente
                utile nel caso in cui si confrontino più testi;
              </li>
              <li>la denominazione esatta di ciascun ambientazione;</li>
              <li>
                la presenza di livelli spaziali che si annidano l’uno dentro
                l’altro, qualora ci si trovi di fronte ad ambientazioni interne
                ad altri ambienti.
              </li>
            </ol>{" "}
          </p>
          <p>
            <strong>Qualche pista di lettura</strong>
          </p>
          <p>
            Una prima importante considerazione riguarda il movimento. Mettendo
            a confronto i primi due decenni della carriera di Calvino con i
            secondi due, si assiste a un’evidente inversione di tendenza: se tra
            il 1945 e il 1965 il movimento nello spazio è molto spiccato e
            soltanto una minima parte dei racconti non contempla scene di
            spostamento (7 su 73, vale a dire meno del 10%), dal 1965 in avanti
            i numeri si ribaltano a favore di un sostanziale immobilismo. Lo
            spostamento nello spazio non scompare ma si assottiglia notevolmente
            (è presente in 8 testi su 33, ossia circa nel 25% dei casi). Questo
            fenomeno è giustificato dalla nuova tendenza che emerge nella
            scrittura di Calvino a partire più o meno dalla metà degli anni
            Sessanta: l’azione, l’avventura e anche la carica fiabesca che
            caratterizzavano i testi partigiani, contadini o cittadini (si pensi
            a Marcovaldo, sempre intento a cimentarsi in qualche impresa)
            vengono meno, sostituiti da una forma e da un contenuto che si
            aprono piuttosto alla riflessione, alle digressioni descrittive e a
            alcuni procedimenti narrativi propri della scrittura saggistica.
            Questa inversione di tendenza non ha un riflesso diretto, come si
            potrebbe supporre, sul rapporto tra spazi esterni e spazi interni.
            Se è vero che nei primissimi anni la produzione calviniana sembra
            prediligere ambientazioni all’aperto (pensiamo a racconti come Paura
            sul sentiero, Uomo nei gerbidi, Campo di mine, Ultimo viene il
            corvo), il sopraggiungere dei primi racconti cittadini (Visti alla
            mensa, Si dorme come cani, Il gatto e il poliziotto) segna molto
            presto l’inizio di una sostanziale oscillazione tra ambientazioni
            esterne e ambientazioni interne (o ancora, come accade in molti
            casi, miste). Tuttavia, mettendo a confronto la selezione dei
            racconti che presentano esclusivamente spazi esterni e quella dei
            racconti che presentano soltanto spazi interni e analizzando nel
            dettaglio le caratteristiche proprie di ogni testo, si nota come il
            secondo gruppo sia ragionevolmente molto omogeneo: i testi che ne
            fanno parte presentano, infatti, pochissimi ambienti e il movimento
            è quasi assente. Mentre il primo si trasforma in modo sorprendente
            con il passare degli anni: le numerosissime ambientazioni dei primi
            racconti all’aperto diminuiscono progressivamente fino a raggiungere
            la mono-ambientazione, passando da un movimento quasi febbrile ed
            esclusivamente orizzontale (privo, cioè, di livelli spaziali che si
            annidino uno dentro l’altro: vedi{" "}
            <Link to="/combining/Combine/informationSheet">
              Approfondimento
            </Link>
            ) a un sostanziale immobilismo. Non stupisce, allora, che persino i
            mezzi di trasporto, di cui si trova ampia traccia nella produzione
            breve calviniana degli anni Cinquanta e Sessanta, scompaiano del
            tutto dopo il 1967.
          </p>
        </Tab>
        <Tab tabClassName="tab-info" eventKey="legenda" title="Legenda"></Tab>
      </Tabs>
    </>
  )
}
