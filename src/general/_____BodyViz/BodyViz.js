import React, { Component } from 'react';
import './BodyViz.css';

class BodyViz extends Component {
  render() {
    return <div className={this.props.className}>{this.props.children}</div>;
  }
}

export default BodyViz;
