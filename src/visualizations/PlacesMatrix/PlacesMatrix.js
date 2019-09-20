import React, { Component } from 'react';
import V from './matrix.d3'

class PlacesMatrix extends Component {
  componentDidMount() {
    this._chart = V.initialize(
        this._rootNode,
        this.props.data
    );
  }

  componentDidUpdate() {
    V.update(
       this.props.data,
       this.props.fitlers
    );
  }

  componentWillUnmount() {
    V.destroy(this._rootNode);
  }

  _setRef(componentNode) {
      this._rootNode = componentNode;
  }


  render() {
    return <svg id={this.props.id} ref={this._setRef.bind(this)}></svg>
  }
}

export default PlacesMatrix;
