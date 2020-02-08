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
// import Search from '../../general/Search';
// import RangeFilter from '../../general/RangeFilter';

import DoubtingStackedBars from '../../visualizations/DoubtingStackedBars/DoubtingStackedBars';

class ProcessDoubting extends Component {
  constructor(props) {
    super(props);
    this.loadData = this.loadData.bind(this);
    this.changeLunghezzaTesti = this.changeLunghezzaTesti.bind(this);

    this.state = {
      data: 'data still not loaded',
      isLoading: true,
      stackMode: "absolute",
      // stackMode: "normalized",
      lunghezzaTesti: {
				multiple: false,
				options: [{
					'label': 'assoluti',
					'status': true
				}, {
					'label': 'normalizzati',
					'status': false
				}]
			}
    }
  }

  loadData() {
    // data comes from this notebook on ObservableHQ
    // https://observablehq.com/@iosonosempreio/experiment-on-the-use-observablehq-for-easying-task-of-data
    d3.json(process.env.PUBLIC_URL + '/data-process-doubting.json').then(json=>{
      // console.log(json);
      return json;
    }).then(data=>{
      this.setState({
        data: data,
        isLoading: false
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
					<PageTitle title = {"Dubbi fase 2"} style = {{gridColumn: 'span 16'}}/>

          {this.state.isLoading && <Loading style={{ gridColumn: 'span 5' }}/>}
					{	!this.state.isLoading &&
						<Options title = "Valori"
							data = {this.state.lunghezzaTesti}
							style = {{gridColumn: 'span 5',textAlign: 'center'}}
							changeOptions = {this.changeLunghezzaTesti}
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
            /> }
        </div>

        <div className="bottom-nav navigations">
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
