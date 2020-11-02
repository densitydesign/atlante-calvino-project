import React from "react"

import "./ToggleButton.css"

export default class ToggleButton extends React.Component {
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
          <div className="micro-title">{this.props.title}</div>
        )}
        <div>{this.props.caption}</div>
      </div>
    )
  }
}
