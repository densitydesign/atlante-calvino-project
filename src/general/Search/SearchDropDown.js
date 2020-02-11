import React, { Component, createRef } from "react";
import "../../App.css";
import "./Search.css";
import { Typeahead, Token, Highlighter, Menu, MenuItem } from "react-bootstrap-typeahead";
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
  const isSelected = selectedValues.map(x => x.value).indexOf(option.value) !== -1
  return (
    <Highlighter search={props.text} key={idx}>
      {option.label}
    </Highlighter>
  );
};

class Search extends Component {
  state = {
    selected: []
  };

  render() {
    let isSelection = false;
    const { maxTokens } = this.props;

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

            this.setState({ selected: newSelected });
            this.props.changeOptions(selected);
          }}
          selected={this.state.selected}
          disabled={this.state.openOverflow}
          onInputChange={this.props.onInputChange}
          options={this.props.data.options}
          filterBy={this.props.filterBy}
          id="main-search"
          filterBy={(option, props) => {
            if (!props.text) {
              return option;
            }
            return option.label.indexOf(props.text) !== -1 ? option : null;
          }}
          // renderMenu={(results, menuProps) => (
          //   <Menu {...menuProps}>
          //     {results.map((result, index) => (
          //       <MenuItem option={result} position={index} className={`bg-primary text-white`}>
          //         {result.label}
          //       </MenuItem>
          //     ))}
          //   </Menu>
          // )}
          renderMenuItemChildren={(option, props, idx) =>
            renderMenuItemChildren(option, props, idx, this.state.selected)
          }
          renderToken={(option, props, index) => {
            return index < maxTokens ? (
              renderToken(option, props, index)
            ) : index === maxTokens ? (
              <Token
                disabled={props.disabled}
                key={index}
                onRemove={() => {
                  this.typeahead.focus();
                }}
                tabIndex={props.tabIndex}
              >
                +{this.state.selected.length - maxTokens}
              </Token>
            ) : null;
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
