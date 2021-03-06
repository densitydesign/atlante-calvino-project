import React, { Component } from 'react';
import * as d3 from 'd3';
import V from './FoldingLine.d3';
import './FoldingLine.css';

import ToggleSwitch from '../../general/ToggleSwitch';

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
      data: this.props.data,
      showLabels:this.state.showLabels,
      showMisto:this.state.showMisto
    }
    V.initialize(options);
  }

  componentDidUpdate(prevProps,prevState) {
    // console.log('folding line update');
    if (this.props.data && this.props.data !== prevProps.data){
      const options = {
        data: this.props.data,
        showLabels:this.state.showLabels,
        showMisto:this.state.showMisto
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
      height: 'calc(100% - 174px)',
      width: '100%',
      display: this.props.data?'block':'none',
    }
    return <div style={{height: 'calc(50% + 174px)'}}>
      <div className="title-comportamento"
          style={{
            height:58,
            fontWeight:600,
            display:"flex",
            alignItems:"center",
            padding:"0 "+window.innerWidth/24+"px"
          }}>
          ANDAMENTO DEL PROCESSO DUBITATIVO NEL TESTO SELEZIONATO
          <span style={{color:"#666666",marginLeft:"0.5rem",fontSize:"0.8571428571rem",fontStyle:"italic",fontWeight:"400"}}>
            Usa la rotellina del mouse per fare zoom
          </span>
      </div>
      <svg id="folding-line" style={style} ref={this._setRef.bind(this)}></svg>
      <div className="legend-comportamento"
          style={{
            height: '170px',
            paddingBottom:4,
            backgroundColor:"#f3f3f3",
            display:'grid',
            gridTemplateColumns: '[margin-left] 2fr [col-1] 11fr [col-2] 11fr [col-3] 11fr [col-4] 11fr [margin-right] 2fr',
            gridTemplateRows: '[headers] 26px [switches] 26px [descriptions] auto',
            alignItems:'start'
          }}>
            
          {/* <h4 style={{gridColumnStart:'col-1',gridRowStart:'headers',paddingLeft:24}}>Tipi di testo</h4>
          <h4 style={{gridColumnStart:'col-2',gridRowStart:'headers',paddingLeft:24}}>Fenomeno dubitativo</h4>
          <h4 style={{gridColumnStart:'col-3',gridRowStart:'headers',paddingLeft:24}}>Annidamenti</h4>
          <h4 style={{gridColumnStart:'col-4',gridRowStart:'headers',paddingLeft:24}}>Testo misto</h4> */}

          {/* <div style={{gridColumnStart:'col-2',gridRowStart:'switches'}}>
            
          </div>
          <div style={{gridColumnStart:'col-4',gridRowStart:'switches'}}>
            
          </div> */}
          
          <div style={{gridColumnStart:'col-1',gridRowStart:'switches',alignSelf:'start'}}>
            {[['Oggetto di dubbio',"#FFD850"],['Dubitativo',"#CFCFFF"],['Dubitativo e oggetto di dubbio',"#4CD3B9"]].map((c,i)=>{
              return <div key={'color'+i}>
                <span style={{backgroundColor:c[1],display:'inline-block',width:16,height:8,borderRadius:4,marginRight:8}}></span>{c[0]}
              </div>
            })}
            <span style={{display:'block',marginTop:5}}>Mostra</span>
            <ToggleSwitch label="Etichette" background_active="#707070" onChange={()=>this.setState({showLabels:!this.state.showLabels})}/>
            <ToggleSwitch label="Dubitativo e oggetto di dubbio" background_active="#05c19d" onChange={()=>this.setState({showMisto:!this.state.showMisto})}/>
          </div>
          <div style={{gridColumnStart:'col-2',gridRowStart:'headers',gridRowEnd:'span 3'}}>
            <img width="235" src={process.env.PUBLIC_URL + '/legenda-dubbio2-comportamento-fenomenodubitativo.svg'} />
          </div>
          <div style={{gridColumnStart:'col-3',gridRowStart:'headers',gridRowEnd:'span 3'}}>
            <img width="235" src={process.env.PUBLIC_URL + '/legenda-dubbio2-comportamento-annidamenti.svg'} />
          </div>
          <div style={{gridColumnStart:'col-4',gridRowStart:'headers',gridRowEnd:'span 3'}}>
            <img width="235" src={process.env.PUBLIC_URL + '/legenda-dubbio2-comportamento-testomisto.svg'} />
          </div>

      </div>
    </div>;
  }
}

export default FoldingLine;
