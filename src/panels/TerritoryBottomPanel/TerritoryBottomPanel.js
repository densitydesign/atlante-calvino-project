
import React from 'react';

import TerritoryItinerariesPanel from '../TerritoryItinerariesPanel/TerritoryItinerariesPanel';
import TerritoryLegendPanel from '../TerritoryLegendPanel/TerritoryLegendPanel';
import TerritoryTimelinePanel from '../TerritoryTimelinePanel/TerritoryTimelinePanel';

import PullDownButton from '../../general/PullDownButton/PullDownButton';

import './TerritoryBottomPanel.css';

import GlobalData from '../../utilities/GlobalData';

export default class TerritoryBottomPanel extends React.Component
{
  render()
  {
    let internalPanel;

    switch(this.props.bottomPanelMode)
    {
      case GlobalData.bottomPanelModes.noAnalysis : 
      
        internalPanel = <></>; 
        
        break;

      case GlobalData.bottomPanelModes.doubt :
      case GlobalData.bottomPanelModes.shape :
      case GlobalData.bottomPanelModes.space :

        internalPanel = (
          <TerritoryItinerariesPanel 
            
            setMainAnalysisMode={this.props.setMainAnalysisMode}
            callTerritorySetHighlightMode={this.props.callTerritorySetHighlightMode}

            bottomPanelMode={this.props.bottomPanelMode}
            containerSetBottomPanelMode={this.props.containerSetBottomPanelMode}

            doubtPanelMode={this.props.doubtPanelMode}
            containerSetDoubtPanelMode={this.props.containerSetDoubtPanelMode}

            shapePanelMode={this.props.shapePanelMode}
            containerSetShapePanelMode={this.props.containerSetShapePanelMode}

            spacePanelMode={this.props.spacePanelMode}
            containerSetSpacePanelMode={this.props.containerSetSpacePanelMode}
          />
        );

        break;

      case GlobalData.bottomPanelModes.chronologicalFilter :

        internalPanel = (
          <TerritoryTimelinePanel 
            data={this.props.data}
            dataExtent={this.props.dataExtent}
            callTerritoryShowHills={this.props.callTerritoryShowHills}
            callTerritorySetDataExtent={this.props.callTerritorySetDataExtent}
            callTerritoryApplyBeeSwarmFilter={this.props.callTerritoryApplyBeeSwarmFilter}
          />
        );

        break;

      case GlobalData.bottomPanelModes.legend :

        internalPanel = (
          <TerritoryLegendPanel page={this.props.legendPage} />
        );

        break;

      default : internalPanel = <></>
    }

    return (
      
      <div className="territory-bottom-panel">
        { internalPanel }
        <div className="side-container">
          <PullDownButton style={{width : "100%" }} onClicked={this.props.onCloseButtonClicked} />
        </div>
      </div>
      
    );
  }
}