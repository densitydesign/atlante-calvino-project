import React, { useState, Component } from "react"

import HamburgerCompassHeader from "../../headers/HamburgerCompassHeader/HamburgerCompassHeader"

import FooterSchede3 from "../FooterSchede3"

import "./PlotInformationSheet.css"
import SheetStyles from "../SheetStyles.module.css"

import legend from "./legend.svg"
import legendEn from "./trama_legend_en.svg"
import incastonati from "./incastonati.svg"
import incastonatiEn from "./trama_incastonati_en.svg"
import zoom_01 from "./zoom_01.svg"
import zoom_01En from "./trama_zoom_01_en.svg"
import zoom_02 from "./zoom_02.svg"
import zoom_02En from "./trama_zoom_02_en.svg"
import zoom_03 from "./zoom_03.svg"
import zoom_03En from "./trama_zoom_03_en.svg"
import zoom_04 from "./zoom_04.svg"
import zoom_04En from "./trama_zoom_04_en.svg"
import info_01 from "./info_01.svg"
import info_01En from "./trama_info_01_en.svg"
import info_02 from "./info_02.svg"
import info_02En from "./trama_info_02_en.svg"
import info_03 from "./info_03.svg"
import info_03En from "./trama_info_03_en.svg"
import info_04 from "./info_04.svg"
import info_04En from "./trama_info_04_en.svg"
import { Trans, withTranslation } from "react-i18next"

