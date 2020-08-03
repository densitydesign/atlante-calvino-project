import * as d3 from 'd3';

import GlobalData from '../../utilities/GlobalData.js';
import { curveSankey, append_tooltip_entry } from '../../utilities/graphic_utilities.js';

import './DoubtTypePerYear.css';

class VClass {
  initialize = (el, input_data) => {

    const doubtLabels = ['na', 'nc', 'ca', 'cc'];
    const values = ['na', 'nc', 'ca', 'cc'];


    var margin = ({
      top: 50,
      right: 30,
      bottom: 30,
      left: 40
    });

    var width = document.body.clientWidth;
    var height = 300 - margin.top - margin.bottom;

    var x, y;

    var svg = d3.select(el)
      .attr('width', width)
      .attr('height', height + margin.top + margin.bottom);

    let data = input_data

    let lists = [];

    let parseDate = d3.timeParse("%Y-%m-%d");
    let formatDate = d3.timeFormat("%Y");

    input_data.forEach(function(d) {

      values.forEach(function(value, index) {

          lists.push({
            'date': parseDate(d.date),
          })

      })

    })

    data = data.sort(function(a, b) {
      return a.date - b.date;
    })
console.log("data", data);

    var series = d3.stack().keys(data.columns.slice(1))(data)

    let color = d3
      .scaleOrdinal()
      .range([
        GlobalData.visualizationColors.territory.nebbia_dim,
        GlobalData.visualizationColors.territory.nebbia_bright,
        GlobalData.visualizationColors.territory.cancellazione_dim,
        GlobalData.visualizationColors.territory.cancellazione_bright,
      ])
      .domain(doubtLabels);

    x = d3.scaleLinear()
      .domain((d3.extent(data, d => d.date)))
      .range([margin.left, width - margin.right])


    y = d3.scaleLinear()
      .domain([0, d3.max(series, d => d3.max(d, d => d[1]))]).nice()
      .range([height - margin.bottom, margin.top])


    var area = d3.area()
      .x(d => x(d.data.date))
      .y0(d => y(d[0]))
      .y1(d => y(d[1]))
      .curve(curveSankey);


    var xAxis = svg
      .append('g')
      .classed('x axis', true)
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3
        .axisBottom(x)
        .ticks(width / 100)
        .tickFormat(d3.format("0000"))
        .tickSizeOuter(1));

    var yAxis = svg.append('g')
      .classed('y axis', true)
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y)
      .ticks(5));


    svg
      .append("text")
      .attr("y", 10)
      .attr("x", 0)
      .text("numero di");

    svg
      .append("text")
      .attr("y", 25)
      .attr("x", 0)
      .text("occorrenze");


    svg
      .append("text")
      .attr("y", height + 20)
      .attr("x", 0)
      .text("anni di pubblicazione");


    const stream = svg.append("g");

console.log("series", series);

    stream
      .selectAll("path")
      .data(series)
      .join("path")
      .attr("fill", ({
        key
      }) => color(key))
      .attr("d", function(d) {
        return area(d);
      })
      .style("stroke", "rgba(0,0,0,0.7)")
      .style("stroke-width", 0.5);

    svg.on("mousemove", displayTooltip)
    svg.on("touchmove", displayTooltip);
    svg.on("mouseleave", hideTooltip);
    svg.on("touchleave", hideTooltip);

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
    });

    const tooltipLine = stream
      .append("line")
      .attr("x0", 0)
      .attr("y0", 0)
      .attr("x1", 0)
      .attr("y1", height)
      .attr("display", "none")
      .style("fill", "none")
      .style("stroke-width", 2)
      .style("stroke", "rgba(0,0,0,.3)");

    const tooltip = svg
      .append("g")
      .attr("display", "none");

    tooltip
      .append("rect")
      .attr("stroke", "lightgray")
      .attr("fill", "white")
      .attr("opacity", 0.7)
      .attr("x", 50)
      .attr("y", 50)
      .attr("width", 110)
      .attr("height", 107);

    const yearLabel = tooltip
      .append("text")
      .attr("x", 55)
      .attr("y", 70);
/*
    tooltip
      .append("rect")
      .attr("fill", "green")
      .attr("x", 50)
      .attr("y", 53)
      .attr("width", 8)
      .attr("height", 8);

    let nc_text = tooltip
      .append("text")
      .attr("x", 65)
      .attr("y", 60)
      .attr("fill", "black");

    tooltip
      .append("rect")
      .attr("fill", "cyan")
      .attr("x", 50)
      .attr("y", 63)
      .attr("width", 8)
      .attr("height", 8);

    let na_text = tooltip
      .append("text")
      .attr("x", 65)
      .attr("y", 70)
      .attr("fill", "black");
*/
    const ca_text = append_tooltip_entry(tooltip, 0, color("ca"));
    const cc_text = append_tooltip_entry(tooltip, 1, color("cc"));
    const na_text = append_tooltip_entry(tooltip, 2, color("na"));
    const nc_text = append_tooltip_entry(tooltip, 3, color("nc"));

    function displayTooltip()
    {
      console.log("d3.mouse(this)", d3.mouse(this));
//      console.log(y.invert(d3.mouse(this)[1]));
      console.log("x.invert(d3.mouse(this)[0]", x.invert(d3.mouse(this)[0]));

      const year = Math.floor(x.invert(d3.mouse(this)[0])).toString();

      yearLabel.text(year);

      const item = data.find(d => d.date === year);

      if(item)
      {
        nc_text.text(item.nc);
        na_text.text(item.na);
        cc_text.text(item.cc);
        ca_text.text(item.ca);
      }

      tooltipLine
        .attr("display", "block")
        .attr("transform", "translate(" + d3.mouse(this)[0] + ", 0)");

      tooltip
        .attr("display", "block")
        .attr("transform", "translate(" + d3.mouse(this)[0] + ", 0)");
    }

    function hideTooltip()
    {
      tooltipLine.attr("display", "none");
      tooltip.attr("display", "none");
    }
  };

  destroy = () => {};
}



const V = new VClass();

export default V;
