import React, { Component } from 'react';
import './PlacesMatrix.css'
import V from './matrix.d3'

class PlacesMatrix extends Component {
  componentDidMount() {
    this._chart = V.initialize(
        this._rootNode,
        this.props.data,
        this.props.filters,
        this.props.originalData
    );
  }

  componentDidUpdate() {
    V.update(
       null,
       this.props.filters
    );
  }

  componentWillUnmount() {
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

export default PlacesMatrix;
