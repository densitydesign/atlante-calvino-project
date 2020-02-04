
import React from 'react';

import RadioButton from '../../general/RadioButton/RadioButton';
import GlobalData from '../../utilities/GlobalData'

import './TerritoryDoubtMainOptionsSubPanel.css';

export default class TerritoryDoubtMainOptionsSubPanel extends React.Component
{
  render()
  {
    return (
      <>
                   <div className="title-panel"><h4>Tipologie di Elenco</h4></div>
      <div className="territory-doubt-main-options-subpanel">
        <RadioButton
          id={this.props.fogRadioButtonId}
          caption={this.props.fogRadioButtonCaption}
          buttonColor={GlobalData.visualizationColors.territory.nebbia_bright}
          pressed={this.props.fogRadioButtonPressed}
          callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed}
        />

        <RadioButton
          id={this.props.cancellationRadioButtonId}
          caption={this.props.cancellationRadioButtonCaption}
          buttonColor={GlobalData.visualizationColors.territory.cancellazione_bright}
          pressed={this.props.cancellationRadioButtonPressed}
          callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed}
        />

        <RadioButton
          id={this.props.allRadioButtonId}
          caption={this.props.allRadioButtonCaption}
          buttonColor={GlobalData.visualizationColors.territory.allDubitative_bright}
          pressed={this.props.allRadioButtonPressed}
          callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed}
        />

      </div>
      </>
    );
  }
}
