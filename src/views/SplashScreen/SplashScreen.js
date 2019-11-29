
import React from 'react';
import { Link } from 'react-router-dom';

export default class SplashScreen extends React.Component
{
  render()
  {
    return (
      <Link to="/AtlasIntro">
        <div>
          <h2>SplashScreen</h2>
        </div>
      </Link>
    );
  }
}