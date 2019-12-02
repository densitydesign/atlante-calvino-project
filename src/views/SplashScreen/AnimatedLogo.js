
import React from 'react';
import V from './logo.js';

export default class AnimatedLogo extends Component
{
  componentDidMount()
  {
    this._chart = V.initialize(
      this._rootNode,
      this.props.data);
  }

  componentDidUpdate()
  {
  }
  
  componentWillUnmount()
  {
  }

  _setRef(componentNode)
  {
    this._rootNode = componentNode;
  }

  render()
  {
    const style = {
      width : "100%",
      height : "100%"
    };

    return <svg id={this.props.id} style={style} ref={this._setRef.bind(this)}></svg>
  }
}