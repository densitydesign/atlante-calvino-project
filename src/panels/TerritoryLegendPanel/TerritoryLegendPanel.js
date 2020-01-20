
import React from 'react';

import TerritoryChronologyLegend from '../../legendPages/territory/TerritoryChronologyLegend/TerritoryChronologyLegend';
import TerritoryVolumesLegend from '../../legendPages/territory/TerritoryVolumesLegend/TerritoryVolumesLegend';
import TerritoryDoubtLegend from '../../legendPages/territory/TerritoryDoubtLegend/TerritoryDoubtLegend';
import TerritoryShapeLegend from '../../legendPages/territory/TerritoryShapeLegend/TerritoryShapeLegend';
import TerritorySpaceLegend from '../../legendPages/territory/TerritorySpaceLegend/TerritorySpaceLegend';

import './TerritoryLegendPanel.css';
import GlobalData from '../../utilities/GlobalData';

export default class TerritoryLegendPanel extends React.Component
{
  render()
  {
    let legendPage;

    switch(this.props.page)
    {
      case GlobalData.legendPages.territory.chronology : legendPage = <TerritoryChronologyLegend />; break;
      case GlobalData.legendPages.territory.volumes    : legendPage = <TerritoryVolumesLegend />; break;
      case GlobalData.legendPages.territory.doubt      : legendPage = <TerritoryDoubtLegend />; break;
      case GlobalData.legendPages.territory.shape      : legendPage = <TerritoryShapeLegend />; break;
      case GlobalData.legendPages.territory.space      : legendPage = <TerritorySpaceLegend />; break;
      default : break;
    }

    return (
      <div className="territory-legend-panel">
        { legendPage }
      </div>
    );
  }
}