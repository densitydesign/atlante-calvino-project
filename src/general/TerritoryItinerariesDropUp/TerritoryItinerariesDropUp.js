
import React from 'react';

import RadioButton from '../RadioButton/RadioButton';

import './TerritoryItinerariesDropUp.css';

class TerritoryItinerariesDropUp extends React.Component
{
  static get doubtButtonId() { return "doubtButton"; }
  doubtButtonCaption = "nebbia";

  static get spaceButtonId() { return "spaceButton"; }
  spaceButtonCaption = "luoghi";

  static get shapeButtonId() { return  "shapeButton"; }
  shapeButtonCaption = "elenchi";

  render()
  {
    return (
      <div className="territory-itineraries-drop-up">

        <RadioButton
          id={TerritoryItinerariesDropUp.doubtButtonId}
          router={this.props.router}
          caption={this.doubtButtonCaption}
          buttonColor={"black"}
          buttonUpClass={"radio-button-drop-up"}
          pressed={false}
          callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed}
        />

        <RadioButton
          id={TerritoryItinerariesDropUp.spaceButtonId}
          caption={this.spaceButtonCaption}
          buttonColor={"black"}
          buttonUpClass={"radio-button-drop-up"}
          pressed={false}
          callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed}
        />

        <RadioButton
          id={TerritoryItinerariesDropUp.shapeButtonId}
          caption={this.shapeButtonCaption}
          buttonColor={"black"}
          buttonUpClass={"radio-button-drop-up"}
          pressed={false}
          callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed}
        />

      </div>
    );
  }
}

export default TerritoryItinerariesDropUp