import React from 'react';
import HeaderViz from '../general/HeaderViz';
import BackFromMainMenu from '../general/BackFromMainMenu/BackFromMainMenu';

export default class HamburgerMenuHeader extends React.Component 
{
  render()
  {
    return (
      <HeaderViz>
        <BackFromMainMenu style={{gridColumn: 'span 1'}} />
      </HeaderViz>
    );
  }
}
