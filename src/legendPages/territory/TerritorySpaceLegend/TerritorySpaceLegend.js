
import React from 'react';

import './TerritorySpaceLegend.css';

export default class TerritorySpaceLegend extends React.Component
{
  render()
  {
    return (
      <>
        <div className="legend-block">
              <div className="title-panel"><h4>Dimensione</h4></div>
            <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-dimensione.svg'} alt="legend information" />
        </div>

        <div className="legend-block">
              <div className="title-panel"><h4>Tipologia</h4></div>
            <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-space-tipi_luogo.svg'} alt="legend information" />
        </div>

        <div className="legend-block">
<div className="title-panel"><h4>Proporzione dei luoghi</h4></div>
            <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-space-donut.svg'} alt="legend information" />
        </div>

        <div className="legend-block">
<div className="title-panel"><h4>Luoghi contenitori</h4></div>
<img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-space-meduse.svg'} alt="legend information" />
        </div>

        <div className="legend-block">
          <div className="title-panel"><h4>Disposizioni</h4></div>
            <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-disposizione.svg'} alt="legend information" />
        </div>
      </>
    );
  }
}
