import React, { Component } from 'react';
import './TimeFilter.css';
import Viz from './time-filter.d3'

class TimeFilter extends Component {
  constructor(props) {
    super(props);
    this.changeSpan = this.changeSpan.bind(this);
  }

  changeSpan(span) {
    this.props.changeSpan(span);
  }

  componentDidMount() {
    this._chart = Viz.initialize(this._rootNode, this.props.data, this.changeSpan);
  }

  componentDidUpdate() {
    // Viz.update(this.props.data);
  }

  componentWillUnmount() {
    Viz.destroy(this._rootNode);
  }

  _setRef(componentNode) {
      this._rootNode = componentNode;
  }

  render() {
    return (
      <div style={this.props.style}>
        <h5>{this.props.title}</h5>
        <svg id="time-filter" ref={this._setRef.bind(this)}></svg>
      </div>
    );
  }
}

export default TimeFilter;

TimeFilter.defaultProps = { title: 'Time Filter' };
