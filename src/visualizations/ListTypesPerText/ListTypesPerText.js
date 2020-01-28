
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
    const style={
      width: '100%',
      height: '600px',
      marginTop: '2em',
      marginBottom: '4em',
      borderBottom: '1px solid #000000'
    }
    return <svg id={this.props.id} style={style} ref={this._setRef}></svg>;
  }
}
