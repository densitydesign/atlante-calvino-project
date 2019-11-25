import * as d3 from 'd3'

const MatrixD3 = {}

let w, h, margin = {
    	'top': 0,
    	'right': 50,
    	'bottom': 75,
    	'left': 50
    },
    collisionPadding = 1,
        categories = [
    	'generico_non_terrestre',
    	'nominato_non_terrestre',
    	'nominato_terrestre',
    	'generico_terrestre',
    	'inventato',
    	'no_ambientazione'
    ],
    categoriesColors = [
    	'#3131ff',
    	'#bbbbff',
    	'#ffce00',
    	'#ff6c39',
    	'#00c19c',
    	'#cecece'
    ]

let svg, g, xAxis, yAxis,
    x = d3.scaleTime(),
    y = d3.scalePoint(),
    r = d3.scalePow(),
    color = d3.scaleOrdinal().domain(categories).range(categoriesColors)

let link, hull, node, label, information

let nodes = [], hullsData = [], hulls = [], links = [], rootNodes

let simulation = d3.forceSimulation(nodes)
	.force("charge", d3.forceManyBody().strength(-1))
	.force("link", d3.forceLink(links)
		.strength(function(d) { return d.kind == 'same_text' ? 0 : 0.6; })
		.distance(20)
		.id(function(d) { return d.id; })
	)
	.force("x", d3.forceX(function(d) { return d.x })
		.strength(function(d) { return d.part_of == '' ? 0.7 : 0; })
	)
	.force("y", d3.forceY(function(d) { return d.y })
		.strength(function(d) { return d.part_of == '' ? 0.7 : 0; })
	)
	.force("collision", d3.forceCollide(function(d){
			return d.opened ? r(1)+collisionPadding : r(d.totalSubNodes + 1)+collisionPadding
		})
		.iterations(4)
		.strength(.5)
	)
	.on("tick", ticked)

MatrixD3.create = (el, data, configuration) => {
    // D3 Code to create the chart
    svg = d3.select(el)
    let bcr = svg.node().getBoundingClientRect()
    w = bcr.width - margin.left - margin.right
    h = bcr.height - margin.top - margin.bottom

    g = svg.append('g').attr("transform", `translate(${margin.left},${margin.top})`)
    xAxis = g.append("g").attr("class", "x-axis")
    yAxis = g.append('g').attr("class", "y-axis")

    link = g.append('g').classed('links', true).selectAll('.link')
    hull = g.append('g').classed('hulls', true).selectAll('.hull')
    node = g.append('g').classed('nodes', true).selectAll('.node')
    label = g.append('g').classed('labels', true).selectAll('.label')
    information = g.append('g').classed('informations', true).selectAll('.information')

    Promise.all([ d3.tsv('./places-matrix-data.tsv') ]).then(function(data) {
      var locations = data[0]
		// .filter(function(d) { return +d.year >= 1963 && +d.year <= 1963 })
		// .filter(function(d) { return +d.year >= 1962 && +d.year <= 1969 });

	locations.forEach(function(d){ d.year = new Date(d.year); }) // convert all years in JS Date

	// horizontal scale and axis
	x.domain(d3.extent(locations, function(d) { return d.year }));

	var xAxisCall = d3.axisBottom(x)
		.ticks(d3.timeYear.every(1));
	xAxis.attr("transform", `translate(${0}, ${h})`)
	    .call(xAxisCall)

	// vertical scale and axis
	y.domain(categories);

	var yAxisCall = d3.axisRight(y)
		.tickSize(w)
		.tickFormat(function(d){
			d = d.replace(/_/g, ' ')
			return d;
		})

	yAxis.attr("transform", `translate(${0}, ${0})`)
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

	locations.forEach(function(d) { if(!d.id) { d.id = d['data.id'] } })
	locations = locations.map(function(d) {
		var obj = {
			'id': d.id,
			'label': d['Occorrenza'],
			'part_of': d['Parte di ID'],
			'source': d['Fonte'],
			'sourceTitle': d['Titolo Fonte'],
			'year': +d.year,
			'category': d['Categoria'],
			'totalSubNodes':0,
			// set x and y to make nodes appera in the precise position
			'x': x(d.year),
			'y': y(d['Categoria'])
		}
		return obj
	})

	locations = handleHierarchies(locations);
	let graph = calculateNetwork(locations);
	nodes = graph.nodes;
	links = graph.edges;
	restart();

	rootNodes = nodes.filter(d => d.subNodes);
    });

}

MatrixD3.update = (el, data, configuration, chart) => {
  // D3 Code to update the chart
  // Apply the general update pattern to the nodes.

}

