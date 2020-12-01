
import React from 'react';

import RadioButton from '../RadioButton/RadioButton';

import './TerritoryItinerariesDropUp.css';

export default class TerritoryItinerariesDropUp extends React.Component
{
  static get doubtButtonId() { return "doubtButton"; }
  doubtButtonCaption = "Nebbia";

  static get spaceButtonId() { return "spaceButton"; }
  spaceButtonCaption = "Luoghi";

  static get shapeButtonId() { return  "shapeButton"; }
  shapeButtonCaption = "Elenchi";

  render()
  {
    return (
      <div className="territory-itineraries-drop-up">

        <RadioButton
          linkRefresh={'/doubt/phase1'}
          id={TerritoryItinerariesDropUp.doubtButtonId}
          router={this.props.router}
          caption={this.doubtButtonCaption}
          buttonColor={"black"}
          buttonUpClass={"radio-button-drop-up"}
          pressed={false}
          callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed}
        />

        <RadioButton
          linkRefresh={'/space/phase1'}
          id={TerritoryItinerariesDropUp.spaceButtonId}
          caption={this.spaceButtonCaption}
          buttonColor={"black"}
          buttonUpClass={"radio-button-drop-up"}
          pressed={false}
          callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed}
        />

        <RadioButton
          linkRefresh={'/form/phase1'}
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
