import React, { Component } from "react"
import "../../App.css"
import "./MoreInfo.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons"
import { ReactComponent as IconClose } from '../../headers/IndexMenuHeader/icons/icon-close.svg'

class MoreInfo extends Component {
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick)
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick)
  }

  setWrapperRef = (node) => (this.wrapperRef = node)

  handleClick = (event) => {
    if (!this.wrapperRef) return

    if (this.wrapperRef.contains(event.target))
      this.props.onClicked(this.props.id)
  }

  render() {
    console.log(this.props, "moreinfo")

    return this.props.helpSidePanelOpen ? (
      <div
        style={this.props.style}
        className="more-info-active"
        ref={this.setWrapperRef}
      >
        <IconClose />
      </div>
    ) : (
      <div
        style={this.props.style}
        className="more-info"
        ref={this.setWrapperRef}
      >
        ?
      </div>
    )
  }
}

export default MoreInfo
