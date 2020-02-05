
import React from 'react';

import './TerritoryDoubtOccurrencesLegend.css';

export default class TerritoryDoubtOccurrencesLegend extends React.Component
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
          <div className="title-panel"><h4>OCCORRENZE DI</h4></div>
          <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-doubt-colore.svg'} />
        </div>

        <div className="legend-block">
          <div className="title-panel"><h4>PERCENTUALE</h4></div>
          <div className="title-panel"><small>Sul totale per ogni occorrenza</small></div>
          <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-spheres-doubt-intensita.svg'} />
        </div>

      </>
    );
  }
}
