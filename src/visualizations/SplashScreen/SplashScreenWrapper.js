
import React from 'react';

import SplashScreen from './SplashScreen';

import { Link } from 'react-router-dom';

export default class SplashScreenWrapper extends React.Component
{
  render() 
  {
    return ( 
      <Link to="/AtlasIntro">
        <SplashScreen />
        <h2 text-align="center" width="100vh" style={{ marginLeft : "60vh" }}>Letteratura e visualizzazione</h2>
      </Link>
    );
  }
}