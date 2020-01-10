
import * as d3 from 'd3';
import { checkMapAndInsert, CollectionMapNames, prepareMetaballData } from './metaballs';

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

let margin = { top : 0, right : 50, bottom : 30, left : 50 }, width, height;

let svg;
let center;
let tilt = false;
let step_increment = -23;
let scale;
let d3_event_transform_k;

const PI = Math.PI;
const arcMin = 75; // inner radius of the first arc
const arcWidth = 38;
const arcPad = 1; // padding between arcs
const drawMode = 1; // 1 : hills; 2 : hills with halo; 3 : places; 4 : dubitative phenomena;

class VClass
{
  initialize = (el, input_data) => {
console.log("territory initialize");    
    if(!input_data.json_nodes || input_data.json_nodes === "data still not loaded") return;

    const json_nodes = input_data.json_nodes;
    data.x_csv2 = input_data.x_csv2;

    let w = window.innerWidth;
    let h = window.innerHeight - 6;
    svg = d3.select(el).style("touch-action", "manipulation");

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
      .filter(coll => (GlobalData.allowedCollections == "all" && coll.has_metaball) || GlobalData.allowedCollectionsSplit.includes(coll.id))
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
        return "scale(1, 0.5773) translate(" + (d.x - center.x) + "," + (d.y - center.y) + ")";
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
      .range(["#ff6347", "#455A64"]);

    const circled_numbers = d3
      .scaleOrdinal()
      .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
      .range(['➊', '➋', '➌', '➍', '➎', '➏', '➐', '➑', '➒', '➓']);

    const arcWidth = 38;
    const arcPad = 1; // padding between arcs
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
      .range(['#DDDDFF', 'blue']);
  
    this.cancellazione_color_scale = d3
      .scaleLinear()
      .domain(d3.extent(Object.values(data.x_csv2), d => d.nebbia_words_ratio))
      .range(['#FFDDDD', 'red']);

    this.generico_non_terrestre_color_scale = d3
      .scaleLinear()
      .domain(d3.extent(Object.values(data.x_csv2), d => d.n_generico_non_terrestre))
      .range(['#DDDDDD', 'red']);
  
    this.generico_terrestre_color_scale = d3
      .scaleLinear()
      .domain(d3.extent(Object.values(data.x_csv2), d => d.n_generico_terrestre))
      .range(['#DDDDDD', 'orange']);
  
    this.inventato_color_scale = d3
      .scaleLinear()
      .domain(d3.extent(Object.values(data.x_csv2), d => d.n_inventato))
      .range(['#DDDDDD', 'fuchsia']);
  
    this.no_ambientazione_color_scale = d3
      .scaleLinear()
      .domain(d3.extent(Object.values(data.x_csv2), d => d.n_no_ambientazione))
      .range(['#DDDDDD', 'darkgrey']);
  
    this.nominato_non_terrestre_color_scale = d3
      .scaleLinear()
      .domain(d3.extent(Object.values(data.x_csv2), d => d.n_nominato_non_terrestre))
      .range(['#DDDDDD', 'blue']);
  
    this.nominato_terrestre_color_scale = d3
      .scaleLinear()
      .domain(d3.extent(Object.values(data.x_csv2), d => d.n_nominato_terrestre))
      .range(['#DDDDDD', 'dodgerblue']);
  
    this.dubitative_color_scale = d3
      .scaleLinear()
      .domain(d3.extent(Object.values(data.x_csv2), d => d.dubitative_ratio))
      .range(['#FFDDFF', 'violet']);

    this.highlightModeMap = new Map([
      [ GlobalData.commands.territory.doubt.fog, { filterCondition : 'nebbia_words_ratio', colorScale : this.nebbia_color_scale } ],
      [ GlobalData.commands.territory.doubt.cancellation, { filterCondition : 'cancellazione_words_ratio', colorScale : this.cancellazione_color_scale } ],
      [ GlobalData.commands.territory.doubt.all, { filterCondition : 'dubitative_ratio', colorScale : this.dubitative_color_scale } ],
      [ "generici non terrestri", { filterCondition : 'n_generico_non_terrestre', colorScale : this.generico_non_terrestre_color_scale } ],
      [ "nominati non terrestri", { filterCondition : 'n_nominato_non_terrestre', colorScale : this.nominato_non_terrestre_color_scale} ],
      [ "generici terrestri", { filterCondition : 'n_generico_terrestre', colorScale : this.generico_terrestre_color_scale} ],
      [ "nominati terrestri", { filterCondition : 'n_nominato_terrestre', colorScale : this.nominato_terrestre_color_scale} ],
      [ "inventati", { filterCondition : 'n_inventato', colorScale : this.inventato_color_scale} ],
      [ "senza ambientazione", { filterCondition : 'n_no_ambientazione', colorScale : this.no_ambientazione_color_scale} ]
    ]);

    this.text_nodes = g
      .selectAll(".node")
      .data(json_nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", function(d) {
        return "scale(1, 0.5773) translate(" + (d.x - center.x) + "," + (d.y - center.y) + ")";
      });

