import React, { Component } from "react";
import SheetStyles from "../SheetStyles.module.css";
import HamburgerCompassHeader from "../../headers/HamburgerCompassHeader/HamburgerCompassHeader";
import ArrowButton from "../../general/ArrowButton/ArrowButton";

import map1x from "./mappa-ver02@1x.png";
import map2x from "./mappa-ver02@2x.png";

import legend01 from "./legend01.svg";
import legend02 from "./legend02.svg";
import textWall01 from "./textWall01.svg";
import textWall02 from "./textWall02.svg";
import treemap from "./TreemapAbsoluteWordsConcreteAbstract.svg";

class RealismInformationSheet extends Component {
  render() {
    return (
      <>
        <HamburgerCompassHeader />
        <main className={SheetStyles.main}>
          <div className={SheetStyles.gridRow}>
            <h4 className="ac-breadcrumb">Tappa 3 > realismo</h4>
            <h1 className={SheetStyles.titleH1}>
              Metamorfosi della realtà: sulle tracce della paura
            </h1>
            <h2 className={SheetStyles.titleH2}>L'idea</h2>
            <p className={SheetStyles.paragraph}>
              Dall’analisi sullo spostamento spaziale terrestre nella produzione
              breve calviniana emergono alcune tendenze significative, che è
              possibile identificare e isolare e che vale la pena approfondire.
              Tra queste, la concentrazione di racconti esclusivamente
              all’aperto (ambientazioni esterne), caratterizzati da un movimento
              orizzontale insistito, che conduce i protagonisti delle storie da
              un luogo di partenza ad uno di arrivo, spesso attraverso
              l’attraversamento di alcune tappe intermedie. Tra il 1946 e il
              1948 i racconti che presentano questo schema sono sette:
              <i>
                Andato al comando, Paura sul sentiero, Uomo nei gerbidi, Campo
                di mine, L’occhio del padrone, Un bastimento carico di granchi,
                Il giardino incantato
              </i>
              . A questi se ne può aggiungere un nono, Ultimo viene il corvo,
              che si distingue per la presenza di un’unica e poco significativa
              ambientazione interna (una baita in cui il protagonista trascorre
              la notte). A livello tematico, questi testi possono essere
              raccolti in tre gruppi distinti: racconti di guerra (
              <i>Andato al comando, Paura sul sentiero, Campo di mine</i> e
              <i>Ultimo viene il corvo</i>); racconti campestri (
              <i>Uomo nei gerbidi, L’occhio del padrone</i>); racconti con
              protagonisti bambini (
              <i>Un bastimento carico di granchi, Il giardino incantato</i> e
              nuovamente <i>Ultimo viene il corvo</i>). Il primo e il secondo di
              questi temi sono apparentemente ascrivibili al tentativo di
              documentazione di una realtà fattuale e sociale della cosiddetta
              stagione “neoralista”. Tuttavia, se concentriamo la nostra analisi
              sul movimento narrativo nello spazio, questi racconti
              caratterizzati dalla presenza di spazi aperti, dentro i quali i
              personaggi si muovono seguendo un percorso a tappe, rivelano un
              volto diverso: la testimonianza diretta di un mondo e di un
              contesto diventa piuttosto la rappresentazione di una realtà
              instabile, spesso moltiplicata per addizione, complicata dai
              tentativi di copertura di distanze non sempre raggiungibili,
              oppure da esperienze di svelamento di un mondo che si trasforma
              sotto gli occhi e i piedi di chi le affronta. Di conseguenza,
              dietro un’ossatura fondamentalmente realista – i luoghi, per
              esempio, sono i luoghi della Resistenza vissuta da Calvino in
              prima persona, o la Liguria della sua infanzia – si celano
              personaggi, dinamiche ed elementi narrativi riconducibili ai
              racconti d’avventura e più in generale a una realtà in continua
              metamorfosi. Una realtà sfuggente, al limite
              dell’irrapresentabile, in quanto soggetta a infinite
              interpretazioni.
            </p>
            <div className={SheetStyles.sideContent}>
              <img
                className={SheetStyles.image + " " + SheetStyles.image100w}
                src={window.devicePixelRatio > 1 ? map2x : map1x}
                style={{ border: "0px solid #333333", borderRadius: 3 }}
              />
              <p className="captionLeft">
                I luoghi del racconto: le tappe del percorso di Binda sono
                collegate dalle frecce, gli altri luoghi sono nominati nel
                racconto ma non attraversati.
              </p>
              <p className="captionLeft">
                <a
                  href="https://www.openstreetmap.org/#map=14/43.9894/7.7688"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vai a una mappa più dettagliata
                </a>
              </p>
            </div>
            <h2 className={SheetStyles.titleH2}>Un racconto esemplare</h2>
            <p className={SheetStyles.paragraph}>
              Come testo esemplare di questa dinamica, prendiamo il racconto
              <i>Paura sul sentiero</i>, pubblicato nel 1946 su «Darsena nuova»
              e in seguito nei volumi <i>Ultimo viene il corvo</i> (1949) e
              <i>I racconti</i> (1958). Protagonista del testo è Binda, giovane
              staffetta partigiana che durante la notte si inoltra a piedi nei
              boschi dell’entroterra ligure di ponente per raggiungere nel minor
              tempo possibile il casolare in cui si trova la sua brigata
              partigiana e comunicare ai compagni l’ordine di spostarsi. Siamo
              nella terra natale di Calvino, durante gli anni della Seconda
              guerra mondiale, in un contesto che l’autore ha conosciuto
              direttamente e che descrive con dovizia di dettagli fornendo
              indicazioni geografiche molto precise, che consentono di
              ricostruire per filo e per segno il percorso compiuto dal
              protagonista
              <a
                href="https://www.openstreetmap.org/#map=14/43.9894/7.7688"
                target="_blank"
                rel="noopener noreferrer"
              >
                (vedi mappa)
              </a>
              .
            </p>
            <p className={SheetStyles.paragraph}>
              I <b>luoghi localizzabili</b> che è possibile individuare sono
              numerosissimi: piccoli comuni, borgate, valli e montagne del
              territorio imperiese in cui la battaglia partigiana fu
              effettivamente combattuta. A rafforzare l’effetto di una aderenza
              testimoniale ai fatti della storia, la presenza diffusa di nomi di
              battaglia (
              <i>
                Vendetta, Serpe, Pelle, Guerriglia, Fegato, Sciabola, Civetta
              </i>
              ), attribuiti ai compagni che Binda deve raggiungere e che
              attendono sue notizie. L’impianto narrativo realista si accompagna
              però, fin da subito, alla rappresentazione di una realtà che si
              trasforma e si sfalda continuamente, sotto l’effetto di visioni,
              pensieri e immaginazioni dovute soprattutto al dilagare del
              sentimento della paura (che è lo stesso presente in molti
              protagonisti di questi racconti, come <i>Andato al comando</i> o
              <i>Campo di mine</i>). Al punto che a più riprese il racconto
              partigiano si trasforma e prende le sembianze di un racconto
              d’avventura o addirittura di una fiaba: l’eroe Binda, lontano
              dalla sua amata (che si chiama <i>Regina</i>), deve raggiungere la
              meta, ma lungo il cammino è inseguito dal nemico <i>Gund</i>, un
              terribile e gigantesco tedesco munito di elmo e armatura, che
              tenta in ogni modo di ostacolarlo.
            </p>
            <p className={SheetStyles.paragraph}>
              Quest’oscillazione tra realtà e immaginazione è qui rappresentata
              suddividendo il testo in tre tipologie di sequenze narrative: in
              <span style={{ color: "#00bfd3" }}>blu</span>le parti di racconto
              ancorate alla realtà, in cui si descrivono per filo e per segno il
              percorso che Binda sta compiendo, il tempo che impiegherà e ciò
              che effettivamente incontra lungo il cammino; in
              <span style={{ color: "#ff3366" }}>rosso</span>, al contrario, i
              momenti in cui il personaggio è sopraffatto dal dubbio, da
              inspiegabili allucinazioni, dalle visite frequenti di Regina e
              Gund: momenti in cui la stessa meta appare irraggiungibile o perde
              l’importanza che aveva («Ma si sarebbe raggiunto mai, il casone?
              Non era legato a un filo che lo trascinava lontano da lui, man
              mano che s’avvicinava? [...] Ebbe voglia di tornare indietro, di
              fuggire, come tutto il pericolo fosse laggiù nel casolare di pian
              Castagna»).
            </p>
            <p className={SheetStyles.paragraph}>
              A queste due tipologie di sequenze se ne aggiunge una terza, in
              <span style={{ color: "#bbbbff" }}>viola</span>, presente solo una
              volta e in posizione quasi incipitaria: si tratta dell’unico
              momento in cui la descrizione del tragitto compiuto dal
              protagonista è sospesa e sono fornite alcune importanti
              indicazioni di contesto: chi è Binda, qual è il suo ruolo, che
              incarico gli è stato affidato e quali sono gli schieramenti
              coinvolti nella guerra.
            </p>
          </div>
          <div className={SheetStyles.gridRow}>
            <img
              className={
                SheetStyles.image + " " + SheetStyles.translucentBackground
              }
              src={legend01}
              style={{
                borderBottom: "1px solid #5151fc",
                gridColumn: "1 / span 12",
                marginBottom: "1rem",
                position: "sticky",
                top: "calc(var(--navigation-height) - 0px)",
                width: "100%",
              }}
            />
            <img
              className={SheetStyles.image}
              src={textWall01}
              style={{ gridColumn: "1 / span 12", width: "100%" }}
            />
          </div>
          <div className={SheetStyles.gridRow}>
            <p className={SheetStyles.paragraph}>
              Questa perpetua oscillazione tra realtà e immaginazione è
              emblematica, soprattutto se calata nel contesto del racconto
              resistenziale: «Calvino in many of his early stories that “write”
              the Resistance adopts the literary strategies of the fairy tale
              and the <i>racconto d’avventura</i> as forms with which to erode
              and undermine the dominant discursive logic of the epic» (Re 1990,
              157). Qualcosa di molto simile accade anche negli altri tre
              racconti bellici citati in precedenza:
              <i>Andato al comando, Campo di mine, Ultimo viene il corvo</i>. In
              tutti questi casi il contesto storico e politico è per molti
              tratti davvero marginale rispetto agli interrogativi che animano i
              protagonisti, per i quali comprendere quale sia la strada giusta
              da seguire (per riuscire a fuggire, per raggiungere il versante
              opposto di un monte, per colpire un bersaglio e individuare il
              successivo), assume un significato metaforico ben prima che
              letterale. Se il personaggio bambino di
              <i>Ultimo viene il corvo</i> non ha dubbi sugli oggetti da
              prendere di mira lungo il suo tragitto, che gli consentono da un
              lato di arricchire il suo bagaglio di conoscenza e dall’altro di
              spostarsi sempre più lontano, lo stesso non si può dire per i due
              protagonisti di <i>Andato al comando</i> e <i>Campo di mine</i>. I
              quali, non diversamente da Binda, sono divorati dai dubbi, dalle
              domande, dal sentimento di paura che trasformando le cose concrete
              in simboli e allucinazioni finisce per farli capitolare. A Binda
              questo non accade perché – come mostra l’equilibrio quasi perfetto
              tra le sequenze <span style={{ color: "#ff3366" }}>rosso</span> e
              le sequenze <span style={{ color: "#00bfd3" }}>blu</span> – nei
              momenti in cui l’immaginazione sembra prendere il sopravvento, c’è
              sempre qualcosa che lo riporta alla realtà e gli permette di
              completare la sua missione.
            </p>
            <h2 className={SheetStyles.titleH2}>Il lessico della realtà</h2>
            <p className={SheetStyles.paragraph}>
              A proposito di realtà: alcuni numeri possono dare un’idea chiara
              di come il meccanismo di slittamento dal piano reale a quello
              immaginario (e poi da quello immaginario a quello reale) si
              inneschi sempre a partire da elementi estremamente concreti, da
              ciò che Binda ha sotto gli occhi mentre cammina. Percentualmente,
              l’84% dei sostantivi utilizzati nel testo afferiscono a un lessico
              concreto, soltanto il 16% a un lessico astratto. All’interno di
              questo 84%, poi, si possono individuare tre importanti campi
              semantici: la natura (44%), la guerra (21%) e il corpo (18%).
            </p>
            <img
              className={SheetStyles.image}
              src={treemap}
              style={{
                gridColumn: "1 / span 12",
                width: "100%",
                marginTop: "2rem",
              }}
            />
            <br></br>
            <br></br>
            <p className={SheetStyles.paragraph}>
              A essere messa in dubbio è sempre la realtà concreta, poiché
              Binda, non diversamente dal protagonista di <i>Campo di mine</i>,
              «deve ridefinire le cose che in apparenza sono armoniche e in
              realtà ambigue: ogni cosa può essere se stessa o il suo contrario»
              (Falaschi 1976, 132). In questo modo, per esempio, finisce per
              credere che ci sia «un tedesco per ogni cespuglio, un tedesco
              appollaiato in cima a ogni albero, coi ghiri. Le pietraie
              pullulavano d’elmi, fucili s’alzavano tra i rami, le radici degli
              alberi finivano in piedi umani. Binda marciava lungo una doppia
              siepe di tedeschi in agguato, che lo guardavano con occhi
              luccicanti come foglie: più camminava più s’approfondiva in mezzo
              a loro». Si tratta di un vero e proprio processo di metamorfosi
              che si ripete frequentemente nelle storie di Calvino, soprattutto
              in questi anni, e che si sviluppa in presenza di alcuni elementi
              chiave come il sentimento di <i>paura</i> e il movimento lungo un
              sentiero: le due parole che, non a caso, campeggiano nel titolo
              del racconto che stiamo analizzando. Pensiamo, oltre ai testi
              citati in precedenza, a un racconto come
              <i>Un pomeriggio, Adamo</i> (1949) o anche al primo romanzo
              dell’autore, <i>Il sentiero dei nidi di ragno</i> (1947). Il
              processo metamorfico crea inevitabilmente equivoci, poiché
              introduce uno scarto «tra la catena di false interpretazioni e la
              realtà» (Serra 2006, 66).
            </p>
            <h2 className={SheetStyles.titleH2}>
              Trasformazioni, metafore, visioni e dubbi
            </h2>
            <p className={SheetStyles.paragraph}>
              Nel gioco dell’ambiguità, che può diventare facilmente spaventoso,
              tornano con insistenza alcuni meccanismi narrativi, messi in
              evidenza nell’ultima visualizzazione. Innanzitutto gli
              <span style={{ color: "#FFA500" }}>interrogativi</span> («Chi era
              mai a quell’ora?»; «Ma si sarebbe raggiunto mai il casone?») o
              l’uso insistito del
              <span style={{ color: "#FFA500" }}>forse</span> («forse una lepre,
              forse una volpe, forse un tedesco coricato tra gli arbusti che lo
              prendeva di mira»; «forse aveva rallentato senz’avvedersene, forse
              s’era fermato»); in secondo luogo le
              <span style={{ color: "#FFD337" }}>visioni</span> di Binda, in
              alcuni casi vere e proprie allucinazioni, spesso introdotte
              dall’uso del condizionale («Uno in mezzo a loro, detto Gund, con
              un terribile sorriso bianco sotto l’elmo, avrebbe proteso le mani
              enormi sopra di lui, per afferrarlo»; «Una bestia correva sulle
              orme di Binda, svegliata dal fondo di regioni bambine, lo
              inseguiva, presto lo avrebbe raggiunto»; «Ma in un angolo,
              grandissimo, seduto alla turca, con l’elmo che toccava il tetto,
              c’era Gund, gli occhi tondi e lucenti come quelli dei ghiri, il
              sorriso bianco di denti tra le labbra tumide. Gund gli faceva
              cenno: «Siediti». E Binda si sarebbe seduto»). Infine, la presenza
              diffusa di <span style={{ color: "#67DEE3" }}>similitudini</span>,
              <span style={{ color: "#F299C1" }}>metafore</span> e iperboli, che
              nell’attuazione del processo metamorfico di trasformazione della
              realtà giocano senza dubbio un ruolo decisivo. Non stupisce,
              allora, che come nella più classica delle metamorfosi, anche in
              questo racconto i termini di paragone siano spesso presi dal mondo
              animale: la paura è prima una generica bestia che insegue il
              protagonista, poi una scimmia aggrappata al suo collo; le mine si
              muovono sotto i suoi piedi «come ragni sotterranei» (mentre in
              <i>Campo di mine</i> erano «enormi marmotte accoccolate in tane
              sotterranee»); l’ansia «è un leggero battere di ali di pipistrello
              nei polmoni»; gli occhi di Gund sono tondi e lucenti «come quelli
              dei ghiri». Il ventaglio di figure animalesche che Binda vede e
              incontra lungo il sentiero si fa sempre più ampio, passo dopo
              passo. Che cosa, dunque, si può dire rimanga reale e cosa non lo è
              più? Vendetta, Pelle, Serpe, ma anche Creppo, Perallo e Pian
              Castagna sono prove incontrovertibili della ragione per cui Binda
              è in cammino, prove incontrovertibili della guerra in corso.
              Eppure, non appena la missione è compiuta, sprofondano
              immediatamente nel buio: quando Binda svolta dietro lo sperone di
              roccia e perde di vista il casone, pronto a raggiungere una nuova
              meta, «Gund s’alzò dai cespugli, si rimise in marcia dietro di
              lui, coi suoi passi di gigante».
            </p>
          </div>
          <div className={SheetStyles.gridRow}>
            <h2 className={SheetStyles.titleH2}>
              Trasformazioni, visioni, dubbi
            </h2>
            <img
              className={
                SheetStyles.image + " " + SheetStyles.translucentBackground
              }
              src={legend02}
              style={{
                borderBottom: "1px solid #5151fc",
                gridColumn: "1 / span 12",
                marginBottom: "1rem",
                position: "sticky",
                top: "calc(var(--navigation-height) - 0px)",
                width: "100%",
              }}
            />
            <img
              className={SheetStyles.image}
              src={textWall02}
              style={{ gridColumn: "1 / span 12", width: "100%" }}
            />
          </div>

          <div className={SheetStyles.gridRow}>
            <h2 className={SheetStyles.titleH2}>Bibliografia</h2>
            <ol className={[SheetStyles.paragraph, "references"].join(" ")}>
              <li className="referenceItem">
                Re 1990: L. Re,
                <i>Calvino and the Age of Neorealism: Fables of Estrangement</i>
                ), Stanford, Stanford University Press.
              </li>
              <li className="referenceItem">
                Falaschi 1976: G. Falaschi,
                <i>La resistenza armata nella narrativa italiana</i>, Torino,
                Einaudi.
              </li>
              <li className="referenceItem">
                Serra 2006: F. Serra, <i>Calvino</i>, Roma, Salerno.
              </li>
            </ol>
          </div>
          <div className={SheetStyles.gridRow}>
            <div style={{ gridColumn: "1 / span 3" }}>
              <ArrowButton
                arrowDirection="none"
                textAlign="left"
                text="ANALISI"
                route="/space/phase3"
              />
            </div>
            <div style={{ gridColumn: "4 / span 2" }}>
              <ArrowButton
                arrowDirection="right"
                textAlign="left"
                text="TAPPA 1"
                route="/space/phase1"
              />
            </div>
            <div style={{ gridColumn: "6 / span 2" }}>
              <ArrowButton
                arrowDirection="right"
                textAlign="left"
                text="TAPPA 2"
                route="/space/phase2"
              />
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default RealismInformationSheet;
