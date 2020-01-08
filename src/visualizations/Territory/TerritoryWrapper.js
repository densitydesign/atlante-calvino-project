
import React from 'react';
import * as d3 from 'd3';

import Territory from './Territory';
import TerritoryHeader from '../../headers/TerritoryHeader/TerritoryHeader';
import TerritoryBottomPanel from '../../panels/TerritoryBottomPanel/TerritoryBottomPanel';
import TerritoryStepsPanel from '../../panels/TerritoryStepsPanel/TerritoryStepsPanel';
import TerritoryFooter from '../../footers/TerritoryFooter/TerritoryFooter';

import './TerritoryWrapper.css';

export default class TerritoryWrapper extends React.Component
{
  state = {
    data : "data still not loaded",
    isLoading : true
  };

  loadData = () =>
  {
    d3.csv(process.env.PUBLIC_URL + "/territory_texts_data.csv").then(csv => {

      let x_csv2 = csv.reduce(map_item_data, {});

      d3.json(process.env.PUBLIC_URL + "/territory_graphical_data.json").then(json => {

        // all : all collections; undefined for texts with undefined collection; V002,V014 (no spaces) for setting some collection ids for filtering (you can also put undefined in this list)
        const allowedCollections = "all";

        const json_nodes = process_json_nodes(json.nodes, x_csv2, allowedCollections);

        this.setState({
          data : { json_nodes : json_nodes, x_csv2 : x_csv2 },
          isLoading : false
        });
      });
    });
  }

  componentDidMount()
  {
    this.loadData();
  }

  containerSetTerritorySetHighlightMode = callback => this.territorySetHighlightMode = callback;
  callTerritorySetHighlightMode = value => this.territorySetHighlightMode(value);

  containerSetTerritorySetHillColoringMode = callback => this.territorySetHillColoringMode = callback;

  containerSetTerritoryShowHills = callback => this.territoryShowHills = callback;
  callTerritoryShowHills = opacity => this.territoryShowHills(opacity);

  containerSetTerritorySetDataExtent = callback => this.territorySetDataExtent = callback;
  callTerritorySetDataExtent = extent => this.territorySetDataExtent(extent);

  containerSetTerritoryApplyBeeSwarmFilter = callback => this.territoryApplyBeeSwarmFilter = callback;
  callTerritoryApplyBeeSwarmFilter = () => this.territoryApplyBeeSwarmFilter();

  hillColoringModeMap = new Map([
    [ "cronologia", 1],
    [ "volume", 2 ]
  ]);  

  callTerritorySetHillColoringMode = value =>
    this.territorySetHillColoringMode(this.hillColoringModeMap.get(value));

