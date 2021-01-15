
import React from 'react';

import RadioButton from '../../general/RadioButton/RadioButton';
import './TerritoryPlaceHierarchiesSubPanel.css';
import { withTranslation } from "react-i18next"

class TerritoryPlaceHierarchiesSubPanel extends React.Component
{
  render()
  {
    return (
      <div className="territory-placeHierarchies-subpanel">
      <div className="title-panel mr-2" style={{ width: 120 }}><h4>{this.props.t('footer.dettagliBtn')}</h4></div>

        <RadioButton id={this.props.placeHierarchiesRadioButtonId}
        caption={this.props.placeHierarchiesRadioButtonCaption}
        pressed={this.props.placeHierarchiesRadioButtonPressed}
        callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed} />

      </div>
    );
  }
}

export default withTranslation('territorio')(TerritoryPlaceHierarchiesSubPanel)