
import * as d3 from 'd3';
import { checkMapAndInsert, CollectionMapNames, prepareMetaballData } from './metaballs';

import { draw_jellyfish, prepare_jellyfish_data_2, visit } from './jellyfish';

import GlobalData from '../../utilities/GlobalData';


let data = {
//	allowedCollections: "all", // all : all collections; undefined for texts with undefined collection; V002,V014 (no spaces) for setting some collection ids for filtering (you can also put undefined in this list)
	timeline_x: 0,
	timeline_y: 0,
	timeline_dot: null,
	keyboardCommandsOn: true,
	metaballWantedCoves: true,
	mode: 'default'
};

//let margin = { top : 0, right : 50, bottom : 30, left : 50 }, width, height;

let svg;
let center;
let tilt;
let scale;
let d3_event_transform_k;
let label_x_scale_factor;
let label_y_scale_factor_tilt;
let label_y_scale_factor_no_tilt;
let currentAnalysisMode;
let colors;

//const PI = Math.PI;
const _2PI = Math.PI * 2;
//const arcMin = 75; // inner radius of the first arc
//const drawMode = 1; // 1 : hills; 2 : hills with halo; 3 : places; 4 : dubitative phenomena;
const with_tilt_factor = 0.5773;
const without_tilt_factor = 1;
const step_increment = -23;
const one_rem = Number.parseInt(d3.select('html').style('font-size'));
const half_rem = one_rem / 2;
let one_rem_times_scale;

const showHillModes = {
  all : "all",
  base : "base",
  nothing : "nothing",
};

const customElementsClasses = {
  places : "places",
  dubitativePhenomena_level_2 : "dubitativePhenomena_level_2",
  lists_level_3 : "lists_level_3",
  lists_level_2 : "lists_level_2",
  place_hierarchy_2 : "place_hierarchy_2"
};

const analysisModeGroups = {
  none : 2,
  hills : 3,
  flat : 5,
  drawing : 7  
};

const analysisModeChangeTypes = {
  change_none_to_hills      : getAnalysisModeChangeType(analysisModeGroups.none,    analysisModeGroups.hills),
  change_none_to_flat       : getAnalysisModeChangeType(analysisModeGroups.none,    analysisModeGroups.flat),
  change_none_to_drawing    : getAnalysisModeChangeType(analysisModeGroups.none,    analysisModeGroups.drawing),
  change_hills_to_flat      : getAnalysisModeChangeType(analysisModeGroups.hills,   analysisModeGroups.flat),
  change_flat_to_hills      : getAnalysisModeChangeType(analysisModeGroups.flat,    analysisModeGroups.hills),  
  change_hills_to_drawing   : getAnalysisModeChangeType(analysisModeGroups.hills,   analysisModeGroups.drawing),
  change_drawing_to_hills   : getAnalysisModeChangeType(analysisModeGroups.drawing, analysisModeGroups.hills),
  change_flat_to_drawing    : getAnalysisModeChangeType(analysisModeGroups.flat,    analysisModeGroups.drawing),
  change_drawing_to_flat    : getAnalysisModeChangeType(analysisModeGroups.drawing, analysisModeGroups.flat),
  change_hills_to_hills     : getAnalysisModeChangeType(analysisModeGroups.hills,   analysisModeGroups.hills),
  change_flat_to_flat       : getAnalysisModeChangeType(analysisModeGroups.flat,    analysisModeGroups.flat),
  change_drawing_to_drawing : getAnalysisModeChangeType(analysisModeGroups.drawing, analysisModeGroups.drawing)
};

Object.keys(customElementsClasses).forEach(key => 
  customElementsClasses[key + "_full"] = ["customElements", customElementsClasses[key]].join(" "));

customElementsClasses["customElements"] = "customElements";

