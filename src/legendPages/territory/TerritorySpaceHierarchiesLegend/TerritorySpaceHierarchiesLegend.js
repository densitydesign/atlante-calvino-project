
import React from 'react';

import './TerritorySpaceHierarchiesLegend.css';

export default class TerritorySpaceHierarchiesLegend extends React.Component
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
          <div className="title-panel"><h4>OCCORRENZE DI</h4></div>
          <img src={process.env.PUBLIC_URL + '/territory-legend-spheres-space-tipi_luogo.svg'} />
        </div>

        <div className="legend-block">
          <div className="title-panel"><h4>LUOGHI CONTENITORI</h4></div>
          <img src={process.env.PUBLIC_URL + '/territory-legend-spheres-space-meduse.svg'} />
        </div>

      </>
    );
  }
}