  render() {

console.log("TerritoryWrapper.render()");
console.log("data : ", this.state.data);

if(this.callTerritoryApplyBeeSwarmFilter)
{
  console.log("TerritoryWrapper.render() - this.callTerritoryApplyBeeSwarmFilter has value");
}
else
{
  console.log("TerritoryWrapper.render() - this.callTerritoryApplyBeeSwarmFilter null");
}

    return (
      <div className="main">
        <TerritoryHeader callTerritorySetHillColoringMode={this.callTerritorySetHillColoringMode} />

        <div className="territory-body">

          {!this.state.isLoading && 

            <>

              <Territory 
                data={this.state.data} 
                containerSetTerritorySetHighlightMode={this.containerSetTerritorySetHighlightMode} 
                containerSetTerritorySetHillColoringMode={this.containerSetTerritorySetHillColoringMode}
                containerSetTerritoryShowHills={this.containerSetTerritoryShowHills}
                containerSetTerritorySetDataExtent={this.containerSetTerritorySetDataExtent}
                containerSetTerritoryApplyBeeSwarmFilter={this.containerSetTerritoryApplyBeeSwarmFilter}
              /> 

              <TerritoryBottomPanel 
                data={this.state.data}
                callTerritoryShowHills={this.callTerritoryShowHills}
                callTerritorySetDataExtent={this.callTerritorySetDataExtent}
                callTerritoryApplyBeeSwarmFilter={this.callTerritoryApplyBeeSwarmFilter}
              />
            
            </>

            }

     {/*     <TerritoryStepsPanel callTerritorySetHighlightMode={this.callTerritorySetHighlightMode} /> */}

        </div>

        <TerritoryFooter callTerritorySetHighlightMode={this.callTerritorySetHighlightMode} />

      </div>
    );
  }
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

function process_json_nodes(json_nodes, x_csv2, allowedCollections)
{
  const allowedCollectionsSplit = allowedCollections.split(",");

  json_nodes = json_nodes.filter(function(item) {

    return (
      allowedCollections = "all" ||
      (allowedCollectionsSplit.includes("undefined") && item.attributes.collections == undefined) ||
      array_intersection(allowedCollectionsSplit, item.attributes.collections).length > 0
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

  const json_nodes_size_extent = d3.extent(json_nodes, d => d.size);
  const json_nodes_min_size = json_nodes_size_extent[0] / 8;

  json_nodes.forEach(d => create_item_steps(d, json_nodes_min_size, x_csv2));

  return json_nodes;
}

function create_item_steps(d, json_nodes_min_size, x_csv2)
{
  // reverse the order of collections, so to have the older ones at the bottom of the hills
  d.attributes.collections = d.attributes.collections.reverse()

  d.steps = [];
  // get different radii
  for(var jj = (json_nodes_min_size); jj <= d.size; jj += json_nodes_min_size) {
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
    let csv_item = x_csv2[d.id];

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

function map_item_data(map, obj)
{
  map[obj.id] = calculate_item_data(obj);

  return map;    
};

function calculate_item_data(obj) 
{
  const lists_sum = (+obj.n_lists_f) + (+obj.n_lists_m) + (+obj.n_lists_p) + (+obj.n_lists_s);
  const text_length = +obj.text_length;
  const lists_ratio_threshold = 0.04;
  const lists_ratio = lists_sum / text_length;

  let item_data = {
    generico_non_terrestre: (+obj.generico_non_terrestre),
    generico_non_terrestre_abs: +obj.generico_non_terrestre,
    n_generico_non_terrestre: +obj.n_generico_non_terrestre,

    generico_terrestre: (+obj.generico_non_terrestre) + (+obj.generico_terrestre),
    generico_terrestre_abs: +obj.generico_terrestre,
    n_generico_terrestre: +obj.n_generico_terrestre,

    inventato: (+obj.generico_non_terrestre) + (+obj.generico_terrestre) + (+obj.inventato),
    inventato_abs: +obj.inventato,
    n_inventato: +obj.n_inventato,

    no_ambientazione: (+obj.generico_non_terrestre) + (+obj.generico_terrestre) + (+obj.inventato) + (+obj.no_ambientazione),
    no_ambientazione_abs: +obj.no_ambientazione,
    n_no_ambientazione: +obj.n_no_ambientazione,

    nominato_non_terrestre: (+obj.generico_non_terrestre) + (+obj.generico_terrestre) + (+obj.inventato) + (+obj.no_ambientazione) + (+obj.nominato_non_terrestre),
    nominato_non_terrestre_abs: +obj.nominato_non_terrestre,
    n_nominato_non_terrestre: +obj.n_nominato_non_terrestre,

    nominato_terrestre: (+obj.generico_non_terrestre) + (+obj.generico_terrestre) + (+obj.inventato) + (+obj.no_ambientazione) + (+obj.nominato_non_terrestre) + (+obj.nominato_terrestre),
    nominato_terrestre_abs: +obj.nominato_terrestre,
    n_nominato_terrestre: +obj.n_nominato_terrestre,

    nebbia_normalizzata: (+obj.pct_nebbia_normalizzata),
    cancellazione_normalizzata: (+obj.pct_cancellazione_normalizzata),

    nebbia: (+obj.pct_nebbia / 100),
    cancellazione: (+obj.pct_nebbia / 100) + (+obj.pct_cancellazione / 100),

    norma_pct_caratteri_nebbia_cancellazione: (+obj.norma_pct_caratteri_nebbia_cancellazione),

    nebbia_words_ratio: (+obj.nebbia_words_ratio),
    cancellazione_words_ratio: (+obj.cancellazione_words_ratio),
    dubitative_ratio: (+obj.dubitative_ratio),

    lists_f_ratio: lists_sum == 0 ? 0 : (+obj.n_lists_f) / lists_sum,
    lists_m_ratio: lists_sum == 0 ? 0 : ((+obj.n_lists_f) + (+obj.n_lists_m)) / lists_sum,
    lists_p_ratio: lists_sum == 0 ? 0 : ((+obj.n_lists_f) + (+obj.n_lists_m) + (+obj.n_lists_p)) / lists_sum,
    lists_s_ratio: lists_sum == 0 ? 0 : ((+obj.n_lists_f) + (+obj.n_lists_m) + (+obj.n_lists_p) + (+obj.n_lists_s)) / lists_sum,

    lists_are_present: lists_sum > 0,
    lists_ratio_with_threshold: Math.max(lists_ratio_threshold, lists_ratio),
    lists_ratio_is_below_threshold: lists_ratio < lists_ratio_threshold,

//		places_hierarchy: data.place_hierarchies.get(obj.id),
//		place_hierarchy: data.place_hierarchies.get(obj.id)
  };

//	if(item_data.place_hierarchy)
//	{
//		item_data.place_hierarchy.n_steps = obj.n_steps;
//	}
//let s = item_data.places_hierarchy ? item_data.places_hierarchy.children.length : "";
//console.log(obj.id + " : " + s);
//let s = item_data.place_hierarchy ? item_data.place_hierarchy.children.length : "";
  // console.log("lists_sum : " + lists_sum + ", item_data.lists_f_ratio : " + item_data.lists_f_ratio);

  return item_data;
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
