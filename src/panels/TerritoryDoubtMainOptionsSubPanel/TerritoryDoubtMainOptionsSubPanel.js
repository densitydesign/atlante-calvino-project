
import React from 'react';

import RadioButton from '../../general/RadioButton/RadioButton';

import './TerritoryDoubtMainOptionsSubPanel.css';

export default class TerritoryDoubtMainOptionsSubPanel extends React.Component
{
  render()
  {
    return (
      <div className="territory-doubt-main-options-subpanel">

        <RadioButton 
          id={this.props.fogRadioButtonId} 
          caption={this.props.fogRadioButtonCaption} 
          pressed={this.props.fogRadioButtonPressed} 
          callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed} 
        />

        <RadioButton 
          id={this.props.cancellationRadioButtonId} 
          caption={this.props.cancellationRadioButtonCaption} 
          pressed={this.props.cancellationRadioButtonPressed} 
          callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed} 
        />

        <RadioButton 
          id={this.props.allRadioButtonId} 
          caption={this.props.allRadioButtonCaption} 
          pressed={this.props.allRadioButtonPressed} 
          callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed} 
        />

      </div>
    );
  }
}