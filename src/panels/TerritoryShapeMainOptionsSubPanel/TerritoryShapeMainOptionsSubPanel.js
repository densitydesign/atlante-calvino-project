
import React from 'react';

import RadioButton from '../../general/RadioButton/RadioButton';

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
<div className="categories-panel"><h4>Misto</h4><h4>Parole</h4><h4>Sintagmi</h4><h4>Frasi</h4></div>
      </div>
    );
  }
}
