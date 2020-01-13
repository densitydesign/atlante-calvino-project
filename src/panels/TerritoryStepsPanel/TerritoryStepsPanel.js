
import React from 'react';

import TerritoryDoubtPanel from '../TerritoryDoubtPanel/TerritoryDoubtPanel';
import TerritoryShapePanel from '../TerritoryShapePanel/TerritoryShapePanel';
import TerritoryRealismPanel from '../TerritoryRealismPanel/TerritoryRealismPanel';

import './TerritoryStepsPanel.css';

import GlobalData from '../../utilities/GlobalData';

export default class TerritoryStepsPanel extends React.Component
{
  render()
  {
    let rendering;

    switch(this.props.bottomPanelMode)
    {
      case GlobalData.bottomPanelModes.doubt :

        rendering = (
          <TerritoryDoubtPanel 
            callTerritorySetHighlightMode={this.props.callTerritorySetHighlightMode} 
            doubtPanelMode={this.props.doubtPanelMode}
          />
        );

        break;

      case GlobalData.bottomPanelModes.shape :

        rendering = (
          <TerritoryShapePanel 
            callTerritorySetHighlightMode={this.props.callTerritorySetHighlightMode}
            shapePanelMode={this.props.shapePanelMode}
          />
        );

        break;
        
      case GlobalData.bottomPanelModes.realism :

        rendering = (
          <TerritoryRealismPanel 
            callTerritorySetHighlightMode={this.props.callTerritorySetHighlightMode} 
            realismPanelMode={this.props.realismPanelMode}
          />
        );

        break;
      
      default : rendering = <></>;
    }

    return (
      <div className="territory-steps-panel">
        <div className="territory-button-grid">
          <span>DUBBIO</span>
          <span>SPAZIO</span>
          <span>FORMA</span>
        </div>
        {rendering}
      </div>
    );
  }
}
