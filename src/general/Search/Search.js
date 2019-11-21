import React, { Component } from 'react';

class Search extends Component {
  render() {
    return <div style={this.props.style}>Search</div>;
  }
}

export default Search;

Search.defaultProps = {
  style: {
    gridColumn: 'span 4'
  }
}
