
import React from 'react';

import RadioButton from '../../general/RadioButton/RadioButton';
import './TerritoryplaceHierarchiesSubPanel.css';

export default class TerritoryplaceHierarchiesSubPanel extends React.Component
{
  render()
  {
    return (
      <div className="territory-placeHierarchies-subpanel">
      <div className="title-panel"><h4>Meduse</h4></div>

        <RadioButton id={this.props.placeHierarchiesRadioButtonId}
        caption={this.props.placeHierarchiesRadioButtonCaption}
        pressed={this.props.placeHierarchiesRadioButtonPressed}
        callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed} />

      </div>
    );
  }
}
