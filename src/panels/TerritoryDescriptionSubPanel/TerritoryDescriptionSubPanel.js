
import React from 'react';

import { Link } from 'react-router-dom';

import './TerritoryDescriptionSubPanel.css';

export default class TerritoryDescriptionSubPanel extends React.Component
{
  render()
  {
    return (
      <div className="territory-description-subpanel">
        <h4>{this.props.title}</h4><br />
        {this.props.text}
        <br/>
        <br/>
        <div className="description-link-group">
          <Link to={this.props.informationSheetRoute}><h6 className="step-link">{this.props.informationSheetDescription}</h6></Link>
          <Link to={this.props.itineraryStop2Route}><h6 className="step-link">{this.props.itineraryStop2Description}</h6></Link>
          <Link to={this.props.itineraryStop3Route}><h6 className="step-link">{this.props.itineraryStop3Description}</h6></Link>
        </div>

      </div>
    );
  }
}
