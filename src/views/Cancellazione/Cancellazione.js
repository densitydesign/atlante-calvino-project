import React, { Component } from 'react';
import styles from './Cancellazione.module.css';

import * as d3 from 'd3';
import Loading from '../../general/Loading';
import RustyViz from '../../visualizations/RustyViz';
import RustyVizSpatialization from '../../visualizations/RustyVizSpatialization';

import MainMenu from '../../general/MainMenu';
import PageTitle from '../../general/PageTitle';
import MoreInfo from '../../general/MoreInfo';
import CompassButton from '../../general/CompassButton/CompassButton';
import HelpSidePanel from '../../panels/HelpSidePanel/HelpSidePanel';

class Cancellazione extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading:true
    }
  }
  async componentDidMount() {
    const data = await d3.json(process.env.PUBLIC_URL + '/cancellazione_dataset_spatialized.json');
    this.setState({
      loading:false,
      data:data
    })
  }
  render() {
    return <>
      <div className={styles.main}>
        <div className="top-nav navigations">
          <MainMenu className = "main-menu" style = {{gridColumn: 'span 1'}}/>
					<PageTitle title = {"Tappa 3 – Cancellare"} style = {{gridColumn: 'span 7'}}/>
        </div>
        <div className={styles.bodyViz + ' the-body-viz'}>
          {	this.state.loading && <Loading style = {{width: '100%'}}/>}
          {	!this.state.loading && <RustyViz data={this.state.data} /> }

        </div>
        <div className="bottom-nav navigations"></div>
      </div>
    </>;
  }
}

export default Cancellazione;
