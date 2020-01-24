
import React from 'react';

import RadioButton from '../../general/RadioButton/RadioButton';
import './TerritoryPercentagePanel.css';

export default class TerritoryPercentageSubPanel extends React.Component
{
  render()
  {
    return (
      <div className="territory-percentage-subpanel">
      <div className="title-panel"><h4>Percentuale</h4></div>
        <RadioButton id={this.props.percentageRadioButtonId}
        caption={this.props.percentageRadioButtonCaption}
        pressed={this.props.percentageRadioButtonPressed}
        callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed} />
      </div>
    );
  }
}
