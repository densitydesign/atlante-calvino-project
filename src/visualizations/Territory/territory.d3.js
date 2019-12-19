
import * as d3 from 'd3';

let data = {
	allowedCollections: "all", // all : all collections; undefined for texts with undefined collection; V002,V014 (no spaces) for setting some collection ids for filtering (you can also put undefined in this list)
	timeline_x: 0,
	timeline_y: 0,
	timeline_dot: null,
	keyboardCommandsOn: true,
	metaballWantedCoves: true,
	mode: 'default'
}

let margin = { top : 0, right : 50, bottom : 30, left : 50 }, width, height;

let svg;

const V = {};

export default V;

V.initialize = (el, json_nodes) => {
  if(!json_nodes || json_nodes === "data still not loaded") return;

  svg = d3.select(el).style("touch-action", "manipulation");
console.log("json_nodes : ", json_nodes);

  json_nodes.forEach(create_item_steps);

  const svg_main_group = svg.append("g");

  const g = svg_main_group.append("g").attr("class", "nodes");

  const boundaries = {
    top    : d3.min(json_nodes, d => d.y),
    right  : d3.max(json_nodes, d => d.x),
    bottom : d3.max(json_nodes, d => d.y),
    left   : d3.min(json_nodes, d => d.x)
  };

  const center = {
    x : (boundaries.left + boundaries.right) / 2,
    y : (boundaries.bottom + boundaries.top) / 2
  };

  const text_nodes = g
    .selectAll(".node")
    .data(json_nodes)
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
      return "scale(1, 0.5773) translate(" + (d.x - center.x) + "," + (d.y - center.y) + ")"
    });

  const steps = text_nodes
    .selectAll("circle")
    .data(d => d.steps)
    .enter();

  const step_increment = -23;

  steps
    .append("circle")
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)
    .attr("fill", "tomato")
    .attr("r", d => d.r)   
    .attr("transform", function(d, i) {
      i = i * step_increment;
      return "translate(0," + i + ")";
    })
    .style("fill-opacity", 1)
    .style("stroke-opacity", .5);
    
/*  
  width = svg.node().getBoundingClientRect().width - margin.left - margin.right;
  height = svg.node().getBoundingClientRect().height - margin.top - margin.bottom;

  let p1 = { x: 100, y: 100 };
  let r1 = 50;
  let c1 = "green";

  let p2 = { x: 100, y: 230 };
  let r2 = 40;
  let c2 = "purple";

  let p3 = { x : 100, y : 360 };
  let r3 = 20;
  let c3 = "red";

  let jsonCircles = [
      { x_axis: p1.x, y_axis: p1.y, radius: r1, color: c1 }, 
  ];

  if(json_nodes.length > 10) jsonCircles.push({ x_axis: p2.x, y_axis: p2.y, radius: r2, color: c2 });

  if(json_nodes.length > 10) jsonCircles.push({ x_axis: p3.x, y_axis: p3.y, radius: r3, color: c3 });

  let circles = svg
      .selectAll("circle")
      .data(jsonCircles)
      .enter()
      .append("circle");

  let circleAttributes = circles
      .attr("cx", function(d) { return d.x_axis; })
      .attr("cy", function(d) { return d.y_axis; })
      .attr("r", function(d) { return d.radius; })
      .style("fill", function(d) { return d.color; });  
*/
};

V.destroy = () => {};

function interpolateSpline(x) {
	let y;

	// The cubic spline interpolation has been calculated "heuristically" by using this service:
	// https://tools.timodenk.com/cubic-spline-interpolation

	// Inserted values are:
	// x, y
	// 0, 0
	// 0.1, 0.2
	// 0.55, 0.65
	// 0.8, 0.8
	// 1, 1

	if(x >= 0 && x <= 0.1) {
		y = (-8.7269 * Math.pow(x, 3)) + (1.1764 * Math.pow(10, -60) * Math.pow(x, 2)) + (2.0873 * x) + (0);
	} else if(x > 0.1 && x <= 0.55) {
		y = (1.7416 * Math.pow(x, 3)) + (-3.1405 * Math.pow(x, 2)) + (2.4013 * x) + (-1.0468 * Math.pow(10, -2))
	} else if(x > 0.55 && x <= 0.8) {
		y = (2.2326 * Math.pow(x, 3)) + (-3.9507 * Math.pow(x, 2)) + (2.8469 * x) + (-9.2166 * Math.pow(10, -2))
	} else if(x > 0.8 && x <= 1) {
		y = (-2.3458 * Math.pow(x, 3)) + (7.0374 * Math.pow(x, 2)) + (-5.9436 * x) + (2.2520)
	} else {
		y = x
	}

	return y
}

