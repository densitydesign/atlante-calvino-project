import React from "react"

import { Link } from "react-router-dom"

import "./TerritoryDescriptionSubPanel.css"

export default class TerritoryDescriptionSubPanel extends React.Component {
  render() {
    return (
      <div className="territory-description-subpanel">
        <h4 className="title-subpanel-territory">{this.props.title}</h4>
        <br />
        {this.props.text}
      </div>
    )
  }
}
