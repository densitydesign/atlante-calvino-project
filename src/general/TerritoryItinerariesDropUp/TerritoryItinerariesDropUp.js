
import React from 'react';

import RadioButton from '../RadioButton/RadioButton';

import './TerritoryItinerariesDropUp.css';

export default class TerritoryItinerariesDropUp extends React.Component
{
  static get doubtButtonId() { return "doubtButton"; }
  doubtButtonCaption = "NEBBIA";

  static get spaceButtonId() { return "spaceButton"; }
  spaceButtonCaption = "LUOGHI";

  static get shapeButtonId() { return  "shapeButton"; }
  shapeButtonCaption = "ELENCHI";

  render()
  {
    return (
      <div className="territory-itineraries-drop-up">

        <RadioButton
          id={TerritoryItinerariesDropUp.doubtButtonId}
          caption={this.doubtButtonCaption}
          buttonColor={"black"}
          pressed={false}
          callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed}
        />

        <RadioButton
          id={TerritoryItinerariesDropUp.spaceButtonId}
          caption={this.spaceButtonCaption}
          buttonColor={"black"}
          pressed={false}
          callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed}
        />

        <RadioButton
          id={TerritoryItinerariesDropUp.shapeButtonId}
          caption={this.shapeButtonCaption}
          buttonColor={"black"}
          pressed={false}
          callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed}
        />

      </div>
    );
  }
}