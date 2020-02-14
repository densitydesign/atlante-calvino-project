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
import RangeFilter from '../../general/RangeFilter';

import DoubtingStackedBars from '../../visualizations/DoubtingStackedBars/DoubtingStackedBars';

class ProcessDoubting extends Component {
  constructor(props) {
    super(props);
    this.loadData = this.loadData.bind(this);
    this.changeLunghezzaTesti = this.changeLunghezzaTesti.bind(this);
    this.legendHighlight = this.legendHighlight.bind(this);

    this.changeCercaPer = this.changeCercaPer.bind(this);
    this.changeRicerca = this.changeRicerca.bind(this);
    this.changeTimeSpan = this.changeTimeSpan.bind(this);

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
    }
  }

  loadData() {
    // data comes from this notebook on ObservableHQ
    // https://observablehq.com/@iosonosempreio/experiment-on-the-use-observablehq-for-easying-task-of-data
    d3.json(process.env.PUBLIC_URL + '/data-process-doubting.json').then(json=>{
      // console.log(json);
      return json;
    }).then(data=>{

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
					'status': true
				}        
      });

      let data_research = {
        titolo: searchByCompositionTitle,
        "titolo pubblicazione": publicationTitle
      };
      
      // need to convert date to milliseconds for the filter to work
      const timeExtent = d3.extent(data, d => +new Date(d.year));

      this.setState({
        data: data,
        isLoading: false,
        data_research: data_research,
        ricerca: {
          options: data_research.titolo
        },
        timeExtent: timeExtent
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

		// let toPreserve = newOptions.map(d => d.id)
		// toPreserve = _.flattenDeep(toPreserve)

		// // In case it is empty, to prevent bugs, make it equal to any other filter
		// if(toPreserve.length === 0) {
		// 	toPreserve = this.state.toPreserveVolumi
		// }

		this.setState(prevState => ({
			ricerca: {
				...prevState.ricerca,
			},
			// ricercaOptionsSearched: newOptions,
			// toPreserveRicerca: toPreserve,
			// filter: _.intersection(prevState.noFilter,
			// 	toPreserve,
			// 	prevState.toPreservePubblicazioni,
			// 	prevState.toPreserveVolumi,
			// 	prevState.toPreserveAmbienti,
			// 	prevState.toPreserveCategorie)
		}))

  }
  
  changeTimeSpan(newOptions) {
    console.log("changeTimeSpan", newOptions);
  }

  render() {
    return (
      <div className="process-doubting main">

        {/* <HelpSidePanel
					open={this.state.helpSidePanelOpen}
					page={helpPage}
					closeButtonClicked={this.toggleHelpSidePanel} /> */}

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
					<Search
						style = {{gridColumn: 'span 7'}}
						data = {this.state.ricerca}
						changeOptions = {this.changeRicerca}
					/> }

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
          { this.state.isLoading && <Loading style = {{gridColumn: 'span 9'}}/>}
					{	!this.state.isLoading &&
						<RangeFilter
							style = {{gridColumn: 'span 9'}}
							data = {this.state.timeExtent}
							changeOptions = {this.changeTimeSpan}
						/> }

          {	this.state.isLoading && <Loading style = {{gridColumn: 'span 5'}}/>}
					{	!this.state.isLoading &&
						<span style = {{gridColumn: 'span 24'}}>
              data is loaded, questo spazio può essere utilizzato per dei filtri.
            </span> }
          
        </div>
        
      </div>
      
    );
  }
}

export default ProcessDoubting;
