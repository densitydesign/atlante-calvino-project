import React, { Component } from "react";
import SheetStyles from "../SheetStyles.module.css";
import HamburgerCompassHeader from "../../headers/HamburgerCompassHeader/HamburgerCompassHeader";
import FooterSchede3 from "../FooterSchede3";

import context_webm_1x from "./animation-text-context@1x.webm";
import context_mp4_1x from "./animation-text-context@1x.mp4";
import context_webm_2x from "./animation-text-context@2x.webm";
import context_mp4_2x from "./animation-text-context@2x.mp4";

import distribution from "./distribution.svg";
import miniviz from "./miniviz.svg";
import legend from "./legend.svg";

import section01 from "./section01.svg";
import section02 from "./section02.svg";
import section03 from "./section03.svg";
import section04 from "./section04.svg";

import visualizationPDF from "./muro-di-testo-avventura-di-un-soldato.pdf";
import { Trans, withTranslation } from "react-i18next";

class CancellationInformationSheet extends Component {
  render() {
    return (
      <>
        <HamburgerCompassHeader />
        <main className={SheetStyles.main}>
          <div className={SheetStyles.gridRow}>
            <h4 className={SheetStyles.titleH4}>
              {this.props.t("TAPPA 3")} {">"} {this.props.t("cancellare")}
            </h4>
            <h1 className={SheetStyles.titleH1}>
              {this.props.t("cancellazione-sheet:Il dubbio e la cancellazione")}
            </h1>
            <h2 className={SheetStyles.titleH2}>
              {this.props.t("cancellazione-sheet:Un racconto esemplare")}
            </h2>
            <Trans
              i18nKey="paragraph-racconto-esemplare"
              t={this.props.t}
              ns="cancellazione-sheet"
            >
              <p className={SheetStyles.paragraph}>
                <i>L’avventura di un soldato</i> (1949) è il racconto che
                inaugura la serie delle “avventure”, una formula narrativa che
                verrà ripresa più volte nel corso degli anni, denominando un
                gruppo di racconti che poi confluiranno nella raccolta{" "}
                <i>Gli amori difficili</i> (1970). Come spiega lo stesso Calvino
                nella nota introduttiva al volume, «ciò che sta alla base di
                molte di queste storie è una difficoltà di comunicazione, una
                zona di silenzio al fondo dei rapporti umani» (Calvino 2011, p.
                XII). Nel racconto il fante Tomagra si trova seduto nello
                scompartimento di un treno, quando accanto a lui prende posto
                una donna vestita a lutto. La trama del racconto consiste nel
                susseguirsi delle manovre di seduzione del soldato, che
                potrebbero permettergli di creare un legame con la vedova.
                Legame tuttavia fragile e incerto poiché i suoi gesti «appaiono
                ora vittorie gigantesche e irreversibili ora precarie illusioni
                prive di conferma» (ibidem). Alla “difficoltà comunicativa” si
                aggiunge quindi un altro ostacolo: Tomagra si muove in un
                universo semanticamente instabile, di cui non riesce a
                interpretare con certezza i segni. Questi due elementi sono
                strettamente legati a quello che abbiamo definito il testo
                dubitativo.
                <br />
                <br /> Nella visualizzazione generale{" "}
                <i>L’avventura di un soldato</i> si situa a destra della linea
                verticale, in una delle fasce più esterne, relativamente isolato
                rispetto agli altri elementi grafici. Nonostante non ci siano
                vere e proprie aggregazioni, la sua orbita rasenta quella di
                alcuni testi significativi: il più vicino <i>Campo di mine</i>{" "}
                (1946), altra eccezione, subito affiancato da{" "}
                <i>Ricordo di una battaglia</i> (1974). Anche lo sviluppo di
                questi due racconti ruota attorno a un processo dubitativo: da
                un lato la storia di un uomo che attraversa una valle minata,
                tentando di interpretare le gobbe e le depressioni del terreno
                in cerca di un indizio che possa indicargli il giusto cammino;
                dall’altro un personaggio che prova a ricostruire il ricordo di
                una battaglia, lottando contro il disfacimento ineluttabile
                della memoria. Nei tre racconti la griglia ha una composizione
                simile: la categoria della{" "}
                <span style={{ color: "#00bfd3" }}>forma</span> è quasi del
                tutto assente, a favore di quella del{" "}
                <span style={{ color: "#FFA500" }}>contenuto</span> e del{" "}
                <span style={{ color: "#ff3366" }}>significato</span>;
                parallelamente, gli stili dominanti sono l’<i>esitazione</i> e
                la <i>negazione</i>. Il mondo è mutevole sotto diversi aspetti:
                l’oggetto della narrazione sfugge, così come la sua
                interpretazione. Per questo la voce narrante afferma, poi dubita
                e cancella, tornando sui propri passi e prendendo un’altra
                direzione.
                <br />
                <br />
                L’alta concentrazione di testo dubitativo e la sua particolare
                posizione nella visualizzazione rendono <em>L’avventura di un
                soldato</em> un interessante caso studio su cui soffermarsi per
                capire meglio come funzioni la griglia d’analisi che ci ha
                guidato nella creazione della visualizzazione.
              </p>
            </Trans>
            <div className={SheetStyles.sideContent}>
              <div
                className={SheetStyles.image}
                style={{ backgroundColor: "#dfe3e5", borderRadius: 3 }}
              >
                <video
                  style={{ width: "50%", marginLeft: "25%" }}
                  autoPlay
                  muted
                  loop
                >
                  <source
                    type="video/webm"
                    src={
                      window.devicePixelRatio > 1
                        ? context_webm_2x
                        : context_webm_1x
                    }
                  />
                  <source
                    type="video/mp4"
                    src={
                      window.devicePixelRatio > 1
                        ? context_mp4_2x
                        : context_mp4_1x
                    }
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className="captionLeft">
                {this.props.t("cancellazione-sheet:Posizione del racconto")}
              </p>
              <img
                className={SheetStyles.image + " " + SheetStyles.image100w}
                src={distribution}
                style={{ border: "0.5px solid #333333" }}
                alt=""
              />
              <p className="captionLeft">
                {this.props.t(
                  "cancellazione-sheet:Distribuzione delle categorie nel racconto"
                )}
                .
              </p>
            </div>
          </div>
          <div className={SheetStyles.gridRow}>
            <h2 className={SheetStyles.titleH2}>
              {this.props.t("cancellazione-sheet:Analisi del racconto")}
            </h2>
            <Trans
              i18nKey="paragraph-analisi-del-racconti"
              ns="cancellazione-sheet"
              t={this.props.t}
            >
              <p className={SheetStyles.paragraph}>
                La visualizzazione del racconto è divisa in quattro sezioni,
                ognuna accompagnata da un commento: a. Cominciare (§1-8); b.
                Ricominciare (§9-24); c. Buio e attesa (§25-26); d.
                Cancellazione (§27-31). In questo Approfondimento, il testo è
                visualizzato nella sua interezza: a ogni parola è stato
                sostituito un simbolo, in modo tale da poter mappare con estrema
                precisione l’estensione del processo dubitativo e, soprattutto,
                la presenza delle varie <i>categorie</i> e <i>stili</i> della
                griglia. A ogni occorrenza del testo dubitativo è stato
                attribuito un numero crescente, preso come punto di riferimento
                durante l’analisi.
                <br />
              </p>
            </Trans>
            <div
              className={SheetStyles.sideContent}
              style={{ textAlign: "center", position: "sticky", top: "var(--navigation-height)"}}
            >
              <img
              
                src={miniviz}
                style={{float:'left' }}
                alt=""
              />
            </div>
          </div>
          <div className={SheetStyles.gridRow}>
            <img
              className={
                SheetStyles.image + " " + SheetStyles.translucentBackground
              }
              src={legend}
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
              src={section01}
              style={{ gridColumn: "1 / span 12", width: "100%" }}
              alt=""
            />
            <Trans
              i18nKey="paragraph-text"
              ns="cancellazione-sheet"
              t={this.props.t}
            >
              <h2
                className={[
                  SheetStyles.paragraphCentered,
                  SheetStyles.titleH2,
                ].join(" ")}
              >
                a. Cominciare
              </h2>
              <p
                className={SheetStyles.paragraphCentered}
                style={{ marginTop: "1rem" }}
              >
                <br />
                Nella prima sezione le occorrenze di testo dubitativo sono
                rarefatte: a colpo d’occhio emerge la categoria del{" "}
                <span style={{ color: "#FFA500" }}>contenuto</span>, unito allo
                stile della <em>negazione</em>. I paragrafi iniziali sono occupati dalla
                descrizione della donna e dalle prime impressioni di Tomagra,
                rivedute e corrette di volta in volta. La donna si è seduta
                accanto lui nonostante i posti liberi non manchino; allora il
                soldato comincia a ragionare, a riflettere sulle motivazioni che
                potrebbero aver spinto la vedova a scegliere proprio quel posto:
                «certo per via di qualche comodità del viaggiare, s’affrettò a
                pensare il fante, correnti d’aria o direzioni della corsa» (
                <em>RR</em>, I, 319) (
                <span style={{ color: "#FFA500" }}>2, 3</span>). Ma ben presto
                si profila un’altra ipotesi: la signora potrebbe voler stabilire
                un contatto con lui.
                <br />
                <br />
                Nel 7§ la donna dallo sguardo «irraggiungibile», «fisso»,
                «palpebrato», rimane «impassibile» (ivi, 319-320) mentre la sua
                coscia e quella di Tomagra si sfiorano; la vedova non lascia
                trasparire nulla di ciò che prova o pensa, rimanendo un oggetto
                muto per il fante che non sa come interpretare questo suo
                apparente distacco. In quest’avventura, il potere della
                percezione visiva del mondo sembra messo sotto scacco dalla
                segretezza delle manovre di seduzione che sono gestuali: in tal
                modo Tomagra viene spinto a trovare un’altra strada per capire
                il senso di ciò che sta accadendo. Nel corpo principale del
                testo si succedono allora tre domande: «che non se ne fosse
                accorta ancora? Oppure che preparasse una fuga? O una rivolta?»
                (ivi, 321) (<span style={{ color: "#FFA500" }}>7-9</span>).
                Compare qui per la prima volta nel racconto il punto
                interrogativo, segno interpuntivo che sembra suscitare
                un’evoluzione dell’atteggiamento dubitativo. Subito dopo,
                infatti, notiamo la presenza di occorrenze appartenenti al{" "}
                <span style={{ color: "#ff3366" }}>significato</span>: nel 8§
                Tomagra decide di prendere l’iniziativa e «di trasmetterle, in
                qualche modo, un <em>messaggio</em>» (ibidem, corsivo nostro) che vada oltre le
                semplici apparenze; il corpo compierà un’azione che avrà un
                significato “altro”, parallelo: il «muscolo del polpaccio» del
                fante, diventato «un duro quadrato pugno», «corse e bussò al
                polpaccio della vedova» (ibidem) (
                <span style={{ color: "#ff3366" }}>10, 11</span>), come una mano
                che bussi a una porta sperando si apra. Trasmettere il messaggio
                provoca però un moto di panico nel soldato, il quale non si
                aspetta che la donna reagisca, ma si ritrae subito privandosi
                della possibilità di un qualsiasi chiarimento.
                <br />
                <br />
                Questo primo gesto esplicito da parte di Tomagra attiva il
                meccanismo che porta avanti il racconto fino alla sua
                conclusione: agire, cercando un punto di contatto con la vedova
                e sforzandosi di rendere le proprie azioni comprensibili. Per
                rendersi rapidamente conto, invece, che niente di quello che sta
                facendo ha un significato esplicito. Come succede anche ai
                segnali che la donna invia a sua volta: l’unica strategia
                possibile, allora, sarà quella di sottrarsi momentaneamente,
                arretrare per poi ricominciare da capo.
                <br />
                <br />
              </p>
            </Trans>
            <img
              className={SheetStyles.image}
              src={section02}
              style={{
                gridColumn: "1 / span 12",
                marginBottom: "1rem",
                width: "100%",
              }}
              alt=""
            />
            <Trans
              i18nKey="paragraph-text-2"
              ns="cancellazione-sheet"
              t={this.props.t}
            >
              <h2
                className={[
                  SheetStyles.paragraphCentered,
                  SheetStyles.titleH2,
                ].join(" ")}
              >
                b. Ricominciare
              </h2>
              <p
                className={SheetStyles.paragraphCentered}
                style={{ marginTop: "1rem" }}
              >
                <br />
                L’andirivieni mentale e fisico di Tomagra appena descritto
                riflette con estrema fedeltà il comportamento del testo
                dubitativo. Nell’articolo{" "}
                <i>La notte del morto nel paese nemico</i>, Francesca Serra
                descrive il meccanismo dubitativo su cui è costruito{" "}
                <i>Ricordo di una battaglia</i>, ribattezzandolo «racconto
                negato» in quanto si basa su «un riflesso metanarrativo che mina
                nel profondo la costituzione lineare del racconto, tornando
                sempre indietro a contraddirne delle parti» (Serra 2010, 129) e
                dando così vita a una serie potenzialmente infinita di nuovi
                inizi. Nelle prime righe del 9§, Tomagra conclude fra sé che,
                avendo perso «quella paziente e prudentissima opera di
                contatto», «bisognava ricominciare da capo» (<em>RR</em>, I,
                321). Successivamente riprenderà la sua «opera» più volte, dando
                modo al testo dubitativo di intensificarsi e diversificarsi,
                accompagnando i movimenti e i dubbi del soldato.
                <br />
                Osservando la visualizzazione, si percepisce un uso eterogeneo
                sia delle categorie che degli stili; notiamo un’alternanza
                cadenzata fra le occorrenze di{" "}
                <span style={{ color: "#FFA500" }}>contenuto</span> e le
                occorrenze di{" "}
                <span style={{ color: "#ff3366" }}>significato</span>; compare
                in misura minore la categoria{" "}
                <span style={{ color: "#00bfd3" }}>forma</span>. Nel complesso
                potremmo sostenere che l’andamento narrativo e il processo
                dubitativo avanzano parallelamente fra loro.
                <br />
                Al centro di questo andirivieni non si trova, però, il
                personaggio nella sua interezza. Piuttosto la sua mano,
                rappresentata come un’entità a sé stante, una sorta di appendice
                dotata di volontà propria (cfr. ivi, 322). Le due occorrenze{" "}
                <span style={{ color: "#ff3366" }}>10</span> e{" "}
                <span style={{ color: "#ff3366" }}>11</span>, attraverso la{" "}
                <i>riformulazione</i>, avevano anticipato questa “evoluzione”
                scomponendo e trasformando il corpo del fante, sostituendo al
                muscolo del polpaccio l’immagine di un pugno; la mano in seguito
                si metamorfoserà in «farfalla», «topo», «polpo», «granchio»,
                «gallinella» (ivi, 323, 324, 326). Il testo dubitativo
                appartenente alla categoria del{" "}
                <span style={{ color: "#ff3366" }}>significato</span> introduce
                l’ipotesi che alla realtà possano sovrapporsi dimensioni
                alternative, capaci di interferire e confondere, ma anche di
                svelare. Se ci si concentra nello specifico sulla distribuzione
                delle occorrenze di questa categoria, la <i>riformulazione</i> è
                lo stile maggiormente usato: nella visualizzazione, il suo
                impiego si estende dall’inizio (
                <span style={{ color: "#ff3366" }}>10</span>) alla fine del
                racconto (<span style={{ color: "#ff3366" }}>56</span>),
                solitamente nello sforzo frustrato di chiarire una volta per
                tutte il senso che sta dietro ai gesti.
                <br />
                <br />
                La parcellizzazione del corpo di Tomagra riflette il modo in cui
                viene descritto lo scambio muto di gesti fra lui e la vedova:
                ogni minimo movimento è oggetto di un’analisi minuziosa che non
                tralascia nessun particolare. Sembrerebbe qui di riconoscere un
                approccio quasi analitico di esplorazione e documentazione della
                realtà. Eppure nemmeno un simile rigore scientifico riesce a
                proteggere Tomagra dall’accumulo di incertezze e supposizioni.
                Focalizzarsi unicamente sul dettaglio provoca una strana forma
                di miopia in cui ogni cosa, ingigantita e deformata, può
                comunque significare qualcos’altro. Dalla visualizzazione emerge
                che la categoria del{" "}
                <span style={{ color: "#ff3366" }}>significato</span> nelle
                pagine centrali del testo viene impiegata diversamente,
                adottando lo stile dell’<i>esitazione</i> (<span style={{ color: "#ff3366" }}>25</span>, <span style={{ color: "#ff3366" }}>26</span>, <span style={{ color: "#ff3366" }}>28</span>, <span style={{ color: "#ff3366" }}>29</span>, <span style={{ color: "#ff3366" }}>37</span>);
                la prima fra queste occorrenze si interroga se i gesti della
                vedova siano «segni per fargli capire di desistere» oppure «un
                estremo rinvio ch’ella gli concedeva» o ancora «un avvertimento»
                (ivi, 324): le versioni possibili si moltiplicano così come si
                moltiplicano gli interrogativi senza soluzione. Così le
                occorrenze di{" "}
                <span style={{ color: "#ff3366" }}>significato</span> non
                riescono più a riformulare il senso di un gesto trasformandolo
                in un messaggio chiaro, bensì si limitano ad accumulare ipotesi.
                Un modo per Tomagra di ottenere una risposta potrebbe essere
                basarsi sulle reazioni della vedova, ma «lei, lei, lei era una
                sfinge» (ibidem), ennesimo simbolo che rappresenta l’enigma
                femminile e, contemporaneamente, il principio di metamorfosi che
                altera la realtà.
                <br />
                La conclusione del 24§ riprende la frase
                iniziale della sezione: Tomagra è arretrato per l’ennesima
                volta, eppure esita, «come volesse <i>
                  ricominciare da capo
                </i>{" "}
                il suo pazientissimo lavoro e non fosse sicuro ormai delle
                profonde mete già raggiunte. Ma le aveva davvero raggiunte?
                Oppure era stato solo un sogno?» (ivi, 326, corsivo nostro) (
                <span style={{ color: "#ff3366" }}>43</span>,{" "}
                <span style={{ color: "#FFA500" }}>44</span>,{" "}
                <span style={{ color: "#FFA500" }}>45</span>). L’intera manovra
                di seduzione si sbriciola sotto la pressione del dubbio che in
                realtà nulla sia avvenuto come il soldato lo ha immaginato:
                Tomagra si è illuso della complicità raggiunta con la vedova.
                Qui compaiono, infatti, le parole “profondità” e “sogno”, per
                evocare una dimensione onirica e sospesa di assoluta incertezza,
                subito ripresa nella sezione successiva.
                <br />
                <br />
              </p>
            </Trans>
            <img
              className={SheetStyles.image}
              src={section03}
              style={{
                gridColumn: "1 / span 12",
                marginBottom: "1rem",
                width: "100%",
              }}
              alt=""
            />
            <Trans
              i18nKey="paragraph-text-3"
              ns="cancellazione-sheet"
              t={this.props.t}
            >
              <h2
                className={[
                  SheetStyles.paragraphCentered,
                  SheetStyles.titleH2,
                ].join(" ")}
              >
                c. Buio e attesa
              </h2>
              <p
                className={SheetStyles.paragraphCentered}
                style={{ marginTop: "1rem" }}
              >
                <br />
                «Una galleria piombò loro addosso» (ivi, 326). Cala
                istantaneamente il buio e da quell’oscurità Tomagra è confortato
                al punto da tentare qualcosa di inedito: si azzarda a toccare il
                seno della donna. Il primo paragrafo (§25), del tutto privo di
                occorrenze, si concentra sulle mosse del soldato; il secondo
                (§26), con la più alta densità di testo dubitativo in tutto il
                racconto, descrive la reazione di Tomagra a un movimento
                improvviso della vedova. Le riflessioni su cosa abbia causato lo
                scatto nella donna non tardano a contraddirsi l’un l’altra: «lui
                aveva passato il <em>segno</em>» (
                <span style={{ color: "#FFA500" }}>48</span>) oppure «era un{" "}
                <em>segno</em> che tutto ciò era vero, che lei accettava» (
                <span style={{ color: "#ff3366" }}>50</span>) (ivi, 327, corsivo nostro).
                Dove la parola “segno” prima è usata in maniera figurata,
                indicando l’esistenza di un limite, di un confine da non
                superare, poi si trasforma nel sintomo, nella prova-simbolo
                della partecipazione da parte della vedova a quello scambio con
                il soldato. Rivelando che il linguaggio è il primo veicolo
                dell’ambiguità che avvolge il mondo reale.
                <br />
                <br />
                In questa sezione non c’è luce, quindi non c’è visione: siamo
                all’apice di un progressivo percorso verso l’accecamento, una
                privazione della vista che lascia Tomagra solo con le sue
                supposizioni, sostituendo allo spazio esteriore dello
                scompartimento lo spazio interiore del personaggio. Nelle ultime
                occorrenze di{" "}
                <span style={{ color: "#FFA500" }}>contenuto</span> del
                paragrafo il soldato rimugina su quanto sia ancora lunga la
                galleria, se valga la pena tentare nuovamente qualcosa
                approfittando dell’oscurità. Ma il tempo sta per scadere e i
                dubbi allontanano sempre di più la possibilità di agire: «certo
                in queste riflessioni si era perduto molto tempo […] certo però
                la galleria era lunga […] certo se subito avesse approfittato
                avrebbe avuto molto tempo innanzi a sé» (
                <span style={{ color: "#FFA500" }}>51-53</span>) (ibidem). Il
                paragrafo rappresenta l’attesa, parola latina composta da <em>ad-</em>{" "}
                per “verso” e <i>téndere</i> nel senso traslato di “mirare,
                aspirare” ma che significa anche “tirare”: il testo si dilata,
                si gonfia tramite il processo dubitativo, si “tende” aumentando
                il proprio spazio sulla pagina. Al centro del racconto si
                trovano così i gesti assenti, le deduzioni incerte, un impulso
                sistematico ad annullare ogni forma di progressione: un
                articolato stratagemma per prolungare l’attesa, allontanando
                contemporaneamente la fine.
              </p>
            </Trans>
            <img
              className={SheetStyles.image}
              src={section04}
              style={{
                gridColumn: "1 / span 12",
                marginBottom: "1rem",
                width: "100%",
              }}
              alt=""
            />
            <h2
              className={[
                SheetStyles.paragraphCentered,
                SheetStyles.titleH2,
              ].join(" ")}
            >
              d. Cancellazione
            </h2>
            <p
              className={SheetStyles.paragraphCentered}
              style={{ marginTop: "1rem" }}
            >
              <br></br>Nell’ultima sezione del racconto il testo dubitativo
              diminuisce sensibilmente. È trascorso del tempo, i due personaggi
              sono rimasti soli mentre si sta facendo sera. Ormai i gesti di
              Tomagra sono sempre più espliciti: esita brevemente (
              <span style={{ color: "#FFA500" }}>54</span>,{" "}
              <span style={{ color: "#FFA500" }}>55</span>) prima di alzarsi a
              tirare le tende dello scompartimento. Respinge il mondo esterno,
              isolando lui stesso e la vedova che improvvisamente lo guarda con
              «gli occhi aperti e fissi» (ibidem), occhi il cui colore
              («azzurri») si scoprirà solo nelle ultime righe del racconto. Le
              ultime due occorrenze rappresentano il modo in cui il testo
              dubitativo ha partecipato allo sviluppo della narrazione e, in
              definitiva, alla sua creazione: la prima (
              <span style={{ color: "#ff3366" }}>56</span>) specifica cosa
              Tomagra, tramite i suoi movimenti, vorrebbe dire ad alta voce,
              mentre finora tutta la vicenda si era svolto nel silenzio; la
              seconda (<span style={{ color: "#FFA500" }}>57</span>) corregge
              definitivamente l’idea che il soldato si era fatto della vedova. A
              questo punto le incertezze cadono e arriva finalmente il momento
              di prendere l’iniziativa finale, che scioglierà ogni dubbio sul
              carattere sessuale dell’avventura a cui abbiamo assistito: «al
              fante Tomagra non restava che far sì che non ci fossero più dubbi
              possibili» (ivi, 328).<br></br>
              <br></br>
              Se non fosse che fuori da quel dubbio e da quelle incertezze non
              viene lasciato nessuno spazio alla rappresentazione: nel momento
              decisivo dell’azione che infine dovrebbe eliminare ogni ambiguità,
              la narrazione si inibisce e si interrompe. Tra il 30§ e il 31§
              assistiamo a un salto nella storia, a una clamorosa ellissi: nello
              spazio tra i due paragrafi manca, infatti, una scena. Il punto
              culminante dell’avventura per il quale il soldato si è tormentato
              pagina dopo pagina viene semplicemente cancellato. Aprendo a
              ridosso della fine del racconto come un vuoto, una lacuna vistosa
              e al tempo stesso quasi irrilevante rispetto al racconto che
              abbiamo letto fin qui. Perché ottenere o meno i favori della
              vedova non ha rassicurato il soldato, il quale a conclusione di
              tutto «ebbe ancora un moto di paura d’avere […] osato tanto»
              (ibidem). La cancellazione si svela infine essere la vera
              protagonista del racconto, la forza sotterranea in grado di
              trasformarsi in un paradossale principio creativo.<br></br>
              <br></br>
            </p>
          </div>
          <div className={SheetStyles.gridRow}>
            <h2 className={SheetStyles.titleH2}>Bibliografia</h2>
            <ol className={SheetStyles.paragraph + " references"}>
              <li className="referenceItem">
                Serra 2010: F. Serra,{" "}
                <em>La notte del morto nel paese nemico</em>, «Paragone», a.
                LXI, n. 90-91-92, Agosto-Dicembre.
              </li>
              <li className="referenceItem">
                Calvino 2011: I. Calvino, <em>Gli amori difficili</em>,
                presentazione dell’autore con uno scritto di Michele Rago,
                Milano, Mondadori.
              </li>
            </ol>
          </div>

          <FooterSchede3
            linkTappaA={"/doubt/phase1"}
            linkTappaB={"/doubt/phase2"}
            linkAnalisi={"/doubt/phase3"}
          />
        </main>
      </>
    );
  }
}

export default withTranslation(["translation", "cancellazione-sheet"])(
  CancellationInformationSheet
);
