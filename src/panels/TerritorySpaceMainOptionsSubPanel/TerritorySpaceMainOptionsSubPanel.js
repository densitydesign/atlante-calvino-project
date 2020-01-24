
import React from 'react';

import RadioButton from '../../general/RadioButton/RadioButton';
import GlobalData from '../../utilities/GlobalData'

import './TerritorySpaceMainOptionsSubPanel.css'

export default class TerritorySpaceMainOptionsSubPanel extends React.Component
{
  render()
  {
    return (                  <>
                <div className="categories-panel"><h4>TERRESTRI</h4><h4>NON TERRESTRI</h4><h4>ALTRO</h4></div>

      <div className="territory-space-main-options-subpanel">
        <RadioButton
          id={this.props.genericNonTerrestrialRadioButtonId}
          caption={this.props.genericNonTerrestrialRadioButtonCaption}
          buttonColor={GlobalData.visualizationColors.territory.generico_non_terrestre_color_scale_end}
          pressed={this.props.genericNonTerrestrialRadioButtonPressed}
          callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed}
        />

        <RadioButton
          id={this.props.namedNonTerrestrialRadioButtonId}
          caption={this.props.namedNonTerrestrialRadioButtonCaption}
          buttonColor={GlobalData.visualizationColors.territory.nominato_non_terrestre_color_scale_end}
          pressed={this.props.namedNonTerrestrialRadioButtonPressed}
          callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed}
        />

        <RadioButton
          id={this.props.genericTerrestrialRadioButtonId}
          caption={this.props.genericTerrestrialRadioButtonCaption}
          buttonColor={GlobalData.visualizationColors.territory.generico_terrestre_color_scale_end}
          pressed={this.props.genericTerrestrialRadioButtonPressed}
          callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed}
        />

        <RadioButton
          id={this.props.namedTerrestrialRadioButtonId}
          caption={this.props.namedTerrestrialRadioButtonCaption}
          buttonColor={GlobalData.visualizationColors.territory.nominato_terrestre_color_scale_end}
          pressed={this.props.namedTerrestrialRadioButtonPressed}
          callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed}
        />

        <RadioButton
          id={this.props.inventedRadioButtonId}
          caption={this.props.inventedRadioButtonCaption}
          buttonColor={GlobalData.visualizationColors.territory.inventato_color_scale_end}
          pressed={this.props.inventedRadioButtonPressed}
          callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed}
        />

        <RadioButton
          id={this.props.noSettingRadioButtonId}
          caption={this.props.noSettingRadioButtonCaption}
          buttonColor={GlobalData.visualizationColors.territory.no_ambientazione_color_scale_end}
          pressed={this.props.noSettingRadioButtonPressed}
          callStateContainerRadioButtonPressed={this.props.callStateContainerRadioButtonPressed}
        />
      </div>
           </>
    );
  }
}
