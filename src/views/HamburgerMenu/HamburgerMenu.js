import React from 'react';

import NavMenu from '../NavMenu/NavMenu';
import ViewSelector from '../ViewSelector/ViewSelector';
import HamburgerMenuHeader from '../../headers/HamburgerMenuHeader';
import { Link } from 'react-router-dom';

import '../../App.css';
import './HamburgerMenu.css';
import '../NavMenu/NavMenu.css';

export default class HamburgerMenu extends React.Component
{
  render()
  {
    return (
      <div className="hamburger-menu-container">
        <HamburgerMenuHeader />
        <div className="hamburger-menu hamburger-menu-open">
          <div className="hamburger-menu-sidebar">
            <ViewSelector className="compass-selector-cell" route="Compass" text="BUSSOLA"><h1 dataClass=""/></ViewSelector>

            <div className="nav-menu-cell-grid tint" >
              <div className="nav-menu-cell"><Link to="/About"><h2>Équipe</h2></Link></div>
              <div className="nav-menu-cell"><Link to="/Project"><h2>Progetto</h2></Link></div>
              <div className="nav-menu-cell"><Link to="/Tools"><h2>Strumenti</h2></Link></div>
              <div className="nav-menu-cell"><Link to="/News"><h2>Rassegna</h2></Link></div>
              <div className="nav-menu-cell"><Link to="/Papers"><h2>Articoli</h2></Link></div>
            </div>

            </div>

          <div className="hamburger-menu-cell-grid">

            <div className="hamburger-menu-cell" />
            <ViewSelector className="hamburger-menu-cell" route="Itineraries/#doubt" text="Dubbio"><h3 dataClass=""/></ViewSelector>
            <ViewSelector className="hamburger-menu-cell" route="Itineraries/#space" text="Spazio"><h3 dataClass=""/></ViewSelector>
            <ViewSelector className="hamburger-menu-cell" route="Itineraries/#shape" text="Forma"><h3 dataClass=""/></ViewSelector>

            <ViewSelector className="hamburger-menu-cell" route="Phenomena/intro" text="Tappa 1"><h4 dataClass=""/></ViewSelector>
            <ViewSelector className="hamburger-menu-cell" route="Phenomena/territory/doubtAnalysis" text="Dubbio"><h5 dataClass=""/></ViewSelector>
            <ViewSelector className="hamburger-menu-cell" route="Phenomena/territory/spaceAnalysis" text="Spazio"><h5 dataClass=""/></ViewSelector>
            <ViewSelector className="hamburger-menu-cell" route="Phenomena/territory/shapeAnalysis" text="Forma"><h5 dataClass=""/></ViewSelector>

            <ViewSelector className="hamburger-menu-cell" route="Process/intro" text="Tappa 2"><h4 dataClass=""/></ViewSelector>
            <ViewSelector className="hamburger-menu-cell" route="Process/doubting" text="Dubitare"><h5 dataClass=""/></ViewSelector>
            <ViewSelector className="hamburger-menu-cell" route="Process/transforming" text="Trasformare"><h5 dataClass=""/></ViewSelector>
            <ViewSelector className="hamburger-menu-cell" route="Process/combining" text="Combinare"><h5 dataClass=""/></ViewSelector>

            <ViewSelector className="hamburger-menu-cell" route="Problem/intro" text="Tappa 3"><h4 dataClass=""/></ViewSelector>
            <ViewSelector className="hamburger-menu-cell" route="Problem/cancellation" text="Cancellazione"><h5 dataClass=""/></ViewSelector>
            <ViewSelector className="hamburger-menu-cell" route="Problem/realism" text="Realismo"><h5 dataClass=""/></ViewSelector>
            <ViewSelector className="hamburger-menu-cell" route="Problem/plot" text="Trama"><h5 dataClass=""/></ViewSelector>

          </div>
        </div>
      </div>
    );
  }
}
