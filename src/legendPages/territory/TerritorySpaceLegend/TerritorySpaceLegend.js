
import React from 'react';

import './TerritorySpaceLegend.css';

export default class TerritorySpaceLegend extends React.Component
{
  render()
  {
    return (
      <>
        <div className="legend-block">
          <h5>DIMENSIONE</h5>
          <p>
            <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-dimensione.svg'} />
          </p>
        </div>

        <div className="legend-block">
          <h5>TIPOLOGIE DI LUOGHI</h5>
          <p>
            <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-space-tipi_luogo.svg'} />
          </p>
        </div>

        <div className="legend-block">
          <h5>PROPORZIONI DEI LUOGHI</h5>
          <p>
            <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-space-donut.svg'} />
          </p>
        </div>

        <div className="legend-block">
          <h5>LUOGHI CONTENITORI</h5>
          <p>
            <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-space-meduse.svg'} />
          </p>
        </div>

        <div className="legend-block">
          <h5>DISPOSIZIONE</h5>
          <p>
            <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-disposizione.svg'} />
          </p>
        </div>
      </>
    );
  }
}
