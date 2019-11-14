import * as d3 from 'd3';

const Viz = {};

Viz.initialize = (el, data, changeSpan) => {
  // console.log('initialized')

  // data must be an array with 2+ elements. Element is a Date object

  // Important to declare at beginning
  Viz.changeSpan = changeSpan;

  const m = 15;
  Viz.margin = { top: 0, right: m, bottom: el.getBoundingClientRect().height - 20, left: m }
  Viz.svg = d3.select(el);
  Viz.width = el.getBoundingClientRect().width - Viz.margin.left - Viz.margin.right;
  Viz.height = el.getBoundingClientRect().height - Viz.margin.top - Viz.margin.bottom;

  Viz.svg.append("defs").append("clipPath")
      .attr("id", "timeclip")
    .append('rect')
      .classed('clip', true)
      .attr('x', 0)
      .attr('y', Viz.margin.top)
      .attr('width', Viz.width + Viz.margin.left + Viz.margin.right)
      .attr('height', Viz.height)
      // the following to compensate the translation on VIz.context (even if not totally clear)
      .attr("transform", "translate(" + -Viz.margin.left + "," + -Viz.margin.top + ")")

  Viz.x = d3.scaleTime()
    .range([0, Viz.width])
    .domain(d3.extent(data, d => d));

  Viz.xAxis = d3.axisBottom(Viz.x)

  Viz.brush = d3.brushX()
    .extent([[0, 0], [Viz.width, Viz.height]])
    .handleSize(m*2)
    .on("brush end", brushed)
    // .on("end", brushed);

  Viz.context = Viz.svg.append("g")
    .attr("class", "context")
    .attr("transform", "translate(" + Viz.margin.left + "," + Viz.margin.top + ")")

  // important is before brushed is called or assigned
  Viz.info = Viz.context.append('g').selectAll('.info')
  Viz.line = Viz.context.append('g').selectAll('.info-line')
  Viz.dotted = Viz.context.append('g').selectAll('.dotted')

  Viz.context.append("line")
    .attr('x1', 0)
    .attr('y1', Viz.height/2)
    .attr('x2', Viz.width)
    .attr('y2', Viz.height/2)
    .attr('stroke', 'var(--dark-green)')

  Viz.context.append("g")
    .attr("class", "brush")
    .call(Viz.brush)
    .call(Viz.brush.move, Viz.x.range())
}

Viz.update = (span) => {
  // console.log('updated')

  Viz.info = Viz.info.data(span, d=>d);
  Viz.info.exit().remove()
  Viz.info = Viz.info.enter().append('text')
    .attr('class','info')
    .attr('x', d => { return Viz.x(d) })
    .attr('y', Viz.height + Viz.margin.top + 12) // this value depends on the font-size
    .attr('text-anchor', (d,i) => {
      function getAnchor(d,scale, width) {
        let anchor;
        if (i%2===0) {
          if (scale(d) >= width/4) {
            anchor = 'end';
          } else {
            anchor = 'start';
          }
        } else {
          if (scale(d) <= width/4*3) {
            anchor = 'start';
          } else {
            anchor = 'end';
          }
        }
        return anchor;
      }
      return getAnchor(d, Viz.x, Viz.width);
    })
    .text(d=>{
      return d.getFullYear()
    })
    .merge(Viz.info)

  Viz.line = Viz.line.data(span, d=>d);
  Viz.line.exit().remove()
  Viz.line = Viz.line.enter().append('line')
    .attr('class','info-line')
    .attr('stroke', 'var(--calvino-red)')
    .attr('stroke-width', '2px')
    .attr('x1', d => { return Viz.x(d) })
    .attr('y1', 0)
    .attr('x2', d => { return Viz.x(d) })
    .attr('y2', Viz.height)
    .merge(Viz.line)

  Viz.dotted = Viz.dotted.data([span], (d,i)=>{return d})
  Viz.dotted.exit().remove()
  Viz.dotted = Viz.dotted.enter().append('line')
    .attr('class','dotted')
    .attr('x1', Viz.info._groups[0][0].getBBox().x + Viz.info._groups[0][0].getBBox().width + 5 )
    .attr('x2', Viz.info._groups[0][1].getBBox().x - 5)
    .attr('y1', Viz.height + Viz.margin.top + 6)
    .attr('y2', Viz.height + Viz.margin.top + 6)
    .attr('stroke-width', '1.5px')
    .attr('stroke', 'var(--dark-green)')
    .attr('stroke-linecap', 'round')
    .attr('stroke-dasharray', '0,15')
    .merge(Viz.dotted)
}

Viz.destroy = (el) => {}

export default Viz

function brushed() {
  if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
  if (d3.event.selection) {
    var span = d3.event.selection || Viz.x.range();
    span = span.map(d=>{return Viz.x.invert(d)})
    if (d3.event.type === "end") {
      console.log('filtered by time')
      Viz.changeSpan(span);
    }
    span = span.map(d=> new Date(d));
    Viz.update(span);
  }
}
