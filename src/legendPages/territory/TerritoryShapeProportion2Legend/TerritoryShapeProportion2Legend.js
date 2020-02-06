
import React from 'react';

import './TerritoryShapeProportion2Legend.css';

export default class TerritoryShapeProportion2Legend extends React.Component
{
  render()
  {
    return (
      <>

        <div className="legend-block">
          <div className="title-panel"><h4>DISPOSIZIONE</h4></div>
          <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-disposizione.svg'} />
        </div>

        <div className="legend-block">
          <div className="title-panel"><h4>DIMENSIONE</h4></div>
          <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-dimensione.svg'} />
        </div>

        <div className="legend-block">
          <div className="title-panel"><h4>PROPORZIONI ELENCHI</h4></div>
          <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-shape-proporzioni.svg'} />
        </div>

      </>
    );
  }
}
