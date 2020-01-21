import * as d3 from 'd3';

let svg, context, gBrush, info, width, height, margin = {},
	funcChangeSpan;

const Viz = {};

Viz.initialize = (el, data, changeSpan) => {
	// console.log('initialized')

	// data must be an array with 2+ elements. Element is a Date object

	// Important to declare at beginning
	funcChangeSpan = changeSpan;

	// console.log(el.getBoundingClientRect().width)
	//

	svg = d3.select(el).select('svg')

	function convertRemToPixels(rem) {
		return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
	}

	//1.2857142857rem

	const m = 10;
	margin.top = m
	margin.right = m
	margin.bottom = svg.node().getBoundingClientRect().height - convertRemToPixels(1.2857142857) - margin.top
	margin.bottom = margin.top
	margin.left = m

	width = svg.node().getBoundingClientRect().width - margin.left - margin.right;
	height = svg.node().getBoundingClientRect().height - margin.top - margin.bottom;

	Viz.x = d3.scaleTime()
		.range([0, width])
		.domain(d3.extent(data, d => d));

	Viz.brush = d3.brushX()
		.extent([
			[0, 0],
			[width, height]
		])
		.handleSize(m)
		.on("brush end", brushed)

  gBrush = svg.append("g")
		.attr("class", "brush")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

	context = svg.append("g")
		.attr("class", "context")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .style("pointer-events", "none")

	context.append('rect')
		.classed("context-window", true)
		.attr("width", width)
		.attr("height", height)

  // important before brushed is called or assigned
  info = context.append('g').selectAll('.info')


	gBrush.call(Viz.brush)
		.call(Viz.brush.move, Viz.x.range())

}

Viz.update = (span) => {
	// console.log('updated')

	info = info.data(span, d => d);
	info.exit().remove()
	info = info.enter().append('text')
		.attr('class', 'info')
		.attr('x', d => { return Viz.x(d) })
		.attr('y', height-1.9) // this value depends on the font-size
		.attr('text-anchor', (d, i) => {
			function getAnchor(d, scale, width) {
				let anchor;
				if(i % 2 === 0) {
					if(scale(d) >= width / 4) {
						anchor = 'end';
					} else {
						anchor = 'start';
					}
				} else {
					if(scale(d) <= width / 4 * 3) {
						anchor = 'start';
					} else {
						anchor = 'end';
					}
				}
				return anchor;
			}
			return getAnchor(d, Viz.x, width);
		})
		.text(d => {
			return d.getFullYear()
		})
		.merge(info)

}

Viz.destroy = (el) => {}

export default Viz

function brushed() {
	if(d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
	if(d3.event.selection) {
		var span = d3.event.selection || Viz.x.range();
		span = span.map(d => { return Viz.x.invert(d) })
		if(d3.event.type === "end") {
			// console.log('filtered by time')
			funcChangeSpan(span);
		}
		span = span.map(d => new Date(d));
		Viz.update(span);
	}
}
