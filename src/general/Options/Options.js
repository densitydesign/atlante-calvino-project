import React, { Component } from "react"
import classnames from "classnames"
import "./Options.css"

import Dropdown from "react-bootstrap/Dropdown"
import { withTranslation } from "react-i18next"

class Options extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: undefined,
      selection:
        this.props.data.multiple === false
          ? this.props.data.options.filter((d) => d.status)[0].label
          : undefined,
    }
    this.handleChange = this.handleChange.bind(this)
    this.toggleDropDown = this.toggleDropDown.bind(this)
  }

  componentDidMount() {
    // console.log('Mounted',this.props.title, this.props.data);
  }

  componentDidUpdate() {
    // console.log('Update',this.props.title)
    if (this.props.data.reset) {
      let newOptions = this.props.data.options.slice(0)
      newOptions.forEach((d) => (d.status = false))
      if (this.props.changeOptions) {
        this.props.changeOptions(newOptions)
      } else {
        console.log("No function")
      }
    }
  }

  handleChange(event, ee) {
    const name = event.target.getAttribute("name")

    // A convenient way to clone an array, since it is a bad thing to directly modify the props
    let newOptions = this.props.data.options.slice(0)

    if (!this.props.data.multiple) {
      newOptions.forEach((d) => (d.status = false))
      this.setState({
        selection: name,
      })
    }

    // If "all" is selected, invert the selection, then return
    if (name === "all") {
      newOptions.forEach((d) => (d.status = !d.status))
    } else {
      const selected_item = newOptions.filter((d) => d.label === name)
      if (selected_item.length > 0) {
        selected_item[0].status = !selected_item[0].status
      }
    }

    if (this.props.changeOptions) {
      this.props.changeOptions(newOptions)
    } else {
      console.log("No function")
    }
  }

  toggleDropDown(isOpen, event, metadata) {
    if (metadata.source === "select" && this.props.data.multiple) {
      this.setState({
        show: true,
      })
    } else {
      this.setState({
        show: undefined,
      })
    }
  }

  render() {
    return (
      <div className="options-container" style={this.props.style}>
        <Dropdown onToggle={this.toggleDropDown} show={this.state.show}>
<<<<<<< HEAD
          <Dropdown.Toggle disabled={this.props.disabled}>
            {!this.props.data.multiple && (
              <div>
                <span className="micro-title">{this.props.title}</span>
                <span className="current-selection">
                  {this.props.t('options.'+this.state.selection)}
                </span>
              </div>
            )}
            {this.props.data.multiple && this.props.title}
=======
          <Dropdown.Toggle>
            { !this.props.data.multiple && (
                <div>
                  <span className="micro-title">{this.props.title}</span>
                  <span className="current-selection">{this.state.selection}</span>
                </div>
              )
            }
            {/* { this.props.data.multiple && this.props.title } */}
>>>>>>> 290df94... ricerca cancellazione
          </Dropdown.Toggle>
          <Dropdown.Menu
            className={classnames({
              "d-flex": this.props.isFlex,
              "flex-wrap": this.props.isFlex,
            })}
            onToggle={this.toggleDropDown}
            show={this.state.show}
          >
            {this.props.data.options.map((d, i) => {
              return (
                <Dropdown.Item
                  style={{ borderRight: "1px solid #000" }}
                  key={i}
                  name={d.label}
                  onClick={this.handleChange}
                  className={classnames({
                    active: d.status,
                    "dropdown-chessboard": this.props.isFlex,
                  })}
                >
                  {this.props.t('options.'+d.label)}
                </Dropdown.Item>
              )
            })}
            {this.props.data.multiple && (
              <Dropdown.Item
                key={5}
                name="all"
                onClick={this.handleChange}
                className={classnames({
                  active: false,
                  "dropdown-chessboard": this.props.isFlex,
                })}
              >
                {this.props.isFlex ? this.props.t("options.Inverti") : this.props.t("options.Inverti_Selezione")}
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    )
  }
}

export default withTranslation(['translation'])(Options)

Options.defaultProps = {
  style: {
    gridColumn: "span 4",
  },
  data: {
    options: [],
    multiple: false,
  },
<<<<<<< HEAD
  title: "Options",
=======
  // title: 'Options',

>>>>>>> 290df94... ricerca cancellazione
}
