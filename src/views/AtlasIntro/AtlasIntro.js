import React from 'react';
import ParallaxScroll from 'react-scroll-transitions';
import { withRouter } from 'react-router-dom';
import AtlasIntroHeader from '../../headers/AtlasIntroHeader/AtlasIntroHeader';

import './AtlasIntro.css';

class AtlasIntro extends React.Component
{
  constructor(props)
  {
    super(props);

    this.render_impl = this.render_impl.bind(this);
  }

  getVisibleItemInitialY() { return 0; }
  getDeltaY() { return 1000; }
  getInvisibleItemInitialY() { return this.getVisibleItemInitialY() + this.getDeltaY(); }

  phasesUp(id, transitionData)
  {
    return (
      <div>
        <AtlasIntroHeader />

        <div id="scrollableGrid" className="atlas-intro-scrollable">
          <div className="atlas-intro-sidebar">

            <div className="atlas-intro-sidebar-monoblock" style={{background:"yellow", top: this.getVisibleItemInitialY() - transitionData.percent * this.getDeltaY() }}>
              SFERE
              <br />
              <br />
              Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich. Vogel Quax zwickt Johnys Pferd Bim. Sylvia wagt quick den Jux bei Pforzheim. Polyfon zwitschernd aßen
            </div>

            <div className="atlas-intro-sidebar-monoblock" style={{background:"green", top: this.getVisibleItemInitialY() - transitionData.percent * this.getDeltaY()}}>
              FASI
              <br />
              <br />
              Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich. Vogel Quax zwickt Johnys Pferd Bim. Sylvia wagt quick den Jux bei Pforzheim. Polyfon zwitschernd aßen          
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

  compassIntroUp(id, transitionData)
  {
    return (
      <div>
        <AtlasIntroHeader />

        <div id="scrollableGrid" className="atlas-intro-scrollable">
          <div className="atlas-intro-sidebar">

            <div className="atlas-intro-sidebar-monoblock" style={{background:"green", top: this.getVisibleItemInitialY() - transitionData.percent * this.getDeltaY() }}>
              FASI
              <br />
              <br />
              Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich. Vogel Quax zwickt Johnys Pferd Bim. Sylvia wagt quick den Jux bei Pforzheim. Polyfon zwitschernd aßen
            </div>

            <div className="atlas-intro-sidebar-monoblock" style={{background:"cyan", top: this.getVisibleItemInitialY() - transitionData.percent * this.getDeltaY() }}>
              Bussola
              <br />
              <br />
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
          <div className="atlas-intro-sidebar">

            <div className="atlas-intro-sidebar-monoblock" style={{background:"cyan", top: this.getVisibleItemInitialY() - transitionData.percent * 0.4 * this.getDeltaY() }}>
              Bussola
              <br />
              <br />
              Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich. Vogel Quax zwickt Johnys Pferd Bim. Sylvia wagt quick den Jux bei Pforzheim. Polyfon zwitschernd aßen          
            </div>

            <div className="atlas-intro-sidebar-monoblock" style={{background:"gray", top: this.getVisibleItemInitialY() - transitionData.percent * this.getDeltaY() }}>
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
          <div className="atlas-intro-sidebar">

            <div className="atlas-intro-sidebar-monoblock" style={{background:"cyan", top: this.getVisibleItemInitialY() - 0.4 * this.getDeltaY() }}>
              Bussola
              <br />
              <br />
              Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich. Vogel Quax zwickt Johnys Pferd Bim. Sylvia wagt quick den Jux bei Pforzheim. Polyfon zwitschernd aßen          
            </div>

            <div className="atlas-intro-sidebar-monoblock" style={{background:"gray", top: this.getVisibleItemInitialY() - this.getDeltaY() }}>
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