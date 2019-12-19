
import * as d3 from 'd3';

let margin = { top : 0, right : 50, bottom : 30, left : 50 }, width, height;

let svg;

const V = {};

export default V;

V.initialize = (el, data) => {
  if(!data || !data.length) return;

  svg = d3.select(el).style("touch-action", "manipulation");
  width = svg.node().getBoundingClientRect().width - margin.left - margin.right;
  height = svg.node().getBoundingClientRect().height - margin.top - margin.bottom;

  let p1 = { x: 100, y: 100 };
  let r1 = 50;
  let c1 = "green";

  let p2 = { x: 100, y: 230 };
  let r2 = 40;
  let c2 = "purple";

  let p3 = { x : 100, y : 360 };
  let r3 = 20;
  let c3 = "red";

  let jsonCircles = [
      { x_axis: p1.x, y_axis: p1.y, radius: r1, color: c1 }, 
  ];

  if(data.length > 10) jsonCircles.push({ x_axis: p2.x, y_axis: p2.y, radius: r2, color: c2 });

  if(data.length > 10) jsonCircles.push({ x_axis: p3.x, y_axis: p3.y, radius: r3, color: c3 });

  let circles = svg
      .selectAll("circle")
      .data(jsonCircles)
      .enter()
      .append("circle");

  let circleAttributes = circles
      .attr("cx", function(d) { return d.x_axis; })
      .attr("cy", function(d) { return d.y_axis; })
      .attr("r", function(d) { return d.radius; })
      .style("fill", function(d) { return d.color; });  
};

V.destroy = () => {};