function create_item_steps(d) {
	// reverse the order of collections, so to have the older ones at the bottom of the hills
	d.attributes.collections = d.attributes.collections.reverse()

	d.steps = [];
	// get different radii
	for(var jj = (data.min_size); jj <= d.size; jj += data.min_size) {
		let new_step_size = jj;
		let ratio = new_step_size / d.size;
		new_step_size = d.size * interpolateSpline(ratio);
		d.steps.push(new_step_size);
	}

	// get colors
	d.steps = d.steps.map((s, i) => {

		// assign to each step a collection
		let pos_1 = i / d.steps.length;
		let pos_2 = pos_1 * d.attributes.collections.length;
		let collection_here = d.attributes.collections[Math.floor(pos_2)];
		let first_elem = (i == (d.steps.length - 1));
		let last_elem = (i == 0);
		let n_steps = d.steps.length;

		let csv_item = data.x_csv2[d.id];

		return {
			'r': s,
			'collection': collection_here,
			'first_publication': d.attributes.first_publication,
			'id': d.id,
			'first_elem': first_elem,
			'last_elem': last_elem,
			'n_steps': n_steps,

			'generico_non_terrestre': csv_item == undefined ? 0 : csv_item.generico_non_terrestre,
			'generico_non_terrestre_abs': csv_item == undefined ? 0 : csv_item.generico_non_terrestre_abs,
      'n_generico_non_terrestre': csv_item == undefined ? 0 : csv_item.n_generico_non_terrestre,

			'generico_terrestre': csv_item == undefined ? 0 : csv_item.generico_terrestre,
			'generico_terrestre_abs': csv_item == undefined ? 0 : csv_item.generico_terrestre_abs,
      'n_generico_terrestre': csv_item == undefined ? 0 : csv_item.n_generico_terrestre,

			'inventato': csv_item == undefined ? 0 : csv_item.inventato,
			'inventato_abs': csv_item == undefined ? 0 : csv_item.inventato_abs,
      'n_inventato': csv_item == undefined ? 0 : csv_item.n_inventato,

			'no_ambientazione': csv_item == undefined ? 0 : csv_item.no_ambientazione,
			'no_ambientazione_abs': csv_item == undefined ? 0 : csv_item.no_ambientazione_abs,
      'n_no_ambientazione': csv_item == undefined ? 0 : csv_item.n_no_ambientazione,

			'nominato_non_terrestre': csv_item == undefined ? 0 : csv_item.nominato_non_terrestre,
			'nominato_non_terrestre_abs': csv_item == undefined ? 0 : csv_item.nominato_non_terrestre_abs,
      'n_nominato_non_terrestre': csv_item == undefined ? 0 : csv_item.n_nominato_non_terrestre,

			'nominato_terrestre': csv_item == undefined ? 0 : csv_item.nominato_terrestre,
			'nominato_terrestre_abs': csv_item == undefined ? 0 : csv_item.nominato_terrestre_abs,
      'n_nominato_terrestre': csv_item == undefined ? 0 : csv_item.n_nominato_terrestre,

			'nebbia_normalizzata': csv_item == undefined ? 0 : csv_item.nebbia_normalizzata,
			'cancellazione_normalizzata': csv_item == undefined ? 0 : csv_item.cancellazione_normalizzata,
			'nebbia': csv_item == undefined ? 0 : csv_item.nebbia,
			'cancellazione': csv_item == undefined ? 0 : csv_item.cancellazione,
			'norma_pct_caratteri_nebbia_cancellazione': csv_item == undefined ? 0 : csv_item.norma_pct_caratteri_nebbia_cancellazione,

			'nebbia_words_ratio': csv_item == undefined ? 0 : csv_item.nebbia_words_ratio,
			'cancellazione_words_ratio': csv_item == undefined ? 0 : csv_item.cancellazione_words_ratio,
			'dubitative_ratio': csv_item == undefined ? 0 : csv_item.dubitative_ratio,

			'lists_f_ratio': csv_item == undefined ? 0 : csv_item.lists_f_ratio,
			'lists_m_ratio': csv_item == undefined ? 0 : csv_item.lists_m_ratio,
			'lists_p_ratio': csv_item == undefined ? 0 : csv_item.lists_p_ratio,
			'lists_s_ratio': csv_item == undefined ? 0 : csv_item.lists_s_ratio,

			'lists_are_present': csv_item == undefined ? 0 : csv_item.lists_are_present,
			'lists_ratio_with_threshold': csv_item == undefined ? 0 : csv_item.lists_ratio_with_threshold,
			'lists_ratio_is_below_threshold': csv_item == undefined ? false : csv_item.lists_ratio_is_below_threshold
		};
	});

	// sort array so to have little circles on top, big at bottom
	d.steps = d.steps.reverse();

	return d.steps;
}