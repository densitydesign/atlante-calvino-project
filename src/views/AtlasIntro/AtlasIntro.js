import React from 'react';
import ParallaxScroll from 'react-scroll-transitions';
import { withRouter } from 'react-router-dom';
import AtlasIntroHeader from '../../headers/AtlasIntroHeader/AtlasIntroHeader';
import IntroViewSelector from './IntroViewSelector.js';

import '../../App.css';
import './AtlasIntro.css';
//import '../HamburgerMenu/HamburgerMenu.css';

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

            <div className="atlas-intro-sidebar-monoblock" style={{ top: this.getVisibleItemInitialY() - transitionData.percent * this.getDeltaY()}}>
              <h1>Itinerari</h1>
              <p className="intro">Per entrare e muoversi dentro l’opera narrativa di Calvino abbiamo scelto tre itinerari.
              Il primo riguarda il <strong>dubbio</strong>, il secondo lo <strong>spazio</strong> e il terzo la <strong>forma</strong> del racconto.
              Sono tre scelte arbitrarie, ma che vanno a toccare alcuni fondamenti della scrittura calviniana,
              invitandoci alla sua esplorazione.</p>
            </div>

            <div className="atlas-intro-sidebar-monoblock" style={{ top: this.getVisibleItemInitialY() - transitionData.percent * this.getDeltaY()}}>
              <h1>Tappe</h1>
            <p className="intro">Ognuno dei tre itinerari si sviluppa in tre tappe. La prima tappa cerca di individuare il <strong>fenomeno</strong> di cui stiamo parlando.
            La seconda tappa il <strong>processo</strong> che viene innescato da questo fenomeno. La terza tappa l’ombra del <strong>problema</strong> che sta dietro a tutto. </p>
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
            <div className="atlas-intro-cell2 step-intro"><h4>TAPPA 1</h4></div>
            <div className="atlas-intro-cell2" />
            <div className="atlas-intro-cell2" />
            <div className="atlas-intro-cell2" /> {/* the first table row, and below the others */}
            <div className="atlas-intro-cell2 step-intro"><h4>TAPPA 2</h4></div>
            <div className="atlas-intro-cell2" />
            <div className="atlas-intro-cell2" />
            <div className="atlas-intro-cell2" />
            <div className="atlas-intro-cell2 step-intro"><h4>TAPPA 3</h4></div>
            <div className="atlas-intro-cell2" />
            <div className="atlas-intro-cell2" />
            <div className="atlas-intro-cell2" />

          </div>

        </div>

        <div id="staticGrid" className="atlas-intro">
          <div />
          <div className="atlas-intro-cell-grid">
            <div className="atlas-intro-cell3 tint-itineraries-intro"></div>
            <div className="atlas-intro-cell3 tint-itineraries-intro"><h3>Dubbio</h3></div>
            <div className="atlas-intro-cell3 tint-itineraries-intro"><h3>Spazio</h3></div>
            <div className="atlas-intro-cell3 tint-itineraries-intro"><h3>Forma</h3></div>

            <div className="atlas-intro-cell3 tint-itineraries-intro"></div>
            <div className="atlas-intro-cell3 tint-itineraries-intro"></div>
            <div className="atlas-intro-cell3 tint-itineraries-intro"></div>
            <div className="atlas-intro-cell3 tint-itineraries-intro"></div>

            <div className="atlas-intro-cell3 tint-itineraries-intro"></div>
            <div className="atlas-intro-cell3 tint-itineraries-intro"></div>
            <div className="atlas-intro-cell3 tint-itineraries-intro"></div>
            <div className="atlas-intro-cell3 tint-itineraries-intro"></div>

            <div className="atlas-intro-cell3 tint-itineraries-intro"></div>
            <div className="atlas-intro-cell3 tint-itineraries-intro"></div>
            <div className="atlas-intro-cell3 tint-itineraries-intro"></div>
            <div className="atlas-intro-cell3 tint-itineraries-intro"></div>

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
          <div className="atlas-intro-sidebar2" style={{ top: this.getVisibleItemInitialY() - transitionData.percent * this.getDeltaY()}}>

            <div className="atlas-intro-sidebar-monoblock" >
              <h1>Tappe</h1>
              <p className="intro">Ognuno dei tre itinerari si sviluppa in tre tappe.
            <br />La prima tappa cerca di individuare il <strong>fenomeno</strong> di cui stiamo parlando.
              La seconda tappa il <strong>processo</strong> che viene innescato da questo fenomeno.
              La terza tappa l’ombra del <strong>problema</strong> che sta dietro a tutto. </p>
            </div>

            <div className="atlas-intro-sidebar-monoblock compass-selector-cell" >
            <h1>BUSSOLA</h1>
            </div>

            <div className="atlas-intro-sidebar-monoblock" >
              <p className="intro">Prima di iniziare il viaggio, ci vuole una <strong>bussola</strong>.
              Per quello abbiamo creato tre visualizzazioni orientative,
              che aiutino a muoversi dentro l’intero corpus dell’opera e che siano sempre a portata di mano.
              Fornendo un colpo d’occhio sulla storia dei volumi, sulla vicenda dei racconti e sulla biblioteca mentale dell’autore. </p>
            </div>

          </div>
        </div>

        <div id="staticGrid" className="atlas-intro">
          <div/>
          <div className="atlas-intro-cell-grid2">
            <div className="atlas-intro-cell3 itineraries-intro"></div>
            <div className="atlas-intro-cell3 itineraries-intro"><h3>Dubbio</h3></div>
            <div className="atlas-intro-cell3 itineraries-intro"><h3>Spazio</h3></div>
            <div className="atlas-intro-cell3 itineraries-intro"><h3>Forma</h3></div>

            <div className="atlas-intro-cell2 step-intro tint-step-intro"><h4>TAPPA 1</h4></div>
            <div className="atlas-intro-cell2"></div>
            <div className="atlas-intro-cell2"></div>
            <div className="atlas-intro-cell2"></div>

            <div className="atlas-intro-cell2 step-intro tint-step-intro"><h4>TAPPA 2</h4></div>
            <div className="atlas-intro-cell2"></div>
            <div className="atlas-intro-cell2"></div>
            <div className="atlas-intro-cell2"></div>

            <div className="atlas-intro-cell2 step-intro tint-step-intro"><h4>TAPPA 3</h4></div>
            <div className="atlas-intro-cell2"></div>
            <div className="atlas-intro-cell2"></div>
            <div className="atlas-intro-cell2"></div>

          </div>
        </div>





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
            <div className="atlas-intro-sidebar-monoblock" style={{ top: 0 - transitionData.percent * 0.5 * this.getDeltaY(), zIndex: 1 }}>
            <p className="intro">Prima di iniziare il viaggio, ci vuole una <strong>bussola</strong>.
            Per quello abbiamo creato tre visualizzazioni orientative,
            che aiutino a muoversi dentro l’intero corpus dell’opera e che siano sempre a portata di mano.
            Fornendo un colpo d’occhio sulla storia dei volumi, sulla vicenda dei racconti e sulla biblioteca mentale dell’autore. </p>
            </div>



            <div className="atlas-intro-sidebar-monoblock" style={{top: 0 - transitionData.percent * 0.5 * this.getDeltaY(), zIndex: 1 }}>
            <h2>Équipe</h2>
            <h2>Progetto</h2>
              <h2>Strumenti</h2>
              <h2>Rassegna</h2>
              <h2>Articoli</h2>
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
            <div className="atlas-intro-cell3 blank-intro"><h3>BUSSOLA</h3></div>
            <div className="atlas-intro-cell3 itineraries-intro"><h3>Dubbio</h3></div>
            <div className="atlas-intro-cell3 itineraries-intro"><h3>Spazio</h3></div>
            <div className="atlas-intro-cell3 itineraries-intro"><h3>Forma</h3></div>

            <div className="atlas-intro-cell2 step-intro"><h4>TAPPA 1</h4></div>
            <div className="atlas-intro-cell2 tint-viz-intro"></div>
            <div className="atlas-intro-cell2 tint-viz-intro"></div>
            <div className="atlas-intro-cell2 tint-viz-intro"></div>

            <div className="atlas-intro-cell2 step-intro"><h4>TAPPA 2</h4></div>
            <div className="atlas-intro-cell2 tint-viz-intro"></div>
            <div className="atlas-intro-cell2 tint-viz-intro"></div>
            <div className="atlas-intro-cell2 tint-viz-intro"></div>

            <div className="atlas-intro-cell2 step-intro"><h4>TAPPA 3</h4></div>
            <div className="atlas-intro-cell2 tint-viz-intro"></div>
            <div className="atlas-intro-cell2 tint-viz-intro"></div>
            <div className="atlas-intro-cell2 tint-viz-intro"></div>

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
              <h1>Atlante Calvino.</h1>
              <p> Letteratura e Visualizzazione</p>

            </div>

            <div className="atlas-intro-sidebar-monoblock">
            <h2>Équipe</h2><br />
            <h2>Progetto</h2><br />
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
        const style = this.props.image ? { backgroundImage : "url('" + process.env.PUBLIC_URL + this.props.image + "')" } : {};

            <div className="atlas-intro-cell2 pop" style={{
              backgroundImage : "url('" + process.env.PUBLIC_URL + "/menu_tappa_1.svg" + "')",
              opacity : transitionData.percent,
              backgroundSize : "cover",
              backgroundRepeat: "no-repeat"
            }}><h4>TAPPA 1</h4></div>
            <div className="atlas-intro-cell2" style={{
              backgroundImage : "url('" + process.env.PUBLIC_URL + "/menu_nebbia.svg" + "')",
              opacity : transitionData.percent,
              backgroundSize : "cover",
              backgroundRepeat: "no-repeat"
            }}><h5>Nebbia</h5></div>


