
import React from 'react';

import './TerritoryDoubtLegend.css';

export default class TerritoryDoubtLegend extends React.Component
{
  render()
  {
    return (
      <>
        <div className="legend-block">
          <h4>DIMENSIONE</h4>
          <p>
            <img src={process.env.PUBLIC_URL + '/territory-legend-spheres-dimensione.svg'} />
          </p>
        </div>

        <div className="legend-block">
          <h4>OCCORRENZE DI</h4>
          <p>
            <img src={process.env.PUBLIC_URL + '/territory-legend-spheres-doubt-colore.svg'} />
          </p>
        </div>

        <div className="legend-block">
          <h4>PERCENTUALE</h4>
          <p>
            <img src={process.env.PUBLIC_URL + '/territory-legend-spheres-doubt-intensita.svg'} />
          </p>
        </div>

        <div className="legend-block">
          <h4>RAPPORTO NEBBIA/CANCELLAZIONE</h4>
          <p>
            <img src={process.env.PUBLIC_URL + '/territory-legend-spheres-doubt-donut.svg'} />
          </p>
        </div>        

        <div className="legend-block">
          <h4>DISPOSIZIONE</h4>
          <p>
            <img src={process.env.PUBLIC_URL + '/territory-legend-spheres-disposizione.svg'} />
          </p>
        </div>                
      </> 
    );
  }
}