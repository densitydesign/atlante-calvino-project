import React from 'react'
import HamburgerIntroHeader from '../../headers/HamburgerIntroHeader/HamburgerIntroHeader';

import './Compass.css';

export default class Compass extends React.Component
{
  componentDidUpdate()
  {
    this.refs.fishbones.getDOMNode().focus();
  }

  render()
  {
    return (
      <div>
        <HamburgerIntroHeader />

          <div id="compass">Bussola</div>
          <div id="fishbones" ref={ fishbones => this.fishbones = fishbones }>Lische</div>
          <div id="winding">Sinuosa</div>
          <div id="networks">Reti</div>
        
      </div>
    );
  }
}