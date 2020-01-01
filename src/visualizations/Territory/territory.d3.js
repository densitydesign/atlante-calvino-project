
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
let center;

class VClass
{
  initialize = (el, input_data) => {
    if(!input_data.json_nodes || input_data.json_nodes === "data still not loaded") return;

    let json_nodes = input_data.json_nodes;
    data.x_csv2 = input_data.x_csv2;

    let w = window.innerWidth;
    let h = window.innerHeight - 6;
    svg = d3.select(el).style("touch-action", "manipulation");

    const collections = getCollections();
    const allowedCollections = data.allowedCollections.split(",");

    json_nodes = json_nodes.filter(function(item) {

      return (
        data.allowedCollections = "all" ||
        (allowedCollections.includes("undefined") && item.attributes.collections == undefined) ||
        array_intersection(allowedCollections, item.attributes.collections).length > 0
      );

    });

    json_nodes.forEach(
      function(n)
      {
        // fix orientation of the viz
        n.y *= -1;
        // n.x*=-1;
        // handle collections
        if(n.attributes.collections) {
          n.attributes.collections = n.attributes.collections.split(';');
          // remove last element which is always empty due to the fat that all records end with a ";"
          n.attributes.collections.pop();
        } else {
          n.attributes.collections = [];
        }
      });

    // sort json_nodes so to have the upper in the background and not covering the ones in the foreground
    json_nodes = json_nodes.sort((a, b) => a.y - b.y);

    const size_ext = d3.extent(json_nodes, d => d.size);
    data.min_size = size_ext[0] / 8;

    json_nodes.forEach(create_item_steps);
  console.log("json_nodes : ", json_nodes);
    const svg_main_group = svg.append("g");

    const g = svg_main_group.append("g").attr("class", "nodes");

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

    this.colour = d3
      .scaleLinear()
      .domain(d3.extent(json_nodes, function(d) { return d.attributes.first_publication; }))
      .range(["#ff6347", "#455A64"]);

    this.col_collections = d3
      .scaleOrdinal()
      .domain(collections.map(d => d.id))
      .range(collections.map(d => d.c))
      .unknown('transparent');

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

    //add zoom capabilities
    var zoom_handler = d3.zoom()
      .on("zoom", zoom_actions);

    zoom_handler(svg);

    let usedSpace = 0.65;
    let scale = ((w * usedSpace) / (boundaries.right - boundaries.left)) * 0.9;

    centerTerritory(scale, 0, 0, 0);

    //Zoom functions
    function zoom_actions() {
      g.attr("transform", d3.event.transform);
  //		metaball_group.attr("transform", d3.event.transform);
  //		place_hierarchies_group.attr("transform", d3.event.transform);
  //		place_hierarchies_group_2.attr("transform", d3.event.transform);
  //		label.attr('transform', function(d) {
  //			let one_rem = parseInt(d3.select('html').style('font-size'));
  //			let k = one_rem * (1 / (d3.event.transform.k / scale));
  //			let dy = (d.steps.length + 5) * step_increment;
  //			let translate_string = data.mode != "realismo-third-lvl" ? 'translate(0,' + dy + ') ' : "";
  //			return translate_string + 'scale(' + k + ',' + k * 1 / 0.5773 + ')';
  //		});
    }

    // Handle interface interactions
    function centerTerritory(scale, x, y, duration) {
      svg.transition()
        .duration(duration)
        .call(zoom_handler.transform, d3.zoomIdentity
          .translate((w / 2) + x, (h / 2) + y)
          .scale(scale)
        );
    }

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

    const step_increment = -23;

    steps
      .append("circle")
      .attr("class", "circle_node hill")
      .attr("stroke", "black")
      .attr("stroke-width", 1.5)
//      .attr("fill", "tomato")
      .attr("first_elem", d => d.first_elem)
      .attr("r", d => d.r)
      .attr("transform", function(d, i) {
        i = i * step_increment;
        return "translate(0," + i + ")";
      })
      .style("fill-opacity", 1)
      .style("stroke-opacity", .5);

    this.setHillColoringMode(1);
  };

  destroy = () => {};

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
  };

  showHillsTops = opacity => d3
    .selectAll(".circle_node")
    .filter(d => !d.first_elem)
    .transition()
    .duration(2000)
    .style("fill-opacity", opacity)
    .style("stroke-opacity", opacity);

  // 1 : first publication year; 2 : collection
  setHillColoringMode = value => {
    this.hillColoringMode = value;
    this.highlightHills();
  };

  highlightModeMap = new Map([
    [ "nebbia", { filterCondition : 'nebbia_words_ratio', colorScale : this.nebbia_color_scale } ],
    [ "cancellazione", { filterCondition : 'cancellazione_words_ratio', colorScale : this.cancellazione_color_scale } ],
    [ "generici non terrestri", { filterCondition : 'n_generico_non_terrestre', colorScale : this.generico_non_terrestre_color_scale } ],
    [ "nominati non terrestri", { filterCondition : 'n_nominato_non_terrestre', colorScale : this.nominato_non_terrestre_color_scale} ],
    [ "generici terrestri", { filterCondition : 'n_generico_terrestre', colorScale : this.generico_terrestre_color_scale} ],
    [ "nominati terrestri", { filterCondition : 'n_nominato_terrestre', colorScale : this.nominato_terrestre_color_scale} ],
    [ "inventati", { filterCondition : 'n_inventato', colorScale : this.inventato_color_scale} ],
    [ "senza ambientazione", { filterCondition : 'n_no_ambientazione', colorScale : this.no_ambientazione_color_scale} ]
  ]);

  setHighlightingMode = value => {
    const highlightParameters = this.highlightModeMap.get(value);

    this.highlightHills(highlightParameters.filterCondition, highlightParameters.colorScale);
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
        case 2 : allHills.style("fill", d => this.col_collections(d.collection)); break;
      }

      return;
    }

    allHills
      .filter(d => !d[filterCondition])
      .transition()
      .duration(350)
      .style("fill", "transparent");

    allHills
      .filter(d => d[filterCondition])
      .transition()
      .duration(350)
      .style("fill", d => colorScale(d[filterCondition]));
  };
}

