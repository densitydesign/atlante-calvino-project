
import React from 'react';

import RadioButton from '../../general/RadioButton/RadioButton';
import GlobalData from '../../utilities/GlobalData';

import './TerritoryShapeMainOptionsSubPanel.css';

export default class TerritoryShapeMainOptionsSubPanel extends React.Component
{
  render()
  {
    return (
      <div className="territory-shape-main-options-subpanel">
      <div className="title-panel"><h4>Tipologie di Elenco</h4></div>
        <RadioButton
          id={this.props.typesRadioButtonId}
          caption={this.props.typesRadioButtonCaption}
          pressed={this.props.typesRadioButtonPressed}
          callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed}
        />
        <div className="categories-panel-shape">
          <h4 style={{ color : GlobalData.visualizationColors.territory.misto }}>Misto</h4>
          <h4 style={{ color : GlobalData.visualizationColors.territory.parole }}>Parole</h4>
          <h4 style={{ color : GlobalData.visualizationColors.territory.sintagmi }}>Sintagmi</h4>
          <h4 style={{ color : GlobalData.visualizationColors.territory.frasi }}>Frasi</h4></div>
      </div>
    );
  }
}
