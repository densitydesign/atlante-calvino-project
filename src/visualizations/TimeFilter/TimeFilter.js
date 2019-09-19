import React, { Component } from 'react';
import Loading from '../../general/Loading';

class TimeFilter extends Component {

  componentDidMount() {
    console.log(this.props.data);
  }

  componentDidUpdate() {
    console.log(this.props.data);
  }

  render() {
    console.log(this.props.isLoading)
    return (
      <div style={this.props.style}>
        sono più bello di andre
      </div>
    );
  }
}

export default TimeFilter;
