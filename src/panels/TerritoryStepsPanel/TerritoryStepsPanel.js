
import React from 'react';

import TerritoryDoubtPanel from '../TerritoryDoubtPanel/TerritoryDoubtPanel';

import './TerritoryStepsPanel.css';

export default class TerritoryStepsPanel extends React.Component
{
  render()
  {
    return (
      <div className="territory-steps-panel">
        <div className="territory-button-grid">
          <span>DUBBIO</span>
          <span>SPAZIO</span>
          <span>FORMA</span>
        </div>
        <TerritoryDoubtPanel callTerritorySetHighlightMode={this.props.callTerritorySetHighlightMode} />
      </div>
    );
  }
}
