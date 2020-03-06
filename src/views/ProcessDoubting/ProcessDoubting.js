import React, { Component } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

import './ProcessDoubting.css'

import GlobalData from '../../utilities/GlobalData';

import MainMenu from '../../general/MainMenu';
import PageTitle from '../../general/PageTitle';
import MoreInfo from '../../general/MoreInfo';
import CompassButton from '../../general/CompassButton/CompassButton';
import HelpSidePanel from '../../panels/HelpSidePanel/HelpSidePanel';

import Loading from '../../general/Loading';
import Options from '../../general/Options';
import Search from '../../general/Search';
import SearchDropDown from "../../general/Search/SearchDropDown";
import RangeFilter from '../../general/RangeFilter';

import DoubtingStackedBars from '../../visualizations/DoubtingStackedBars/DoubtingStackedBars';

const structureData = (arr) => {
  arr = arr.map((d,i)=>{
    const obj = {
      'id': 'pair-'+i,
      'subj_start': +d.soggetto_starts_at,
      'subj_end': +d.soggetto_ends_at,
      'doubt_start': +d.starts_at,
      'doubt_end': +d.ends_at,
      'is_alternative': (d['Alternative']!=='')?true:false,
      'alternatives': [],
      'has_children': false,
      'open': false,
      'level':0,
      'depth':0
    }
    return obj;
  })

  for (var i=arr.length-1; i>-1; i--) {
    const d = arr[i];
    if (d.is_alternative) {

      const alternative_data = {
        'start': +d.doubt_start,
        'end': +d.doubt_end,
      }

      d.alternatives.push(alternative_data)
      d.alternatives = d.alternatives.sort((a,b)=>a.start-b.start)

      if (i > 1 && arr[i-1].is_alternative) {
        // console.log('preserve', arr[i-1].id, 'remove', d.id)
        arr[i-1].alternatives = d.alternatives
        // arr[i-1].doubt_end = +d.doubt_end
        // do not return the current element
        // its information are inside "arr[i-1]"
        arr.splice(i,1)
      } else {
        d.doubt_end = d.alternatives[d.alternatives.length-1].end
      }
    }
  }
  // console.log(arr);

  let counter = 0;

  const identifyParent = (d,list) => {
    counter++;
    const listToSearchForParent = list.filter( dd => +d.id.replace('pair-','') < +dd.id.replace('pair-','') )

    const parent = listToSearchForParent.find(dd=>{

      const subj_start_is_inside = d.subj_start >= dd.subj_start && d.subj_start <= dd.subj_end || d.subj_start >= dd.doubt_start && d.subj_start <= dd.doubt_end

      const subj_end_is_inside = d.subj_end >= dd.subj_start && d.subj_start <= dd.subj_end || d.subj_end >= dd.doubt_start && d.subj_start <= dd.doubt_end

      const doubt_start_is_inside = d.doubt_start >= dd.doubt_start && d.doubt_start <= dd.doubt_end || d.doubt_start >= dd.subj_start && d.doubt_start <= dd.subj_end

      const doubt_end_is_inside = d.doubt_end >= dd.doubt_start && d.doubt_start <= dd.doubt_end || d.doubt_end >= dd.subj_start && d.doubt_start <= dd.subj_end

      return subj_start_is_inside || subj_start_is_inside || doubt_start_is_inside || doubt_end_is_inside
    })

    if (parent) { //  && list.indexOf(parent)>list.indexOf(d)
      // console.log('parent for', d.id, 'is', parent.id)

      if(counter<1000) {
        if (!parent.parent) {
          const listToSearch = list.filter((dd,ii)=>+parent.id.replace('pair-','')<+dd.id.replace('pair-',''))
          // console.log('📏 list to search length', listToSearch.length)
          identifyParent(parent, listToSearch)
          // console.log(d.id, 'is level', d.level)
        } else {
          // console.log('🚨', parent.id, 'already has a parent')
        }
        parent.has_children = true;
        d.parent = parent;
        d.level = parent.level+1
      }

    } else {
      // console.log(d.id, 'has no parent')
      // console.log(d.id, 'is level', d.level)
    }
    return parent;
  }

  // check if a pair is inside another
  arr.forEach((d,i)=>{
    const child = d;
    // console.log(' ')
    // console.log('👉', child.id)
    identifyParent(child, arr)
  })

  // // set level of depth
  arr.forEach((element, i) => {
    // console.log('👉', element.id)
    let depth = 0
    retrieveDepth(element);

    element.depth=depth;
    function retrieveDepth(item) {
      if (item.has_children) {
        let children = arr.filter(d=>d.parent).filter(d=>d.parent===item)
        // console.log(children)
        if (children.length>0) {
          children.forEach((child, i) => {
            depth = Math.max(depth, child.level)
            retrieveDepth(child);
          });
        }
      }
    }
  });

  return arr;
}

