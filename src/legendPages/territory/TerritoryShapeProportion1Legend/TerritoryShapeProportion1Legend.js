
import React from 'react';

import './TerritoryShapeProportion1Legend.css';

export default class TerritoryShapeProportion1Legend extends React.Component
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
          <div className="title-panel"><h4>TIPOLOGIE DI ELENCO</h4></div>
          <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-shape-colore.svg'} alt="legend information" />
        </div>

        <div className="legend-block">
          <div className="title-panel"><h4>RAPPORTO DELLE TIPOLOGIE DI ELENCO</h4></div>
          <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-shape-donut.svg'} alt="legend information" />
        </div>

      </>
    );
  }
}
