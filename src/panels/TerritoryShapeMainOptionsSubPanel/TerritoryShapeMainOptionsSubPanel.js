
import React from 'react';

import RadioButton from '../../general/RadioButton/RadioButton';

import './TerritoryShapeMainOptionsSubPanel.css';

export default class TerritoryShapeMainOptionsSubPanel extends React.Component
{
  render()
  {
    return (
      <div className="territory-shape-main-options-subpanel">

        <RadioButton 
          id={this.props.typesRadioButtonId} 
          caption={this.props.typesRadioButtonCaption} 
          pressed={this.props.typesRadioButtonPressed} 
          callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed} 
        />

      </div>
    );
  }
}