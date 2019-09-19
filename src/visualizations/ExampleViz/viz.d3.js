import * as d3 from 'd3';

const Viz = {};

let margin = Viz.Margin;

Viz.initialize = (el, data, configuration) => {
  // code for initialization of the visualisation
  console.log('data on initialize', data);

  // Set variables important to all the viz
  Viz.margin = {top: 20, right: 20, bottom: 110, left: 40}
  Viz.width = el.getBoundingClientRect().width - Viz.margin.left - Viz.margin.right;
  Viz.height = el.getBoundingClientRect().height - Viz.margin.top - Viz.margin.bottom;

  Viz.x = d3.scaleTime().range([0, Viz.width])
  Viz.y = d3.scaleLinear().range([Viz.height, 0])
  Viz.xAxis = d3.axisBottom(Viz.x)
  Viz.yAxis = d3.axisLeft(Viz.y)

  Viz.area = d3.area()
    .curve(d3.curveMonotoneX)
    .x(function(d) { return Viz.x(d.date); })
    .y0(Viz.height)
    .y1(function(d) { return Viz.y(d.price); });

  // set elements important for all the chart
  Viz.svg = d3.select(el);
  Viz.focus = Viz.svg.append("g").attr("class", "focus")

  Viz.path = Viz.focus.append("path").attr("class", "area")


  Viz.update(el, data, configuration);
}

Viz.update = (el, data, configuration) => {

  console.log('data on update', data);
  // code for initialization of the visualisation

  // update scales
  Viz.x.domain(d3.extent(data, function(d) { return d.date; }));
  Viz.y.domain([0, d3.max(data, function(d) { return d.price; })]);

  // update elements
  Viz.svg.style('background-color', 'peachpuff');
  Viz.focus.attr("transform", "translate(" + Viz.margin.left + "," + Viz.margin.top + ")")
  Viz.path.datum(data).attr("d", Viz.area);


}

Viz.destroy = (el, data, configuration) => {
  // code for initialization of the visualisation
  Viz.svg.remove();
}

export default Viz