class VClass
{
  initialize = (
    el, 
    input_data, 
    input_colors, 
    analysisMode, 
    containerOnSvgClicked,
    containerSetAllowDropMenus) => 
  {
    if(!input_data.json_nodes || input_data.json_nodes === "data still not loaded") return;

    this.containerOnSvgClicked = containerOnSvgClicked;

    const json_nodes = input_data.json_nodes;
    data.x_csv2 = input_data.x_csv2;

    colors = input_colors;

    const w = window.innerWidth;
    const half_w = w / 2;
    const h = window.innerHeight - 6;
    const half_h = h / 2;
    svg = d3.select(el).style("touch-action", "manipulation");

    svg.on("click", this.onSvgClicked);

    const collections = GlobalData.collections;

    const boundaries = {
      top    : d3.min(json_nodes, d => d.y),
      right  : d3.max(json_nodes, d => d.x),
      bottom : d3.max(json_nodes, d => d.y),
      left   : d3.min(json_nodes, d => d.x)
    };

    center = {
      x : (boundaries.left + boundaries.right) / 2,
      y : (boundaries.bottom + boundaries.top) / 2
    };    

    json_nodes.forEach(node =>
      node.steps.forEach(step =>
        collections.forEach(coll => 
          checkMapAndInsert(step, CollectionMapNames.metaballCorner, coll.id, false))));

    collections
      .filter(coll => (GlobalData.allowedCollections === "all" && coll.has_metaball) || GlobalData.allowedCollectionsSplit.includes(coll.id))
      .forEach(coll => prepareMetaballData(json_nodes, coll, data.metaballWantedCoves));

    const svg_main_group = svg.append("g");

    const metaball_group = svg_main_group.append("g").attr("class", "metaball_nodes");

    const metaball_nodes = metaball_group
      .selectAll(".metaball_node")
      .data(json_nodes)
      .enter()
      .append("g")
      .attr("class", "metaball_node")
      .attr("transform", function(d) {
        return "scale(1, " + with_tilt_factor + ") translate(" + (d.x - center.x) + "," + (d.y - center.y) + ")";
      });

    const metaballs = metaball_nodes
      .selectAll(".metaball")
      .data(d => d.steps)
      .enter();

    collections.forEach(coll =>
      metaballs
        .filter(d => d[CollectionMapNames.metaballCorner].get(coll.id))
        .append("svg:path")
        .attr("class", d => "metaball collection_" + coll.id)
        .attr("d", d => d[CollectionMapNames.lobe].get(coll.id))
        .attr("fill", "none")
        .attr("stroke", d => d[CollectionMapNames.lobeColor].get(coll.id))
        .attr("stroke-opacity", 0)
        .attr("stroke-width", 7)
        .attr('transform', d => {
          const delta_x = -(+d.x);
          const delta_y = -(+d.y);
          return 'translate(' + delta_x + ', ' + delta_y + ')'
        }));

    const g = svg_main_group.append("g").attr("class", "nodes");

    this.colour = d3
      .scaleLinear()
      .domain(d3.extent(json_nodes, function(d) { return d.attributes.first_publication; }))
      .range(["#00c19c", "#5151fc"]);

    const circled_numbers = d3
      .scaleOrdinal()
      .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
      .range(['➊', '➋', '➌', '➍', '➎', '➏', '➐', '➑', '➒', '➓']);

    
    const arcWidth = 38;
    const arcPad = 1; // padding between arcs

    const i_range = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const minus_i_plus_1_times_arcWidth_plus_arcPad = i_range.map(i => -(i+1) * arcWidth + arcPad);

    const minus_i_times_arcWidth = i_range.map(i => -i * arcWidth);

    const metaballsVisible = new Map();

    collections
      .filter(coll => coll.has_metaball)
      .forEach(coll => metaballsVisible.set(coll.id, 1));
    
    metaballs
      .selectAll(".metaball")
      .transition()
      .duration(450)
      .style("stroke-opacity", function(d) { return metaballsVisible.get(d.collection) ? 1 : 0; });

    this.nebbia_color_scale = d3
      .scaleLinear()
      .domain(d3.extent(Object.values(data.x_csv2), d => d.nebbia_words_ratio))
      .range([colors.nebbia_dim, colors.nebbia_bright]);
  
    this.cancellazione_color_scale = d3
      .scaleLinear()
      .domain(d3.extent(Object.values(data.x_csv2), d => d.nebbia_words_ratio))
      .range([colors.cancellazione_dim, colors.cancellazione_bright]);

    this.dubitative_color_scale = d3
      .scaleLinear()
      .domain(d3.extent(Object.values(data.x_csv2), d => d.dubitative_ratio))
      .range([colors.allDubitative_dim, colors.allDubitative_bright]);    

    this.generico_cosmico_color_scale = d3
      .scaleLinear()
      .domain(d3.extent(Object.values(data.x_csv2), d => d.n_generico_cosmico))
      .range([colors.generico_cosmico_dim, colors.generico_cosmico_bright]);
  
    this.generico_terrestre_color_scale = d3
      .scaleLinear()
      .domain(d3.extent(Object.values(data.x_csv2), d => d.n_generico_terrestre))
      .range([colors.generico_terrestre_dim, colors.generico_terrestre_bright]);
  
    this.inventato_color_scale = d3
      .scaleLinear()
      .domain(d3.extent(Object.values(data.x_csv2), d => d.n_inventato))
      .range([colors.inventato_dim, colors.inventato_bright]);
  
    this.no_ambientazione_color_scale = d3
      .scaleLinear()
      .domain(d3.extent(Object.values(data.x_csv2), d => d.n_no_ambientazione))
      .range([colors.no_ambientazione_dim, colors.no_ambientazione_bright]);
  
    this.nominato_cosmico_color_scale = d3
      .scaleLinear()
      .domain(d3.extent(Object.values(data.x_csv2), d => d.n_nominato_cosmico))
      .range([colors.nominato_cosmico_dim, colors.nominato_cosmico_bright]);
  
    this.nominato_terrestre_color_scale = d3
      .scaleLinear()
      .domain(d3.extent(Object.values(data.x_csv2), d => d.n_nominato_terrestre))
      .range([colors.nominato_terrestre_dim, colors.nominato_terrestre_bright]);
  
    this.placeHierarchies_color_scale = d3
      .scaleLinear()
      .domain(d3.extent(Object.values(data.x_csv2), d => d.n_generico_terrestre))
      .range([colors.placeHierarchies_color_scale_start, colors.placeHierarchies_color_scale_end])
      .unknown(colors.placeHierarchies_unknown);

    this.analysisModeMap = new Map([
      [ undefined,                                            { analysisModeGroup : analysisModeGroups.none } ],
      [ GlobalData.analysisModes.noAnalysis.chronology,       { analysisModeGroup : analysisModeGroups.hills,   customElementsClasses : null,                                    dataMember : 'first_publication',         showHillMode : showHillModes.all,     colorScale : this.colour,                             tilt_factor : with_tilt_factor,    show_metaballs : true } ],
      [ GlobalData.analysisModes.noAnalysis.volumes,          { analysisModeGroup : analysisModeGroups.hills,   customElementsClasses : null,                                    dataMember : 'collection',                showHillMode : showHillModes.all,     colorScale : GlobalData.col_collections,              tilt_factor : with_tilt_factor,    show_metaballs : true } ],
      [ GlobalData.analysisModes.doubt.fog,                   { analysisModeGroup : analysisModeGroups.flat,    customElementsClasses : null,                                    dataMember : 'nebbia_words_ratio',        showHillMode : showHillModes.base,    colorScale : this.nebbia_color_scale,                 tilt_factor : without_tilt_factor, show_metaballs : true } ],
      [ GlobalData.analysisModes.doubt.cancellation,          { analysisModeGroup : analysisModeGroups.flat,    customElementsClasses : null,                                    dataMember : 'cancellazione_words_ratio', showHillMode : showHillModes.base,    colorScale : this.cancellazione_color_scale,          tilt_factor : without_tilt_factor, show_metaballs : true } ],
      [ GlobalData.analysisModes.doubt.all,                   { analysisModeGroup : analysisModeGroups.flat,    customElementsClasses : null,                                    dataMember : 'dubitative_ratio',          showHillMode : showHillModes.base,    colorScale : this.dubitative_color_scale,             tilt_factor : without_tilt_factor, show_metaballs : true } ],
      [ GlobalData.analysisModes.doubt.percentage,            { analysisModeGroup : analysisModeGroups.drawing, customElementsClasses : customElementsClasses.dubitativePhenomena_level_2,                                 showHillMode : showHillModes.nothing,                                                       tilt_factor : without_tilt_factor, show_metaballs : true } ],
      [ GlobalData.analysisModes.shape.proportion,            { analysisModeGroup : analysisModeGroups.drawing, customElementsClasses : customElementsClasses.lists_level_2,                                               showHillMode : showHillModes.nothing,                                                       tilt_factor : without_tilt_factor, show_metaballs : true } ],
      [ GlobalData.analysisModes.shape.types,                 { analysisModeGroup : analysisModeGroups.drawing, customElementsClasses : customElementsClasses.lists_level_3,                                               showHillMode : showHillModes.base,                                                          tilt_factor : without_tilt_factor, show_metaballs : true } ],
      [ GlobalData.analysisModes.space.genericCosmic,         { analysisModeGroup : analysisModeGroups.flat,    customElementsClasses : null,                                    dataMember : 'n_generico_cosmico',        showHillMode : showHillModes.base,    colorScale : this.generico_cosmico_color_scale,       tilt_factor : without_tilt_factor, show_metaballs : true } ],
      [ GlobalData.analysisModes.space.namedCosmic,           { analysisModeGroup : analysisModeGroups.flat,    customElementsClasses : null,                                    dataMember : 'n_nominato_cosmico',        showHillMode : showHillModes.base,    colorScale : this.nominato_cosmico_color_scale,       tilt_factor : without_tilt_factor, show_metaballs : true } ],
      [ GlobalData.analysisModes.space.genericTerrestrial,    { analysisModeGroup : analysisModeGroups.flat,    customElementsClasses : null,                                    dataMember : 'n_generico_terrestre',      showHillMode : showHillModes.base,    colorScale : this.generico_terrestre_color_scale,     tilt_factor : without_tilt_factor, show_metaballs : true } ],
      [ GlobalData.analysisModes.space.namedTerrestrial,      { analysisModeGroup : analysisModeGroups.flat,    customElementsClasses : null,                                    dataMember : 'n_nominato_terrestre',      showHillMode : showHillModes.base,    colorScale : this.nominato_terrestre_color_scale,     tilt_factor : without_tilt_factor, show_metaballs : true } ],
      [ GlobalData.analysisModes.space.invented,              { analysisModeGroup : analysisModeGroups.flat,    customElementsClasses : null,                                    dataMember : 'n_inventato',               showHillMode : showHillModes.base,    colorScale : this.inventato_color_scale,              tilt_factor : without_tilt_factor, show_metaballs : true } ],
      [ GlobalData.analysisModes.space.noSetting,             { analysisModeGroup : analysisModeGroups.flat,    customElementsClasses : null,                                    dataMember : 'n_no_ambientazione',        showHillMode : showHillModes.base,    colorScale : this.no_ambientazione_color_scale,       tilt_factor : without_tilt_factor, show_metaballs : true } ],
      [ GlobalData.analysisModes.space.proportion,            { analysisModeGroup : analysisModeGroups.drawing, customElementsClasses : customElementsClasses.places,                                                      showHillMode : showHillModes.nothing, colorScale : this.no_ambientazione_color_scale,       tilt_factor : without_tilt_factor, show_metaballs : true } ],
      [ GlobalData.analysisModes.space.placeHierarchies,      { analysisModeGroup : analysisModeGroups.drawing, customElementsClasses : customElementsClasses.place_hierarchy_2, dataMember : 'n_generico_cosmico',        showHillMode : showHillModes.base,    colorScale : this.placeHierarchies_color_scale,       tilt_factor : without_tilt_factor, show_metaballs : false } ]
    ]);

    this.text_nodes = g
      .selectAll(".node")
      .data(json_nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", function(d) {
        return "scale(1, " + with_tilt_factor + ") translate(" + (d.x - center.x) + "," + (d.y - center.y) + ")";
      });

    const steps = this.text_nodes
      .selectAll("circle")
      .data(d => d.steps)
      .enter();

//    this.step_increment = -23;

    const circles = steps
      .append("circle")
      .attr("class", "circle_node hill")
      .attr("stroke", "black")
      .attr("stroke-width", 1.5)
      .attr("first_elem", d => d.first_elem)
      .attr("r", d => {
//console.log("d", d);
        return d.r;
      })
	  	.style('fill-opacity', 1e-16)
  		.style('stroke-opacity', 1e-16)
//		.transition()
//		.duration(1000)
//		.delay(function(d) { return (d.first_publication - 1940) * 100 })
//      .attr("transform", this.calculateHillStepTranslation)
//      .style("fill-opacity", 1)
//      .style("stroke-opacity", .5);

    circles
      .filter(d => d.first_elem)
      .on("click", this.onFirstElementClicked);

		const place_hierarchies_group = svg_main_group
			.append("g")
			.attr("class", "place_hierarchies_nodes");  

		const place_hierarchies_nodes = place_hierarchies_group
			.selectAll(".place_hierarchy_node")
			.data(input_data.place_hierarchies_info.place_hierarchies_graphics_items)
			.enter()
			.append("g")
			.attr("class", "place_hierarchy_node")
			.attr("transform", function(d) {
				if(!d.x || !d.y) return "";
				return "scale(1, " + with_tilt_factor + ") translate(" + (d.x - center.x) + "," + (d.y - center.y) + ")";
			});

		let graphical_ops = [];

		const place_hierarchies = place_hierarchies_nodes
			.selectAll(".place_hierarchy")
			.data(d => {
				graphical_ops = graphical_ops.concat(d.graphical_ops);
				return d.graphical_ops;
			})
			.enter();

		const drawplace_hierarchyArc = d3
			.arc()
			.innerRadius(d => d.innerRadius)
			.outerRadius(d => d.outerRadius)
			.startAngle(d => d.startAngle)
			.endAngle(d => d.endAngle);

		const fontSizeScale = d3
			.scaleLinear()
//			.domain(d3.extent(Object.values(place_hierarchies), d => d.hill_size))
			.domain(d3.extent(graphical_ops, d => d.hill_size))
			.range([15, 30]);

		const label_classes = [];
		const label_ids = [];

		const text_ph_labels = place_hierarchies
 			.filter(d => d.type === "text")
			.append("text")
	    .style("fill", d => d.fill)
	    .style("font-size", d => fontSizeScale(d.hill_size))
			.attr("id", d => {
				label_ids.push(d.node_id);
				return d.node_id;
			})
	    .attr("dy", d => d.dy)
	    .attr("dx", d => d.dx)
			.style("opacity", 1)
	    .style("text-anchor", d => d.text_anchor)
	    .attr("transform", d => d.transform)
			.attr("class", d => {
				const label_class = "place_hierarchy_" + d.text_id;
				label_classes.push(label_class);
				return "customElements place_hierarchy place_hierarchy_text " + label_class;
			});    

