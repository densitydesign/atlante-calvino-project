
import React from 'react';

import * as d3 from 'd3';

import CompassTimeSinuous from './CompassTimeSinuous';

export default class CompassTimeSinuousWrapper extends React.Component
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
      .json(process.env.PUBLIC_URL + "/data/CompassTimeSinuousData.json")
      .then(json => this.setState({ data : json, isLoading : false }));
  }

  render()
  {
    return (
      <>
        {!this.state.isLoading &&

          <CompassTimeSinuous
            id="listTypes"
            data={this.state.data}
          />
        }
      </>
    );
  }
}
