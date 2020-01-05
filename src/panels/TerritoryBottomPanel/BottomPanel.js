
import React from 'react';

import DoubtPanel from '../../panels/DoubtPanel/DoubtPanel';

import './BottomPanel.css';

export default class BottomPanel extends React.Component
{
  render()
  {
    return (
      <div className="bottom-panel">
        <div className="button-grid">
          <span>DUBBIO</span>
          <span>SPAZIO</span>
          <span>FORMA</span>
        </div>
        <DoubtPanel callTerritorySetHighlightMode={this.props.callTerritorySetHighlightMode} />
      </div>
    );
  }
}