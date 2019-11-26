import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import './BackFromMainMenu.css';

export default class BackFromMainMenu extends React.Component
{
  render()
  {
    return <div className="back-from-main-menu" style={this.props.style}><FontAwesomeIcon icon={faMinus} /></div>;
  }
}