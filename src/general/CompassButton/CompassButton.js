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
    if(this.props.containerToggleCompass)
    {
      document.addEventListener("mousedown", this.handleClick);
    }
  }

  componentWillUnmount()
  {
    if(this.props.containerToggleCompass)
    {
      document.removeEventListener("mousedown", this.handleClick);
    }
  }

  setWrapperRef = node => this.wrapperRef = node;  

  handleClick = event => {
    if(!this.wrapperRef) return;

    if(this.wrapperRef.contains(event.target)) this.props.containerToggleCompass();
  }

  render()
  {
    if(this.props.containerToggleCompass)
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
