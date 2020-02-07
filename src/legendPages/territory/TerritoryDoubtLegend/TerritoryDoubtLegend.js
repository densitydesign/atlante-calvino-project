
import React from 'react';

import './TerritoryDoubtLegend.css';

export default class TerritoryDoubtLegend extends React.Component
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
          <div className="title-panel"><h4>Occorrenze</h4></div>
            <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-doubt-colore.svg'} alt="legend information" />
        </div>

        <div className="legend-block">
          <div className="title-panel"><h4>Percentuale</h4></div>
            <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-doubt-intensita.svg'} alt="legend information" />
        </div>

        <div className="legend-block">
        <div className="title-panel"><h4>Rapporto Nebbia/Cancellazione</h4></div>
            <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-doubt-donut.svg'} alt="legend information" />
        </div>

        <div className="legend-block">
          <div className="title-panel"><h4>Disposizione</h4></div>
            <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-disposizione.svg'} alt="legend information" />
        </div>
      </>
    );
  }
}
