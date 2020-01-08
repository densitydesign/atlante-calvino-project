
import React from 'react';
/*
import TerritoryDoubtPanel from '../TerritoryDoubtPanel/TerritoryDoubtPanel';

import './TerritoryBottomPanel.css';
*/

import TerritoryLegendPanel from '../TerritoryLegendPanel/TerritoryLegendPanel';
import TerritoryTimelinePanel from '../TerritoryTimelinePanel/TerritoryTimelinePanel';

export default class TerritoryBottomPanel extends React.Component
{
  render()
  {    

if(this.props.callTerritoryApplyBeeSwarmFilter)
{
  console.log("TerritoryBottomPanel.render() - this.props.callTerritoryApplyBeeSwarmFilter has value");
}
else
{
  console.log("TerritoryBottomPanel.render() - this.props.callTerritoryApplyBeeSwarmFilter null");
}


/*        <TerritoryLegendPanel /> */    
    return (
      <TerritoryTimelinePanel 
        data={this.props.data}
        callTerritoryShowHills={this.props.callTerritoryShowHills}
        callTerritorySetDataExtent={this.props.callTerritorySetDataExtent}
        callTerritoryApplyBeeSwarmFilter={this.props.callTerritoryApplyBeeSwarmFilter} />
    );
  }
}