import React, { Component } from 'react';
import HeaderViz from '../general/HeaderViz'
import BodyViz from '../general/BodyViz';
import MainMenu from '../general/MainMenu';
import * as d3 from 'd3';

import Loading from '../general/Loading';
import TimeFilter from '../visualizations/TimeFilter'
import DropDownSelect from '../general/DropDownSelect'
import SetOption from '../general/SetOption'
import PlacesMatrix from '../visualizations/PlacesMatrix';

import ParseMatrixData from './parse-matrix-data'

class PlacesMatrixView extends Component {

  constructor(props){
    super(props);
    this.loadData = this.loadData.bind(this);
    this.state = {
      data:'data still not loaded',
      isLoading: true,
      openAll: false
    };
    this.changeSpan = this.changeSpan.bind(this);
    this.changeThemes = this.changeThemes.bind(this);
    this.changePublications = this.changePublications.bind(this);
    this.openAll = this.openAll.bind(this);
  }

  loadData() {
    d3.tsv('./places-matrix-data.tsv')
      .then( data => {
        const graph = ParseMatrixData.parser(data);
        return graph;
      })
      .then(data=>{
        this.setState({
          data: data,
          dataTimeFilter: d3.extent(data.nodes, d => d.year),
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
      span: newSpan,
      filters: {
        timeFilter:newSpan
      }
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

  openAll(value) {
    this.setState({
      openAll: value
    });
  }

  render() {
    return (
      <div>
        <HeaderViz>
          <MainMenu style={{gridColumn: 'span 1'}}/>
          <SetOption style={{gridColumn: 'span 2'}} selected={this.openAll}/>

          { this.state.isLoading && <Loading style={{gridColumn: 'span 6'}} /> }
          { !this.state.isLoading && <TimeFilter style={{gridColumn: 'span 6'}} data={this.state.dataTimeFilter} changeSpan={this.changeSpan} title="Imposta un filtro temporale"/> }

          { this.state.isLoading && <Loading style={{gridColumn: 'span 4'}} /> }
          { !this.state.isLoading && <DropDownSelect style={{gridColumn: 'span 4'}} options={this.state.themes} changeOptions={this.changePublications} title="Tipo di pubblicazione"/> }

          { this.state.isLoading && <Loading style={{gridColumn: 'span 4'}} /> }
          { !this.state.isLoading && <DropDownSelect style={{gridColumn: 'span 4'}} options={this.state.publicationsTypes} changeOptions={this.changeThemes} title="Evidenzia un tema"/> }

          <div style={{gridColumn: 'span 6'}}>ricerca</div>
          <div style={{gridColumn: 'span 1'}}>help</div>
        </HeaderViz>

        <BodyViz className="the-body-viz">
          { this.state.isLoading && <Loading /> }
          { !this.state.isLoading && <PlacesMatrix data={this.state.data} filters={this.state.filters} /> }
        </BodyViz>
      </div>
    );
  }
}

export default PlacesMatrixView;
