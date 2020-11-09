import React from "react"
import { withTranslation } from "react-i18next"

import RadioButton from "../../general/RadioButton/RadioButton"
import GlobalData from "../../utilities/GlobalData"

import "./TerritorySpaceMainOptionsSubPanel.css"

class TerritorySpaceMainOptionsSubPanel extends React.Component {
  render() {
    return (
      <>
        <div className="categories-panel">
          <h4>{this.props.t('footer.tipo_di_luogo')}</h4>
        </div>

        <div className="territory-space-main-options-subpanel">
          <div className="d-flex">
            <RadioButton
              id={this.props.genericTerrestrialRadioButtonId}
              caption={this.props.genericTerrestrialRadioButtonCaption}
              buttonColor={
                GlobalData.visualizationColors.territory
                  .generico_terrestre_bright
              }
              pressed={this.props.genericTerrestrialRadioButtonPressed}
              callStateContainerRadioButtonPressed={
                this.props.callStateContainerRadioButtonPressed
              }
            />
            <RadioButton
              id={this.props.genericCosmicRadioButtonId}
              caption={this.props.genericCosmicRadioButtonCaption}
              buttonColor={
                GlobalData.visualizationColors.territory.generico_cosmico_bright
              }
              pressed={this.props.genericCosmicRadioButtonPressed}
              callStateContainerRadioButtonPressed={
                this.props.callStateContainerRadioButtonPressed
              }
            />
            <RadioButton
              id={this.props.inventedRadioButtonId}
              caption={this.props.inventedRadioButtonCaption}
              buttonColor={
                GlobalData.visualizationColors.territory.inventato_bright
              }
              pressed={this.props.inventedRadioButtonPressed}
              callStateContainerRadioButtonPressed={
                this.props.callStateContainerRadioButtonPressed
              }
            />
          </div>
          <div className="d-flex">
            <RadioButton
              id={this.props.namedTerrestrialRadioButtonId}
              caption={this.props.namedTerrestrialRadioButtonCaption}
              buttonColor={
                GlobalData.visualizationColors.territory
                  .nominato_terrestre_bright
              }
              pressed={this.props.namedTerrestrialRadioButtonPressed}
              callStateContainerRadioButtonPressed={
                this.props.callStateContainerRadioButtonPressed
              }
            />
            <RadioButton
              id={this.props.namedCosmicRadioButtonId}
              caption={this.props.namedCosmicRadioButtonCaption}
              buttonColor={
                GlobalData.visualizationColors.territory.nominato_cosmico_bright
              }
              pressed={this.props.namedCosmicRadioButtonPressed}
              callStateContainerRadioButtonPressed={
                this.props.callStateContainerRadioButtonPressed
              }
            />

            <RadioButton
              id={this.props.noSettingRadioButtonId}
              caption={this.props.noSettingRadioButtonCaption}
              buttonColor={
                GlobalData.visualizationColors.territory.no_ambientazione_bright
              }
              pressed={this.props.noSettingRadioButtonPressed}
              callStateContainerRadioButtonPressed={
                this.props.callStateContainerRadioButtonPressed
              }
            />
          </div>
        </div>
      </>
    )
  }
}

export default withTranslation('luoghi')(TerritorySpaceMainOptionsSubPanel)
