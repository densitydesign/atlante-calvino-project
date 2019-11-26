import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass } from '@fortawesome/free-solid-svg-icons';
import './CompassButton.js';

export default class CompassButton extends React.Component
{
  render()
  {
    return <div className="compass-button" style={this.props.style}><FontAwesomeIcon icon={faCompass} /></div>;
  }
}