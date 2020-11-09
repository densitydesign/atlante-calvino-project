import React from "react"
import { ReactComponent as IconClose } from "../../headers/IndexMenuHeader/icons/icon-close.svg"

export default class CloseCompassPanel extends React.Component {
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
    return (
      <div
        className="back-from-main-menu d-dlex justify-content-center cursor-pointer"
        style={this.props.style}
        ref={this.setWrapperRef}
      >
        <IconClose />
      </div>
    )
  }
}
