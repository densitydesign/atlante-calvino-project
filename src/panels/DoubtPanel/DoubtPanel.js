
import React from 'react';

import DoubtMainOptionsSubPanel from '../DoubtMainOptionsSubPanel/DoubtMainOptionsSubPanel';

import './DoubtPanel.css';

export default class DoubtPanel extends React.Component
{
  fogRadioButtonId = "fog";
  fogRadioButtonCaption = "NEBBIA";

  cancellationRadioButtonId = "cancellation";
  cancellationRadioButtonCaption = "CANCELLAZIONE";

  allRadioButtonId = "all";
  allRadioButtonCaption = "TUTTO";  

  state = {
    optionRadioButtonsStates : [
      { id : this.fogRadioButtonId, pressed : true },
      { id : this.cancellationRadioButtonId, pressed : false },
      { id : this.allRadioButtonId, pressed : false }
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
      </div>
    );
  }
}