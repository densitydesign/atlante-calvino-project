import React from "react"

import HamburgerCompassHeader from "../../headers/HamburgerCompassHeader/HamburgerCompassHeader"
import ListTypePerTextWrapper from "../../visualizations/ListTypesPerText/ListTypesPerTextWrapper"
import FooterSchede1 from "../FooterSchede1"
import "./ShapeInformationSheet.css"
import SheetStyles from "../SheetStyles.module.css"

import legenda from "./legenda.svg"
import zoom_01 from "./zoom-01.svg"
import zoom_02 from "./zoom-02.svg"
import zoom_03 from "./zoom-03.svg"
import zoom_04 from "./zoom-04.svg"
import legendaEn from "./elenchi_legend_en.svg"
import zoom_01En from "./elenchi_zoom-01_en.svg"
import zoom_02En from "./elenchi_zoom-02_en.svg"
import zoom_03En from "./elenchi_zoom-03_en.svg"
import zoom_04En from "./elenchi_zoom-04_en.svg"
import { Trans, withTranslation } from "react-i18next"

class ShapeInformationSheet extends React.Component {
  render() {
    return (
      <>
        <HamburgerCompassHeader />
        <main className={SheetStyles.main}>
          <div className={SheetStyles.gridRow}>
            <h4 className="ac-breadcrumb">
              {this.props.t("TAPPA 1")} {">"} {this.props.t("elenchi")}
            </h4>
            <h1 className={SheetStyles.titleH1}>
              {this.props.t("elenchi-sheet:Per un'estetica elencatoria")}
            </h1>
          </div>
          <div className={SheetStyles.gridRow}>
            <img
              className={SheetStyles.legend}
              style={{ gridColumn: "1 / span 12" }}
              src={this.props.i18n.language === "it" ? legenda : legendaEn}
              alt=""
            />
          </div>

          <div id="mainviz" className={SheetStyles.gridRow}>
            <ListTypePerTextWrapper />
          </div>

          <div className={SheetStyles.gridRow}>
            <h2 className={SheetStyles.titleH2}>
              {" "}
              {this.props.t("elenchi-sheet:I picchi")} (1945, 1951, 1962, 1966,
              1972)
            </h2>
            <Trans
              i18nKey="paragraph-picchi"
              ns="elenchi-sheet"
              t={this.props.t}
            >
              <p className={SheetStyles.paragraph}>
                Sono tutti anni in cui Calvino pubblica pochi titoli: nel 1945
                solo <em>Angoscia in caserma</em>, nel 1951 solo{" "}
                <em>Il reggimento smarrito</em> e{" "}
                <em>L’avventura di una bagnante</em>, nel 1962 solo{" "}
                <em>La strada di San Giovanni</em>, nel 1966 solo{" "}
                <em>Ti con zero</em>, nel 1972 solo <em>Il nome, il naso</em> e{" "}
                <em>Le città invisibili</em>. Tutti i testi in questione sono
                composti negli anni della rispettiva pubblicazione, tranne{" "}
                <em>La strada</em> e {" "}<em>Le città</em>, che cominciano a essere scritti
                rispettivamente a partire dal 1960 e dal 1970, in periodi in cui
                le pubblicazioni si diradano. Il risultato sembra suggerire una
                forma di correlazione tra la rarefazione del numero di testi e
                un uso più intenso degli elenchi, come se l’espansione
                orizzontale ed enumerativa della scrittura fosse legata al
                ridursi della varietà di storie elaborate.
              </p>
            </Trans>
            <h2 className={SheetStyles.titleH2}>
              {" "}
              {this.props.t("elenchi-sheet:Il picco 1945")}
            </h2>
            <Trans
              i18nKey="paragraph-picco-1945"
              ns="elenchi-sheet"
              t={this.props.t}
            >
              <p className={SheetStyles.paragraph}>
                Nella tradizione letteraria occidentale l’andamento enumerativo
                è il procedimento retorico che si oppone alla peripezia, e che
                con la sua presenza «ostacola, rallenta o differisce il
                resoconto delle vicende» e «mette in dubbio la possibilità
                stessa di organizzare gerarchicamente gli eventi di una vita in
                forma unitaria» (Inglese 2012, 80). Risulta quindi molto
                interessante che il picco più alto del grafico corrisponda al
                1945, anno in cui Calvino pubblica un solo racconto:{" "}
                <em>Angoscia in caserma</em>. Il testo in questione, infatti, è
                composto dalle riflessioni di un partigiano che, durante
                un’esperienza di prigionia, viene colto dal «male dei simboli» (
                <em>RR</em>, I, 237) vale a dire dall’ossessione di vedere
                oscuri segnali premonitori in tutti i singoli dettagli
                dell’ambiente circostante, che vengono isolati dal contesto e
                riempiti di un eccesso di significato che finisce per cancellare
                la loro interpretabilità di primo grado, fino a renderli
                irriconoscibili. Ne deriva l’effetto generale di una realtà
                sgretolata in minuscole monadi, che è impossibile ricomporre in
                uno schema organico e che quindi inibisce la capacità del
                personaggio di intraprendere un’azione e quindi di generare una
                vicenda.
              </p>
            </Trans>
            <div className={SheetStyles.sideContent}>
              <img
                style={{
                  position: "sticky",
                  top: "calc(var(--navigation-height) + 1rem)",
                }}
                src={this.props.i18n.language === "it" ? zoom_01 : zoom_01En}
                alt=""
              />
            </div>

            <h2 className={SheetStyles.titleH2}>
              {" "}
              {this.props.t("elenchi-sheet:Parole 1965")}
            </h2>
            <Trans
              i18nKey="paragraph-parole"
              ns="elenchi-sheet"
              t={this.props.t}
            >
              <p className={SheetStyles.paragraph}>
                Tra le variazioni diacroniche che interessano le proporzioni tra
                le diverse tipologie elencatorie usate da Calvino, spicca nel
                1965 una presenza particolarmente alta di elenchi di singole{" "}
                <span style={{ color: "#00c19c" }}>parole</span>. Questa
                modalità, che nello spettro della figura retorica
                dell’enumerazione coincide pienamente con il polo dell’
                <em>accumulatio</em> (Marchese 1991, s.v.) erode ogni residuo di
                complessità sintattica riducendo gli elementi della serie a
                unità grammaticali di base, e quindi porta sulla pagina il
                massimo effetto di frammentazione e caos. Nella storia
                letteraria occidentale, proprio questo particolare tipo di
                elenco subisce un ribaltamento totale di significato a partire
                dal XVI secolo, quando le forme simboliche medievali cominciano
                a trasformarsi nell’estetica della modernità: l’accumulazione
                passa dal rappresentare un omaggio all’organicità divina del
                creato (Dio possiede il catalogo dell’universo e il primo
                privilegio che assegna ad Adamo è non a caso quello di dare un
                nome agli animali dell’Eden) al configurare un mondo abbandonato
                dall’ordine divino, in cui «le cose divengono autonome e
                iniziano ad accalcarsi intorno all’uomo, mischiandosi con le
                creature, con l’uomo stesso, con i suoi utensili, le sue idee, i
                sentimenti e perfino le parole» (Spitzer 1991, 123). Un
                passaggio che genera la tendenza opposta, tipica ad esempio del
                Barocco, per cui «quanto più le cose – e le parole – tendono ad
                emanciparsi, tanto più le forze coercitive aumentano di numero,
                per farle ritornare al corrispondente stato naturale» (ivi,
                109). Diventa allora interessante notare che il 1965 è l’anno
                che Calvino dedica interamente a costruire la galassia delle
                “storie cosmicomiche” (scrive 8 dei 12 testi del volume{" "}
                <em>Le cosmicomiche</em>, uscito l’anno stesso, e 3 dei testi
                che confluiranno nella raccolta sorella{" "}
                <em>La memoria del mondo</em> del 1968): testi in cui una
                fortissima cornice concettuale, ancorata direttamente alle
                scienze dure, viene usata per imbrigliare storie dominate da
                eventi dispersivi e forze centrifughe, presenti sia sul piano
                dei contenuti sia su quello della forma. Non è un caso che
                simili incrementi nell’uso di questa modalità elencatoria
                corrispondano a due opere che condividono questa impostazione:{" "}
                <em>Le città invisibili</em> e <em>Palomar</em>.
              </p>
            </Trans>
            <div className={SheetStyles.sideContent}>
              <img
                style={{
                  position: "sticky",
                  top: "calc(var(--navigation-height) + 1rem)",
                }}
                src={this.props.i18n.language === "it" ? zoom_02 : zoom_02En}
                alt=""
              />
            </div>
          </div>

          <div className={SheetStyles.gridRow}>
            <h2 className={SheetStyles.titleH2}>
              {this.props.t("elenchi-sheet:Sintagmi e Proposizioni")}
            </h2>
            <Trans
              i18nKey="paragraph-sintagmi-e-proposizioni"
              ns="elenchi-sheet"
              t={this.props.t}
            >
              <p className={SheetStyles.paragraph}>
                Un dato trasversale all’intero corpus, che colpisce per la
                costanza con cui si mantiene stabile su un’estensione di oltre
                quarant’anni che attraversa generi e stili molto diversi, è la
                netta preferenza di Calvino per una procedura elencatoria che
                coinvolga elementi complessi come{" "}
                <span style={{ color: "#ffa500" }}>sintagmi</span> e addirittura
                intere <span style={{ color: "#5151fc" }}> proposizioni</span>,
                gesto che, in termini retorici, costituisce il polo opposto all’
                <em>accumulatio</em>, vale a dire la <em>distributio</em>: quel
                formato enumerativo in cui la ripetizione non si limita alla
                ripresa di un oggetto grammaticale, ma coinvolge delle porzioni
                di testo anche molto estese, la cui riconoscibilità seriale non
                deriva solo dal piano sintattico ma anche da quello semantico.
              </p>
            </Trans>
          </div>
          <div className={SheetStyles.gridRow}>
            <img
              className={SheetStyles.image100w}
              src={this.props.i18n.language === "it" ? zoom_03 : zoom_03En}
              alt=""
            />
            <br />
            <img
              className={SheetStyles.image100w}
              src={this.props.i18n.language === "it" ? zoom_04 : zoom_04En}
              alt=""
            />
            <Trans
              i18nKey="paragraph-sintagmi-e-preposizioni-2"
              ns="elenchi-sheet"
              t={this.props.t}
            >
              <p className={SheetStyles.paragraph}>
                Questo dato rappresenta bene l’elemento di ambiguità presente
                nella poetica calviniana: nello stesso punto in cui si registra
                la più forte tendenza a far proliferare l’elemento orizzontale
                dell’elenco a discapito dell’elemento verticale
                dell’architettura compositiva, con un gesto che sembrerebbe
                suggerire una volontà di semplificazione e di sfida alla
                struttura classica dell’arco drammatico (Freytag 1990), si
                manifesta anche la massima ricerca di complessità nella
                costruzione delle unità elencate, che in alcuni casi si
                espandono e articolano fin quasi a oscurare la riconoscibilità
                dell’elenco in quanto tale. Ma questi elenchi, e quelli di
                proposizioni in particolare, sono anche un segnale importante
                delle scelte estetiche generali dell’autore, perché cancellando
                i nessi causali a favore della semplice sequenza temporale (in
                cui un evento è raccontato mettendo in fila i singoli momenti
                che lo compongono, come un film che venga mostrato un
                fermo-immagine alla volta) rievocano l’andamento delle cronache
                e degli annali, forme tradizionalmente considerate opposte
                all’arte narrativa perché prive di trama, e in questo modo
                contribuiscono a posizionare Calvino in una lunga tradizione di
                letteratura «non-aristotelica» (Orr 1991) che risale fino a
                Sterne.
              </p>
            </Trans>
          </div>

          <div className={SheetStyles.gridRow}>
            <h2 className={SheetStyles.titleH2}>
              {this.props.t("bibliografia")}
            </h2>
            <p className={SheetStyles.paragraph}>
              <ol className={[SheetStyles.paragraph, "references"].join(" ")}>
                <li className="referenceItem">
                  Freytag 1990: G. Freytag, <em>Technique of the Drama. An
                  Exposition of Dramatic Composition and Art</em>, Chicago, Scott,
                  Foresman & Company.
                </li>
                <li className="referenceItem">
                  Inglese 2012: A. Inglese,{" "}
                  <em>
                    Gli ideali della letteratura moderna e la strategia
                    dell’inventario, in Pro e contro la trama
                  </em>
                  , a cura di W. Nardon e C. Tirinanzi
                  De Medici, Trento, Università degli studi di Trento, pp.
                  77-95.
                </li>
                <li className="referenceItem">
                  Marchese 1991: A. Marchese,{" "}
                  <em>Dizionario di retorica e stilistica</em>, Milano,
                  Mondadori.
                </li>
                <li className="referenceItem">
                  Orr 1991: L. Orr,{" "}
                  <em>Problems and Poetics of the Nonaristotelian Novel</em>,
                  Lewisburg, Bucknell University Press, London and Toronto,
                  Associated University Presses.
                </li>
                <li className="referenceItem">
                  Spitzer 1991: L. Spitzer,{" "}
                  <em>L’enumerazione caotica nella poesia moderna</em>, trad.
                  it. di A. De Benedetto, in «L’Asino d’Oro», 3, II, pp. 92-130.
                </li>
              </ol>
            </p>
          </div>

          <FooterSchede1
            linkTappaA={"/form/phase2"}
            linkTappaB={"/form/phase3"}
            linkAnalisi={"/form/phase1"}
          />
        </main>
      </>
    )
  }
}

export default withTranslation(["translation", "elenchi-sheet"])(
  ShapeInformationSheet
)
