import React from 'react';
import HeaderViz from '../general/HeaderViz';
import BackFromMainMenu from '../general/BackFromMainMenu/BackFromMainMenu';
import CompassButton from '../general/CompassButton/CompassButton';
import IntroLink from '../general/IntroLink/IntroLink';

export default class HamburgerMenuHeader extends React.Component 
{
  render()
  {
    return (
      <HeaderViz>
        <BackFromMainMenu style={{gridColumn: 'span 1'}} />
  {/*        <div style={{gridColumn: 'span 10'}} /> */}
        <IntroLink style={{gridColumn: 'last'}} />
      </HeaderViz>
    );
  }
}
