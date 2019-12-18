
import React from 'react';
import * as d3 from 'd3';

import Territory from './Territory';

export default class TerritoryWrapper extends React.Component
{
  componentDidMount()
  {
    this.loadData();
  }

  loadData()
  {
    d3.json(process.env.PUBLIC_URL + "/territory_graphical_data.json").then(treat_json);
  }

  render = () => {
    return (
      <div className="main">
        <Territory />
      </div>
    );
  }
}

async function treat_json(json)
{
  const json_nodes = json.nodes;
console.log("json_nodes.length : ", json_nodes.length);
}
