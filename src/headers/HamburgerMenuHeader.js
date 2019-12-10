import React from 'react';
import BackFromMainMenu from '../general/BackFromMainMenu/BackFromMainMenu';
import IntroLink from '../general/IntroLink/IntroLink';

export default class HamburgerMenuHeader extends React.Component 
{
  render()
  {
    return (
      <div className="top-nav navigations">
        <BackFromMainMenu style={{gridColumn: 'span 1'}} />
        <div style={{gridColumn: 'span 21'}} />
        <IntroLink style={{gridColumn: 'span 2'}} />
      </div>
    );
  }
}
