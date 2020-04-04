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
    // console.log('folding line update');
    if (this.props.data && this.props.data !== prevProps.data){
      const options = {
        data: this.props.data
      }
      V.update(options)
    }
  }

  componentWillUnmount() {
    // console.log('folding line unmount');
  }

  render() {
    const style = {
      height: '100%',
      width: '85%',
      display: this.props.data?'block':'none',
      marginBottom: 'var(--navigation-height)',
      float:'left'
    }
    const style2 = {
      height: '100%',
      width: '15%',
      display: this.props.data?'block':'none',
      marginBottom: 'var(--navigation-height)'
    }
    return <div style={{height: '50%'}}>
      <svg id="folding-line" style={style} ref={this._setRef.bind(this)}></svg>
      <svg id="folding-line-legend" style={style2}>
        <rect width="calc(100% - 15px)" height="287" x="7.5" fill="white" stroke="black" />
        <text font-weight="600" y="22" x="15">
          DETTAGLIO
          <tspan font-weight="400" font-size="0.75rem" dy="18.2" x="15">Clicca una o più coppie</tspan>
          <tspan font-weight="400" font-size="0.75rem" dy="14" x="15">per evidenziare</tspan>
        </text>
      </svg>
    </div>;
  }
}

export default FoldingLine;
