

import React from 'react';

import RadioButton from '../RadioButton/RadioButton';

import './TerritoryNoAnalysisDropDown.css';

export default class TerritoryNoAnalysisDropDown extends React.Component
{
  static get chronologyButtonId() { return "doubtButton"; }
  chronologyButtonCaption = "CRONOLOGIA";

  static get volumesButtonId() { return "spaceButton"; }
  volumesButtonCaption = "VOLUMI";

  render()
  {
    return (
      <div className="territory-no-analysis-drop-down">

        <RadioButton
          id={TerritoryNoAnalysisDropDown.chronologyButtonId}
          caption={this.chronologyButtonCaption}
          buttonColor={"white"}
          pressed={false}
          callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed}
        />

        <RadioButton
          id={TerritoryNoAnalysisDropDown.volumesButtonId}
          caption={this.volumesButtonCaption}
          buttonColor={"white"}
          pressed={false}
          callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed}
        />

      </div>
    );
  }
}