
import React from 'react';
import V from './logo.js';
import * as d3 from 'd3';
import AnimatedLogo from './AnimatedLogo';

import '../../App.css';
import './SplashScreen.css';

export default class SplashScreen extends React.Component
{
  constructor(props)
  {
    super(props);
    this.loadData = this.loadData.bind(this);
    this.state = {
      data : "data still not loaded",
      isLoading : true
    };
  }

  loadData()
  {
    d3
      .xml("./logo-big-polygons-01.svg")
      .then(xml => xml)
      .then(data => {
        this.setState({
          data : data,
          isLoading : false
        });
      })
  }

  componentDidMount()
  {
    this.loadData();
  }

  render()
  {
//    return <div>pippo</div>;

/*
    return (
      <section className="container-fluid">
        <section id="interactive-logo" className="container">
          <div className="row d-flex align-items-center">
            <AnimatedLogo />
          </div>
        </section>
      </section>
    );
*/

console.log("this.state.data.documentElement", this.state.data.documentElement);
//const s = new XMLSerializer().serializeToString(this.state.data.documentElement);
//const s = this.state.data.documentElement.toString();
//console.log("s : ", s);

    return (
      <section className="container-fluid">
        <section id="interactive-logo" className="container">
          <div className="row d-flex align-items-center">
            <div id="logo-box" className="col-12 col-sm-12 col-md-12 col-lg-10 mx-auto d-flex flex-column justify-content-center" dangerouslySetInnerHTML={{__html: this.state.data.documentElement}} >
            </div>
          </div>
        </section>
      </section>
    );

  }
}
