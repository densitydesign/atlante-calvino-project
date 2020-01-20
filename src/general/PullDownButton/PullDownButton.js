
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import './PullDownButton.css';

export default class PullDownButton extends React.Component
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
        className="pull-down-button" 
        style={this.props.style} 
        ref={this.setWrapperRef}
      >
        <FontAwesomeIcon icon={faChevronDown} style={this.props.style} />
      </div>
    );
  }
}