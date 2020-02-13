
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import './CloseButton.css';

export default class CloseButton extends React.Component
{
  componentDidMount()
  {
    document.addEventListener("mousedown", this.handleClick);
  }

  componentWillUnmount()
  {
    document.removeEventListener("mousedown", this.handleClick);
  }

  setWrapperRef = node => this.wrapperRef = node;  

  handleClick = event => {
    if(!this.wrapperRef) return;

    if(this.wrapperRef.contains(event.target)) this.props.onClicked(this.props.id);
  };

  render()
  {
    return (
      <div 
        className="close-button" 
        style={this.props.style} 
        ref={this.setWrapperRef}
      >
        <FontAwesomeIcon icon={faTimes} style={this.props.style} />
      </div>
    );
  }
}