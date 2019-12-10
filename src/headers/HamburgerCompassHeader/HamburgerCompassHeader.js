import React from 'react';
import IntroLink from '../../general/IntroLink/IntroLink';
import CompassButton from '../../general/CompassButton/CompassButton';

export default class HamburgerCompassHeader extends React.Component
{
  render()
  {
    return (
      <div className="top-nav navigations">
        <CompassButton style={{gridColumn: 'span 2'}} />
        <div style={{gridColumn: 'span 20'}} />
        <IntroLink style={{gridColumn: 'span 2'}} />
      </div>
    );
  }
}