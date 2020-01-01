
import React from 'react';

import DoubtMainOptionsSubPanel from '../DoubtMainOptionsSubPanel/DoubtMainOptionsSubPanel';
import PercentageSubPanel from '../PercentageSubPanel/PercentageSubPanel';

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
      { id : this.fogRadioButtonId, pressed : true },
      { id : this.cancellationRadioButtonId, pressed : false },
      { id : this.allRadioButtonId, pressed : false },
      { id : this.percentageRadioButtonId, pressed : false }
    ]
  };

  optionRadioButtonsMap = new Map();

  optionRadioButtonPressed = id => {
    const pressedButtonState = this.state.optionRadioButtonsStates.find(item => item.id === id);

    if(pressedButtonState.pressed) return;

    const optionRadioButtonsStatesCopy = [...this.state.optionRadioButtonsStates];

    const pressedButtonStateCopy = optionRadioButtonsStatesCopy.find(item => item.id === id);

    pressedButtonStateCopy.pressed = true;

    const otherButtons = optionRadioButtonsStatesCopy.filter(item => item.id != id);

    otherButtons.forEach(button => button.pressed = false);

    this.setState({ optionRadioButtonsStates : optionRadioButtonsStatesCopy });
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