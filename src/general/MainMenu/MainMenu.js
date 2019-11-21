import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './MainMenu.css';

class MainMenu extends Component {
  render() {
    return <div className="main-menu" style={this.props.style}><FontAwesomeIcon icon={faBars} /></div>;
  }
}

export default MainMenu;

MainMenu.defaultProps = { style: {gridColumn: 'span 1'}}
