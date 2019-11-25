import React from 'react';

import NavMenu from '../NavMenu/NavMenu';
import ViewSelector from '../ViewSelector/ViewSelector';

import './HamburgerMenu.css';

export default class HamburgerMenu extends React.Component
{
  render()
  {
    return (
      <div className="hamburger-menu">
        <ViewSelector route="Compass" text="Bussola" />                
                
        <ViewSelector className="hamburger-menu-cell hamburger-menu-cell-12" route="Spheres/shape" text="Forma" />
        <ViewSelector className="hamburger-menu-cell hamburger-menu-cell-13" route="Spheres/doubt" text="Dubbio" />
        <ViewSelector className="hamburger-menu-cell hamburger-menu-cell-14" route="Spheres/spaces" text="Spazi" />

        <ViewSelector className="hamburger-menu-cell hamburger-menu-cell-21" route="Phenomena/intro" text="Fenomeno" />
        <ViewSelector className="hamburger-menu-cell hamburger-menu-cell-22" route="Phenomena/shapeAnalysis" text="Forma" />
        <ViewSelector className="hamburger-menu-cell hamburger-menu-cell-23" route="Phenomena/doubtAnalysis" text="Dubbio" />
        <ViewSelector className="hamburger-menu-cell hamburger-menu-cell-24" route="Phenomena/spaceAnalysis" text="Spazio" />

        <ViewSelector className="hamburger-menu-cell hamburger-menu-cell-31" route="Process/intro" text="Processo" />
        <ViewSelector className="hamburger-menu-cell hamburger-menu-cell-32" route="Process/transforming" text="Trasformare" />
        <ViewSelector className="hamburger-menu-cell hamburger-menu-cell-33" route="Process/doubting" text="Dubitare" />
        <ViewSelector className="hamburger-menu-cell hamburger-menu-cell-34" route="Process/combining" text="Combinare" />

        <ViewSelector className="hamburger-menu-cell hamburger-menu-cell-41" route="Problem/intro" text="Problema" />
        <ViewSelector className="hamburger-menu-cell hamburger-menu-cell-42" route="Problem/realism" text="Realismo" />
        <ViewSelector className="hamburger-menu-cell hamburger-menu-cell-43" route="Problem/cancellation" text="Cancellazione" />
        <ViewSelector className="hamburger-menu-cell hamburger-menu-cell-44" route="Problem/plot" text="Trama" />    

        <NavMenu />
      </div>
    );
  }
}