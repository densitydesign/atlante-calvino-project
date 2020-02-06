
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
            <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-dimensione.svg'} />
        </div>

        <div className="legend-block">
          <h5>PROPORZIONI ELENCHI</h5>
            <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-shape-proporzioni.svg'} />
        </div>

        <div className="legend-block">
          <h5>TIPOLOGIE DI ELENCO</h5>
            <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-shape-colore.svg'} />
        </div>

        <div className="legend-block">
          <h5>RAPPORTO DELLE TIPOLOGIE DI ELENCO</h5>
            <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-shape-donut.svg'} />
        </div>

        <div className="legend-block">
          <h5>DISPOSIZIONE</h5>
            <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-disposizione.svg'} />
        </div>
      </>
    );
  }
}
