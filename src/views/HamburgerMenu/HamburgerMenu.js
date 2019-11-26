import React from 'react';

import NavMenu from '../NavMenu/NavMenu';
import ViewSelector from '../ViewSelector/ViewSelector';

import './HamburgerMenu.css';
import '../NavMenu/NavMenu.css';

export default class HamburgerMenu extends React.Component
{
  render()
  {
    return (
      <div className="hamburger-menu">
        <div className="hamburger-menu-sidebar">
          <ViewSelector className="compass-selector-cell" route="Compass" text="Bussola" />
          <NavMenu />
        </div>
        
        <div className="hamburger-menu-cell-grid">
          <div className="hamburger-menu-cell" />
          <ViewSelector className="hamburger-menu-cell" route="Spheres/shape" text="Forma" />
          <ViewSelector className="hamburger-menu-cell" route="Spheres/doubt" text="Dubbio" />
          <ViewSelector className="hamburger-menu-cell" route="Spheres/spaces" text="Spazi" />

          <ViewSelector className="hamburger-menu-cell" route="Phenomena/intro" text="Fenomeno" />
          <ViewSelector className="hamburger-menu-cell" route="Phenomena/shapeAnalysis" text="Forma" />
          <ViewSelector className="hamburger-menu-cell" route="Phenomena/doubtAnalysis" text="Dubbio" />
          <ViewSelector className="hamburger-menu-cell" route="Phenomena/spaceAnalysis" text="Spazio" />

          <ViewSelector className="hamburger-menu-cell" route="Process/intro" text="Processo" />
          <ViewSelector className="hamburger-menu-cell" route="Process/combining" text="Combinare" />          
          <ViewSelector className="hamburger-menu-cell" route="Process/doubting" text="Dubitare" />
          <ViewSelector className="hamburger-menu-cell" route="Process/transforming" text="Trasformare" />

          <ViewSelector className="hamburger-menu-cell" route="Problem/intro" text="Problema" />
          <ViewSelector className="hamburger-menu-cell" route="Problem/realism" text="Realismo" />
          <ViewSelector className="hamburger-menu-cell" route="Problem/cancellation" text="Cancellazione" />
          <ViewSelector className="hamburger-menu-cell" route="Problem/plot" text="Trama" />
        </div>
        
      </div>
    );
  }
}