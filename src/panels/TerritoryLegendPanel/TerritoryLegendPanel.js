
import React from 'react';

import TerritoryChronologyLegend from '../../legendPages/territory/TerritoryChronologyLegend/TerritoryChronologyLegend';
import TerritoryVolumesLegend from '../../legendPages/territory/TerritoryVolumesLegend/TerritoryVolumesLegend';

import TerritoryDoubtLegend from '../../legendPages/territory/TerritoryDoubtLegend/TerritoryDoubtLegend';
import TerritoryDoubtOccurrencesLegend from '../../legendPages/territory/TerritoryDoubtOccurrencesLegend/TerritoryDoubtOccurrencesLegend';
import TerritoryDoubtProportionLegend from '../../legendPages/territory/TerritoryDoubtProportionLegend/TerritoryDoubtProportionLegend';

import TerritoryShapeLegend from '../../legendPages/territory/TerritoryShapeLegend/TerritoryShapeLegend';
import TerritoryShapeProportion1Legend from '../../legendPages/territory/TerritoryShapeProportion1Legend/TerritoryShapeProportion1Legend';
import TerritoryShapeProportion2Legend from '../../legendPages/territory/TerritoryShapeProportion2Legend/TerritoryShapeProportion2Legend';

import TerritorySpaceLegend from '../../legendPages/territory/TerritorySpaceLegend/TerritorySpaceLegend';
import TerritorySpaceOccurrencesLegend from '../../legendPages/territory/TerritorySpaceOccurrencesLegend/TerritorySpaceOccurrencesLegend';
import TerritorySpaceProportionLegend from '../../legendPages/territory/TerritorySpaceProportionLegend/TerritorySpaceProportionLegend';
import TerritorySpaceHierarchiesLegend from '../../legendPages/territory/TerritorySpaceHierarchiesLegend/TerritorySpaceHierarchiesLegend';

import './TerritoryLegendPanel.css';
import GlobalData from '../../utilities/GlobalData';

export default class TerritoryLegendPanel extends React.Component
{
  render()
  {
    let legendPage;

    switch(this.props.page)
    {
      case GlobalData.legendPages.territory.chronology       : legendPage = <TerritoryChronologyLegend />; break;
      case GlobalData.legendPages.territory.volumes          : legendPage = <TerritoryVolumesLegend />; break;

      case GlobalData.legendPages.territory.doubtOccurrences : legendPage = <TerritoryDoubtOccurrencesLegend />; break;
      case GlobalData.legendPages.territory.doubtProportion  : legendPage = <TerritoryDoubtProportionLegend />; break;

      case GlobalData.legendPages.territory.shapeProportion1 : legendPage = <TerritoryShapeProportion1Legend />; break;
      case GlobalData.legendPages.territory.shapeProportion2 : legendPage = <TerritoryShapeProportion2Legend />; break;

      case GlobalData.legendPages.territory.spaceOccurrences : legendPage = <TerritorySpaceOccurrencesLegend />; break;
      case GlobalData.legendPages.territory.spaceProportion  : legendPage = <TerritorySpaceProportionLegend />; break;
      case GlobalData.legendPages.territory.spaceHierarchies : legendPage = <TerritorySpaceHierarchiesLegend />; break;

      default : break;
    }






















    return (
      <div className="territory-legend-panel">
        { legendPage }
      </div>
    );
  }
}
