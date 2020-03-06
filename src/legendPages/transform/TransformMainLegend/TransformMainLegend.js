
import React from 'react';

import './TransformMainLegend.css';

export default class TransformMainLegend extends React.Component
{
  render()
  {
    return (
      <>
        <div className="transform-legend-block">
          <div className="title-panel"><h4>Dimensione</h4></div>
            <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-noAnalysis-dimensione.svg'} alt="legend information" />
        </div>

        <div className="transform-legend-block">
          <div className="title-panel"><h4>Cronologia</h4></div>
            <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-chronology-modalita.svg'} alt="legend information" />
        </div>

        <div className="transform-legend-block">
          <div className="title-panel"><h4>Disposizione</h4></div>
            <img src={process.env.PUBLIC_URL + '/legendTerritory/territory-legend-chronology-positioning.svg'} alt="legend information" />
        </div>
      </>
    );
  }
}
