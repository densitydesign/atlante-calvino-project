import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../../App.css';
import './CompassButton.css';

export default class CompassButton extends React.Component
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
    if(this.props.containerToggleCompassPanel)
    {
      return (
        <div className="compass-button" style={this.props.style} ref={this.setWrapperRef}>
          <FontAwesomeIcon icon={faCompass} style={this.props.style} />
        </div>
      );      
    }
    else
    {
      const route = "/Compass";

      return (
        <div className="compass-button" style={this.props.style}>
          <Link to={route}>
            <FontAwesomeIcon icon={faCompass} style={this.props.style} />
          </Link>
        </div>
      );
    }
  }
}
