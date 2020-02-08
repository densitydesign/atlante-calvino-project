import React, { Component } from 'react';
import V from './stackedBars.d3'

class DoubtingStackedBars extends Component {

  componentDidMount() {
    const data_for_update = {
      data: this.props.data,
      stackMode: this.props.stackMode
    }
    V.initialize(this._rootNode, data_for_update);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data || prevProps.stackMode !== this.props.stackMode) {
      V.update(this.props.data, this.props.stackMode);
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
    const style={
      width: '100%',
      height: '100%'
    }
    return <svg id={this.props.id} style={style} ref={this._setRef.bind(this)}></svg>
  }
}

export default DoubtingStackedBars;
