import * as d3 from 'd3';

const Viz = {};

Viz.initialize = (el, data, changeSpan) => {
  // Important to declare at beginning
  Viz.changeSpan = changeSpan;

  // console.log('time-filter-init', el);
  Viz.margin = { top: 0, right: 0, bottom: 0, left: 0 }
  Viz.svg = d3.select(el);
  Viz.width = el.getBoundingClientRect().width - Viz.margin.left - Viz.margin.right;
  Viz.height = el.getBoundingClientRect().height - Viz.margin.top - Viz.margin.bottom;

  Viz.x = d3.scaleTime()
    .range([0, Viz.width])
    .domain(d3.extent(data, d=> d.date));

  Viz.xAxis = d3.axisBottom(Viz.x)

  Viz.brush = d3.brushX()
    .extent([[0, 0], [Viz.width, Viz.height]])
    .on("brush end", brushed);

  Viz.context = Viz.svg.append("g")
    .attr("class", "context")
    .attr("transform", "translate(" + Viz.margin.left + "," + Viz.margin.top + ")");

  Viz.context.append("g")
    .attr("class", "brush")
    .call(Viz.brush)
    .call(Viz.brush.move, Viz.x.range())
}

Viz.update = (data) => {
  // console.log('time-filter-update', data);

}

Viz.destroy = (el) => {}

export default Viz

function brushed() {
  if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
  if (d3.event.selection) {
    var span = d3.event.selection || Viz.x.range();
    span = span.map(d=>{return Viz.x.invert(d);})
    Viz.changeSpan(span)
  }
}
