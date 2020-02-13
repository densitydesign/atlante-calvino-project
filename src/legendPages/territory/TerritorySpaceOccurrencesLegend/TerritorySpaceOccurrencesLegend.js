
import React from 'react';

import './TerritorySpaceOccurrencesLegend.css';

export default class TerritorySpaceOccurrencesLegend extends React.Component
{
  render()
  {
    return (
      <>
        <div className="legend-block">
          <div className="title-panel"><h4>DISPOSIZIONE</h4></div>
          <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-disposizione.svg'} alt="legend information" />
        </div>

        <div className="legend-block">
          <div className="title-panel"><h4>DIMENSIONE</h4></div>
          <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-dimensione.svg'} alt="legend information" />
        </div>

        <div className="legend-block">
          <div className="title-panel"><h4>OCCORRENZE DI</h4></div>
          <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-space-tipi_luogo.svg'} alt="legend information" />
        </div>

        <div className="legend-block">
          <div className="title-panel"><h4>intensità</h4></div>
          <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-space-tipi_luogo-intensita.svg'} alt="legend information" />
        </div>

      </>
    );
  }
}
