import React from "react"
import { withTranslation } from "react-i18next"

import RadioButton from "../../general/RadioButton/RadioButton"
import GlobalData from "../../utilities/GlobalData"

import "./TerritoryShapeMainOptionsSubPanel.css"

class TerritoryShapeMainOptionsSubPanel extends React.Component {
  render() {
    return (
      <div className="territory-shape-main-options-subpanel">
        <div className="title-panel">
          <h4>{this.props.t('elenchi:footer.tipo_di_elenco')}</h4>
        </div>
        <RadioButton
          id={this.props.typesRadioButtonId}
          caption={this.props.typesRadioButtonCaption}
          pressed={this.props.typesRadioButtonPressed}
          callStateContainerRadioButtonPressed={
            this.props.callStateContainerRadioButtonPressed
          }
        />
        <div className="categories-panel-shape">
          <div
            style={{ color: GlobalData.visualizationColors.territory.misto }}
          >
            {this.props.t('elenchi:footer.Misto')}
          </div>
          <div
            style={{ color: GlobalData.visualizationColors.territory.parole }}
          >
            {this.props.t('elenchi:footer.Parole')}
          </div>
          <div
            style={{ color: GlobalData.visualizationColors.territory.sintagmi }}
          >
            {this.props.t('elenchi:footer.Sintagmi')}
          </div>
          <div
            style={{ color: GlobalData.visualizationColors.territory.frasi }}
          >
            {this.props.t('elenchi:footer.Proposizioni')}
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation(['translation','elenchi'])(TerritoryShapeMainOptionsSubPanel)
