
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
        <div className="introLogo">
        <h2>Letteratura e visualizzazione</h2>
        </div>
      </Link>
    );
  }
}
