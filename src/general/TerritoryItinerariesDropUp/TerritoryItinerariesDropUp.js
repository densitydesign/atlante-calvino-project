
import React from 'react';

import RadioButton from '../RadioButton/RadioButton';

import './TerritoryItinerariesDropUp.css';

export default class TerritoryItinerariesDropUp extends React.Component
{
  static get doubtButtonId() { return "doubtButton"; }
  doubtButtonCaption = "DUBBIO";

  static get spaceButtonId() { return "spaceButton"; }
  spaceButtonCaption = "SPAZIO";

  static get shapeButtonId() { return  "shapeButton"; }
  shapeButtonCaption = "FORMA";

  render()
  {
    return (
      <div className="territory-itineraries-drop-up">

        <RadioButton
          id={TerritoryItinerariesDropUp.doubtButtonId}
          caption={this.doubtButtonCaption}
          buttonColor={"white"}
          pressed={false}
          callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed}
        />

        <RadioButton
          id={TerritoryItinerariesDropUp.spaceButtonId}
          caption={this.spaceButtonCaption}
          buttonColor={"white"}
          pressed={false}
          callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed}
        />

        <RadioButton
          id={TerritoryItinerariesDropUp.shapeButtonId}
          caption={this.shapeButtonCaption}
          buttonColor={"white"}
          pressed={false}
          callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed}
        />

      </div>
    );
  }
}