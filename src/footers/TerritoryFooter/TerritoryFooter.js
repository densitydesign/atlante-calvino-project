
import React from 'react';
import Options from '../../general/Options/Options';

import '../../App.css';

export default class TerritoryFooter extends React.Component
{
  render()
  {
    return (
      <div className="bottom-nav navigations">

        <Options
          title="Tappe"
          data={["Tappa 1", "Tappa 2", "Tappa 3"]}
          style={{gridColumn : "span 5", textAlign : "center" }}
        />

      </div>
    );
  }
}