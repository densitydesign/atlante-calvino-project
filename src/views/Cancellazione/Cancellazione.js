import React, { Component } from 'react';
import styles from './Cancellazione.module.css';

import * as d3 from 'd3';
import Loading from '../../general/Loading';
import RustyViz from '../../visualizations/RustyViz';
import RustyVizSpatialization from '../../visualizations/RustyVizSpatialization';

import MainMenu from '../../general/MainMenu';
import PageTitle from '../../general/PageTitle';
import AltOptions from "../../general/Options/AltOptions";


import MoreInfo from '../../general/MoreInfo';
import CompassButton from '../../general/CompassButton/CompassButton';
import HelpSidePanel from '../../panels/HelpSidePanel/HelpSidePanel';

import Options from '../../general/Options';
import RangeFilter from '../../general/RangeFilter';

import GlobalData from "../../utilities/GlobalData";

const manifestazioniStilistiche={
  multiple: false,
  options: [{
    'label': 'negazione',
    'status': false
  }, {
    'label': 'esitazione',
    'status': false
  }, {
    'label': 'riformulazione',
    'status': false
  }, {
    'label': 'nessuna',
    'status': true
  }]
}

const filters={
  search:[],
  time:[]
}

class Cancellazione extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading:true,

      booksData: null,

  
      controlsEnabled: true,
      currentTextID: null,
  
      helpSidePanelOpen: false,
      manifestazioniStilistiche: manifestazioniStilistiche,
      timeExtent: [+new Date('1943'),+new Date('1985')],
      color: manifestazioniStilistiche.options.find(d=>d.status).label
    };
  }
  async componentDidMount() {
    const data = await d3.json(process.env.PUBLIC_URL + '/cancellazione_dataset_spatialized.json');
    const timeExtent = d3.extent(data, d => +new Date(d.year));
    this.setState({
      loading:false,
      data:data,
      filter:data.map(d=>d.id)
    })
  }
  toggleHelpSidePanel = () =>
  this.setState({
    helpSidePanelOpen: !this.state.helpSidePanelOpen
  });

  changeTimeSpan = (newOptions) => {
    newOptions=newOptions.map(d=>d.getFullYear())
    filters.time = this.state.data.filter(d=>{
      const year = Number(d.year)
      return year>=newOptions[0] && year<=newOptions[1];
    }).map(d=>d.id);
    this.applyFilters();
  }

  applyFilters = ()=>{
    let ids=this.state.data.map(d=>d.id);
    // console.log('all ids',ids)
    if (filters.search.length>0) {
      // console.log('search filter',filters.search)
      ids=ids.filter(d=>filters.search.indexOf(d)>-1);
    }
    if (filters.time.length>0) {
      // console.log('time filter',filters.time)
      ids=ids.filter(d=>filters.time.indexOf(d)>-1);
    }
    // console.log('survived ids',ids);
    this.setState({filter:ids});
  }

  changeColor=(newOptions)=> {
    this.setState({
      color: newOptions.find(d=>d.status).label
    });
  }

  render() {
    const helpPage = GlobalData.helpPages.plot.main;
    const {
      cercaPer,
      dettaglio,
      aggregazione,
      tipologia,
      ricerca,
      controlsEnabled,
      currentTextID,
      helpSidePanelOpen
    } = this.state;
    return <>
      <div className={styles.main}>
        <HelpSidePanel
          open={helpSidePanelOpen}
          page={helpPage}
          closeButtonClicked={this.toggleHelpSidePanel}
        />
        <div className="top-nav navigations">
          <MainMenu className = "main-menu" style = {{gridColumn: 'span 1'}}/>
					<PageTitle title = {"Tappa 3 – Cancellare"} style = {{gridColumn: 'span 21'}}/>
          
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
        <div className={styles.bodyViz + ' the-body-viz'}>
          {	this.state.loading && <Loading style = {{width: '100%'}}/>}
          {	!this.state.loading && <RustyViz
            data={this.state.data}
            color={this.state.color}
            filter={this.state.filter}
          /> }

        </div>
        <div className="bottom-nav navigations">

          {this.state.loading && <Loading style={{ gridColumn: 'span 12' }}/>}
					{	!this.state.loading &&
						<Options title = "Manifestazioni stilistiche"
							data = {this.state.manifestazioniStilistiche}
							style = {{gridColumn: 'span 12',textAlign: 'center'}}
							changeOptions = {this.changeColor}
						/> }

          { this.state.loading && <Loading style = {{gridColumn: 'span 12'}}/>}
					{	!this.state.loading &&
						<RangeFilter
							style = {{gridColumn: 'span 12'}}
							data = {this.state.timeExtent}
							changeOptions = {this.changeTimeSpan}
						/> }
        </div>
      </div>
    </>;
  }
}

export default Cancellazione;
