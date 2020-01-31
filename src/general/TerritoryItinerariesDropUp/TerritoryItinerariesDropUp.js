
import React from 'react';

import RadioButton from '../RadioButton/RadioButton';

import './TerritoryItinerariesDropUp.css';

export default class TerritoryItinerariesDropUp extends React.Component
{
  radioButtonPressed = buttonId => console.log("buttonId", buttonId);

  render()
  {
    return (
      <div className="territory-itineraries-drop-up">

        <RadioButton
          id={"b1"}
          caption={"b1"}
          buttonColor={"red"}
          pressed={false}
          callStateContainerRadioButtonPressed={this.radioButtonPressed}
        />

        <RadioButton
          id={"b2"}
          caption={"b2"}
          buttonColor={"green"}
          pressed={false}
          callStateContainerRadioButtonPressed={this.radioButtonPressed}
        />

        <RadioButton
          id={"b3"}
          caption={"b3"}
          buttonColor={"blue"}
          pressed={false}
          callStateContainerRadioButtonPressed={this.radioButtonPressed}
        />

      </div>
    );
  }
}