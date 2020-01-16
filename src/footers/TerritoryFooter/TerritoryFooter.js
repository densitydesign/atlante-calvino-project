
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
  doubtLabel = "dubbio";
  shapeLabel = "forma";
  realismLabel = "realismo";

  stepLabelOptionPanelModeMap = new Map([
    [ this.territoryLabel, GlobalData.bottomPanelModes.noAnalysis ],
    [ this.doubtLabel, GlobalData.bottomPanelModes.doubt ],
    [ this.shapeLabel, GlobalData.bottomPanelModes.shape ],
    [ this.realismLabel, GlobalData.bottomPanelModes.realism ]
  ]);

  toggleButtonsMap = new Map([
    [ this.legendToggleButtonId,              { bottomPanelMode : GlobalData.bottomPanelModes.legend } ],
    [ this.chronologicalFilterToggleButtonId, { bottomPanelMode : GlobalData.bottomPanelModes.chronologicalFilter } ]
  ]);

  state = {
    steps : {
      multiple : false,
      options : [
        { label : this.territoryLabel, status : true },
        { label : this.doubtLabel,     status : false },
        { label : this.shapeLabel,     status : false },
        { label : this.realismLabel,   status : false }
      ]
    },
    toggleButtonsStates : [
      { id : this.legendToggleButtonId,              pressed : this.props.bottomPanelMode === this.toggleButtonsMap.get(this.legendToggleButtonId).doubtPanelMode },
      { id : this.chronologicalFilterToggleButtonId, pressed : this.props.bottomPanelMode === this.toggleButtonsMap.get(this.chronologicalFilterToggleButtonId).doubtPanelMode }
    ]
  };



// set here bottom panel mode, rather than higlight mode
//  changeSteps = newOptions => this.props.callTerritorySetHighlightMode(this.getActiveOption(newOptions));
  changeSteps = newOptions => this.props.setBottomPanelMode(this.stepLabelOptionPanelModeMap.get(this.getActiveOption(newOptions)));

  getActiveOption = options => options.find(item => item.status === true).label;

  toggleButtonPressed = buttonId => {
    const buttonState = this.state.toggleButtonsStates.find(item => item.id === buttonId);

    const toggleButtonsStatesCopy = [...this.state.toggleButtonsStates];

    const buttonStateCopy = toggleButtonsStatesCopy.find(item => item.id === buttonId);
    buttonStateCopy.pressed = !buttonStateCopy.pressed;

    this.setState({ toggleButtonsStates : toggleButtonsStatesCopy });

    const value = this.toggleButtonsMap.get(buttonId);
console.log("setBottomPanelMode()");    
    this.props.setBottomPanelMode(value.bottomPanelMode);
  };

  render()
  {
    return (
      <div className="bottom-nav navigations">

        <Options
          title="Tappe"
          data={this.state.steps}
          style={{ gridColumn : "span 8", textAlign : "center" }}
          changeOptions={this.changeSteps}
        />

        <ToggleButton 
          id={this.chronologicalFilterToggleButtonId} 
          caption={this.chronologicalFilterToggleButtonCaption} 
          pressed={this.state.toggleButtonsStates.find(item => item.id === this.chronologicalFilterToggleButtonId).pressed} 
          callStateContainerToggleButtonPressed={this.toggleButtonPressed} 
        />

        <ToggleButton 
          id={this.legendToggleButtonId} 
          caption={this.legendToggleButtonCaption} 
          pressed={this.state.toggleButtonsStates.find(item => item.id === this.legendToggleButtonId).pressed} 
          callStateContainerToggleButtonPressed={this.toggleButtonPressed} 
        />

      </div>
    );
  }
}