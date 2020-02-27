
import React from 'react';

import TransformMainLegend from '../../legendPages/transform/TransformMainLegend/TransformMainLegend';

import './TransformLegendPanel.css';
import GlobalData from '../../utilities/GlobalData';

export default class TerritoryLegendPanel extends React.Component
{
  render()
  {
console.log("transform legend panel");    
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
