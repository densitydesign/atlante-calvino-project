import React, { Component } from 'react';
import * as d3 from 'd3';
import V from './FoldingLine.d3';

import './FoldingLine.css'

class FoldingLine extends Component {
  constructor(props){
    super(props);
    this.state = {
      showLabels:false,
      showMisto:false
    }
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

  componentDidUpdate(prevProps,prevState) {
    // console.log('folding line update');
    if (this.props.data && this.props.data !== prevProps.data){
      const options = {
        data: this.props.data
      }
      V.update(options)
    }
    if (prevState.showLabels!==this.state.showLabels)
    {
      V.toggleLabels(this.state.showLabels);
    } else if(prevState.showMisto!==this.state.showMisto)
    {
      V.toggleMisto(this.state.showMisto);
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
        <text fontWeight="600" y="22" x="15">
          DETTAGLIO
          <tspan fontWeight="400" fontSize="0.75rem" dy="18.2" x="15">Clicca una o più coppie</tspan>
          <tspan fontWeight="400" fontSize="0.75rem" dy="14" x="15">per evidenziare</tspan>
        </text>
        <g transform="translate(15,80)" onClick={()=>this.setState({showLabels:!this.state.showLabels})}>
          <text fontSize="0.75rem">
            {this.state.showLabels?'Nascondi etichette':'Mostra etichette'}
          </text>
        </g>
        <g transform="translate(15,100)" onClick={()=>this.setState({showMisto:!this.state.showMisto})}>
          <text fontSize="0.75rem">
            {this.state.showMisto?'Nascondi testo misto':'Mostra testo misto'}
          </text>
        </g>
        <image x="15" y="130" width="calc(100% - 30px)" href={process.env.PUBLIC_URL + '/legenda-dubbio-fase2-pt2@2x.png'}></image>
      </svg>
    </div>;
  }
}

export default FoldingLine;
