import React, { Component } from 'react';
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
        options={this.props.data.options}
        id="main-search"
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
