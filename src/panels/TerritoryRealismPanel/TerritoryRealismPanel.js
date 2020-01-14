
import React from 'react';

import TerritoryRealismMainOptionsSubPanel from '../TerritoryRealismMainOptionsSubPanel/TerritoryRealismMainOptionsSubPanel';
import TerritoryPercentageSubPanel from '../TerritoryPercentageSubPanel/TerritoryPercentageSubPanel';
import GlobalData from '../../utilities/GlobalData';

import './TerritoryRealismPanel.css';

export default class TerritoryRealismPanel extends React.Component
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

  percentageRadioButtonId = "percentageRadioButton";
  percentageRadioButtonCaption = "%";

  state = {
    optionRadioButtonsStates : [
      { id : this.genericNonTerrestrialRadioButtonId, pressed : false },
      { id : this.namedNonTerrestrialRadioButtonId,   pressed : false },
      { id : this.genericTerrestrialRadioButtonId,    pressed : false },
      { id : this.namedTerrestrialRadioButtonId,      pressed : false },
      { id : this.inventedRadioButtonId,              pressed : false },      
      { id : this.noSettingRadioButtonId,             pressed : false },
      { id : this.percentageRadioButtonId,            pressed : false }
    ]
  };

  optionRadioButtonsMap = new Map([
    [ this.genericNonTerrestrialRadioButtonId, { value : GlobalData.analysisModes.realism.genericNonTerrestrial } ],
    [ this.namedNonTerrestrialRadioButtonId,   { value : GlobalData.analysisModes.realism.namedNonTerrestrial } ],
    [ this.genericTerrestrialRadioButtonId,    { value : GlobalData.analysisModes.realism.genericTerrestrial } ],
    [ this.namedTerrestrialRadioButtonId,      { value : GlobalData.analysisModes.realism.namedTerrestrial } ],
    [ this.inventedRadioButtonId,              { value : GlobalData.analysisModes.realism.invented } ],    
    [ this.noSettingRadioButtonId,             { value : GlobalData.analysisModes.realism.noSetting } ],
    [ this.percentageRadioButtonId,            { value : GlobalData.analysisModes.realism.percentage } ]
  ]);

  optionRadioButtonPressed = buttonId => {
    const buttonState = this.state.optionRadioButtonsStates.find(item => item.id === buttonId);

    if(buttonState.pressed) return;

    const optionRadioButtonsStatesCopy = [...this.state.optionRadioButtonsStates];

    const buttonStateCopy = optionRadioButtonsStatesCopy.find(item => item.id === buttonId);
    buttonStateCopy.pressed = true;

    const otherButtons = optionRadioButtonsStatesCopy.filter(item => item.id !== buttonId);
    otherButtons.forEach(button => button.pressed = false);

    this.setState({ optionRadioButtonsStates : optionRadioButtonsStatesCopy });

    this.props.callTerritorySetHighlightMode(this.optionRadioButtonsMap.get(buttonId).value);
  };  

  render()
  {
    return (
      <div className="territory-doubt-panel">
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
        />
        <TerritoryPercentageSubPanel
          callStateContainerRadioButtonPressed={this.optionRadioButtonPressed}

          percentageRadioButtonId={this.percentageRadioButtonId}
          percentageRadioButtonCaption={this.percentageRadioButtonCaption}
          percentageRadioButtonPressed={this.state.optionRadioButtonsStates.find(item => item.id === this.percentageRadioButtonId).pressed}
        />
      </div>
    );
  }
}