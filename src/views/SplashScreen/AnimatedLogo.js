
import React from 'react';
import V from './logo.js';

export default class AnimatedLogo extends React.Component
{
  componentDidMount()
  {
console.log("this : ", this);
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

//    return <svg id={this.props.id} style={style} ref={this._setRef.bind(this)}></svg>

    return (
      <div id="logo-box" className="col-12 col-sm-12 col-md-12 col-lg-10 mx-auto d-flex flex-column justify-content-center">
            </div>
    );
  }
}