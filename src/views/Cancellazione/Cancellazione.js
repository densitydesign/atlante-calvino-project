import React, { Component } from 'react';
import styles from './Cancellazione.module.css';

import * as d3 from 'd3';
import Loading from '../../general/Loading';
import RustyViz from '../../visualizations/RustyViz';

class Cancellazione extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading:true
    }
  }
  async componentDidMount() {
    const data = await (await d3.tsv(process.env.PUBLIC_URL + '/Dataset Fase 3 - flagged - MDS_def.tsv'));
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
          {	!this.state.loading &&
            <RustyViz data={this.state.data} />
          }
        </div>
        <div className="bottom-nav navigations"></div>
      </div>
    </>;
  }
}

export default Cancellazione;
