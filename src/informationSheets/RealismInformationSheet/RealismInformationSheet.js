import React, { Component } from "react";
import SheetStyles from "../SheetStyles.module.css";
import HamburgerCompassHeader from "../../headers/HamburgerCompassHeader/HamburgerCompassHeader";
import FooterSchede3 from "../FooterSchede3";

import map1x from "./mappa-ver02@1x.png";
import map2x from "./mappa-ver02@2x.png";

import legend01 from "./legend01.svg";
import legend01En from "./realismo_Legend01_en.svg";
import legend02 from "./legend02.svg";
import legend02En from "./realismo_Legend02_en.svg";
import textWall01 from "./textWall01.svg";
import textWall01En from "./realismo_textWall01_en.svg";
import textWall02 from "./textWall02.svg";
import textWall02En from "./realismo_textWall02_en.svg";
import treemap from "./TreemapAbsoluteWordsConcreteAbstract.svg";
import treemapEn from "./realismo_TreemapAbsoluteWordsConcreteAbstract_en.svg";
import { Trans, withTranslation } from "react-i18next";

class RealismInformationSheet extends Component {
  render() {
    return (
      <>
        <HamburgerCompassHeader />
        <main className={SheetStyles.main}>
          <div className={SheetStyles.gridRow}>
            <h4 className="ac-breadcrumb">
              {this.props.t("TAPPA 3")} {">"} {this.props.t("realismo")}
            </h4>
            <h1 className={SheetStyles.titleH1}>
              {this.props.t(
                "realismo-sheet:Metamorfosi della realtà sulle tracce della paura"
              )}
            </h1>
            <Trans
              i18nKey="paragrapg-l-idea"
              ns="realismo-sheet"
              t={this.props.t}
            >
              <p className={SheetStyles.paragraph}>
                Dall’analisi sullo spostamento spaziale terrestre nella
                produzione narrativa breve calviniana emergono alcune tendenze
                significative, che è possibile identificare e isolare e che vale
                la pena approfondire. Tra queste, la concentrazione di racconti
                esclusivamente all’aperto (ambientazioni esterne),
                caratterizzati da un movimento orizzontale insistito, che
                conduce i protagonisti delle storie da un luogo di partenza ad
                uno di arrivo, spesso attraverso l’attraversamento di alcune
                tappe intermedie. Tra il 1946 e il 1948 i racconti che
                presentano questo schema sono sette:{" "}
                <em>
                  Andato al comando, Paura sul sentiero, Uomo nei gerbidi, Campo
                  di mine, L’occhio del padrone, Un bastimento carico di
                  granchi, Il giardino incantato
                </em>
                . A questi se ne può aggiungere un ottavo,{" "}
                <em>Ultimo viene il corvo</em>, che si distingue per la presenza
                di un’unica e poco significativa ambientazione interna (una
                baita in cui il protagonista trascorre la notte). A livello
                tematico, questi testi possono essere raccolti in tre gruppi
                distinti: racconti di guerra (
                <em>Andato al comando, Paura sul sentiero, Campo di mine</em> e{" "}
                <em>Ultimo viene il corvo</em>); racconti campestri (
                <em>Uomo nei gerbidi, L’occhio del padrone</em>); racconti con
                protagonisti bambini (
                <em>Un bastimento carico di granchi, Il giardino incantato</em>{" "}
                e nuovamente <em>Ultimo viene il corvo</em>). Il primo e il
                secondo di questi temi sono apparentemente ascrivibili al
                tentativo di documentazione di una realtà fattuale e sociale
                della cosiddetta stagione “neorealista”. Tuttavia, se
                concentriamo la nostra analisi sul movimento narrativo nello
                spazio, questi racconti caratterizzati dalla presenza di spazi
                aperti, dentro i quali i personaggi si muovono seguendo un
                percorso a tappe, rivelano un volto diverso: la testimonianza
                diretta di un mondo e di un contesto diventa piuttosto la
                rappresentazione di una realtà instabile, spesso moltiplicata
                per addizione, complicata dai tentativi di copertura di distanze
                non sempre raggiungibili, oppure da esperienze di svelamento di
                un mondo che si trasforma sotto gli occhi e i piedi di chi le
                affronta. Di conseguenza, dietro un’ossatura fondamentalmente
                realista – i luoghi, per esempio, sono i luoghi della Resistenza
                vissuta da Calvino in prima persona, o la Liguria della sua
                infanzia – si celano personaggi, dinamiche ed elementi narrativi
                riconducibili ai racconti d’avventura e più in generale a una
                realtà in continua metamorfosi. Una realtà sfuggente, al limite
                dell’irrappresentabile, in quanto soggetta a infinite
                interpretazioni.
              </p>
            </Trans>
            <div className={SheetStyles.sideContent}>
              <img
                className={SheetStyles.image + " " + SheetStyles.image100w}
                src={window.devicePixelRatio > 1 ? map2x : map1x}
                style={{ border: "0px solid #333333", borderRadius: 3 }}
                alt=""
              />
              <Trans
                i18nKey="paragrapg-l-idea-2"
                ns="realismo-sheet"
                t={this.props.t}
              >
                <p className="captionLeft">
                  I luoghi del racconto: le tappe del percorso di Binda sono
                  collegate dalle frecce, gli altri luoghi sono nominati nel
                  racconto ma non attraversati.
                </p>
              </Trans>
              <p className="captionLeft">
                <a
                  href="https://www.openstreetmap.org/#map=14/43.9894/7.7688"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {this.props.t(
                    "realismo-sheet:Vai a una mappa più dettagliata"
                  )}
                </a>
              </p>
            </div>
            <h2 className={SheetStyles.titleH2}><i>
              {this.props.t("realismo-sheet:Paura sul sentiero")}
              </i></h2>
            <Trans
              i18nKey="paragrapg-un-racconto-esemplare"
              ns="realismo-sheet"
              t={this.props.t}
            >
              <p className={SheetStyles.paragraph}>
                Come testo esemplare di questa dinamica, prendiamo il racconto{" "}
                <em>Paura sul sentiero</em>, pubblicato nel 1946 su «Darsena
                nuova» e in seguito nei volumi <em>Ultimo viene il corvo</em>{" "}
                (1949) e <em>I racconti</em> (1958). Protagonista del testo è
                Binda, giovane staffetta partigiana che durante la notte si
                inoltra a piedi nei boschi dell’entroterra ligure di ponente per
                raggiungere nel minor tempo possibile il casolare in cui si
                trova la sua brigata partigiana e comunicare ai compagni
                l’ordine di spostarsi. Siamo nella terra natale di Calvino,
                durante gli anni della Seconda guerra mondiale, in un contesto
                che l’autore ha conosciuto direttamente e che descrive con
                dovizia di dettagli fornendo indicazioni geografiche molto
                precise, che consentono di ricostruire per filo e per segno il
                percorso compiuto dal protagonista{" "}
                <a
                  href="https://www.openstreetmap.org/#map=14/43.9894/7.7688"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  (vedi mappa)
                </a>
                .
              </p>
            </Trans>
            <Trans
              i18nKey="paragrapg-un-racconto-esemplare-2"
              ns="realismo-sheet"
              t={this.props.t}
            >
              <p className={SheetStyles.paragraph}>
                I <b>luoghi localizzabili</b> che è possibile individuare sono
                numerosissimi: piccoli comuni, borgate, valli e montagne del
                territorio imperiese in cui la battaglia partigiana fu
                effettivamente combattuta. A rafforzare l’effetto di una
                aderenza testimoniale ai fatti della storia, la presenza diffusa
                di nomi di battaglia (
                <em>
                  Vendetta, Serpe, Pelle, Guerriglia, Fegato, Sciabola, Civetta
                </em>
                ), attribuiti ai compagni che Binda deve raggiungere e che
                attendono sue notizie. L’impianto narrativo realista si
                accompagna però, fin da subito, alla rappresentazione di una
                realtà che si trasforma e si sfalda continuamente, sotto
                l’effetto di visioni, pensieri e immaginazioni dovute
                soprattutto al dilagare del sentimento della paura (che è lo
                stesso presente in molti protagonisti di questi racconti, come{" "}
                <em>Andato al comando</em> o <em>Campo di mine</em>). Al punto
                che a più riprese il racconto partigiano si trasforma e prende
                le sembianze di un racconto d’avventura o addirittura di una
                fiaba: l’eroe Binda, lontano dalla sua amata (che si chiama{" "}
                <em>Regina</em>), deve raggiungere la meta, ma lungo il cammino
                è inseguito dal nemico <em>Gund</em>, un terribile e gigantesco
                tedesco munito di elmo e armatura, che tenta in ogni modo di
                ostacolarlo.
              </p>
              <p className={SheetStyles.paragraph}>
                Quest’oscillazione tra realtà e immaginazione è qui
                rappresentata suddividendo il testo in tre tipologie di sequenze
                narrative: in <span style={{ color: "#00bfd3" }}>azzurro</span>{" "}
                le parti di racconto ancorate alla realtà, in cui si descrivono
                per filo e per segno il percorso che Binda sta compiendo, il
                tempo che impiegherà e ciò che effettivamente incontra lungo il
                cammino; in <span style={{ color: "#ff3366" }}>rosso</span>, al
                contrario, i momenti in cui il personaggio è sopraffatto dal
                dubbio, da inspiegabili allucinazioni, dalle visite frequenti di
                Regina e Gund: momenti in cui la stessa meta appare
                irraggiungibile o perde l’importanza che aveva («Ma si sarebbe
                raggiunto mai, il casone? Non era legato a un filo che lo
                trascinava lontano da lui, man mano che s’avvicinava? [...] Ebbe
                voglia di tornare indietro, di fuggire, come tutto il pericolo
                fosse laggiù nel casolare di pian Castagna»).
              </p>
              <p className={SheetStyles.paragraph}>
                A queste due tipologie di sequenze se ne aggiunge una terza, in{" "}
                <span style={{ color: "#bbbbff" }}>viola</span>, presente solo
                una volta e in posizione quasi incipitaria. Si tratta dell’unico
                momento in cui la descrizione del tragitto compiuto dal
                protagonista è sospesa e sono fornite alcune importanti
                indicazioni di contesto: chi è Binda, qual è il suo ruolo, che
                incarico gli è stato affidato e quali sono gli schieramenti
                coinvolti nella guerra.
              </p>
            </Trans>
          </div>
          <div className={SheetStyles.gridRow}>
            <img
              className={
                SheetStyles.image + " " + SheetStyles.translucentBackground
              }
              src={this.props.i18n.language === "it" ? legend01 : legend01En}
              style={{
                borderBottom: "1px solid #5151fc",
                gridColumn: "1 / span 12",
                marginBottom: "1rem",
                position: "sticky",
                top: "calc(var(--navigation-height) - 0px)",
                width: "100%",
              }}
              alt=""
            />
            <img
              className={SheetStyles.image}
              src={
                this.props.i18n.language === "it" ? textWall01 : textWall01En
              }
              style={{ gridColumn: "1 / span 12", width: "100%" }}
              alt=""
            />
          </div>
          <div className={SheetStyles.gridRow}>
            <Trans
              i18nKey="paragraph-text"
              ns="realismo-sheet"
              t={this.props.t}
            >
              <p className={SheetStyles.paragraph}>
                Questa perpetua oscillazione tra realtà e immaginazione è
                emblematica, soprattutto se calata nel contesto del racconto
                resistenziale: «Calvino in many of his early stories that
                “write” the Resistance adopts the literary strategies of the
                fairy tale and the <em>racconto d’avventura</em> as forms with
                which to erode and undermine the dominant discursive logic of
                the epic» (Re 1990, 157). Qualcosa di molto simile accade anche
                negli altri tre racconti bellici citati in precedenza:{" "}
                <em>Andato al comando, Campo di mine, Ultimo viene il corvo</em>
                . In tutti questi casi il contesto storico e politico è per
                molti tratti davvero marginale rispetto agli interrogativi che
                animano i protagonisti, per i quali comprendere quale sia la
                strada giusta da seguire (per riuscire a fuggire, per
                raggiungere il versante opposto di un monte, per colpire un
                bersaglio e individuare il successivo), assume un significato
                metaforico ben prima che letterale. Se il personaggio bambino di{" "}
                <em>Ultimo viene il corvo</em> non ha dubbi sugli oggetti da
                prendere di mira lungo il suo tragitto, che gli consentono da un
                lato di arricchire il suo bagaglio di conoscenza e dall’altro di
                spostarsi sempre più lontano, lo stesso non si può dire per i
                due protagonisti di <em>Andato al comando</em> e{" "}
                <em>Campo di mine</em>. I quali, non diversamente da Binda, sono
                divorati dai dubbi, dalle domande, dal sentimento di paura che
                trasformando le cose concrete in simboli e allucinazioni finisce
                per farli capitolare. A Binda questo non accade perché – come
                mostra l’equilibrio quasi perfetto tra le sequenze{" "}
                <span style={{ color: "#ff3366" }}>rosse</span> e le sequenze{" "}
                <span style={{ color: "#00bfd3" }}>azzurre</span> – nei momenti
                in cui l’immaginazione sembra prendere il sopravvento, c’è
                sempre qualcosa che lo riporta alla realtà e gli permette di
                completare la sua missione.
              </p>
              <h2 className={SheetStyles.titleH2}>Il lessico della realtà</h2>
              <p className={SheetStyles.paragraph}>
                A proposito di realtà: alcuni numeri possono dare un’idea chiara
                di come il meccanismo di slittamento dal piano reale a quello
                immaginario (e poi da quello immaginario a quello reale) si
                inneschi sempre a partire da elementi estremamente concreti, da
                ciò che Binda ha sotto gli occhi mentre cammina.
                Percentualmente, l’86% dei sostantivi utilizzati nel testo
                afferiscono a un lessico concreto, soltanto il 14% a un lessico
                astratto. All’interno di questo 84%, poi, si possono individuare
                tre importanti campi semantici: la natura (44%), la guerra (21%)
                e il corpo (18%).
              </p>
            </Trans>
            <img
              className={SheetStyles.image}
              src={this.props.i18n.language === "it" ? treemap : treemapEn}
              style={{
                gridColumn: "1 / span 12",
                width: "100%",
                marginTop: "2rem",
              }}
              alt=""
            />
            <br></br>
            <br></br>
            <Trans
              i18nKey="paragraph-text-2"
              ns="realismo-sheet"
              t={this.props.t}
            >
              <p className={SheetStyles.paragraph}>
                A essere messa in dubbio è sempre la realtà concreta, poiché
                Binda, non diversamente dal protagonista di{" "}
                <em>Campo di mine</em>, «deve ridefinire le cose che in
                apparenza sono armoniche e in realtà ambigue: ogni cosa può
                essere se stessa o il suo contrario» (Falaschi 1976, 132). In
                questo modo, per esempio, finisce per credere che ci sia «un
                tedesco per ogni cespuglio, un tedesco appollaiato in cima a
                ogni albero, coi ghiri. Le pietraie pullulavano d’elmi, fucili
                s’alzavano tra i rami, le radici degli alberi finivano in piedi
                umani. Binda marciava lungo una doppia siepe di tedeschi in
                agguato, che lo guardavano con occhi luccicanti come foglie: più
                camminava più s’approfondiva in mezzo a loro». Si tratta di un
                vero e proprio processo di metamorfosi che si ripete
                frequentemente nelle storie di Calvino, soprattutto in questi
                anni, e che si sviluppa in presenza di alcuni elementi chiave
                come il sentimento di <em>paura</em> e il movimento lungo un{" "}
                <em>sentiero</em>: le due parole che, non a caso, campeggiano
                nel titolo del racconto che stiamo analizzando. Pensiamo, oltre
                ai testi citati in precedenza, a un racconto come{" "}
                <em>Un pomeriggio, Adamo</em> (1949) o anche al primo romanzo
                dell’autore, <em>Il sentiero dei nidi di ragno</em> (1947). Il
                processo metamorfico crea inevitabilmente equivoci, poiché
                introduce uno scarto «tra la catena di false interpretazioni e
                la realtà» (Serra 2006, 66).
              </p>
              <h2 className={SheetStyles.titleH2}>
                Trasformazioni, metafore, visioni e dubbi
              </h2>
              <p className={SheetStyles.paragraph}>
                Nel gioco dell’ambiguità, che può diventare facilmente
                spaventoso, tornano con insistenza alcuni meccanismi narrativi,
                messi in evidenza nell’ultima visualizzazione. Innanzitutto gli{" "}
                <span style={{ color: "#FFA500"}}>interrogativi</span> («Chi
                era mai a quell’ora?»; «Ma si sarebbe raggiunto mai il casone?»)
                o l’uso insistito del{" "}
                <span style={{ color: "#FFA500", fontStyle: "italic"}}>forse</span> («forse una
                lepre, forse una volpe, forse un tedesco coricato tra gli
                arbusti che lo prendeva di mira»; «forse aveva rallentato
                senz’avvedersene, forse s’era fermato»); in secondo luogo le{" "}
                <span style={{ color: "#FFD337" }}>visioni</span> di Binda, in
                alcuni casi vere e proprie allucinazioni, spesso introdotte
                dall’uso del condizionale («Uno in mezzo a loro, detto Gund, con
                un terribile sorriso bianco sotto l’elmo, avrebbe proteso le
                mani enormi sopra di lui, per afferrarlo»; «Una bestia correva
                sulle orme di Binda, svegliata dal fondo di regioni bambine, lo
                inseguiva, presto lo avrebbe raggiunto»; «Ma in un angolo,
                grandissimo, seduto alla turca, con l’elmo che toccava il tetto,
                c’era Gund, gli occhi tondi e lucenti come quelli dei ghiri, il
                sorriso bianco di denti tra le labbra tumide. Gund gli faceva
                cenno: «Siediti». E Binda si sarebbe seduto»). Infine, la
                presenza diffusa di{" "}
                <span style={{ color: "#67DEE3" }}>similitudini</span>,{" "}
                <span style={{ color: "#F299C1" }}>metafore</span> e iperboli,
                che nell’attuazione del processo metamorfico di trasformazione
                della realtà giocano senza dubbio un ruolo decisivo. Non
                stupisce, allora, che come nella più classica delle metamorfosi,
                anche in questo racconto i termini di paragone siano spesso
                presi dal mondo animale: la paura è prima una generica bestia
                che insegue il protagonista, poi una scimmia aggrappata al suo
                collo; le mine si muovono sotto i suoi piedi «come ragni
                sotterranei» (mentre in <em>Campo di mine</em> erano «enormi
                marmotte accoccolate in tane sotterranee»); l’ansia «è un
                leggero battere di ali di pipistrello nei polmoni»; gli occhi di
                Gund sono tondi e lucenti «come quelli dei ghiri». Il ventaglio
                di figure animalesche che Binda vede e incontra lungo il
                sentiero si fa sempre più ampio, passo dopo passo. Che cosa,
                dunque, si può dire rimanga reale e cosa non lo è più? Vendetta,
                Pelle, Serpe, ma anche Creppo, Perallo e Pian Castagna sono
                prove incontrovertibili della ragione per cui Binda è in
                cammino, prove incontrovertibili della guerra in corso. Eppure,
                non appena la missione è compiuta, sprofondano immediatamente
                nel buio: quando Binda svolta dietro lo sperone di roccia e
                perde di vista il casone, pronto a raggiungere una nuova meta,
                «Gund s’alzò dai cespugli, si rimise in marcia dietro di lui,
                coi suoi passi di gigante».
              </p>
            </Trans>
          </div>

          <div className={SheetStyles.gridRow}>
            <img
              className={
                SheetStyles.image + " " + SheetStyles.translucentBackground
              }
              src={this.props.i18n.language === "it" ? legend02 : legend02En}
              style={{
                borderBottom: "1px solid #5151fc",
                gridColumn: "1 / span 12",
                marginBottom: "1rem",
                position: "sticky",
                top: "calc(var(--navigation-height) - 0px)",
                width: "100%",
              }}
              alt=""
            />
            <img
              className={SheetStyles.image}
              src={
                this.props.i18n.language === "it" ? textWall02 : textWall02En
              }
              style={{ gridColumn: "1 / span 12", width: "100%" }}
              alt=""
            />
          </div>

          <div className={SheetStyles.gridRow}>
            <h2 className={SheetStyles.titleH2}>
              {this.props.t("bibliografia")}
            </h2>
            <ol className={[SheetStyles.paragraph, "references"].join(" ")}>
              { this.props.i18n.language === "en" &&
                <li className={"referenceItem"}>
                  Calvino 2010: I. Calvino, <i>Adam, One Afternoon</i>, London, Vintage books (translated by Archibald Colquhoun and Peggy Wright).
                </li>
              }
              <li className="referenceItem">
                Falaschi 1976: G. Falaschi,
                <em> La resistenza armata nella narrativa italiana</em>, Torino,
                Einaudi.
              </li>
              <li className="referenceItem">
                Re 1990: L. Re,
                <em>
                  {" "}
                  Calvino and the Age of Neorealism: Fables of Estrangement
                </em>
                , Stanford, Stanford University Press.
              </li>
              <li className="referenceItem">
                Serra 2006: F. Serra, <i>Calvino</i>, Roma, Salerno.
              </li>
            </ol>
          </div>

          <FooterSchede3
            linkTappaA={"/space/phase1"}
            linkTappaB={"/space/phase2"}
            linkAnalisi={"/space/phase3"}
          />
        </main>
      </>
    );
  }
}

export default withTranslation(["translation", "realismo-sheet"])(
  RealismInformationSheet
);
