
import React from 'react';

import V from './territory.d3';

import './Territory.css';

export default class Territory extends React.Component
{
  componentDidMount()
  {
    V.initialize(this._rootNode, this.props.data);
    this.props.containerSetTerritorySetHighlightMode(this.setHighlightMode);
    this.props.containerSetTerritorySetHillColoringMode(this.setHillColoringMode);
    this.props.containerSetTerritoryShowHills(this.showHills);
    this.props.containerSetTerritorySetDataExtent(this.setDataExtent);
    this.props.containerSetTerritoryApplyBeeSwarmFilter(this.applyBeeSwarmFilter);
    this.props.containerSetTerritoryApplySearchFilter(this.applySearchFilter);
  }

  componentWillUnmount()
  {
    V.destroy(this._rootNode);
  }

     setHighlightMode = value     => V.setHighlightMode(value);
  setHillColoringMode = value     => V.setHillColoringMode(value);
            showHills = opacity   => V.showHills(opacity);
        setDataExtent = extent    => V.setDataExtent(extent);
  applyBeeSwarmFilter = ()        => V.applyBeeSwarmFilter();
    applySearchFilter = inputText => V.applySearchFilter(inputText);

  _setRef = componentNode => this._rootNode = componentNode;

  render()
  {
    const style = { width : "100%", height : "70%", flexGrow : 1 };

    return <svg id={this.props.id} style={style} ref={this._setRef}></svg>;
  }
}