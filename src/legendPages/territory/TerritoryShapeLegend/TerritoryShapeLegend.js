
import React from 'react';

import './TerritoryShapeLegend.css';

export default class TerritoryShapeLegend extends React.Component
{
  render()
  {
    return (
      <>
        <div className="legend-block">
          <h5>DIMENSIONE</h5>
            <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-dimensione.svg'} alt="legend information" />
        </div>

        <div className="legend-block">
          <h5>PROPORZIONI ELENCHI</h5>
            <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-shape-proporzioni.svg'} alt="legend information" />
        </div>

        <div className="legend-block">
          <h5>PROPOSIZIONI</h5>
            <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-shape-colore.svg'} alt="legend information" />
        </div>

        <div className="legend-block">
          <h5>RAPPORTO DELLE TIPOLOGIE DI ELENCO</h5>
            <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-shape-donut.svg'} alt="legend information" />
        </div>

        <div className="legend-block">
          <h5>DISPOSIZIONE</h5>
            <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-disposizione.svg'} alt="legend information" />
        </div>
      </>
    );
  }
}
