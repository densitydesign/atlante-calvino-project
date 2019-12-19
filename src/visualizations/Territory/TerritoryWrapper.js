
import React from 'react';
import * as d3 from 'd3';

import Territory from './Territory';

export default class TerritoryWrapper extends React.Component
{
  state = {
    data : "data still not loaded",
    isLoading : true
  };

  loadData()
  {
    d3.json(process.env.PUBLIC_URL + "/territory_graphical_data.json").then(json => {
      const json_nodes = json.nodes;
      this.setState({
        data : json_nodes
      });
    });
  }  

  componentDidMount()
  {
    this.loadData();
  }

  render() {
    return (
      <div className="main">
        <Territory data={this.state.data} />
      </div>
    );
  }
}
