import React, { Component } from 'react';
import './MultipleSelection.css';

class MultipleSelection extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    // get all checkboxes
    let checkboxes = document.getElementById(this.props.id).getElementsByTagName('input');
    // convert from HTMLcollection into a JS array
    checkboxes = Array.from(checkboxes);
    // remap and filter
    checkboxes = checkboxes.map(d=>{return {'name':d.name, 'status':d.checked} });
    checkboxes = checkboxes.filter(d=>d.status)
    checkboxes = checkboxes.map(d=>d.name)
    this.props.changeOptions(checkboxes);
  }

  render() {
    return (
      <div style={this.props.style}>
        <h5>{this.props.title}</h5>

        <ul id={this.props.id} className="multiple-selection-menu">
          {
            this.props.options.map( (d,i) => {
              return <li key={i}><input type="checkbox" name={d} onChange={this.handleChange} defaultChecked={true} />{d}</li>
            })
          }
        </ul>
      </div>
    );
  }
}

export default MultipleSelection;

MultipleSelection.defaultProps = { title: 'Select an option' };
