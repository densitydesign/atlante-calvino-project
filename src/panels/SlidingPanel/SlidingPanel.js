import React from "react"

import "./SlidingPanel.css"
import "../../views/Compass/Compass.css"

import { ReactComponent as PdfIcon } from '../../views/Compass/icons/pdf-download.svg'
import { faLink } from "@fortawesome/free-solid-svg-icons"
import { withTranslation } from "react-i18next"

class SlidingPanel extends React.Component {
  constructor(props) {
    super(props)

    //    this.state = { open : JSON.parse(props.open) };
    this.setWrapperRef = this.setWrapperRef.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick)
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick)
  }

  setWrapperRef(node) {
    this.wrapperRef = node
  }

  handleClick(event) {
    if (!this.wrapperRef) return

    if (this.wrapperRef.contains(event.target))
      this.props.panelClicked(this.props.id)

    //    this.setState({ open : this.wrapperRef.contains(event.target) });

    //console.log("panel id : ", this.props.id);

    //    this.setState({ open : this.wrapperRef.contains(event.target) || this.props.getSelectedPanel() > Number.parseInt(this.props.id)});
  }

  render() {
    const interactiveViewLink = this.props.interactiveViewUrl ? (
      <a
        onClick={(e) => {
          e.preventDefault()
          this.props.toggleFlowOfStories ? this.props.toggleFlowOfStories() : this.props.toggleTempoEOpere()
        }}
        className="button-text"
        href={process.env.PUBLIC_URL + this.props.interactiveViewUrl}
        target="blank"
      >
        {this.props.t('Esplora')}
      </a>
    ) : (
      <></>
    )

    return (
      <div
        className={
          "sliding-panel " +
          (this.props.open
            ? this.props.openClassName
            : this.props.closedClassName) +
          (this.props.hide ? " sliding-panel-hide" : "")
        }
        ref={this.setWrapperRef}
        style={{
          zIndex: this.props.zIndex,
        }}
      >
        <div className="rotated-title">
          <h1>
            {this.props.icon}
            {this.props.title}
          </h1>
        </div>
        <div className="sliding-panel-main-text">
          <div>
            <p>{this.props.text && this.props.text}</p>
            <br />
            <p>
              <a
                className="link"
                href={this.props.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                download={"Atlante Calvino - "+this.props.title+".zip"}
              >
                <PdfIcon /> PDF 
              </a>
            </p>
            <br />
            {interactiveViewLink}
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation(['compass'])(SlidingPanel)
