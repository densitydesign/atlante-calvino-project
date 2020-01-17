
import React from 'react';

import './TerritoryLegendPanel.css';

export default class TerritoryLegendPanel extends React.Component
{
  render()
  {
    return (
      <div className="territory-legend-panel">

        <div className="legend-block">
          <h4>Disposizione</h4>
          <p>
            <img src={process.env.PUBLIC_URL + '/positioning.svg'} />
          </p>
        </div>

        <div className="legend-block">
          <h4>Dimensione</h4>
          <p>
            <img src={process.env.PUBLIC_URL + '/dimensione.svg'} />
          </p>
        </div>

        <div className="legend-block">
          <h4>Cronologia</h4>
          <p>
            <img src={process.env.PUBLIC_URL + '/modalita-cronologia.svg'} />
          </p>
        </div>

        <div className="legend-block">
          <h4>Tipologia di pubblicazione</h4>
          <p>
            <img src={process.env.PUBLIC_URL + '/modalita-volumi.svg'} />
          </p>
        </div>

        <div className="legend-block">
          <h4>Colore di pubblicazione</h4>
          <p>
            <img src={process.env.PUBLIC_URL + '/codice-colori-large.svg'} />
          </p>
        </div>

      </div>
    );
  }
}