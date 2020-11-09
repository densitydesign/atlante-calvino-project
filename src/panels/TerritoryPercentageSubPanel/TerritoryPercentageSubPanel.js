import React from "react"
import classnames from "classnames"
import RadioButton from "../../general/RadioButton/RadioButton"
import "./TerritoryPercentageSubPanel.css"
import { withTranslation } from "react-i18next"

class TerritoryPercentageSubPanel extends React.Component {
  render() {
    const { isDouble } = this.props
    return (
      <div
        className={classnames({
          "territory-percentage-subpanel": !isDouble,
          "territory-percentage-subpanel-double": isDouble,
        })}
      >
        <div className={classnames("title-panel", { "mr-2": isDouble })}>
          <h4>{this.props.t('footer.proporzione')}</h4>
        </div>
        <RadioButton
          id={this.props.percentageRadioButtonId}
          caption={this.props.percentageRadioButtonCaption}
          pressed={this.props.percentageRadioButtonPressed}
          callStateContainerRadioButtonPressed={
            this.props.callStateContainerRadioButtonPressed
          }
        />
      </div>
    )
  }
}

export default withTranslation('territorio')(TerritoryPercentageSubPanel)