
import React from 'react';

import TerritoryRealismMainOptionsSubPanel from '../TerritoryRealismMainOptionsSubPanel/TerritoryRealismMainOptionsSubPanel';
import TerritoryPercentageSubPanel from '../TerritoryPercentageSubPanel/TerritoryPercentageSubPanel';
import GlobalData from '../../utilities/GlobalData';

import './TerritorySpacePanel.css';

export default class TerritorySpacePanel extends React.Component
{
  genericNonTerrestrialRadioButtonId = "genericNonTerrestrialRadioButton";
  genericNonTerrestrialRadioButtonCaption = "GENERICI";

  namedNonTerrestrialRadioButtonId = "namedNonTerrestrialRadioButton";
  namedNonTerrestrialRadioButtonCaption = "NOMINATI";

  genericTerrestrialRadioButtonId = "genericTerrestrialRadioButton";
  genericTerrestrialRadioButtonCaption = "GENERICI";

  namedTerrestrialRadioButtonId = "namedTerrestrialRadioButton";
  namedTerrestrialRadioButtonCaption = "NOMINATI";

  inventedRadioButtonId = "inventedRadioButton";
  inventedRadioButtonCaption = "INVENTATI";

  noSettingRadioButtonId = "noSettingRadioButton";
  noSettingRadioButtonCaption = "NO AMBIENT";

  proportionRadioButtonId = "proportionRadioButton";
  proportionRadioButtonCaption = "%";

  placeHierarchiesRadioButtonId = "placeHierarchiesRadioButton";
  placeHierarchiesRadioButtonCaption = "MEDUSE";

  optionRadioButtonsMap = new Map([
    [ this.genericNonTerrestrialRadioButtonId, { analysisMode : GlobalData.analysisModes.realism.genericNonTerrestrial, realismPanelMode : GlobalData.analysisPanelModes.realism.genericNonTerrestrial } ],
    [ this.namedNonTerrestrialRadioButtonId,   { analysisMode : GlobalData.analysisModes.realism.namedNonTerrestrial,   realismPanelMode : GlobalData.analysisPanelModes.realism.namedNonTerrestrial } ],
    [ this.genericTerrestrialRadioButtonId,    { analysisMode : GlobalData.analysisModes.realism.genericTerrestrial,    realismPanelMode : GlobalData.analysisPanelModes.realism.genericTerrestrial } ],
    [ this.namedTerrestrialRadioButtonId,      { analysisMode : GlobalData.analysisModes.realism.namedTerrestrial,      realismPanelMode : GlobalData.analysisPanelModes.realism.namedTerrestrial } ],
    [ this.inventedRadioButtonId,              { analysisMode : GlobalData.analysisModes.realism.invented,              realismPanelMode : GlobalData.analysisPanelModes.realism.invented } ],    
    [ this.noSettingRadioButtonId,             { analysisMode : GlobalData.analysisModes.realism.noSetting,             realismPanelMode : GlobalData.analysisPanelModes.realism.noSetting } ],
    [ this.proportionRadioButtonId,            { analysisMode : GlobalData.analysisModes.realism.proportion,            realismPanelMode : GlobalData.analysisPanelModes.realism.proportion } ],
    [ this.placeHierarchiesRadioButtonId,      { analysisMode : GlobalData.analysisModes.realism.placeHierarchies,      realismPanelMode : GlobalData.analysisPanelModes.realism.placeHierarchies } ]
  ]);  

  state = {
    optionRadioButtonsStates : [
      { id : this.genericNonTerrestrialRadioButtonId, pressed : this.props.realismPanelMode === this.optionRadioButtonsMap.get(this.genericNonTerrestrialRadioButtonId).realismPanelMode },
      { id : this.namedNonTerrestrialRadioButtonId,   pressed : this.props.realismPanelMode === this.optionRadioButtonsMap.get(this.namedNonTerrestrialRadioButtonId).realismPanelMode },
      { id : this.genericTerrestrialRadioButtonId,    pressed : this.props.realismPanelMode === this.optionRadioButtonsMap.get(this.genericTerrestrialRadioButtonId).realismPanelMode },
      { id : this.namedTerrestrialRadioButtonId,      pressed : this.props.realismPanelMode === this.optionRadioButtonsMap.get(this.namedTerrestrialRadioButtonId).realismPanelMode },
      { id : this.inventedRadioButtonId,              pressed : this.props.realismPanelMode === this.optionRadioButtonsMap.get(this.inventedRadioButtonId).realismPanelMode },
      { id : this.noSettingRadioButtonId,             pressed : this.props.realismPanelMode === this.optionRadioButtonsMap.get(this.noSettingRadioButtonId).realismPanelMode },
      { id : this.proportionRadioButtonId,            pressed : this.props.realismPanelMode === this.optionRadioButtonsMap.get(this.proportionRadioButtonId).realismPanelMode },
      { id : this.placeHierarchiesRadioButtonId,      pressed : this.props.realismPanelMode === this.optionRadioButtonsMap.get(this.placeHierarchiesRadioButtonId).realismPanelMode }
    ]
  };

