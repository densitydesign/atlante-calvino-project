import React from 'react';
import ParallaxScroll from 'react-scroll-transitions';
import { withRouter } from 'react-router-dom';
import AtlasIntroHeader from '../../headers/AtlasIntroHeader/AtlasIntroHeader';

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

            <div className="atlas-intro-sidebar-monoblock hamburger-menu-cell" style={{ top: this.getVisibleItemInitialY() - transitionData.percent * this.getDeltaY() }}>
              SFERE
              <br />
              <br />
              Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich. Vogel Quax zwickt Johnys Pferd Bim. Sylvia wagt quick den Jux bei Pforzheim. Polyfon zwitschernd aßen
            </div>

            <div className="atlas-intro-sidebar-monoblock" style={{ top: this.getVisibleItemInitialY() - transitionData.percent * this.getDeltaY()}}>
              FASI
              <br />
              <br />
              Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich. Vogel Quax zwickt Johnys Pferd Bim. Sylvia wagt quick den Jux bei Pforzheim. Polyfon zwitschernd aßen          
            </div>

          </div>

          <div id="rows" className="atlas-intro-row-grid" style={{ top: this.getVisibleItemInitialY() - transitionData.percent * this.getDeltaY()}}>

            <div /> {/* the empty page, before scrolling */}
            <div /> {/* the first, empty row (it's the row of column headers) */}
            <div>Fenomeno</div> {/* the first table row, and below the others */}
            <div>Processo</div>
            <div>Problema</div>            

          </div>
        </div>

        <div id="staticGrid" className="atlas-intro">
          <div />
          <div className="atlas-intro-cell-grid">
            <div className="atlas-intro-cell"></div>
            <div className="atlas-intro-cell">Forma</div>
            <div className="atlas-intro-cell">Dubbio</div>
            <div className="atlas-intro-cell">Spazio</div>
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
              FASI
              <br />
              <br />
              Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich. Vogel Quax zwickt Johnys Pferd Bim. Sylvia wagt quick den Jux bei Pforzheim. Polyfon zwitschernd aßen
            </div>

            <div className="atlas-intro-sidebar-monoblock hamburger-menu-cell" >
              BUSSOLA
              <br />
              <br />              
            </div>

            <div className="atlas-intro-sidebar-monoblock" >
              Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich. Vogel Quax zwickt Johnys Pferd Bim. Sylvia wagt quick den Jux bei Pforzheim. Polyfon zwitschernd aßen
            </div>

          </div>
        </div>

        <div id="staticGrid" className="atlas-intro">
          <div/>
          <div className="atlas-intro-cell-grid">
            <div className="atlas-intro-cell"></div>
            <div className="atlas-intro-cell">Forma</div>
            <div className="atlas-intro-cell">Dubbio</div>
            <div className="atlas-intro-cell">Spazio</div>
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

            <div className="atlas-intro-sidebar-monoblock hamburger-menu-cell" style={{ top: this.getVisibleItemInitialY(), zIndex: 10 }}>
              BUSSOLA
              <br />
              <br />
            </div>

{/*            <div className="atlas-intro-sidebar-monoblock" style={{background:"orange", top: this.getVisibleItemInitialY() - 0.5 * transitionData.percent * this.getDeltaY(), zIndex: 1 }}> */}
            <div className="atlas-intro-sidebar-monoblock" style={{ top: 0 - transitionData.percent * 0.5 * this.getDeltaY(), zIndex: 1 }}>
              Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich. Vogel Quax zwickt Johnys Pferd Bim. Sylvia wagt quick den Jux bei Pforzheim. Polyfon zwitschernd aßen
            </div>

            <div className="atlas-intro-sidebar-monoblock" style={{background:"lightgray", top: 0 - transitionData.percent * 0.5 * this.getDeltaY(), zIndex: 1 }}>
              About<br />
              Strumenti<br />
              Rassegna<br />
              Articoli<br />
            </div>

          </div>
        </div>

        <div id="staticGrid" className="atlas-intro">
          <div />
          <div className="atlas-intro-cell-grid">
            <div className="atlas-intro-cell"></div>
            <div className="atlas-intro-cell">Forma</div>
            <div className="atlas-intro-cell">Dubbio</div>
            <div className="atlas-intro-cell">Spazio</div>
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

            <div className="atlas-intro-sidebar-monoblock hamburger-menu-cell" >
              BUSSOLA
              <br />
              <br />
            </div>

            <div className="atlas-intro-sidebar-monoblock" style={{background:"lightgray" }}>
              About<br />
              Strumenti<br />
              Rassegna<br />
              Articoli<br />
            </div>

          </div>
        </div>
          
        <div id="staticGrid" className="atlas-intro">
          <div />
          <div className="atlas-intro-cell-grid">
            <div className="atlas-intro-cell"></div>
            <div className="atlas-intro-cell">Forma</div>
            <div className="atlas-intro-cell">Dubbio</div>
            <div className="atlas-intro-cell">Spazio</div>
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