
import React from 'react';

import DoubtMainOptionsSubPanel from '../DoubtMainOptionsSubPanel/DoubtMainOptionsSubPanel';

import './DoubtPanel.css';

export default class DoubtPanel extends React.Component
{
  render()
  {
    return (
      <div className="doubt-panel">
        <div></div>
        <DoubtMainOptionsSubPanel />
      </div>
    );
  }
}