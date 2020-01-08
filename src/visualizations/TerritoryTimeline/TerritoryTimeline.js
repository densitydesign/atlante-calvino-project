
import React from 'react';

import V from './territoryTimeline.d3';

export default class TerritoryTimeline extends React.Component
{
  componentDidMount()
  {
console.log("TerritoryTimeline.componentDidMount");
console.log("this.props.data : ", this.props.data);    
    V.initialize(this._rootNode, this.props.data);    
  }

  componentWillUnmount()
  {
    V.destroy(this._rootNode);
  }

  _setRef = componentNode => this._rootNode = componentNode;

  render()
  {
    return <svg id={this.props.id} width="100%" ref={this._setRef}></svg>;
  }
}