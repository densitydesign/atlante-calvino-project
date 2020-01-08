
import React from 'react';

import TerritoryTimelineWrapper from '../../visualizations/TerritoryTimeline/TerritoryTimelineWrapper';

import './TerritoryTimelinePanel.css';

export default class TerritoryTimelinePanel extends React.Component
{
  rectClick = () => {
//    this.props.callTerritoryShowHills(0);    
    this.props.callTerritorySetDataExtent([1950, 1960]);
    this.props.callTerritoryApplyBeeSwarmFilter();
  }

  render()
  {
if(this.props.callTerritoryApplyBeeSwarmFilter)
{
  console.log("TerritoryTimelinePanel.render() - this.props.callTerritoryApplyBeeSwarmFilter has value");
}
else
{
  console.log("TerritoryTimelinePanel.render() - this.props.callTerritoryApplyBeeSwarmFilter null");
}


    return (
      <div className="territory-timeline-panel">
        <TerritoryTimelineWrapper 
          data={this.props.data}
          callTerritorySetDataExtent={this.props.callTerritorySetDataExtent}
          callTerritoryApplyBeeSwarmFilter={this.props.callTerritoryApplyBeeSwarmFilter} />
      </div>
    );
  }
}