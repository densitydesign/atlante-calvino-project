import React, { Component } from 'react';

class RangeFilter extends Component {
  render() {
    return <div style={this.props.style}>RangeFilter</div>;
  }
}

export default RangeFilter;

RangeFilter.defaultProps = {
  style: {
    gridColumn: 'span 4'
  }
}
