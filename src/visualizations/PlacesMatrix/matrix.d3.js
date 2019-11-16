import * as d3 from 'd3';
import ParseMatrixData from '../../PlacesMatrixView/parse-matrix-data';
import _ from 'lodash';

const categories = ['generico_non_terrestre', 'nominato_non_terrestre', 'nominato_terrestre', 'generico_terrestre', 'inventato', 'no_ambientazione'];
const categoriesColors = ['#3131ff', '#bbbbff', '#ffce00', '#ff6c39', '#00c19c', '#cecece']

const collisionPadding = 0.25;

// data
let graph, nodes = [],
	links = [],
	hullsData = [],
	last = 0,
	globalFilters,
	openAllState = false;

// Dimensions and scales
let x, y, r, color, margin = { 'top': 0, 'right': 50, 'bottom': 30, 'left': 50 },
	width, height;
let xAxisCall, yAxisCall;

// elements
let svg, g, g_forceLayout, xAxis, yAxis, hull, link, node, presumed, label, information

// force-layout
let simulation

const V = {}

export default V

V.initialize = (el, data, filters) => {
	// console.log('init');
	// console.log('data:', data);
	// console.log('filters:', filters);

	// Root element and dimensions
	svg = d3.select(el).style('touch-action', 'manipulation');
	width = svg.node().getBoundingClientRect().width - margin.left - margin.right;
	height = svg.node().getBoundingClientRect().height - margin.top - margin.bottom;

	svg.append('rect')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.classed('reset-rect', true)
		.on('click', d => {
			if((d3.event.timeStamp - last) < 500) {
				console.log('reset')
				reset();
			}
			last = d3.event.timeStamp;
		})

	// Scales
	x = d3.scaleTime()
		.range([0, width])
		.domain(filters.span);

	xAxisCall = d3.axisBottom(x).ticks(d3.timeYear.every(1));

	y = d3.scalePoint()
		.range([0, height])
		.domain(categories)
		.padding(0.5);

	yAxisCall = d3.axisRight(y).tickSize(width).tickFormat(d => d.replace(/_/g, ' '));

	r = d3.scalePow().exponent(0.5)
		.range([3, 25])
		.domain([1, d3.max(data.nodes, function(d) { return d.totalSubNodes })]);

	color = d3.scaleOrdinal().domain(categories).range(categoriesColors);

	// Groups and scales
	g = svg.append('g').attr("transform", `translate(${margin.left},${margin.top})`);
	xAxis = g.append("g").attr("class", "x-axis");
	yAxis = g.append('g').attr("class", "y-axis");
	g_forceLayout = g.append('g');

	xAxis.attr("transform", `translate(${0}, ${height})`).call(xAxisCall);

	yAxis.attr("transform", `translate(0, 0)`)
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
			.attr("dy", -y.step() / 10));

	link = g_forceLayout.append('g').classed('links', true).selectAll('.link');
	hull = g_forceLayout.append('g').classed('hulls', true).selectAll('.hull');
	node = g_forceLayout.append('g').classed('nodes', true).selectAll('.node');
	presumed = g_forceLayout.append('g').classed('presumed', true).selectAll('.presumed');
	label = g_forceLayout.append('g').classed('labels', true).selectAll('.label');
	information = g.append('g').classed('informations', true).selectAll('.information');

	simulation = d3.forceSimulation(nodes)
		.force("collision", d3.forceCollide(function(d) {
			let thisCollisionPadding = d.totalSubNodes > 0 ? collisionPadding + 2 : collisionPadding;
			return d.opened ? r(1) + thisCollisionPadding : r(d.totalSubNodes + 1) + thisCollisionPadding
		}).strength(.3).iterations(12))
		.force("link", d3.forceLink()
			.strength(0.1)
			.distance(r.range()[0])
			.id(function(d) { return d.id; })
		)
		.force("x", d3.forceX(d => x(d.year)))
		.force("y", d3.forceY(d => y(d.category)).strength(d => d.part_of === '' ? 0.1 : 0))
		.on("tick", ticked)
		.on("end", () => { console.log('simulation ended') })
		.stop()

	function ticked() {
		node.attr("cx", (d, i) => d.x)
			.attr("cy", d => d.y);

		presumed.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; });

		label.attr("x", function(d) { return d.x; })
			.attr("y", function(d) { return d.y; });

		link.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });

		hull.attr("d", function(d) {
			let thisHullPoints = d.map(d => { return [d.x, d.y] });
			var points = thisHullPoints;
			var convexHull = (points.length < 3) ? points : d3.polygonHull(points);
			return roundedHull(convexHull, d);
		})
	}

	//Store data in global variable
	graph = data;
	globalFilters = filters;

	// Precalculating the position of nodes allows to make them appear in place
	graph.nodes = graph.nodes.map(d => {
		return {
			...d,
			x: x(d.year),
			y: y(d.category)
		}
	})

}

