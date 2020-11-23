import React from "react";

import HamburgerCompassHeader from "../../headers/HamburgerCompassHeader/HamburgerCompassHeader";
import FooterSchede1 from "../FooterSchede1";
import SheetStyles from "../SheetStyles.module.css";

import "./SpaceInformationSheet.css";

import inventati from "./infosheet-spazio.svg";
import legenda from "./legend.svg";
import zoom_02 from "./zoom-02.svg";
import zoom_04 from "./zoom-04.svg";
import zoom_05 from "./zoom-05.svg";
import { Trans, withTranslation } from "react-i18next";

class SpaceInformationSheet extends React.Component {
  render() {
    return (
      <>
        <HamburgerCompassHeader />
        <main className={SheetStyles.main}>
          <div className={SheetStyles.gridRow}>
            <h4 className="ac-breadcrumb">
              {this.props.t("TAPPA 1")} {">"} {this.props.t("luoghi")}
            </h4>
            <h1 className={SheetStyles.titleH1}>
              {this.props.t("luoghi-sheet:La forma della geografia inventata")}
            </h1>
          </div>
          <div className={SheetStyles.gridRow}>
            <img
              className={SheetStyles.legend}
              style={{ gridColumn: "1 / span 5" }}
              src={legenda}
              alt=""
            />
            <img
              className={SheetStyles.image100w}
              style={{ gridColumn: "1 / span 12" }}
              src={inventati}
              alt=""
            />
            <div className={SheetStyles.paragraphBig}>
              <Trans
                i18nKey="paragraph-analisi"
                ns={"luoghi-sheet"}
                t={this.props.t}
              >
                <p>
                  La categoria dei{" "}
                  <span style={{ color: "#00C19C" }}>luoghi inventati</span>{" "}
                  riprende una delle quattro categorie ideate da Frank Zipfel
                  nel 2001 e poi concettualizzate da Barbara Piatti nel 2008,
                  sulla base del grado di dipendenza dei luoghi finzionali da
                  quelli geospaziali (Zipfel 2001; Piatti 2008). Per Barbara
                  Piatti gli <em>invented places</em> sono tutti i luoghi
                  inventati creati all’interno di realtà geograficamente
                  familiari (Reuschel-Hurni 2011, 296). Le ambientazioni
                  inventate del corpus si distribuiscono in modo omogeneo nel
                  corso del tempo: la prima occorrenza compare nel 1948 (il
                  paesino di <em>Sant’Alcide </em>
                  <span style={{ color: "#5151fc" }}>
                    <strong>(1)</strong>
                  </span>{" "}
                  in cui è ambientato il racconto <em>Isabella e Fioravanti</em>
                  ); l’ultimo, nel 1982, è <em>Casa Palomar </em>{" "}
                  <span style={{ color: "#5151fc" }}>
                    <strong>(2)</strong>
                  </span>
                  , la dimora cittadina del protagonista dell’ultima raccolta
                  dell’autore.
                  <br />
                  Osservando la visualizzazione, si nota anche come questa
                  distribuzione riguardi tutte le tipologie di opere: i romanzi,
                  i racconti confluiti in raccolta e i testi pubblicati su
                  periodici e poi rimasti inediti. Prendendo singolarmente in
                  esame le tre differenti sezioni si evidenziano tuttavia delle
                  caratteristiche molto diverse. Vediamo quali.{" "}
                </p>
              </Trans>
            </div>
          </div>
          <div className={SheetStyles.gridRow}>
            <h2 className={SheetStyles.titleH2}>
              {this.props.t("luoghi-sheet:I romanzi")}
            </h2>
            <Trans
              i18nKey="paragraph-romanzi"
              ns={"luoghi-sheet"}
              t={this.props.t}
            >
              <div className={SheetStyles.paragraph}>
                <p>
                  La prima sezione, quella dei romanzi, è senza dubbio quella in
                  cui si registra la maggior concentrazione di luoghi inventati,
                  con più della metà delle opere (5 su 10) che presentano almeno
                  un’ambientazione di questo tipo. È noto che la vena
                  immaginifica di Calvino si sviluppi maggiormente nelle opere
                  più estese del corpus, anche in virtù del complesso rapporto
                  dell’autore con il genere del romanzo inteso in senso
                  tradizionale: «Calvino è sempre stato un narratore che non
                  sente il romanzo, che persino ne diffida. Narratore
                  anti-romanzesco: nel senso che la problematica sociale e
                  morale, la scienza della vita quotidiana come
                  microstoriografia, che caratterizzano il romanzo moderno, sono
                  sempre stati fuori del suo orizzonte» (Berardinelli 1991, 39).
                  Si pensi alle storie della <em>Trilogia degli antenati</em>,
                  ambientate tra gli alberi di Ombrosa e i boschi di Terralba.
                  Oppure alle città visionarie e simboliche esplorate da Marco
                  Polo nelle <em>Città invisibili</em>, o ancora, ai luoghi dai
                  nomi impronunciabili – Petkwo, Kudgiwa, Oquedal – in cui si
                  muovono i personaggi di{" "}
                  <em>Se una notte d’inverno un viaggiatore</em>. Il modo in cui
                  queste ambientazioni fantastiche si inseriscono nel tessuto
                  narrativo delle storie merita uno sguardo più attento.
                </p>
              </div>
            </Trans>
          </div>
          <div className={SheetStyles.gridRow} style={{ marginTop: "3rem" }}>
            <div className={SheetStyles.paragraph}>
              
              <Trans
                i18nKey="paragraph-romanzi-2"
                ns={"luoghi-sheet"}
                t={this.props.t}
              >
                <p>
                  Le visualizzazioni del secondo e del terzo livello di analisi
                  mostrano come in molti casi i luoghi d’invenzione
                  intrattengano uno stretto dialogo con quelli reali e
                  riconoscibili. Pensiamo, ad esempio, al{" "}
                  <em>Visconte dimezzato</em>, primo libro della{" "}
                  <em>Trilogia</em>. Il racconto si apre in Boemia, durante la
                  guerra cristiana contro i Turchi, ma la storia principale si
                  sviluppa a Terralba, terra natale del visconte Medardo, il
                  quale, colpito da una palla di cannone ma miracolosamente
                  salvo per metà, fa ritorno a casa. Terralba si trova in Italia
                  e appartiene alla Repubblica di Genova: è dunque all’interno
                  di uno spazio reale e definito che hanno luogo le avventure
                  fantastiche del protagonista.
                </p>
                <br />
                <p>
                  In apparenza questo non accade nel <em>Barone rampante</em>,
                  ambientato nel libero comune di Ombrosa, territorio-mondo del
                  baronetto Cosimo Piovasco di Rondò. Tuttavia, pur senza essere
                  esplicitamente incorniciata all’interno di un luogo
                  localizzabile, anche Ombrosa è in qualche modo legata alla
                  Repubblica di Genova, di cui è comune tributario. Pertanto,
                  seppur in modo meno evidente, anche nel caso del Barone
                  rampante lo spazio fantastico si intreccia a quello storico.
                  <br />
                  <br />
                  Il fatto poi che Terralba e Ombrosa siano in qualche modo
                  riconducibili alla Liguria, terra natale di Calvino, è
                  doppiamente significativo. Nel 1965 lo stesso scrittore, con
                  lo pseudonimo-anagramma di Tonio Cavilla, sottolinea
                  l’importanza del paesaggio ligure sullo sfondo del{" "}
                  <em>Barone rampante</em>: «Il romanzo si svolge in un paese
                  immaginario, Ombrosa, ma ci rendiamo presto conto che questa
                  Ombrosa si trova in un punto imprecisato della Riviera ligure»
                  (<em>RR</em>, III, 1228-29). Evocare il paesaggio ligure, che
                  per Calvino è <em>il</em> paesaggio per eccellenza, assume
                  allora la precisa finalità di riallacciamento lirico con un
                  passato mitizzato, in polemica con le trasformazioni edilizie
                  che avevano deturpato la Liguria del dopoguerra (cfr. ivi,
                  1229).{" "}
                </p>
              </Trans>
            </div>
            <div className={SheetStyles.sideContent}>
              <img
                style={{
                  position: "sticky",
                  top: "calc(var(--navigation-height) +5rem)",
                }}
                src={zoom_05}
                alt=""
              />
            </div>
          </div>

          <div className={SheetStyles.gridRow} style={{ marginTop: "3rem" }}>
            <div className={SheetStyles.paragraph}>
              <Trans
                i18nKey="paragraph-romanzi-3"
                ns={"luoghi-sheet"}
                t={this.props.t}
              >
                <p>
                  Un discorso diverso, ma non così distante, può essere fatto
                  per le <em>Città invisibili</em>, l’opera che raccoglie il
                  maggior numero di ambientazioni fantastiche. Le varie Eufemia,
                  Zora, Despina sembrano così rarefatte che è facile credere di
                  trovarsi infine fuori dal tempo e dallo spazio. Invece, anche
                  in questo caso, Calvino non rinuncia a una cornice storica,
                  poiché tutte e cinquantacinque le città visitate da Marco Polo
                  appartengono allo sterminato impero di Kublai Khan.
                </p>
              </Trans>
            </div>
            <div className={SheetStyles.sideContent}>
              <img
                style={{
                  position: "sticky",
                  top: "calc(var(--navigation-height) + 4rem)",
                }}
                src={zoom_02}
              />
            </div>
          </div>

          <div className={SheetStyles.gridRow}>
            <h2 className={SheetStyles.titleH2}>I racconti</h2>
            <img
              className={SheetStyles.image}
              style={{ gridColumn: "1 / span 8" }}
              src={zoom_04}
            />
            <p className="captionLeft" style={{ gridColumn: "1 / span 7" }}>
              Una selezione di racconti scritti a metà degli anni Cinquanta
            </p>
            <p className={SheetStyles.paragraph}>
              {" "}
              Nella forma breve, sia che si tratti di racconti pubblicati in
              volume sia che si tratti di testi usciti su periodici e poi non
              più raccolti, la diffusione di luoghi inventati è decisamente
              inferiore. Tuttavia, come mostra la visualizzazione, si rilevano
              alcune zone di concentrazione: una, in particolare, più
              interessante delle altre. <br></br>
              Tra la fine del 1953 e l’inizio del 1954, dopo aver pubblicato
              sull’«Unità» di Torino il primo blocco di storie che andranno a
              comporre <em>Marcovaldo</em>, Calvino scrive una serie di testi
              brevi di natura molto diversa, accomunati dall’incedere
              favolistico e dalla presenza di ambientazioni fantastiche. Due di
              questi testi (<em>Un paese disgraziato</em>, 1953;{" "}
              <em>Il generale in biblioteca</em>, 1953) compaiono ancora
              sull’edizione torinese dell’«Unità»; gli altri tre (
              <em>Libertà! Libertà!</em>, 1954; <em>Lo ius primae noctis</em>,
              1954; <em>I mozzatori di nasi</em>, 1954), scritti l’anno
              successivo, sono pubblicati sul settimanale «Il Contemporaneo» in
              una rubrica intitolata <em>I viaggi di Gulliver</em> all’interno
              della quale Calvino raccolse alcuni apologhi politici con
              riferimenti evidenti all’attualità.<br></br>
              Ciò che accomuna tutti questi testi è la presenza di
              un’ambientazione unidimensionale – un generico paese senza nome o
              luoghi d’invenzione come Sant’Alcide, Marzalia, Panduria,
              Cocinindia o Atrabilia – «dedita a una sola cosa, che sottostà a
              una sola regola, che conosce un solo modo d’essere» (Serra 2006,
              322). Nella quasi totalità dei casi questa situazione iniziale
              viene messa a dura prova da un accadimento inatteso, che scombina
              l’ordine delle cose e da cui si ricava spesso un insegnamento o
              una morale.<br></br>
              L’aspetto più interessante di questi racconti scritti a metà degli
              anni Cinquanta è il fatto che sia possibile riconoscere in nuce,
              pertanto in forma acerba e a tratti elementare, alcuni elementi
              fondanti delle <em>Città Invisibili</em>: l’ambientazione
              unidimensionale, la regola o il carattere <em>sui generis</em> che
              connota la città, i nomi dei luoghi esclusivamente femminili.
              <br></br>
              In filigrana si riconosce un percorso organico e continuativo, che
              affonda le radici in un tempo piuttosto remoto e trova il suo
              compimento negli anni Settanta del Novecento.
            </p>
          </div>

          <div className={SheetStyles.gridRow}>
            <h2 className={SheetStyles.titleH2}>
              {this.props.t("bibliografia")}
            </h2>
            <ol className={[SheetStyles.paragraph, "references"].join(" ")}>
              <li className="referenceItem">
                Zipfel 2001: F. Zipfel, Fiktion, Fiktivität,{" "}
                <em>
                  Fiktionalität: Analysen zur Fiktion in der Literatur und zum
                  Fiktionsbegriff in der Literaturwissenschaft
                </em>
                , Berlin, Erich Schmidt Verlag.
              </li>
              <li className="referenceItem">
                Piatti 2008: B. Piatti, <em>Die Geographie der Literatur.</em>{" "}
                Schauplätze, Handlungsräume, Raumphantasien, Göttingen,
                Wallstein.
              </li>
              <li className="referenceItem">
                Reuschel-Hurni 2011: A. Reuschel, L. Hurni,{" "}
                <em>
                  Mapping Literature: Visualisation of Spatial Uncertainty in
                  Fiction
                </em>{" "}
                in «The Cartographic Journal», vol. 48, n. 4, pp. 293-308.
              </li>
              <li className="referenceItem">
                Berardinelli 1991: A. Berardinelli,{" "}
                <em>
                  Calvino moralista. Ovvero restare sani dopo la fine del mondo
                </em>
                , in «Diario», VII, 9, pp. 37-58.
              </li>
              <li className="referenceItem">
                Serra 2006: F. Serra, <em>Calvino</em>, Roma, Salerno.
              </li>
            </ol>
          </div>

          <FooterSchede1
            linkTappaA={"/space/phase2"}
            linkTappaB={"/space/phase3"}
            linkAnalisi={"/space/phase1"}
          />
        </main>
      </>
    );
  }
}

export default withTranslation(["translation", "luoghi-sheet"])(
  SpaceInformationSheet
);
