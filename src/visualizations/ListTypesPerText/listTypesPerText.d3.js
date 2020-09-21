import * as d3 from 'd3';

import GlobalData from '../../utilities/GlobalData.js';
import { curveSankey, append_tooltip_entry } from '../../utilities/graphic_utilities.js';

import './ListTypesPerText.css';

class VClass {
  initialize = (el, input_data) => {

    const typeLabels = ['Frasi', 'Misto', 'Parole', 'Sintagmi'];
    const values = ['n_lists_f', 'n_lists_m', 'n_lists_p', 'n_lists_s'];

        var margin = ({
          top: 50,
          right: 30,
          bottom: 30,
          left: 40
        });

        var width = d3.select("#mainviz").node().getBoundingClientRect().width;
        var height = 300 - margin.top - margin.bottom;


    var x, y;

    var svg = d3.select(el)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    let data = input_data

    let lists = [];

    let parseDate = d3.timeParse("%Y-%m-%d");
    let formatDate = d3.timeFormat("%Y");

    input_data.forEach(function(d) {

      values.forEach(function(value, index) {
        if (d[value] * 1 > 0) {
          lists.push({
            'date': parseDate(d.date),
          })
        }
      })

    })

    data = data.sort(function(a, b) {
      return a.date - b.date;
    })
console.log("data", data);

    var series = d3.stack().keys(data.columns.slice(1))(data)

    let color = d3.scaleOrdinal()
      .range([
        GlobalData.visualizationColors.territory.frasi,
        GlobalData.visualizationColors.territory.misto,
        GlobalData.visualizationColors.territory.parole,
        GlobalData.visualizationColors.territory.sintagmi
      ])
      .domain(typeLabels);

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
      .call(d3.axisLeft(y));

    svg
      .append("text")
      .attr("y", 10)
      .attr("x", 0)
      .text("% tipo di");

    svg
      .append("text")
      .attr("y", 25)
      .attr("x", 0)
      .text("elenchi");

    svg
      .append("text")
      .attr("y", height + 20)
      .attr("x", 0)
      .text("anni di pubblicazione");

    let stream = svg.append("g");

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
    })

    const tooltipLine = stream
      .append("line")
      .attr("x0", 0)
      .attr("y0", 0)
      .attr("x1", 0)
      .attr("y1", height)
      .style("fill", "none")
      .style("stroke-width", 2)
      .style("stroke", "rgba(0,0,0,.3)");

    // function tooltip(){
    //   console.log(y.invert(d3.mouse(this)[1]));
    //   tooltipLine.attr("transform", "translate(" + d3.mouse(this)[0] + ", 0)");
    // }

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




    const s_text = append_tooltip_entry(tooltip, 0, color("Sintagmi"));
    const p_text = append_tooltip_entry(tooltip, 1, color("Parole"));
    const m_text = append_tooltip_entry(tooltip, 2, color("Misto"));
    const f_text = append_tooltip_entry(tooltip, 3, color("Frasi"));

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
        s_text.text(prepare_tooltip_value(item.sintagmi));
        p_text.text(prepare_tooltip_value(item.parole));
        m_text.text(prepare_tooltip_value(item.misto));
        f_text.text(prepare_tooltip_value(item.frasi));
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

function prepare_tooltip_value(s)
{
  const value = Number.parseFloat(s);
  return value.toFixed(2) + "%";
}

const V = new VClass();

export default V;