		text_ph_labels
			.selectAll(".caption_segment")
			.data(d => d.caption_segments)
			.enter()
			.append("tspan")
			.attr("x", "0")
			.attr("dx", "1em")
			.attr("dy", (d, i) => (i > 0) ? "1.35em" : "0")
			.style("font-size", d => fontSizeScale(d.hill_size))
			.classed("caption_segment", true)
			.text(d => d ? d.text : "");      

		label_ids.forEach(
			d => {
				let bbox = document.getElementById(d).getBBox();
				let jellyfish_node_info = input_data.place_hierarchies_info.place_hierarchy_node_info_map.get(d);
				jellyfish_node_info.bbox = bbox;
			});

		for(let [, jellyfish] of input_data.place_hierarchies_info.place_hierarchies)
		{
			visit(
				jellyfish,
				{},
				jn => jn.bbox = input_data.place_hierarchies_info.place_hierarchy_node_info_map.get(jn.node_id).bbox);

			let j = input_data.json_node_map.get(jellyfish.caption);
			let radiusScaleFactor = j.steps[0].r / 30;

			prepare_jellyfish_data_2(jellyfish, { x:0, y:0 }, radiusScaleFactor);
		}

    place_hierarchies
      .selectAll(".place_hierarchy")
      .remove();

    const place_hierarchies_info_2 = prepare_place_hierarchies_2(
      input_data.place_hierarchies_info.place_hierarchies, 
      input_data.json_node_map, 
      colors);

		json_nodes.forEach(d => {
			let item = place_hierarchies_info_2.place_hierarchies_graphics_item_map_2.get(d.id);
			if(item)
			{
				item.x = d.x;
				item.y = d.y;
			}
		});

    place_hierarchies_group.remove();

    const place_hierarchies_group_2 = svg_main_group
      .append("g")
      .attr("class", "place_hierarchies_nodes_2");

    const place_hierarchies_nodes_2 = place_hierarchies_group_2
      .selectAll(".place_hierarchy_node_2")
      .data(place_hierarchies_info_2.place_hierarchies_graphics_items_2)
      .enter()
      .append("g")
      .attr("class", "place_hierarchy_node_2")
      .attr("transform", function(d) {

        if(!d.x || !d.y) return "";

        return "scale(1, " + without_tilt_factor + ") translate(" + (d.x - center.x) + "," + (d.y - center.y) + ")";
      });

    let graphical_ops_2 = [];

    const place_hierarchies_2 = place_hierarchies_nodes_2
      .selectAll(".place_hierarchy_2")
      .data(d => {
        graphical_ops_2 = graphical_ops_2.concat(d.graphical_ops);
        return d.graphical_ops;
      })
      .enter();

    place_hierarchies_2
      .filter(d => d.type === "arc")
      .append("svg:path")
      .attr("fill", d => d.fill)
      .attr("class", d => "customElements place_hierarchy_2 place_hierarchy_2_" + d.text_id)
      .attr("d", drawplace_hierarchyArc)
      .style("display", "none")
      .attr("transform", d => "translate(" + d.center.x + ", " + d.center.y + ")");

    place_hierarchies_2
      .filter(d => d.type === "line")
      .append("line")
      .attr("x1", d => d.x1)
      .attr("y1", d => d.y1)
      .attr("x2", d => d.x2)
      .attr("y2", d => d.y2)
      .attr("stroke", d => d.stroke)
      .attr("stroke-width", d => d.stroke_width)
      .style("display", "none")
      .attr("class", d => "customElements place_hierarchy_2 place_hierarchy_2_" + d.text_id);

    place_hierarchies_2
      .filter(d => d.type === "circle")
      .append('circle')
      .attr('fill', d => d.fill)
      .attr('stroke', 'white')
      .attr('stroke-width', 2)
      .attr('r', d => d.r)
      .attr("class", "place_hierarchy_node_2")
      .style("display", "none")
      .attr("transform", d => "translate(" + d.cx + ", " + d.cy + ")")
      .attr("class", d => "customElements place_hierarchy_2 place_hierarchy_2_" + d.text_id);

    const label_classes_2 = [];
    const label_ids_2 = [];

    const text_ph_labels_2 = place_hierarchies_2
      .filter(d => d.type === "text")
      .append("text")
      .style("fill", d => d.fill)
      .style("font-size", d => fontSizeScale(d.hill_size))
      .attr("id", d => {
        label_ids_2.push(d.node_id);
        return d.node_id;
      })
      .attr("dy", d => d.dy)
      .attr("dx", d => d.dx)
      .style("display", "none")
      .style("text-anchor", d => d.text_anchor)
      .attr("transform", d => d.transform)
      .attr("class", d => {
        let label_class = "place_hierarchy_2_" + d.text_id;
        label_classes_2.push(label_class);
        return "customElements place_hierarchy_2 place_hierarchy_text_2 " + label_class;
      });

    text_ph_labels_2
      .selectAll(".caption_segment")
      .data(d => d.caption_segments)
      .enter()
      .append("tspan")
      .attr("x", "0")
      .attr("dx", "1em")
      .attr("dy", (d,i) => (i > 0) ? "1.35em" : "0")
      .style("font-size", d => fontSizeScale(d.hill_size))
      .classed("caption_segment", true)
      .text(d => d.text);

///////////////////////////////////////////

	let drawPlacesArc1 = d3
		.arc()
		.innerRadius(function(d, i) {
      return d.r + minus_i_plus_1_times_arcWidth_plus_arcPad[i];
		})
		.outerRadius(function(d, i) {
      return d.r + minus_i_times_arcWidth[i];
		})
		.startAngle(function(d, i) { 
      return 0 + placesArcFix(d);
    })
		.endAngle(function(d, i) {
			return d.generico_cosmico * _2PI + placesArcFix(d);
		});

	let drawPlacesArc2 = d3
		.arc()
		.innerRadius(function(d, i) {
      return d.r + minus_i_plus_1_times_arcWidth_plus_arcPad[i];
		})
		.outerRadius(function(d, i) {
      return d.r + minus_i_times_arcWidth[i];
		})
		.startAngle(function(d, i) {
			return d.generico_cosmico * _2PI + placesArcFix(d);
		})
		.endAngle(function(d, i) {
			return d.generico_terrestre * _2PI + placesArcFix(d);
		});

	let drawPlacesArc3 = d3
		.arc()
		.innerRadius(function(d, i) {
      return d.r + minus_i_plus_1_times_arcWidth_plus_arcPad[i];
		})
		.outerRadius(function(d, i) {
      return d.r + minus_i_times_arcWidth[i];
		})
		.startAngle(function(d, i) {
			return d.generico_terrestre * _2PI + placesArcFix(d);
		})
		.endAngle(function(d, i) {
			return d.inventato * _2PI + placesArcFix(d);
		});

	let drawPlacesArc4 = d3
		.arc()
		.innerRadius(function(d, i) {
      return d.r + minus_i_plus_1_times_arcWidth_plus_arcPad[i];      
		})
		.outerRadius(function(d, i) {
      return d.r + minus_i_times_arcWidth[i];
		})
		.startAngle(function(d, i) {
			return d.inventato * _2PI + placesArcFix(d);
		})
		.endAngle(function(d, i) {
			return d.no_ambientazione * _2PI + placesArcFix(d);
		});

	let drawPlacesArc5 = d3
		.arc()
		.innerRadius(function(d, i) {
      return d.r + minus_i_plus_1_times_arcWidth_plus_arcPad[i];
		})
		.outerRadius(function(d, i) {
      return d.r + minus_i_times_arcWidth[i];
		})
		.startAngle(function(d, i) {
			return d.no_ambientazione * _2PI + placesArcFix(d);
		})
		.endAngle(function(d, i) {
			return d.nominato_cosmico * _2PI + placesArcFix(d);
		});

	let drawPlacesArc6 = d3
		.arc()
		.innerRadius(function(d, i) {
      return d.r + minus_i_plus_1_times_arcWidth_plus_arcPad[i];
		})
		.outerRadius(function(d, i) {
      return d.r + minus_i_times_arcWidth[i];
		})
		.startAngle(function(d, i) {
			return d.nominato_cosmico * _2PI + placesArcFix(d);
		})
		.endAngle(function(d, i) {
			return d.nominato_terrestre * _2PI + placesArcFix(d);
		});

	let drawPlacesArc7 = d3
		.arc()
		.innerRadius(function(d, i) {
      return d.r + minus_i_plus_1_times_arcWidth_plus_arcPad[i];
		})
		.outerRadius(function(d, i) {
      return d.r + minus_i_times_arcWidth[i];
		})
		.startAngle(function(d, i) {
			return d.nominato_terrestre * _2PI + placesArcFix(d);
		})
		.endAngle(function(d, i) {
			return _2PI + placesArcFix(d);
		});

///////////////////////////////////////////

  const base_steps = steps.filter(d => d.first_elem);

	base_steps
		.append("svg:path")
		.attr("fill", colors.generico_cosmico_bright)
		.attr("class", customElementsClasses.places_full)
		.attr("d", drawPlacesArc1)
		.style('fill-opacity', 0);

  base_steps
		.append("svg:path")
		.attr("fill", colors.generico_terrestre_bright)
		.attr("class", customElementsClasses.places_full)
		.attr("d", drawPlacesArc2)
		.style('fill-opacity', 0);

  base_steps
		.append("svg:path")
		.attr("fill", colors.inventato_bright)
		.attr("class", customElementsClasses.places_full)
		.attr("d", drawPlacesArc3)
		.style('fill-opacity', 0);

