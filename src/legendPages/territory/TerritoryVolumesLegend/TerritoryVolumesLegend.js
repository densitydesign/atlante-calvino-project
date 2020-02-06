
import React from 'react';

import './TerritoryVolumesLegend.css';

export default class TerritoryVolumesLegend extends React.Component
{
  render()
  {
    return (
      <>
        <div className="legend-block">
            <div className="title-panel"><h4>Dimensione</h4></div>
            <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-noAnalysis-dimensione.svg'} />
        </div>

        <div className="legend-block">
            <div className="title-panel"><h4>Raccolta</h4></div>
            <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-volumes-modalita.svg'} />
        </div>

        <div className="legend-block">
    <div className="title-panel"><h4>Volumi</h4></div>
    <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-volumes-codice_colori_large.svg'} />
        </div>

        <div className="legend-block">
              <div className="title-panel"><h4>Disposizione</h4></div>
            <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-volumes-positioning.svg'} />
        </div>
      </>
    );
  }
}
