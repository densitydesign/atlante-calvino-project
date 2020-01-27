
import React from 'react';

import V from './listTypesPerText.d3';

export default class ListTypesPerText extends React.Component
{
  componentDidMount()
  {
    V.initialize(this._rootNode, this.props.data);
  }

  componentWillUnmount()
  {
    V.destroy(this._rootNode);
  }

  _setRef = componentNode => this._rootNode = componentNode;

  render()
  {
    return <svg id={this.props.id} width="100%" ref={this._setRef}></svg>;
  }
}