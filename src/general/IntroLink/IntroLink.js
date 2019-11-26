import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './IntroLink.css';

export default class IntroLink extends React.Component
{
  render()
  {
    const route = "/AtlasIntro";
    return (
      <div className={this.props.className}>
        <Link to={route}>INTRO</Link>
      </div>
    );
  }
}