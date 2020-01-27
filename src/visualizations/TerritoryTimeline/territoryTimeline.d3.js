
import * as d3 from 'd3';
import _ from 'lodash';

import GlobalData from '../../utilities/GlobalData';

let data = {};

class VClass
{
  initialize = (
    el, 
    input_data,
    dataExtent,
    callTerritorySetDataExtent,
    callTerritoryApplyBeeSwarmFilter) =>
  {
    if(!input_data.json_nodes || input_data.json_nodes === "data still not loaded") return;

    this.callTerritorySetDataExtent = callTerritorySetDataExtent;
    this.callTerritoryApplyBeeSwarmFilter = callTerritoryApplyBeeSwarmFilter;

    this.prepareTimeline(el, input_data.json_nodes, dataExtent);
  };

  destroy = () => {};

  prepareTimeline = (el, json_nodes, dataExtent) =>
  {
    let margin = { top: 10, right: 5, bottom: 10, left: 10 };

    let timelineSvg = d3.select(el);

    data.timeline_width = timelineSvg.node().getBoundingClientRect().width - margin.left - margin.right;
    data.timeline_height = timelineSvg.node().getBoundingClientRect().height - margin.top - margin.bottom;

    timelineSvg
      .attr("width", data.timeline_width + margin.left + margin.right)
      .attr("height", data.timeline_height + margin.top + margin.bottom);

    let cell_group = timelineSvg
      .append("g")
      .attr("class", "cell_group")
      .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

    let brushGroup = timelineSvg.append("g").attr("transform", "translate(" + margin.left + "," + 0 + ")")

    let x_time_ext = d3.extent(json_nodes, d => d.attributes.first_publication);
    
    x_time_ext[0] = +x_time_ext[0] - 1;
    x_time_ext[1] = +x_time_ext[1] + 1;

    data.timeline_x = d3
      .scaleLinear()
      .rangeRound([0, (data.timeline_width - margin.left - margin.right)])
      .domain(x_time_ext);

    // data.timeline_y = d3
    //	 .scaleLinear()
    //	 .range([data.timeline_height, 0]);

    let minCircleRadius = 3;
    let maxCircleRadius = 20;

    let dmax = d3.max(json_nodes, d => +d.attributes.txt_length);

    let rscale = d3
      .scaleLinear()
      .range([minCircleRadius, maxCircleRadius])
      .domain([0, dmax]);

    const json_nodes2 = _.cloneDeep(json_nodes);

    let simulation = d3
      .forceSimulation(json_nodes2)
      .force("x", d3.forceX(d => data.timeline_x(d.attributes.first_publication)).strength(1))
      .force("y", d3.forceY(data.timeline_height / 2))
      .force("collide", d3.forceCollide(d => rscale(d.attributes.txt_length) + 1))
      .stop();

    for(let i = 0; i < 120; ++i) simulation.tick();

    timelineSvg
      .append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(" + margin.left + "," + (data.timeline_height) + ")")
      .call(d3
        .axisBottom(data.timeline_x)
        .ticks(41, "0")
      );

    let cell = cell_group
      .append("g")
      .attr("class", "cells")
      .selectAll(".cell_node")
      .data(d3
        .voronoi()
        .extent([
          [0, 0],
          [data.timeline_width, data.timeline_height]
        ])
        .x(d => d.x)
        .y(d => d.y)
        .polygons(json_nodes2))
      .enter()
      .append("g")
      .classed("cell_node", true);

    let colls = GlobalData.collections.map(c => c.id);

    data.timeline_dot = cell
      .append("circle")
      .attr("r", d => {
        d.data.attributes.collections = d.data.attributes.collections.reverse();
        return rscale(+d.data.attributes.txt_length);
      })
      .attr("cx", d => d.data.x)
      .attr("cy", d => d.data.y)
      .attr("fill", d => d.data.attributes.collections.length ? GlobalData.col_collections(d.data.attributes.collections[0]) : "#FFFFFF")
      .attr("stroke", d => {
        if(d.data.attributes.collections.length) {
          if(colls.includes(d.data.attributes.collections[0])) {
            return "none";
          } else return "#000000";
        } else return "#000000"
      });

    data.brush = d3
      .brushX()
      .extent([
        [0, 5],
        [data.timeline_width - margin.left - margin.right, data.timeline_height - 5]
      ])
      .on("start brush", this.brushed);

    brushGroup
      .call(data.brush)
      .call(data.brush.move, [dataExtent[0], dataExtent[1]].map(data.timeline_x))
      .selectAll(".overlay")
      .each(d => d.type = "selection")
      .on("mousedown touchstart", brushcentered);

    // d3.select('.handle--e').style('stroke-dasharray', `0,6,${data.timeline_height-4},117`)
    // d3.select('.handle--w').style('stroke-dasharray', `0,${data.timeline_height+6+6},0`)

    d3.select('.handle--e').attr("transform",`translate(0,${(data.timeline_height - margin.bottom-10)/2})`);
    d3.select('.handle--w').attr("transform",`translate(0,${(data.timeline_height - margin.bottom-10)/2})`);

  //	cell
  //		.append("path")
  //		.attr("d", d => "M" + d.join("L") + "Z");

    cell
      .append("title")
      .text(d => d.data.id + "\n" + d.data.first_publication);
  };

  brushed = () =>
  {
    const data_extent = d3.event.selection.map(data.timeline_x.invert, data.timeline_x);

    this.callTerritorySetDataExtent(data_extent);

    // console.log(data.extent);

    d3.selectAll(".cell_node").style('opacity', 1).filter( d => {
      // console.log(+d.data.attributes.first_publication)
      var fp = +d.data.attributes.first_publication
      return fp < data_extent[0] || fp > data_extent[1]
    })
    .style('opacity', 0.1);

    if(this.callTerritoryApplyBeeSwarmFilter)
    {
      this.callTerritoryApplyBeeSwarmFilter();
    }
    else
    {
      console.log("method null");
    }
  };
}

function brushcentered() 
{
  let dx = data.timeline_x(1) - data.timeline_x(0);
  let cx = d3.mouse(this)[0];
  let x0 = cx - dx / 2;
  let x1 = cx + dx / 2;

  d3
    .select(this.parentNode)
    .call(data.brush.move, x1 > data.timeline_width ? [data.timeline_width - dx, data.timeline_width] : x0 < 0 ? [0, dx] : [x0, x1]);
}

const V = new VClass();

export default V;