    const steps = this.text_nodes
      .selectAll("circle")
      .data(d => d.steps)
      .enter();

//    this.step_increment = -23;

    steps
      .append("circle")
      .attr("class", "circle_node hill")
      .attr("stroke", "black")
      .attr("stroke-width", 1.5)
//      .attr("fill", "tomato")
      .attr("first_elem", d => d.first_elem)
      .attr("r", d => d.r)
/*      
      .attr("transform", function(d, i) {
        i = i * step_increment;
        return "translate(0," + i + ")";
      })
*/
      .attr("transform", this.calculateHillStepTranslation)
      .style("fill-opacity", 1)
      .style("stroke-opacity", .5);

///////////////////////////////////////////

    let drawDubitativePhenomenaArc1 = d3
      .arc()
      .innerRadius(function(d, i) {
        return d.r - (i + 1) * arcWidth + arcPad;
      })
      .outerRadius(function(d, i) {
        return d.r - i * arcWidth;
      })
      .startAngle(0 * 2 * PI)
      .endAngle(function(d, i) {
        return d.nebbia * 2 * PI;
      });

    let drawDubitativePhenomenaArc2 = d3
      .arc()
      .innerRadius(function(d, i) {
        return d.r - (i + 1) * arcWidth + arcPad;
      })
      .outerRadius(function(d, i) {
        return d.r - i * arcWidth;
      })
      .startAngle(function(d, i) {
        return d.nebbia * 2 * PI;
      })
      .endAngle(function(d, i) {
        return d.cancellazione * 2 * PI;
      });

    let drawDubitativePhenomenaArc3 = d3
      .arc()
      .innerRadius(function(d, i) {
        return d.r - (i + 1) * arcWidth + arcPad;
      })
      .outerRadius(function(d, i) {
        return d.r - i * arcWidth;
      })
      .startAngle(function(d, i) {
        return d.cancellazione * 2 * PI;
      })
      .endAngle(function(d, i) {
        return 2 * PI;
      });

///////////////////////////////////////////

    steps
      .filter(function(d) { return d.first_elem })
      .append("svg:path")
      .attr("fill", "blue")
      .attr("class", "dubitativePhenomena_level_2")
      .attr("d", drawDubitativePhenomenaArc1)
      .style('fill-opacity', 0);

    steps
      .filter(function(d) { return d.first_elem })
      .append("svg:path")
      .attr("fill", "red")
      .attr("class", "dubitativePhenomena_level_2")
      .attr("d", drawDubitativePhenomenaArc2)
      .style('fill-opacity', 0);

    steps
      .filter(function(d) { return d.first_elem })
      .append("svg:path")
      .attr("fill", "transparent")
      .attr("class", "dubitativePhenomena_level_2")
      .attr("d", drawDubitativePhenomenaArc3)
      .style('fill-opacity', 0);

///////////////////////////////////////////

    this.setHillColoringMode(1);

