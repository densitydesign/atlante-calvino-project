import React, { Component } from 'react';
import V from './rusty.d3.js';

class RustyVizSpatialization extends Component {
  _setRef(componentNode) {
    this._rootNode = componentNode;
  }
  componentDidMount(){
    const bbox = this._rootNode.getBoundingClientRect();
    const options = {
      container: this._rootNode,
      width: bbox.width,
      height: bbox.height,
      data: this.props.data.sort((a,b)=>b.length-a.length)
    };
    V.init(options);
  }
  render() {
    const style={
      width: '100%',
      height: '100%'
    }
    return <div style={style} ref={this._setRef.bind(this)}></div>;
  }
}

export default RustyVizSpatialization;
