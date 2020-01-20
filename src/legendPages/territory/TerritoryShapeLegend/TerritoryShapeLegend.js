
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
          <p>
            <img src={process.env.PUBLIC_URL + '/territory-legend-spheres-dimensione.svg'} />
          </p>
        </div>

        <div className="legend-block">
          <h5>PROPORZIONI ELENCHI</h5>
          <p>
            <img src={process.env.PUBLIC_URL + '/territory-legend-spheres-shape-proporzioni.svg'} />
          </p>
        </div>

        <div className="legend-block">
          <h5>TIPOLOGIE DI ELENCO</h5>
          <p>
            <img src={process.env.PUBLIC_URL + '/territory-legend-spheres-shape-colore.svg'} />
          </p>
        </div>

        <div className="legend-block">
          <h5>RAPPORTO DELLE TIPOLOGIE DI ELENCO</h5>
          <p>
            <img src={process.env.PUBLIC_URL + '/territory-legend-spheres-shape-donut.svg'} />
          </p>
        </div>        

        <div className="legend-block">
          <h5>DISPOSIZIONE</h5>
          <p>
            <img src={process.env.PUBLIC_URL + '/territory-legend-spheres-disposizione.svg'} />
          </p>
        </div>                
      </> 
    );
  }
}