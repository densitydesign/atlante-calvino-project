import React, { Component } from 'react';
import './SetOption.css'

class SetOption extends Component {

  handleChange(event) {
    const newValue = event.target.value
    console.log(newValue)
    this.props.changeOptions(newValue);
  }

  render() {
    return (
      <div className="set-option" style={this.props.style}>
        <h5>{this.props.title}</h5>
        <label className="switch">
          <input type="checkbox" onChange={this.props.changeOption} />
          <span className="slider round"></span>
        </label>
      </div>
    );
  }
}

export default SetOption;

SetOption.defaultProps = {
  title: 'Option',
  changeOption: function(value){ console.log('changed!', value) }
};
