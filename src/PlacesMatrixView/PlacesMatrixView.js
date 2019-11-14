import React, { Component } from 'react';
import BodyViz from '../general/BodyViz';
import MainMenu from '../general/MainMenu';
import * as d3 from 'd3';

import Loading from '../general/Loading';

import SetOption from '../general/SetOption'
import TimeFilter from '../visualizations/TimeFilter'
import MultipleSelection from '../general/MultipleSelection'
import FilterSearch from '../general/FilterSearch'

import MoreInfo from '../general/MoreInfo';

import PlacesMatrix from '../visualizations/PlacesMatrix';
import ParseMatrixData from './parse-matrix-data';

class PlacesMatrixView extends Component {

  constructor(props){
    super(props);
    this.loadData = this.loadData.bind(this);
    this.state = { data:'data still not loaded', isLoading: true };
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
          data: data.graph,
          originalData: data.data,
          dataTimeFilter: d3.extent(data.graph.nodes, d => d.year),
          themes: ["fabbrica","guerra","mare","metropoli","natura ligure","paesaggio urbano","protagonista bambino","viaggio","paesaggio cosmico","mito", 'nessuno'],
          publicationsTypes: ['raccolta','volume','altro'],
          searchOptions: [
            { label: 'luogo', dimension: 'label'},
            { label: 'raccolta', dimension: 'pubVenueTitle'},
            { label: 'titolo', dimension:'sourceTitle'}
          ],
          isLoading: false,
          filters: {
            update: true,
            openAll: false,
            themes: ["fabbrica","guerra","mare","metropoli","natura ligure","paesaggio urbano","protagonista bambino","viaggio","paesaggio cosmico","mito", 'nessuno'],
            kinds: ['raccolta','volume','altro'],
            search: [],
            span: d3.extent(data.graph.nodes, d => d.year)
          }
        })
      })
  }

  componentDidMount() {
    this.loadData();
  }

  changeSpan(newSpan) {
    this.setState(prevState => ({
      filters: {                    // object that we want to update
        ...prevState.filters,       // keep all other key-value pairs
        span:newSpan,
        update: true                // update the value of specific key
      }
    }))
  }

  changePublications(newPublications) {
    this.setState(prevState => ({
      filters: {                    // object that we want to update
        ...prevState.filters,       // keep all other key-value pairs
        kinds: newPublications,  // update the value of specific key
        update: false
      }
    }))
  }

  changeThemes(newThemes) {
    this.setState(prevState => ({
      filters: {                    // object that we want to update
        ...prevState.filters,       // keep all other key-value pairs
        themes: newThemes,  // update the value of specific key
        update: false
      }
    }))
  }

  searchRecord(searchResults) {
    this.setState(prevState => ({
      filters: {                    // object that we want to update
        ...prevState.filters,       // keep all other key-value pairs
        search: searchResults,      // update the value of specific key
        update: true
      }
    }))
  }

  resetSearch() {
    this.setState(prevState => ({
      filters: {                    // object that we want to update
        ...prevState.filters,       // keep all other key-value pairs
        search: [],
        update: true
      }
    }))
  }

  openAll(value) {
    this.setState(prevState => ({
      filters: {                    // object that we want to update
        ...prevState.filters,       // keep all other key-value pairs
        openAll: value,
        update: true
      }
    }))
  }

  render() {
    // console.log('filters',this.state.filters)
    return (
      <div>
        <div className="the-header">
          <MainMenu className="main-menu" style={{gridColumn: 'span 1'}}/>

          { this.state.isLoading && <Loading style={{gridColumn: 'span 2'}} /> }
          { !this.state.isLoading && <SetOption style={{gridColumn: 'span 2'}} selected={this.openAll} title="Apri tutto"/> }

          { this.state.isLoading && <Loading style={{gridColumn: 'span 6'}} /> }
          { !this.state.isLoading && <TimeFilter style={{gridColumn: 'span 6'}} data={this.state.dataTimeFilter} changeSpan={this.changeSpan} title="Imposta un filtro temporale"/> }

          { this.state.isLoading && <Loading style={{gridColumn: 'span 4'}} /> }
          { !this.state.isLoading && <MultipleSelection style={{gridColumn: 'span 4'}} options={this.state.publicationsTypes} changeOptions={this.changePublications} title="Tipo di pubblicazione" id="multiple-selection-publications"/> }

          { this.state.isLoading && <Loading style={{gridColumn: 'span 4'}} /> }
          { !this.state.isLoading && <MultipleSelection style={{gridColumn: 'span 4'}} options={this.state.themes} changeOptions={this.changeThemes} title="Evidenzia un tema" id="multiple-selection-themes"/> }

          { this.state.isLoading && <Loading style={{gridColumn: 'span 6'}} /> }
          { !this.state.isLoading && <FilterSearch style={{gridColumn: 'span 6'}} data={this.state.data} originalData={this.state.originalData} options={this.state.searchOptions} searchRecord={this.searchRecord} search={this.state.filters.search} resetSearch={this.resetSearch} minLength={1} title="Cerca"/> }

          { this.state.isLoading && <Loading style={{gridColumn: 'span 1'}} /> }
          { !this.state.isLoading && <MoreInfo style={{gridColumn: 'span 1'}}></MoreInfo>}

        </div>

        <BodyViz className="the-body-viz">
          { this.state.isLoading && <Loading /> }
          { !this.state.isLoading && <PlacesMatrix data={this.state.data} originalData={this.state.originalData} filters={this.state.filters} /> }
        </BodyViz>
      </div>
    );
  }
}

export default PlacesMatrixView;
