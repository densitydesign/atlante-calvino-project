import React, { Component } from 'react';

class SimpleDropDown extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.changeOption(e.target.value);
  }

  render() {
    return (
      <select style={this.props.style} onChange={this.handleChange}>
        { this.props.options.map( (d,i) => {
          return <option key={i}>{d}</option>
        })}
      </select>
    );
  }
}

export default SimpleDropDown;