MatrixD3.destroy = () => {
    // Cleaning code here
}

export default MatrixD3

function handleHierarchies(nodes) {
	// calculate hierarchies of sub-nodes
	let hierarchies = d3.nest()
		.key(function(d){ return d.part_of })
		.entries(nodes);

	hierarchies
		.filter(function(d){ return d.key == '' })[0]
		.values.forEach(function(d){
			var part_of_d = hierarchies.find(function(e){ return e.key == d.id })
			if (part_of_d) {
				// console.log('LVL 0',d.id, d.label, 'is parent of', part_of_d.values.length);
				d.subNodes = part_of_d.values;
				d.totalSubNodes = part_of_d.values.length

				part_of_d.values.forEach(function(e){
					var part_of_e = hierarchies.find(function(f){ return f.key == e.id })
					if (part_of_e) {
						// console.log('LVL 1',e.id, e.label, 'is parent of', part_of_e.values.length);
						e.subNodes = part_of_e.values
						e.totalSubNodes = part_of_e.values.length
						d.totalSubNodes += e.totalSubNodes

						part_of_e.values.forEach(function(f){
							var part_of_f = hierarchies.find(function(g){ return g.key == f.id})
							if (part_of_f) {
								// console.log('LVL 2', f.id, f.label, 'is parent of', part_of_f.values.length)
								f.subNodes = part_of_f.values
								f.totalSubNodes = part_of_f.values.length
								d.totalSubNodes += f.totalSubNodes

								part_of_f.values.forEach(function(g){
									var part_of_g = hierarchies.find(function(h){ return h.key == g.id })
									if (part_of_g) {
										// console.log('LVL 3', g.id, g.label, 'is parent of', part_of_g.values.length)
										g.subNodes = part_of_g.values
										g.totalSubNodes = part_of_g.values.length
										d.totalSubNodes += f.totalSubNodes

									}
								})
							}
						})
					}
				})
			}
		})
	// set domain of the radii scale
	r.domain([1,d3.max(nodes, function(d){ return d.totalSubNodes })])
	// return array of hierarchical nodes
	return hierarchies.filter(function(d){ return d.key == '' })[0].values;
}

function calculateNetwork(nodes) {
	// create the array of edges
	var edges = []
	// base edges on works co-occurrences of places
	var sources = d3.nest()
		.key(function(d) { return d.source })
		.entries(nodes)
		.forEach((d) => {
			d.values.filter(function(e) {
				return e.part_of != '';
			}).forEach((n, i) => {
				var obj = {}
				obj = {
					'source': n.id,
					'target': n.part_of,
					'volume': d.key,
					// 'year': n.year,
					'source_part_of': n.part_of,
					'kind': 'part_of'
				}
				edges.push(obj);
			})
		})

	return { 'nodes': nodes, 'edges': edges }
}

function ticked() {
	node.attr("cx", function(d) { return d.x })
		.attr("cy", function(d) { return d.y })

	label.attr("x", function(d) { return d.x })
		.attr("y", function(d) { return d.y })

	link.attr("x1", function(d) { return d.source.x })
		.attr("y1", function(d) { return d.source.y })
		.attr("x2", function(d) { return d.target.x })
		.attr("y2", function(d) { return d.target.y })

	hull.attr("d", function(d){
		let thisHullPoints = d.map( d => { return [d.x, d.y] })
		var points = thisHullPoints
		var convexHull = (points.length < 3) ? points : d3.polygonHull(points)
		return roundedHull(convexHull, d)
	})
}

