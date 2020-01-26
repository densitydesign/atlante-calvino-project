
import React from 'react';

import './TerritorySpaceOccurrencesLegend.css';

export default class TerritorySpaceOccurrencesLegend extends React.Component
{
  render()
  {
    return (
      <>

        <div className="legend-block">
          <div className="title-panel"><h3>SPAZIO</h3></div>
        </div>

        <div className="legend-block">
          <div className="title-panel"><h4>DISPOSIZIONE</h4></div>
          <img src={process.env.PUBLIC_URL + '/territory-legend-spheres-disposizione.svg'} />
        </div>

        <div className="legend-block">
          <div className="title-panel"><h4>DIMENSIONE</h4></div>
          <img src={process.env.PUBLIC_URL + '/territory-legend-spheres-dimensione.svg'} />
        </div>

        <div className="legend-block">
          <div className="title-panel"><h4>OCCORRENZE DI</h4></div>
          <img src={process.env.PUBLIC_URL + '/territory-legend-spheres-space-tipi_luogo.svg'} />
        </div>

        <div className="legend-block">
          <img src={process.env.PUBLIC_URL + '/territory-legend-spheres-space-tipi_luogo-intensita.svg'} />
        </div>

      </>
    );
  }
}
