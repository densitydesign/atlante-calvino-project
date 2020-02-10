import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import '../../App.css';
import './CloseCompass.css';

export default class CloseCompass extends React.Component
{
  componentDidMount()
  {
    if(this.props.containerToggleCompass)
    {
console.log("adding event listener");      
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
console.log("clicked 1");        
    if(!this.wrapperRef) return;
console.log("clicked 2");        
    if(this.wrapperRef.contains(event.target)) this.props.containerToggleCompass();
  }

  render()
  {
    if(this.props.containerToggleCompass)
    {
console.log("render 1");      
      return (
        <div className="back-from-main-menu" style={this.props.style} ref={this.setWrapperRef}>
            <FontAwesomeIcon icon={faTimes} />
        </div>
      );
    }
    else
    {
      const history = useHistory();
      console.log("history : ", history);

      return (
        <div className="back-from-main-menu" style={this.props.style} onClick={() => history.goBack()}>
            <FontAwesomeIcon icon={faTimes} />
        </div>
      );
    }
  }
}