function interpolateSpline(x) 
{
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

function create_item_steps(d)
{
console.log("create_item_steps...");
	// reverse the order of collections, so to have the older ones at the bottom of the hills
	d.attributes.collections = d.attributes.collections.reverse()

	d.steps = [];
	// get different radii
console.log("data.min_size : ", data.min_size);
	for(var jj = (data.min_size); jj <= d.size; jj += data.min_size) {
		let new_step_size = jj;
		let ratio = new_step_size / d.size;
		new_step_size = d.size * interpolateSpline(ratio);
		d.steps.push(new_step_size);
	}
console.log("d.steps.length() : ", d.steps.length);

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

	if(a1 == undefined || a1.length == 0 || a2 == undefined || a2.length == 0) return result;

	for(let i = 0; i < a1.length; ++i) {
		let item = a1[i];

		if(a2.includes(item))
			result.push(item);
	}

	return result;
}

function getCollections() 
{
	const collections = [
    {
			'n': 'Il sentiero dei nidi di ragno',
			'id': 'V001',
			'year': 1947,
			'c': '#AEB6BF',
			'has_metaball': false
		},
		{
			'n': 'Ultimo viene il corvo',
			'id': 'V002',
			'year': 1949,
			'c': '#e9d05d',
			'has_metaball': true,
			'concavityTolerance': 1.1
		},
		{
			'n': 'Il visconte dimezzato',
			'id': 'V003',
			'year': 1952,
			'c': '#AEB6BF',
			'has_metaball': false
		},
		{
			'n': 'L\'entrata in guerra',
			'id': 'V004',
			'year': 1954,
			'c': '#12b259',
			'has_metaball': true,
			'concavityTolerance': 1.1
		},
		{
			'n': 'Il barone rampante',
			'id': 'V005',
			'year': 1957,
			'c': '#AEB6BF',
			'has_metaball': false
		},
		{
			'n': 'I racconti',
			'id': 'V006',
			'year': 1958,
			'c': '#476a70',
			'has_metaball': true,
			'concavityTolerance': 1.2
		},
		{
			'n': 'La formica argentina',
			'id': 'V007',
			'year': 1957,
			'c': '#AEB6BF',
			'has_metaball': false
		},
		{
			'n': 'Il cavaliere inesistente',
			'id': 'V008',
			'year': 1959,
			'c': '#AEB6BF',
			'has_metaball': false
		},
		{
			'n': 'La giornata di uno scrutatore',
			'id': 'V009',
			'year': 1963,
			'c': '#AEB6BF',
			'has_metaball': false
		},
		{
			'n': 'La speculazione edilizia',
			'id': 'V010',
			'year': 1963,
			'c': '#AEB6BF',
			'has_metaball': false
		},
		{
			'n': 'Marcovaldo',
			'id': 'V011',
			'year': 1963,
			'c': '#9f73b2',
			'has_metaball': true,
			'concavityTolerance': 1.1
		},
		{
			'n': 'La nuvola di smog e la formica argentina',
			'id': 'V012',
			'year': 1965,
			'c': '#AEB6BF',
			'has_metaball': false
		},
		{
			'n': 'Le cosmicomiche',
			'id': 'V013',
			'year': 1965,
			'c': '#e89fc0',
			'has_metaball': true,
			'concavityTolerance': 1.1
		},
		{
			'n': 'Ti con zero',
			'id': 'V014',
			'year': 1967,
			'c': '#581745',
			'has_metaball': true,
			'concavityTolerance': 1.2
		},
		{
			'n': 'La memoria del mondo',
			'id': 'V015',
			'year': 1968,
			'c': '#00b1b3',
			'has_metaball': true,
			'concavityTolerance': 1.1
		},
		{
			'n': 'Il castello dei destini incrociati',
			'id': 'V016',
			'year': 1969,
			'c': '#AEB6BF',
			'has_metaball': false
		},
		{
			'n': 'Gli amori difficili',
			'id': 'V017',
			'year': 1970,
			'c': '#f0be96',
			'has_metaball': true,
			'concavityTolerance': 1.1
		},
		{
			'n': 'Le città invisibili',
			'id': 'V018',
			'year': 1972,
			'c': '#AEB6BF',
			'has_metaball': false
		},
		{
			'n': 'Il castello dei destini incrociati (riedizione)',
			'id': 'V019',
			'year': 1973,
			'c': '#AEB6BF',
			'has_metaball': false
		},
		{
			'n': 'Eremita a Parigi',
			'id': 'V020',
			'year': 1974,
			'c': '#AEB6BF',
			'has_metaball': false
		},
		{
			'n': 'Se una notte d\'inverno un viaggiatore',
			'id': 'V021',
			'year': 1979,
			'c': '#AEB6BF',
			'has_metaball': false
		},
		{
			'n': 'Palomar',
			'id': 'V022',
			'year': 1983,
			'c': '#94d2ba',
			'has_metaball': true,
			'concavityTolerance': 1.1
		},
		{
			'n': 'Cosmicomiche vecchie e nuove',
			'id': 'V023',
			'year': 1984,
			'c': '#f1634b',
			'has_metaball': true,
			'concavityTolerance': 1.2
		}
  ];
  
	return collections;
}

const V = new VClass();

export default V;