class ProcessDoubting extends Component {
  constructor(props) {
    super(props);
    this.loadData = this.loadData.bind(this);
    this.changeLunghezzaTesti = this.changeLunghezzaTesti.bind(this);
    this.legendHighlight = this.legendHighlight.bind(this);

    this.changeCercaPer = this.changeCercaPer.bind(this);
    this.changeRicerca = this.changeRicerca.bind(this);
    this.changeTimeSpan = this.changeTimeSpan.bind(this);
    this.changePubblicazioni = this.changePubblicazioni.bind(this);
    this.changeAnnidamenti = this.changeAnnidamenti.bind(this);

    this.applyFilters = this.applyFilters.bind(this);

    this.state = {
      data: 'data still not loaded',
      isLoading: true,
      stackMode: "normalized",
      lunghezzaTesti: {
				multiple: false,
				options: [{
					'label': 'assoluti',
					'status': false
				}, {
					'label': 'normalizzati',
					'status': true
				}]
      },
      data_research: [],
      cerca_per: {
				multiple: false,
				options: [
          {
					'label': 'titolo',
					'status': true
          },
          {
            'label': 'titolo pubblicazione',
            'status': false
          }
        ]
      },
      pubblicazioni: {
        multiple: true,
        options: [
          {
					'label': 'altro',
					'status': true
          },
          {
            'label': 'raccolta',
            'status': true
          },
          {
            'label': 'romanzo',
            'status': true
          }
        ]
      },
    }
  }

  loadData() {
    // data comes from this notebook on ObservableHQ
    // https://observablehq.com/@iosonosempreio/data-dubbio-fase-due
    d3.json(process.env.PUBLIC_URL + '/data-process-doubting.json').then(json=>{
      json = json.filter(d=>d.id!=='V002'&&d.id!=='V004'&&d.id!=='V006'&&d.id!=='V007'&&d.id!=='V011'&&d.id!=='V012'&&d.id!=='V013'&&d.id!=='V014'&&d.id!=='V015'&&d.id!=='V017'&&d.id!=='V019'&&d.id!=='V022'&&d.id!=='V023'&&d.id!=='S088');
      // json = json.filter(d=>d.id==="S153");
      json.forEach(d=>{
        d.details = structureData(d.details);
        d.maxDepth = d3.max(d.details, d=>d.depth)||0;
      });
      return json;
    }).then(data=>{
      data = data.sort( (a,b)=> +a.year - b.year );

      const lpad = function(s, width, char) {
        return (s.length >= width) ? s : (new Array(width).join(char) + s).slice(-width);
      } 
      data.forEach((d,i)=>d.id_index = lpad(i+1,5,0));

      let publicationTitle = d3.nest().key(d => d.destination).entries(GlobalData.publications).map(d => {
        return {
					'label': d.key = GlobalData.allVolumes.find(dd=>dd.id===d.key)?GlobalData.allVolumes.find(dd=>dd.id===d.key).label:d.key,
					'id': d.values.map(dd => dd.id),
					'status': true
				}
      });

      let searchByCompositionTitle = data.map(d=>{
				return {
					'label': d.title,
					'id': [d.id],
          'value': d.id, // to be used by SearchDropDown
					'status': true
				}        
      });

      let data_research = {
        titolo: searchByCompositionTitle,
        "titolo pubblicazione": publicationTitle
      };

      const annidamenti_options = d3.nest().key(d=>d).entries(data.map(d=>d.maxDepth)).map(d=>{return {'label':d.key,'status':false}}).sort((a,b)=>+a.label-b.label);

      // need to convert date to milliseconds for the timespan filter to work
      const timeExtent = d3.extent(data, d => +new Date(d.year));

      this.setState({
        data: data,
        filters: {
          'all': data.map(d=>d.id)
        },
        isLoading: false,
        data_research: data_research,
        ricerca: {
          options: data_research.titolo
        },
        timeExtent: timeExtent,
        annidamenti: {
          multiple: true,
          options: annidamenti_options
        }
      })
    })
  }