V.update = (filters) => {
	// console.log('update');
	// console.log('graph:', graph);

	if(filters) globalFilters = filters

	// update data
	nodes = graph.nodes;
	links = graph.edges;

	// update fx before updating the x scale
	nodes.forEach(d => {
		if(d.fx) {
			d.correspondingYear = x.invert(d.fx)
		} else {
			delete d.correspondingYear;
		}
	})

	// Update x domain
	x.domain(globalFilters.span)
	xAxis.call(xAxisCall);

	// calculate new fx
	nodes.forEach(d => {
		if(d.correspondingYear) {
			d.fx = x(d.correspondingYear)
		}
	})

	node = node.data(nodes, d => { return d.id })
	node.exit().remove();
	node = node.enter().append('circle')
		.attr('class', d => `node`)
		.classed('sub-node', d => d.part_of !== '')
		// .classed('selected', d => d.isSelected )
		.attr('key', d => d.id)
		.on('mouseenter', d => {
			label.filter(l => l.id === d.id).style('display', 'block')
			node.style('opacity', .25).filter(n => n.source === d.source).style('opacity', 1)
		})
		.on('mouseleave', d => {
			label.filter(l => l.id === d.id).style('display', 'none')
			node.style('opacity', '')
		})
		.on('click', d => {
			// console.log('clicked on', d)
			// if double click/tap
			if((d3.event.timeStamp - last) < 500) {
				toggleSubnodes(d, 'restart the force');
			}
			last = d3.event.timeStamp;
			// do this after the nodes have been opened
			selectLabel(d);
			selectSameComposition(d);
			displayTitle([d]);
		})
		.merge(node)
		.style('cursor', function(d) { return d.subNodes && d.subNodes.length ? 'pointer' : 'auto'; })
		.attr("fill", d => d.opened === true ? 'white' : color(d.category))
		.attr('stroke', function(d) { if(d.totalSubNodes > 0) return d3.color(color(d.category)).darker(1) })
		.attr("r", function(d) { return d.opened ? r(1) : r(d.totalSubNodes + 1) }) // +1 means plus itself

	presumed = presumed.data(nodes.filter(d => d.isGuessed), d => d.id)
	presumed.exit().remove();
	presumed = presumed.enter().append('circle')
		.classed('presumed', true)
		.attr('r', 1.5)
		.attr('fill', d => d3.color(color(d.category)).darker(1))
		.merge(presumed)

	// Apply the general update pattern to the links.
	link = link.data(links, d => d.source.id + "-" + d.target.id);
	link.exit().remove();
	link = link.enter().append("line")
		.classed('link', true)
		.classed('part-of', function(d) { return d.kind === 'part_of' })
		.attr('stroke-width', 0.5)
		.attr('stroke', '#ccc')
		.merge(link);

	// Apply the general update pattern to the labels.
	label = label.data(nodes, d => d.id);
	label.exit().remove();
	label = label.enter().append("text")
		.classed('label', true)
		.style('display', 'none')
		.attr('text-anchor', 'middle')
		.style('pointer-events', 'none')
		.text(d => d.label)
		.merge(label);

	// Apply the general update pattern to the convex hulls.
	hull = hull.data(hullsData, d => d[0].id);
	hull.exit().remove();
	hull = hull.enter().append("path")
		.classed('hull', true)
		.attr('fill', d => color(d[0].category))
		.style('opacity', .25)
		.merge(hull);

	simulation.nodes(nodes);
	if(simulation.force("link")) {
		simulation.force("link").links(links);
	}
	simulation.alpha(1).restart();

}

