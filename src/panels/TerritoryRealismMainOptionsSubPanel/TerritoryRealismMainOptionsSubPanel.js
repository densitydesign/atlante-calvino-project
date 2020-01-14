
import React from 'react';

import RadioButton from '../../general/RadioButton/RadioButton';

import './TerritoryRealismMainOptionsSubPanel.css'

export default class TerritoryRealismMainOptionsSubPanel extends React.Component
{
  render()
  {
    return (
      <div className="territory-realism-main-options-subpanel">

        <RadioButton 
          id={this.props.genericNonTerrestrialRadioButtonId} 
          caption={this.props.genericNonTerrestrialRadioButtonCaption} 
          pressed={this.props.genericNonTerrestrialRadioButtonPressed} 
          callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed} 
        />

        <RadioButton 
          id={this.props.namedNonTerrestrialRadioButtonId} 
          caption={this.props.namedNonTerrestrialRadioButtonCaption} 
          pressed={this.props.namedNonTerrestrialRadioButtonPressed} 
          callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed} 
        />

        <RadioButton 
          id={this.props.genericTerrestrialRadioButtonId} 
          caption={this.props.genericTerrestrialRadioButtonCaption} 
          pressed={this.props.genericTerrestrialRadioButtonPressed} 
          callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed} 
        />

        <RadioButton 
          id={this.props.namedTerrestrialRadioButtonId} 
          caption={this.props.namedTerrestrialRadioButtonCaption} 
          pressed={this.props.namedTerrestrialRadioButtonPressed} 
          callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed} 
        />

        <RadioButton 
          id={this.props.inventedRadioButtonId} 
          caption={this.props.inventedRadioButtonCaption} 
          pressed={this.props.inventedRadioButtonPressed} 
          callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed} 
        />        

        <RadioButton 
          id={this.props.noSettingRadioButtonId} 
          caption={this.props.noSettingRadioButtonCaption} 
          pressed={this.props.noSettingRadioButtonPressed} 
          callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed} 
        />                

      </div>
    );
  }
}