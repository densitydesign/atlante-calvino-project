import React, { Component, createRef } from "react";
import "../../App.css";
import "./SearchDropDown.css";
import {
  Typeahead,
  Token,
  Highlighter,
  Menu,
  MenuItem
} from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead-bs4.css";
import groupBy from "lodash/groupBy";

const renderToken = (option, props, idx) => (
  <Token
    disabled={props.disabled}
    key={idx}
    onRemove={props.onRemove}
    tabIndex={props.tabIndex}
  >
    {option.label}
  </Token>
);

const renderMenuItemChildren = (option, props, idx, selectedValues) => {

  return (
    <Highlighter search={props.text} key={idx}>
      {option.label}
    </Highlighter>
  );
};

class Search extends Component {
  render() {
    let isSelection = false;
    const { maxTokens, selectedOptions } = this.props;

    return (
      <div className="search-component" style={this.props.style}>
        {!isSelection && (
          <span style={{ fontSize: "1rem", position: "relative", top: "-3px" }}>
            /
          </span>
        )}
        <Typeahead
          ref={typeahead => (this.typeahead = typeahead)}
          multiple
          onChange={selected => {
            const selectedGroups = groupBy(selected, x => x.value);
            const dupes = Object.keys(selectedGroups).filter(
              x => selectedGroups[x].length > 1
            );
            const newSelected = selected.filter(
              item => dupes.indexOf(item.value) === -1
            );
            this.props.changeOptions(newSelected);
          }}
          selected={selectedOptions}
          disabled={false}
          onInputChange={this.props.onInputChange}
          options={this.props.data.options}
          id="main-search"
          filterBy={(option, props) => {
            if (!props.text) {
              return option;
            }
            return option.label.toLowerCase().indexOf(props.text.toLowerCase()) !== -1 ? option : null;
          }}
          renderMenu={(results, menuProps) => (
            <Menu {...menuProps} className="rbt-menu-container">
              {results.map((result, index) => {
                const isSelected =
                selectedOptions.map(x => x.value).indexOf(result.value) !== -1;
                return (
                  <MenuItem
                    key={index}
                    option={result}
                    position={index}
                    className={`dropdown-item-selectable ${isSelected ? 'selected' : ''}`}
                  >
                    {result.label}
                  </MenuItem>
                );
              })}
            </Menu>
          )}
          renderMenuItemChildren={(option, props, idx) =>
            renderMenuItemChildren(option, props, idx, selectedOptions)
          }
          renderToken={(option, props, index) => {
            if (selectedOptions.length - index - 1 < maxTokens) {
              return renderToken(option, props, index)
            } else if (selectedOptions.length - index - 1 === maxTokens) {
              return (
                <span key={index} className="rbt-token" onClick={() => this.typeahead.focus()}>
                  +{selectedOptions.length - maxTokens}
                </span>
              )
            } else {
              return null
            }
          }}
        />
      </div>
    );
  }
}

export default Search;

Search.defaultProps = {
  maxTokens: 2,
  style: {
    gridColumn: "span 4"
  }
};
