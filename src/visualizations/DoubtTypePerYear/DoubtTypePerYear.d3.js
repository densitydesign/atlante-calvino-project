import * as d3 from 'd3';

import GlobalData from '../../utilities/GlobalData.js';

import './DoubtTypePerYear.css';

class VClass {
  initialize = (el, input_data) => {

    var margin = ({
      top: 10,
      right: 30,
      bottom: 30,
      left: 40
    });

    var width = document.body.clientWidth - margin.left - margin.right;
    var height = 300 - margin.top - margin.bottom;
    let label = d3.select("#label p");

    var x, y;

    var svg = d3.select(el)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    let data = input_data

    data = data.sort(function(a, b) {
      return a.date - b.date;
    })
    var series = d3.stack().keys(data.columns.slice(1))(data)

    let color = d3.scaleOrdinal()
    .domain(data.columns.slice(1))
    .range(["#00095E","#0000ff","#ff0000","#7F0000"]);

    x = d3.scaleLinear()
      .domain(d3.extent(data, d => d.date))
      .range([margin.left, width - margin.right])

    y = d3.scaleLinear()
      .domain([0, d3.max(series, d => d3.max(d, d => d[1]))]).nice()
      .range([height - margin.bottom, margin.top])

    var area = d3.area()
      .x(d => x(d.data.date))
      .y0(d => y(d[0]))
      .y1(d => y(d[1]))
      .curve(d3.curveBasis);

    var xAxis = svg.append('g')
      .classed('x axis', true)
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))

    var yAxis = svg.append('g')
      .classed('y axis', true)
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))

    svg.append("g").selectAll("path")
      .data(series)
      .join("path")
      .attr("fill", ({
        key
      }) => color(key))
      .attr("d", function(d) {
        return area(d);
      })
      .append("title")
      .text(({
        key
      }) => key);

    d3.select('.x.axis .domain').style('stroke-dasharray', function() {
      var strokeDashArray = '';
      for (var c = 1; c < ((x(1945) - margin.left) - (x(1943) - margin.left)); c += 3) {
        strokeDashArray += '1 2 '
      }
      strokeDashArray += ((x(1960) - margin.left) - (x(1945) - margin.left));

      for (var c = 1; c < ((x(1962) - margin.left) - (x(1960) - margin.left)); c += 3) {
        strokeDashArray += '1 2 '
      }
      strokeDashArray += ((x(1969) - margin.left) - (x(1962) - margin.left));

      for (var c = 1; c < ((x(1971) - margin.left) - (x(1969) - margin.left)); c += 3) {
        strokeDashArray += '1 2 '
      }
      strokeDashArray += ((x(1986) - margin.left) - (x(1971) - margin.left));
      return strokeDashArray
    })


  };

  destroy = () => {};
}

const V = new VClass();

export default V;
