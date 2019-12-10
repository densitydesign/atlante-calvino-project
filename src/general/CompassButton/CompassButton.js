import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './CompassButton.css';

export default class CompassButton extends React.Component
{
  render()
  {
    const route = "/Compass";
    return (
      <div className="compass-button" style={this.props.style}>
        <Link to={route}>
          <FontAwesomeIcon icon={faCompass} />
        </Link>
      </div>
    );
  }
}