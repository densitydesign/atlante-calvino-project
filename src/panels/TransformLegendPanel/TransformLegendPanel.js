
import React from 'react';

import TerritoryMainLegend from '../../legendPages/transform/TransformMainLegend/TerritoryMainLegend';

import './TransformLegendPanel.css';
import GlobalData from '../../utilities/GlobalData';

export default class TerritoryLegendPanel extends React.Component
{
  render()
  {
    let legendPage;

    switch(this.props.page)
    {
      case GlobalData.legendPages.transform.mainLegend : legendPage = <TransformMainLegend />; break;

      default : break;
    }

    return (
      <div className="transform-legend-panel">
        { legendPage }
      </div>
    );
  }
}
