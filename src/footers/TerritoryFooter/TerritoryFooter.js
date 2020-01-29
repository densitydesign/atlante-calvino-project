
import React from 'react';
import Options from '../../general/Options/Options';
import ToggleButton from '../../general/ToggleButton/ToggleButton';
import GlobalData from '../../utilities/GlobalData';

import '../../App.css';

export default class TerritoryFooter extends React.Component
{
  legendToggleButtonId = "legendToggleButton";
  legendToggleButtonCaption = "LEGENDA";

  chronologicalFilterToggleButtonId = "chronologicalFilterToggleButton";
  chronologicalFilterToggleButtonCaption = "FILTRO CRONOLOGICO";

  territoryLabel = "territorio";
  doubtLabel = "nebbia";
  shapeLabel = "elenchi";
  spaceLabel = "luoghi";

  stepLabelOptionPanelModeMap = new Map([
    [ this.territoryLabel, { bottomPanelMode : GlobalData.bottomPanelModes.noAnalysis, mainAnalysisMode : GlobalData.analysisModes.noAnalysis } ],
    [ this.doubtLabel,     { bottomPanelMode : GlobalData.bottomPanelModes.doubt,      mainAnalysisMode : GlobalData.analysisModes.doubt } ],
    [ this.shapeLabel,     { bottomPanelMode : GlobalData.bottomPanelModes.shape,      mainAnalysisMode : GlobalData.analysisModes.shape } ],
    [ this.spaceLabel,     { bottomPanelMode : GlobalData.bottomPanelModes.space,      mainAnalysisMode : GlobalData.analysisModes.space } ]
  ]);

  toggleButtonsMap = new Map([
    [ this.legendToggleButtonId,              { bottomPanelMode : GlobalData.bottomPanelModes.legend } ],
    [ this.chronologicalFilterToggleButtonId, { bottomPanelMode : GlobalData.bottomPanelModes.chronologicalFilter } ]
  ]);

  state = {
    itineraries : {
      multiple : false,
      options : [
        { label : this.territoryLabel, status : true },
        { label : this.doubtLabel,     status : false },
        { label : this.shapeLabel,     status : false },
        { label : this.spaceLabel,     status : false }
      ]
    }
  };



// set here bottom panel mode, rather than higlight mode
  changeItineraries = newOptions => {
    const visualizationMode = this.stepLabelOptionPanelModeMap.get(this.getActiveOption(newOptions));

    this.props.setBottomPanelMode(visualizationMode.bottomPanelMode);
    this.props.setMainAnalysisMode(visualizationMode.mainAnalysisMode);
  }

  getActiveOption = options => options.find(item => item.status === true).label;

  toggleButtonPressed = buttonId => {

    const value = this.toggleButtonsMap.get(buttonId);

    if(value.bottomPanelMode !== this.props.bottomPanelMode)
      this.props.setBottomPanelMode(value.bottomPanelMode);
    else
      this.props.setBottomPanelMode(GlobalData.bottomPanelModes.noAnalysis);
  };

  render()
  {
    return (
      <div className="bottom-nav navigations">

        <Options
          title="Sfere"
          data={this.state.itineraries}
          style={{ gridColumn : "span 8", textAlign : "center" }}
          changeOptions={this.changeItineraries}
        />

        <ToggleButton
          id={this.chronologicalFilterToggleButtonId}
          style={{ gridColumn : "span 8" }}
          caption={this.chronologicalFilterToggleButtonCaption}
          pressed={
            this.props.bottomPanelMode === this.toggleButtonsMap.get(this.chronologicalFilterToggleButtonId).bottomPanelMode ||
            !matchPair(this.props.dataExtent, GlobalData.defaultTerritoryDataExtent)
          }
          callStateContainerToggleButtonPressed={this.toggleButtonPressed}
        />

        <ToggleButton
          id={this.legendToggleButtonId}
          style={{ gridColumn : "span 8" }}
          caption={this.legendToggleButtonCaption}
          pressed={this.props.bottomPanelMode === this.toggleButtonsMap.get(this.legendToggleButtonId).bottomPanelMode}
          callStateContainerToggleButtonPressed={this.toggleButtonPressed}
        />

      </div>
    );
  }
}

function matchPair(p1, p2)
{
  return p1[0] <= p2[0] && p1[1] >= p2[1];
}
