import React, { Component } from 'react';
import HeaderViz from '../general/HeaderViz'
import BodyViz from '../general/BodyViz';
import MainMenu from '../general/MainMenu';
import * as d3 from 'd3';

import Loading from '../general/Loading';

import SetOption from '../general/SetOption'
import TimeFilter from '../visualizations/TimeFilter'
import DropDownSelect from '../general/DropDownSelect'
import FilterSearch from '../general/FilterSearch'

import PlacesMatrix from '../visualizations/PlacesMatrix';

import ParseMatrixData from './parse-matrix-data'

class PlacesMatrixView extends Component {

  constructor(props){
    super(props);
    this.loadData = this.loadData.bind(this);
    this.state = {
      data:'data still not loaded',
      isLoading: true,
      openAll: false,
      filters: {
        search: []
      }
    };
    this.openAll = this.openAll.bind(this);
    this.changeSpan = this.changeSpan.bind(this);
    this.changePublications = this.changePublications.bind(this);
    this.changeThemes = this.changeThemes.bind(this);
    this.searchRecord = this.searchRecord.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
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
          themes: ["tutti","fabbrica","guerra","mare","metropoli","natura ligure","paesaggio urbano","protagonista bambino","viaggio"],
          publicationsTypes: ['tutti','raccolta','volume','altro'],
          searchOptions: [
            { label: 'luogo', dimension: 'label'},
            { label: 'raccolta', dimension: 'pubVenueTitle'},
            { label: 'titolo', dimension:'sourceTitle'}
          ],
          isLoading: false,
          filters: {
            update: true,
            openAll: false
          }
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
        timeFilter:newSpan,
        update: true
      }
    });
  }

  changePublications(newPublications) {
    this.setState({
      filters: {
        selectedPublications: newPublications,
        update: false
      }
    });
  }

  changeThemes(newThemes) {
    this.setState({
      filters: {
        selectedThemes: newThemes,
        update: false
      }
    });
  }

  searchRecord(searchResults) {
    console.log('search result container', searchResults)
    this.setState({
      filters: {
        search: searchResults,
        update: false
      }
    });
  }

  resetSearch() {
    console.log('reset search');
    this.setState({
      filters: {
        search: [],
        update: false
      }
    });
  }

  openAll(value) {
    this.setState({
      filters: {
        openAll: value,
        update: true
      }
    });
  }

  render() {
    return (
      <div>
        <HeaderViz>
          <MainMenu style={{gridColumn: 'span 1'}}/>

          { this.state.isLoading && <Loading style={{gridColumn: 'span 2'}} /> }
          { !this.state.isLoading && <SetOption style={{gridColumn: 'span 2'}} selected={this.openAll} title="Apri tutto"/> }

          { this.state.isLoading && <Loading style={{gridColumn: 'span 6'}} /> }
          { !this.state.isLoading && <TimeFilter style={{gridColumn: 'span 6'}} data={this.state.dataTimeFilter} changeSpan={this.changeSpan} title="Imposta un filtro temporale"/> }

          { this.state.isLoading && <Loading style={{gridColumn: 'span 4'}} /> }
          { !this.state.isLoading && <DropDownSelect style={{gridColumn: 'span 4'}} options={this.state.publicationsTypes} changeOptions={this.changePublications} title="Tipo di pubblicazione"/> }

          { this.state.isLoading && <Loading style={{gridColumn: 'span 4'}} /> }
          { !this.state.isLoading && <DropDownSelect style={{gridColumn: 'span 4'}} options={this.state.themes} changeOptions={this.changeThemes} title="Evidenzia un tema"/> }

          { this.state.isLoading && <Loading style={{gridColumn: 'span 6'}} /> }
          { !this.state.isLoading && <FilterSearch style={{gridColumn: 'span 6'}} data={this.state.data} options={this.state.searchOptions} searchRecord={this.searchRecord} search={this.state.filters.search} resetSearch={this.resetSearch} title="Cerca"/> }

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
