import React from 'react';
import { Link } from 'react-router-dom';

import '../../App.css';
import './NavMenu.css'

export default class NavMenu extends React.Component
{
  render()
  {
    return (
      <div className="nav-menu-cell-grid" >
        <div className="nav-menu-cell"><Link to="/About"><h2>About</h2></Link></div>
        <div className="nav-menu-cell"><Link to="/Tools">Strumenti</Link></div>
        <div className="nav-menu-cell"><Link to="/News">Rassegna</Link></div>
        <div className="nav-menu-cell"><Link to="/Papers">Articoli</Link></div>
      </div>
    );
  }
}
