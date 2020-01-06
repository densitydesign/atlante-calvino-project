
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
      <TerritoryTimelinePanel callTerritoryShowHills={this.props.callTerritoryShowHills} />
    );
  }
}