function restart() {
	// Apply the general update pattern to the nodes.
	node = node.data(nodes, function(d) { return d.id; });
	node.exit().remove();
	node = node.enter().append("circle")
		.classed('node', true)
		.attr("cx", function(d) { return d.x })
		.attr("cy", function(d) { return d.y })
		.on('mouseenter', function(d){
			node.filter(function(e){ return e.source != d.source; }).style('opacity', 0.1);
			label.filter(function(e){ return d.id == e.id }).style('display', 'block');

			// show work title
			information = information.data([d], function(d) { return d.id; });
			information.exit().remove();
			information = information.enter().append("text")
				.classed('information', true)
				.classed('label', true)
				.attr('text-anchor', d => (x(d.year) >= w/2) ? 'end' : 'start')
				.attr('x', d => (x(d.year) >= w/2) ? x(d.year)+4.8 : x(d.year)-3.2)
				.attr('y', h - 10)
				.text( d => (x(d.year) >= w/2) ? d.sourceTitle + ' ↓' : '↓ ' + d.sourceTitle)
				.merge(information);
		})
		.on('mouseleave', function(d){
			node.style('opacity', 1);
			label.style('display', 'none');

			// remove work title
			information = information.data([], function(d) { return d.id; });
			information.exit().remove();
		})
		.on('click', d => {
			toggleSubnodes(d);
		})
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
		})

	// Apply the general update pattern to the links.
	link = link.data(links, function(d) {
		return d.source.id + "-" + d.target.id;
	});
	link.exit().remove();
	link = link.enter().append("line")
		.classed('link', true)
		.classed('part-of', function(d) { return d.kind == 'part_of' })
		.on('click', d => console.log(d))
		.merge(link);

	// Apply the general update pattern to the labels.
	label = label.data(nodes, function(d) { return d.id; });
	label.exit().remove();
	label = label.enter().append("text")
		.classed('label', true)
		.style('display', 'none')
		.attr('text-anchor', 'middle')
		.text(function(d){return d.label})
		.merge(label);

	// Apply the general update pattern to the convex hulls.
	hull = hull.data(hullsData, function(d) {
		return d[0].id;
	});
	hull.exit().remove();
	hull = hull.enter().append("path")
		.classed('hull', true)
		.attr('fill', function(d){
			return color(d[0].category)
		})
		.style('opacity', .25)
		.on('click', d => {
			// console.log(d[0])
			toggleSubnodes(d[0]);
		})
		.merge(hull);


	// Update and restart the simulation.
	simulation.nodes(nodes);
	simulation.force("link").links(links);
	simulation.alpha(1).restart();
}

function toggleSubnodes(d, noRestart) {
	d.fx = null;
	d.fy = null;
	if (d.opened) {
		d.opened = false;

		var subNodes2Remove = [];
		var hulls2Remove = [d.id]

		// recursive functions, it makes possible to close contained cluster of nodes
		function collectSubNodes(parentNode) {
			// console.log(`There are ${parentNode.subNodes.length} sub-nodes of ${parentNode.label}`)
			parentNode.subNodes.forEach( childNode => {
				if (childNode.opened) {
					childNode.opened = false;
					hulls2Remove.push(childNode.id);
					collectSubNodes(childNode);
				}
			});
			subNodes2Remove.push(parentNode.subNodes);
			// console.log(`${parentNode.label} has ${parentNode.subNodes} nodes to be removed`);
		}

		collectSubNodes(d);

		// cycle in the subNodes2Remove array and for each list of sub-nodes to be removed remove and re-calculate the network.
		// Probably not the best way, but the simplest at the moment of the coding.
		subNodes2Remove.forEach( subNodes => {

			let toRemove = subNodes.map( d => d.id)
			let filtered = nodes.filter( el => {
				return !toRemove.includes( el.id );
			})

			// remove this hull
			hullsData = hullsData.filter(function(h){
				return !hulls2Remove.includes( h[0].id );
			})

			// remove extra points from the outer hull
			hullsData.forEach(function(thisHull,i){
				hullsData[i] = thisHull.filter(function(n){
					return !toRemove.includes( n.id );
				})
			})

			// calculate graph
			var graph = calculateNetwork(filtered)
			nodes = graph.nodes;
			links = graph.edges;
		} )

		if (noRestart != false) {
			restart();
		}

		// important to return here so to not do the following instructions
		return;
	}
	// console.log(d.label, d.id);
	if (d.subNodes && d.subNodes.length){
		// console.log(`${d.label} has ${d.subNodes.length} nodes to be expanded`);
		d.subNodes.forEach(function(subNode, i){
			if (i > 0) {
				subNode.x = d.x;
				subNode.y = d.y;
			}
		})
		d.opened = true;

		// Make convex hull
		var thisHullNodes = [d].concat(d.subNodes); // first element in array is always the one opened, so we can use its ID as identifier for the convex hull
		// console.log('this hull nodes', thisHullNodes);
		hullsData.push(thisHullNodes);

		// check if the first point of the hull is inside another hulls
		// if so it means this hull should be part of that opened
		// add these points to that hullsData
		hullsData.forEach(function(thisHull){
			// if the element is in the array, but is not the first
			if (thisHull.indexOf(thisHullNodes[0]) > 0) {
				thisHullNodes.forEach(function(n,i){
					if (i != 0) {
						thisHull.push(n);
					}
				})
			}
		})

		// calculate Graph
		var augmentedNodes = nodes.concat(d.subNodes);
		var graph = calculateNetwork(augmentedNodes);
		nodes = graph.nodes;
		links = graph.edges;
		if (noRestart != false) {
			restart();
		}
	} else {
		console.log('No nodes to expand')
	}
}

