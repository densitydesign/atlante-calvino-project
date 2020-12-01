import React, { Component } from "react"
import findIndex from "lodash/findIndex"
import range from "lodash/range"
import classnames from "classnames"
import indexOf from "lodash/indexOf"
import "../../App.css"
import "./Options.css"

import Dropdown from "react-bootstrap/Dropdown"
import { withTranslation } from "react-i18next"

class AltOptions extends Component {
  state = {
    show: false,
    selectedIndices: {},
  }

  updateStateFromValue = () => {
    const { value, multiple, options, allowEmpty } = this.props
    if (multiple) {
      const indices = options
        .map((item, i) => (indexOf(value, item.label) !== -1 ? i : undefined))
        .filter((i) => i !== undefined)
      const selectedIndices = {}
      indices.forEach((i) => (selectedIndices[i] = true))
      this.setState({ selectedIndices })
    } else {
      if (!value && allowEmpty) {
        this.setState({ selectedIndices: {} })
      } else if (value) {
        const i = findIndex(options, (x) => x.label === value)
        this.setState({ selectedIndices: { [i]: true } })
      }
    }
  }

  componentDidMount() {
    this.updateStateFromValue()
  }

  componentDidUpdate(oldProps) {
    if (oldProps.value !== this.props.value) {
      this.updateStateFromValue()
    }
  }

  handleSelectAll = () => {
    const { options, onChange = [] } = this.props
    const selectedIndices = {}
    range(options.length).forEach((i) => (selectedIndices[i] = true))
    this.setState({ selectedIndices })
    const values = Object.keys(selectedIndices)
      .sort()
      .filter((x) => selectedIndices[x])
      .map((x) => options[x])
    onChange(values)
  }

  handleChange = (index) => {
    const { selectedIndices } = this.state
    const { multiple, options, onChange, allowEmpty, disabled } = this.props

    if (disabled) {
      return
    }
    const newSelected = !selectedIndices[index]

    if (multiple && !allowEmpty) {
      const howMany = Object.keys(selectedIndices).filter(
        (x) => selectedIndices[x]
      ).length
      if (howMany === 1 && selectedIndices[index]) {
        return
      }
    }

    if (!multiple && !allowEmpty && selectedIndices[index]) {
      return
    }

    if (!multiple) {
      this.setState({ selectedIndices: { [index]: newSelected } })
      onChange(newSelected ? options[index] : null)
    } else {
      const newSelectedIndices = {
        ...selectedIndices,
        [index]: newSelected,
      }
      this.setState({ selectedIndices: newSelectedIndices })
      const values = Object.keys(newSelectedIndices)
        .sort()
        .filter((x) => newSelectedIndices[x])
        .map((x) => options[x])
      onChange(values)
    }
  }

  toggleDropDown = (isOpen, event, metadata) => {
    const { multiple, disabled } = this.props
    if (disabled) {
      this.setState({
        show: false,
      })
      return
    }
    console.log(metadata.source, "metadata")
    if (metadata.source === "select" && multiple) {
      console.log("if")
      this.setState({
        show: true,
      })
    } else {
      console.log("else")
      this.setState({
        show: !this.state.show,
      })
    }
  }

  render() {
    const { selectedIndices } = this.state
    const { multiple, title, allLink, style, options = [] } = this.props
    const indices = Object.keys(selectedIndices)
      .map((k) => (selectedIndices[k] ? k : undefined))
      .filter((i) => i !== undefined)
    const anySelected = !!indices.length
    const allSelected = indices.length === options.length
    let current
    if (!multiple) {
      current = anySelected ? options[indices[0]].label : undefined
    } else {
      current = anySelected
        ? indices.map((i) => this.props.t("options." + options[i].label))
        : []
    }
    return (
      <div className="options-container" style={style}>
        <Dropdown onToggle={this.toggleDropDown} show={this.state.show}>
          <Dropdown.Toggle
            disabled={this.props.disabled}
            style={{ opacity: this.props.disabled ? 1 : undefined }}
          >
            {!multiple && anySelected && (
              <div>
                {title && <span className="micro-title">{title}</span>}
                <span className="current-selection">
                  {this.props.t("options." + current)}
                </span>
              </div>
            )}
            {multiple && anySelected && (
              <div>
                {title && <span className="micro-title">{title}</span>}
                <span className="current-selection">{current.join(", ")}</span>
              </div>
            )}
            {!anySelected && title}
          </Dropdown.Toggle>
          {this.state.show && (
            <Dropdown.Menu
              className={classnames({
                "d-flex": this.props.isFlex,
                "flex-wrap": this.props.isFlex,
              })}
              onToggle={multiple ? undefined : this.toggleDropDown}
              show={this.state.show}
            >
              {this.props.options.map((d, i) => {
                return (
                  <Dropdown.Item
                    key={i}
                    onClick={() => this.handleChange(i)}
                    style={{ width: this.props.isFlex ? "33.3%" : undefined }}
                    className={classnames({
                      active: selectedIndices[i],
                      "border-right border-dark": this.props.isFlex,
                    })}
                  >
                    {this.props.t("options." + d.label)}
                  </Dropdown.Item>
                )
              })}
              {allLink && multiple && (
                <Dropdown.Item
                  style={{ width: this.props.isFlex ? "33.3%" : undefined }}
                  onClick={() => this.handleSelectAll()}
                  className={{ active: allSelected }}
                >
                  {allLink}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          )}
        </Dropdown>
      </div>
    )
  }
}

export default withTranslation(["translation"])(AltOptions)

AltOptions.defaultProps = {
  style: {
    gridColumn: "span 4",
  },
  options: [],
  multiple: false,
  title: null,
  value: null,
  onChange: (value) => {},
  allowEmpty: true,
  allLink: null,
}
