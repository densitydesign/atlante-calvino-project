import React, { Component } from 'react';
import * as d3 from 'd3';
import V from './FoldingLine.d3';

import './FoldingLine.css'

class FoldingLine extends Component {
  constructor(props){
    super(props);
  }
  _setRef(componentNode) {
    this._rootNode = componentNode;
  }
  componentDidMount(){
    console.log('folding line mount');
    const options = {
      element: this._rootNode,
      data: this.props.data
    }
    V.initialize(options);
  }

  componentDidUpdate(prevProps) {
    console.log('folding line update');
    if (this.props.data && this.props.data !== prevProps.data){
      const options = {
        data: this.props.data
      }
      V.update(options)
    }
  }

  componentWillUnmount() {
    console.log('folding line unmount');
  }

  render() {
    const style = {
      height: '50%',
      width: '100%',
      display: this.props.data?'block':'none',
      marginBottom: 'var(--navigation-height)'
    }
    return <svg id="folding-line" style={style} ref={this._setRef.bind(this)}></svg>;
  }
}

export default FoldingLine;