function openAll() {
	runAll(rootNodes);
	function runAll(nodesList) {
		nodesList.forEach( n => {
			if (n.totalSubNodes > 0) {
				toggleSubnodes(n, false);
				runAll(n.subNodes);
			}
		});
	}
	restart();
}

function closeAll() {
	rootNodes.forEach( d => {
		toggleSubnodes(d, false);
	})
	restart();
}

//
//
//
//
// convex hull from http://bl.ocks.org/hollasch/f70f1fe7700f092b5a505e3efd1d9232
//
//
//
//

var hullPadding = collisionPadding;
var pointRadius = 5;
// var margin = hullPadding + pointRadius;

var vecScale = function (scale, v) {
    // Returns the vector 'v' scaled by 'scale'.
    return [ scale * v[0], scale * v[1] ];
}

var vecSum = function (pv1, pv2) {
    // Returns the sum of two vectors, or a combination of a point and a vector.
    return [ pv1[0] + pv2[0], pv1[1] + pv2[1] ];
}

var unitNormal = function (p0, p1) {
    // Returns the unit normal to the line segment from p0 to p1.
    var n = [ p0[1] - p1[1], p1[0] - p0[0] ];
    var nLength = Math.sqrt (n[0]*n[0] + n[1]*n[1]);
    return [ n[0] / nLength, n[1] / nLength ];
};

var strictHull = function(polyPoints) {
    // This method returns a polygon given the specified points. The points are assumed to be in polygon order.
    return (
        'M ' + polyPoints[0]
        + ' L '
        + d3.range(1,polyPoints.length)
            .map(function(i) {return polyPoints[i];})
            .join(' L')
        + ' Z'
    );
};

var roundedHull = function (polyPoints, data) {
    // Returns the SVG path data string representing the polygon, expanded and rounded.

	// console.log(polyPoints, data);

	hullPadding = d3.max(data, function(d){
		return d.opened ? r(1) + collisionPadding : r(d.totalSubNodes + 1) + collisionPadding;
	})

    // Handle special cases
    if (!polyPoints || polyPoints.length < 1) return "";
    if (polyPoints.length === 1) return roundedHull1 (polyPoints, data);
    if (polyPoints.length === 2) return roundedHull2 (polyPoints, data);

    var segments = new Array (polyPoints.length);

    // Calculate each offset (outwards) segment of the convex hull.
    for (var segmentIndex = 0;  segmentIndex < segments.length;  ++segmentIndex) {
        var p0 = (segmentIndex === 0) ? polyPoints[polyPoints.length-1] : polyPoints[segmentIndex-1];
        var p1 = polyPoints[segmentIndex];

        // Compute the offset vector for the line segment, with length = hullPadding.
        var offset = vecScale (hullPadding, unitNormal (p0, p1));

        segments[segmentIndex] = [ vecSum (p0, offset), vecSum (p1, offset) ];
    }

    var arcData = 'A ' + [hullPadding, hullPadding, '0,0,0,'].join(',');

    segments = segments.map (function (segment, index) {
        var pathFragment = "";
        if (index === 0) {
            var pathFragment = 'M ' + segments[segments.length-1][1] + ' ';
        }
        pathFragment += arcData + segment[0] + ' L ' + segment[1];

        return pathFragment;
    });

    return segments.join(' ');
}

var roundedHull1 = function (polyPoints, data) {
    // Returns the path for a rounded hull around a single point (a circle).

    var p1 = [polyPoints[0][0], polyPoints[0][1] - hullPadding];
    var p2 = [polyPoints[0][0], polyPoints[0][1] + hullPadding];

    return 'M ' + p1
        + ' A ' + [hullPadding, hullPadding, '0,0,0', p2].join(',')
        + ' A ' + [hullPadding, hullPadding, '0,0,0', p1].join(',');
};


var roundedHull2 = function (polyPoints, data) {
    // Returns the path for a rounded hull around two points (a "capsule" shape).

    var offsetVector = vecScale (hullPadding, unitNormal (polyPoints[0], polyPoints[1]));
    var invOffsetVector = vecScale (-1, offsetVector);

    var p0 = vecSum (polyPoints[0], offsetVector);
    var p1 = vecSum (polyPoints[1], offsetVector);
    var p2 = vecSum (polyPoints[1], invOffsetVector);
    var p3 = vecSum (polyPoints[0], invOffsetVector);

    return 'M ' + p0
        + ' L ' + p1 + ' A ' + [hullPadding, hullPadding, '0,0,0', p2].join(',')
        + ' L ' + p3 + ' A ' + [hullPadding, hullPadding, '0,0,0', p0].join(',');
};