    this.label = this.text_nodes
      .selectAll('.label')
      .data(function(d) {
        let one_rem = parseInt(d3.select('html').style('font-size'));

        if(d.attributes.collections && d.attributes.collections.length) 
        {
          // console.log('handle collections')
          let collections = d.attributes.collections.reverse().map((e, i) => {
            let obj = {
              'id': e,
              'index': i,
              'length': d.attributes.collections.length,
              'rem': one_rem
            }
            return obj;
          });
          d.attributes.collectionsTooltip = collections;
        } 
        else 
        {
          // console.log('handleNoCollections')
          let obj = {
            'first_publication': d.attributes.first_publication,
            'rem': one_rem
          }
          d.attributes.collectionsTooltip = [obj];
        }
        return [d];
      })
      .enter()
      .append('g')
      .attr('class', 'label');

    // Append title
    let labelTitle = this.label
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('font-family', 'Crimson Text')
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
    let labelCollectionsYears = this.label
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('x', function(d) { return 0; })
      .attr('y', parseInt(d3.select('html').style('font-size')) + 1.5)
      .attr('font-size', '0.8rem')
      .selectAll('.labels-collections-years')
      .data(d => d.attributes.collectionsTooltip)
      .enter()
      .append('tspan')
      .attr('dx', (d, i) => i !== 0 ? d.rem / 2 : 0)
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

    centerTerritory(scale, 0, 0, 0);

    //Zoom functions
    function zoom_actions() 
    {
      g.attr("transform", d3.event.transform);
  		metaball_group.attr("transform", d3.event.transform);
  //		place_hierarchies_group.attr("transform", d3.event.transform);
  //		place_hierarchies_group_2.attr("transform", d3.event.transform);
      d3_event_transform_k = d3.event.transform.k;

  		V.label.attr('transform', function(d) {
  			let one_rem = parseInt(d3.select('html').style('font-size'));
  			let k = one_rem * (1 / (d3.event.transform.k / scale));
  			let dy = tilt ? 0 : (d.steps.length + 5) * step_increment;
        let translate_string = data.mode !== "realismo-third-lvl" ? 'translate(0,' + dy + ') ' : "";
        
        if(tilt) return translate_string + 'scale(' + k + ',' + k + ')';
        else return translate_string + 'scale(' + k + ',' + k * 1 / 0.5773 + ')';
  		});
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
            .translate((w / 2) + x, (h / 2) + y)
            .scale(scale));
    }

    this.textsData = input_data.textsData;
  };

  destroy = () => {};

  calculateHillStepTranslation = (d, i) => 
  {
    i = i * step_increment;

    return "translate(0," + i + ")";
  }  

  setColor = color => { 
    d3
      .selectAll("circle")
      .attr("fill", color);
  };

  set_yRatio = yRatio => {
    d3
      .selectAll(".node")
      .transition()
      .duration(2000)
      .attr("transform", d => {
        return "scale(1, " + yRatio + ") translate(" + (d.x - center.x) + "," + (d.y - center.y) + ")"
      });

    if(yRatio === 1) tilt = true;
    else tilt = false;

    let label = this.text_nodes
      .selectAll('.label');   

    label.attr('transform', function(d) {

      let one_rem = parseInt(d3.select('html').style('font-size'));
      let k = one_rem * (1 / (d3_event_transform_k / scale));
      let dy = tilt ? 0 : (d.steps.length + 5) * step_increment;
      let translate_string = data.mode !== "realismo-third-lvl" ? 'translate(0,' + dy + ') ' : "";

      if(tilt) return translate_string + 'scale(' + k + ',' + k + ')';
      else return translate_string + 'scale(' + k + ',' + k * 1 / 0.5773 + ')';
    });

  };

  showHillsTops = opacity => d3
    .selectAll(".circle_node")
    .filter(d => !d.first_elem)
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
  }  

  applySearchFilterByInputText = inputText => {

    const inputLowerCase = inputText.toLowerCase();

console.log("this.textsData : ", this.textsData);    

    const results = this.textsData.options.filter(d => d.desc.toLowerCase().includes(inputLowerCase));

    this.applySearchFilterBySearchResults(results);
  }

  applySearchFilterBySearchResults = searchResults => {

    this.text_nodes.style("opacity", .35);

    this.label.classed("visible", false);

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

  // 1 : first publication year; 2 : collection
  setHillColoringMode = value => {
    this.hillColoringMode = value;
    this.highlightHills();
  };

  setHighlightMode = value => {
console.log("setHighlightMode");
console.log("value : ", value);
console.log("GlobalData.commands.territory.doubt.fog : ", "*" + GlobalData.commands.territory.doubt.fog + "*");
    switch(value)
    {
      case GlobalData.commands.territory.doubt.fog :
      case GlobalData.commands.territory.doubt.cancellation :
      case GlobalData.commands.territory.doubt.all :
console.log("tilting");
        this.set_yRatio(1);      

        const highlightParameters = this.highlightModeMap.get(value);

        this.highlightHills(highlightParameters.filterCondition, highlightParameters.colorScale);

        this.showHillsTops(0);

        break;

      case GlobalData.commands.territory.doubt.percentage :

        this.set_yRatio(1);        

        this.showDonuts();

        this.showHills(0);

        break;

      default : break;
    }
  };

  highlightHills = (filterCondition, colorScale) => {

    const allHills = d3.selectAll(".hill");

    if(!filterCondition)
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
      .filter(d => !d[filterCondition])
      .transition()
      .duration(350)
      .style("fill", d => "transparent");

    allHills
      .filter(d => d[filterCondition])
      .transition()
      .duration(350)
      .style("fill", d => colorScale(d[filterCondition]));
  };

  showDonuts = () => {
		this.text_nodes
			.selectAll('.dubitativePhenomena_level_2')
			.style('fill-opacity', 1)
			.style('stroke-opacity', 1);
  }

  
}


