
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
          <img src={process.env.PUBLIC_URL + '/territory-legend-spheres-disposizione.svg'} />
        </div>

        <div className="legend-block">
          <div className="title-panel"><h4>DIMENSIONE</h4></div>
          <img src={process.env.PUBLIC_URL + '/territory-legend-spheres-dimensione.svg'} />
        </div>

        <div className="legend-block">
          <div className="title-panel"><h4>TIPOLOGIE DI ELENCO</h4></div>
          <img src={process.env.PUBLIC_URL + '/territory-legend-spheres-shape-colore.svg'} />
        </div>

        <div className="legend-block">
          <div className="title-panel"><h4>RAPPORTO DELLE TIPOLOGIE DI ELENCO</h4></div>
          <img src={process.env.PUBLIC_URL + '/territory-legend-spheres-shape-donut.svg'} />
        </div>

      </>
    );
  }
}
