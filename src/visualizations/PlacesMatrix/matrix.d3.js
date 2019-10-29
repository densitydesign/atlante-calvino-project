import * as d3 from 'd3';
import ParseMatrixData from '../../PlacesMatrixView/parse-matrix-data';
import _ from 'lodash';

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

const collisionPadding = 0.5;

// data
let graph, nodes = [], links = [], hullsData = [],
		rootNodes = [], storedFilters,
		last=0, openAllState=false

let surviveFilter = {
			'byPublicationType': [],
			'byTheme': [],
			'bySearch': []
		}

let surviveFilterArrays = []

// Dimensions and scales
let x, y, r, color, margin, width, height;
let xAxisCall, yAxisCall;
margin = { 'top': 0, 'right': 50, 'bottom': 30, 'left': 50 }

// elements
let svg, g, xAxis, yAxis, hull, link, node, presumed, label, information

// force-layout
let simulation

function reset() {
  node.style('opacity', 1);
	presumed.style('opacity', 1);
  label.classed('selected', false).style('display', 'none');
  // remove work title
  information = information.data([], function(d) { return d.id; });
  information.exit().remove();
}

function openSubnodes(d,noRestart) {
	if (d.subNodes && d.subNodes.length){
		// nodes.forEach(d=>{d.fx=null;d.fy=null;})
		d.fx = d.x*1;
		d.fy = d.y*1;

    d.subNodes.forEach(function(subNode, i){
			subNode.x = d.x;
			subNode.y = d.y;
    })
    d.opened = true;

    // Make convex hull
    var thisHullNodes = [d].concat(d.subNodes); // first element in array is always the one opened, so we can use its ID as identifier for the convex hull
    hullsData.push(thisHullNodes);

    // check if the first point of the hull is inside another hulls
    // if so it means this hull should be part of that opened
    // add these points to that hullsData
    hullsData.forEach(function(thisHull){
      // if the element is in the array, but is not the first
      if (thisHull.indexOf(thisHullNodes[0]) > 0) {
        thisHullNodes.forEach(function(n,i){
          if (i !== 0) {
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
    if (noRestart !== false) {
      V.update(graph, storedFilters);
    }
  } else {
    console.log('No nodes to expand')
  }
}

function closeSubnodes(d,noRestart) {
	if (d.opened) {

    d.opened = false;
    d.fx = null;
    d.fy = null;

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
      graph = ParseMatrixData.calculateNetwork(filtered)
			nodes = graph.nodes;
	    links = graph.edges;
    } )

    if (noRestart !== false) {
      V.update(graph, storedFilters);
    }
    // important to return here so to not do the following instructions
    return;
  }
}

function toggleSubnodes(d, noRestart) {
	// console.log('toggle sub nodes')
  if (d.opened) {

    d.opened = false;
    d.fx = null;
    d.fy = null;

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
      graph = ParseMatrixData.calculateNetwork(filtered)
			nodes = graph.nodes;
	    links = graph.edges;
    } )

    if (noRestart !== false) {
      V.update(graph, storedFilters);
    }
    // important to return here so to not do the following instructions
    return;
  }
  if (d.subNodes && d.subNodes.length){
		// nodes.forEach(d=>{d.fx=null;d.fy=null;})
		d.fx = d.x*1;
		d.fy = d.y*1;

    d.subNodes.forEach(function(subNode, i){
			subNode.x = d.x;
			subNode.y = d.y;
    })
    d.opened = true;

    // Make convex hull
    var thisHullNodes = [d].concat(d.subNodes); // first element in array is always the one opened, so we can use its ID as identifier for the convex hull
    hullsData.push(thisHullNodes);

    // check if the first point of the hull is inside another hulls
    // if so it means this hull should be part of that opened
    // add these points to that hullsData
    hullsData.forEach(function(thisHull){
      // if the element is in the array, but is not the first
      if (thisHull.indexOf(thisHullNodes[0]) > 0) {
        thisHullNodes.forEach(function(n,i){
          if (i !== 0) {
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
    if (noRestart !== false) {
      V.update(graph, storedFilters);
    }
  } else {
    console.log('No nodes to expand')
  }
}

function highlightNodes(arr, doReset){
	if (doReset) reset();
  arr.forEach( d => {
    node.filter(function(e){ return e.source !== d.source; }).style('opacity', 0.1);
		presumed.filter(function(e){ return e.source !== d.source; }).style('opacity', 0.1);
    label.filter(function(e){ return d.id === e.id }).classed('selected', true).style('display','block');
  })
}

function highlightCategories(arr, doReset) {
	if (doReset) reset();
	// console.log(arr)
	let arrId = arr.map( d => d.id)
	node.filter(function(n){ return arrId.indexOf(n.id) < 0 }).style('opacity', 0.1);
	presumed.filter(function(n){ return arrId.indexOf(n.id) < 0 }).style('opacity', 0.1);
	// label.filter(function(n){ return arrId.indexOf(n.id) > -1 }).classed('selected', true).style('display','block');
}

V.initialize = (el, data, filters) => {
  // console.log('init',data, filters)

  // Since React calls the update without data, at the beginning store data
  // so that when time-filter is used (and React calls update) there is data to use
  graph = data
  rootNodes = data.nodes.filter( d => d.totalSubNodes>0);
  // //get themes
  // let themes = []
  // d3.nest()
  //   .key(d=>d.theme)
  //   .entries(graph.nodes)
  //   .map(d=>d.key)
  //   .forEach(d=>{ themes = themes.concat(d.split(';')) });
  // themes = d3.nest()
  //   .key(d=>d)
  //   .entries(themes)
  //   .map(d=>d.key)
  //   .sort();
  // console.log(JSON.stringify(themes))

  // Root and dimensions
  svg = d3.select(el).style('touch-action', 'manipulation');
  width = svg.node().getBoundingClientRect().width - margin.left - margin.right;
  height = svg.node().getBoundingClientRect().height - margin.top - margin.bottom;

	let zoom = d3.zoom()
			.translateExtent([[0, 0], [width + margin.left + margin.right, height + margin.top + margin.bottom]])
	    .scaleExtent([1, 3])
	    .on("zoom", zoomed);

	svg.call(zoom).on("dblclick.zoom", null);

	function zoomed() {
	  g.attr("transform", d3.event.transform);
	}

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
  svg.append('rect')
  	.classed('reset', true)
  	.attr('x', margin.left)
  	.attr('width', width)
  	.attr('height', height)
  	.attr('fill', 'transparent')
  	.on('click', function(d){
			if ((d3.event.timeStamp - last) < 500) reset();
			last = d3.event.timeStamp;
		});
  g = svg.append('g').attr("transform", `translate(${margin.left},${margin.top})`).append('g')
  xAxis = g.append("g").attr("class", "x-axis")
  yAxis = g.append('g').attr("class", "y-axis")

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
          .attr("dy", -y.step()/10));

	yAxis.selectAll('.tick').on('click', function(d){

		let toOpen = []

		nodes.forEach(n0=>{
			console.log('n0',n0);
			if (n0.totalSubNodes>0){
				if (n0.subNodes.map(n=>n.category).indexOf(d) > -1) {
					toOpen.push(n0);
				}
				n0.subNodes.forEach(n1=>{
					console.log('n1',n1);
					if(n1.totalSubNodes>0) {
						if (n1.subNodes.map(n=>n.category).indexOf(d) > -1) {
							toOpen.push(n0);
							toOpen.push(n1);
						}
						n1.subNodes.forEach(n2=>{
							console.log('n2',n2);
							if(n2.totalSubNodes>0) {
								if (n2.subNodes.map(n=>n.category).indexOf(d) > -1) {
									toOpen.push(n0);
									toOpen.push(n1);
									toOpen.push(n2);
								}
							}
						})
					}
				})
			}
		})

		toOpen.forEach(n=>{openSubnodes(n,false)});

		V.update(graph, storedFilters);

		node.filter(nn=>{return nn.category!==d}).style('opacity',0.1)


		// highlightCategories(toHighlight, 'do reset')
	})

  link = g.append('g').classed('links', true).selectAll('.link');
  hull = g.append('g').classed('hulls', true).selectAll('.hull');
  node = g.append('g').classed('nodes', true).selectAll('.node');
	presumed = g.append('g').classed('presumed', true).selectAll('.presumed');
  label = g.append('g').classed('labels', true).selectAll('.label');
  information = g.append('g').classed('informations', true).selectAll('.information');

  simulation = d3.forceSimulation(nodes)
  	// .force("charge", d3.forceManyBody().strength(-1))
  	.force("link", d3.forceLink()
  		.strength( 0.2 )
  		.distance( r.range()[0] + 1 )
  		.id(function(d) { return d.id; })
  	)
  	.force("x", d3.forceX(function(d) { return d.x })
  		.strength(function(d) {
  			return d.part_of === '' ? 1 : 0;
  		})
  	)
  	.force("y", d3.forceY(function(d) { return d.y })
  		.strength(function(d) {
				return d.part_of === '' ? 0.7 : 0;
			})
  	)
  	.force("collision", d3.forceCollide(function(d){
  			return d.opened ? r(1)+collisionPadding : r(d.totalSubNodes + 1)+collisionPadding
  		})
  		.iterations(8)
  		.strength(0.35)
  	)
  	.on("tick", ticked)
    .on("end", () => {
			console.log('simulation ended')
		})
    .stop()

  function ticked() {

  	node
			.attr("cx", function(d) { return d.x; })
  		.attr("cy", function(d) { return d.y; });

		presumed
			.attr("cx", function(d) { return d.x; })
  		.attr("cy", function(d) { return d.y; });

  	label.attr("x", function(d) { return d.x; })
  		.attr("y", function(d) { return d.y; });

  	link.attr("x1", function(d) { return d.source.x; })
  		.attr("y1", function(d) { return d.source.y; })
  		.attr("x2", function(d) { return d.target.x; })
  		.attr("y2", function(d) { return d.target.y; });

  	hull.attr("d", function(d){
  		let thisHullPoints = d.map( d => { return [d.x, d.y] });
  		var points = thisHullPoints;
  		var convexHull = (points.length < 3) ? points : d3.polygonHull(points);
  		return roundedHull(convexHull, d);
  	})

		if (simulation.alpha() < 0.15) {
			simulation.force("x").strength(0)
			simulation.force("y").strength(0)
		}

  }

  V.update(data, filters)
}

V.update = (data, filters) => {
  console.log('update viz')

  // This is because react must call the update without data
  if (!data) data = graph
  nodes = data.nodes;
  links = data.edges;

  if (filters.update) {

		let isTimeFiltered = false;

		if (filters.timeFilter) {

			if (filters.timeFilter[0].getFullYear() != x.domain()[0].getFullYear() || filters.timeFilter[1].getFullYear() != x.domain()[1].getFullYear()) {
				isTimeFiltered = true;
				simulation.force("x").strength(1);
				simulation.force("y").strength(0.7);
				console.log("isTimeFiltered")
			}

			x.domain(d3.extent(nodes.filter( d => {
				const date = new Date(d.year)
				return date >= filters.timeFilter[0] && date <= filters.timeFilter[1]
			}), d=>d.year))
	    xAxis.attr("transform", `translate(${0}, ${height})`).call(xAxisCall)
		}

		// Set x and y of subNodes
		data.nodes.forEach(d => {
			d.x = (d.x&&!isTimeFiltered) ? d.x : x(d.year);
			d.fx = (d.fx&&!isTimeFiltered) ? x(d.year) : null;
			d.y = d.y ? d.y : y(d.category);
		})

    // Update the force layout
    simulation.force("x").x(function(d) { return d.x })

    node = node.data(nodes, d => { return d.id })
    node.exit().remove();
    node = node.enter().append('circle')
      .attr('class', d => `node`)
			.classed('sub-node', d => d.part_of !== '' )
			// .on('dblclick', function(d) {
			// 	console.log('dblclick')
      //   d3.event.preventDefault();
	    // })
      .on('click', function(d){

  			// show work title
  			information = information.data([d], function(d) { return d.id; });
  			information.exit().remove();
  			information = information.enter().append("text")
  				.classed('information', true)
  				.classed('label', true)
  				.attr('text-anchor', d => (x(d.year) >= width/2) ? 'end' : 'start')
  				.attr('x', d => (x(d.year) >= width/2) ? x(d.year)+4.8 : x(d.year)-3.2)
  				.attr('y', height - 10)
  				.text( d => (x(d.year) >= width/2) ? d.sourceTitle + ' ↓' : '↓ ' + d.sourceTitle)
  				.merge(information);

  			// get the double tap
  			if ((d3.event.timeStamp - last) < 500) {
          toggleSubnodes(d);
					return;
        }

				last = d3.event.timeStamp;
				highlightNodes([d], 'do reset opacity');
  		})
      .attr('key', d=> d.id)
      .attr('cx', d => {
        return d.x
      })
      .attr('cy', d => {
        return d.y
      })
      .merge(node)
      .style('cursor', function(d){ return d.subNodes && d.subNodes.length ? 'pointer' : 'auto'; })
  		.attr("fill", function(d) { return d.opened===true ? 'white' : color(d.category); })
  		.attr('stroke', function(d) { if(d.totalSubNodes > 0) return d3.color(color(d.category)).darker(1) })
      // .style('opacity', 1)
      .attr("r", function(d){ return d.opened ? r(1) : r(d.totalSubNodes + 1) }) // +1 means plus itself

		presumed = presumed.data(nodes.filter(d => { return d.isGuessed }), d => { return d.id })
    presumed.exit().remove();
    presumed = presumed.enter().append('circle')
			.classed('presumed', true)
			.attr('r', 1.5)
			.attr('fill', function(d) { return d3.color(color(d.category)).darker(1) })
			.attr('cx', d => {
        return d.x
      })
      .attr('cy', d => {
        return d.y
      })
			.merge(presumed)

    // Apply the general update pattern to the links.
  	link = link.data(links, function(d) {
  		return d.source.id + "-" + d.target.id;
  	});
  	link.exit().remove();
  	link = link.enter().append("line")
  		.classed('link', true)
  		.classed('part-of', function(d) { return d.kind === 'part_of' })
      .attr('stroke-width', 0.5)
      .attr('stroke', '#ccc')
  		.on('click', d => console.log(d))
  		.merge(link);

  	// Apply the general update pattern to the labels.
  	label = label.data(nodes, function(d) { return d.id; });
  	label.exit().remove();
  	label = label.enter().append("text")
  		.classed('label', true)
  		.style('display', 'none')
  		.attr('text-anchor', 'middle')
      .style('pointer-events', 'none')
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
  			// d3.event.preventDefault;
  			// get the double tap
  			if ((d3.event.timeStamp - last) < 500) {
          toggleSubnodes(d[0]);
        }
        last = d3.event.timeStamp;
  		})
  		.merge(hull);

    simulation.nodes(nodes);
		if (simulation.force("link")) {
			simulation.force("link").links(links);
		}
  	simulation.alpha(1).restart();
  }

	if (filters) {
		// store filters
		storedFilters = filters
		// do filters here
		if (filters.openAll !== undefined && filters.openAll !== openAllState) {
			console.log('open or close all', filters.openAll)
			openAllState = filters.openAll
			if (openAllState === true) {
				V.openAll();
			} else {
				V.closeAll();
			}
		}

		if (filters.selectedPublications) {

			console.log(filters.selectedPublications)
			// console.log( nodes.map(d=>d.id).join('\n') )

			if (filters.selectedPublications !== 'tutti') {
				let pubTypes = Array.isArray(filters.selectedPublications)?filters.selectedPublications:[filters.selectedPublications];
				surviveFilterArrays[0] = nodes.filter( d=>{
					let check = pubTypes.map(e => d.publicationType.indexOf(e) > -1 )
					return check.indexOf(true) > -1;
				}).map(d=>d.id);
			} else {
				surviveFilter.byPublicationType = [];
			}

		}
		if (filters.selectedThemes) {
			// console.log('filter by theme to be implemented', nodes)

			if (filters.selectedThemes !== 'tutti') {
				let pubThemes = Array.isArray(filters.selectedThemes)?filters.selectedThemes:[filters.selectedThemes];
				surviveFilterArrays[1] = nodes.filter( d=>{
					let check = pubThemes.map(e => d.themes.indexOf(e) > -1 )
					return check.indexOf(true) > -1;
				}).map(d=>d.id);
			} else {
				surviveFilter.byTheme = [];
			}

			// if (filters.selectedThemes === 'tutti') {
			// 	node.classed('faded', false)
			// } else {
			// 	node.classed('faded', false).classed('faded', d => {
			// 		if (d.themes) {
			// 			return !d.themes.includes(filters.selectedThemes)
			// 		} else {
			// 			return true
			// 		}
			// 	})
			// }
		}
		if (filters.search) {
			console.log('filter by search to be implemented')
			// if (filters.search.length > 0) {
			// 	node
			// 		.classed('faded', true)
			// 		.filter(d=>filters.search.indexOf(d.id)>-1)
			// 		.classed('faded', false)
			// } else {
			// 	node.classed('faded', false)
			// }
		}

		console.log("surviveFilter", surviveFilter)

		let mergeSurvived = [];

		console.log(surviveFilterArrays)

		surviveFilterArrays.forEach((d,i) => {
			if (i===0) {
				mergeSurvived = d;
			} else {
				mergeSurvived = _.intersection(mergeSurvived, surviveFilterArrays[i]);
			}
		})

		console.log("mergeSurvived", mergeSurvived)

		// node.filter(d=>mergeSurvived.indexOf(d.id) < 0)
		// 		.classed('faded', true);

	}

}

V.openAll = () => {
	runAll(nodes);
	function runAll(nodesList) {
		nodesList.forEach( n => {
			if (n.totalSubNodes > 0) {
				openSubnodes(n, false);
				runAll(n.subNodes);
			}
		});
	}
	// simulation.force("x").strength(1)
	// simulation.force("y").strength(1)
	V.update(graph, storedFilters);
}

V.closeAll = () => {

	rootNodes.forEach(function(d){
		closeSubnodes(d, false);
	})
	// simulation.force("x").strength(1)
	// simulation.force("y").strength(1)
	V.update(graph, storedFilters);
}



V.destroy = () => {}

export default V

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
// var pointRadius = 5;
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


/////// Interactions

document.addEventListener('keydown', keyIsPressedHereYeah);
function keyIsPressedHereYeah(e) {
  if (e.key === 'l') label.classed('make-visible', true)
	if (e.key === 'L') label.classed('make-visible', false)
}