/*
function create_item_steps(d)
{
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
*/
/*
function prepareMetaballData(json_nodes, collection, lineColor) 
{
	let flattened_steps = flatten_items_steps(json_nodes);
}

function flatten_items_steps(nodes) 
{
	let flattened_steps = [];

	for(let i = 0; i < nodes.length; ++i) {
		let node = nodes[i];

		for(let j = 0; j < node.steps.length; ++j) {
			let step = node.steps[j];

			let item = {
				id: step.id,
				x: node.x,
				y: node.y,

				r: step.r,
				steps_length: node.steps.length,
				step: step,

				collections: node.attributes.collections,
				first_elem: step.first_elem,
				last_elem: step.last_elem,
				n_steps: step.n_steps,
				first_publication: step.first_publication,
				generico_non_terrestre: step.generico_non_terrestre,
				generico_terrestre: step.generico_terrestre,
				inventato: step.inventato,
				no_ambientazione: step.no_ambientazione,
				nominato_non_terrestre: step.nominato_non_terrestre,
				nominato_terrestre: step.nominato_terrestre,

				nebbia_normalizzata: step.nebbia_normalizzata,
				cancellazione_normalizzata: step.cancellazione_normalizzata,

				nebbia: step.nebbia,
				cancellazione: step.cancellazione,

				norma_pct_caratteri_nebbia_cancellazione: step.norma_pct_caratteri_nebbia_cancellazione,

				nebbia_words_ratio: step.nebbia_words_ratio,
				cancellazione_words_ratio: step.cancellazione_words_ratio,
				dubitative_ratio: step.dubitative_ratio
			};

			flattened_steps.push(item);
		}
	}

	return flattened_steps;
}

function array_intersection(a1, a2) 
{
	let result = [];

	if(a1 === undefined || a1.length === 0 || a2 === undefined || a2.length === 0) return result;

	for(let i = 0; i < a1.length; ++i) {
		let item = a1[i];

		if(a2.includes(item))
			result.push(item);
	}

	return result;
}
*/
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

const V = new VClass();

export default V;