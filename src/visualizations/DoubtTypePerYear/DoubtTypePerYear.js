
import React from 'react';

import V from './DoubtTypePerYear.d3';

export default class DoubtTypePerYear extends React.Component
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
    const style = {
      height: '300px',
      marginTop: '1em',
      marginBottom: '2em'
    }
    return <svg id={this.props.id} style={style} ref={this._setRef}></svg>;
  }
}