  base_steps
		.append("svg:path")
		.attr("fill", colors.no_ambientazione_bright)
		.attr("class", customElementsClasses.places_full)
		.attr("d", drawPlacesArc4)
		.style('fill-opacity', 0);

	base_steps
		.append("svg:path")
		.attr("fill", colors.nominato_cosmico_bright)
		.attr("class", customElementsClasses.places_full)
		.attr("d", drawPlacesArc5)
		.style('fill-opacity', 0);

	base_steps
		.append("svg:path")
		.attr("fill", colors.nominato_terrestre_bright)
		.attr("class", customElementsClasses.places_full)
		.attr("d", drawPlacesArc6)
		.style('fill-opacity', 0);

	base_steps
		.append("svg:path")
		.attr("fill", "transparent")
		.attr("class", customElementsClasses.places_full)
		.attr("d", drawPlacesArc7)
		.style('fill-opacity', 0);
/*
	steps
		.selectAll(".places")
		.on("click", function(d) {
			if(data.mode == "spaceo-secondo-lvl")
			{
				togglePlaceHierarchy(d.id);
				data.mode = "spaceo-third-lvl";
			}
		});
*/

///////////////////////////////////////////

  let drawPlaceHierarchiesArc1 = d3
    .arc()
    .innerRadius(function(d, i) {
      return d.r + minus_i_plus_1_times_arcWidth_plus_arcPad[i];
    })
    .outerRadius(function(d, i) {
      return d.r + minus_i_times_arcWidth[i];
    })
    .startAngle(0)
    .endAngle(function(d, i) {
//					return d.generico_cosmico * 2 * PI;
      return _2PI;
    });

///////////////////////////////////////////

  base_steps
    .append("svg:path")
    .attr("fill", "purple")
    .attr("class", "place_hierarchies")
    .attr("d", drawPlaceHierarchiesArc1)
    .attr('transform', function(d, i) {
      return 'translate(0,' + (d.n_steps - i) * step_increment + ')'
    })
    .style('fill-opacity', 0);

///////////////////////////////////////////

    let drawDubitativePhenomenaArc1 = d3
      .arc()
      .innerRadius(function(d, i) {
        return d.r + minus_i_plus_1_times_arcWidth_plus_arcPad[i];
      })
      .outerRadius(function(d, i) {
        return d.r + minus_i_times_arcWidth[i];
      })
      .startAngle(0)
      .endAngle(function(d, i) {
        return d.nebbia * _2PI;
      });

    let drawDubitativePhenomenaArc2 = d3
      .arc()
      .innerRadius(function(d, i) {
        return d.r + minus_i_plus_1_times_arcWidth_plus_arcPad[i];
      })
      .outerRadius(function(d, i) {
        return d.r + minus_i_times_arcWidth[i];
      })
      .startAngle(function(d, i) {
        return d.nebbia * _2PI;
      })
      .endAngle(function(d, i) {
        return d.cancellazione * _2PI;
      });

    let drawDubitativePhenomenaArc3 = d3
      .arc()
      .innerRadius(function(d, i) {
        return d.r + minus_i_plus_1_times_arcWidth_plus_arcPad[i];
      })
      .outerRadius(function(d, i) {
        return d.r + minus_i_times_arcWidth[i];
      })
      .startAngle(function(d, i) {
        return d.cancellazione * _2PI;
      })
      .endAngle(function(d, i) {
        return _2PI;
      });

///////////////////////////////////////////

    base_steps
      .append("svg:path")
      .attr("fill", colors.nebbia_bright)
      .attr("class", customElementsClasses.dubitativePhenomena_level_2_full)
      .attr("d", drawDubitativePhenomenaArc1)
      .style('fill-opacity', 0);

    base_steps
      .append("svg:path")
      .attr("fill", colors.cancellazione_bright)
      .attr("class", customElementsClasses.dubitativePhenomena_level_2_full)
      .attr("d", drawDubitativePhenomenaArc2)
      .style('fill-opacity', 0);

    base_steps
      .append("svg:path")
      .attr("fill", "transparent")
      .attr("class", customElementsClasses.dubitativePhenomena_level_2_full)
      .attr("d", drawDubitativePhenomenaArc3)
      .style('fill-opacity', 0);

///////////////////////////////////////////

    let drawListsArc1 = d3
      .arc()
      .innerRadius(function(d, i) {
        return d.r + minus_i_plus_1_times_arcWidth_plus_arcPad[i];
      })
      .outerRadius(function(d, i) {
        return d.r + minus_i_times_arcWidth[i];
      })
      .startAngle(0)
      .endAngle(function(d, i) {
        return d.lists_f_ratio * _2PI;
      });

    let drawListsArc2 = d3
      .arc()
      .innerRadius(function(d, i) {
        return d.r + minus_i_plus_1_times_arcWidth_plus_arcPad[i];
      })
      .outerRadius(function(d, i) {
        return d.r + minus_i_times_arcWidth[i];
      })
      .startAngle(function(d, i) {
        return d.lists_f_ratio * _2PI;
      })
      .endAngle(function(d, i) {
        return d.lists_m_ratio * _2PI;
      });

    let drawListsArc3 = d3
      .arc()
      .innerRadius(function(d, i) {
        return d.r + minus_i_plus_1_times_arcWidth_plus_arcPad[i];
      })
      .outerRadius(function(d, i) {
        return d.r + minus_i_times_arcWidth[i];
      })
      .startAngle(function(d, i) {
        return d.lists_m_ratio * _2PI;
      })
      .endAngle(function(d, i) {
        return d.lists_p_ratio * _2PI;
      });

    let drawListsArc4 = d3
      .arc()
      .innerRadius(function(d, i) {
        return d.r + minus_i_plus_1_times_arcWidth_plus_arcPad[i];
      })
      .outerRadius(function(d, i) {
        return d.r + minus_i_times_arcWidth[i];
      })
      .startAngle(function(d, i) {
        return d.lists_p_ratio * _2PI;
      })
      .endAngle(function(d, i) {
        return d.lists_s_ratio * _2PI;
      });

    let drawListsArc5 = d3
      .arc()
      .innerRadius(function(d, i) {
        return d.r + minus_i_plus_1_times_arcWidth_plus_arcPad[i];
      })
      .outerRadius(function(d, i) {
        return d.r + minus_i_times_arcWidth[i];
      })
      .startAngle(function(d, i) {
        return d.lists_s_ratio * _2PI;
      })
      .endAngle(function(d, i) {
        return _2PI;
      });

///////////////////////////////////////////

  base_steps
		.append("svg:path")
		.attr("fill", colors.frasi)
		.attr("class", customElementsClasses.lists_level_3_full)
		.attr("d", drawListsArc1)
/*		.attr('transform', function(d, i) {
			return 'translate(0,' + (d.n_steps - i) * step_increment + ')'
		})
*/		.style('fill-opacity', 0);

  base_steps
		.append("svg:path")
		.attr("fill", colors.misto)
		.attr("class", customElementsClasses.lists_level_3_full)
		.attr("d", drawListsArc2)
/*		.attr('transform', function(d, i) {
			return 'translate(0,' + (d.n_steps - i) * step_increment + ')'
		})
*/		.style('fill-opacity', 0);

  base_steps
		.append("svg:path")
		.attr("fill", colors.parole)
		.attr("class", customElementsClasses.lists_level_3_full)
		.attr("d", drawListsArc3)
/*		.attr('transform', function(d, i) {
			return 'translate(0,' + (d.n_steps - i) * step_increment + ')'
		})
*/		.style('fill-opacity', 0);

  base_steps
		.append("svg:path")
		.attr("fill", colors.sintagmi)
		.attr("class", customElementsClasses.lists_level_3_full)
		.attr("d", drawListsArc4)
/*		.attr('transform', function(d, i) {
			return 'translate(0,' + (d.n_steps - i) * step_increment + ')'
		})
*/		.style('fill-opacity', 0);

  base_steps
		.append("svg:path")
		.attr("fill", "transparent")
		.attr("class", customElementsClasses.lists_level_3_full)
		.attr("d", drawListsArc5)
/*		.attr('transform', function(d, i) {
			return 'translate(0,' + (d.n_steps - i) * step_increment + ')'
		})
*/		.style('fill-opacity', 0);      

///////////////////////////////////////////

    let drawListsOverallArc1 = d3
      .arc()
      .innerRadius(function(d, i) {
        return d.r + minus_i_plus_1_times_arcWidth_plus_arcPad[i];
      })
      .outerRadius(function(d, i) {
        return d.r + minus_i_times_arcWidth[i];
      })
      .startAngle(0 * _2PI)
      .endAngle(function(d, i) {
        return d.lists_ratio_with_threshold * _2PI;
      });

    let drawListsOverallArc2 = d3
      .arc()
      .innerRadius(function(d, i) {
        return d.r + minus_i_plus_1_times_arcWidth_plus_arcPad[i];
      })
      .outerRadius(function(d, i) {
        return d.r + minus_i_times_arcWidth[i];
      })
      .startAngle(function(d, i) {
        return d.lists_ratio_with_threshold * _2PI;
      })
      .endAngle(function(d, i) {
        return _2PI;
      });

///////////////////////////////////////////

    base_steps
      .filter(d => d.lists_are_present)
      .append("svg:path")
      .attr("fill", d => d.lists_ratio_is_below_threshold ? colors.lists_ratio_below_threshold : colors.lists_ratio_above_threshold)
      .attr("class", customElementsClasses.lists_level_2_full)
      .attr("d", drawListsOverallArc1)
/*      .attr('transform', function(d,i){
        return 'translate(0,' + (d.n_steps-i) * step_increment + ')'
      })
*/      .style('fill-opacity',0);

