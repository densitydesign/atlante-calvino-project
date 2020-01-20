
import React from 'react';

import './TerritoryChronologyLegend.css';

export default class TerritoryChronologyLegend extends React.Component
{
  render()
  {
    return (
      <>
        <div className="legend-block">
          <h4>Dimensione</h4>
          <p>
            <img src={process.env.PUBLIC_URL + '/territory-legend-noAnalysis-dimensione.svg'} />
          </p>
        </div>

        <div className="legend-block">
          <h4>Cronologia</h4>
          <p>
            <img src={process.env.PUBLIC_URL + '/territory-legend-chronology-modalita.svg'} />
          </p>
        </div>

        <div className="legend-block">
          <h4>Disposizione</h4>
          <p>
            <img src={process.env.PUBLIC_URL + '/territory-legend-chronology-positioning.svg'} />
          </p>
        </div>                
      </> 
    );
  }
}