class PlotInformationSheet extends Component {
  render() {
    console.log(this.props)
    return (
      <>
        <HamburgerCompassHeader />
        <main className={SheetStyles.main}>
          <div className={SheetStyles.gridRow}>
            <h4 className="ac-breadcrumb">
              {this.props.t("TAPPA 3")} {">"} {this.props.t("trama")}
            </h4>
            <h1 className={SheetStyles.titleH1}>
              {this.props.t("trama-sheet:Leggere fra le trame")}
            </h1>
          </div>
          <div className={SheetStyles.gridRow}>
            <h2 className={SheetStyles.titleH2}>
              {this.props.t("trama-sheet:Modi di leggere")}
            </h2>
            <Trans
              i18nKey="paragraph-modi-di-leggere"
              ns="trama-sheet"
              t={this.props.t}
            >
              <p className={SheetStyles.paragraph}>
                Al momento della sua uscita, nel 1979,{" "}
                <em>Se una notte d’inverno un viaggiatore</em> segna sicuramente
                il nuovo picco della sperimentazione formale di Calvino, l’opera
                che manifesta con più forza l’intento di legittimare
                artisticamente la dinamica combinatoria come procedimento
                creativo, portandola oltre il mero mosaico strutturale delle{" "}
                <em>Città invisibili</em> (1972) e del{" "}
                <em>Castello dei destini incrociati </em>(1973) e integrandola
                in un organismo narrativo paradossalmente compatto, che si
                estende fino a comporre il corpo della forma <em>maior</em>{" "}
                della letteratura moderna, il romanzo. Questo testo non occupa
                però soltanto una posizione di rilievo nel percorso individuale
                dell’autore, ma anche nel panorama teorico-letterario generale
                del decennio in cui viene composto: pur essendo ampiamente
                anticipato da esperimenti precedenti, infatti, il romanzo è per
                molti aspetti figlio delle specificità culturali degli anni
                Settanta, e la sua realizzazione, a cui Calvino dedica
                un’attenzione raramente esclusiva, come testimonia il diradarsi
                delle altre pubblicazioni, incapsula come una stratificazione
                fossile dei frammenti ben riconoscibili del dibattito critico
                dell’epoca.
                <br />
                Scritto a partire dal 1977, ma costruito attorno al nucleo di un
                «meccanismo» la cui prima testimonianza era apparsa già nel 1975
                nell’evocazione degli «<em>incipit</em> di innumerevoli romanzi»
                che conclude <em>La squadratura</em>, un testo più tardi
                identificato dall’autore come «nucleo generativo del libro»
                (Falcetto 1992, 1381-1382),{" "}
                <em>Se una notte d’inverno un viaggiatore</em> viene alla luce
                nel periodo in cui si infittiscono le relazioni dell’autore con
                lo scenario teorico-letterario europeo, e risente vistosamente
                di questa ricettività, che include notoriamente gli esercizi
                stilistici del gruppo francese dell’Oulipo, ma forse ancora più
                significativamente in questo contesto gli studi della Scuola di
                Costanza. Fin dal 1967, con l’uscita del saggio di Hans Robert
                Jauss sulla storia della letteratura come provocazione, tradotto
                in Italia già nel 1969 con il titolo{" "}
                <em>Perché la storia della letteratura?</em>, il dibattito
                critico dell’intero continente aveva iniziato a rivolgersi al
                problema di quella che da lì in poi sarebbe stata chiamata,
                sulla scia di un altro saggio dello stesso Jauss, «estetica
                della ricezione» (Jauss 1969; 1988): un approccio ai problemi
                estetici che rimescolava gli ordini di priorità acquisiti nella
                tradizione critica fino a quel momento e in particolare si
                dedicava alla demistificazione della figura sacrale dell’autore
                e alla complementare riabilitazione del lettore come
                partecipante attivo e addirittura agente principale della
                comunicazione letteraria. Visione che nel corso degli anni
                Settanta, cioè proprio a ridosso del momento in cui Calvino
                inizia a comporre il suo ultimo romanzo, aveva guadagnato anche
                il contributo fondamentale di Wolfgang Iser, i cui saggi
                dedicati al concetto di «lettore implicito» e allo svisceramento
                delle dinamiche coinvolte nell’«atto della lettura» (Iser 1974;
                1976) rafforzano l’interesse generale dei teorici letterari per
                l’interazione differita tra autore e pubblico, interesse che in
                Italia prende forma, tra l’altro, negli studi composti da
                Umberto Eco nella seconda metà degli anni Settanta e raccolti,
                con una significativa coincidenza cronologica, proprio nel 1979
                nel volume <em>Lector in fabula</em>, per moltissimi aspetti
                “opera sorella” di{" "}
                <em>Se una notte d’inverno un viaggiatore</em>.
                <br />
                L’impatto di questa stagione teorica sull’ultima grande fatica
                narrativa di Calvino è clamorosamente evidente: quello che
                l’autore ci presenta fin dall’incipit è un proclamato “romanzo
                del Lettore”, in cui le dinamiche sotterranee studiate
                dall’estetica della ricezione vengono disseppellite e portate
                alla luce in una forma esibita e quasi esagerata. Abbiamo così
                da un lato la sonora voce narrante che, pur non dichiarandosi
                mai come voce dello scrittore, è palesemente costruita per dare
                forma alle ipotesi anticipatorie che chi scrive inevitabilmente
                formula sul proprio pubblico, e dall’altro un protagonista che
                non è definito da nient’altro a parte il suo essere fruitore di
                opere letterarie, in un vuoto di connotati che ne fa quasi la
                personificazione del concetto astratto, a metà tra il
                teorico-letterario e l’editoriale-commerciale, di «lettore
                comune» inteso come colui che, a differenza dei critici e degli
                studiosi, «legge per il proprio piacere e non per impartire la
                sua cultura o per correggere opinioni altrui» e risponde solo
                all’«istinto di voler creare per sé, derivandolo dai vari
                elementi in cui potrà imbattersi, un qualche quadro d’insieme»
                (Woolf 1995, 9). La sovversione delle dinamiche
                autore-scrittura-lettore tuttavia non è limitata a questo più
                vistoso dato superficiale: c’è infatti un livello compositivo
                ancora più profondo in cui la riflessione metaletteraria si
                infiltra e diventa una vera e propria vivisezione dei meccanismi
                di creazione e fruizione, ed è la trama.
              </p>
            </Trans>
            <Trans
              i18nKey="paragraph-perche-la-trama"
              ns="trama-sheet"
              t={this.props.t}
            >
              <h2 className={SheetStyles.titleH2}>
                Perché la trama: sabotare l'autore, sabotare il lettore
              </h2>
              <p className={SheetStyles.paragraph}>
                In <em>Lector in fabula</em> Eco analizza le modalità con cui si
                attua la «cooperazione interpretativa» del lettore, e nota che,
                dopo il primo passaggio iniziale che consiste nel riconoscere
                gli elementi di base della storia confrontandoli con
                l’enciclopedia narrativa mentale accumulata attraverso la
                pratica di lettura, il vero momento cardine della dinamica
                testo-lettore si raggiunge quando questi elementi di base
                vengono connessi tra loro per formare delle <em>fabule</em> (Eco
                1979, 102), cioè quelle strutture portanti che, secondo gli
                studi formalisti dell’inizio del Novecento, funzionano come
                sorte di endoscheletri delle trame. Il ruolo della trama come
                motore del meccanismo che produce lo scambio di significati tra
                scrittore e pubblico non è un concetto moderno, al contrario
                risale alle origini stesse della letteratura occidentale, ed è
                radicato nella <em>Poetica</em> di Aristotele, in cui si trovano
                delle prescrizioni sul modo corretto di costruire i racconti che
                rimangono quasi ininterrottamente attive nella storia delle
                narrazioni per tutti i ventitré secoli che ci separano dalla
                loro elaborazione: agli autori «epici» (cioè di testi narrativi)
                è raccomandato di strutturare i loro testi secondo lo schema
                tipico della tragedia, scegliendo di rappresentare un solo
                evento autoconcluso in cui si passa in modo chiaro da una
                condizione di equilibrio iniziale a una serie di perturbazioni e
                mutamenti che si dipanano l’uno dall’altro secondo rigidi
                rapporti di causalità, coinvolgendo personaggi dotati di un
                carattere fisso che determina tutte le loro azioni, per arrivare
                infine a una nuova situazione di equilibrio, raggiunta
                attraverso la soluzione delle difficoltà o l’eliminazione
                catartica dei desideri. Questo schema apparentemente banale in
                realtà costituisce la declinazione estetica dell’intera
                ontologia aristotelica (Tortonese 2013), e porta con sé una
                visione oracolare e quasi sacerdotale dello scrittore: per
                Aristotele infatti l’attività di costruire una trama richiede la
                capacità di mettere ordine nel caos dell’esperienza quotidiana,
                individuando relazioni e catene causali che sono invisibili agli
                uomini comuni e che possono illuminare la verità dell’universo,
                facendo dell’autore di racconti un individuo speciale,
                incaricato di una missione poetica che ha la stessa dignità
                della filosofia e della religione. Nel corso dei secoli,
                tuttavia, la norma aristotelica si sgancia da queste complesse
                implicazioni concettuali e si cristallizza sempre di più in una
                regola di scrittura, rendendo possibile proprio quel meccanismo
                su cui si concentrano Jauss, Iser e Eco: in quanto formula fissa
                dotata di passaggi ricorrenti, infatti, la trama finisce per
                trasformarsi in una sorta di cifrario universale di tutti i
                racconti, una base neutra su cui il lettore si addestra a
                riconoscere certi dispositivi del racconto e ad aspettarsi
                precise combinazioni di fatti, personaggi e conseguenze, la cui
                interpretazione è prestabilita e non lascia margini ad ambiguità
                o dubbi.
                <br />
                Si capisce quindi come sia estremamente rilevante che Calvino,
                nel romanzo che mette esplicitamente in campo il discorso del
                rapporto autore-testo-lettore, scelga di far esplodere e
                implodere la trama sostituendo all’arco drammatico della
                tradizione aristotelica una sequenza intermittente di false
                partenze e sviluppi bloccati, che non si dipana in modo lineare
                e fluido ma procede per slogature, ellissi e dislocazioni
                continue.
              </p>
            </Trans>
          </div>
          <div className={SheetStyles.gridRow}>
            <div
              className={SheetStyles.image100w}            >
              <img
                className={SheetStyles.legend}
                style={{ gridColumn: "1 / span 12" }}
                src={this.props.i18n.language === "it" ? legend : legendEn}
                alt=""
              />
              <img
                className={SheetStyles.image100w}
                style={{ backgroundColor: "var(--white)" }}
                src={
                  this.props.i18n.language === "it"
                    ? incastonati
                    : incastonatiEn
                }
                alt=""
              />
              <Trans
                i18nKey="trama-di-se-una-notte"
                ns="trama-sheet"
                t={this.props.t}
              >
                <p
                  className=" captionLeft "
                  style={{ gridColumn: "1 / span 12" }}
                >
                  Trama di <em>Se una notte d'inverno un viaggiatore </em>
                  suddivisa nelle sue varie componenti narrative
                </p>
              </Trans>
            </div>
            <Trans
              i18nKey="paragraph-distruggere-la-trama"
              ns="trama-sheet"
              t={this.props.t}
            >
              <p className={SheetStyles.paragraph}>
                Distruggere la trama tradizionale è insomma il modo in cui
                Calvino realizza, al livello della forma, quel sabotaggio
                dell’autore che è tipico delle estetiche della ricezione: nel
                suo romanzo non solo è continuamente interrotta e scardinata
                quella che supponiamo sia la trama principale, ovvero la vicenda
                del Lettore, ma sono sistematicamente spezzate tutte le trame
                dei dieci libri che il Lettore cerca di leggere, che vengono
                spaginati, rubati, squartati, manomessi e disintegrati con
                un’insistenza e una varietà di soluzioni al limite del sadismo.
                Smantellando lo scheletro della trama completa viene smantellato
                anche quel potere esclusivo di riorganizzazione delle esperienze
                e di rivelazione delle logiche profonde del cosmo che una
                tradizione millenaria aveva associato alla figura dell’autore, e
                la cui traccia persistente era ancora viva nella memoria
                automatica del “lettore medio” nonostante le profonde mutazioni
                di paradigma letterario occorse a partire dal XIX secolo. Ma lo
                scardinamento attuato da Calvino va oltre la semplice alternanza
                tra le storie interrotte dei romanzi citati e la storia
                frammentata del suo stesso metaromanzo, e raddoppia la posta in
                gioco inserendo due momenti di ripiegamento totale, le lettere
                di Ermes Marana e il diario di Silas Flannery. In queste due
                lunghe parentesi, introdotte con delle variazioni
                sull’espediente retorico del manoscritto ritrovato che non a
                caso è una delle strategie più tradizionali del genere
                romanzesco e appare come un omaggio ironico al più canonico
                degli autori italiani, Manzoni, vediamo in azione due forme
                aggiuntive di sabotaggio dell’autorità dello scrittore, che qui
                vengono messe in atto direttamente da due personaggi che sono
                scrittori essi stessi. Da un lato infatti abbiamo il rifiuto
                frontale del concetto di «autorità dell’autore» (Barenghi 1992)
                da parte del falsificatore compulsivo Marana, che vagheggia un
                mondo di apocrifi letterari in cui il principio dell’autorialità
                è stato compromesso irrimediabilmente; dall’altro vediamo il
                prototipo dello scrittore per eccellenza Flannery colto in un
                momento di crisi della scrittura, che quindi è anche crisi della
                sua stessa esistenza, e che per rimediare al prosciugamento
                della sua ispirazione creativa sperimenta idee casuali e arriva
                a ipotizzare un romanzo su due autori di romanzi che falliscono
                nel loro compito creativo abdicando alla propria ispirazione per
                imitarsi reciprocamente, in un caleidoscopio di negazioni che
                polverizzano del tutto la figura sacrale dell’autore.
                <br />
                D’altra parte, accanto al sabotaggio integrale della figura
                autoriale, è anche importante notare che «Calvino non spoglia lo
                scrittore dell’autorità semplicemente per dare quell’autorità al
                lettore […] sostituendo un ideale metafisico con l’altro», ma
                esibisce una serie di approcci diversi e conflittuali alla
                lettura che sono volontariamente esagerati «per esporre le
                supposizioni sbagliate sia sull’autorialità sia, forse in modo
                ancor più importante, sulla lettura» (Sorapure 1985, 705). È qui
                che entra in gioco non soltanto la Lettrice, ma anche tutti gli
                altri personaggi più o meno lettori che, susseguendosi in vari
                incontri, esprimono la loro visione dell’esperienza narrativa
                contestando e relativizzando quella del protagonista, che
                potremmo essere tentati di considerare come l’unica valida.
                Mettendo il Lettore di fronte a concezioni del libro e della
                lettura che sono diverse dalla sua e che, soprattutto, sono
                ognuna a modo proprio più forti, definite e autoconsapevoli
                della sua, Calvino espone spietatamente la fondamentale vacuità
                del suo protagonista in quanto “lettore medio”, sabotando
                l’impulso di immedesimazione che proveremmo nei suoi confronti.
                E anche in questo senso la costruzione della trama è rivelatoria
                del messaggio calviniano: l’interruzione continua e frustrante
                delle storie è infatti tanto più significativa perché mette in
                luce le ingenuità del suo eroe, in primo luogo la pretesa di
                leggere una storia unicamente “per sapere come va a finire”, che
                è sintomo del suo impulso «a cercare nelle opere che legge come
                dare un senso alla propria vita» (Todorov 2008, 6). L’errore
                fondamentale del Lettore, che è poi speculare alla pretesa
                altrettanto infondata dell’autore tradizionale, è guardare alla
                trama come a un’alchimia o a un gioco di prestigio il cui valore
                si attiva solo quando si raggiunge il finale, un meccanismo
                capace di illuminare il senso profondo della realtà e di
                premiare chi lo percorre con la rivelazione di un qualche
                segreto su come organizzare la propria caotica esperienza, ma
                solo a patto di seguirlo fino in fondo (Kermode 1972). Essendo
                proiettato sulla scoperta del finale, quindi, si capisce come le
                cesure che impediscono al Lettore di procedere in avanti nelle
                storie e di chiudere le parabole aperte delle trame siano la
                massima forma di sabotaggio delle sue aspirazioni, ben più di
                quanto non lo siano per la Lettrice, che invece dimostra di
                avere un approccio più organico e immediato all’esperienza della
                lettura, non così ossessivamente finalizzato al raggiungimento
                della conclusione.<br></br>
                Ma qual è la trama di questo Lettore perseguitato dalle trame?
              </p>
            </Trans>
          </div>
          <div className={SheetStyles.gridRow}>
            <h2 className={SheetStyles.titleH2}>
              {this.props.t("trama-sheet:Un romanzo d’avventura")}
            </h2>
            <Trans
              i18nKey="romanzo-d-avventura"
              ns="trama-sheet"
              t={this.props.t}
            >
              <p className={SheetStyles.paragraph}>
                Se ritagliamo via i romanzi incastonati nella storia-cornice del
                Lettore e ricuciamo insieme soltanto le parti che lo vedono
                protagonista, possiamo notare immediatamente che ci sono alcune
                note ricorrenti nell’articolazione della sua trama, alcuni
                motivi che spiccano tra gli altri per l’insistenza con cui
                ritornano, e che nel loro insieme finiscono per tratteggiare
                qualcosa di inatteso.
              </p>
            </Trans>
          </div>

          <div className={SheetStyles.gridRow}>
            <img
              className={SheetStyles.image}
              src={this.props.i18n.language === "it" ? zoom_01 : zoom_01En}
              style={{ gridColumn: " 1 / span 10" }}
              alt=""
            />
            <div style={{ gridColumn: " 12 / span 1" }}>
              <img
                className={SheetStyles.sideLegend}
                src={this.props.i18n.language === "it" ? info_01 : info_01En}
                alt=""
              />
              <p
                className=" captionLeft "
                style={{ gridColumn: " 12 / span 1" }}
              >
                {" "}
                {this.props.t("trama-sheet:Schema della trama del lettore")}
              </p>
            </div>
          </div>

          <div className={SheetStyles.gridRow}>
            <Trans
              i18nKey="paragraph-schema-della-trama"
              ns="trama-sheet"
              t={this.props.t}
            >
              <p className={SheetStyles.paragraph}>
                Salta subito all’occhio il fatto che il grosso della vicenda del
                Lettore tenda a posizionarsi su alcune linee di galleggiamento
                preferenziali. Anche qui, come in molti testi di Calvino, hanno
                un ruolo particolare gli incontri, che si articolano su due
                dinamiche complementari e fortemente significative: da un lato
                gli 8 incontri maschili che coinvolgono 7 interlocutori e
                procedono secondo una logica rigorosamente sequenziale, in cui i
                personaggi secondari vengono coinvolti solo una volta per poi
                non tornare più nel seguito della vicenda, comportandosi quindi
                come una sorta di personificazioni degli ostacoli
                progressivamente incontrati e superati dall’eroe (l’unica
                eccezione che si sottrae è il suo opposto polare, il non-lettore
                Irnerio, unica figura di tutta la storia a essere radicalmente
                estranea alla lettura, caratteristica che la pone in una certa
                misura fuori dal perimetro della vicenda e giustifica le sue due
                apparizioni con il ruolo di chi, osservando i fatti
                dall’esterno, può fornire informazioni mancanti); dall’altro gli
                8 incontri femminili che invece coinvolgono solo due donne che
                ritornano, Ludmilla e Lotaria, peraltro legate da una certa
                confluenza delle identità (dall’iniziale comune del nome allo
                stato di sorelle al coinvolgimento personale sia con il Lettore
                sia con i suoi opposti Marana e Flannery). Interessante è anche
                la geometria dei sentimenti, nella quale mancano gli stati più
                sfumati di sospensione o riflessione e sono invece sottolineati
                gli estremi emotivi della tensione positiva (illusione/speranza)
                e negativa (angoscia/delusione e smarrimento/dubbio), tra i
                quali si articola un’alternanza relativamente regolare. Legata
                al piano dell’emotività è anche la presenza ricorrente di
                momenti in cui il protagonista, sollecitato ad abbandonare il
                proprio stato di naturale indecisione dai continui imprevisti
                esterni e dall’incentivo sentimentale dell’interazione con
                Ludmilla, concretizza il proprio impulso all’azione pianificando
                un’iniziativa, una prova di conquista dell’<em>agency</em> che
                nonostante i fallimenti si ripete per ben 13 volte. Ma il dato
                forse più notevole è la ricorrenza del motivo dello spostamento
                nello spazio: l’insieme dei motivi legati al movimento conta 21
                occorrenze, e porta alla luce l’elemento forse a prima vista
                meno appariscente della vicenda del Lettore, ovvero il fatto che
                la sua è nei fatti la storia di un viaggio in senso proprio. Un
                dato che assume un significato particolare se pensiamo che lo
                stesso Iser nei suoi saggi associa il lettore alla metafora del
                viaggiatore, inteso come soggetto che compie un percorso
                attraverso gli snodi della trama, nel corso del quale i suoi
                sentimenti vengono coinvolti in un moto altalenante di
                frustrazione e soddisfazione del desiderio narrativo (Iser 1976,
                50ss). Se a tutto questo aggiungiamo anche l’ultimo e il più
                vistoso elemento ricorrente nella trama del Lettore, vale a dire
                l’irruzione metaletteraria del narratore che commenta la
                vicenda, e che si posiziona principalmente e non a caso sul
                «cominciare e finire» del testo, per usare una formula
                calviniana (Calvino 1995a, 734-753), ovvero quelle zone di
                soglia che si trovano ai confini del libro e intorno agli
                incipit dei capitoli e dei racconti incastonati, abbiamo
                l’ultimo indizio per trovare nella filigrana di{" "}
                <em>Se una notte d’inverno un viaggiatore</em> l’ombra di un
                genere ben preciso, e forse del più inaspettato: il romanzo
                d’avventura. Gli incontri-ostacoli sequenziali maschili,
                l’inseguimento di una donna come oggetto del desiderio
                ricorrente, l’oscillazione estrema dei sentimenti che favorisce
                la costruzione della tensione e dell’empatia verso il
                protagonista, l’impulso disordinato ma onesto all’iniziativa che
                rilancia in avanti la situazione di squilibrio e motiva il
                proseguimento della peripezia, il commento metanarrativo sulle
                soglie: analizzata nelle sue linee di tensione, la trama della
                storia del Lettore rivela una sovrapposizione quasi perfetta
                alle trame dei romanzi avventurosi del XVIII secolo, e in
                particolare a quella del <em>Tom Jones</em> di Henry Fielding,
                forse la massima incarnazione di questo genere nell’intera
                letteratura moderna. Leggendo la trama del Lettore senza le
                interruzioni dei libri altrui scopriamo insomma che{" "}
                <em>Se una notte d’inverno un viaggiatore</em>, il romanzo
                metaletterario per eccellenza di Calvino, cioè un autore che fin
                dagli anni Cinquanta aveva contestato ironicamente il genere
                avventuroso intitolando <em>avventure</em> le sue storie di
                piccole esperienze di vita comune (quelle che sarebbero finite a
                comporre <em>Gli amori difficili</em>), usa in realtà come
                propria struttura nascosta lo scheletro della trama romanzesca
                “ingenua” per eccellenza, recuperata in blocco da quel{" "}
                <em>romance</em> o <em>roman d’aventure</em> (Rivière 1913) con
                cui il Novecento aveva tentato di dichiarare chiusi i conti: il
                racconto avventuroso basato sulla peripezia e lo spostamento,
                radicato nella grande genealogia occidentale che parte dai poemi
                omerici e dalle <em>Etiopiche</em> di Eliodoro per arrivare agli
                autori della materia arturiana, ad Ariosto,
                all’avventuriero-lettore (e anche lui lettore problematico){" "}
                <em>Don Chisciotte</em>, e infine alle narrazioni rocambolesche
                dei romanzi moderni dai <em>Viaggi di Gulliver</em> di Jonathan
                Swift in poi.
              </p>
            </Trans>
          </div>

          <div className={SheetStyles.gridRow}>
            <h2 className={SheetStyles.titleH2}>
              {this.props.t("trama-sheet:Esperienze vicarie")}
            </h2>
            <Trans
              i18nKey="paragraph-esperienze-vicarie"
              ns="trama-sheet"
              t={this.props.t}
            >
              <p className={SheetStyles.paragraph}>
                D’altra parte, se ritagliamo via i romanzi incastonati per
                osservare soltanto la linea pulita della trama del Lettore,
                perdiamo anche, paradossalmente, una parte significativa della
                narrazione relativa al Lettore stesso: il rapporto tra la sua
                storia e le vicende dei romanzi che legge non è infatti soltanto
                di reciproca interruzione, ma anche di reciproca integrazione, e
                ancora più esattamente di <em>proiezione</em>, nel senso che
                tutti i protagonisti dei libri si rivelano in un modo o
                nell’altro doppi e alter ego leggermente variati del
                protagonista, incarnando parti della sua identità ed esplorando
                virtualmente le potenzialità del suo carattere. Fin dal primo
                incipit che introduce nella vicenda del Lettore, Calvino
                imbastisce subito una dinamica complessa in cui si alternano
                corrispondenze e rovesciamenti, in una forma che rimanda in
                qualche misura agli “episodi” dei poemi cavallereschi, spesso
                composti da mosaici di singole storie o legende autonome nate
                attorno a diversi personaggi dell’immaginario letterario, e
                riassemblate in un unico testo sostituendo i vari protagonisti
                con un unico eroe. Un prototipo che era ben presente nella
                biblioteca mentale calviniana, nella quale la tradizione
                arturiana e in particolare il filone ariostesco era centrale,
                come traspare anche dalla contiguità lessicale e concettuale tra
                il linguaggio che lega il «piacere della pura proliferazione
                delle storie» (Du Plessix Gray 1981) di{" "}
                <em>Se una notte d’inverno un viaggiatore</em> al metodo con cui
                Ariosto fa «proliferare episodi da episodi, creando nuove
                simmetrie e nuovi contrasti» (Calvino 1995b, 759), descritto
                dallo stesso Calvino in un saggio che risale proprio al periodo
                della stesura del romanzo (1975).
              </p>
            </Trans>
          </div>

          <div className={SheetStyles.gridRow}>
            <div
              className={SheetStyles.paragraph}
              style={{ gridColumn: " 1 / span 10", float: "right" }}
            >
              <img
                className={SheetStyles.image100w}
                src={this.props.i18n.language === "it" ? zoom_02 : zoom_02En}
                alt=""
              />
            </div>
            <div>
              <p className=" captionLeft ">
                {" "}
                {this.props.t("trama-sheet:Dove siamo")}
              </p>
              <img
                className={SheetStyles.sideLegend}
                src={this.props.i18n.language === "it" ? info_02 : info_02En}
                alt=""
              />
            </div>
          </div>

          <div className={SheetStyles.gridRow}>
            <Trans
              i18nKey="paragraph-dove-siamo"
              ns="trama-sheet"
              t={this.props.t}
            >
              <p className={SheetStyles.paragraph}>
                L’interazione tra gli incipit dei romanzi e la vicenda del
                Lettore, e in particolare il loro ruolo di completamento
                organico della cornice, è imbastito già dal primo romanzo, in
                cui un protagonista dai tratti ancora indeterminati incontra una
                donna verso cui sviluppa un’immediata attrazione mentre si trova
                lanciato in una misteriosa e inaspettata missione: è la traccia
                che prefigura proprio ciò che sta per accadere al Lettore, che
                sorpreso dall’errore di impaginazione del libro si reca nella
                libreria in cui incontra per la prima volta Ludmilla e inizia la
                sua avventura. Ma la complessità del rapporto tra storie e
                cornice è ancora più chiara nel secondo incipit, quello in cui
                il motivo iniziale dell’infatuazione per la donna viene
                complicato dall’inserimento di un nuovo elemento, il rivale
                maschile, o più esattamente un personaggio maschile che il
                protagonista trasforma rapidamente in avversario amoroso nella
                propria immaginazione. Anche in questo caso, è esattamente ciò
                che sta per avvenire al Lettore, che dopo il secondo romanzo
                interrotto verrà indirizzato da Ludmilla all’oscuro Istituto di
                lingue e letterature botno-ugriche dell’Università e qui
                incontrerà Irnerio, che nel giro di poche pagine prenderà nella
                sua mente il ruolo di rivale («pensando a Ludmilla che veniva
                qui, che si nascondeva qui, <em>forse con Irnerio</em>»,{" "}
                <em>RR</em>, II, 660). Tuttavia è qui che notiamo la prima delle
                tante variazioni che Calvino inserisce nel meccanismo di
                rispecchiamento per alterare la corrispondenza diretta tra
                vicende narrate e peripezie del Lettore: se infatti il primo
                incipit si riversava sulla cornice con un perfetto parallelismo,
                così che in entrambi i casi all’incontro con la donna seguiva il
                momento dell’esaltazione sentimentale e il desiderio di
                instaurare una relazione, il secondo incipit stabilisce un
                precedente che nella cornice viene ribaltato, aprendo una
                divaricazione tra il personaggio del romanzo, che al primo
                sospetto di gelosia si scaglia contro il proprio avversario
                coinvolgendolo in una rissa violenta, e il Lettore che invece,
                di fronte allo stesso sentimento potenziale, cade in uno stato
                di turbamento e immobilità e lascia allontanare il possibile
                rivale quasi con un senso di sconfitta preventiva. Gli incipit
                fanno quindi da esperienza vicaria sia per il protagonista sia
                per il lettore (reale), e l’attenta calibratura di questa
                tensione tra ripetizioni e rovesciamenti, qui appena introdotta
                e resa sempre più complessa con il procedere della storia, è in
                un certo senso il vero e proprio motore su cui si basa tutto il
                resto di <em>Se una notte d’inverno un viaggiatore</em>, oltre a
                essere la strategia che permette a Calvino di espellere quasi
                completamente dal piano della rappresentazione diretta la
                costruzione psicologica del suo “eroe” (e parzialmente anche
                quella della coprotagonista), dislocando la messa a fuoco dei
                suoi connotati psicologici e caratteriali nei romanzi
                incastonati, che funzionano come laboratori dell’identità e
                fucine delle opzioni comportamentali che il Lettore travasa poi
                nella propria vita. Il che è reso possibile dal fatto che il
                Lettore è un personaggio dai confini instabili e dagli schemi di
                azione incerti, che presenta la sintomatologia tipica dei
                personaggi che si trovano in uno stato di ansia mimetica: la sua
                stessa natura di lettore, cioè di soggetto che ha come primo
                carattere definitorio della propria identità l’elemento della
                lettura, dell’immersione nelle storie scritte, sembra
                predisporlo a guardare le esperienze della sua vita reale
                attraverso il filtro di senso delle esperienze rappresentate che
                ha appena letto, nelle quali ricerca ossessivamente dei modelli
                di comportamento da imitare e in generale una forma di
                «consolazione per la sua esistenza disordinata e
                incontrollabile» (Sorapure 1985, 702).
              </p>
            </Trans>
          </div>

          <div className={SheetStyles.gridRow}>
            <Trans
              i18nKey="paragraph-oltre-la-proiezione"
              ns="trama-sheet"
              t={this.props.t}
            >
              <h2 className={SheetStyles.titleH2}>
                Oltre la proiezione: la letteratura come inconscio
              </h2>
              <p className={SheetStyles.paragraph}>
                Tra i punti in cui il modello di riversamento tra incipit e
                cornice raggiunge i picchi di maggior complessità di{" "}
                <em>Se una notte d’inverno un viaggiatore</em>, un ruolo di
                particolare rilievo è sicuramente legato all’interazione con la
                Lettrice, che subisce a sua volta lo stesso processo di osmosi
                dell’identità in cui è coinvolto il Lettore: una condizione di
                dislocamento e quasi di transfert che attraversa le barriere
                ontologiche tra realtà (intradiegetica, ovviamente) e finzione,
                e fa sì che, come tutti i protagonisti maschili sono versioni
                alternative o potenziali del Lettore, così tutte le
                coprotagoniste femminili elevate a oggetto del desiderio siano
                proiezioni di Ludmilla. Fin dal secondo capitolo del resto
                veniamo subito informati della dinamica per cui gli accenni
                degli altri personaggi alla donna, cioè tecnicamente il suo
                “essere narrata”, provocano nel Lettore un effetto di
                smottamento dei livelli discorsivi e «creano intorno alla
                Lettrice una curiosità apprensiva non dissimile a quella che ti
                lega a Zwida Ozkart, nel romanzo di cui stai cercando il
                seguito, e anche alla signora Marne nel romanzo che avevi
                cominciato a leggere il giorno prima» (<em>RR</em>, II, 659). È
                quindi particolarmente rivelatore il modo in cui Calvino conduce
                il suo protagonista verso l’agognata conquista della Lettrice.
              </p>
            </Trans>
          </div>

          <div className={SheetStyles.gridRow}>
            <div
              className={SheetStyles.paragraph}
              style={{ gridColumn: " 1 / span 10", float: "right" }}
            >
              <img
                className={SheetStyles.image100w}
                src={this.props.i18n.language === "it" ? zoom_03 : zoom_03En}
                alt=""
              />
            </div>
            <div>
              <p className=" captionLeft ">
                {" "}
                {this.props.t("trama-sheet:Dove siamo")}
              </p>
              <img
                className={SheetStyles.sideLegend}
                src={this.props.i18n.language === "it" ? info_03 : info_03En}
                alt=""
              />
            </div>
          </div>

          <div className={SheetStyles.gridRow}>
            <Trans
              i18nKey="paragraph-dove-siamo-2"
              ns="trama-sheet"
              t={this.props.t}
            >
              <p className={SheetStyles.paragraph}>
                Nuovamente, i romanzi fanno qui da scorciatoia esperienziale: il
                Lettore, proiettato nelle vicende dei personaggi dei romanzi,
                sperimenta modalità di interazione con la donna-amante che vanno
                dalla complicità al conflitto, e integrano anche la presenza di
                un terzo soggetto che interviene come rivale, evidente
                proiezione sia di Irnerio sia del fantasmatico Ermes Marana, sui
                quali si intrecciano interessanti elementi mortuari o mortiferi.
                L’intera prima metà del romanzo prepara così l’avvicinamento dei
                due protagonisti costruendo un <em>crescendo</em> della tensione
                erotica che rimane rigorosamente confinato negli incipit finché,
                a ridosso dell’evento semitraumatico che è la scoperta delle
                lettere di Ermes Marana e della precedente relazione tra il
                falsario e la Lettrice, l’incontro amoroso tra i due personaggi
                centrali del romanzo si può finalmente realizzare. Le letture
                agiscono insomma da acceleratori dell’esperienza reale, offrendo
                al protagonista un bagaglio di interazioni virtuali con la donna
                desiderata, e riempiendo in forma traslata il vuoto di
                connessioni che agli occhi del lettore reale (cioè il lettore
                del romanzo di Calvino) rischierebbe di far sembrare questa
                scena precipitosa e mal preparata. In questo modo l’autore può
                creare una dinamica di continuità paradossale che trasforma i
                “vuoti” in “pieni”, e anche se il protagonista non vive
                esperienze “reali”, le esperienze di lettura nelle quali si
                proietta intervengono a coprire la mancanza e finiscono per
                diventare parte integrante della trama pur essendone
                teoricamente una sospensione. Così che alla fine della storia
                abbiamo la sensazione che il Lettore e la Lettrice abbiano
                davvero attraversato tutte le esperienze messe in scena nei vari
                romanzi, e la conclusione della loro parabola ottiene un valore
                di chiusura soddisfacente.
                <br />
                Ma Calvino, con un gesto tipico della sua inclinazione a
                gareggiare con i meccanismi narrativi che lui stesso ha
                costruito, non si limita a mettere in scena la dinamica di
                imitazione con cui il protagonista risucchia costantemente
                esperienze e schemi di senso dai romanzi che legge, e in un
                punto particolare arriva a capovolgere il proprio gioco per
                creare una piccola ma significativa frattura della dinamica
                consolidata.
              </p>
            </Trans>
          </div>

          <div className={SheetStyles.gridRow}>
            <div
              className={SheetStyles.paragraph}
              style={{ gridColumn: " 1 / span 10", float: "right" }}
            >
              <img
                className={SheetStyles.image100w}
                src={this.props.i18n.language === "it" ? zoom_04 : zoom_04En}
                alt=""
              />
            </div>
            <div>
              <p className=" captionLeft ">
                {" "}
                {this.props.t("trama-sheet:Dove siamo")}
              </p>
              <img
                className={SheetStyles.sideLegend}
                src={this.props.i18n.language === "it" ? info_04 : info_04En}
                alt=""
              />
            </div>
          </div>

          <div className={SheetStyles.gridRow}>
            <Trans
              i18nKey="paragraph-dove-siamo-3"
              ns="trama-sheet"
              t={this.props.t}
            >
              <p className={SheetStyles.paragraph}>
                Siamo quasi alla fine del testo: durante la seconda metà del
                romanzo, una costruzione simmetrica a quella che aveva portato
                alla conquista di Ludmilla inizia a innestare negli incipit un
                nuovo <em>crescendo</em>, questa volta puntato verso il
                tradimento della donna desiderata con una donna-rivale.
                Esattamente come era successo in precedenza, i romanzi
                incastonati esplorano in modo via via più chiaro ed esplicito
                l’indecisione del protagonista tra due donne contrapposte, e
                mostrano il suo graduale scivolamento verso quella “sbagliata”:
                arriviamo così al momento in cui, nella cornice, il Lettore, tra
                i commenti ironicamente scandalizzati dell’autore-narratore,
                cede alla provocazione di Lotaria, che nel testo è stata
                ripetutamente presentata come contrario e allo stesso tempo come
                doppio di Ludmilla, e che si è appena esibita in un vertiginoso
                accumulo di false identità, fino a diventare quasi una versione
                femminile di Marana. Ed è qui che Calvino fa scattare il suo
                piccolo gioco di inversioni, che proprio sul finale scompagina
                quella che credevamo essere la direzione fissa e unica del
                processo di proiezione-imitazione: se finora il Lettore traeva
                dalla lettura appena fatta il quadro psicologico ed emotivo con
                cui affrontare il seguito della sua realtà, dimostrandosi
                malleabile e pronto a plasmare se stesso sul modello della
                narrazione che aveva appena assorbito, ora il gesto di
                tradimento che scompagina le carte della storia rovescia anche
                l’ordine delle influenze e rimbalza sulla lettura seguente.
                L’esperienza disorientante del rapporto con Lotaria, e il
                collasso delle identità tra le due sorelle, che arriva a
                scompigliare l’identità del Lettore stesso, con un effetto di
                simmetria impossibile che ricorda la logica notturna teorizzata
                da Matte Blanco (Matte Blanco 1990), ribalta l’ordine naturale
                dell’immedesimazione e fa in modo che, per una volta, sia la
                vita del protagonista a influenzare la scrittura del romanzo
                successivo: la storia di un personaggio alla ricerca delle
                proprie ignote origini, che si imbatte e tenta di sedurre due
                diverse ragazze che però sono entrambe sue sorellastre, in un
                triangolo di rapporti simmetrici e allo stesso tempo asimmetrici
                che ripete esattamente la dinamica appena capitata al
                protagonista della cornice incarnando vistosamente, tra le altre
                cose, il suo chiaro senso di colpa e di smarrimento per l’azione
                compiuta.
                <br />
                Nel complesso, vediamo come Calvino riesca a sfruttare le
                stratificazioni della sua opera più postmoderna, e cioè più
                legata a una certa visione della letteratura come gioco formale,
                per nascondere al suo interno un contro-discorso che invece
                riabilita la letteratura come esperienza reale. Una sorta di
                testimonianza del fatto che c’è una base comune di vita umana
                che la narrativa è in grado di intercettare e che la “magia”
                della lettura di storie umane può restituirci, prevalentemente
                dandoci la possibilità di sostituirci ai protagonisti dei libri
                nonostante le differenze superficiali di identità, situazioni e
                temperamenti. Ma anche una testimonianza del fatto che il potere
                della trama come meccanismo di produzione del senso è talmente
                forte da scavalcare le partizioni interne e i “giochi”
                metaletterari, trovando sempre un modo per ricostituire una
                continuità complessiva e un’unità organica che, in una forma o
                nell’altra, riesce a riportare il caos delle forme sotto l’ala
                di un senso.
              </p>
            </Trans>
          </div>

          <div className={SheetStyles.gridRow}>
            <h2 className={SheetStyles.titleH2}>
              {this.props.t("bibliografia")}
            </h2>
            <ol className={[SheetStyles.paragraph, "references"].join(" ")}>
              <li className={"referenceItem"}>
                Barenghi 1992: M. Barenghi, <em>L’autorità dell’autore</em>,
                Lecce, Milella.
              </li>
              <li className={"referenceItem"}>
                Calvino 1995a: I. Calvino,{" "}
                <em>Cominciare e finire</em>, appendice a <em> Le lezioni americane</em>,
                Id., <em>Saggi. 1945-1985</em>, I, in a cura di M. Barenghi, Milano, Mondadori, pp. 734-753.
              </li>
              <li className={"referenceItem"}>
                Calvino 1995b: I. Calvino,{" "}
                <em>Ariosto: la struttura dell’«Orlando furioso» </em>[1975], in
                Id., <em>Saggi. 1945-1985</em>, a cura di M. Barenghi, Milano, Mondadori, pp. 759-768.
              </li>
              <li className={"referenceItem"}>
                Du Plessix Gray 1981: F. du Plessix Gray,{" "}
                <em>Visiting Italo Calvino</em>, in «The New York Times Review
                of Books», June 21.
              </li>
              <li className={"referenceItem"}>
                Eco 1979: U. Eco,{" "}
                <em>
                  Lector in fabula. La cooperazione interpretativa nei testi
                  narrativi
                </em>
                , Milano, Bompiani.
              </li>
              <li className={"referenceItem"}>
                Falcetto 1992: B. Falcetto,{" "}
                <em>«Se una notte d’inverno un viaggiatore»</em>, in{" "}
                <em>Note e notizie sui testi</em>, a cura di M. Barenghi, B.
                Falcetto, C. Milanini, <em>RR</em>, II, pp. 1381-1401.
              </li>
              <li className={"referenceItem"}>
                Jauss 1969: H.R. Jauss,{" "}
                <em>Perché la storia della letteratura?</em>, ed. it. a cura di
                A. Varvaro, Napoli, Guida.{" "}
              </li>
              <li className={"referenceItem"}>
                Jauss 1988: H.R. Jauss, <em>Estetica della ricezione</em>
                , trad. it. di A. Giugliano, Napoli, Guida.
              </li>
              <li className={"referenceItem"}>
                Iser 1974: W. Iser,{" "}
                <em>
                  The Implied Reader. Patterns of communication in prose fiction
                  from Bunyan to Beckett
                </em>{" "}
                [1972], eng. transl., Baltimore, Johns Hopkins University Press.
              </li>
              <li className={"referenceItem"}>
                Iser 1976: W. Iser,{" "}
                <em>L’acte de lecture. Theorie de l’effet esthètique</em>, fr.
                trad. par E. Sznycer, Bruxelles, Mardaga.
              </li>
              <li className={"referenceItem"}>
                Kermode 1972: F. Kermode,{" "}
                <em>Il senso della fine. Studi sulla teoria del romanzo</em>,
                trad. it. di G. Montefoschi, Milano, Rizzoli.
              </li>
              <li className={"referenceItem"}>
                Matte Blanco 1990: I. Matte Blanco,{" "}
                <em>
                  L’inconscio come insiemi infiniti. Saggio sulla bi-logica
                </em>
                , trad. it. di P. Bria, Torino, Einaudi.
              </li>
              <li className={"referenceItem"}>
                Rivière 1913: J. Rivière, <em>Le Roman d’aventure</em>, in
                «Nouvelle Revue Française», LIII (mai 1913), pp. 748-765, LIV
                (juin 1913), pp. 914-933, LV (juillet 1913), pp. 56-77.
              </li>
              <li className={"referenceItem"}>
                Sorapure 1985: M. Sorapure,
                <em>
                  {" "}
                  Being in the Midst: Italo Calvino’s «If on a winter’s night a
                  traveler»
                </em>
                , in «Modern Fiction Studies», XXXI, pp. 702-710.
              </li>
              <li className={"referenceItem"}>
                Todorov 2008: T. Todorov,{" "}
                <em>La letteratura in pericolo</em>, trad. it. di E. Lana,
                Milano, Garzanti.
              </li>
              <li className={"referenceItem"}>
                Tortonese 2013: P. Tortonese,{" "}
                <em>
                  L’homme en action. La représentation littéraire d’Aristote à
                  Zola
                </em>
                , Paris, Classiques Garnier.
              </li>
              <li className={"referenceItem"}>
                Woolf 1995: V. Woolf, <em>Il lettore comune</em>, trad.
                it. di D. Guglielmino, Genova, il Melangolo.
              </li>
            </ol>
          </div>

          <FooterSchede3
            linkTappaA={"/form/phase1"}
            linkTappaB={"/form/phase2"}
            linkAnalisi={"/form/phase3"}
          />
        </main>
      </>
    )
  }
}

export default withTranslation(["translation", "trama-sheet"])(
  PlotInformationSheet
)
