
import React from 'react';

import './TerritorySpaceProportionLegend.css';

export default class TerritorySpaceProportionLegend extends React.Component
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
          <div className="title-panel"><h4>PROPORZIONI DEI LUOGHI</h4></div>
          <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-space-donut.svg'} alt="legend information" />
        </div>

      </>
    );
  }
}