    base_steps
      .filter(d => d.lists_are_present)
      .append("svg:path")
      .attr("fill", "lightgrey")
      .attr("class", customElementsClasses.lists_level_2_full)
      .attr("d", drawListsOverallArc2)
/*      .attr('transform', function(d,i){
        return 'translate(0,' + (d.n_steps-i) * step_increment + ')'
      })
*/      .style('fill-opacity',0);

///////////////////////////////////////////

//    this.setHighlightMode(GlobalData.analysisModes.noAnalysis.chronology);
    currentAnalysisMode = undefined;
    this.setHighlightMode(analysisMode);

    this.label = this.text_nodes
      .selectAll('.label')
      .data(function(d) {     

        if(d.attributes.collections && d.attributes.collections.length) 
        {
          // console.log('handle collections')
          let collections = d.attributes.collections.reverse().map((e, i) => {
            let obj = {
              'id': e,
              'index': i,
              'length': d.attributes.collections.length
            }
            return obj;
          });
          d.attributes.collectionsTooltip = collections;
        } 
        else 
        {
          // console.log('handleNoCollections')
          let obj = {
            'first_publication': d.attributes.first_publication
          }
          d.attributes.collectionsTooltip = [obj];
        }
        return [d];
      })
      .enter()
      .append('g')
      .attr('class', 'label');

    // Append title
    this.label
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('font-family', "'HKGrotesk', sans-serif")
      .attr('font-size', '1.1rem')
      .text(function(d) {
        // V016 - "il castello dei destini incrociati" gets anyway the first publication year in the label
        if((d.attributes.type === 'romanzo' || d.attributes.type === 'ibrido') && d.id !== "V016") {
          return d.attributes.title;
        } else {
          return d.attributes.title + ', ' + d.attributes.first_publication;
        }
      });

    // Append collections years
    this.label
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('x', function(d) { return 0; })
      .attr('y', parseInt(d3.select('html').style('font-size')) + 1.5)
      .attr('font-size', '0.8rem')
      .selectAll('.labels-collections-years')
      .data(d => d.attributes.collectionsTooltip)
      .enter()
      .append('tspan')
      .attr('dx', (d, i) => i !== 0 ? half_rem : 0)
      .html((d, i) => {        
        if(d.first_publication) {
          return;
          // remove first publication in the second row for short stories
          // return '&#9737; ' + d.first_publication;
        } else {
          return '<tspan fill="' + GlobalData.col_collections(d.id) + '">' + circled_numbers(i) + '</tspan> ' + GlobalData.collections.filter(e => d.id === e.id)[0].year;
        }
      });

    d3
      .selectAll('.label text')
      .each(function(d, i) {
        clone_d3_selection(d3.select(this), '');
        d3.select(this).classed('white-shadow', true);
      });

    //add zoom capabilities
    var zoom_handler = d3
      .zoom()
      .on("zoom", zoom_actions);

    zoom_handler(svg);

    let usedSpace = 0.65;
    scale = ((w * usedSpace) / (boundaries.right - boundaries.left)) * 0.9;
    one_rem_times_scale = one_rem * scale;

    centerTerritory(scale, 0, 0, 0);

    //Zoom functions
    function zoom_actions() 
    {
      containerOnSvgClicked();
      g.attr("transform", d3.event.transform);
  		metaball_group.attr("transform", d3.event.transform);
  		place_hierarchies_group.attr("transform", d3.event.transform);
  		place_hierarchies_group_2.attr("transform", d3.event.transform);
      d3_event_transform_k = d3.event.transform.k;
      label_x_scale_factor = one_rem_times_scale / d3_event_transform_k;
      label_y_scale_factor_no_tilt = label_x_scale_factor;
      label_y_scale_factor_tilt = label_x_scale_factor / with_tilt_factor;
      tilt_labels(V.text_nodes);
    }

    // Handle interface interactions
    function centerTerritory(scale, x, y, duration) 
    {
      svg.transition()
        .duration(duration)
        .call(
          zoom_handler.transform, 
          d3
            .zoomIdentity
            .translate(half_w + x, half_h + y)
            .scale(scale));
    }

    this.textsData = input_data.textsData;

    // reached point for chronological animation

    if([
      GlobalData.analysisModes.noAnalysis.chronology,
      GlobalData.analysisModes.noAnalysis.volumes
    ].includes(analysisMode))
    {
      containerSetAllowDropMenus(false);

      this.showHillsProgressively(containerSetAllowDropMenus);
    }
    else
    {
      containerSetAllowDropMenus(true);
    }
  };

  async showHillsProgressively(containerSetAllowDropMenus)
  {
    const delayFactor = 150;

    await svg
      .transition()
      .selectAll(".circle_node")
      .delay(function(d) { return (d.first_publication - 1940) * delayFactor })
      .attr("transform", this.calculateHillStepTranslation)
      .style("fill-opacity", 1)
      .style("stroke-opacity", .5)
      .end();

    containerSetAllowDropMenus(true);
  }


  destroy = () => {};

  //calculateHillStepTranslation = d => "translate(0," + (d.step_index * step_increment) + ")";
  calculateHillStepTranslation = d => "translate(0," + d.step_y + ")";

  setColor = color => d3
    .selectAll("circle")
    .attr("fill", color);

  set_yRatio = yRatio => 
  {
    tilt = yRatio === 1;

    if(tilt)
    {
      const t0 = svg.transition().duration(1000);
      const t1 = t0.transition().ease(d3.easeCircleOut).duration(1500);

      t0.selectAll(".circle_node").attr("transform", tilt ? "" : this.calculateHillStepTranslation);

      t1
        .selectAll(".node,.metaball_node")
        .attr("transform", d => {
          return "scale(1, " + yRatio + ") translate(" + (d.x - center.x) + "," + (d.y - center.y) + ")";
        });
    }
    else
    {
      const t1 = svg.transition().ease(d3.easeCircleOut).duration(1500);
      const t0 = t1.transition().duration(1000);

      t1
        .selectAll(".node,.metaball_node")
        .attr("transform", d => {
          return "scale(1, " + yRatio + ") translate(" + (d.x - center.x) + "," + (d.y - center.y) + ")";
        });            

      t0.selectAll(".circle_node").attr("transform", tilt ? "" : this.calculateHillStepTranslation);
    }

    const label = this.text_nodes.selectAll('.label');   

    label.attr('transform', function(d) {

      let dy = tilt ? 0 : (d.steps.length + 5) * step_increment;
      let translate_string = tilt ? "" : 'translate(0,' + dy + ') ';

      if(tilt) return translate_string + 'scale(' + label_x_scale_factor + ',' + label_y_scale_factor_no_tilt + ')';
      else return translate_string + 'scale(' + label_x_scale_factor + ',' + label_y_scale_factor_tilt + ')';
    });
  }

  set_yRatio_withoutTransition = yRatio => 
  {
    tilt = yRatio === 1;

    if(tilt)
    {    
      d3.selectAll(".circle_node").attr("transform", tilt ? "" : this.calculateHillStepTranslation);

      d3
        .selectAll(".node,.metaball_node")
        .attr("transform", d => {
          return "scale(1, " + yRatio + ") translate(" + (d.x - center.x) + "," + (d.y - center.y) + ")";
        });
    }
    else
    {    
      d3
        .selectAll(".node,.metaball_node")
        .attr("transform", d => {
          return "scale(1, " + yRatio + ") translate(" + (d.x - center.x) + "," + (d.y - center.y) + ")";
        });            

      d3.selectAll(".circle_node").attr("transform", tilt ? "" : this.calculateHillStepTranslation);
    }

    const label = this.text_nodes.selectAll('.label');   

    label.attr('transform', function(d) {

      let dy = tilt ? 0 : (d.steps.length + 5) * step_increment;
      let translate_string = tilt ? "" : 'translate(0,' + dy + ') ';

      if(tilt) return translate_string + 'scale(' + label_x_scale_factor + ',' + label_y_scale_factor_no_tilt + ')';
      else return translate_string + 'scale(' + label_x_scale_factor + ',' + label_y_scale_factor_tilt + ')';
    });
  }  

  showHillsTops = opacity => d3
    .selectAll(".circle_node")
    .filter(d => !d.first_elem)
    .transition()
    .duration(2000)
    .style("fill-opacity", opacity)
    .style("stroke-opacity", opacity);

  showHillsBases = opacity => d3
    .selectAll(".circle_node")
    .filter(d => d.first_elem)
    .transition()
    .duration(2000)
    .style("fill-opacity", opacity)
    .style("stroke-opacity", opacity);  

  showHills = opacity => d3
    .selectAll(".circle_node")
    .transition()
    .duration(2000)
    .style("fill-opacity", opacity)
    .style("stroke-opacity", opacity);

  applyShowHillMode = showHillMode => {
    switch(showHillMode)
    {
      case showHillModes.all : 
        this.showHills(1);
        break;
      case showHillModes.base :
        this.showHillsTops(0);
        this.showHillsBases(1);
        break;
      case showHillModes.nothing :
        this.showHills(0);
        break;
      default : break;
    }
  };

  showHillsTops_withoutTransition = opacity => d3
    .selectAll(".circle_node")
    .filter(d => !d.first_elem)
    .style("fill-opacity", 0)
    .style("stroke-opacity", 0);

  showHillsBases_withoutTransition = opacity => d3
    .selectAll(".circle_node")
    .filter(d => d.first_elem)
    .style("fill-opacity", opacity)
    .style("stroke-opacity", opacity);

  showHills_withoutTransition = opacity => d3
    .selectAll(".circle_node")
    .style("fill-opacity", opacity)
    .style("stroke-opacity", opacity);

  applyShowHillMode_withoutTransition = showHillMode => 
  {
    switch(showHillMode)
    {
      case showHillModes.all : 
        this.showHills_withoutTransition(1);
        break;
      case showHillModes.base :
        this.showHillsTops_withoutTransition(0);
        this.showHillsBases_withoutTransition(1);
        break;
      case showHillModes.nothing :
        this.showHills_withoutTransition(0);
        break;
      default : break;
    }
  };

  setDataExtent = extent => data.extent = extent;

  applyBeeSwarmFilter = () => {

    if(!data.extent) return;

    d3
      .selectAll('g.node')
      .each(function(d) {
        if(+d.attributes.first_publication >= data.extent[0] && +d.attributes.first_publication <= data.extent[1]) {
          d3.select(this).style("opacity", 1);
        } else {
          d3.select(this).style("opacity", 0.15);
        }
      });
  };

  applySearchFilterByInputText = inputText => 
  {
    const inputLowerCase = inputText.toLowerCase();
    const inputLowerCaseTrimmed = inputLowerCase.trim();

    const mustReset = inputLowerCaseTrimmed === "";

    const results = this.textsData.options.filter(d => d.desc.toLowerCase().includes(inputLowerCase));

    this.applySearchFilterBySearchResults(mustReset, results);
  };

  applySearchFilterBySearchResults = (mustReset, searchResults) => 
  {
    this.label.classed("visible", false);

    if(!mustReset)
    {
      this.text_nodes.style("opacity", .35);

      searchResults.forEach(result => 
        {
          this.text_nodes
            .filter(text_node => text_node.id === result.id)
            .style("opacity", 1);

          this.label
            .filter(d => d.id === result.id)
            .classed("visible", true);
        });
    }
    else
    {
      this.text_nodes.style("opacity", 1);
    }
  };

