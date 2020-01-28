import * as d3 from 'd3';
import GlobalData from '../../utilities/GlobalData.js'

class VClass {
  initialize = (el, input_data) => {
    let margin = {
      top: 0,
      right: 50,
      bottom: 30,
      left: 50
    };

    const values = ['n_lists_f', 'n_lists_m', 'n_lists_p', 'n_lists_s'];
    const typeLabels = ['Frasi', 'Misto', 'Parole', 'Sintagmi'];

    let svg = d3.select(el);
    let label = d3.select("#label");
    let typeButton = d3.select("#type-button");
    let width = svg.node().getBoundingClientRect().width;
    let height = svg.node().getBoundingClientRect().height;

    console.log(width, height)

    let lists = [];

    let parseDate = d3.timeParse("%Y-%m-%d");

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
      // .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(width / 50).tickSize(height - margin.top - margin.bottom).tickSizeOuter(0.0));

    let yAxis = svg.append('g')
        .classed('y axis', true)
        .attr("transform", `translate(${width - margin.right},0)`)
        .call(d3.axisLeft(type).tickSize(width - margin.right - margin.left))

    svg.selectAll("circle")
      .data(lists)
      .enter()
      .append("circle")
      .attr("r", d => size(d.amount))
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("fill", d => color(d.type))
      .on("click", d => { label.text(d.title) });

    let simulation = d3.forceSimulation(lists)
      .force('x', d3.forceX(d => x(d.date)))
      .force('y', d3.forceY(d => type(d.type)))
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

      svg.exit().remove();
    }
    let grouped = true;

    typeButton.on("click", function() {
      grouped = !grouped;
      if(grouped){
        simulation.force('y', d3.forceY(d => type(d.type)))
        .alpha(1)
        .restart();
        yAxis.style("opacity", 1);
      } else {
        simulation.force("y", d3.forceY(height / 2))
        .alpha(1)
        .restart();
        yAxis.style("opacity", 0);
      }
    })

  };

  destroy = () => {};
}

const V = new VClass();

export default V;
