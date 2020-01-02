
import React from 'react';

import V from './territory.d3';

export default class Territory extends React.Component
{
  componentDidMount()
  {
    V.initialize(this._rootNode, this.props.data);
    this.props.containerSetTerritorySetHighlightMode(this.setHighlightMode);
    this.props.containerSetTerritorySetHillColoringMode(this.setHillColoringMode);
  }

  componentWillUnmount()
  {
    V.destroy(this._rootNode);
  }

  setHighlightMode = value => {
    V.set_yRatio(1);
    V.setHighlightMode(value);
    V.showHillsTops(0);    
  }

  setHillColoringMode = value => V.setHillColoringMode(value);

  _setRef(componentNode)
  {
    this._rootNode = componentNode;
  }

  render()
  {
    const style = { width : "100%", height : "70%", flexGrow : 1 };

    return <svg id={this.props.id} style={style} ref={this._setRef.bind(this)}></svg>;
  }
}