/*
  // 1 : first publication year; 2 : collection
  setHillColoringMode = value => {
    this.hillColoringMode = value;
//    this.highlightHills();
  };
*/

  setHighlightMode = newAnalysisMode => 
  {
    const currentHighlightParameters = this.analysisModeMap.get(currentAnalysisMode);

    const newHighlightParameters = this.analysisModeMap.get(newAnalysisMode);

    const analysisModeChangeType = getAnalysisModeChangeType(currentHighlightParameters.analysisModeGroup, newHighlightParameters.analysisModeGroup);

    switch(analysisModeChangeType)
    {
      case analysisModeChangeTypes.change_none_to_hills :

        this.change_none_to_hills(
          currentAnalysisMode, currentHighlightParameters,
              newAnalysisMode,     newHighlightParameters);

        break;

      case analysisModeChangeTypes.change_none_to_flat :

        this.change_none_to_flat(
          currentAnalysisMode, currentHighlightParameters,
              newAnalysisMode,     newHighlightParameters);

        break;

      case analysisModeChangeTypes.change_none_to_drawing :

        this.change_none_to_drawing(
          currentAnalysisMode, currentHighlightParameters,
              newAnalysisMode,     newHighlightParameters);

        break;                

      case analysisModeChangeTypes.change_flat_to_hills : 

        this.change_flat_to_hills(
          currentAnalysisMode, currentHighlightParameters,
              newAnalysisMode,     newHighlightParameters);

        break;

      case analysisModeChangeTypes.change_hills_to_flat : 

        this.change_hills_to_flat(
          currentAnalysisMode, currentHighlightParameters,
              newAnalysisMode,     newHighlightParameters);

        break;

      case analysisModeChangeTypes.change_hills_to_drawing : 

        this.change_hills_to_drawing(
          currentAnalysisMode, currentHighlightParameters,
              newAnalysisMode,     newHighlightParameters);

        break;

      case analysisModeChangeTypes.change_drawing_to_hills : 

        this.change_drawing_to_hills(
          currentAnalysisMode, currentHighlightParameters,
              newAnalysisMode,     newHighlightParameters);

        break;

      case analysisModeChangeTypes.change_flat_to_drawing : 

        this.change_flat_to_drawing(
          currentAnalysisMode, currentHighlightParameters,
              newAnalysisMode,     newHighlightParameters);

        break;

      case analysisModeChangeTypes.change_drawing_to_flat : 

        this.change_drawing_to_flat(
          currentAnalysisMode, currentHighlightParameters,
              newAnalysisMode,     newHighlightParameters);

        break;
      
      case analysisModeChangeTypes.change_hills_to_hills : 

        this.change_hills_to_hills(
          currentAnalysisMode, currentHighlightParameters,
              newAnalysisMode,     newHighlightParameters);

        break;

      case analysisModeChangeTypes.change_flat_to_flat : 

        this.change_flat_to_flat(
          currentAnalysisMode, currentHighlightParameters,
              newAnalysisMode,     newHighlightParameters);

        break;

      case analysisModeChangeTypes.change_drawing_to_drawing : 

        this.change_drawing_to_drawing(
          currentAnalysisMode, currentHighlightParameters,
              newAnalysisMode,     newHighlightParameters);

        break;

      default : throw new Error("analysis mode change type not recognized : " + analysisModeChangeType);
    }

    currentAnalysisMode = newAnalysisMode;
  };

  change_none_to_hills = (
    oldAnalysisMode, oldHighlightParameters,
    newAnalysisMode, newHighlightParameters) =>
  {
    tilt = false;
//    this.set_yRatio(newHighlightParameters.tilt_factor);
    this.highlightHills_forAnimation(newHighlightParameters.dataMember, newHighlightParameters.colorScale);
//    this.applyShowHillMode(newHighlightParameters.showHillMode);
    this.highlightCustomElements(newHighlightParameters.customElementsClasses);
    this.showMetaballs(newHighlightParameters.show_metaballs);    
  }

  change_none_to_flat = (
    oldAnalysisMode, oldHighlightParameters,
    newAnalysisMode, newHighlightParameters) =>
  {
    this.set_yRatio_withoutTransition(newHighlightParameters.tilt_factor);
    this.highlightHills(newHighlightParameters.dataMember, newHighlightParameters.colorScale);
    this.applyShowHillMode_withoutTransition(newHighlightParameters.showHillMode);
    this.highlightCustomElements(newHighlightParameters.customElementsClasses);
    this.showMetaballs(newHighlightParameters.show_metaballs);    
  }

  change_none_to_drawing = (
    oldAnalysisMode, oldHighlightParameters,
    newAnalysisMode, newHighlightParameters) =>
  {
    this.set_yRatio_withoutTransition(newHighlightParameters.tilt_factor);
    this.highlightHills(newHighlightParameters.dataMember, newHighlightParameters.colorScale);
    this.applyShowHillMode_withoutTransition(newHighlightParameters.showHillMode);
    this.highlightCustomElements(newHighlightParameters.customElementsClasses);
    this.showMetaballs(newHighlightParameters.show_metaballs);    
  }    

  change_hills_to_flat = (
    oldAnalysisMode, oldHighlightParameters,
    newAnalysisMode, newHighlightParameters) =>
  {
    // flatten hills tops (but don't hide them yet)
    const t0 = svg.transition().duration(700);
    t0
      .selectAll(".circle_node")
      .attr("transform", "")
      .filter(d => !d.first_elem)
      .style("stroke-opacity", 0);

    // tilt
    const t1 = t0.transition().ease(d3.easeCircleOut).duration(900);
    t1
      .selectAll(".node,.metaball_node")
      .attr("transform", d => "scale(1, " + newHighlightParameters.tilt_factor + ") translate(" + (d.x - center.x) + "," + (d.y - center.y) + ")");

    tilt = true;
    tilt_labels(this.text_nodes);

    // hide the flattened hill tops
    const t2 = t1.transition().duration(1);
    t2.selectAll(".hill")
      .filter(d => !d.first_elem)
      .style("fill", "transparent");

    // recolor hill bases
    const t3 = t2.transition().duration(700);
    t3
      .selectAll(".hill")
      .style("fill", d => d.first_elem && d[newHighlightParameters.dataMember] ? newHighlightParameters.colorScale(d[newHighlightParameters.dataMember]) : "transparent")
      .filter(d => d.first_elem)
      .style("stroke-opacity", 1);
  }

  change_flat_to_hills = (
    oldAnalysisMode, oldHighlightParameters,
    newAnalysisMode, newHighlightParameters) =>
  {
    const t0_0 = svg.transition().duration(1);

    t0_0
      .selectAll(".hill")
      .filter(d => !d.first_elem)
      .style("fill-opacity", 1);

    // recolor whole hills
    const t0 = t0_0.transition().duration(600);
    t0
      .selectAll(".hill")
//      .style("fill-opacity", 1)
      .style("fill", d => newHighlightParameters.colorScale(d[newHighlightParameters.dataMember]));    

    // tilt
    const t1 = t0.transition().ease(d3.easeCircleOut).duration(900);
    t1
      .selectAll(".node,.metaball_node")
      .attr("transform", d => "scale(1, " + newHighlightParameters.tilt_factor + ") translate(" + (d.x - center.x) + "," + (d.y - center.y) + ")");      

    tilt = false;
    tilt_labels(this.text_nodes);

    // raise flattened hills
    const t2 = t1.transition().duration(700);
    t2
      .selectAll(".circle_node")
      .attr("transform", d => "translate(0, " + d.step_y + ")")
      .style("stroke-opacity", 1);     
  }

  change_hills_to_drawing = (
    oldAnalysisMode, oldHighlightParameters,
    newAnalysisMode, newHighlightParameters) =>
  {
    // flatten hills
    const t0 = svg.transition().duration(700);
    t0
      .selectAll(".circle_node")
      .attr("transform", "")
      .filter(d => !d.first_elem)
      .style("stroke-opacity", 0);

    // tilt
    const t1 = t0.transition().ease(d3.easeCircleOut).duration(900);
    t1
      .selectAll(".node,.metaball_node")
      .attr("transform", d => "scale(1, " + newHighlightParameters.tilt_factor + ") translate(" + (d.x - center.x) + "," + (d.y - center.y) + ")");

    tilt = true;
    tilt_labels(this.text_nodes);

    let t2;

    // if necessary, change visibility of metaballs
    if(oldHighlightParameters.show_metaballs && !newHighlightParameters.show_metaballs)
    {
      const t1_1 = t1.transition().duration(200);
      t1_1
        .selectAll(".metaball")
        .style("stroke-opacity", 0);

      t2 = t1_1.transition().duration(700);
    }
    else
    {
      t2 = t1.transition().duration(700);
    }    

    // show custom drawing
    t2
      .selectAll("." + newHighlightParameters.customElementsClasses)
      .style('display', "block")
			.style('fill-opacity', 1)
			.style('stroke-opacity', 1);

    // make hill bases transparent, but keep stroke visible
    const t3 = t2.transition().duration(600);
    t3
      .selectAll(".hill")
      .style("fill", "transparent")
      .filter(d => d.first_elem)
      .style("stroke-opacity", 1);

    // remove hill tops from display
    const t4 = t3.transition().duration(1);
    t4
      .selectAll(".hill")
      .filter(d => !d.first_elem)
      .attr("display", "none");
  }

  change_drawing_to_hills = (
    oldAnalysisMode, oldHighlightParameters,
    newAnalysisMode, newHighlightParameters) =>
  {
    // quickly restore to display (although hidden) the hill tops
    const t_1 = svg.transition().duration(1);
    t_1
      .selectAll(".hill")
      .filter(d => !d.first_elem)
      .attr("display", "block");

    // recolor the hill bases
    const t0 = t_1.transition().duration(800);
    t0
      .selectAll(".hill")
      .style("fill", d => newHighlightParameters.colorScale(d[newHighlightParameters.dataMember]))
      .filter(d => d.first_elem)
      .style("stroke-opacity", 1);

    // hide custom drawings
    const t1 = t0.transition().duration(700);
    t1
      .selectAll("." + oldHighlightParameters.customElementsClasses)
			.style('fill-opacity', 0)
			.style('stroke-opacity', 0);

    let t2;

    // if necessary, change visibility of metaballs
    if(!oldHighlightParameters.show_metaballs && newHighlightParameters.show_metaballs)
    {
      const t1_2 = t1.transition().duration(200);
      t1_2
        .selectAll(".metaball")
        .style("stroke-opacity", 1);

      t2 = t1_2.transition().ease(d3.easeCircleOut).duration(900);
    }
    else
    {
      t2 = t1.transition().ease(d3.easeCircleOut).duration(900);
    }      
    
    // tilt
    t2
      .selectAll(".node,.metaball_node")
      .attr("transform", d => "scale(1, " + newHighlightParameters.tilt_factor + ") translate(" + (d.x - center.x) + "," + (d.y - center.y) + ")");      

    tilt = false;
    tilt_labels(this.text_nodes);

    // show hills
    const t3 = t2.transition().duration(700);
    t3
      .selectAll(".circle_node")
      .attr("transform", d => "translate(0, " + d.step_y + ")")
      .style("stroke-opacity", 1)
      .style("fill-opacity", 1);

    // hide custom drawings
    const t4 = t3.transition().duration(1);
    t4
      .selectAll("." + oldHighlightParameters.customElementsClasses)
      .style("display", "none");
  }

  change_flat_to_drawing = (
    oldAnalysisMode, oldHighlightParameters,
    newAnalysisMode, newHighlightParameters) =>
  {
    let t0;

    // if necessary, change visibility of metaballs
    if(oldHighlightParameters.show_metaballs && !newHighlightParameters.show_metaballs)
    {
      const t_1 = svg.transition().duration(200);
      t_1
        .selectAll(".metaball")
        .style("stroke-opacity", 0);

      t0 = t_1.transition().duration(700);
    }
    else
    {
      t0 = svg.transition().duration(700);
    }

    // show custom drawings
    t0
      .selectAll("." + newHighlightParameters.customElementsClasses)
      .style('display', "block")
			.style('fill-opacity', 1)
			.style('stroke-opacity', 1);

    // hide hill bases
    const t1 = t0.transition().duration(600);
    t1
      .selectAll(".hill")
      .style("fill", "transparent")
      .filter(d => d.first_elem)
      .style("stroke-opacity", 1);

    // quickly remove from drawing hill tops (necessary to have internal of hill bases wholly clickable, as in case of jellyfishes)
    const t2 = t1.transition().duration(1);
    t2
      .selectAll(".hill")
      .filter(d => !d.first_elem)
      .attr("display", "none");
  }

  change_drawing_to_flat = (
    oldAnalysisMode, oldHighlightParameters,
    newAnalysisMode, newHighlightParameters) =>
  {
    // quickly rebring to display (although hidden) the hill tops
    const t_1 = svg.transition().duration(1);
    t_1
      .selectAll(".hill")
      .filter(d => !d.first_elem)
      .attr("display", "block");

    // recolor, if necessary in the new parameters, the hill bases, or otherwise make them transparent
    const t0 = t_1.transition().duration(800);
    t0
      .selectAll(".hill")
      .style("fill", d => d.first_elem && d[newHighlightParameters.dataMember] ? newHighlightParameters.colorScale(d[newHighlightParameters.dataMember]) : "transparent")
      .filter(d => d.first_elem)
      .style("stroke-opacity", 1);

    // hide custom drawings
    const t1 = t0.transition().duration(700);
    t1
      .selectAll("." + oldHighlightParameters.customElementsClasses)
			.style('fill-opacity', 0)
			.style('stroke-opacity', 0);

    let t2;

    // if necessary, change metaballs visibility
    if(!oldHighlightParameters.show_metaballs && newHighlightParameters.show_metaballs)
    {
      const t1_1 = t1.transition().duration(200);
      t1_1
        .selectAll(".metaball")
        .style("stroke-opacity", 1);

      t2 = t1_1.transition().duration(1);
    }
    else
    {
      t2 = t1.transition().duration(1);
    }

    t2
      .selectAll("." + oldHighlightParameters.customElementsClasses)
      .style("display", "none");
  }

  change_hills_to_hills = (
    oldAnalysisMode, oldHighlightParameters,
    newAnalysisMode, newHighlightParameters) =>
  {
    // recolor hills
    const t0 = svg.transition().duration(700);
    t0
      .selectAll(".hill")
      .style("fill", d => newHighlightParameters.colorScale(d[newHighlightParameters.dataMember]));
  }

  change_flat_to_flat = (
    oldAnalysisMode, oldHighlightParameters,
    newAnalysisMode, newHighlightParameters) =>
  {
    // recolor hill bases
    const t0 = svg.transition().duration(700);
    t0
      .selectAll(".hill")
      .style("fill", d => d.first_elem && d[newHighlightParameters.dataMember] ? newHighlightParameters.colorScale(d[newHighlightParameters.dataMember]) : "transparent")
      .filter(d => d.first_elem)
      .style("stroke-opacity", 1);    
  }

  change_drawing_to_drawing = (
    oldAnalysisMode, oldHighlightParameters,
    newAnalysisMode, newHighlightParameters) =>
  {
    // show new custom drawings
    const t0 = svg.transition().duration(700);
    t0
      .selectAll("." + newHighlightParameters.customElementsClasses)
      .style('display', "block")
			.style('fill-opacity', 1)
			.style('stroke-opacity', 1);

    let t1;

    // if necessary, change metaballs visibility
    if(oldHighlightParameters.show_metaballs !== newHighlightParameters.show_metaballs)
    {
      const t0_1 = t0.transition().duration(200);
      t0_1
        .selectAll(".metaball")
        .style("stroke-opacity", newHighlightParameters.show_metaballs ? 1 : 0);

      t1 = t0_1.transition().duration(700);  
    }
    else t1 = t0.transition().duration(700);

    // hide old custom drawings
    t1
      .selectAll("." + oldHighlightParameters.customElementsClasses)
      .style('display', "block")
		 	.style('fill-opacity', 0)
		 	.style('stroke-opacity', 0);    
  }

  onFirstElementClicked = d => 
  {
    switch(true)
    {
      case currentAnalysisMode === GlobalData.analysisModes.space.placeHierarchies : this.highlightPlaceHierarchy(d); break;
      default : break;
    }
  };

  highlightPlaceHierarchy = d => {
    const selectedHierarchyClass = ".place_hierarchy_2_" + d.id;

    const t0 = svg.transition().duration(100);
    t0
      .selectAll(selectedHierarchyClass)
      .style("fill-opacity", 1)
      .style("stroke-opacity", 1);

    const t1 = t0.transition().duration(100);
    t1
      .selectAll(".hill")
      .filter(dd => dd.first_elem && dd.id === d.id)
      .style("stroke-opacity", 1);

    const allOtherHierarchies = ".place_hierarchy_2:not(" + selectedHierarchyClass + ")";

    const t2 = t1.transition().duration(100);
    t2
      .selectAll(allOtherHierarchies)
      .style("fill-opacity", 0.2)
      .style("stroke-opacity", 0.2);

    const t3 = t2.transition().duration(100);
    t3
      .selectAll(".hill")
      .filter(dd => dd.first_elem && dd.id !== d.id)
      .style("stroke-opacity", 0.2);
  }

  onSvgClicked = () =>
  {
    this.containerOnSvgClicked();

    switch(true)
    {
      case 
        d3.event.target.constructor.name === "SVGSVGElement" && 
        currentAnalysisMode === GlobalData.analysisModes.space.placeHierarchies : 
        
        this.showAllPlaceHierarchies(); 
        break;

      default : break;
    }    
  }

  showAllPlaceHierarchies = () => 
  {
    const t0 = svg.transition().duration(100);
    t0
      .selectAll(".place_hierarchy_2")
      .style("fill-opacity", 1)
      .style("stroke-opacity", 1);

    const t1 = t0.transition().duration(100);
    t1
      .selectAll(".hill")
      .filter(dd => dd.first_elem)
      .style("stroke-opacity", 1);
  }  

  highlightHills_old = (dataMember, colorScale) => {

    const allHills = d3.selectAll(".hill");

    if(!dataMember)
    {
      this.text_nodes.style("display", "block");      

      allHills.style("fill-opacity", 1).style("stroke-opacity", 1);

      switch(this.hillColoringMode)
      {
        case 1 : allHills.style("fill", d => this.colour(d.first_publication)); break;
        case 2 : allHills.style("fill", d => GlobalData.col_collections(d.collection)); break;
        default : break;
      }

      return;
    }

    allHills
      .filter(d => !d[dataMember])
      .transition()
      .duration(350)
      .style("fill", d => "transparent");

    allHills
      .filter(d => d[dataMember])
      .transition()
      .duration(350)
      .style("fill", d => colorScale(d[dataMember]));
  };

  highlightHills_forAnimation = (dataMember, colorScale) => {

    const allHills = d3.selectAll(".hill");

    if(["first_publication", "collection"].includes(dataMember))
    {
      this.text_nodes.style("display", "block");      

//      allHills.style("fill-opacity", 1).style("stroke-opacity", 1);

      allHills.style("fill", d => colorScale(d[dataMember]));

      return;
    }    

    allHills
      .filter(d => !d[dataMember])
      .style("fill", "transparent");

    allHills
      .filter(d => d[dataMember])
      .style("fill", d => colorScale(d[dataMember]));
  };  

  highlightHills = (dataMember, colorScale) => {


    const allHills = d3.selectAll(".hill");

    if(["first_publication", "collection"].includes(dataMember))
    {
      this.text_nodes.style("display", "block");      

      allHills.style("fill-opacity", 1).style("stroke-opacity", 1);
/*
      switch(this.hillColoringMode)
      {
        case 1 : allHills.style("fill", d => this.colour(d.first_publication)); break;
        case 2 : allHills.style("fill", d => GlobalData.col_collections(d.collection)); break;
        default : break;
      }
*/
/*
      allHills
        .filter(d => !d[dataMember])
        .transition()
        .duration(350)
        .style("fill", d => "transparent");
*/


      allHills
//        .filter(d => d[dataMember])
//        .transition()
//        .duration(350)
        .style("fill", d => {
//console.log("d", d);
//console.log("colorScale(d[dataMember])", colorScale(d[dataMember]));
          return colorScale(d[dataMember]);
        });

      return;
    }    

    allHills
      .filter(d => !d[dataMember])
//      .transition()
//      .duration(350)
      .style("fill", d => {
//console.log("d", d);
//console.log("transparent");
        return "transparent"
      });

    allHills
      .filter(d => d[dataMember])
//      .transition()
//      .duration(350)
      .style("fill", d => {
//console.log("d", d);
//console.log("colorScale(d[dataMember])", colorScale(d[dataMember]));        
        return colorScale(d[dataMember])
      });
  };

  highlightCustomElements = elementsClasses => {
    this.showCustomElements(customElementsClasses.customElements, 0);

    if(elementsClasses) this.showCustomElements(elementsClasses, 1);
  }

  showCustomElements = (elementsClass, opacity) => {
    d3
      .selectAll("." + elementsClass)
      .style('display', opacity ? "block" : "none")
			.style('fill-opacity', opacity)
			.style('stroke-opacity', opacity);
  }

  showMetaballs = visible => {
    d3
      .selectAll(".metaball")
      .transition()
      .duration(1000)
      .style("stroke-opacity", visible ? 1 : 0);
  }
}

