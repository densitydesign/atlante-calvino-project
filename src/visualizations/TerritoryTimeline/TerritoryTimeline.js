
import React from 'react';

import V from './territoryTimeline.d3';

export default class TerritoryTimeline extends React.Component
{
  componentDidMount()
  {
console.log("TerritoryTimeline.componentDidMount");
console.log("this.props.data : ", this.props.data);    

if(this.props.callTerritoryApplyBeeSwarmFilter)
{
  console.log("TerritoryTimeline.componentDidMount() - this.props.callTerritoryApplyBeeSwarmFilter has value");
}
else
{
  console.log("TerritoryTimeline.componentDidMount() - this.props.callTerritoryApplyBeeSwarmFilter null");
}

    V.initialize(
      this._rootNode, 
      this.props.data,
      this.props.callTerritorySetDataExtent,
      this.props.callTerritoryApplyBeeSwarmFilter);
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