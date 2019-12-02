
import React from 'react';
import V from './logo.js';
import * as d3 from 'd3';
import AnimatedLogo from './AnimatedLogo';

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
    
    return (
      <section class="container-fluid">
        <section id="interactive-logo" class="container">
          <div class="row d-flex align-items-center">
            <AnimatedLogo />
          </div>
        </section>
      </section>
    );

  }
}