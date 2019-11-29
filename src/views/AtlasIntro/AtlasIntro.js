import React from 'react';
import ParallaxScroll from 'react-scroll-transitions';
import { withRouter } from 'react-router-dom';

import './AtlasIntro.css';

class AtlasIntro extends React.Component
{
  constructor(props)
  {
    super(props);

    this.render_impl = this.render_impl.bind(this);
  }

  phasesUp(id, transitionData)
  {
    return (
      <div>
        <div style={{background:"red", position:"absolute", top:500 - transitionData.percent * 1000, width:200}}>
          SFERE
          <br />
          <br />
          Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich. Vogel Quax zwickt Johnys Pferd Bim. Sylvia wagt quick den Jux bei Pforzheim. Polyfon zwitschernd aßen
        </div>
        <div style={{background:"yellow", position:"absolute", top:100, right:500, height: 500}}>
          Forma
        </div>
        <div style={{background:"green", position:"absolute", top:1000 - transitionData.percent * 1000, width:200}}>
          FASI
          <br />
          <br />
          Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich. Vogel Quax zwickt Johnys Pferd Bim. Sylvia wagt quick den Jux bei Pforzheim. Polyfon zwitschernd aßen          
        </div>
      </div>
    );
  }

  compassIntroUp(id, transitionData)
  {
    return (
      <div>
        <div style={{background:"green", position:"absolute", top:500 - transitionData.percent * 1000, width:200}}>
          FASI
          <br />
          <br />
          Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich. Vogel Quax zwickt Johnys Pferd Bim. Sylvia wagt quick den Jux bei Pforzheim. Polyfon zwitschernd aßen          
        </div>
        <div style={{background:"yellow", position:"absolute", top:100, right:500, height: 500}}>
          Forma
        </div>
        <div style={{background:"cyan", position:"absolute", top:1000 - transitionData.percent * 1000, width:200}}>
          Bussola
          <br />
          <br />
          Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich. Vogel Quax zwickt Johnys Pferd Bim. Sylvia wagt quick den Jux bei Pforzheim. Polyfon zwitschernd aßen          
        </div>
      </div>
    );
  }

  navMenuUp(id, transitionData)
  {
    return (
      <div>
        <div style={{background:"cyan", position:"absolute", top:500 - transitionData.percent * 1000, width:200}}>
          Bussola
          <br />
          <br />
          Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich. Vogel Quax zwickt Johnys Pferd Bim. Sylvia wagt quick den Jux bei Pforzheim. Polyfon zwitschernd aßen          
        </div>
        <div style={{background:"yellow", position:"absolute", top:100, right:500, height: 500}}>
          Forma
        </div>
        <div style={{background:"gray", position:"absolute", top:1000 - transitionData.percent * 1000, width:200}}>
          About<br />
          Strumenti<br />
          Rassegna<br />
          Articoli<br />
        </div>
      </div>
    );
  }

  makeCompassPermanent(id, transitionData)
  {
    return (
      <div>
        <div style={{background:"cyan", position:"absolute", top:500 - 1000, width:200}}>
          Bussola
          <br />
          <br />
          Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich. Vogel Quax zwickt Johnys Pferd Bim. Sylvia wagt quick den Jux bei Pforzheim. Polyfon zwitschernd aßen          
        </div>
        <div style={{background:"yellow", position:"absolute", top:100, right:500, height: 500}}>
          Forma
        </div>
        <div style={{background:"gray", position:"absolute", top:1000 - 1000, width:200}}>
          About<br />
          Strumenti<br />
          Rassegna<br />
          Articoli<br />
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