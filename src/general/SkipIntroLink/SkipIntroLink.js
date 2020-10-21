import React from 'react';
import { Link } from 'react-router-dom';

import '../../App.css';
import './SkipIntroLink.css';

export default class SkipIntroLink extends React.Component
{
  render()
  {
    const route = "/navigation";
    return (
      <div className="skip-intro-link" style={this.props.style} >
        <Link to={route}><h4>SALTA INTRO</h4></Link>
      </div>
    );
  }
}
