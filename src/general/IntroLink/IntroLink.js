import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
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
        <Link to={route}>INTRO</Link>
      </div>
    );
  }
}
