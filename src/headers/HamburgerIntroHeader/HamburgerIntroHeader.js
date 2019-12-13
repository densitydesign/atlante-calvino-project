import React from 'react';
import IntroLink from '../../general/IntroLink/IntroLink';
import MainMenu from '../../general/MainMenu/MainMenu';

import '../../App.css';

export default class HamburgerIntroHeader extends React.Component
{
  render()
  {
    return (
      <div className="top-nav navigations">
        <MainMenu style={{gridColumn: 'span 1'}} />
        <div style={{gridColumn: 'span 21'}} />
        <IntroLink style={{gridColumn: 'span 2'}} />
      </div>
    );
  }
}
