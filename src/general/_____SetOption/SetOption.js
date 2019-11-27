import React, { Component } from 'react';
import './SetOption.css'

class SetOption extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const newValue = e.target.checked;
    this.props.selected(newValue);
  }

  render() {
    return (
      <div className="set-option" style={this.props.style}>
        <h5>{this.props.title}</h5>
        <label className="switch">
          <input type="checkbox" onChange={this.handleChange}/>
          <span className="slider round"></span>
        </label>
      </div>
    );
  }
}

export default SetOption;

SetOption.defaultProps = { title: 'Option' };
