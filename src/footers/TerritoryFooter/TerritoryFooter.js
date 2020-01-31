
import React from 'react';
import Options from '../../general/Options/Options';
import ToggleButton from '../../general/ToggleButton/ToggleButton';
import GlobalData from '../../utilities/GlobalData';
import TerritoryItinerariesDropUp from '../../general/TerritoryItinerariesDropUp/TerritoryItinerariesDropUp';

import '../../App.css';

export default class TerritoryFooter extends React.Component
{
  territoryLabel = "TERRITORIO";
      doubtLabel = "NEBBIA";
      spaceLabel = "LUOGHI";
      shapeLabel = "ELENCHI";

  itineraryLabelOptionPanelModeMap = new Map([
    [ this.territoryLabel, { bottomPanelMode : GlobalData.bottomPanelModes.noAnalysis, mainAnalysisMode : GlobalData.analysisModes.noAnalysis } ],
    [ this.doubtLabel,     { bottomPanelMode : GlobalData.bottomPanelModes.doubt,      mainAnalysisMode : GlobalData.analysisModes.doubt } ],
    [ this.spaceLabel,     { bottomPanelMode : GlobalData.bottomPanelModes.space,      mainAnalysisMode : GlobalData.analysisModes.space } ],
    [ this.shapeLabel,     { bottomPanelMode : GlobalData.bottomPanelModes.shape,      mainAnalysisMode : GlobalData.analysisModes.shape } ]    
  ]);

  analysisButtonVisualizationModeMap = new Map([
    [ TerritoryItinerariesDropUp.doubtButtonId, { bottomPanelMode : GlobalData.bottomPanelModes.doubt, mainAnalysisMode : GlobalData.analysisModes.doubt } ],
    [ TerritoryItinerariesDropUp.spaceButtonId, { bottomPanelMode : GlobalData.bottomPanelModes.space, mainAnalysisMode : GlobalData.analysisModes.space } ],
    [ TerritoryItinerariesDropUp.shapeButtonId, { bottomPanelMode : GlobalData.bottomPanelModes.shape, mainAnalysisMode : GlobalData.analysisModes.shape } ]
  ]);

  analysisModeItineraryMap = new Map([
    [ GlobalData.analysisModes.noAnalysis, { label : this.territoryLabel, bottomPanelMode : GlobalData.bottomPanelModes.noAnalysis } ],
    [ GlobalData.analysisModes.doubt,      { label : this.doubtLabel,     bottomPanelMode : GlobalData.bottomPanelModes.doubt } ],
    [ GlobalData.analysisModes.space,      { label : this.spaceLabel,     bottomPanelMode : GlobalData.bottomPanelModes.space } ],
    [ GlobalData.analysisModes.shape,      { label : this.shapeLabel,     bottomPanelMode : GlobalData.bottomPanelModes.shape } ]
  ]);

  analysisModeToggleButtonId = "analysisModeToggleButton";
  analysisModeToggleButtonCaption = "FILTRO CRONOLOGICO";

  chronologicalFilterToggleButtonId = "chronologicalFilterToggleButton";
  chronologicalFilterToggleButtonCaption = "FILTRO CRONOLOGICO";

  legendToggleButtonId = "legendToggleButton";
  legendToggleButtonCaption = "LEGENDA";

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
        { label : this.spaceLabel,     status : false },
        { label : this.shapeLabel,     status : false }        
      ]
    }
  };

// set here bottom panel mode, rather than higlight mode
  changeItineraries = newOptions => {
    const visualizationMode = this.itineraryLabelOptionPanelModeMap.get(this.getActiveOption(newOptions));

    this.props.setBottomPanelMode(visualizationMode.bottomPanelMode);
    this.props.setMainAnalysisMode(visualizationMode.mainAnalysisMode);
  }

  getActiveOption = options => options.find(item => item.status === true).label;

  toggleButtonPressed = buttonId => {    
console.log("-------------------");
console.log("toggleButtonPressed");
console.log("buttonId", buttonId);
console.log("this.props.mainAnalysisMode", this.props.mainAnalysisMode);        
console.log("this.props.bottomPanelMode", this.props.bottomPanelMode);

    switch(buttonId)
    {
      case this.analysisModeToggleButtonId :
        if(this.props.mainAnalysisMode === GlobalData.analysisModes.noAnalysis)
        {
console.log("toggle drop up");          
          this.props.toggleItineraryDropUpPosition();
        }
        else 
        {
console.log("toggle bottom panel");
          this.props.toggleBottomPanelPosition();
        }

        break;

      case TerritoryItinerariesDropUp.doubtButtonId :
      case TerritoryItinerariesDropUp.spaceButtonId :
      case TerritoryItinerariesDropUp.shapeButtonId :

        const visualizationMode = this.analysisButtonVisualizationModeMap.get(buttonId);

        this.props.toggleItineraryDropUpPosition();
        this.props.setBottomPanelMode(visualizationMode.bottomPanelMode);
        this.props.setMainAnalysisMode(visualizationMode.mainAnalysisMode);

        break;

      case this.chronologicalFilterToggleButtonId :
      case this.legendToggleButtonId :
console.log("1");
        const value = this.toggleButtonsMap.get(buttonId);
console.log("value", value);

        if(value.bottomPanelMode !== this.props.bottomPanelMode)
        {
console.log("2");          
          this.props.setBottomPanelMode(value.bottomPanelMode);
          this.props.setBottomPanelPosition(GlobalData.bottomPanelPositions.open);
        }
        else
        {
console.log("3"); 
          if(this.props.mainAnalysisMode === GlobalData.analysisModes.noAnalysis)
          {
console.log("4");
            this.props.setBottomPanelMode(GlobalData.bottomPanelModes.noAnalysis);
          }
          else
          {
const xxx = this.analysisModeItineraryMap.get(this.props.mainAnalysisMode).bottomPanelMode;
console.log("xxx", xxx);

            this.props.setBottomPanelMode(xxx);
            this.props.setBottomPanelPosition(GlobalData.bottomPanelPositions.closed);
          }
        }

        break;

      default : console.log("buttonId", buttonId);
    }
  };

  componentDidMount()
  {
    this.props.containerSetItineraryDropUpRadioButtonPressed(this.toggleButtonPressed);
  }

  render()
  {
console.log("this.props.mainAnalysisMode", this.props.mainAnalysisMode);
    return (
      <div className="bottom-nav navigations">

        <ToggleButton 
          id={this.analysisModeToggleButtonId} 
          style={{ gridColumn : "span 8" }}
          caption={
            this.analysisModeItineraryMap.get(this.props.mainAnalysisMode).label}
          pressed={this.props.mainAnalysisMode !== GlobalData.analysisModes.noAnalysis}
          callStateContainerToggleButtonPressed={this.toggleButtonPressed} 
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
