import React, { Component } from 'react';
import ReactDOM from "react-dom";

class Options extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.setOptions = this.setOptions.bind(this);
  }

  handleChange(event) {
    const now_selected_name = event.target.getAttribute('name');
    const node = ReactDOM.findDOMNode(this);
    const options = node.querySelectorAll('input.option');

    if (!this.props.data.multiple) {
      options.forEach(d=>{
        const name = d.getAttribute("name")
        if (name!==now_selected_name) {
          d.checked = false;
        }
      })
    }

    const selection = Array.from(options).map(d=>{return {'name':d.name, 'status':d.checked} });

    // console.log(selection);

    // // get all checkboxes
    // let checkboxes = document.getElementById(this.props.id).getElementsByTagName('input');
    // // convert from HTMLcollection into a JS array
    // checkboxes = Array.from(checkboxes);
    // // remap and filter
    // checkboxes = checkboxes.map(d=>{return {'name':d.name, 'status':d.checked} });
    // checkboxes = checkboxes.filter(d=>d.status)
    // checkboxes = checkboxes.map(d=>d.name)
    // this.props.changeOptions(checkboxes);
  }

  setOptions(new_selection) {
    const node = ReactDOM.findDOMNode(this);
    const options = node.querySelectorAll('input.option');
    if (new_selection==='all') {
      options.forEach(d=>{d.checked = true})
    } else if (new_selection.length > 0){
      options.forEach(d=>{
        const is_checked = new_selection.indexOf(d.getAttribute("name")) > -1;
        d.checked = is_checked;
      })
    } else {
      options.forEach(d=>{d.checked = false})
    }
  }

  componentDidMount() {
    // console.log('mounted',this.props.title)
    this.setOptions(this.props.data.set)
  }

  componentDidUpdate() {
    console.log('update',this.props.title)
    // this.setOptions(this.props.def_selection)
  }

  render() {
    return <div style={this.props.style} title={this.props.title}>
      {this.props.title}
      {
        this.props.data.options.map( (d,i) => {
          return (
            <li key={i} name={d}>
              <input className="option" type="checkbox" name={d} onChange={this.handleChange} defaultChecked={false} />{d}
            </li>
          )
        })
      }
    </div>;
  }
}

export default Options;

Options.defaultProps = {
  style: {
    gridColumn: 'span 4'
  },
  data: {
    options: [],
    multiple: false,
    set: ''
  },
  title: 'Options',

}