*/}

        <div id="staticGrid" className="atlas-intro">
          <div/>
          <div className="atlas-intro-cell-grid2">
            <div className="atlas-intro-cell3 blank-intro"><h3>BUSSOLA</h3></div>
            <div className="atlas-intro-cell3 itineraries-intro"><h3>Dubbio</h3></div>
            <div className="atlas-intro-cell3 itineraries-intro"><h3>Spazio</h3></div>
            <div className="atlas-intro-cell3 itineraries-intro"><h3>Forma</h3></div>

            <IntroViewSelector className="atlas-intro-cell2 step-intro" image="/menuImages/menu_tappa_1.svg" transitionData={transitionData} keepLabelVisible><h4>TAPPA 1</h4></IntroViewSelector>
            <IntroViewSelector className="atlas-intro-cell2 viz-intro" transitionData={transitionData} image="/menuImages/menu_nebbia.svg" keepLabelVisible><h5>Nebbia</h5></IntroViewSelector>
            <IntroViewSelector className="atlas-intro-cell2 viz-intro" transitionData={transitionData} image="/menuImages/menu_luoghi.svg" keepLabelVisible><h5>Luoghi</h5></IntroViewSelector>
            <IntroViewSelector className="atlas-intro-cell2 viz-intro" transitionData={transitionData} image="/menuImages/menu_elenchi.svg" keepLabelVisible><h5>Elenchi</h5></IntroViewSelector>

            <IntroViewSelector className="atlas-intro-cell2 step-intro" transitionData={transitionData} keepLabelVisible><h4>TAPPA 2</h4></IntroViewSelector>
            <IntroViewSelector className="atlas-intro-cell2 viz-intro" transitionData={transitionData} keepLabelVisible image="/menuImages/menu_dubitare.svg" ><h5>Dubitare</h5></IntroViewSelector>
            <IntroViewSelector className="atlas-intro-cell2 viz-intro" transitionData={transitionData} image="/menuImages/menu_trasformare.svg" keepLabelVisible><h5>Trasformare</h5></IntroViewSelector>
            <IntroViewSelector className="atlas-intro-cell2 viz-intro" transitionData={transitionData} image="/menuImages/menu_trama.svg" keepLabelVisible><h5>Combinare</h5></IntroViewSelector>

            <IntroViewSelector className="atlas-intro-cell2 step-intro" transitionData={transitionData} keepLabelVisible><h4>TAPPA 3</h4></IntroViewSelector>
            <IntroViewSelector className="atlas-intro-cell2 viz-intro" transitionData={transitionData} keepLabelVisible><h5>Cancellazione</h5></IntroViewSelector>
            <IntroViewSelector className="atlas-intro-cell2 viz-intro" transitionData={transitionData} keepLabelVisible><h5>Realismo</h5></IntroViewSelector>
            <IntroViewSelector className="atlas-intro-cell2 viz-intro" transitionData={transitionData} keepLabelVisible><h5>Trama</h5></IntroViewSelector>

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
      case "makeCompassPermanentFinished" : this.props.history.push('/IntroFinished'); return;
      default : break;
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
