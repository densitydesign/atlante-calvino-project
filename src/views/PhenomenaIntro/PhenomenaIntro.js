import React from "react"

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

import "./PhenomenaIntro.css"
import "../../App.css"

export default class PhenomenaIntro extends React.Component {
  render() {
    return (
      <>
        <HamburgerCompassHeader />
        <div className="phenomena-intro-grid">
          <div className="currentPhase">
            <div className="subheaders-container">
              <strong className="current-phase-subheader">TAPPA 1</strong>
            </div>
            <div>
              <h1>Il fenomeno</h1>
              <p className="text-dark-blue">
                Per la prima tappa, quella dei fenomeni, abbiamo deciso di
                disegnare un territorio comune che i tre itinerari ci faranno
                esplorare. Il territorio è formato dal corpus di tutte le opere
                di Calvino, che ci sforziamo di riunire in una forma visiva che
                possa aiutarci a meglio comprenderle.
              </p>
              <Link to="/archipelago">
                <button type="button" className="button-text">
                  ESPLORARE L'OPERA
                </button>
              </Link>
            </div>
          </div>
          <div className="itineraries-subgrid">
            <div className="row">
              <div className="col-md-4">
                <div className="mt-4 d-flex flex-column align-items-center">
                  <NebbiaIcon height="100" />
                  <div className="mt-3 itineraries-small-text font-weight-bold">
                    <span>TAPPA</span>
                    <Link
                      className="ml-1 number-tappa link-tappa"
                      to="/doubt/phase1"
                    >
                      1
                    </Link>
                    <span className="ml-1">NEBBIA</span>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <h2>Nebbia</h2>
                <p>
                  All’inizio c’è la nebbia. Una fitta nebbia, dove il territorio
                  si cancella e il suo significato ci sfugge. La nebbia è uno
                  dei grandi fenomeni della scrittura calviniana, per questo
                  abbiamo scelto di cominciare da qui.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="mt-4 d-flex flex-column align-items-center">
                  <LuoghiIcon height="100" />
                  <div className="mt-3 itineraries-small-text font-weight-bold">
                    <span>TAPPA</span>
                    <Link
                      to="/space/phase1"
                      className="ml-1 number-tappa link-tappa"
                    >
                      1
                    </Link>
                    <span className="ml-1">LUOGHI</span>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <h2>Luoghi</h2>
                <p>
                  I luoghi sono l’appiglio, incerto ma fondamentale, per
                  connettere il visibile all’invisibile. Il corporeo
                  all’incorporeo. Niente meglio di un tentativo di vederli tutti
                  insieme ci farà entrare nel cuore di cosa significhi
                  rappresentare il reale.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="mt-4 d-flex flex-column align-items-center">
                  <ElenchiIcon height="100" />
                  <div className="mt-3 itineraries-small-text font-weight-bold">
                    <span>TAPPA</span>
                    <Link
                      to="/form/phase1"
                      className="ml-1 number-tappa link-tappa"
                    >
                      1
                    </Link>
                    <span className="ml-1">ELENCHI</span>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <h2>Elenchi</h2>
                <p>
                  Calvino è sempre stato un maniaco degli elenchi.
                  L’elenco può funzionare come marca di realismo o all’opposto
                  come fuga nell’astrazione. Fa vedere alcune cose, ma se
                  aumenta il suo voltaggio, scivolando nel delirio elencatorio,
                  non fa vedere più nulla.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="phenomena-intro-grid">
          <div className="currentPhase">
            <div className="subheaders-container">
              <strong className="current-phase-subheader">TAPPA 1</strong>
            </div>
            <div>
              <h1>Il fenomeno</h1>
              <p className="text-dark-blue">
                Per la prima tappa, quella dei fenomeni, abbiamo deciso di
                disegnare un territorio comune che i tre itinerari ci faranno
                esplorare. Il territorio è formato dal corpus di tutte le opere
                di Calvino, che ci sforziamo di riunire in una forma visiva che
                possa aiutarci a meglio comprenderle.
              </p>
              <Link to="/archipelago">
                <button type="button" className="button-text">
                  ESPLORARE L'OPERA
                </button>
              </Link>
            </div>
          </div>
          <div className="itineraries-subgrid">
            <div className="row">
              <div className="col-md-4">
                <div className="mt-4 d-flex flex-column align-items-center">
                  <NebbiaIcon height="100" />
                  <div className="mt-3 itineraries-small-text font-weight-bold">
                    <span>TAPPA</span>
                    <Link
                      className="ml-1 number-tappa link-tappa"
                      to="/doubt/phase1"
                    >
                      1
                    </Link>
                    <span className="ml-1">NEBBIA</span>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <h2>Nebbia</h2>
                <p>
                  All’inizio c’è la nebbia. Una fitta nebbia, dove il territorio
                  si cancella e il suo significato ci sfugge. La nebbia è uno
                  dei grandi fenomeni della scrittura calviniana, per questo
                  abbiamo scelto di cominciare da qui.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="mt-4 d-flex flex-column align-items-center">
                  <LuoghiIcon height="100" />
                  <div className="mt-3 itineraries-small-text font-weight-bold">
                    <span>TAPPA</span>
                    <Link
                      to="/space/phase1"
                      className="ml-1 number-tappa link-tappa"
                    >
                      1
                    </Link>
                    <span className="ml-1">LUOGHI</span>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <h2>Luoghi</h2>
                <p>
                  I luoghi sono l’appiglio, incerto ma fondamentale, per
                  connettere il visibile all’invisibile. Il corporeo
                  all’incorporeo. Niente meglio di un tentativo di vederli tutti
                  insieme ci farà entrare nel cuore di cosa significhi
                  rappresentare il reale.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="mt-4 d-flex flex-column align-items-center">
                  <ElenchiIcon height="100" />
                  <div className="mt-3 itineraries-small-text font-weight-bold">
                    <span>TAPPA</span>
                    <Link
                      to="/form/phase1"
                      className="ml-1 number-tappa link-tappa"
                    >
                      1
                    </Link>
                    <span className="ml-1">ELENCHI</span>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <h2>Elenchi</h2>
                <p>
                  Calvino è sempre stato un maniaco degli elenchi.
                  L’elenco può funzionare come marca di realismo o all’opposto
                  come fuga nell’astrazione. Fa vedere alcune cose, ma se
                  aumenta il suo voltaggio, scivolando nel delirio elencatorio,
                  non fa vedere più nulla.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
