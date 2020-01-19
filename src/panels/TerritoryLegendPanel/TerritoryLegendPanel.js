
import React from 'react';

import TerritoryChronologyLegend from '../../legendPages/territory/TerritoryChronologyLegend/TerritoryChronologyLegend';
import TerritoryVolumensLegend from '../../legendPages/territory/TerritoryVolumesLegend/TerritoryVolumesLegend';
import TerritoryDoubtLegend from '../../legendPages/territory/TerritoryDoubtLegend/TerritoryDoubtLegend';
import TerritoryShapeLegend from '../../legendPages/territory/TerritoryShapeLegend/TerritoryShapeLegend';
import TerritoryRealismLegend from '../../legendPages/territory/TerritoryRealismLegend/TerritoryRealismLegend';

import './TerritoryLegendPanel.css';
import GlobalData from '../../utilities/GlobalData';

export default class TerritoryLegendPanel extends React.Component
{
/*
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
*/

  render()
  {
    let legendPage;

    switch(this.props.page)
    {
      case GlobalData.legendPages.territory.chronology : legendPage = <TerritoryChronologyLegend />; break;
      case GlobalData.legendPages.territory.volumes    : legendPage = <TerritoryVolumensLegend />; break;
      case GlobalData.legendPages.territory.doubt      : legendPage = <TerritoryDoubtLegend />; break;
      case GlobalData.legendPages.territory.shape      : legendPage = <TerritoryShapeLegend />; break;
      case GlobalData.legendPages.territory.realism    : legendPage = <TerritoryRealismLegend />; break;
      default : break;
    }

    return (
      <div className="territory-legend-panel">
        { legendPage }
      </div>
    );
  }
}