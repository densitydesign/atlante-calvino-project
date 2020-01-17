
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import './CloseButton.css';

export default class CloseButton extends React.Component
{
  render()
  {
    return (
      <div className="close-button" style={this.props.style} >
        <FontAwesomeIcon icon={faTimes} style={this.props.style} />
      </div>
    );
  }
}