  optionRadioButtonPressed = buttonId => {
    const buttonState = this.state.optionRadioButtonsStates.find(item => item.id === buttonId);

    if(buttonState.pressed) return;

    const optionRadioButtonsStatesCopy = [...this.state.optionRadioButtonsStates];

    const buttonStateCopy = optionRadioButtonsStatesCopy.find(item => item.id === buttonId);
    buttonStateCopy.pressed = true;

    const otherButtons = optionRadioButtonsStatesCopy.filter(item => item.id !== buttonId);
    otherButtons.forEach(button => button.pressed = false);

    this.setState({ optionRadioButtonsStates : optionRadioButtonsStatesCopy });

    const value = this.optionRadioButtonsMap.get(buttonId);
    this.props.callTerritorySetHighlightMode(value.analysisMode);
    this.props.containerSetRealismPanelMode(value.realismPanelMode);
  };  

  render()
  {
    return (
      <div className="territory-space-panel">
        <div></div>
        <TerritoryRealismMainOptionsSubPanel 
          callStateContainerRadioButtonPressed={this.optionRadioButtonPressed}

          genericNonTerrestrialRadioButtonId={this.genericNonTerrestrialRadioButtonId}
          genericNonTerrestrialRadioButtonCaption={this.genericNonTerrestrialRadioButtonCaption}
          genericNonTerrestrialRadioButtonPressed={this.state.optionRadioButtonsStates.find(item => item.id === this.genericNonTerrestrialRadioButtonId).pressed}

          namedNonTerrestrialRadioButtonId={this.namedNonTerrestrialRadioButtonId}
          namedNonTerrestrialRadioButtonCaption={this.namedNonTerrestrialRadioButtonCaption}
          namedNonTerrestrialRadioButtonPressed={this.state.optionRadioButtonsStates.find(item => item.id === this.namedNonTerrestrialRadioButtonId).pressed}

          genericTerrestrialRadioButtonId={this.genericTerrestrialRadioButtonId}
          genericTerrestrialRadioButtonCaption={this.genericTerrestrialRadioButtonCaption}
          genericTerrestrialRadioButtonPressed={this.state.optionRadioButtonsStates.find(item => item.id === this.genericTerrestrialRadioButtonId).pressed}          

          namedTerrestrialRadioButtonId={this.namedTerrestrialRadioButtonId}
          namedTerrestrialRadioButtonCaption={this.namedTerrestrialRadioButtonCaption}
          namedTerrestrialRadioButtonPressed={this.state.optionRadioButtonsStates.find(item => item.id === this.namedTerrestrialRadioButtonId).pressed}

          inventedRadioButtonId={this.inventedRadioButtonId}
          inventedRadioButtonCaption={this.inventedRadioButtonCaption}
          inventedRadioButtonPressed={this.state.optionRadioButtonsStates.find(item => item.id === this.inventedRadioButtonId).pressed}

          noSettingRadioButtonId={this.noSettingRadioButtonId}
          noSettingRadioButtonCaption={this.noSettingRadioButtonCaption}
          noSettingRadioButtonPressed={this.state.optionRadioButtonsStates.find(item => item.id === this.noSettingRadioButtonId).pressed}

          placeHierarchiesRadioButtonId={this.placeHierarchiesRadioButtonId}
          placeHierarchiesRadioButtonCaption={this.placeHierarchiesRadioButtonCaption}
          placeHierarchiesRadioButtonPressed={this.state.optionRadioButtonsStates.find(item => item.id === this.placeHierarchiesRadioButtonId).pressed}
        />
        <TerritoryPercentageSubPanel
          callStateContainerRadioButtonPressed={this.optionRadioButtonPressed}

          percentageRadioButtonId={this.proportionRadioButtonId}
          percentageRadioButtonCaption={this.proportionRadioButtonCaption}
          percentageRadioButtonPressed={this.state.optionRadioButtonsStates.find(item => item.id === this.proportionRadioButtonId).pressed}
        />
      </div>
    );
  }
}