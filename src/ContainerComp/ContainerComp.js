import React, { Component } from 'react';
import HeaderViz from '../general/HeaderViz'
import BodyViz from '../general/BodyViz';
import MainMenu from '../general/MainMenu';
import * as d3 from 'd3';

import Loading from '../general/Loading';
import TimeFilter from '../visualizations/TimeFilter'
import ExampleViz from '../visualizations/ExampleViz';

class ContainerComp extends Component {

  constructor(props){
    super(props);
    this.loadData = this.loadData.bind(this);
    this.state = {
      data:'data still not loaded',
      isLoading: true
    };
    this.changeSpan = this.changeSpan.bind(this);
  }

  loadData() {
    const parseDate = d3.timeParse("%b %Y");
    d3.csv('./sample-data.csv').then( data => {
      // Execute here any function to format data
      return data.map( d => {
        d.date = parseDate(d.date);
        d.price = +d.price;
        return d;
      })

    }).then(data=>{
      // console.log('loaded sample-data.csv in ContainerComp')
      // const extent = d3.extent(data, d => { d.date })
      this.setState({
        data: data,
        isLoading: false
      })
    })
  }

  componentDidMount() {
    this.loadData();
  }

  changeSpan(newSpan) {
    this.setState({
      span: newSpan
    });
  }

  render() {
    return (
      <div>
        <HeaderViz>
          <MainMenu style={{gridColumn: 'span 1'}}/>
          <div style={{gridColumn: 'span 2', padding: '0 15px'}}>apritutto</div>
          { this.state.isLoading && <Loading style={{gridColumn: 'span 6', padding: '0 15px'}} /> }
          { !this.state.isLoading && <TimeFilter style={{gridColumn: 'span 6', padding: '0 15px'}} data={this.state.data} changeSpan={this.changeSpan} /> }
          <div style={{gridColumn: 'span 4', padding: '0 15px'}}>tipo pubblicazione</div>
          <div style={{gridColumn: 'span 4', padding: '0 15px'}}>temi</div>
          <div style={{gridColumn: 'span 6', padding: '0 15px'}}>ricerca</div>
          <div style={{gridColumn: 'span 1', padding: '0 15px'}}>help</div>
        </HeaderViz>

        <BodyViz className="the-body-viz">
          { this.state.isLoading && <Loading /> }
          { !this.state.isLoading && <ExampleViz data={this.state.data} span={this.state.span} /> }
        </BodyViz>
      </div>
    );
  }
}

export default ContainerComp;
