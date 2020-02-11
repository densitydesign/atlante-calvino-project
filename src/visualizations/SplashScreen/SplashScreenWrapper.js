
import React from 'react';

import SplashScreen from './SplashScreen';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointDown } from '@fortawesome/free-solid-svg-icons';

import "./SplashScreen.js";

export default class SplashScreenWrapper extends React.Component
{
  render()
  {


    return (
      <Link to="/AtlasIntro">
        <div className="splash-screen-container">
          <SplashScreen />
          <h2 className="splash-screen-caption">Letteratura e visualizzazione</h2>
          <p className="splash-screen-description">Ecco una breve descrizione di ciò che è l'Atlante.<br/>Potrebbe essere lunga centoventi caratteri e approfondire la ricerca.</p>        
        </div>
      </Link>
    );
  }
}
