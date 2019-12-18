
import React from 'react';

import Territory from './Territory';

export default class TerritoryWrapper extends React.Component
{
  loadData()
  {

  }

  render = () => {
    return (
      <div className="main">
        <Territory />
      </div>
    );
  }
}