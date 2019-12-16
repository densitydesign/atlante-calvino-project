import React from 'react';
import ParallaxScroll from 'react-scroll-transitions';
import { withRouter } from 'react-router-dom';
import AtlasIntroHeader from '../../headers/AtlasIntroHeader/AtlasIntroHeader';

import '../../App.css';
import './AtlasIntro.css';
import '../HamburgerMenu/HamburgerMenu.css';

class AtlasIntro extends React.Component
{
  constructor(props)
  {
    super(props);

    this.render_impl = this.render_impl.bind(this);

    const headerHeight = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("--header-height");

    // remove the px postfix and parse the value of headerHeight
    const headerHeight_n = Number.parseInt(headerHeight.substring(0, headerHeight.length - 2));

    this.gridHeight = window.innerHeight - headerHeight_n;
  }

  getVisibleItemInitialY() { return 0; }
  getDeltaY() { return this.gridHeight; }
  getInvisibleItemInitialY() { return this.getVisibleItemInitialY() + this.getDeltaY(); }

  phasesUp(id, transitionData)
  {
    return (
      <div>
        <AtlasIntroHeader />

        <div id="scrollableGrid" className="atlas-intro-scrollable">
          <div id="sidebar" className="atlas-intro-sidebar">

            <div className="atlas-intro-sidebar-monoblock" style={{ top: this.getVisibleItemInitialY() - transitionData.percent * this.getDeltaY() }}>
              <h1>Itinerari</h1>
              <br />
              <br />
              <p>Per entrare e muoversi dentro l’opera narrativa di Calvino abbiamo scelto tre itinerari.
              Il primo riguarda il <strong>dubbio</strong>, il secondo lo spazio e il terzo la forma del racconto.
              Sono tre scelte arbitrarie, ma che vanno a toccare alcuni fondamenti della scrittura calviniana,
              invitandoci alla sua esplorazione.</p>
            </div>

            <div className="atlas-intro-sidebar-monoblock" style={{ top: this.getVisibleItemInitialY() - transitionData.percent * this.getDeltaY()}}>
              <h1>Tappe</h1>
              <br />
              <br />
            <p>Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt.
            Franz jagt im komplett verwahrlosten Taxi quer durch Bayern.
            Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich. Vogel Quax zwickt Johnys Pferd Bim.
            Sylvia wagt quick den Jux bei Pforzheim. Polyfon zwitschernd aßen</p>
            </div>

          </div>
{/*
          <div id="rows" className="atlas-intro-row-grid" style={{ top: this.getVisibleItemInitialY() - transitionData.percent * this.getDeltaY()}}>

            <div /> // the empty page, before scrolling
            <div /> // the first, empty row (it's the row of column headers)
            <div className="atlas-intro-table-horizontal-row">Fenomeno</div> // the first table row, and below the others
            <div className="atlas-intro-table-horizontal-row">Processo</div>
            <div className="atlas-intro-table-horizontal-row">Problema</div>

          </div>
*/}


          <div id="rows" className="atlas-intro-scrolling-cell-grid" style={{ top: this.getVisibleItemInitialY() - transitionData.percent * this.getDeltaY()}}>

            <div /><div /><div /><div /> {/* the empty page, before scrolling */}
            <div /><div /><div /><div /> {/* the first, empty row (it's the row of column headers) */}
            <div className="atlas-intro-cell2"><h4>Fenomeno</h4></div><div className="atlas-intro-cell2" /><div className="atlas-intro-cell2" /><div className="atlas-intro-cell2" /> {/* the first table row, and below the others */}
            <div className="atlas-intro-cell2"><h4>Processo</h4></div><div className="atlas-intro-cell2" /><div className="atlas-intro-cell2" /><div className="atlas-intro-cell2" />
            <div className="atlas-intro-cell2"><h4>Problema</h4></div><div className="atlas-intro-cell2" /><div className="atlas-intro-cell2" /><div className="atlas-intro-cell2" />

          </div>

        </div>

        <div id="staticGrid" className="atlas-intro">
          <div />
          <div className="atlas-intro-cell-grid">
            <div className="atlas-intro-cell2"></div>
            <div className="atlas-intro-cell2"><h3>Forma</h3></div>
            <div className="atlas-intro-cell2"><h3>Dubbio</h3></div>
            <div className="atlas-intro-cell2"><h3>Spazio</h3></div>
          </div>
        </div>

      </div>
    );
  }

