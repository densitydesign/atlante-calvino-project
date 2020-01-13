
import React from 'react';

import TerritoryDoubtMainOptionsSubPanel from '../TerritoryDoubtMainOptionsSubPanel/TerritoryDoubtMainOptionsSubPanel';
import TerritoryPercentageSubPanel from '../TerritoryPercentageSubPanel/TerritoryPercentageSubPanel';
import GlobalData from '../../utilities/GlobalData';

import './TerritoryDoubtPanel.css';

export default class TerritoryDoubtPanel extends React.Component
{
  fogRadioButtonId = "fogRadioButton";
  fogRadioButtonCaption = "NEBBIA";

  cancellationRadioButtonId = "cancellationRadioButton";
  cancellationRadioButtonCaption = "CANCELLAZIONE";

  allRadioButtonId = "allRadioButton";
  allRadioButtonCaption = "TUTTO";

  percentageRadioButtonId = "percentageRadioButton";
  percentageRadioButtonCaption = "%";

  state = {
    optionRadioButtonsStates : [
      { id : this.fogRadioButtonId,          pressed : false },
      { id : this.cancellationRadioButtonId, pressed : false },
      { id : this.allRadioButtonId,          pressed : false },
      { id : this.percentageRadioButtonId,   pressed : false }
    ]
  };

  optionRadioButtonsMap = new Map([
    [ this.fogRadioButtonId,          { value : GlobalData.analysisModes.doubt.fog } ],
    [ this.cancellationRadioButtonId, { value : GlobalData.analysisModes.doubt.cancellation } ],
    [ this.allRadioButtonId,          { value : GlobalData.analysisModes.doubt.all } ],
    [ this.percentageRadioButtonId,   { value : GlobalData.analysisModes.doubt.percentage } ]
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
  }

  render()
  {
    return (
      <div className="territory-doubt-panel">
        <div></div>
        <TerritoryDoubtMainOptionsSubPanel 
          callStateContainerRadioButtonPressed={this.optionRadioButtonPressed}

          fogRadioButtonId={this.fogRadioButtonId}
          fogRadioButtonCaption={this.fogRadioButtonCaption}
          fogRadioButtonPressed={this.state.optionRadioButtonsStates.find(item => item.id === this.fogRadioButtonId).pressed}

          cancellationRadioButtonId={this.cancellationRadioButtonId}
          cancellationRadioButtonCaption={this.cancellationRadioButtonCaption}
          cancellationRadioButtonPressed={this.state.optionRadioButtonsStates.find(item => item.id === this.cancellationRadioButtonId).pressed}

          allRadioButtonId={this.allRadioButtonId}
          allRadioButtonCaption={this.allRadioButtonCaption}
          allRadioButtonPressed={this.state.optionRadioButtonsStates.find(item => item.id === this.allRadioButtonId).pressed}
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