
import React from 'react';

import DoubtMainOptionsSubPanel from '../DoubtMainOptionsSubPanel/DoubtMainOptionsSubPanel';
import PercentageSubPanel from '../PercentageSubPanel/PercentageSubPanel';
import GlobalData from '../../utilities/GlobalData';

import './DoubtPanel.css';

export default class DoubtPanel extends React.Component
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
    [ this.fogRadioButtonId,          { value : GlobalData.commands.territory.doubt.fog } ],
    [ this.cancellationRadioButtonId, { value : GlobalData.commands.territory.doubt.cancellation } ],
    [ this.allRadioButtonId,          { value : GlobalData.commands.territory.doubt.all } ],
    [ this.percentageRadioButtonId,   { value : GlobalData.commands.territory.doubt.percentage } ]
  ]);

  optionRadioButtonPressed = buttonId => {
    const buttonState = this.state.optionRadioButtonsStates.find(item => item.id === buttonId);

    if(buttonState.pressed) return;

    const optionRadioButtonsStatesCopy = [...this.state.optionRadioButtonsStates];

    const buttonStateCopy = optionRadioButtonsStatesCopy.find(item => item.id === buttonId);
    buttonStateCopy.pressed = true;

    const otherButtons = optionRadioButtonsStatesCopy.filter(item => item.id != buttonId);
    otherButtons.forEach(button => button.pressed = false);

    this.setState({ optionRadioButtonsStates : optionRadioButtonsStatesCopy });

    this.props.callTerritorySetHighlightMode(this.optionRadioButtonsMap.get(buttonId).value);
  }

  render()
  {
    return (
      <div className="doubt-panel">
        <div></div>
        <DoubtMainOptionsSubPanel 
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
        <PercentageSubPanel
          callStateContainerRadioButtonPressed={this.optionRadioButtonPressed}

          percentageRadioButtonId={this.percentageRadioButtonId}
          percentageRadioButtonCaption={this.percentageRadioButtonCaption}
          percentageRadioButtonPressed={this.state.optionRadioButtonsStates.find(item => item.id === this.percentageRadioButtonId).pressed}
        />
      </div>
    );
  }
}