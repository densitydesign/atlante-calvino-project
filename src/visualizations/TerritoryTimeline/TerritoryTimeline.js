
import React from 'react';

import V from './territoryTimeline.d3';

export default class TerritoryTimeline extends React.Component
{
  componentDidMount()
  {
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