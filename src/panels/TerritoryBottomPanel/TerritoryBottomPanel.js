
import React from 'react';

import TerritoryDoubtPanel from '../TerritoryDoubtPanel/TerritoryDoubtPanel';

import './TerritoryBottomPanel.css';

export default class TerritoryBottomPanel extends React.Component
{
  render()
  {
    return (
      <div className="territory-bottom-panel">
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