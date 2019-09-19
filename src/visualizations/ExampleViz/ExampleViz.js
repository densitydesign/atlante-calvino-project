// Based on this Block from Michael https://bl.ocks.org/mbostock/34f08d5e11952a80609169b7917d4172

import React, { Component } from 'react'
import Viz from './viz.d3'
import './ExampleViz.css'
const vizStyle = {
  width: '100%',
  height: '100%'
}

class ExampleViz extends Component {

  componentDidMount() {
      this._chart = Viz.initialize(
          this._rootNode,
          this.props.data,
          this.props.config
      );
  }

  componentDidUpdate() {
      Viz.update(
         this._rootNode,
         this.props.data,
         this.props.config,
         this._chart
      );
  }

  componentWillUnmount() {
      Viz.destroy(this._rootNode);
  }

  _setRef(componentNode) {
      this._rootNode = componentNode;
  }

  render() {
    return <svg style={vizStyle} id="example-viz" ref={this._setRef.bind(this)}></svg>
  }

}

export default ExampleViz;
