import * as d3 from 'd3';

import GlobalData from '../../utilities/GlobalData.js';

import './ListTypesPerText.css';

class VClass {
  initialize = (el, input_data) => {
    let margin = {
      top: 0,
      right: 50,
      bottom: 30,
      left: 150
    };

    const values = ['n_lists_f', 'n_lists_m', 'n_lists_p', 'n_lists_s'];
    const typeLabels = ['Frasi', 'Misto', 'Parole', 'Sintagmi'];

    let svg = d3.select(el);
    let label = d3.select("#label p");
    let typeButton = d3.select("#type-button button");
    let width = svg.node().getBoundingClientRect().width;
    let height = svg.node().getBoundingClientRect().height;

    svg.append("text")
    .attr("x", 10)
    .attr("y", height - margin.bottom / 1.6)

    console.log(width, height)

    let lists = [];

    let parseDate = d3.timeParse("%Y-%m-%d");
    let formatDate = d3.timeFormat("%Y");

    input_data.forEach(function(d) {

      values.forEach(function(value, index) {
        if (d[value] * 1 > 0) {
          lists.push({
            'id': d.id,
            'title' : d.title,
            'date' : parseDate(d.date),
            'type': typeLabels[index],
            'amount': d[value] * 1
          })
        }
      })

    })

    let x = d3.scaleTime()
    .range([0 + margin.left, width - margin.right])
    .domain(d3.extent(lists, d => d.date));

    let type = d3.scalePoint()
    .range([height - margin.bottom, 0 + margin.top])
    .padding(0.5)
    .domain(typeLabels);

    let color = d3.scaleOrdinal()
    .range([
      GlobalData.visualizationColors.territory.frasi,
      GlobalData.visualizationColors.territory.misto,
      GlobalData.visualizationColors.territory.parole,
      GlobalData.visualizationColors.territory.sintagmi
    ])
    .domain(typeLabels);

    let size = d3.scaleSqrt()
    .range([1, 30])
    .domain([0, d3.max(lists, d => d.amount)]);

    // Assi
    let xAxis = svg.append('g')
      .classed('x axis', true)
      .call(d3.axisBottom(x).ticks(width / 120).tickSize(height - margin.top - margin.bottom).tickSizeOuter(0.0));

    let yAxis = svg.append('g')
        .classed('y axis', true)
        .attr("transform", `translate(${width - margin.right},0)`)
        .call(d3.axisLeft(type).tickSize(width - margin.right - margin.left))
        .style("opacity", 0);

    d3.selectAll(".y .tick text").attr("dx", "-1em");

    let g = svg.append("g");

    g.selectAll("circle")
      .data(lists)
      .enter()
      .append("circle")
      .classed("lista", true)
      .attr("r", d => size(d.amount))
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("fill", d => color(d.type))
      .on("touchstart", getInfo)
      .on("click", getInfo);

    let simulation = d3.forceSimulation(lists)
      .force('x', d3.forceX(d => x(d.date)))
      .force('y', d3.forceY(height / 2))
      .force('collision', d3.forceCollide().radius( d => size(d.amount) + 1 ))
      .on("tick", ticked)
      .restart();

    function ticked() {
      d3.selectAll("circle")
      .attr("cx", (d) => {
          return d.x
        })
        .attr("cy", d => {
          return d.y
        });
    }

    let grouped = false;

    typeButton.on("click", function() {

      grouped = !grouped;

      if(grouped){
        typeButton.classed("divided", true)
        .text("Unisci");

        label.text("Clicca per scoprire titoli, anni.");

        d3.selectAll("circle").style("opacity", 1).style("stroke", "none");

        simulation.force('y', d3.forceY(d => type(d.type)))
        .alpha(1)
        .restart();
        yAxis.style("opacity", 1);
      } else {
        typeButton.classed("divided", false)
        .text("Dividi per tipologia");

        label.text("Clicca per scoprire titoli, anni.");

        d3.selectAll("circle").style("opacity", 1).style("stroke", "none");

        simulation.force("y", d3.forceY(height / 2))
        .alpha(1)
        .restart();
        yAxis.style("opacity", 0);
      }
    })

    function getInfo(d) {
      label.text(d.title + ", " + formatDate(d.date));

      let selectedItem = d.title;

      d3.selectAll("circle").style("stroke", "none")
      .style("opacity", 0.5);

      d3.selectAll("circle")
      .filter(d => selectedItem === d.title)
      .style("stroke-width", 1)
      .style("opacity", 1)
      .style("stroke", "black");

      d3.select(this)
      .style("opacity", 1)
      .style("stroke-width", 2)
      .style("stroke", "black");
    }

  };

  destroy = () => {};
}

const V = new VClass();

export default V;
