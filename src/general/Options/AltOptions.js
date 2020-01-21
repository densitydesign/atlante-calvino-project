import React, { Component } from "react";
import findIndex from "lodash/findIndex";
import isEqual from "lodash/isEqual";
import indexOf from "lodash/indexOf";
import "../../App.css";
import "./Options.css";

import Dropdown from "react-bootstrap/Dropdown";

class AltOptions extends Component {
  state = {
    show: false,
    selectedIndices: {}
  };

  updateStateFromValue = () => {
    const { value, multiple, options } = this.props;
    if (multiple) {
      const indices = options
        .map((item, i) => (indexOf(value, item.label) !== -1 ? i : undefined))
        .filter(i => i !== undefined);
      const selectedIndices = {};
      indices.forEach(i => (selectedIndices[i] = true));
      this.setState({ selectedIndices });
    } else {
      if (value) {
        const i = findIndex(options, x => x.label === value);
        this.setState({ selectedIndices: { [i]: true } });
      }
    }
  };

  componentDidMount() {
    this.updateStateFromValue();
  }

  componentDidUpdate(oldProps) {
    if (oldProps.value !== this.props.value) {
      this.updateStateFromValue();
    }
  }

  handleChange = index => {
    const { selectedIndices } = this.state;
    const { multiple, options, onChange } = this.props;
    const newSelected = !selectedIndices[index];

    if (!multiple) {
      this.setState({ selectedIndices: { [index]: newSelected } });
      onChange(newSelected ? options[index] : null);
    } else {
      const newSelectedIndices = {
        ...selectedIndices,
        [index]: newSelected
      };
      this.setState({ selectedIndices: newSelectedIndices });
      const values = Object.keys(newSelectedIndices)
        .sort()
        .filter(x => newSelectedIndices[x])
        .map(x => options[x]);
      onChange(values);
    }
  };

  toggleDropDown = (isOpen, event, metadata) => {
    const { multiple } = this.props;
    if (metadata.source === "select" && multiple) {
      this.setState({
        show: true
      });
    } else {
      this.setState({
        show: undefined
      });
    }
  };

  render() {
    const { selectedIndices } = this.state;
    const { multiple, title, value, style, options=[] } = this.props;
    const indices = Object.keys(selectedIndices)
        .map(k => selectedIndices[k] ? k : undefined)
        .filter(i => i !== undefined);
    const anySelected = !!indices.length
    let current
    if(!multiple){
      current = anySelected ? options[indices[0]].label : undefined
    } else {
      current = anySelected ? indices.map(i => options[i].label): []
    }
    console.log("c", current, multiple)
    
    return (
      <div className="options-container" style={style}>
        <Dropdown onToggle={this.toggleDropDown} show={this.state.show}>
          <Dropdown.Toggle>
            {!multiple && anySelected && (
              <div>
                <span className="micro-title">{title}</span>
                <span className="current-selection">
                  {current}
                </span>
              </div>
            )}
            {multiple && anySelected && (
              <div>
                <span className="micro-title">{title}</span>
                <span className="current-selection">
                  {current.join(", ")}
                </span>
              </div>
            )}
            {!anySelected && title}
            
          </Dropdown.Toggle>
          <Dropdown.Menu
            onToggle={multiple ? undefined : this.toggleDropDown}
            show={this.state.show}
          >
            {this.props.options.map((d, i) => {
              return (
                <Dropdown.Item
                  key={i}
                  onClick={() => this.handleChange(i)}
                  className={{ active: selectedIndices[i] }}
                >
                  {d.label}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default AltOptions;

AltOptions.defaultProps = {
  style: {
    gridColumn: "span 4"
  },
  options: [],
  multiple: false,
  title: "Options",
  value: null,
  onChange: value => {}
};
