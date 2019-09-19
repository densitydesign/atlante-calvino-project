import React, { Component } from 'react';
import './PlacesMatrix.css';

import MatrixD3 from './MatrixD3';

class PlacesMatrix extends Component {

  // static propTypes = {...}

  componentDidMount() {
      // D3 Code to create the chart
      this._chart = MatrixD3.create(
          this._rootNode,
          this.props.data,
          this.props.config
      );
  }

  componentDidUpdate() {
      // D3 Code to update the chart
      // D3Line.update(
      //    this._rootNode,this.props.data,
      //    this.props.config,
      //    this._chart
      // );
  }

  componentWillUnmount() {
      // D3Line.destroy(this._rootNode);
  }

  _setRef(componentNode) {
      this._rootNode = componentNode;
  }

  render() {
    return <svg id="places-matrix" ref={this._setRef.bind(this)}></svg>;
  }
}

export default PlacesMatrix;
