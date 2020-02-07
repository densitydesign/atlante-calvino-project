
import React from 'react';

import './TerritoryDoubtProportionLegend.css';

export default class TerritoryDoubtProportionLegend extends React.Component
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
          <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-doubt-colore_parziale.svg'} alt="legend information" />
        </div>

        <div className="legend-block">
          <div className="title-panel"><h4>RAPPORTO NEBBIA/CANCELLAZIONE</h4></div>
          <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-doubt-donut.svg'} alt="legend information" />
        </div>

      </>
    );
  }
}
