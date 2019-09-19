import * as d3 from 'd3';

const Viz = {};

Viz.initialize = (el, data, changeSpan) => {
  // console.log('initialized')
  // Important to declare at beginning
  Viz.changeSpan = changeSpan;

  // console.log('time-filter-init', el);
  Viz.margin = { top: 0, right: 3, bottom: 10, left: 3 }
  Viz.svg = d3.select(el);
  Viz.width = el.getBoundingClientRect().width - Viz.margin.left - Viz.margin.right;
  Viz.height = el.getBoundingClientRect().height - Viz.margin.top - Viz.margin.bottom;

  Viz.x = d3.scaleTime()
    .range([Viz.margin.left, Viz.width - Viz.margin.right])
    .domain(d3.extent(data, d=> d.date));

  Viz.xAxis = d3.axisBottom(Viz.x)

  // important is before brushed is called or assigned
  Viz.info = Viz.svg.selectAll('text')

  Viz.svg.append("line")
    .attr('x1', Viz.margin.left)
    .attr('y1', 10)
    .attr('x2', Viz.width)
    .attr('y2', 10)
    .attr('stroke', 'black')

  Viz.brush = d3.brushX()
    .extent([[Viz.margin.left, 0], [Viz.width, Viz.height]])
    .on("brush end", brushed);

  Viz.context = Viz.svg.append("g")
    .attr("class", "context")
    .attr("transform", "translate(" + Viz.margin.left + "," + Viz.margin.top + ")");

  Viz.context.append("g")
    .attr("class", "brush")
    .call(Viz.brush)
    .call(Viz.brush.move, Viz.x.range())

  console.log(d3.extent(data, d=> d.date))

  const initialSpan = d3.extent(data, d=> d.date)
    // .map(d=> {
    //   return d.getFullYear()
    // });
  Viz.update(initialSpan)
}

Viz.update = (span) => {
  // console.log('updated')
  // console.log('time-filter-update', span);

  Viz.info = Viz.info.data(span, d=>d);
  Viz.info.exit().remove()
  Viz.info = Viz.info.enter().append('text')
    .attr('x', d => {
      return Viz.x(d)
    })
    .attr('y', 29)
    .attr('text-anchor', (d,i) => {
      let anchor;
      if (i%2===0) {
        anchor = 'start';
      } else {
        anchor = 'end';
      }
      return anchor;
    })
    .text(d=>{
      return d.getFullYear()
    })
    .merge(Viz.info)
}

Viz.destroy = (el) => {}

export default Viz

function brushed() {
  if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
  if (d3.event.selection) {
    var span = d3.event.selection || Viz.x.range();
    span = span.map(d=>{return Viz.x.invert(d)})
    Viz.changeSpan(span)
    span = span.map(d=> new Date(d));
    // console.log('brushed', span)
    // span = span.map(d => {
    //   return d.getFullYear()
    // });
    Viz.update(span)
  }
}