function clone_d3_selection(selection, i) 
{
	// Assume the selection contains only one object, or just work
	// on the first object. 'i' is an index to add to the id of the
	// newly cloned DOM element.
	const attr = selection.node().attributes;
	const innerElements = selection.html()
	const length = attr.length;
	const node_name = selection.property("nodeName");
  const parent = d3.select(selection.node().parentNode);
  
  const cloned = parent
    .append(node_name)
		.attr("id", selection.attr("id") + i)
		.html(innerElements);

  // Iterate on attributes and skip on "id"
  for(let j = 0; j < length; ++j)
  {
		if(attr[j].nodeName === "id") continue;
		cloned.attr(attr[j].name, attr[j].value);
  }
  
	return cloned;
}

function prepare_place_hierarchies_2(place_hierarchies, json_node_map, colors)
{
	const place_hierarchies_graphics_items_2 = [];

  // [text_id, place_hierarchy]
	for(let [, place_hierarchy] of place_hierarchies)
	{
			let text_group = {
				caption : place_hierarchy.caption,
				graphical_ops : []
			};

			place_hierarchies_graphics_items_2.push(text_group);
	}

	const place_hierarchies_graphics_item_map_2 = new Map();

	place_hierarchies_graphics_items_2.forEach(d => {
		const place_hierarchy = place_hierarchies.get(d.caption);
		if(place_hierarchy)
		{
			draw_jellyfish(
        d.graphical_ops, 
        place_hierarchy, 
        { x : 0, y : 0 } /*place_hierarchy.circle_position*/, 
        place_hierarchy.caption,
        json_node_map,
        colors);

			place_hierarchies_graphics_item_map_2.set(d.caption, d);
		}
	});

  const place_hierarchies_info_2 = {
    place_hierarchies_graphics_items_2    : place_hierarchies_graphics_items_2,
    place_hierarchies_graphics_item_map_2 : place_hierarchies_graphics_item_map_2
  };

  return place_hierarchies_info_2;
}

