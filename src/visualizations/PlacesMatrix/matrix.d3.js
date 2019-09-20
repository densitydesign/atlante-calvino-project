import * as d3 from 'd3';
const V = {}

const categories = [
	'generico_non_terrestre',
	'nominato_non_terrestre',
	'nominato_terrestre',
	'generico_terrestre',
	'inventato',
	'no_ambientazione'
]

const categoriesColors = [
	'#3131ff',
	'#bbbbff',
	'#ffce00',
	'#ff6c39',
	'#00c19c',
	'#cecece'
]

const collisionPadding = 1;

// data
let nodes = [], links = [], hulls = [], rootNodes = []

// Dimensions and scales
let x, y, r, color, margin, width, height;
let xAxisCall, yAxisCall;
margin = { 'top': 0, 'right': 50, 'bottom': 75, 'left': 50 }

// elements
let svg, g, xAxis, yAxis, hull, link, node, label, information

// force-layout
let simulation



V.initialize = (el, data) => {
  // console.log('init',data)
  svg = d3.select(el);
  width = svg.node().getBoundingClientRect().width - margin.left - margin.right;
  height = svg.node().getBoundingClientRect().height - margin.top - margin.bottom;

  // console.log(width, height)

  // Scales
  x = d3.scaleTime()
    .range([0, width])
    .domain(d3.extent(data.nodes, d=>d.year));
  xAxisCall = d3.axisBottom(x).ticks(d3.timeYear.every(1))
  y = d3.scalePoint()
    .range([0, height])
    .padding(0.5);
  yAxisCall = d3.axisRight(y).tickSize(width)
		.tickFormat(function(d){
			d = d.replace(/_/g, ' ')
			return d;
		})
  y.domain(categories)
  r = d3.scalePow()
    .exponent(0.5)
    // .range([15,75])
    .range([3.5,25])
    .domain([1,d3.max(data.nodes, function(d){ return d.totalSubNodes })])
  color = d3.scaleOrdinal().domain(categories).range(categoriesColors)


  // elements
  g = svg.append('g').attr("transform", `translate(${margin.left},${margin.top})`)
  xAxis = g.append("g").attr("class", "x-axis")
  yAxis = g.append('g').attr("class", "y-axis")

  yAxis
    .attr("transform", `translate(0, 0)`)
    .call(yAxisCall)
    .call(g => g.selectAll(".tick text")
          .style("text-transform", "capitalize"))
    .call(g => g.select(".domain")
          .remove())
      .call(g => g.selectAll(".tick line")
          .attr("stroke-opacity", 0.5)
          .attr("stroke-dasharray", "2,2"))
      .call(g => g.selectAll(".tick text")
          .attr("x", 4)
          .attr("dy", -y.step()/10));

  link = g.append('g').classed('links', true).selectAll('.link');
  hull = g.append('g').classed('hulls', true).selectAll('.hull');
  node = g.append('g').classed('nodes', true).selectAll('.node');
  label = g.append('g').classed('labels', true).selectAll('.label');
  information = g.append('g').classed('informations', true).selectAll('.information');

  simulation = d3.forceSimulation(nodes)
  	.force("charge", d3.forceManyBody().strength(-1))
  	.force("link", d3.forceLink()
  		.strength( 0.35 )
  		.distance( r.range()[0] + 1 )
  		.id(function(d) { return d.id; })
  	)
  	.force("x", d3.forceX(function(d) { return d.x })
  		.strength(function(d) {
  			return d.part_of === '' ? 0.7 : 0;
  		})
  	)
  	.force("y", d3.forceY(function(d) { return d.y })
  		.strength(function(d) { return d.part_of === '' ? 0.7 : 0; })
  	)
  	.force("collision", d3.forceCollide(function(d){
  			return d.opened ? r(1)+collisionPadding : r(d.totalSubNodes + 1)+collisionPadding
  		})
  		.iterations(32)
  		.strength(.5)
  	)
  	.on("tick", ticked)
    .on("end", () => { console.log('simulation ended') })
    .stop()

  function ticked() {
    // console.log(simulation.alpha())
  	node.attr("cx", function(d) { return d.x; })
  		.attr("cy", function(d) { return d.y; });

  	// label.attr("x", function(d) { return d.x; })
  	// 	.attr("y", function(d) { return d.y; });
    //
  	// link.attr("x1", function(d) { return d.source.x; })
  	// 	.attr("y1", function(d) { return d.source.y; })
  	// 	.attr("x2", function(d) { return d.target.x; })
  	// 	.attr("y2", function(d) { return d.target.y; });

  	// hull.attr("d", function(d){
  	// 	let thisHullPoints = d.map( d => { return [d.x, d.y] });
  	// 	var points = thisHullPoints;
  	// 	var convexHull = (points.length < 3) ? points : d3.polygonHull(points);
  	// 	return roundedHull(convexHull, d);
  	// })
  }





  // console.log(margin)

  V.update(data, null)
}

V.update = (data, filters) => {
  console.log('update viz')
  nodes = data.nodes;

  if (filters) {
    // do fitlers here
    if (filters.timeFilter) {
      nodes = nodes.filter( d => {
        const date = new Date(d.year)
        return date >= filters.timeFilter[0] && date <= filters.timeFilter[1]
      })
    }
  }

  x.domain(d3.extent(nodes, d=>d.year))
  xAxis.attr("transform", `translate(${0}, ${height})`).call(xAxisCall)

  // Set x and y of subNodes
  data.nodes.forEach(d => {
    d.x = x(d.year)
    d.y = y(d.category)
  })

  // Update the force layout
  simulation.force("x").x(function(d) { return d.x })

  node = node.data(nodes, d => {
    return d.id
  })
  node.exit()
    .transition()
    .duration(500)
    .attr('cx', d => {
      if (d.x <= width/2) {
        return -margin.left
      } else {
        return width + margin.right
      }
    })
    .style('opacity', 0)
    .remove();

  node = node.enter().append('circle')
    .attr('class', d => `node`)
    .attr('key', d=> d.id)
    .attr('cx', d => {
      return d.x
    })
    .attr('cy', d => {
      return d.y
    })
    .attr('r', 0)
    .style('opacity', 0)
    .merge(node)
    .style('cursor', function(d){
			return d.subNodes && d.subNodes.length ? 'pointer' : 'auto';
		})
    .attr("r", function(d){ return d.opened ? r(1) : r(d.totalSubNodes + 1) }) // +1 means plus itself

		.attr("fill", function(d) {
			// console.log(d)
			return d.opened==true ? 'white' : color(d.category);
		})
		.attr('stroke', function(d) {
			if(d.totalSubNodes > 0) return d3.color(color(d.category)).darker(0.7)
		});

  node.transition()
      .duration(500)
      .style('opacity', 1)



  simulation.nodes(nodes);
	simulation.force("link").links(links);
	simulation.alpha(1).restart();
}

V.destroy = () => {}

export default V
