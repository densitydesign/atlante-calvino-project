
import React from 'react';

import * as d3 from 'd3';

import DoubtTypePerYear from './DoubtTypePerYear';

export default class DoubtTypePerYearWrapper extends React.Component
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
      .csv(process.env.PUBLIC_URL + "/territory-doubt-sheet.csv")
      .then(csv => this.setState({ data : csv, isLoading : false }));
  }

  render()
  {
    return (
      <>
        {!this.state.isLoading &&
          <DoubtTypePerYear
            id="doubtTypes"
            data={this.state.data}
          />
        }
      </>
    );
  }
}
