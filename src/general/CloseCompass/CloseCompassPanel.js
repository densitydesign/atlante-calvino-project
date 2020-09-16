import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import '../../App.css';
import './CloseCompass.css';

export default class CloseCompassPanel extends React.Component
{
  componentDidMount()
  {
    if(this.props.containerToggleCompassPanel)
    {
      document.addEventListener("mousedown", this.handleClick);
    }
  }

  componentWillUnmount()
  {
    if(this.props.containerToggleCompassPanel)
    {
      document.removeEventListener("mousedown", this.handleClick);
    }
  }

  setWrapperRef = node => this.wrapperRef = node;

  handleClick = event => {
    if(!this.wrapperRef) return;

    if(this.wrapperRef.contains(event.target)) this.props.containerToggleCompassPanel();
  }

  render()
  {
    return (
      <div className="back-from-main-menu" style={this.props.style} ref={this.setWrapperRef}>
          <FontAwesomeIcon icon={faTimes} />
      </div>
    );
  }
}
