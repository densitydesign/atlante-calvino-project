import React, { Component } from 'react';

class DropDownSelect extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const selectedThemes = e.target.value
    this.props.changeOptions(selectedThemes);
  }

  render() {
    return (
      <div style={this.props.style}>
        <h5>{this.props.title}</h5>
        <select id={this.props.id} onChange={this.handleChange}>
          {
            this.props.options.map( (d,i) => {
              return <option key={i}>{d}</option>
            })
          }
        </select>
      </div>
    );
  }
}

export default DropDownSelect;

DropDownSelect.defaultProps = { title: 'Select an option' };
