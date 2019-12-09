import React from 'react'
import HamburgerIntroHeader from '../../headers/HamburgerIntroHeader/HamburgerIntroHeader';
import SlidingPanel from '../../general/SlidingPanel/SlidingPanel';

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
          <div>
          <SlidingPanel open="true">Lische</SlidingPanel>
          <SlidingPanel open="false">Sinuosa</SlidingPanel>
          <SlidingPanel open="false">Reti</SlidingPanel>
          </div>
{/*          
          <div id="fishbones" ref={ fishbones => this.fishbones = fishbones }>Lische</div>
          <div id="winding">Sinuosa</div>
          <div id="networks">Reti</div>
*/}    
      </div>
    );
  }
}