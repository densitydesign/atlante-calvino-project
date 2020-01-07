
import React from 'react';

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
    return (
      <div className="territory-timeline-panel">
        Timeline
        <svg width="200" height="200">
          <rect width="100" height="100" style={{ fill : "rgb(0, 255, 0)" }} onClick={this.rectClick} />
        </svg>
      </div>
    );
  }
}