V.filter = (filters, theOriginalData) => {
	// console.log('filter');
	// console.log('filters:', filters);
	// console.log('graph:', graph)
	globalFilters = filters;

	let surviveFilters = []

	// the search can open parent-nodes, so can modyfy the data structure and the BodyViz
	// for this reason put it before the others
	if(filters.search.length) {

		surviveFilters[2] = filters.search;

		let parents2open = [];
		filters.search.forEach(s => {
			search4Parent(s);
		});

		function search4Parent(nodeId) {
			const thisNode = theOriginalData.filter(od => od.id === nodeId)[0];
			if(thisNode.part_of !== "") {
				parents2open.push(thisNode.part_of);
				search4Parent(thisNode.part_of);
			}
		}

		if(parents2open.length > 0) {
			parents2open.reverse().forEach((parentId, i) => {
				const parent_id = theOriginalData.filter(od => od.id === parentId)[0].id;
				surviveFilters[2].push(parent_id);
				const parent = nodes.filter(d => d.id === parent_id)[0]
				openSubnodes(parent, 'do not restart the force');
			})

			V.update(filters)
		}
	}

	let pubTypes = filters.kinds;
	surviveFilters[0] = nodes.filter(d => {
		let check = pubTypes.map(e => d.publicationType.indexOf(e) > -1)
		return check.indexOf(true) > -1;
	}).map(d => d.id);

	let pubThemes = filters.themes;
	surviveFilters[1] = nodes.filter(d => {
		let check = pubThemes.map(e => d.themes.indexOf(e) > -1)
		return check.indexOf(true) > -1;
	}).map(d => d.id);

	let mergeSurvived = [];
	surviveFilters.forEach((d, i) => {
		if(i === 0) {
			mergeSurvived = d;
		} else {
			mergeSurvived = _.intersection(mergeSurvived, surviveFilters[i]);
		}
	})
	node.classed('faded', d => mergeSurvived.indexOf(d.id) < 0);
}

V.openAll = () => {
	runAll(nodes);

	function runAll(nodesList) {
		nodesList.forEach(n => {
			if(n.totalSubNodes > 0) {
				openSubnodes(n, 'do not restart simulation');
				runAll(n.subNodes);
			}
		});
	}
}

V.closeAll = () => {
	nodes.filter(d => d.part_of === '').forEach(function(d) {
		closeSubnodes(d, 'do not restart simulation');
	})
}

V.destroy = () => {}

