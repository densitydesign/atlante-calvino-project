
import React from 'react';

import Archipelago from './Archipelago';

export default class ArchipelagoWrapper extends React.Component
{
  loadData()
  {

  }

  render = () => {
    return (
      <div className="main">
        <Archipelago />
      </div>
    );
  }
}