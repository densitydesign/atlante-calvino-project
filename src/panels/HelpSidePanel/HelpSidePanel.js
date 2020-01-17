
import React from 'react';

import CloseButton from '../../general/CloseButton/CloseButton';

import './HelpSidePanel.css';

export default class HelpSidePanel extends React.Component
{
  render()
  {
    return (
      <div className="help-side-panel help-side-panel-open">
        <CloseButton />

        Help
      </div>
    );
  }
}