  compassIntroUp(id, transitionData)
  {
    return (
      <div>
        <AtlasIntroHeader />

        <div id="scrollableGrid" className="atlas-intro-scrollable">
          <div className="atlas-intro-sidebar2" style={{ top: this.getVisibleItemInitialY() - transitionData.percent * this.getDeltaY() }}>

            <div className="atlas-intro-sidebar-monoblock" >
              <h1>Tappe</h1>
              <br />
              <br />
              <p>Ognuno dei tre itinerari si sviluppa in tre tappe.
            <br />La prima tappa cerca di individuare il <strong>fenomeno</strong> di cui stiamo parlando.
              La seconda tappa il <strong>processo</strong> che viene innescato da questo fenomeno.
              La terza tappa l’ombra del <strong>problema</strong> che sta dietro a tutto. </p>
            </div>

            <div className="atlas-intro-sidebar-monoblock compass-selector-cell" >
            <h1>BUSSOLA</h1>
              <br />
              <br />
            </div>

            <div className="atlas-intro-sidebar-monoblock" >
              <p>Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt.
              Franz jagt im komplett verwahrlosten Taxi quer durch Bayern.
              Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich.
              Vogel Quax zwickt Johnys Pferd Bim. Sylvia wagt quick den Jux bei Pforzheim.
              Polyfon zwitschernd aßen. </p>
            </div>

          </div>
        </div>
{/*
        <div id="staticGrid" className="atlas-intro">
          <div/>
          <div className="atlas-intro-cell-grid">
            <div className="atlas-intro-cell"></div>
            <div className="atlas-intro-cell"><h3>Forma</h3></div>
            <div className="atlas-intro-cell"><h3>Dubbio</h3></div>
            <div className="atlas-intro-cell"><h3>Spazio</h3></div>
          </div>
        </div>
*/}

        <div id="staticGrid" className="atlas-intro">
          <div/>
          <div className="atlas-intro-cell-grid2">
            <div className="atlas-intro-cell2"></div>
            <div className="atlas-intro-cell2"><h3>Forma</h3></div>
            <div className="atlas-intro-cell2"><h3>Dubbio</h3></div>
            <div className="atlas-intro-cell2"><h3>Spazio</h3></div>

            <div className="atlas-intro-cell2"><h4>Fenomeno</h4></div>
            <div className="atlas-intro-cell2"></div>
            <div className="atlas-intro-cell2"></div>
            <div className="atlas-intro-cell2"></div>

            <div className="atlas-intro-cell2"><h4>Processo</h4></div>
            <div className="atlas-intro-cell2"></div>
            <div className="atlas-intro-cell2"></div>
            <div className="atlas-intro-cell2"></div>

            <div className="atlas-intro-cell2"><h4>Problema</h4></div>
            <div className="atlas-intro-cell2"></div>
            <div className="atlas-intro-cell2"></div>
            <div className="atlas-intro-cell2"></div>

          </div>
        </div>

{/*
        <div className="hamburger-menu-cell-grid">

          <div className="hamburger-menu-cell"></div>
          <div className="hamburger-menu-cell">Dubbio</div>
          <div className="hamburger-menu-cell">Spazi</div>
          <div className="hamburger-menu-cell">Forma</div>
          <div className="hamburger-menu-cell">Fenomeno</div>
          <div className="hamburger-menu-cell">Dubbio</div>
          <div className="hamburger-menu-cell">Spazio</div>
          <div className="hamburger-menu-cell">Forma</div>
          <div className="hamburger-menu-cell">Processo</div>
          <div className="hamburger-menu-cell">Dubitare</div>
          <div className="hamburger-menu-cell">Trasformare</div>
          <div className="hamburger-menu-cell">Combinare</div>
          <div className="hamburger-menu-cell">Problema</div>
          <div className="hamburger-menu-cell">Trama</div>
          <div className="hamburger-menu-cell">Realismo</div>
          <div className="hamburger-menu-cell">Cancellazione</div>

        </div>
*/}










      </div>
    );
  }

