
import React from 'react';

//import V from './archipelago.d3';

export default class Archipelago extends React.Component
{
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