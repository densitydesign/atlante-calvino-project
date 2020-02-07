
import React from 'react';

import SplashScreen from './SplashScreen';

import { Link } from 'react-router-dom';

import "./SplashScreen.js";

export default class SplashScreenWrapper extends React.Component
{
  render() 
  {


    return ( 
      <Link to="/AtlasIntro">        
        <SplashScreen />
        <h2 className="splash-screen-caption">Letteratura e visualizzazione</h2>
        <h3 className="splash-screen-description">Eine wunderbare Heiterkeit hat meine ganze Seele eingenommen, gleich den süßen</h3>
      </Link>
    );
  }
}