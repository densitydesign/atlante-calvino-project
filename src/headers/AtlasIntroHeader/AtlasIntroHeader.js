import React from 'react';
import HeaderViz from '../../general/HeaderViz';
import SkipIntroLink from '../../general/SkipIntroLink/SkipIntroLink';

import '../../App.css';
import './AtlasIntroHeader.css';

export default class AtlasIntroHeader extends React.Component
{
  render()
  {
    return (
      <HeaderViz>
        <div className="atlas-intro-header-bar" style={{gridColumn: 'span 22'}} />
        <SkipIntroLink style={{gridColumn: 'span 2'}} />
      </HeaderViz>
    );
  }
}
