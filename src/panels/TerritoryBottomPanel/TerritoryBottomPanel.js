
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