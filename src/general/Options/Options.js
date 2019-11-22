import React, { Component } from 'react';
import ReactDOM from "react-dom";
import './Options.css'

import { DropdownButton, Dropdown } from 'react-bootstrap';

class Options extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show:undefined
    }
    this.handleChange = this.handleChange.bind(this);
    this.toggleDropDown = this.toggleDropDown.bind(this);
  }

  componentDidMount() {
    console.log('Mounted',this.props.title, this.props.data);
  }

  componentDidUpdate() {
    console.log('Update',this.props.title)
  }

  handleChangeOLD(event) {
    const now_selected_name = event.target.getAttribute('name');
    const node = ReactDOM.findDOMNode(this);
    const items = node.querySelectorAll('.dropdown-item');

    if (!this.props.data.multiple) {
      items.forEach(d=>{
        const name = d.getAttribute("name")
        if (name!==now_selected_name) {
          d.classList.remove("active")
        }
      })
    }
    event.target.classList.add("active")
    const selection = Array.from(items).map(d=>{return {'name':d.name, 'status':d.classList.contains('active')} });
    console.log('pass the selection', selection);
  }

  handleChange(event,ee) {
    const name = event.target.getAttribute('name');

    // A convenient way to clone an array, since it is a bad thing to directly modify the props
    let newOptions = this.props.data.options.slice(0)

    if (!this.props.data.multiple) {
      newOptions.forEach(d=>d.status=false)
    }

    // If "all" is selected, invert the selection, then return
    if (name==="all"){
      newOptions.forEach(d=>d.status=!d.status);
    } else {
      const selected_item = newOptions.filter(d=>d.label===name)
      if (selected_item.length>0) {
        selected_item[0].status = !selected_item[0].status
      }
    }

    if (this.props.changeOptions){
      this.props.changeOptions(newOptions)
    } else {
      console.log('No function')
    }

  }

  toggleDropDown(isOpen,event,metadata) {
    if (metadata.source==="select"&&this.props.data.multiple){
      this.setState({
        show: true
      })
    } else {
      this.setState({
        show: undefined
      })
    }
  }

  render() {
    return (
      <div className="options-container" style={this.props.style}>
        <DropdownButton title={this.props.title} onToggle={this.toggleDropDown} show={this.state.show}>
          {
            this.props.data.options.map( (d,i) => {
              return (
                <Dropdown.Item key={i} name={d.label} onClick={this.handleChange} className={{'active':d.status}}>
                  {d.label}
                </Dropdown.Item>
              )
            })
          }
          { this.props.data.multiple && (
            <Dropdown.Item key={5} name="all" onClick={this.handleChange} className={{'active':false}}>
              Inverti Selezione
            </Dropdown.Item>
          ) }
        </DropdownButton>
      </div>
    )
  }
}

export default Options;

Options.defaultProps = {
  style: {
    gridColumn: 'span 4'
  },
  data: {
    options: [],
    multiple: false
  },
  title: 'Options',

}
