import React from 'react';
import { Link } from 'react-router-dom';

import '../../App.css';
import './SkipIntroLink.css';

export default class SkipIntroLink extends React.Component
{
  render()
  {
    const route = "/Home";
    return (
      <div className="skip-intro-link" style={this.props.style} >
        <Link to={route}>SKIP INTRO</Link>
      </div>
    );
  }
}
