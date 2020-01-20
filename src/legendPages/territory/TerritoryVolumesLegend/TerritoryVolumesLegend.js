
import React from 'react';

import './TerritoryVolumesLegend.css';

export default class TerritoryVolumesLegend extends React.Component
{
  render()
  {
    return (
      <>
        <div className="legend-block">
          <h4>DIMENSIONE</h4>
          <p>
            <img src={process.env.PUBLIC_URL + '/territory-legend-noAnalysis-dimensione.svg'} />
          </p>
        </div>

        <div className="legend-block">
          <h4>RACCOLTA</h4>
          <p>
            <img src={process.env.PUBLIC_URL + '/territory-legend-volumes-modalita.svg'} />
          </p>
        </div>

        <div className="legend-block">
          <h4>VOLUMI</h4>
          <p>
            <img src={process.env.PUBLIC_URL + '/territory-legend-volumes-codice_colori_large.svg'} />
          </p>
        </div>

        <div className="legend-block">
          <h4>DISPOSIZIONE</h4>
          <p>
            <img src={process.env.PUBLIC_URL + '/territory-legend-volumes-positioning.svg'} />
          </p>
        </div>        
      </> 
    );
  }
}