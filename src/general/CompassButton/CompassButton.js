import React from "react"
import { ReactComponent as Compass } from "./icons/compass.svg"
import { Link } from "react-router-dom"
import "../../App.css"
import "./CompassButton.css"

export default class CompassButton extends React.Component {
  componentDidMount() {
    if (this.props.containerToggleCompassPanel) {
      document.addEventListener("mousedown", this.handleClick)
    }
  }

  componentWillUnmount() {
    if (this.props.containerToggleCompassPanel) {
      document.removeEventListener("mousedown", this.handleClick)
    }
  }

  setWrapperRef = (node) => (this.wrapperRef = node)

  handleClick = (event) => {
    if (!this.wrapperRef) return

    if (this.wrapperRef.contains(event.target))
      this.props.containerToggleCompassPanel()
  }

  render() {
    const route = "/compass"

    return this.props.toggleFlowOfStories ? (
      <div onClick={this.props.toggleFlowOfStories} className="compass-button" style={this.props.style}>
        <div className="main-menu-inner">
          <Compass width="30" />
        </div>
      </div>
    ) : (
      <Link target="_blank" className="top-menu" to={route}>
        <div className="compass-button" style={this.props.style}>
          <div className="main-menu-inner">
            <Compass width="30" />
          </div>
        </div>
      </Link>
    )
  }
}
