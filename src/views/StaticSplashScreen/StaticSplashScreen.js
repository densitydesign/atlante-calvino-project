
import React from 'react';
import { Link } from 'react-router-dom';

import '../../App.css';


export default class StaticSplashScreen extends React.Component
{
  render()
  {
    return (
      <Link to="/AtlasIntro"><img src={process.env.PUBLIC_URL + '/StaticLogo-01.svg'} /></Link>
    );
  }
}
