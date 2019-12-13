import React, { Component } from 'react';
import '../../App.css';
import './RangeFilter.css';

import Viz from './range-filter.d3'

class RangeFilter extends Component {

  componentDidMount() {
    this._chart = Viz.initialize(this._rootNode, this.props.data, this.props.changeOptions);
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
    Viz.destroy(this._rootNode);
  }

  _setRef(componentNode) {
      this._rootNode = componentNode;
  }

  render() {
    // console.log(this.props.data)
    return <div style={this.props.style} ref={this._setRef.bind(this)}><svg className="range-filter"></svg></div>;
  }
}

export default RangeFilter;

// RangeFilter.defaultProps = {
//   title: 'Time Filter',
//   style: {
//     gridColumn: 'span 4'
//   }
// }
