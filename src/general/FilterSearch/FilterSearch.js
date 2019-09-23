import React, { Component } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import SimpleDropDown from '../SimpleDropDown'
import SimpleSearch from '../SimpleSearch'

class FilterSearch extends Component {
  constructor(props) {
    super(props);

    let allTitles = this.props.data.nodes.map(d=>d.pubVenueTitle.split(';'));
    allTitles = _.flattenDeep(allTitles);
    allTitles = d3.nest()
      .key(d=>d)
      .entries(allTitles)
      .map(d=>d.key);

    let nodesByPublicationTitle = []
    allTitles.forEach( d => {
      let publishedHere = this.props.data.nodes.filter( e => { return e.pubVenueTitle.includes(d) })
      let obj = {
        key: d,
        values: publishedHere.map(d=>d.id)
      }
      nodesByPublicationTitle.push(obj)
    })

    this.state = {
      option: this.props.options[0],
      previewSearch: [],
      publicationsTitles: allTitles,
      nodesByPublicationTitle: nodesByPublicationTitle
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.changeOption = this.changeOption.bind(this);
    this.searching = this.searching.bind(this);
    this.selectResult = this.selectResult.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
  }

  handleSearch(searchResults) {
    this.props.searchRecord(searchResults);
  }

  changeOption(option) {
    const newOption = this.props.options.filter(d=>{return d.label == option})[0]
    this.setState({
      option: newOption
    });
  }

  searching(value) {
    // console.log('Searching:', this.state.option, value)
    let nestedData = [];
    if (this.state.option.label === 'raccolta') {
      nestedData = this.state.nodesByPublicationTitle.filter( d => {
        return d.key.toLowerCase().includes(value.toLowerCase())
      })
    } else {
      nestedData = d3.nest()
        .key( d => d[this.state.option.dimension])
        .entries(this.props.data.nodes)
        .map( d => {
          return {
            key: d.key,
            values: d.values.map(d=>d.id)
          }
        })
        .filter( d => {
          return d.key.toLowerCase().includes(value.toLowerCase())
        })
    }
    // console.log(nestedData)
    if (nestedData.length) {
      this.setState({
        previewSearch: nestedData
      });
    }
  }

  selectResult(value) {
    this.setState({
      previewSearch:[]
    })
    this.props.searchRecord(value.split(','))
  }

  resetSearch() {
    this.props.resetSearch();
  }

  render() {
    console.log(this.props)
    return (
      <div className="filter-search" style={this.props.style}>
        <h5>{this.props.title}</h5>
        <SimpleDropDown style={{display: 'inline-block'}} options={this.props.options.map(d=>d.label)} changeOption={this.changeOption}/>
        <SimpleSearch style={{display: 'inline-block'}} searching={this.searching} previewSearch={this.state.previewSearch} selectResult={this.selectResult} />
        { (this.props.search && this.props.search.length>0) && <span onClick={this.resetSearch}>X</span>}
      </div>
    );
  }
}

export default FilterSearch;

FilterSearch.defaultProps = { title: 'Search for a Record' };
