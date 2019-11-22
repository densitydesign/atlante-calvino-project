import React from 'react';
import { Link } from 'react-router-dom';

export default class NavMenu extends React.Component
{
  render()
  {
    return (
      <div>
        <Link to="/About">About</Link>
        <Link to="/Tools">Strumenti</Link>
        <Link to="/News">Rassegna</Link>
        <Link to="/Papers">Articoli</Link>
      </div>
    );
  }
}