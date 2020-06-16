import React, { Component } from 'react';
import styles from './Cancellazione.module.css';

import * as d3 from 'd3';
import Loading from '../../general/Loading';
import RustyViz from '../../visualizations/RustyViz';
import RustyVizSpatialization from '../../visualizations/RustyVizSpatialization';

const dev=false;

class Cancellazione extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading:true
    }
  }
  async componentDidMount() {
    let data;
    if (dev) {
      data = await d3.tsv(process.env.PUBLIC_URL + '/Dataset Fase 3 - flagged - MDS_def.tsv');
    } else {
      data = await d3.json(process.env.PUBLIC_URL + '/cancellazione-dataset-spazializzato.json')
    }
    this.setState({
      loading:false,
      data:data
    })
  }
  render() {
    return <>
      <div className={styles.main}>
        <div className="top-nav navigations"></div>
        <div className={styles.bodyViz + ' the-body-viz'}>
          {	this.state.loading && <Loading style = {{width: '100%'}}/>}
          {	(!this.state.loading && !dev) && <RustyViz data={this.state.data} /> }
          {	(!this.state.loading && dev) && <RustyVizSpatialization data={this.state.data} /> }

        </div>
        <div className="bottom-nav navigations"></div>
      </div>
    </>;
  }
}

export default Cancellazione;
