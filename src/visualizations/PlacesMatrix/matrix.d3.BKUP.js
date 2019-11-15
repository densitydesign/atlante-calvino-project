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

const collisionPadding = 0.25;

// data
let theOriginalData, graph, nodes = [], links = [], hullsData = [],
		rootNodes = [], storedFilters,
		last=0, openAllState=false, resetByClick = false

// Dimensions and scales
let x, y, r, color, margin, width, height;
let xAxisCall, yAxisCall;
margin = { 'top': 0, 'right': 50, 'bottom': 30, 'left': 50 }

// elements
let svg, g, gigi, xAxis, yAxis, hull, link, node, presumed, label, information

// force-layout
let simulation

function openSubnodes(d,noRestart) {
	if (d.subNodes && d.subNodes.length){
		// nodes.forEach(d=>{d.fx=null;d.fy=null;})
		if (d.part_of === '') {
			d.fx = d.x*1;
			d.fy = d.y*1;
		}

    d.subNodes.forEach(function(subNode, i){
			subNode.x = d.x;
			subNode.y = d.y;

			subNode.originalYear = subNode.year
			subNode.year = d.year;

			subNode.originalCategory = subNode.category;
			subNode.category = d.category;
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
  if(d.opened) {
    closeSubnodes(d, noRestart);
  }
  if (d.subNodes && d.subNodes.length){
		openSubnodes(d,noRestart);
  } else {
    console.log('No nodes to expand')
  }
}

function toggleSubnodesOLD(d, noRestart) {
  if(d.opened) {
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
		if (d.part_of === '') {
			d.fx = d.x*1;
			d.fy = d.y*1;
		}

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
			storedFilters.update = true;
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

		displayTitle([d]);
  })
}

const displayTitle = (arr) => {

	// show work title
	information = information.data(arr, function(d) { return d.id; });
	information.exit().remove();
	information = information.enter().append("text")
		.classed('information', true)
		.classed('label', true)
		.attr('text-anchor', d => (x(d.year) >= width/2) ? 'end' : 'start')
		.attr('x', d => (x(d.year) >= width/2) ? x(d.year)+4.8 : x(d.year)-3.2)
		.attr('y', height - 10)
		.text( d => (x(d.year) >= width/2) ? d.sourceTitle + ' ↓' : '↓ ' + d.sourceTitle)
		.merge(information);
}

function highlightCategories(arr, doReset) {
	if (doReset) reset();
	// console.log(arr)
	let arrId = arr.map( d => d.id)
	node.filter(function(n){ return arrId.indexOf(n.id) < 0 }).style('opacity', 0.1);
	presumed.filter(function(n){ return arrId.indexOf(n.id) < 0 }).style('opacity', 0.1);
	// label.filter(function(n){ return arrId.indexOf(n.id) > -1 }).classed('selected', true).style('display','block');
}

function reset() {
	if (resetByClick) return;
  node.style('opacity', 1);
	presumed.style('opacity', 1);
  label.classed('selected', false).style('display', 'none');
  // remove work title
  displayTitle([]);
}

V.initialize = (el, data, filters, originalData) => {
  console.log('init')

  // Since React calls the update without data, at the beginning store data
  // so that when time-filter is used (and React calls update) there is data to use
  graph = data
  rootNodes = data.nodes.filter( d => d.totalSubNodes>0);
	theOriginalData = originalData;

  // Root and dimensions
  svg = d3.select(el).style('touch-action', 'manipulation');
  width = svg.node().getBoundingClientRect().width - margin.left - margin.right;
  height = svg.node().getBoundingClientRect().height - margin.top - margin.bottom;

	let zoom = d3.zoom()
			.translateExtent([[0, 0], [width + margin.left + margin.right, height + margin.top + margin.bottom]])
	    .scaleExtent([1, 10])
	    .on("zoom", zoomed);

	svg.call(zoom).on("dblclick.zoom", null);

	function zoomed() {
	  gigi.attr("transform", d3.event.transform);
		yAxis.attr("transform", d3.event.transform);

		// x axis resize taken from: https://bl.ocks.org/rutgerhofste/5bd5b06f7817f0ff3ba1daa64dee629d
		let new_x = d3.event.transform.rescaleX(x);
		xAxis.call(xAxisCall.scale(new_x))

		let one_rem = parseInt(d3.select('html').style('font-size'));

		d3.select('.labels')
			.style('font-size', d=>{
				let cssRemSize = 0.75;
				let k = cssRemSize * 1/d3.event.transform.k;
				k+='rem';
				return k;
			})

		information
			.attr('x', d => (new_x(d.year) >= width/2) ? new_x(d.year)+4.8 : new_x(d.year)-3.2);
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
    .range([3,25])
    .domain([1,d3.max(data.nodes, function(d){ return d.totalSubNodes })])
  color = d3.scaleOrdinal().domain(categories).range(categoriesColors)

	// calculate d.x and d.y
	// graph.nodes = graph.nodes.map(d=>{
	// 	return {
	// 		...d,
	// 		x: x(d.year),
	// 		y: y(d.category)
	// 	}
	// })

  // elements
  svg.append('rect')
  	.classed('reset', true)
  	.attr('x', margin.left)
  	.attr('width', width)
  	.attr('height', height)
  	.attr('fill', 'transparent')
  	.on('click', function(d){
			resetByClick = false;
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

		if (d3.select(this).classed('selected') === false ) {

			if (d3.selectAll('.tick.selected').size() > 0) {
				rootNodes.forEach(n=>{closeSubnodes(n,false)});
				d3.selectAll('.tick.selected').classed('selected', false);
			}

			let toOpen = []
			nodes.forEach(n0=>{
				// console.log('n0',n0);
				if (n0.totalSubNodes>0){
					if (n0.subNodes.map(n=>n.category).indexOf(d) > -1) {
						toOpen.push(n0);
					}
					n0.subNodes.forEach(n1=>{
						// console.log('n1',n1);
						if(n1.totalSubNodes>0) {
							if (n1.subNodes.map(n=>n.category).indexOf(d) > -1) {
								toOpen.push(n0);
								toOpen.push(n1);
							}
							n1.subNodes.forEach(n2=>{
								// console.log('n2',n2);
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
			node.filter(nn=>{return nn.category!==d}).style('opacity',0.1)
		} else {
			let toClose = []
			nodes.forEach(n0=>{
				// console.log('n0',n0);
				if (n0.totalSubNodes>0){
					if (n0.subNodes.map(n=>n.category).indexOf(d) > -1) {
						toClose.push(n0);
					}
					n0.subNodes.forEach(n1=>{
						// console.log('n1',n1);
						if(n1.totalSubNodes>0) {
							if (n1.subNodes.map(n=>n.category).indexOf(d) > -1) {
								toClose.push(n0);
								toClose.push(n1);
							}
							n1.subNodes.forEach(n2=>{
								// console.log('n2',n2);
								if(n2.totalSubNodes>0) {
									if (n2.subNodes.map(n=>n.category).indexOf(d) > -1) {
										toClose.push(n0);
										toClose.push(n1);
										toClose.push(n2);
									}
								}
							})
						}
					})
				}
			})
			toClose.forEach(n=>{closeSubnodes(n,false)});
			node.style('opacity',1)
		}

		V.update(graph, storedFilters);

		d3.select(this).classed('selected', !d3.select(this).classed('selected'))

		// highlightCategories(toHighlight, 'do reset')
	})

	gigi = g.append('g')

  link = gigi.append('g').classed('links', true).selectAll('.link');
  hull = gigi.append('g').classed('hulls', true).selectAll('.hull');
  node = gigi.append('g').classed('nodes', true).selectAll('.node');
	presumed = gigi.append('g').classed('presumed', true).selectAll('.presumed');
  label = gigi.append('g').classed('labels', true).selectAll('.label');
  information = g.append('g').classed('informations', true).selectAll('.information');

  simulation = d3.forceSimulation(nodes)
		.force("collision", d3.forceCollide(function(d){
				let thisCollisionPadding = d.totalSubNodes>0 ? collisionPadding+2 : collisionPadding;
				return d.opened ? r(1)+thisCollisionPadding : r(d.totalSubNodes + 1)+thisCollisionPadding
			}).strength(.6)
		)
  	.force("link", d3.forceLink()
  		.strength( 0.05 )
  		.distance( r.range()[0] )
  		.id(function(d) { return d.id; })
  	)
  	.force("x", d3.forceX(d=>{
			if (d.part_of !== "") return d.x
			return x(d.year)
		}))
  	.force("y", d3.forceY(d=>{
			if (d.part_of !== "") return d.y
			return y(d.category)
		}))
  	.on("tick", ticked)
    .on("end", () => { console.log('simulation ended') })
    .stop()

  function ticked() {
  	node.attr("cx", (d,i)=>d.x)
  		.attr("cy", d=>d.y);

		presumed.attr("cx", function(d) { return d.x; })
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

  }

  V.update(data, filters)
}

V.update = (data, filters) => {
  console.log('update viz')

  // This is because react must call the update without data
  if (!data) data = graph

  nodes = data.nodes;
  links = data.edges;

	storedFilters = filters

	if (filters.search.length) {

		let parents2open = [];
		filters.search.forEach(s=>{
			search4Parent(s);
		});
		function search4Parent(nodeId){
			const thisNode = theOriginalData.filter(od=>od.id===nodeId)[0];
			if (thisNode.part_of !== "") {
				parents2open.push(thisNode.part_of);
				search4Parent(thisNode.part_of);
			}
		}

		// I technically should open interesting parents, but it is kind of hard.
		// Provisionally solve the issue by highliting parents
		// surviveFilters[2] = _.union(surviveFilters[2], parents2open)

		// To fix it I probably need to write a new method just for the filters (V.filter).
		if (parents2open.length > 0) {
			parents2open.reverse().forEach((parentId,i)=>{
				const parent = theOriginalData.filter(od=>od.id===parentId)[0]
				openSubnodes(parent, false);
			})
			filters.update = true
		}
	}

  if (filters.update) {

		if (filters.timeFilter && filters.timeFilteredCount>1) {
			console.log('Yeah lets filter on time', filters.timeFilteredCount)

			x.domain(d3.extent(nodes.filter( d => {
				const date = new Date(d.year)
				return date >= filters.timeFilter[0] && date <= filters.timeFilter[1]
			}), d=>d.year))

			xAxis
				.attr("transform", `translate(${0}, ${height})`)
				.call(xAxisCall)

			// calculate d.x and d.y
			graph.nodes = graph.nodes.map((d,i)=>{
				return {
					...d,
					x: x(d.year)
				}
			})

			// Update the force layout
			simulation.force("collision").strength(.45)

			// if (filters.timeFilter[0].getFullYear() != x.domain()[0].getFullYear() || filters.timeFilter[1].getFullYear() != x.domain()[1].getFullYear()) {
			//
			// }

		}

		// Set x and y of subNodes
		// data.nodes.forEach(d => {
		// 	d.x = (d.x&&!isTimeFiltered) ? d.x : x(d.year);
		// 	d.y = d.y ? d.y : y(d.category);
		//
		// 	if(d.fx&&isTimeFiltered) {
		// 		d.fx = null
		// 	}
		//
		// })

    node = node.data(nodes, d => { return d.id })
    node.exit().remove();
    node = node.enter().append('circle')
      .attr('class', d => `node`)
			.classed('sub-node', d => d.part_of !== '' )
      .on('click', function(d){

				resetByClick = d;

				highlightNodes([d], 'do reset opacity');

  			// get the double tap
  			if ((d3.event.timeStamp - last) < 500) {
					console.log('toggle subnodes of', d)
          toggleSubnodes(d);
					return;
        }
				last = d3.event.timeStamp;
  		})
			.on('mouseenter', d=>{
				if (!resetByClick || d.source === resetByClick.source) {
					highlightNodes([d], 'do reset opacity');
				}
			})
			.on('mouseleave', d=>{
				if (!resetByClick || d.source === resetByClick.source) {
					reset();
				}
				label.filter( e=>e.id===d.id).classed('selected', false).style('display','none');
			})
      .attr('key', d=> d.id)
      .merge(node)
      .style('cursor', function(d){ return d.subNodes && d.subNodes.length ? 'pointer' : 'auto'; })
  		.attr("fill", function(d) {
				const theCategory = d.originalCategory || d.category
				return d.opened===true ? 'white' : color(theCategory);
			})
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
  		.merge(hull);

    simulation.nodes(nodes);
		if (simulation.force("link")) {
			simulation.force("link").links(links);
		}
  	simulation.alpha(1).restart();
  }

	V.filter(filters);

}

V.filter = filters => {
	if (filters) {
		// store filters
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

		let surviveFilters = []

		let pubTypes = filters.selectedPublications;
		surviveFilters[0] = nodes.filter( d=>{
			let check = pubTypes.map(e => d.publicationType.indexOf(e) > -1 )
			return check.indexOf(true) > -1;
		}).map(d=>d.id);

		let pubThemes = filters.selectedThemes;
		surviveFilters[1] = nodes.filter( d=>{
			let check = pubThemes.map(e => d.themes.indexOf(e) > -1 )
			return check.indexOf(true) > -1;
		}).map(d=>d.id);

		if (filters.search.length) {
			surviveFilters[2] = filters.search;

			let parents2open=[];
			filters.search.forEach(s=>{
				search4Parent(s);
			});
			function search4Parent(nodeId){
				const thisNode = theOriginalData.filter(od=>od.id===nodeId)[0];
				if (thisNode.part_of !== "") {
					parents2open.push(thisNode.part_of);
					search4Parent(thisNode.part_of);
				}
			}
			// I technically should open interesting parents, but it is kind of ahard.
			// Provisionally solve the issue by highliting parents
			surviveFilters[2] = _.union(surviveFilters[2], parents2open)

		}

		// console.log('surviveFilters', surviveFilters)
		let mergeSurvived = [];
		surviveFilters.forEach((d,i) => {
			if (i===0) {
				mergeSurvived = d;
			} else {
				if (surviveFilters[i].length) {
					mergeSurvived = _.intersection(mergeSurvived, surviveFilters[i]);
				}
			}
		})
		// console.log("survived", mergeSurvived.length)
		node.classed('faded', d=>mergeSurvived.indexOf(d.id) < 0);
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