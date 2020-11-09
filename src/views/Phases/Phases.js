import React from "react"
import { withTranslation, Trans } from "react-i18next"
import HamburgerCompassHeader from "../../headers/HamburgerCompassHeader/HamburgerCompassHeader"
import { ReactComponent as DubbioIcon } from "../IndexMenu/icons/dubitare_blue.svg"
import { ReactComponent as NebbiaIcon } from "../IndexMenu/icons/nebbia_blue.svg"
import { ReactComponent as CancellazioneIcon } from "../IndexMenu/icons/cancellazione_blue.svg"
import { ReactComponent as TrasformareIcon } from "../IndexMenu/icons/trasformare_blue.svg"
import { ReactComponent as LuoghiIcon } from "../IndexMenu/icons/luoghi_blue.svg"
import { ReactComponent as RealismoIcon } from "../IndexMenu/icons/realismo_blue.svg"
import { ReactComponent as ElenchiIcon } from "../IndexMenu/icons/elenchi_blue.svg"
import { ReactComponent as CombinareIcon } from "../IndexMenu/icons/combinare_blue.svg"
import { ReactComponent as TramaIcon } from "../IndexMenu/icons/trama_blue.svg"
import { Link } from "react-router-dom"

import "./Phases.css"
import "../../App.css"
import Footer from "../../headers/Footer/Footer"

