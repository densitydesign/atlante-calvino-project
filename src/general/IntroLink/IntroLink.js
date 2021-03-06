import React from 'react';
import { Link } from 'react-router-dom';

import '../../App.css';
import './IntroLink.css';

export default class IntroLink extends React.Component
{
  render()
  {
    const route = "/AtlasIntro";
    return (
      <div className="intro-link" style={this.props.style} >
        <Link to={route}><h4>INTRO</h4></Link>
      </div>
    );
  }
}