// Other functions
const openSubnodes = (d, doRestart) => {
	// If it happens that the node is already open, just skip.
	if(d.opened) return;

	// If not, let's open it
	d.opened = true;

	// fix the position only if it is a "root node"
	if(d.part_of === '') {
		d.fx = d.x;
		d.fy = d.y;
	}

	// make subnodes appear at the place of their parent
	d.subNodes.forEach(function(subNode) {
		subNode.x = d.x;
		subNode.y = d.y;
		// subNode.isSelected = true;
	})

	// Make convex hull
	var thisHullNodes = [d].concat(d.subNodes); // first element in array is always the one opened, so we can use its ID as identifier for the convex hull
	hullsData.push(thisHullNodes);

	// check if the first point of the hull is inside another hulls
	// if so it means this hull should be part of that opened
	// add these points to that hullsData
	hullsData.forEach(function(thisHull) {
		// if the element is in the array, but is not the first
		if(thisHull.indexOf(thisHullNodes[0]) > 0) {
			thisHullNodes.forEach(function(n, i) {
				if(i !== 0) {
					thisHull.push(n);
				}
			})
		}
	})

	// calculate Graph
	var augmentedNodes = nodes.concat(d.subNodes);
	graph = ParseMatrixData.calculateNetwork(augmentedNodes);
	nodes = graph.nodes;
	links = graph.edges;
	if(doRestart === 'restart the force') {
		V.update();
	}
}
const closeSubnodes = (d, doRestart) => {
	// If it is already opened or if it has no children, just skip
	if(!d.opened || d.totalSubNodes === 0) return;

	d.opened = false;
	delete d.fx;
	delete d.fy;

	var subNodes2Remove = [];
	var hulls2Remove = [d.id]

	// recursive functions, it makes possible to close contained cluster of nodes
	function collectSubNodes(parentNode) {
		parentNode.subNodes.forEach(childNode => {
			if(childNode.opened) {
				childNode.opened = false;
				hulls2Remove.push(childNode.id);
				collectSubNodes(childNode);
			}
		});
		subNodes2Remove.push(parentNode.subNodes);
	}

	collectSubNodes(d);

	// cycle in the subNodes2Remove array and for each list of sub-nodes to be removed remove and re-calculate the network.
	// Probably not the best way, but the simplest at the moment of the coding.
	subNodes2Remove.forEach(subNodes => {

		let toRemove = subNodes.map(d => d.id)
		let filtered = nodes.filter(el => {
			return !toRemove.includes(el.id);
		})

		// remove this hull
		hullsData = hullsData.filter(function(h) {
			return !hulls2Remove.includes(h[0].id);
		})

		// remove extra points from the outer hull
		hullsData.forEach(function(thisHull, i) {
			hullsData[i] = thisHull.filter(function(n) {
				return !toRemove.includes(n.id);
			})
		})

		// calculate graph
		graph = ParseMatrixData.calculateNetwork(filtered)
		nodes = graph.nodes;
		links = graph.edges;
	})

	if(doRestart === 'restart the force') {
		V.update();
	}
}
const toggleSubnodes = (d, doRestart) => {
	// console.log("Ohhhhh, let's toggle the sub nodes of", d.label, d.id)
	if(d.opened) {
		unselectLabel(d);
		closeSubnodes(d, doRestart);
	} else if(d.subNodes && d.subNodes.length) {
		selectLabel(d);
		openSubnodes(d, doRestart);
	} else {
		console.log('No nodes to expand');
	}
}

// Interactions

const displayTitle = (arr) => {
	// show composition title
	information = information.data(arr, function(d) { return d.id; });
	information.exit().remove();
	information = information.enter().append("text")
		.classed('information', true)
		.classed('label', true)
		.attr('text-anchor', d => (x(d.year) >= width / 2) ? 'end' : 'start')
		.attr('x', d => (x(d.year) >= width / 2) ? x(d.year) + 4.8 : x(d.year) - 3.2)
		.attr('y', height - 10)
		.text(d => (x(d.year) >= width / 2) ? d.sourceTitle + ' ↓' : '↓ ' + d.sourceTitle)
		.merge(information);
}

const selectLabel = (d) => {
	label.filter(l => l.id === d.id).classed('selected', true)
}
const unselectLabel = (d) => {
	label.filter(l => l.id === d.id).classed('selected', false)
}

const selectSameComposition = (d) => {
	svg.classed('there-is-selection', true)
	node.filter(n => n.source === d.source).classed('selected', true)
}
const unselectSameComposition = (d) => {
	node.filter(n => n.source === d.source).classed('selected', false)

	if(svg.select('.selected').size() === 0) {
		svg.classed('there-is-selection', false)
	}
}