class Phases extends React.Component {
  render() {
    return (
      <>
        <HamburgerCompassHeader />
        <div id="phenomena" className="phenomena-intro-grid">
          <div className="currentPhase">
            <div className="subheaders-container">
              <strong className="current-phase-subheader">
                {this.props.t("TAPPA 1")}
              </strong>
            </div>
            <Trans i18nKey={"il_fenomeno"} t={this.props.t} ns="phases">
              <div>
                <h1>Il fenomeno</h1>
                <p className="text-dark-blue">
                  Per la prima tappa, quella dei fenomeni, abbiamo deciso di
                  disegnare un territorio comune che i tre itinerari ci faranno
                  esplorare. Il territorio è formato dal corpus di tutte le
                  opere di Calvino, che ci sforziamo di riunire in una forma
                  visiva che possa aiutarci a meglio comprenderle.
                </p>
                <Link to="/archipelago">
                  <button type="button" className="button-text">
                    ESPLORARE L'OPERA
                  </button>
                </Link>
              </div>
            </Trans>
          </div>
          <div className="itineraries-subgrid">
            <div className="row">
              <div className="col-md-4">
                <div className="mt-4 d-flex flex-column align-items-center">
                  <Link to="/doubt/phase1">
                    <NebbiaIcon height="100" />
                  </Link>
                  <div className="mt-3 itineraries-small-text font-weight-bold">
                    <span className="text-uppercase">
                      {this.props.t("tappa")}
                    </span>
                    <Link
                      className="ml-1 number-tappa link-tappa"
                      to="/doubt/phase1"
                    >
                      1
                    </Link>
                    <span className="ml-1 text-uppercase">
                      {this.props.t("nebbia")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <h2>{this.props.t("nebbia")}</h2>
                <Trans i18nKey={"testo_nebbia"} t={this.props.t} ns="phases">
                  <p>
                    All’inizio c’è la nebbia. Una fitta nebbia, dove il
                    territorio si cancella e il suo significato ci sfugge. La
                    nebbia è uno dei grandi fenomeni della scrittura calviniana,
                    per questo abbiamo scelto di cominciare da qui.
                  </p>
                </Trans>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="mt-4 d-flex flex-column align-items-center">
                  <Link to="/space/phase1">
                    <LuoghiIcon height="100" />
                  </Link>
                  <div className="mt-3 itineraries-small-text font-weight-bold">
                    <span className="text-uppercase">
                      {this.props.t("tappa")}
                    </span>
                    <Link
                      to="/space/phase1"
                      className="ml-1 number-tappa link-tappa"
                    >
                      1
                    </Link>
                    <span className="ml-1 text-uppercase">
                      {this.props.t("luoghi")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <h2>{this.props.t("luoghi")}</h2>
                <Trans i18nKey={"testo_luoghi"} t={this.props.t} ns="phases">
                  <p>
                    I luoghi sono l’appiglio, incerto ma fondamentale, per
                    connettere il visibile all’invisibile. Il corporeo
                    all’incorporeo. Niente meglio di un tentativo di vederli
                    tutti insieme ci farà entrare nel cuore di cosa significhi
                    rappresentare il reale.
                  </p>
                </Trans>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="mt-4 d-flex flex-column align-items-center">
                  <Link to="/form/phase1">
                    <ElenchiIcon height="100" />
                  </Link>
                  <div className="mt-3 itineraries-small-text font-weight-bold">
                    <span className="text-uppercase">
                      {this.props.t("tappa")}
                    </span>
                    <Link
                      to="/form/phase1"
                      className="ml-1 number-tappa link-tappa"
                    >
                      1
                    </Link>
                    <span className="ml-1 text-uppercase">
                      {this.props.t("elenchi")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <h2>{this.props.t("elenchi")}</h2>
                <Trans i18nKey={"testo_elenchi"} t={this.props.t} ns="phases">
                  <p>
                    Calvino è sempre stato un maniaco degli elenchi. L’elenco
                    può funzionare come marca di realismo o all’opposto come
                    fuga nell’astrazione. Fa vedere alcune cose, ma se aumenta
                    il suo voltaggio, scivolando nel delirio elencatorio, non fa
                    vedere più nulla.
                  </p>
                </Trans>
              </div>
            </div>
          </div>
        </div>
        <div id="process" className="phenomena-intro-grid">
          <div className="currentPhase">
            <div className="subheaders-container">
              <strong className="current-phase-subheader">
                {this.props.t("TAPPA 2")}
              </strong>
            </div>
            <Trans i18nKey={"il_processo"} t={this.props.t} ns="phases">
              <div>
                <h1>Il processo</h1>
                <p className="text-dark-blue">
                  Con la seconda tappa, che riguarda i processi piuttosto che i
                  fenomeni, ci spostiamo da oggetti di studio puntuali verso
                  alcune azioni che cerchiamo di cogliere con tre verbi
                  all’infinito. Dietro il fenomeno della nebbia andremo alla
                  ricerca di come funziona il processo del dubitare, dietro lo
                  spazio quello del trasformare e dietro gli elenchi quello del
                  combinare.
                </p>
              </div>
            </Trans>
          </div>
          <div className="itineraries-subgrid">
            <div className="row">
              <div className="col-md-4">
                <div className="mt-4 d-flex flex-column align-items-center">
                  <Link to="/doubt/phase2">
                    <DubbioIcon height="100" />
                  </Link>
                  <div className="mt-3 itineraries-small-text font-weight-bold">
                    <span className="text-uppercase">
                      {this.props.t("tappa")}
                    </span>
                    <Link
                      className="ml-1 number-tappa link-tappa"
                      to="/doubt/phase2"
                    >
                      2
                    </Link>
                    <span className="ml-1 text-uppercase">
                      {this.props.t("dubitare")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <h2>{this.props.t("dubitare")}</h2>
                <Trans i18nKey={"testo_dubitare"} t={this.props.t} ns="phases">
                  <p>
                    Dubitare vuol dire creare un testo che si rifiuta di
                    rimanere sempre se stesso. Significa invitare il lettore e
                    la lettrice a entrare dentro una scrittura simile a un campo
                    di mine, che può esplodere in ogni momento.
                  </p>
                </Trans>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="d-flex flex-column align-items-center">
                  <Link to="/space/phase2">
                    <TrasformareIcon height="100" />
                  </Link>
                  <div className="mt-3 itineraries-small-text font-weight-bold">
                    <span className="text-uppercase">
                      {this.props.t("tappa")}
                    </span>
                    <Link
                      to="/space/phase2"
                      className="ml-1 number-tappa link-tappa"
                    >
                      2
                    </Link>
                    <span className="ml-1 text-uppercase">
                      {this.props.t("trasformare")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <h2>{this.props.t("trasformare")}</h2>
                <Trans
                  i18nKey={"testo_trasformare"}
                  t={this.props.t}
                  ns="phases"
                >
                  <p>
                    Trasformare vuol dire affidarsi a uno dei processi
                    fondamentali della scrittura di Calvino: quello della
                    metamorfosi. Dietro tutti i luoghi visitati da Marco Polo,
                    non si nasconde infatti sempre Venezia?
                  </p>
                </Trans>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="d-flex flex-column align-items-center">
                  <Link to="/form/phase2">
                    <CombinareIcon height="100" />
                  </Link>
                  <div className="mt-3 itineraries-small-text font-weight-bold">
                    <span className="text-uppercase">
                      {this.props.t("tappa")}
                    </span>
                    <Link
                      to="/form/phase2"
                      className="ml-1 number-tappa link-tappa"
                    >
                      2
                    </Link>
                    <span className="ml-1 text-uppercase">
                      {this.props.t("combinare")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <h2>{this.props.t("combinare")}</h2>
                <Trans i18nKey={"testo_combinare"} t={this.props.t} ns="phases">
                  <p>
                    Combinare vuole dire mettere in dubbio la linearità della
                    narrazione. A tal punto da tendere a riscrivere, il più
                    delle volte, una stessa trama elementare, basata sulla serie
                    e sulla concatenazione.
                  </p>
                </Trans>
              </div>
            </div>
          </div>
        </div>
        <div id="problem" className="phenomena-intro-grid">
          <div className="currentPhase">
            <div className="subheaders-container">
              <strong className="current-phase-subheader">
                {this.props.t("TAPPA 3")}
              </strong>
            </div>
            <Trans i18nKey={"il_problema"} t={this.props.t} ns="phases">
              <div>
                <h1>Il problema</h1>
                <p className="text-dark-blue">
                  Nella terza tappa cercheremo di inseguire l’ombra dei problemi
                  dietro ai fenomeni e ai processi. Il timore della
                  cancellazione, che nasconde a sua volta quello della cecità e
                  della illeggibilità del testo. Il grande totem del realismo. E
                  infine la tormentosa questione di come si costruisce una
                  trama.
                </p>
              </div>
            </Trans>
          </div>
          <div className="itineraries-subgrid">
            <div className="row">
              <div className="col-md-4">
                <div className="mt-4 d-flex flex-column align-items-center">
                  <Link to="/doubt/phase3">
                    <CancellazioneIcon height="100" />
                  </Link>
                  <div className="mt-3 itineraries-small-text font-weight-bold">
                    <span className="text-uppercase">
                      {this.props.t("tappa")}
                    </span>
                    <Link
                      className="ml-1 number-tappa link-tappa"
                      to="/doubt/phase3"
                    >
                      3
                    </Link>
                    <span className="ml-1 text-uppercase">
                      {this.props.t("cancellazione")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <h2>{this.props.t("cancellazione")}</h2>
                <Trans
                  i18nKey={"testo_cancellazione"}
                  t={this.props.t}
                  ns="phases"
                >
                  <p>
                    Scrivere è un modo per opporsi al vuoto della pagina. Ma
                    anche per accogliere quel vuoto dentro la scrittura, che in
                    Calvino combatte sempre ad armi impari contro la tendenza
                    alla cancellazione del testo e alla scomparsa del suo
                    significato.
                  </p>
                </Trans>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="mt-4 d-flex flex-column align-items-center">
                  <Link to="/space/phase3">
                    <RealismoIcon height="100" />
                  </Link>
                  <div className="mt-3 itineraries-small-text font-weight-bold">
                    <span className="text-uppercase">
                      {this.props.t("tappa")}
                    </span>
                    <Link
                      to="/space/phase3"
                      className="ml-1 number-tappa link-tappa"
                    >
                      3
                    </Link>
                    <span className="ml-1 text-uppercase">
                      {this.props.t("realismo")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <h2>{this.props.t("realismo")}</h2>
                <Trans i18nKey={"testo_realismo"} t={this.props.t} ns="phases">
                  <p>
                    Dopo aver attraversato gli spazi dell’opera di Calvino, il
                    problema della rappresentazione della realtà resta intatto:
                    dopo le infinite metamorfosi alle quali abbiamo assistito,
                    come riconoscere il vero dal falso?
                  </p>
                </Trans>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="d-flex flex-column align-items-center">
                  <Link to="/form/phase3">
                    <TramaIcon height="100" />
                  </Link>
                  <div className="mt-3 itineraries-small-text font-weight-bold">
                    <span className="text-uppercase">
                      {this.props.t("tappa")}
                    </span>
                    <Link
                      to="/form/phase3"
                      className="ml-1 number-tappa link-tappa"
                    >
                      3
                    </Link>
                    <span className="ml-1 text-uppercase">
                      {this.props.t("trama")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <h2>{this.props.t("trama")}</h2>
                <Trans i18nKey={"testo_trama"} t={this.props.t} ns="phases">
                  <p>
                    Senza trame non ci sono narrazioni. Ma le narrazioni possono
                    avere rapporti molto complicati con le trame. Come l’opera
                    di Calvino dimostra in modo esemplare.
                  </p>
                </Trans>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default withTranslation(["translation", "phases"])(Phases)
