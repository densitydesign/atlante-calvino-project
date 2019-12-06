import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './MainMenu.css';

class MainMenu extends Component {
  render() {
    const route = "/Home";
    return (
      <div className="main-menu" style={this.props.style}>
        <Link to={route}>
          <FontAwesomeIcon icon={faBars} />
        </Link>
      </div>
    );
  }
}

export default MainMenu;

MainMenu.defaultProps = { style: {gridColumn: 'span 1'}}