const reset = () => {
	svg.selectAll('*').classed('selected', false);
	svg.classed('there-is-selection', false)
	displayTitle([]);
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

var vecScale = function(scale, v) {
	// Returns the vector 'v' scaled by 'scale'.
	return [scale * v[0], scale * v[1]];
}

var vecSum = function(pv1, pv2) {
	// Returns the sum of two vectors, or a combination of a point and a vector.
	return [pv1[0] + pv2[0], pv1[1] + pv2[1]];
}

var unitNormal = function(p0, p1) {
	// Returns the unit normal to the line segment from p0 to p1.
	var n = [p0[1] - p1[1], p1[0] - p0[0]];
	var nLength = Math.sqrt(n[0] * n[0] + n[1] * n[1]);
	return [n[0] / nLength, n[1] / nLength];
};

var strictHull = function(polyPoints) {
	// This method returns a polygon given the specified points. The points are assumed to be in polygon order.
	return (
		'M ' + polyPoints[0] +
		' L ' +
		d3.range(1, polyPoints.length)
		.map(function(i) { return polyPoints[i]; })
		.join(' L') +
		' Z'
	);
};

var roundedHull = function(polyPoints, data) {
	// Returns the SVG path data string representing the polygon, expanded and rounded.
	hullPadding = d3.max(data, function(d) {
		return d.opened ? r(1) + collisionPadding : r(d.totalSubNodes + 1) + collisionPadding;
	})

	// Handle special cases
	if(!polyPoints || polyPoints.length < 1) return "";
	if(polyPoints.length === 1) return roundedHull1(polyPoints, data);
	if(polyPoints.length === 2) return roundedHull2(polyPoints, data);

	var segments = new Array(polyPoints.length);

	// Calculate each offset (outwards) segment of the convex hull.
	for(var segmentIndex = 0; segmentIndex < segments.length; ++segmentIndex) {
		var p0 = (segmentIndex === 0) ? polyPoints[polyPoints.length - 1] : polyPoints[segmentIndex - 1];
		var p1 = polyPoints[segmentIndex];

		// Compute the offset vector for the line segment, with length = hullPadding.
		var offset = vecScale(hullPadding, unitNormal(p0, p1));

		segments[segmentIndex] = [vecSum(p0, offset), vecSum(p1, offset)];
	}

	var arcData = 'A ' + [hullPadding, hullPadding, '0,0,0,'].join(',');

	segments = segments.map(function(segment, index) {
		var pathFragment = "";
		if(index === 0) {
			var pathFragment = 'M ' + segments[segments.length - 1][1] + ' ';
		}
		pathFragment += arcData + segment[0] + ' L ' + segment[1];

		return pathFragment;
	});

	return segments.join(' ');
}

var roundedHull1 = function(polyPoints, data) {
	// Returns the path for a rounded hull around a single point (a circle).

	var p1 = [polyPoints[0][0], polyPoints[0][1] - hullPadding];
	var p2 = [polyPoints[0][0], polyPoints[0][1] + hullPadding];

	return 'M ' + p1 +
		' A ' + [hullPadding, hullPadding, '0,0,0', p2].join(',') +
		' A ' + [hullPadding, hullPadding, '0,0,0', p1].join(',');
};

var roundedHull2 = function(polyPoints, data) {
	// Returns the path for a rounded hull around two points (a "capsule" shape).

	var offsetVector = vecScale(hullPadding, unitNormal(polyPoints[0], polyPoints[1]));
	var invOffsetVector = vecScale(-1, offsetVector);

	var p0 = vecSum(polyPoints[0], offsetVector);
	var p1 = vecSum(polyPoints[1], offsetVector);
	var p2 = vecSum(polyPoints[1], invOffsetVector);
	var p3 = vecSum(polyPoints[0], invOffsetVector);

	return 'M ' + p0 +
		' L ' + p1 + ' A ' + [hullPadding, hullPadding, '0,0,0', p2].join(',') +
		' L ' + p3 + ' A ' + [hullPadding, hullPadding, '0,0,0', p0].join(',');
};
