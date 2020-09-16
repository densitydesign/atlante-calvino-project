
import React from 'react';

import * as d3 from 'd3';

import ListTypesPerText from './ListTypesPerText';

export default class ListTypesPerTextWrapper extends React.Component
{
  state = {
    data : "data not yet loaded",
    isLoading : true
  };

  componentDidMount()
  {
    this.loadData();
  }

  loadData = () =>
  {
    // MP20200127 : see TerritoryWrapper.js for a more complete text data extraction process.
    d3
      .csv(process.env.PUBLIC_URL + "/territory-text-sheet.csv")
      .then(csv => this.setState({ data : csv, isLoading : false }));
  }

  render()
  {
    return (
      <>
        {!this.state.isLoading &&
          <ListTypesPerText
            id="listTypes"
            data={this.state.data}
          />
        }
      </>
    );
  }
}
