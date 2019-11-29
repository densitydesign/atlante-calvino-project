
import React from 'react';
import { Link } from 'react-router-dom';
import * as d3 from 'd3';

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