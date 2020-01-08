
import React from 'react';

import TerritoryTimeline from './TerritoryTimeline';

export default class TerritoryTimelineWrapper extends React.Component
{
  render()
  {
if(this.props.callTerritoryApplyBeeSwarmFilter)
{
  console.log("TerritoryTimelineWrapper.render() - this.props.callTerritoryApplyBeeSwarmFilter has value");
}
else
{
  console.log("TerritoryTimelineWrapper.render() - this.props.callTerritoryApplyBeeSwarmFilter null");
}

    return <TerritoryTimeline 
      data={this.props.data}
      callTerritorySetDataExtent={this.props.callTerritorySetDataExtent}
      callTerritoryApplyBeeSwarmFilter={this.props.callTerritoryApplyBeeSwarmFilter} />
  }
}