
import React from 'react';

import './TerritorySpaceOccurrencesLegend.css';

export default class TerritorySpaceOccurrencesLegend extends React.Component
{
  render()
  {
    return (
      <>
        <div className="legend-block">
          <div className="title-panel"><h4>Dimensione</h4></div>
            <img src={process.env.PUBLIC_URL + '/territory-legend-spheres-dimensione.svg'} />
        </div>

        <div className="legend-block">
          <div className="title-panel"><h4>Occorrenze</h4></div>
            <img src={process.env.PUBLIC_URL + '/territory-legend-spheres-doubt-colore.svg'} />
        </div>

        <div className="legend-block">
          <div className="title-panel"><h4>Percentuale</h4></div>
            <img src={process.env.PUBLIC_URL + '/territory-legend-spheres-doubt-intensita.svg'} />
        </div>

        <div className="legend-block">
        <div className="title-panel"><h4>Rapporto Nebbia/Cancellazione</h4></div>
            <img src={process.env.PUBLIC_URL + '/territory-legend-spheres-doubt-donut.svg'} />
        </div>

        <div className="legend-block">
          <div className="title-panel"><h4>Disposizione</h4></div>
            <img src={process.env.PUBLIC_URL + '/territory-legend-spheres-disposizione.svg'} />
        </div>
      </>
    );
  }
}
