import React from 'react';

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
        <HamburgerMenuHeader backRoute={this.props.backRoute} />
        <div className="hamburger-menu hamburger-menu-open">
          <div className="hamburger-menu-sidebar">
            <ViewSelector className="compass-selector-cell" route="/" text="Atlante Calvino"><h1 dataClass=""/></ViewSelector>

            <div className="nav-menu-cell-grid" >
              <div className="nav-menu-cell"><Link to="/About"><h2>Équipe</h2></Link></div>
              <div className="nav-menu-cell"><Link to="/Project"><h2>Progetto</h2></Link></div>
              <div className="nav-menu-cell"><Link to="/Tools"><h2>Metodologia</h2></Link></div>
              <div className="nav-menu-cell"><Link to="/Papers"><h2>Pubblicazioni</h2></Link></div>
              <div className="nav-menu-cell"><Link to="/News"><h2>Rassegna Stampa</h2></Link></div>
            </div>

            </div>

          <div className="hamburger-menu-cell-grid">


            <ViewSelector className="hamburger-menu-cell blank-intro" route="Compass" text="BUSSOLA"><h3 dataClass=""/></ViewSelector>
            <ViewSelector className="hamburger-menu-cell itineraries-intro" route="Itineraries" text="Dubbio"><h3 dataClass=""/></ViewSelector>
            <ViewSelector className="hamburger-menu-cell itineraries-intro" route="Itineraries/#space" text="Spazio"><h3 dataClass=""/></ViewSelector>
            <ViewSelector className="hamburger-menu-cell itineraries-intro" route="Itineraries/#shape" text="Forma"><h3 dataClass=""/></ViewSelector>

            <ViewSelector className="hamburger-menu-cell step-intro" route="Phenomena/intro" text="Tappa 1" image="/menuImages/menu_tappa_1.svg"><h4 dataClass=""/></ViewSelector>
            <ViewSelector className="hamburger-menu-cell viz-intro" route="Phenomena/territory/doubtAnalysis" text="Nebbia" image="/menuImages/menu_nebbia.svg" ><h5 dataClass=""/></ViewSelector>
            <ViewSelector className="hamburger-menu-cell viz-intro" route="Phenomena/territory/spaceAnalysis" text="Luoghi" image="/menuImages/menu_luoghi.svg"><h5 dataClass=""/></ViewSelector>
            <ViewSelector className="hamburger-menu-cell viz-intro" route="Phenomena/territory/shapeAnalysis" text="Elenchi" image="/menuImages/menu_elenchi.svg" ><h5 dataClass=""/></ViewSelector>

            <ViewSelector className="hamburger-menu-cell step-intro" route="Process/intro" text="Tappa 2"><h4 dataClass=""/></ViewSelector>
            <ViewSelector className="hamburger-menu-cell viz-intro" route="Process/doubting" text="Dubitare" image="/menuImages/menu_dubitare.svg"><h5 dataClass=""/></ViewSelector>
            <ViewSelector className="hamburger-menu-cell viz-intro" route="Process/transforming" text="Trasformare" image="/menuImages/menu_trasformare.svg"><h5 dataClass=""/></ViewSelector>
            <ViewSelector className="hamburger-menu-cell viz-intro" route="Process/combining" text="Combinare" image="/menuImages/menu_trama.svg"><h5 dataClass=""/></ViewSelector>

            <ViewSelector className="hamburger-menu-cell step-intro" route="Problem/intro" text="Tappa 3"><h4 dataClass=""/></ViewSelector>
            <ViewSelector className="hamburger-menu-cell viz-intro" route="Problem/cancellation-draft" text="Cancellazione" image="/menuImages/menu_blank.svg"><h5 dataClass=""/></ViewSelector>
            <ViewSelector className="hamburger-menu-cell viz-intro" route="Problem/realism" text="Realismo" image="/menuImages/menu_blank.svg"><h5 dataClass=""/></ViewSelector>
            <ViewSelector className="hamburger-menu-cell viz-intro" route="Problem/plot" text="Trama" image="/menuImages/menu_blank.svg"><h5 dataClass=""/></ViewSelector>

          </div>
        </div>
      </div>
    );
  }
}
