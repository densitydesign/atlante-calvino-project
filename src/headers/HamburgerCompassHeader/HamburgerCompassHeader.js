import React from "react"
import "../../App.css"
import CompassButton from "../../general/CompassButton/CompassButton"
import MainMenu from "../../general/MainMenu/MainMenu"
import { ReactComponent as CloseIcon } from "../IndexMenuHeader/icons/icon-close.svg"

export default class HamburgerCompassHeader extends React.Component {
  render() {
    return (
      <div className="top-nav navigations">
        <MainMenu style={{ gridColumn: "span 1" }} />
        <div style={{ gridColumn: "span 22" }} />
        <div
          onClick={this.props.toggleFlowOfStories}
          className="cursor-pointer d-flex justify-content-center"
          style={{ gridColumn: "span 1" }}
        >
          <CloseIcon onClick={this.props.toggleFlowOfStories ? this.props.toggleFlowOfStories : this.props.toggleTempoEOpere} />
        </div>
      </div>
    )
  }
}