  changeLunghezzaTesti(newOptions) {
    let option;
    switch (newOptions.find(d=>d.status).label){
      case "assoluti":
        option = "absolute";
        break;
      case "normalizzati":
        option = "normalized";
        break;
    }
    this.setState({ stackMode: option });
  }

  componentDidMount() {
    this.loadData();
    
    d3.selectAll("#doubting-stacked-bars-legend .item").on("click", function(){
      console.log(this)
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.filters !== this.state.filters) {
      this.applyFilters();
    }
  }
  
  legendHighlight(category) {
    console.log(category)
  }

  changeCercaPer(newOptions) {
		let selection = newOptions.filter(d => d.status)
		if(selection.length < 1) {
			console.error('err');
			return;
		}
		selection = selection[0].label
		// console.log(selection)

		let research_options = this.state.data_research[selection];

		this.setState(prevState => ({
			cerca_per: {
				...prevState.cerca_per,
				options: newOptions
			},
			ricerca: {
				...prevState.ricerca,
				options: research_options
			}
		}))
  }
  
  changeRicerca(newOptions) {

    console.log("survive search:", newOptions);
    
    let toPreserve = newOptions.map(d => d.id);
    toPreserve = _.flattenDeep(toPreserve);

    // console.log(toPreserve)
    
    if (!toPreserve.length) {
      console.warn("Can't filter against an empty array");
      this.setState(prevState => ({
        filters: {
          ...prevState.filters,
          ricerca: prevState.filters.all
        }
      }));
      return;
    } else {
      this.setState(prevState => ({
        filters: {
          ...prevState.filters,
          ricerca: toPreserve
        }
      }));
    }  
  }
  
  changeTimeSpan(newOptions) {
    let toPreserve = this.state.data.filter(d=>{
      let year = +new Date(d.year)
      return year>=newOptions[0] && year<=newOptions[1];
    }).map(d=>d.id);

		if (!toPreserve.length) {
      console.warn("Can't filter against an empty array");
      return;
    } else {
      this.setState(prevState => ({
        filters: {
          ...prevState.filters,
          timeSpan: toPreserve
        }
      }));
    }   
  }

  changePubblicazioni(newOptions) {
    const types = newOptions.filter(d=>d.status).map(d=>d.label);
    let ids = GlobalData.publications_simple.filter(d=>_.intersection(d.types, types).length > 0).map(d=>d.id);

    // ids = d3.nest().key(d=>d).entries(ids).map(d=>d.key);

    const toPreserve = ids;
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        pubblicazioni: toPreserve
      }
    }));
  }

  changeAnnidamenti(newOptions) {
    const levels_in_filter = newOptions.filter(d=>d.status).map(d=>+d.label)

    let toPreserve = this.state.data.map(d=>d.id);

    if (levels_in_filter.length>0) {
      toPreserve = this.state.data.filter(d=>{
        const levels_in_text = _.uniq(d.details.map(d=>+d.depth)).sort();
        if (levels_in_filter.length !== levels_in_text.length) {
          return false;
        } else {
          // console.log(d.id, '\n', levels_in_filter, levels_in_text, '\n', _.difference(levels_in_filter, levels_in_text), '\n', _.difference(levels_in_filter, levels_in_text).length===0);
          return _.difference(levels_in_filter, levels_in_text).length===0;
        } 
      }).map(d=>d.id)
    }

    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        pubblicazioni: toPreserve
      }
    }));
  }

  applyFilters() {
    // console.log("apply filters");
    let survive_filters = this.state.data.map(d=>d.id);
    let id_arrays = [];
    for (var f in this.state.filters) {
      survive_filters = _.intersection(survive_filters, this.state.filters[f])
    }
    this.setState({survive_filters:survive_filters})
  }

  toggleHelpSidePanel = () => this.setState({
    helpSidePanelOpen : !this.state.helpSidePanelOpen
  });  

  render() {

    const helpPage = GlobalData.helpPages.processDoubting.main;

    // console.log(this.state)
    return (
      <div className="process-doubting main">

        <HelpSidePanel
					open={this.state.helpSidePanelOpen}
					page={helpPage}
					closeButtonClicked={this.toggleHelpSidePanel} />

        <div className="top-nav navigations">
          <MainMenu className = "main-menu" style = {{gridColumn: 'span 1'}}/>
					<PageTitle title = {"Dubbi fase 2"} style = {{gridColumn: 'span 10'}}/>

          {	this.state.isLoading && <Loading style = {{gridColumn: 'span 4'}}/>}
          {	!this.state.isLoading &&
					<Options title = "Cerca per"
						data = {this.state.cerca_per}
						style = {{gridColumn: 'span 4'}}
						changeOptions = {this.changeCercaPer}
					/> }
          {	this.state.isLoading && <Loading style = {{gridColumn: 'span 7'}}/>}
					{	!this.state.isLoading &&
          <SearchDropDown
            style={{
              gridColumn: "span 7"
            }}
            data={{ options: this.state.data_research.titolo }}
            changeOptions={this.changeRicerca}
            selectedOptions={this.state.ricerca}
          />
          }

          <MoreInfo
						style={{ gridColumn: "span 1" }}
						onClicked={this.toggleHelpSidePanel}
					/>
					<CompassButton
						style={{
						gridColumn: "span 1",
						color: "white",
						backgroundColor: "black"
						}}
					/>
        </div>

        <div className="the-body-viz">
          {	this.state.isLoading && <Loading style = {{width: '100%'}}/>}
          {	!this.state.isLoading &&
            <DoubtingStackedBars
              id="doubting-stacked-bars"
              data={this.state.data}
              stackMode = {this.state.stackMode}
              surviveFilters = {this.state.survive_filters}
            />
          }
        </div>

        <div className="bottom-nav navigations">
          {this.state.isLoading && <Loading style={{ gridColumn: 'span 5' }}/>}
					{	!this.state.isLoading &&
						<Options title = "Valori"
							data = {this.state.lunghezzaTesti}
							style = {{gridColumn: 'span 5',textAlign: 'center'}}
							changeOptions = {this.changeLunghezzaTesti}
						/> }
          {this.state.isLoading && <Loading style={{ gridColumn: 'span 5' }}/>}
					{	!this.state.isLoading &&
						<Options title = "Pubblicazioni"
							data = {this.state.pubblicazioni}
							style = {{gridColumn: 'span 5',textAlign: 'center'}}
							changeOptions = {this.changePubblicazioni}
						/> }
          {this.state.isLoading && <Loading style={{ gridColumn: 'span 5' }}/>}
					{	!this.state.isLoading &&
						<Options title = "Annidamenti"
							data = {this.state.annidamenti}
							style = {{gridColumn: 'span 5',textAlign: 'center'}}
							changeOptions = {this.changeAnnidamenti}
						/> }
          { this.state.isLoading && <Loading style = {{gridColumn: 'span 9'}}/>}
					{	!this.state.isLoading &&
						<RangeFilter
							style = {{gridColumn: 'span 9'}}
							data = {this.state.timeExtent}
							changeOptions = {this.changeTimeSpan}
						/> }
          
        </div>
        
      </div>
      
    );
  }
}

export default ProcessDoubting;
