import React, { Component } from "react";
import SheetStyles from "../SheetStyles.module.css";

import HamburgerCompassHeader from "../../headers/HamburgerCompassHeader/HamburgerCompassHeader";
import FooterSchede2 from "../FooterSchede2";

import legenda from "./legend_01.svg";
import marimekko from "./marimekko.svg";
import zoom_02 from "./zoom_02.svg";
import zoom_03 from "./zoom_03.svg";
import zoom_04 from "./zoom_04.svg";
import legenda_02 from "./legenda_02.svg";
import legenda_03 from "./legenda_03.svg";
import legenda_04 from "./legenda_04.svg";
import { Trans, withTranslation } from "react-i18next";

class CombineInformationSheet extends Component {
  render() {
    return (
      <>
        <HamburgerCompassHeader />
        <main className={SheetStyles.main}>
          <div className={SheetStyles.gridRow}>
            <h4 className="ac-breadcrumb">
              {this.props.t("TAPPA 2")} {">"} {this.props.t("combinare")}
            </h4>
            <h1 className={SheetStyles.titleH1}>
              {this.props.t("combining-sheet:Costruire la varietà")}
            </h1>
            <h2 className={SheetStyles.titleH2}>
              {this.props.t(
                "combining-sheet:Compatto vs molteplice, un passaggio sfumato"
              )}
            </h2>
            <Trans
              i18nKey="paragraph-compatto-vs-molteplice"
              ns="combining-sheet"
              t={this.props.t}
            >
              <p className={SheetStyles.paragraph}>
                L’interesse per la letteratura come gioco combinatorio è sempre
                stato un tema ricorrente della critica calviniana. Lo stesso
                Calvino, del resto, con la sua partecipazione diretta al gruppo
                parigino dell’Oulipo (accanto ad autori come Raymond Quenau e
                Georges Perec), ha fissato una chiave di lettura ineludibile per
                molte delle sue opere, che in alcuni casi si è cristallizzata in
                passaggio critico obbligato, soprattutto quando si tratta di
                testi scritti a partire dalla seconda metà degli anni Sessanta.
                È del resto difficile ignorare il netto riorientamento poetico
                che, nel giro di pochi anni, porta la scrittura calviniana a
                passare dai toni e dalle forme con cui aveva conquistato la
                notorietà letteraria, quelli della trilogia degli antenati
                (1952, 1957, 1959), dei <em>Racconti</em> (1958) e di{" "}
                <em>Marcovaldo</em> (1963), al gusto geometrico e metaletterario
                che caratterizza l’ultimo ventennio. Dalle{" "}
                <em>Città invisibili</em> (1972), al{" "}
                <em>Castello dei destini incrociati</em> (1973), fino a{" "}
                <em>Se una notte d’inverno un viaggiatore</em> (1979), a
                dominare l’interesse calviniano è il rapporto tra modello e
                variante, la costruzione modulare vista come innesco non solo di
                un’esplorazione della fantasia, ma anche come esercizio
                cognitivo e metaletterario, in quanto produce un tipo di testo
                che «mostra visibilmente come è costruito: esso è cioè sempre
                autoriflessivo» (Donnarumma 2008, 82). Sono anni interamente
                dedicati all’affinamento di una «macchina narrativa
                combinatoria» (espressione con cui lui stesso definirà il ruolo
                dei tarocchi nel Castello; Calvino 1973, <em>RR</em> II, 1276)
                che, dotata dei giusti elementi di partenza e di un set di
                regole efficaci, possa produrre una varietà infinita di esiti,
                anticipando di mezzo secolo novità che la rivoluzione
                tecnologica dei suoi anni permetteva a stento di indovinare,
                oggi in uso come la “generazione procedurale” condotta tramite
                algoritmo. Al centro simbolico di questa svolta è l’anno 1965,
                che vede l’uscita della raccolta in volume delle{" "}
                <em>Cosmicomiche</em> e l’inaugurazione di un variegato filone
                che si protrarrà per i successivi due decenni (gli ultimi testi,{" "}
                <em>Il niente e il poco</em> e <em>L’implosione</em>, escono nel
                settembre 1984 su «la Repubblica» ancora sotto il titolo di{" "}
                <em>Le nuove cosmicomiche</em>), e che costituisce probabilmente
                il massimo punto di equilibrio tra l’ostentazione di un modello
                ripetuto (la citazione di un fatto scientifico in apertura, la
                voce istrionica del narratore Qfwfq) e la variazione di spunti e
                situazioni.
                <br />
                <br />
                Questo schema critico bipartito, benché effettivamente
                giustificato dalla storia artistica di Calvino e dall’evoluzione
                dei suoi interessi letterari, rischia di nascondere tuttavia un
                intero campo di sfumature. L’ingombrante pubblicazione delle{" "}
                <em>Cosmicomiche</em> condivide infatti l’anno 1965 della
                biografia letteraria calviniana con un altro titolo, un piccolo
                volume che raccoglie due testi precedentemente usciti su rivista
                (rispettivamente in «Nuovi Argomenti», 34, 1958 e in «Botteghe
                Oscure», quaderno X, 1952) in uno strano dittico:{" "}
                <em>La nuvola di smog</em> e <em>La formica argentina</em>. Il
                volumetto Einaudi, parte di un progetto mai realizzato che
                doveva consistere in un «ciclo narrativo sull’Italia di metà
                secolo» (Calvino 1963), è significativo forse proprio in quanto
                ripubblicazione, perché dimostra la capacità di Calvino di
                tenere al centro della propria attenzione due operazioni
                parallele ma distantissime come la raccolta in volume della
                serie cosmicomica, la sua produzione più fresca, realizzata a
                ritmi serrati durante l’anno immediatamente precedente quasi
                senza concessioni ad altre forme, e la raccolta in volume di due
                opere del decennio precedente, rimaste sempre in sospeso per
                l’impossibilità di trovare loro una collocazione certa, non solo
                in termini di genere e di sede editoriale, ma anche e forse
                soprattutto all’interno del percorso dell’autore. I due testi,
                infatti, sospesi appena oltre la soglia del racconto lungo,
                appartengono a quella tonalità, minoritaria in Calvino, che
                tenta di recuperare atmosfere e situazioni dalla tradizione del
                realismo modernista per dipingere un quadro serio della società
                italiana del dopoguerra: una forma non più tenuta a distanza dal
                filtro straniante di un linguaggio volutamente semplice, dai
                tratti infantili, come accadeva ad esempio in{" "}
                <em>Ultimo viene il corvo</em> o nel trittico dell’{" "}
                <em>Entrata in guerra</em>, ma affrontata in modo diretto,
                disilluso, “adulto”. Una modalità che riunisce una piccola
                famiglia di titoli tutto sommato non incospicua, alla quale si
                possono ricondurre anche <em>La speculazione edilizia</em> e{" "}
                <em>La giornata d’uno scrutatore</em>, le avventure irrisolte
                degli <em>Amori difficili</em>, e almeno in parte
                <em>I Racconti</em>, e con la quale tuttavia l’autore non sembra
                essere del tutto a suo agio. Lo si può forse intravedere nello
                stile eccentrico della lettera di “non-difesa” scritta in
                risposta a un saggio che analizzava proprio la{" "}
                <em>Nuvola di smog</em>, nella quale Calvino finge di
                interpretare il critico di se stesso e proclama il proprio
                «moravismo» (Calvino 1964, 104; la <em>Nuvola</em> era del resto
                uscita su «Nuovi argomenti», la rivista diretta da Moravia), in
                un gioco delle parti che però lascia qualcosa di ambiguo alla
                dichiarazione, un sospetto di insicurezza poetica sul valore di
                questo formato del «grigiore».
              </p>
            </Trans>
          </div>
          <div className={SheetStyles.gridRow}>
            <h2 className={SheetStyles.titleH2}>
              {this.props.t("combining-sheet:Un confronto insolito")}
            </h2>
            <img
              className={SheetStyles.image}
              style={{
                gridColumn: " 1 / span 10",
                top: "calc(var(--navigation-height)",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                backgroundColor: "var(--white)",
              }}
              src={marimekko}
              alt=""
            />
            <img
              className={SheetStyles.sideLegend}
              style={{
                gridColumn: "12 / span 1",
                top: "calc(var(--navigation-height))",
                paddingTop: "1rem",
                paddingBottom: "1rem",
              }}
              src={legenda_02}
              alt=""
            />
            <Trans
              i18nKey="paragraph-un-confronto-insolito"
              ns="combining-sheet"
              t={this.props.t}
            >
              <p className={SheetStyles.paragraph}>
                Se proviamo a confrontare i due volumi del 1965 rappresentandoli
                in una forma grafica che ne metta in evidenza la struttura, il
                risultato visivo sembra confermare indubbiamente l’impressione
                di lettura che chiunque potrebbe condividere semplicemente
                prendendo in mano i rispettivi testi. Da un lato abbiamo le{" "}
                <em>Cosmicomiche</em>, una sequenza di dodici testi brevi,
                agili, dai ritmi serrati, che sono il trionfo della varietà e
                della fantasia più sfrenata: una raccolta che esibisce una
                mobilità quasi al limite del nevrotico, con rimbalzi continui
                tra inserti metaletterari, segmenti di dinamismo forsennato,
                descrizioni di mondi collocati al di là dello spaziotempo come
                lo conosciamo, peripezie di ampiezza letteralmente “cosmica”
                animate da personaggi che attraversano piani dimensionali
                disparati e sono allo stesso tempo così piccoli da usare atomi
                come biglie e così grandi da cavalcare intere galassie come
                fossero slittini. Dall’altro lato abbiamo un volume asciutto e
                compatto, occupato da due soli testi che si prendono il loro
                tempo e sono legati da corrispondenze tematiche e strutturali
                così forti che, se i due protagonisti non avessero origini
                sociali diverse, si potrebbe pensare di avere davanti due metà
                dello stesso racconto, due episodi della vita di un unico eroe.
                Due «meditazioni sul “male di vivere” e sull’atteggiamento da
                prendere per fronteggiarlo» (Falcetto 1991, 1312) che si mettono
                in perfetta continuità l’una rispetto all’altra e mettono tutti
                i loro contenuti nel segno di un’immobilità obbligata: entrambe
                dominate da un nemico sovraumano che si presenta come mostro
                particellare, soverchiante ma impalpabile, contro il quale è
                impossibile agire; entrambe presentano un protagonista passivo,
                disilluso e stoico, che attraversa una coreografia di personaggi
                a loro volta alle prese con lo stesso male e alla ricerca della
                loro personale soluzione alla vita; in entrambe la mossa
                d’apertura è lo «stabilirsi altrove» (Serra 2006, 141), cioè il
                gesto che mette tutto il racconto sotto il segno dello
                sradicamento, della perdita di ciò che era noto e familiare, del
                passaggio a uno stato di azzeramento e ripartenza totale in cui
                la vita rimane impantanata nella condizione in cui ogni cosa
                deve essere re-incontrata, ri-decifrata, re-imparata. Insomma da
                un lato un’opera di pura molteplicità, leggerezza, esuberanza
                fantastica, con personaggi poco meno che onnipotenti, e
                dall’altro un’opera che è programmaticamente stazionaria, lenta,
                monocorde, abitata da eroi passivi che rinunciano a ogni agency
                quasi per principio. Eppure…
              </p>
            </Trans>
          </div>
          <div className={SheetStyles.gridRow}>
            <h2 className={SheetStyles.titleH2}>
              {this.props.t("combining-sheet:La varietà nascosta")}
            </h2>
            <img
              className={SheetStyles.image}
              style={{
                gridColumn: " 1 / span 10",
                top: "calc(var(--navigation-height)",
                paddingTop: "1rem",
                paddingBottom: "1.5rem",
                backgroundColor: "var(--white)",
              }}
              src={zoom_02}
              alt=""
            />
            <img
              className={SheetStyles.sideLegend}
              style={{
                gridColumn: "12 / span 1",
                top: "calc(var(--navigation-height)",
                paddingTop: "1rem",
                paddingBottom: "1.5rem",
                backgroundColor: "var(--white)",
              }}
              src={legenda_02}
              alt=""
            />
            <Trans
              i18nKey="paragraph-la-verita-nascosta"
              ns="combining-sheet"
              t={this.props.t}
            >
              <p className={SheetStyles.paragraph}>
                Eppure, se proviamo a ricondurre le differenze tra due questi
                volumi antipodali a elementi testuali numerabili, e smontiamo le
                loro rispettive strutture per condurre una più accurata
                autopsia, ecco che la nostra indiscutibile impressione di
                lettura deve confrontarsi con alcune risposte sorprendenti.
                Quando andiamo a cimentarci nell’esercizio pratico di contare le
                “particelle elementari” che compongono i testi raccolti nei due
                libri, dimenticando per un attimo ciò che sappiamo su di loro e
                limitandoci alla ricognizione delle sequenze narrative di base
                che si susseguono nelle storie, veniamo a scoprire che
                l’impressione è tutt’altro che confermata. A conti fatti, le
                <em>Cosmicomiche</em>, nella loro caleidoscopica varietà di mondi e
                situazioni, e il dittico <em>Nuvola-Formica</em>, coppia di monoliti dove
                a regnare sono «il povero, il disadorno, lo squallore, il
                grigiore» (Calvino 1964, 108), in realtà presentano
                sostanzialmente lo stesso numero di sequenze: rispettivamente
                148 e 142. Se poi si va a verificare tra quante categorie sono
                distribuite queste sequenze, scopriamo addirittura che alle 19
                delle <em>Cosmicomiche</em> rispondono le 22 della{" "}
                <em>Nuvola-Formica</em>. Com’è possibile? Come si spiega che
                l’uniforme narrazione senza sorprese del dittico più cupo di
                Calvino abbia la stessa quantità di segmenti narrativi
                dell’atlante cosmicomico e addirittura una varietà di categorie{" "}
                <em>superiore</em> alla raccolta variegata per eccellenza? Dov’è
                il trucco?
              </p>
            </Trans>
          </div>
          <div className={SheetStyles.gridRow}>
            <h2 className={SheetStyles.titleH2}>
              {this.props.t(
                "combining-sheet:Salti di ambito, o il potere dell’assemblaggio strategico"
              )}
            </h2>
            <img
              className={SheetStyles.image}
              style={{
                gridColumn: " 1 / span 10",
                top: "calc(var(--navigation-height)",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                backgroundColor: "var(--white)",
              }}
              src={zoom_03}
              alt=""
            />
            <img
              className={SheetStyles.sideLegend}
              style={{
                gridColumn: "12 / span 1",
                top: "calc(var(--navigation-height)",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                backgroundColor: "var(--white)",
              }}
              src={legenda_03}
              alt=""
            />
            <Trans
              i18nKey="paragraph-salti-di-ambito"
              ns="combining-sheet"
              t={this.props.t}
            >
              <p className={SheetStyles.paragraph}>
                Un trucco è effettivamente in azione, e diventa visibile se
                facciamo un passo indietro e ci posizioniamo a una distanza
                intermedia sia dallo zoom estremo che abbiamo appena
                sperimentato sia dall’approssimativo sguardo d’insieme con cui
                abbiamo iniziato; una collocazione da cui possiamo mettere a
                fuoco non più solo l’effetto complessivo o la quantità
                molecolare delle parti, ma la struttura e le catene connettive
                in cui queste parti si raggruppano. Ed ecco apparire il trucco,
                quello che dimostra davvero l’estensione della padronanza che
                Calvino ha sulle tecniche di composizione e di combinazione: il
                potere di rivelare o nascondere la varietà di un testo non
                modificando il numero delle parti coinvolte, ma calibrandone
                l’effetto attraverso un attento processo di assemblaggio
                strategico. Se riportiamo le categorie ai tre grandi ambiti
                generali di appartenenza in cui può essere sezionato un testo
                narrativo – il piano{" "}
                <span style={{ color: "#FFA500" }}>formale</span> che contiene
                gli elementi metatestuali che si trovano oltre il confine
                diegetico, quello{" "}
                <span style={{ color: "#0AFFB7" }}>interiore</span> che
                raccoglie stati d’animo, sentimenti e condizioni psicologiche
                dei personaggi, e quello
                <span style={{ color: "#5151FC" }}> esteriore</span>, che copre
                gesti, eventi e interazioni che si sviluppano nel mondo del
                racconto – le ragioni delle differenze così spiccate tra i due
                volumi, che risultavano indecifrabili sul piano delle parti
                minime, emergono e iniziano a farsi chiare: a produrre (o
                smorzare) l’effetto di varietà non è il numero delle sequenze,
                ma la frequenza con cui la narrazione compie il salto di piano.
              </p>
              <p className={SheetStyles.paragraph}>
                La manopola che permette a Calvino di partire da due repertori
                di motivi tutto sommato equivalenti e ottenere risultati così
                diversi è nascosta insomma nel fatto che i passaggi tra un
                motivo e l’altro non contato per la loro <em>quantità</em>, ma
                per la loro <em>qualità</em>. Se osserviamo la situazione nel
                dettaglio, possiamo vedere che nelle <em>Cosmicomiche</em> la
                narrazione coinvolge tutti e tre i piani nominati, e passa
                dall’uno all’altro 70 volte; d’altra parte il dittico{" "}
                <em>Nuvola-Formica</em> , a parità di numero di sequenze,
                coinvolge solo due piani (escludendo del tutto quello formale),
                e i passaggi sono 50, un intero quarto dei casi in meno. Che
                cosa significa questo, in pratica? Significa che nel primo caso
                i piani sono frantumati e mischiati, e i confini tra interno
                ed esterno (tanto dei personaggi quanto del testo stesso) sono
                perfettamente permeabili per la voce narrante ondivaga di Qfwfq,
                mentre nel secondo caso le sequenze “parenti” tendono ad
                aggregarsi tra loro, assemblando le particelle iniziali in
                campiture più ampie, uniformi, che diminuiscono l’entropia del
                testo trasmettendo un senso di rallentamento. Il lettore si
                ritrova trattenuto più a lungo in spazi omogenei, in cui
                l’alternanza tra motivi suona piuttosto come una vibrazione
                interna, e gli spazi rispettivi della sfera psicologico-morale e
                dell’«accadere pubblico intersoggettivo» (Szondi 2000, 9)
                restano ben delimitati e riconoscibili. Questo stratagemma
                compositivo, che con una piccola manipolazione quasi invisibile
                riesce a creare un impatto vistosissimo sul risultato, non solo
                dimostra quanto la scrittura calviniana sia effettivamente «un
                puzzle magistrale» (Barthes 2002, 182), ma è anche responsabile
                di una serie di effetti artistici secondari. Uno su tutti, la
                sensazione di profondità dei due racconti realistici, nei quali
                la complessità del mondo, che nelle <em>Cosmicomiche</em> è
                tutta sulla ribalta, interamente accessibile ai personaggi che
                la percorrono in lungo e in largo, è intrappolata in zone
                inagibili e spinta sullo sfondo, ma rimane comunque presente
                come un baluginio sul fondo di uno specchio d’acqua.
              </p>
            </Trans>
          </div>
          <div className={SheetStyles.gridRow}>
            <h2 className={SheetStyles.titleH2}>
              {this.props.t(
                "combining-sheet:Incontrare qualcuno il gusto della serie (quasi) perfetta"
              )}
            </h2>
            <Trans
              i18nKey="paragraph-incontrare-qualcuno"
              ns="combining-sheet"
              t={this.props.t}
            >
              <p className={SheetStyles.paragraph}>
                Il potere di una strategica pianificazione strutturale degli
                elementi narrativi non è rilevante solo sul piano dell’analisi
                comparata tra due testi: uno sguardo attento sulle scelte fatte
                da Calvino nel distribuire i suoi materiali può rivelarci
                dettagli illuminanti su come viene costruito l’equilibrio
                interno di una storia. Un esempio è la funzione dell’<em>incontro</em>
                come meccanismo di dissimulazione della complessità. Sia nella{" "}
                <em>Nuvola di smog</em> che nella <em>Formica argentina</em>,
                l’ossatura fondamentale del testo è basata sulla stessa
                dinamica: «un protagonista che parla in prima persona ma non ha
                nome né volto si muove tra uno stuolo di personaggi minori
                ognuno dei quali ha un suo modo di contrapporsi alle formiche o
                allo smog» (Falcetto 1991, 1313), con un formato che riprende,
                da un lato, il modello dantesco del viaggio nell’oltretomba
                popolato da anime-
                <em>exempla</em>, e dall’altro la forma del{" "}
                <em>Bildungsroman</em> goethiano, in cui l’eroe è avviato a un
                percorso di crescita la cui riuscita dipende dall’insegnamento
                che sa estrarre dai personaggi che incrocia. Ma nelle pieghe di
                questa modalità a prima vista elementare, che scandisce il testo
                in pochi lunghi blocchi ricorrenti, si annida un intero
                repertorio di situazioni, sentimenti, scoperte, incontri negli
                incontri: l’interazione con un altro individuo non è soltanto
                una delle occasioni che possono darsi nella vicenda dei
                protagonisti, ma un momento di innesco che moltiplica gli eventi
                narrativi pur tenendoli tutti al suo interno. Una tattica su cui
                Calvino è capace di costruire un effetto nell’effetto, come
                succede nella seconda parte della <em>Formica</em>, dove
                esibisce un gusto combinatorio già molto simile per sensibilità
                alle opere “<em>oulipienne</em>” degli anni Settanta. In queste
                pagine, infatti, vediamo ben tre esempi consecutivi di “serie
                perfette”, o quasi, vale a dire tre casi in cui la narrazione
                assume una struttura compiutamente modulare e ripete
                intenzionalmente frammenti di se stessa, tutti imperniati
                sull’elemento dell’incontro. Nell’ordine, la prima è una serie
                di due ripetizioni della sequenza
                incontro-iniziativa-speranza-delusione (il protagonista
                interagisce con un personaggio e individua un piano per
                affrontare il problema dell’infestazione, attraversa un momento
                di euforia, e poi perde fiducia e sprofonda nell’angoscia per il
                probabile insuccesso); la seconda è una serie di tre ripetizioni
                della sequenza incontro-delusione (il protagonista cerca di
                consultarsi con un altro personaggio ma l’incomunicabilità e il
                contatto fallito lo gettano in uno stato di depressione); e
                infine la terza è di nuovo una serie di due ripetizioni, ma
                stavolta con una variazione: incontro-iniziativa-delusione e
                incontro-iniziativa-
                <em>visione</em>, con la ricercata rottura dello schema che
                acutizza il senso di disperazione dell’eroe ormai vicino al
                punto di rottura. Non si tratta ovviamente solo di un piccolo
                gioco nascosto dall’autore dietro le quinte della storia:
                l’effetto di ripetizione è integrale alla rappresentazione del
                pessimismo incombente del racconto, che moltiplica gli sforzi
                degli individui perseguitati dalle formiche per sottolineare
                ancora più nettamente la loro inutilità. Ma è anche funzionale a
                rivelare la lucidità disillusa del protagonista. Se infatti un
                singolo incontro, con una singola raccomandazione strategica,
                potrebbe costituire un punto di speranza, tenacia, e di sfida
                all’universo, facendo apparire la tendenza del protagonista allo
                scoraggiamento come un tratto di debolezza, la girandola degli
                incontri e dei suggerimenti disparati trasmette immediatamente
                la sensazione di una vuota illusione e di un disperato
                attaccamento a qualche menzogna consolatoria, di fronte alla
                quale il realismo stoico e disincantato del protagonista, che
                tenta tutto senza convinzione, rimane a campeggiare come l’unica
                disposizione d’animo condivisibile: la dignitosa
                rassegnazione alla presenza del male nell’universo e il coraggio
                della realtà.
              </p>
            </Trans>
            <img
              className={SheetStyles.image}
              style={{
                gridColumn: "8 / span 4",
                position: "sticky",
                top: "calc(var(--navigation-height)",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                backgroundColor: "var(--white)",
              }}
              src={zoom_04}
              alt=""
            />
            <img
              className={SheetStyles.sideLegend}
              style={{
                gridColumn: "12 / span 1",
                position: "sticky",
                top: "calc(var(--navigation-height)",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                backgroundColor: "var(--white)",
              }}
              src={legenda_04}
              alt=""
            />
          </div>
          <div className={SheetStyles.gridRow}>
            <h2 className={SheetStyles.titleH2}>
              {this.props.t("bibliografia")}
            </h2>
            <p className={SheetStyles.paragraph}>
              <ol className={[SheetStyles.paragraph, "references"].join(" ")}>
                <li className="referenceItem">
                  Barthes 2002: Roland Barthes, <em>Saggi critici</em>, ed. it.
                  a cura di G. Marrone, Torino, Einaudi.
                </li>
                <li className="referenceItem">
                  Calvino 1963: Italo Calvino, <em>La speculazione edilizia</em>
                  , Torino, Einaudi, risvolto di copertina anonimo ma
                  attribuibile all’autore.
                </li>
                <li className="referenceItem">
                  Calvino 1964: Italo Calvino, <em>Lettera a Mario Boselli</em>,
                  in «Nuova corrente», 32-33, pp. 102-110.
                </li>
                <li className="referenceItem">
                  Calvino 1973: Italo Calvino, <em>Nota [1973]</em>, in Id.,{" "}
                  <em>Il castello dei destini incrociati</em>, <em>RR</em>, II.
                </li>
                <li className="referenceItem">
                  Donnarumma 2008: Raffaele Donnarumma,{" "}
                  <em>Da lontano. Calvino, la semiologia, lo strutturalismo</em>
                  , Palermo, Palumbo.
                </li>
                <li className="referenceItem">
                  Falcetto 1991: Bruno Falcetto, <em>«La formica argentina»</em>
                  , in <em>Note e notizie sui testi</em>, a cura di M. Barenghi, B.
                  Falcetto, C. Milanini, <em>RR</em>, I, pp. 1312-1315.
                </li>
                <li className="referenceItem">
                  Serra 2006: Francesca Serra, <em>Calvino</em>, Roma, Salerno.
                </li>
                <li className="referenceItem">
                  Szondi 2000: Peter Szondi,{" "}
                  <em>Teoria del dramma moderno (1880-1950)</em>, trad. it. di
                  G.L., Torino, Einaudi.
                </li>
              </ol>
            </p>
          </div>
          <FooterSchede2
            linkTappaA={"/form/phase1"}
            linkTappaB={"/form/phase3"}
            linkAnalisi={"/form/phase2"}
          />
          ;
        </main>
      </>
    );
  }
}

export default withTranslation(["translation", "combining-sheet"])(
  CombineInformationSheet
);
