import React from 'react';
import SkipIntroLink from '../../general/SkipIntroLink/SkipIntroLink';

import './AtlasIntroHeader.css';

export default class AtlasIntroHeader extends React.Component
{
  render()
  {
    return (
      <div className="the-header">
        <div className="atlas-intro-header-bar" style={{gridColumn: 'span 22'}} />
        <SkipIntroLink style={{gridColumn: 'span 2'}} />
      </div>
    );
  }
}