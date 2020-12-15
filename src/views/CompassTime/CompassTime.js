import React from "react";
import { withTranslation, Trans } from "react-i18next";

import HamburgerCompassHeader from "../../headers/HamburgerCompassHeader/HamburgerCompassHeader";
import CompassTimeSinuousWrapper from "../../visualizations/CompassTimeSinuous/CompassTimeSinuousWrapper";

import "./CompassTime.css";

class CompassTime extends React.Component {
  render() {
    const rhythm = 70;

    return (
      <>
        <HamburgerCompassHeader
          toggleTempoEOpere={this.props.toggleTempoEOpere}
        />
        <div id="main--sinuous">
          <div className="container">
            <h4>{this.props.t("bussola")}</h4>
            <div className="row intro">
              <div className="col-12 col-lg-9">
                <h1>{this.props.t("compass-time:Il tempo e le opere")}</h1>
                <Trans i18nKey={"text"} t={this.props.t} ns="compass-time">
                  <p>
                    La visualizzazione rappresenta gli snodi pi&#xF9; importanti
                    della carriera editoriale di Italo Calvino: le principali
                    opere pubblicate in quarant&#x2019;anni di attivit&#xE0; e
                    le collaborazioni giornalistiche pi&#xF9; durature. Ha una
                    forma sinusoidale che mette in evidenza la scansione
                    temporale in decenni e le differenti direzioni intraprese e
                    sperimentate nel corso del tempo.
                  </p>
                  <p>
                    A ogni volume &#xE8; assegnato un simbolo, che consente da
                    un lato di individuare il genere letterario di appartenenza
                    di ciascuna opera e dall&#x2019;altro di cogliere il
                    rapporto spesso significativo tra generi e decenni.
                  </p>
                  <p className="item-reset-top" data-attribute="reset">
                    Per dare un&#x2019;idea della importante attivit&#xE0; da
                    intellettuale militante portata avanti parallelamente alla
                    pubblicazione dei libri, il percorso mostra anche le tre
                    principali collaborazioni di Calvino con i quotidiani: i
                    circa trecento articoli scritti per
                    &#xAB;l&#x2019;Unit&#xE0;&#xBB;, i settanta per il
                    &#xAB;Corriere della Sera&#xBB; e i centoquaranta per
                    &#xAB;la Repubblica&#xBB;.
                  </p>
                </Trans>
              </div>
              <div className="col-12 col-lg-9 mt-3">
                <Trans
                  i18nKey={"references"}
                  t={this.props.t}
                  ns="compass-time"
                >
                  <p>
                    &#x201C;Il tempo e le opere&#x201D; &#xA9;
                    UNIGE/DensityDesign
                    <br />
                    Visualizzazione realizzata all&#x2019;interno del progetto{" "}
                    <a
                      href="http://atlantecalvino.unige.ch/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Atlante Calvino: letteratura e visualizzazione
                    </a>
                    .
                  </p>
                  <p>
                    <strong>Coordinatrice e coordinatore scientifici</strong>:
                    Francesca Serra, Paolo Ciuccarelli.
                    <br />
                    <strong>Autor*</strong>: Tommaso Elli, Margherita Parigini,
                    Virginia Giustetto, Valeria Cavalloro.
                  </p>
                </Trans>
              </div>
            </div>
          </div>

          <div style={{margin:'0 4em 0 4em'}}>
            <div className="row">
              <div
                className="col-lg-8 col-xl-8"
                id="visualisation-container"
              >
                <CompassTimeSinuousWrapper />
              </div>
              <div className="col-10 offset-lg-0 col-lg-4 col-xl-4 scrollytelling-container">
                <h4>
                  {this.props.t(
                    "compass-time:Come si legge la visualizzazione"
                  )}
                  :
                </h4>
                <div className="legend open">
                  <div className="legend-content">
                    <h4>{this.props.t("legenda")}</h4>
                    <h2>{this.props.t("compass-time:Opere")}</h2>
                    <div className="legend-item">
                      <div
                        className="legend-circle"
                        style={{
                          backgroundImage:
                            "url(" +
                            process.env.PUBLIC_URL +
                            "/CompassTime/glifi-01.svg)",
                            border:'1px solid #5151fc'
                        }}
                      ></div>
                      <h6>{this.props.t("compass-time:Romanzo")}</h6>
                    </div>
                    <div className="legend-item">
                      <div
                        className="legend-circle"
                        style={{
                          backgroundImage:
                            "url(" +
                            process.env.PUBLIC_URL +
                            "/CompassTime/glifi-02.svg)",
                            border:'1px solid #8ae297'
                        }}
                      ></div>
                      <h6>
                        <Trans
                          i18nKey={"romanzo-di-racconti"}
                          t={this.props.t}
                          ns="compass-time"
                        >
                          Romanzo di racconti
                          <br />
                          dentro una cornice
                        </Trans>
                      </h6>
                    </div>
                    <div className="legend-item">
                      <div
                        className="legend-circle"
                        style={{
                          backgroundImage:
                            "url(" +
                            process.env.PUBLIC_URL +
                            "/CompassTime/glifi-03.svg)",
                            border:'1px solid #FF3366'}}
                      ></div>
                      <h6>
                        <Trans
                          i18nKey={"raccolta-di-racconti"}
                          t={this.props.t}
                          ns="compass-time"
                        >
                          Raccolta
                          <br />
                          di racconti
                        </Trans>
                      </h6>
                    </div>
                    <div className="legend-item">
                      <div
                        className="legend-circle"
                        style={{
                          backgroundImage:
                            "url(" +
                            process.env.PUBLIC_URL +
                            "/CompassTime/glifi-07.svg)",
                            border:'1px solid #6E94F4'
                        }}
                      ></div>
                      <h6>
                        <Trans
                          i18nKey={"raccolta-di-saggi"}
                          t={this.props.t}
                          ns="compass-time"
                        >
                          Raccolta
                          <br />
                          di saggi
                        </Trans>
                      </h6>
                    </div>
                    <div className="legend-item">
                      <div
                        className="legend-circle"
                        style={{
                          backgroundImage:
                            "url(" +
                            process.env.PUBLIC_URL +
                            "/CompassTime/glifi-05.svg)",
                            border:'1px solid #F2CA22'
                        }}
                      ></div>
                      <h6>
                        <Trans
                          i18nKey={"forma-ibrida-tra-romanzo"}
                          t={this.props.t}
                          ns="compass-time"
                        >
                          Forma ibrida tra romanzo
                          <br />
                          breve e racconto lungo
                        </Trans>
                      </h6>
                    </div>
                    <div className="legend-item">
                      <div
                        className="legend-circle"
                        style={{
                          backgroundImage:
                            "url(" +
                            process.env.PUBLIC_URL +
                            "/CompassTime/glifi-06.svg)",
                            border:'1px solid #C890F4'
                        }}
                      ></div>
                      <h6>{this.props.t("compass-time:Riscrittura")}</h6>
                    </div>
                    <div className="legend-item">
                      <div
                        className="legend-circle"
                        style={{
                          backgroundImage:
                            "url(" +
                            process.env.PUBLIC_URL +
                            "/CompassTime/glifi-08.svg)",
                            
                        }}
                      ></div>
                      <h6>
                        <Trans
                          i18nKey={"progetto-incompiuto"}
                          t={this.props.t}
                          ns="compass-time"
                        >
                          Progetto
                          <br />
                          incompiuto
                        </Trans>
                      </h6>
                    </div>
                    <div className="legend-item">
                      <div
                        className="legend-circle"
                        style={{
                          backgroundImage:
                            "url(" +
                            process.env.PUBLIC_URL +
                            "/CompassTime/glifi-04.svg)",
                            border:'1px solid #FFA500'
                        }}
                      ></div>
                      <h6>
                        <Trans
                          i18nKey={"raccolta-di-racconti-unico"}
                          t={this.props.t}
                          ns="compass-time"
                        >
                          Raccolta di racconti
                          <br />
                          con un unico protagonista
                        </Trans>
                      </h6>
                    </div>
                    <div className="legend-item">
                      <div
                        className="legend-circle"
                        style={{
                          backgroundImage:
                            "url(" +
                            process.env.PUBLIC_URL +
                            "/CompassTime/glifi-09.svg)",
                            
                        }}
                      ></div>
                      <h6>
                        <Trans
                          i18nKey={"opera-fallita"}
                          t={this.props.t}
                          ns="compass-time"
                        >
                          Opera fallita
                          <br />o non pubblicata
                        </Trans>
                      </h6>
                    </div>
                    <h2 style={{ marginTop:'2.5em'}}>{this.props.t("compass-time:Quotidiani")}</h2>
                    <div className="legend-item">
                      <div
                        className="legend-article-circle lgnd narrative"
                        style={{ backgroundColor: "var(--c-unita)" }}
                      ></div>
                      <div
                        className="legend-article-circle lgnd"
                        style={{ borderColor: "var(--c-unita)" }}
                      ></div>
                      <h6>
                        <Trans
                          i18nKey={"unita"}
                          t={this.props.t}
                          ns="compass-time"
                        >
                          l&#x27;Unit&#xE0;
                        </Trans>
                      </h6>
                    </div>
                    <div className="legend-item">
                      <div
                        className="legend-article-circle"
                        style={{ backgroundColor: "var(--c-cds)" }}
                      ></div>
                      <div
                        className="legend-article-circle"
                        style={{ borderColor: "var(--c-cds)" }}
                      ></div>
                      <h6>
                        {this.props.t("compass-time:Corriere della Sera")}
                      </h6>
                    </div>
                    <div className="legend-item">
                      <div
                        className="legend-article-circle"
                        style={{ backgroundColor: "var(--c-repubblica)" }}
                      ></div>
                      <div
                        className="legend-article-circle"
                        style={{ borderColor: "var(--c-repubblica)" }}
                      ></div>
                      <h6>{this.props.t("compass-time:la Repubblica")}</h6>
                    </div>
                    <h2 style={{ marginTop:'2.5em'}}>{this.props.t("compass-time:Prima pubblicazione")}</h2>
                    <div style={{ gridColumn: "span 3", marginTop:'2em' }}>
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/CompassTime/prima-pubblicazione-10.svg"
                        }
                        style={{ width: "60%", margin: "10% 20%" }}
                        alt="information complement"
                      />
                    </div>
                  </div>
                  <div id="legend-button"></div>
                </div>
                <div>
                  <div
                    className="item how-to"
                    data-attribute="reset"
                    style={{ marginTop: rhythm + "vh" }}
                  >
                    <div>
                      <Trans
                        i18nKey={"text-legend"}
                        t={this.props.t}
                        ns="compass-time"
                      >
                        <p className="mb-2">
                          Continua a scorrere verso il basso per conoscere
                          decennio per decennio la carriera di Italo Calvino.
                        </p>
                        <p className="mb-2">
                          Clicca sulle opere per evidenziare il decennio
                          corrispondente.
                        </p>
                        <p className="mb-0">
                          Clicca sullo sfondo bianco per cancellare la
                          selezione.
                        </p>
                      </Trans>
                    </div>
                  </div>
                </div>
                <div
                  className="decade-txt first"
                  style={{ marginTop: rhythm + "vh" }}
                >
                  <div className="item anni40" data-attribute="anni40">
                    <Trans
                      i18nKey={"anni-40"}
                      t={this.props.t}
                      ns="compass-time"
                    >
                      <h2>Anni 40</h2>
                      <p>
                        Italo Calvino esordisce negli{" "}
                        <span className="Xfont-weight-bold">Anni 40</span> prima
                        con un romanzo (
                        <span
                          className="work-title romanzo"
                          data-attribute="V001"
                        >
                          Il sentiero dei nidi di ragno
                        </span>
                        ) poi con una raccolta di racconti (
                        <span
                          className="work-title racconti"
                          data-attribute="V002"
                        >
                          Ultimo viene il corvo
                        </span>
                        ). Quando esce il suo primo libro ha 24 anni, essendo
                        nato il 15 ottobre 1923 a Santiago de Las Vegas. I
                        racconti sono gi&#xE0; usciti prevalentemente su riviste
                        e giornali, soprattutto sulle pagine de
                        &#xAB;l&#x27;Unit&#xE0;&#xBB;, alla quale Calvino
                        collabora dal 1946 al 1955. L&#x27;editore di tutti i
                        suoi principali libri &#xE8; Einaudi, presso il quale
                        Calvino lavora a lungo, prima come redattore poi come
                        dirigente. Tra il 1947 il 1983 Calvino pubblica con
                        Einaudi venticinque libri, vendendo circa quattro
                        milioni di volumi. Si pu&#xF2; dire anzi che li abbia
                        fabbricati fisicamente, curando anche la scelta delle
                        copertine, delle immagini, dei risvolti.
                      </p>
                    </Trans>
                  </div>
                </div>
                <div
                  className="decade-txt"
                  style={{ marginTop: rhythm + "vh" }}
                >
                  <div className="item anni50" data-attribute="anni50">
                    <Trans
                      i18nKey={"anni-50"}
                      t={this.props.t}
                      ns="compass-time"
                    >
                      <h2>Anni 50</h2>
                      <p>
                        Nella prima met&#xE0; degli{" "}
                        <span className="Xfont-weight-bold">Anni 50</span>{" "}
                        pubblica un romanzo breve (
                        <span
                          className="work-title ibrido"
                          data-attribute="V003"
                        >
                          Il visconte dimezzato
                        </span>
                        ) e una raccolta di tre lunghi racconti autobiografici
                        di guerra (
                        <span
                          className="work-title racconti"
                          data-attribute="V004"
                        >
                          L&#x27;entrata in guerra
                        </span>
                        ). Nel frattempo ha lasciato nel cassetto tre romanzi, a
                        testimonianza della difficolt&#xE0; che incontra con
                        tale genere narrativo. Quindi a met&#xE0; degli Anni 50
                        si dedica al lavoro di raccolta e riscrittura delle{" "}
                        <span
                          className="work-title riscritture"
                          data-attribute="V005"
                        >
                          Fiabe italiane
                        </span>
                        , che lo occupa per due anni. Nella seconda met&#xE0;
                        degli Anni 50 pubblica due romanzi (
                        <span
                          className="work-title romanzo"
                          data-attribute="V006"
                        >
                          Il barone rampante
                        </span>{" "}
                        e{" "}
                        <span
                          className="work-title romanzo"
                          data-attribute="V008"
                        >
                          Il cavaliere inesistente
                        </span>
                        , poi riuniti insieme al{" "}
                        <span
                          className="work-title ibrido"
                          data-attribute="V003"
                        >
                          Il visconte dimezzato
                        </span>{" "}
                        nella trilogia dei <i>Nostri antenati</i> del 1960) e
                        una raccolta antologica dei racconti scritti
                        dall&#x27;inizio della sua carriera fino al tempo
                        presente (
                        <span
                          className="work-title racconti"
                          data-attribute="V007"
                        >
                          I racconti
                        </span>
                        ). Divisa in varie sezioni, l&#x27;antologia recupera
                        testi delle prime due raccolte (
                        <span className="font-italic racconti">
                          Ultimo viene il corvo
                        </span>{" "}
                        e{" "}
                        <span className="font-italic racconti">
                          L&#x27;entrata in guerra
                        </span>
                        ) e ne preannuncia di nuove (
                        <span
                          className="font-italic racconti-protagonista"
                          data-attribute="V011"
                        >
                          Marcovaldo
                        </span>{" "}
                        e{" "}
                        <span className="font-italic racconti">
                          Gli amori difficili
                        </span>
                        ). Dall&#x27;inizio della sua carriera fino alla morte
                        Calvino scrive circa 200 racconti.
                      </p>
                    </Trans>
                  </div>
                </div>
                <div
                  className="decade-txt"
                  style={{ marginTop: rhythm + "vh" }}
                >
                  <div className="item anni60" data-attribute="anni60">
                    <Trans
                      i18nKey={"anni-60"}
                      t={this.props.t}
                      ns="compass-time"
                    >
                      <h2>Anni 60</h2>
                      <p>
                        Tra gli Anni 50 e l&#x27;inizio degli{" "}
                        <span className="Xfont-weight-bold">Anni 60</span>{" "}
                        sperimenta vari esempi di forme ibride tra romanzo breve
                        e racconto lungo.{" "}
                        <span
                          className="work-title ibrido"
                          data-attribute="V010"
                        >
                          La speculazione edilizia
                        </span>
                        ,{" "}
                        <span
                          className="work-title ibrido"
                          data-attribute="V012"
                        >
                          La nuvola di smog
                        </span>{" "}
                        e{" "}
                        <span
                          className="work-title ibrido"
                          data-attribute="V012"
                        >
                          La formica argentina
                        </span>
                        , originariamente pubblicati su rivista, vengono
                        riproposti in volume all&#x27;inizio del nuovo decennio.
                        Nel 1963 pubblica un ultimo romanzo breve (
                        <span
                          className="work-title ibrido"
                          data-attribute="V009"
                        >
                          La giornata d&#x27;uno scrutatore
                        </span>
                        ) e riunisce in volume i racconti di{" "}
                        <span
                          className="work-title racconti-protagonista"
                          data-attribute="V011"
                        >
                          Marcovaldo
                        </span>
                        , primo esempio di un sottogenere che avr&#xE0; molta
                        fortuna nella sua opera: la raccolta di racconti con un
                        unico protagonista. La seconda met&#xE0; degli anni 60
                        &#xE8; segnata dall&#x2019;invenzione della serie di
                        racconti delle Cosmicomiche, che vengono raccolti in due
                        libri (
                        <span
                          className="work-title racconti-protagonista"
                          data-attribute="V013"
                        >
                          Le cosmicomiche
                        </span>{" "}
                        e{" "}
                        <span
                          className="work-title racconti-protagonista"
                          data-attribute="V014"
                        >
                          Ti con zero
                        </span>
                        ), ma lascer&#xE0; strascichi fino al 1984 con il volume{" "}
                        <span className="font-italic racconti-protagonista">
                          Cosmicomiche vecchie e nuove
                        </span>
                        , passando per{" "}
                        <span className="font-italic racconti-protagonista">
                          La memoria del mondo
                        </span>{" "}
                        del 1968. Alla fine degli Anni 60 inaugura un nuovo
                        genere di ibridazioni destinato a imporsi negli Anni 70:
                        il romanzo di racconti racchiusi dentro una cornice (
                        <span
                          className="work-title racconti-cornice"
                          data-attribute="V018"
                        >
                          Il castello dei destini incrociati
                        </span>
                        ).
                      </p>
                    </Trans>
                  </div>
                </div>
                <div
                  className="decade-txt"
                  style={{ marginTop: rhythm + "vh" }}
                >
                  <div className="item anni70" data-attribute="anni70">
                    <Trans
                      i18nKey={"anni-70"}
                      t={this.props.t}
                      ns="compass-time"
                    >
                      <h2>Anni 70</h2>
                      <p>
                        Negli <span className="Xfont-weight-bold">Anni 70</span>{" "}
                        pubblica una raccolta di racconti (
                        <span
                          className="work-title racconti"
                          data-attribute="V016"
                        >
                          Gli amori difficili
                        </span>
                        ) che nasce da una sezione dei{" "}
                        <span className="font-italic racconti">Racconti</span>{" "}
                        del 1958, arricchita di nuovi elementi. Ripropone
                        inoltre presso Einaudi{" "}
                        <span
                          className="work-title riscritture"
                          data-attribute="V015"
                        >
                          l&#x27;Orlando Furioso
                        </span>{" "}
                        <span className="font-italic">
                          di Ludovico Ariosto raccontato da Italo Calvino
                        </span>
                        , assecondando l&#x27;inclinazione alla riscrittura
                        gi&#xE0; praticata con le fiabe. Ma soprattutto continua
                        a dedicarsi alla forma ibrida tra romanzo e raccolta di
                        racconti nei libri maggiori di questo decennio:{" "}
                        <span
                          className="work-title racconti-cornice"
                          data-attribute="V017"
                        >
                          Le citt&#xE0; invisibili
                        </span>{" "}
                        e{" "}
                        <span
                          className="work-title racconti-cornice"
                          data-attribute="V019"
                        >
                          Se una notte d&#x27;inverno un viaggiatore
                        </span>
                        . Come il protagonista di Marcovaldo era nato dieci anni
                        prima la sua pubblicazione in volume sulle pagine de
                        &#xAB;l&#x27;Unit&#xE0;&#xBB; , così il protagonista di{" "}
                        <span className="font-italic racconti-protagonista">
                          Palomar
                        </span>{" "}
                        vede la luce a met&#xE0; degli Anni 70 sulle pagine del
                        &#xAB;Corriere della Sera&#xBB;, a cui Calvino collabora
                        dal 1974 al 1979. A partire dal 1979 passa a &#xAB;la
                        Repubblica&#xBB;, inaugurando l&#x27;ultima importante
                        collaborazione giornalistica.
                      </p>
                    </Trans>
                  </div>
                </div>
                <div
                  className="decade-txt"
                  style={{ marginTop: rhythm + "vh" }}
                >
                  <div className="item anni80" data-attribute="anni80">
                    <Trans
                      i18nKey={"anni-80"}
                      t={this.props.t}
                      ns="compass-time"
                    >
                      <h2>Anni 80</h2>
                      <p>
                        Negli <span className="Xfont-weight-bold">Anni 80</span>{" "}
                        inizia a raccogliere i saggi e gli articoli scritti nel
                        corso del tempo (
                        <span
                          className="work-title saggi"
                          data-attribute="V020"
                        >
                          Una pietra sopra
                        </span>{" "}
                        e
                        <span
                          className="work-title saggi"
                          data-attribute="V022"
                        >
                          Collezione di sabbia
                        </span>
                        ).{" "}
                        <span
                          className="work-title racconti-protagonista"
                          data-attribute="V021"
                        >
                          Palomar
                        </span>{" "}
                        &#xE8; l&#x27;ultimo volume narrativo e anche
                        l&#x27;ultimo pubblicato nelle edizioni Einaudi, prima
                        del passaggio a Garzanti. Ancora una volta un libro
                        pi&#xF9; simile a una raccolta di racconti che a un
                        romanzo, essendo costituito da una serie di pezzi brevi
                        (gi&#xE0; usciti per lo più sui giornali) con un unico
                        protagonista. Nel frattempo lavora su pi&#xF9; tavoli,
                        progettando una serie di libri che la morte improvvisa
                        lascer&#xE0; incompiuti.
                      </p>
                      <p>
                        Dopo la morte, avvenuta il 19 settembre 1985 a Siena,
                        l&#x27;editore Garzanti pubblica due volumi postumi: una
                        raccolta di racconti (
                        <span className="font-italic">
                          Sotto il sole giaguaro
                        </span>
                        ) e i saggi delle{" "}
                        <span className="font-italic">Lezioni americane</span>.
                        Quindi i diritti delle opere passano a Mondadori, che
                        inizia a pubblicare una serie di volumi composti di
                        racconti o articoli che attingono al serbatoio di testi
                        sparsi che Calvino non aveva personalmente raccolto.
                      </p>
                    </Trans>
                  </div>
                </div>
                <div
                  className="decade-txt"
                  style={{ marginTop: rhythm + "vh" }}
                >
                  <div className="item anni90" data-attribute="anni90">
                    <Trans
                      i18nKey={"anni-90"}
                      t={this.props.t}
                      ns="compass-time"
                    >
                      <h2>Anni 90</h2>
                      <p>
                        Nel corso degli{" "}
                        <span className="Xfont-weight-bold">Anni 90</span>{" "}
                        l&#x27;intera opera di Calvino viene proposta nella
                        collana de{" "}
                        <span className="work-title postumi">I Meridiani</span>{" "}
                        di Mondadori, con un ricco apparato di note ai testi.
                        Saranno otto alla fine i volumi che canonizzano Calvino
                        come uno dei grandi classici della letteratura
                        contemporanea (3 di{" "}
                        <span className="font-italic">Romanzi e racconti</span>,
                        1 di <span className="font-italic">Fiabe</span>, 2 di{" "}
                        <span className="font-italic">Saggi</span>, 1 di{" "}
                        <span className="font-italic">Lettere</span> e un{" "}
                        <span className="font-italic">Album Calvino</span>,
                        ricostruzione biografico-fotografica della sua carriera
                        letteraria).
                      </p>
                    </Trans>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withTranslation(["translation", "compass-time"])(CompassTime);