  navMenuUp(id, transitionData)
  {
    return (
      <div>
        <AtlasIntroHeader />

        <div id="scrollableGrid" className="atlas-intro-scrollable">
          <div className="atlas-intro-sidebar3">

            <div className="atlas-intro-sidebar-monoblock compass-selector-cell" style={{ top: this.getVisibleItemInitialY(), zIndex: 10 }}>
            <h1>BUSSOLA</h1>
              <br />
              <br />
            </div>

{/*            <div className="atlas-intro-sidebar-monoblock" style={{background:"orange", top: this.getVisibleItemInitialY() - 0.5 * transitionData.percent * this.getDeltaY(), zIndex: 1 }}> */}
            <div className="atlas-intro-sidebar-monoblock" style={{ top: 0 - transitionData.percent * 0.5 * this.getDeltaY(), zIndex: 1 }}>
              <p>Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt.
              Franz jagt im komplett verwahrlosten Taxi quer durch Bayern.
              Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich.
              Vogel Quax zwickt Johnys Pferd Bim. Sylvia wagt quick den Jux bei Pforzheim.
              Polyfon zwitschernd aßen. </p>
            </div>

            <div className="atlas-intro-sidebar-monoblock" style={{top: 0 - transitionData.percent * 0.5 * this.getDeltaY(), zIndex: 1 }}>
            <h2>About</h2><br />
              <h2>Strumenti</h2><br />
              <h2>Rassegna</h2><br />
              <h2>Articoli</h2><br />
            </div>

          </div>
        </div>

{/*
        <div id="staticGrid" className="atlas-intro">
          <div />
          <div className="atlas-intro-cell-grid">
            <div className="atlas-intro-cell"></div>
            <div className="atlas-intro-cell"><h3>Forma</h3></div>
            <div className="atlas-intro-cell"><h3>Dubbio</h3></div>
            <div className="atlas-intro-cell"><h3>Spazio</h3></div>
          </div>
        </div>
*/}

        <div id="staticGrid" className="atlas-intro">
          <div/>
          <div className="atlas-intro-cell-grid2">
            <div className="atlas-intro-cell2"></div>
            <div className="atlas-intro-cell2"><h3>Forma</h3></div>
            <div className="atlas-intro-cell2"><h3>Dubbio</h3></div>
            <div className="atlas-intro-cell2"><h3>Spazio</h3></div>

            <div className="atlas-intro-cell2"><h4>Fenomeno</h4></div>
            <div className="atlas-intro-cell2"></div>
            <div className="atlas-intro-cell2"></div>
            <div className="atlas-intro-cell2"></div>

            <div className="atlas-intro-cell2"><h4>Processo</h4></div>
            <div className="atlas-intro-cell2"></div>
            <div className="atlas-intro-cell2"></div>
            <div className="atlas-intro-cell2"></div>

            <div className="atlas-intro-cell2"><h4>Problema</h4></div>
            <div className="atlas-intro-cell2"></div>
            <div className="atlas-intro-cell2"></div>
            <div className="atlas-intro-cell2"></div>

          </div>
        </div>

      </div>
    );
  }

  makeCompassPermanent(id, transitionData)
  {
    return (
      <div>
        <AtlasIntroHeader />

        <div id="scrollableGrid" className="atlas-intro-scrollable">
          <div className="atlas-intro-sidebar4" style={{ top: this.getVisibleItemInitialY() }}>

            <div className="atlas-intro-sidebar-monoblock compass-selector-cell" >
              <h1>BUSSOLA</h1>
              <br />
              <br />
            </div>

            <div className="atlas-intro-sidebar-monoblock">
            <h2>About</h2><br />
              <h2>Strumenti</h2><br />
              <h2>Rassegna</h2><br />
              <h2>Articoli</h2><br />
            </div>

          </div>
        </div>
{/*
        <div id="staticGrid" className="atlas-intro">
          <div />
          <div className="atlas-intro-cell-grid">
            <div className="atlas-intro-cell"></div>
            <div className="atlas-intro-cell"><h3>Forma</h3></div>
            <div className="atlas-intro-cell"><h3>Dubbio</h3></div>
            <div className="atlas-intro-cell"><h3>Spazio</h3></div>
          </div>
        </div>
*/}

        <div id="staticGrid" className="atlas-intro">
          <div/>
          <div className="atlas-intro-cell-grid2">
            <div className="atlas-intro-cell2"></div>
            <div className="atlas-intro-cell2"><h3>Forma</h3></div>
            <div className="atlas-intro-cell2"><h3>Dubbio</h3></div>
            <div className="atlas-intro-cell2"><h3>Spazio</h3></div>

            <div className="atlas-intro-cell2"><h4>Fenomeno</h4></div>
            <div className="atlas-intro-cell2"></div>
            <div className="atlas-intro-cell2"></div>
            <div className="atlas-intro-cell2"></div>

            <div className="atlas-intro-cell2"><h4>Processo</h4></div>
            <div className="atlas-intro-cell2"></div>
            <div className="atlas-intro-cell2"></div>
            <div className="atlas-intro-cell2"></div>

            <div className="atlas-intro-cell2"><h4>Problema</h4></div>
            <div className="atlas-intro-cell2"></div>
            <div className="atlas-intro-cell2"></div>
            <div className="atlas-intro-cell2"></div>

          </div>
        </div>

      </div>
    );
  }

  render_impl(id, transitionData)
  {
    switch(id)
    {
      case "phasesUp"                     : return this.phasesUp(id, transitionData);
      case "compassIntroUp"               : return this.compassIntroUp(id, transitionData);
      case "navMenuUp"                    : return this.navMenuUp(id, transitionData);
      case "makeCompassPermanent"         : return this.makeCompassPermanent(id, transitionData);
      case "makeCompassPermanentFinished" : this.props.history.push('/Home'); return;
    }
  }

  render()
  {
    return (
      <div>
        <ParallaxScroll
          sections={[
            { id : "phasesUp" },
            { id : "compassIntroUp" },
            { id : "navMenuUp" },
            { id : "makeCompassPermanent" },
            { id : "makeCompassPermanentFinished" }
          ]}
          render={this.render_impl}
        />
      </div>
    );
  }
}

export default withRouter(AtlasIntro);
