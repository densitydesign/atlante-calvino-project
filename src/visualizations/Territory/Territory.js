
import React from 'react';

import V from './territory.d3';

export default class Territory extends React.Component
{
  componentDidMount()
  {
    V.initialize(this._rootNode, this.props.data);
    this.props.containerSetTerritoryCallback(this.territoryCallback);
  }

  componentWillUnmount()
  {
    V.destroy(this._rootNode);
  }  

  territoryCallback = (value) => {
//    V.setColor(value);
    V.setTilt(1);
  }  

  _setRef(componentNode)
  {
    this._rootNode = componentNode;
  }

  render()
  {
    const style = { width : "100%", height : "100%" };

    return <svg id={this.props.id} style={style} ref={this._setRef.bind(this)}></svg>;
  }
}