import React, { Component } from 'react';

class VizTitle extends Component {
  render() {
    return <div className="viz-title" style={this.props.style}>{this.props.title}</div>;
  }
}

export default VizTitle;

VizTitle.defaultProps = {
  title: 'This visualization needs a title',
  style: {gridColumn: 'span 12'}
};
