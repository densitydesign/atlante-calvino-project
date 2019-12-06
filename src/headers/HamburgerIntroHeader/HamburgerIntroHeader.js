import React from 'react';
import HeaderViz from '../../general/HeaderViz';
import IntroLink from '../../general/IntroLink/IntroLink';
import MainMenu from '../../general/MainMenu/MainMenu';

export default class HamburgerIntroHeader extends React.Component
{
  render()
  {
    return (
      <div className="top-nav navigations">
        <MainMenu style={{gridColumn: 'span 2'}} />
        <div style={{gridColumn: 'span 20'}} />
        <IntroLink style={{gridColumn: 'span 2'}} />
      </div>
    );
  }
}