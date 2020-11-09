
import React from 'react';

import TerritoryItinerariesPanel from '../TerritoryItinerariesPanel/TerritoryItinerariesPanel';
//import TerritoryLegendPanel from '../TerritoryLegendPanel/TerritoryLegendPanel';
import TerritoryTimelinePanel from '../TerritoryTimelinePanel/TerritoryTimelinePanel';

// import PullDownButton from '../../general/PullDownButton/PullDownButton';

import './TerritoryBottomPanel.css';

import GlobalData from '../../utilities/GlobalData';

export default class TerritoryBottomPanel extends React.Component
{
  render()
  {
    let internalPanel;

    switch(true)
    {
      case 
        this.props.bottomPanelPosition === GlobalData.bottomPanelPositions.closed ||
        this.props.bottomPanelMode     === GlobalData.bottomPanelModes.noAnalysis :

        return <></>;

      case this.props.bottomPanelMode === GlobalData.bottomPanelModes.doubt :
      case this.props.bottomPanelMode === GlobalData.bottomPanelModes.shape :
      case this.props.bottomPanelMode === GlobalData.bottomPanelModes.space :

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

      case this.props.bottomPanelMode === GlobalData.bottomPanelModes.chronologicalFilter :

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

        case this.props.bottomPanelMode === GlobalData.bottomPanelModes.chronology :

          internalPanel = (
            <div>
              <div>
                Cronologia
              </div>
            </div>
          );
  
          break;

      case this.props.bottomPanelMode === GlobalData.bottomPanelModes.legend :

        internalPanel = (
          <div></div>// <TerritoryLegendPanel page={this.props.legendPage} />
        );

        break;
        

      default : internalPanel = <></>
    }

    return (

      <div className="territory-bottom-panel">
        { internalPanel }

      </div>

    );
  }
}
