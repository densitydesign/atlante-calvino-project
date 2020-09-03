import React, { Component } from 'react';
import '../../App.css';
import './Search.css';
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';

class Search extends Component {
  render() {
    let isSelection = false;

    return <div className="search-component" style={this.props.style}>
      { !isSelection && <span style={
          {fontSize: '1rem',
          position: 'relative',
          top: '-3px'}
      }>/</span>}
      <Typeahead
        multiple
        onChange={(selected) => {
          this.props.changeOptions(selected)
        }}
        onInputChange={this.props.onInputChange}
        options={this.props.data.options}
        filterBy={this.props.filterBy}
        id="main-search"
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
      />

    </div>;
  }
}

export default Search;

Search.defaultProps = {
  style: {
    gridColumn: 'span 4'
  }
}
