
import React from 'react';

import SplashScreen from './SplashScreen';

import { Link } from 'react-router-dom';

export default class SplashScreenWrapper extends React.Component
{
  render() 
  {
    const captionStyle = {
      top : "60%",
      width : "40%",
      left : "30%",
      position : "absolute",
      textAlign : "center"
    };

    return ( 
      <Link to="/AtlasIntro">
        <SplashScreen />
        <h2 style={captionStyle}>Letteratura e visualizzazione</h2>
      </Link>
    );
  }
}