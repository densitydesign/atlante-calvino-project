import React, { Component } from 'react';
// import '../../App.css';

class HeaderViz extends Component {
  render() {
    return (
      <div className="the-header" style={this.props.style}>{this.props.children}</div>
    );
  }
}

export default HeaderViz;
