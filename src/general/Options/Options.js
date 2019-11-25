import React, { Component } from 'react';
import './Options.css'

import Dropdown from 'react-bootstrap/Dropdown'

class Options extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show:undefined,
      selection: (this.props.data.multiple===false) ? this.props.data.options.filter(d=>d.status)[0].label : undefined
    }
    this.handleChange = this.handleChange.bind(this);
    this.toggleDropDown = this.toggleDropDown.bind(this);
  }

  componentDidMount() {
    // console.log('Mounted',this.props.title, this.props.data);
  }

  componentDidUpdate() {
    console.log('Update',this.props.title)
    if (this.props.data.reset) {
      let newOptions = this.props.data.options.slice(0)
      newOptions.forEach(d=>d.status=false)
      if (this.props.changeOptions){
        this.props.changeOptions(newOptions)
      } else {
        console.log('No function')
      }
    }
  }

  handleChange(event,ee) {
    const name = event.target.getAttribute('name');

    // A convenient way to clone an array, since it is a bad thing to directly modify the props
    let newOptions = this.props.data.options.slice(0)

    if (!this.props.data.multiple) {
      newOptions.forEach(d=>d.status=false)
      this.setState({
        selection:name
      })
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

        <Dropdown onToggle={this.toggleDropDown} show={this.state.show}>
          <Dropdown.Toggle>
            { !this.props.data.multiple && (
                <div>
                  <span className="micro-title">{this.props.title}</span>
                  <span className="current-selection">{this.state.selection}</span>
                </div>
              )
            }
            { this.props.data.multiple && this.props.title }
          </Dropdown.Toggle>
          <Dropdown.Menu onToggle={this.toggleDropDown} show={this.state.show}>
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
          </Dropdown.Menu>
        </Dropdown>

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
