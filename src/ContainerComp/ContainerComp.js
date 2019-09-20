import React, { Component } from 'react';
import HeaderViz from '../general/HeaderViz'
import BodyViz from '../general/BodyViz';
import MainMenu from '../general/MainMenu';
import * as d3 from 'd3';

import Loading from '../general/Loading';
import TimeFilter from '../visualizations/TimeFilter'
import DropDownSelect from '../general/DropDownSelect'
import SetOption from '../general/SetOption'
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
    this.changeThemes = this.changeThemes.bind(this);
    this.changePublications = this.changePublications.bind(this);
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
      this.setState({
        data: data,
        themes: ['tema 1','tema 2','tema 3','tema 4','tema 5','tema 6'],
        publicationsTypes: ['publication 1','publication 2','publication 3'],
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

  changeThemes(newThemes) {
    this.setState({
      selectedThemes: newThemes
    });
  }

  changePublications(newPublications) {
    this.setState({
      selectedPublications: newPublications
    });
  }

  render() {
    return (
      <div>
        <HeaderViz>
          <MainMenu style={{gridColumn: 'span 1'}}/>
          <SetOption style={{gridColumn: 'span 2'}} />

          { this.state.isLoading && <Loading style={{gridColumn: 'span 6'}} /> }
          { !this.state.isLoading && <TimeFilter style={{gridColumn: 'span 6'}} data={this.state.data} changeSpan={this.changeSpan} title="Imposta un filtro temporale"/> }

          { this.state.isLoading && <Loading style={{gridColumn: 'span 4'}} /> }
          { !this.state.isLoading && <DropDownSelect style={{gridColumn: 'span 4'}} options={this.state.themes} changeOptions={this.changePublications} title="Tipo di pubblicazione"/> }

          { this.state.isLoading && <Loading style={{gridColumn: 'span 4'}} /> }
          { !this.state.isLoading && <DropDownSelect style={{gridColumn: 'span 4'}} options={this.state.publicationsTypes} changeOptions={this.changeThemes} title="Evidenzia un tema"/> }

          <div style={{gridColumn: 'span 6'}}>ricerca</div>
          <div style={{gridColumn: 'span 1'}}>help</div>
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
