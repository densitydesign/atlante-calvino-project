
import React from 'react';
import * as d3 from 'd3';

import Territory from './Territory';
import AtlasIntroHeader from '../../headers/AtlasIntroHeader/AtlasIntroHeader';
import TerritoryFooter from '../../footers/TerritoryFooter/TerritoryFooter';

export default class TerritoryWrapper extends React.Component
{
  state = {
    data : "data still not loaded",
    isLoading : true
  };

  loadData()
  {
    d3.csv(process.env.PUBLIC_URL + "/territory_texts_data.csv").then(csv => {

console.log("csv", csv);

    let x_csv2 = [];
/*
      let x_csv2 = csv.reduce(
        function(map, obj) {
          map[obj.id] = this.calculate_item_data(obj);

          return map;
        }, {});
*/
      d3.json(process.env.PUBLIC_URL + "/territory_graphical_data.json").then(json => {
        const json_nodes = json.nodes;
        this.setState({
          data : {  json_nodes : json_nodes, x_csv2 : x_csv2 },
          isLoading : false
        });
      });
    });
  }

  componentDidMount()
  {
    this.loadData();
  }

  render() {
    return (
      <div className="main">
        <AtlasIntroHeader />
        {!this.state.isLoading && <Territory data={this.state.data} /> }

      </div>
    );
  }

  calculate_item_data = obj => {
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
}
