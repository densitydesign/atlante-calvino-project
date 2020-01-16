
import React from 'react';

import TerritoryStepsPanel from '../TerritoryStepsPanel/TerritoryStepsPanel';

import './TerritoryBottomPanel.css';


import GlobalData from '../../utilities/GlobalData';

import TerritoryLegendPanel from '../TerritoryLegendPanel/TerritoryLegendPanel';
import TerritoryTimelinePanel from '../TerritoryTimelinePanel/TerritoryTimelinePanel';

export default class TerritoryBottomPanel extends React.Component
{
  render()
  {
    let rendering;

    switch(this.props.bottomPanelMode)
    {
      case GlobalData.bottomPanelModes.noAnalysis : rendering = <></>

      case GlobalData.bottomPanelModes.doubt :
      case GlobalData.bottomPanelModes.shape :
      case GlobalData.bottomPanelModes.realism :

        rendering = (
          <TerritoryStepsPanel 
            
            callTerritorySetHighlightMode={this.props.callTerritorySetHighlightMode}

            bottomPanelMode={this.props.bottomPanelMode}
            containerSetBottomPanelMode={this.props.containerSetBottomPanelMode}

            doubtPanelMode={this.props.doubtPanelMode}
            containerSetDoubtPanelMode={this.props.containerSetDoubtPanelMode}

            shapePanelMode={this.props.shapePanelMode}
            containerSetShapePanelMode={this.props.containerSetShapePanelMode}

            realismPanelMode={this.props.realismPanelMode}
            containerSetRealismPanelMode={this.props.containerSetRealismPanelMode}
          />
        );

        break;

      case GlobalData.bottomPanelModes.chronologicalFilter :

        rendering = (
          <TerritoryTimelinePanel 
            data={this.props.data}
            callTerritoryShowHills={this.props.callTerritoryShowHills}
            callTerritorySetDataExtent={this.props.callTerritorySetDataExtent}
            callTerritoryApplyBeeSwarmFilter={this.props.callTerritoryApplyBeeSwarmFilter}
          />
        );

        break;

      case GlobalData.bottomPanelModes.legend :

        rendering = (
          <TerritoryLegendPanel />
        );

        break;

      default : rendering = <></>
    }

    return rendering;
  }
}