import React, { Component } from 'react';
import V from './stackedBars.d3'

import './DoubtingStackedBars.css';

class DoubtingStackedBars extends Component {

  componentDidMount() {
    const data_for_update = {
      data: this.props.data,
      stackMode: this.props.stackMode
    }
    V.initialize(this._rootNode, data_for_update, this.props.onSelectedElement);
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("component updated")
    if (prevProps.data !== this.props.data || prevProps.stackMode !== this.props.stackMode) {
      V.update(this.props.data, this.props.stackMode);
      // V.filter(this.props.surviveFilters);
    }
    if (prevProps.surviveFilters !== this.props.surviveFilters || prevProps.stackMode !== this.props.stackMode) {
      V.filter(this.props.surviveFilters);
    }
  }

  componentWillUnmount() {
    // console.log('componentWillUnmount')
    V.destroy(this._rootNode);
  }

  _setRef(componentNode) {
    this._rootNode = componentNode;
  }

  render() {
    const styleSvg={
      width: '100%',
      height: '100%'
    }
    return <svg id={this.props.id} style={styleSvg} ref={this._setRef.bind(this)}></svg>;
  }
}

export default DoubtingStackedBars;
