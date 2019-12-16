import React from 'react';
import SkipIntroLink from '../../general/SkipIntroLink/SkipIntroLink';

import '../../App.css';
import './AtlasIntroHeader.css';

export default class AtlasIntroHeader extends React.Component
{
  render()
  {
    return (
      <div className="top-nav navigations">
        <div style={{gridColumn: 'span 22'}} />
        <SkipIntroLink style={{gridColumn: 'span 2'}} />
      </div>
    );
  }
}
