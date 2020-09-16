
import React from 'react';

import V from './territory.d3';

import './Territory.css';

export default class Territory extends React.Component
{
  componentDidMount()
  {
    V.initialize(
      this._rootNode, 
      this.props.data, 
      this.props.colors, 
      this.props.analysisMode,
      this.props.containerOnSvgClicked,
      this.props.containerSetAllowDropMenus);
    
    this.props.containerSetTerritorySetHighlightMode(this.setHighlightMode);
    this.props.containerSetTerritoryShowHills(this.showHills);
    this.props.containerSetTerritorySetDataExtent(this.setDataExtent);
    this.props.containerSetTerritoryApplyBeeSwarmFilter(this.applyBeeSwarmFilter);
    this.props.containerSetTerritoryApplySearchFilterByInputText(this.applySearchFilterByInputText);
    this.props.containerSetTerritoryApplySearchFilterBySearchResults(this.applySearchFilterBySearchResults);
  }

  componentWillUnmount()
  {
    V.destroy(this._rootNode);
  }

                  setHighlightMode =                      value => V.setHighlightMode(value);
                         showHills =                    opacity => V.showHills(opacity);
                     setDataExtent =                     extent => V.setDataExtent(extent);
               applyBeeSwarmFilter =                         () => V.applyBeeSwarmFilter();
      applySearchFilterByInputText =                  inputText => V.applySearchFilterByInputText(inputText);
  applySearchFilterBySearchResults = (mustReset, searchResults) => V.applySearchFilterBySearchResults(mustReset, searchResults);

  _setRef = componentNode => this._rootNode = componentNode;

  render()
  {
    const style = { width : "100%", height : "70%", flexGrow : 1};

    return <svg id={this.props.id} style={style} ref={this._setRef}></svg>;
  }
}