function placesArcFix(d)
{
  // rotate some place proportion rings so that they match the place hierarchies

  switch(d.id)
  {
    case "S012" : return Math.PI * 1 / 2;
    case "S032" : return Math.PI * 2 / 3;
    case "S081" : return Math.PI * 25 / 32;
    case "S076" : return Math.PI * 1 / 2;
    case "S089" : return Math.PI * 1 / 2;
    case "V008" : return Math.PI * 3 / 4;
    case "S149" : return Math.PI * 6 / 10;
    case "S151" : return Math.PI * 69 / 128;
    case "S156" : return Math.PI * 5 / 12;
    case "V021" : return Math.PI * 1 / 2;
    case "S179" : return Math.PI * 1 / 2;
    case "S181" : return Math.PI * 1 / 2;
    case "S203" : return Math.PI * 1 / 2;
    case "S119" : return Math.PI * 1 / 2;
    case "S123" : return Math.PI * 21 / 32;
    case "S142" : return Math.PI * 9 / 16;
    case "S139" : return Math.PI * 30 / 48;
    case "S140" : return Math.PI * 1 / 2;
    case "S095" : return Math.PI * 1 / 2;
    case "S097" : return Math.PI * 37 / 64;
    case "S104" : return Math.PI * 37 / 48;
    case "S050" : return Math.PI * 1 / 2;
    case "S101" : return Math.PI * 21 / 32;
    case "S048" : return Math.PI * 31 / 64;
    case "S088" : return Math.PI * 133 / 256;
    case "S065" : return Math.PI * 1 / 2;
    case "S072" : return Math.PI * 1 / 2;
    case "S067" : return Math.PI * 17 / 32;
    case "S007" : return Math.PI * 17 / 32;
    case "S022" : return Math.PI * 7 / 16;
    case "S041" : return Math.PI * 1 / 2;
    case "S014" : return Math.PI * 9 / 24;
    case "S165" : return Math.PI * 2 / 3;
    case "S011" : return Math.PI * 1 / 2;
    case "V005" : return Math.PI * 21 / 40;

    default : return 0;
  }
}

function getAnalysisModeChangeType(oldAnalysisModeGroup, newAnalysisModeGroup)
{
  let factor;
  if(oldAnalysisModeGroup <= newAnalysisModeGroup) factor = 1;
  else factor = -1;

  return factor * oldAnalysisModeGroup * newAnalysisModeGroup;
}

function tilt_labels(text_nodes)
{
  const label = text_nodes.selectAll('.label');   

  label.attr('transform', function(d) {

    let dy = tilt ? 0 : (d.steps.length + 5) * step_increment;
    let translate_string = tilt ? "" : 'translate(0,' + dy + ') ';

    if(tilt) return translate_string + 'scale(' + label_x_scale_factor + ',' + label_y_scale_factor_no_tilt + ')';
    else return translate_string + 'scale(' + label_x_scale_factor + ',' + label_y_scale_factor_tilt + ')';
  });
}

const V = new VClass();

export default V;