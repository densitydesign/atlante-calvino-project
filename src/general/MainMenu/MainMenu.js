import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as IconIndexMenu } from '../../headers/IndexMenuHeader/icons/icon-index.svg';
import { Link } from 'react-router-dom';
import './MainMenu.css';

class MainMenu extends Component {
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

  render() {
    const route = "/HomeIndex";
    return (
      <div className="main-menu" style={this.props.style}>
        <Link to={route}>
          <IconIndexMenu />
        </Link>
      </div>
    );
  }
}



export default MainMenu;

MainMenu.defaultProps = { style: {gridColumn: 'span 1'}}
