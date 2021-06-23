import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import V from './rusty.d3.js';

class RustyViz extends Component {
  _setRef(componentNode) {
    this._rootNode = componentNode;
  }
  componentDidMount(){
    const bbox = this._rootNode.getBoundingClientRect();
    const options = {
      container: this._rootNode,
      width: bbox.width,
      height: bbox.height,
      data: this.props.data,
      lang: this.props.i18n.language,
    };
    V.init(options);
  }
  componentDidUpdate(prevProps){
    if(prevProps.color!==this.props.color){
      V.changeColor(this.props.color);
    } else if (prevProps.filter!==this.props.filter){
      V.filter(this.props.filter);
    }
  }
  render() {
    const style={
      width: '100%',
      height: '100%',
      width: '1644.094px',
      height: '816.945px'
    }
    return <div style={style} ref={this._setRef.bind(this)}></div>;
  }
}

export default withTranslation()(RustyViz);
