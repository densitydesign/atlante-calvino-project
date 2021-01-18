import React from "react"
import { withTranslation } from "react-i18next"

import "./ToggleButton.css"

class ToggleButton extends React.Component {
  render() {
    const buttonUpClass = this.props.buttonUpClass || "toggle-button-up"
    const buttonDownClass = this.props.buttonDownClass || "toggle-button-down"

    return (
      <div
        id={this.props.id}
        className={
          "toggle-button " +
          (this.props.pressed ? buttonDownClass : buttonUpClass)
        }
        style={this.props.style}
        onClick={() =>
          this.props.callStateContainerToggleButtonPressed(this.props.id)
        }
      >
        {this.props.title && (
          <div className="micro-title">{this.props.t(this.props.title)}</div>
        )}
        <div>{this.props.t(this.props.caption)}</div>
      </div>
    )
  }
}

export default withTranslation("toggleButton")(ToggleButton)
