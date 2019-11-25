import React, { Component } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

import GlobalData from '../GlobalData';

import MainMenu from '../general/MainMenu';
import PageTitle from '../general/PageTitle';
import MoreInfo from '../general/MoreInfo';
import Bussola from '../general/Bussola';

import Loading from '../general/Loading';

import Options from '../general/Options';
import Search from '../general/Search';
import RangeFilter from '../general/RangeFilter';

// import PlacesMatrix from '../visualizations/PlacesMatrix';
import ParseMatrixData from './parse-matrix-data';

class Trasformare extends Component {
  constructor(props) {
    super(props);

    this.changeCercaPer = this.changeCercaPer.bind(this);
    this.changeRicerca = this.changeRicerca.bind(this);

    this.changePubblicazioni = this.changePubblicazioni.bind(this);
    this.changeAmbienti = this.changeAmbienti.bind(this);

    this.state = {
      data: 'data still not loaded',
      filter:[],
      isLoading: true,
      cerca_per: {
        multiple: false,
        options: [
          {
            'label':'luogo',
            'status':true
          },
          {
            'label':'raccolta',
            'status':false
          },
          {
            'label':'titolo',
            'status':false
          }
        ]
      },
      gruppi: {
        multiple: false,
        options: [
          {
            'label':'aperti',
            'status':false
          },
          {
            'label':'chiusi',
            'status':true
          }
        ]
      }
    };
  }

  loadData() {
    d3.tsv('./places-matrix-data.tsv')
      .then( data => {
        const graph = ParseMatrixData.parser(data);
        return graph;
      })
      .then(data=>{

        let themes = data.data.map(d=>d.themes).flat()
        themes = themes.filter((d,i)=>themes.indexOf(d)===i)
        themes = themes.filter((d)=>d!==''&&d!==" ")
        // console.log(themes)

        let kinds = data.data.map(d=>d.publicationType).flat()
        kinds = kinds.filter((d,i)=>kinds.indexOf(d)===i)
        kinds = kinds.filter((d)=>d!==''&&d!==" ")
        kinds = kinds.map(d=> { return { 'label':d, 'status':true} } )
        // console.log(kinds)

        let environments = data.data.map(d=>d.themes).flat()
        environments = environments.filter((d,i)=>environments.indexOf(d)===i)
        environments = environments.filter((d)=>d!==''&&d!==" ")
        environments = environments.map(d=> { return { 'label':d, 'status':true} } )
        // console.log(environments)

        let allTitles = data.data.map(d=>d.pubVenueTitle.split(';'));
        allTitles = allTitles.flat();
        allTitles = d3.nest()
          .key(d=>d)
          .entries(allTitles)
          .map(d=>d.key);

        let nodesByPublicationTitle = []
        allTitles.forEach( d => {
          let publishedHere = data.data.filter( e => { return e.pubVenueTitle.includes(d) })
          let obj = {
            'label': d,
            'id': [publishedHere.map(d=>d.id)],
            'status': true
          }
          nodesByPublicationTitle.push(obj)
        })

        let searchByCompositionTitle = d3.nest()
          .key(d=>d.sourceTitle)
          .entries(data.data)
          .map(d=>{
            return {
              'label': d.key,
              'id': d.values.map(dd=>dd.id),
              'status': true
            }
          })

        let data_research = {
          luogo: data.data.map(d=>{ return { 'label':d.label, 'id': [d.id], 'status': true } }),
          raccolta: nodesByPublicationTitle,
          titolo: searchByCompositionTitle
        }

        let time = d3.extent(data.data, d => d.year)
        // console.log(time)

        this.setState({
          data: data.graph,
          originalData: data.data,
          filter: data.data.map(d=>d.id),
          noFilter: data.data.map(d=>d.id),
          isLoading: false,
          data_research: data_research,
          ricerca: {
            options: data_research.luogo
          },
          toPreserveRicerca: data.data.map(d=>d.id),
          pubblicazioni: {
            multiple: true,
            options: kinds
          },
          toPreservePubblicazioni: data.data.map(d=>d.id),
          volumi: {
            multiple: true,
            options: GlobalData.allVolumes.map(d=>{
              return {
                ...d,
                'status':true
              }
            }),
          },
          toPreserveVolumi: data.data.map(d=>d.id),
          ambienti: {
            multiple: true,
            options: environments
          },
          toPreserveAmbienti: data.data.map(d=>d.id),
          time: {
            extent: time,
            filter: time
          }
        })
      })
  }

  changeCercaPer(newOptions) {
    let selection = newOptions.filter(d=>d.status)
    if (selection.length<1){
      console.error('err');
      return;
    }
    selection = selection[0].label
    console.log(selection)

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

    // console.log(newOptions)

    const toPreserve = newOptions.map(d=>d.id).flat()
    console.log(toPreserve.length)

    this.setState(prevState => ({
      ricerca: {
        ...prevState.ricerca,
        // options: newOptions
      },
      toPreserveRicerca: toPreserve,
      filter: _.intersection(prevState.noFilter, toPreserve, prevState.toPreservePubblicazioni, prevState.toPreserveVolumi, prevState.toPreserveAmbienti)
    }))

  }

  changePubblicazioni(newOptions) {

    const criteria = newOptions.filter(d=>d.status).map(d=>d.label)
    const toPreserve = this.state.originalData.filter(node=>{
      return node.publicationType.filter(value => criteria.includes(value)).length > 0
    }).map(d=>d.id)
    console.log(toPreserve.length)

    this.setState(prevState => ({
      pubblicazioni: {
        ...prevState.pubblicazioni,
        options: newOptions
      },
      toPreservePubblicazioni: toPreserve,
      filter: _.intersection(prevState.noFilter, prevState.toPreserveRicerca, toPreserve, prevState.toPreserveVolumi, prevState.toPreserveAmbienti)
    }))
  }

  changeAmbienti(newOptions) {

    const criteria = newOptions.filter(d=>d.status).map(d=>d.label)
    const toPreserve = this.state.originalData.filter(node=>{
      return node.themes.filter(value => criteria.includes(value)).length > 0
    }).map(d=>d.id)
    console.log(toPreserve.length)

    // this.filterData()

    this.setState(prevState => ({
      ambienti: {
        ...prevState.ambienti,
        options: newOptions
      },
      toPreserveAmbienti: toPreserve,
      filter: _.intersection(prevState.noFilter, prevState.toPreserveRicerca, prevState.toPreservePubblicazioni, prevState.toPreserveVolumi, toPreserve)
    }))
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    console.log(this.state.filter.length)
    return (
      <div className="trasformare main">

        <div className="top-nav navigations">
          <MainMenu className="main-menu" style={{gridColumn: 'span 1'}}/>
          <PageTitle title={this.props.title} style={{gridColumn: 'span 12'}}/>

          { this.state.isLoading && <Loading style={{gridColumn: 'span 4'}} /> }
          { !this.state.isLoading && <Options
              title="Cerca per"
              data = {this.state.cerca_per}
              style={{gridColumn: 'span 4'}}
              changeOptions={this.changeCercaPer}
            /> }

          { this.state.isLoading && <Loading style={{gridColumn: 'span 5'}} /> }
          { !this.state.isLoading && <Search style={{gridColumn: 'span 5'}} data={this.state.ricerca} changeOptions={this.changeRicerca}/> }

          <MoreInfo style={{gridColumn: 'span 1'}}/>
          <Bussola style={{gridColumn: 'span 1'}}/>
        </div>

        <div className="the-body-viz">
          Body Viz
        </div>

        <div className="bottom-nav navigations">

          { this.state.isLoading && <Loading style={{gridColumn: 'span 5'}} /> }
          { !this.state.isLoading && <Options title="Gruppi" data={this.state.gruppi} style={{gridColumn: 'span 5'}}/> }

          { this.state.isLoading && <Loading style={{gridColumn: 'span 5'}} /> }
          { !this.state.isLoading && <Options
              title="Pubblicazioni"
              data={this.state.pubblicazioni}
              style={{gridColumn: 'span 5'}}
              changeOptions={this.changePubblicazioni}
            /> }

          { this.state.isLoading && <Loading style={{gridColumn: 'span 5'}} /> }
          { !this.state.isLoading && <Options
              title="Ambienti"
              data={this.state.ambienti}
              style={{gridColumn: 'span 5'}}
              changeOptions={this.changeAmbienti}
            /> }

          { this.state.isLoading && <Loading style={{gridColumn: 'span 5'}} /> }
          { !this.state.isLoading && <RangeFilter style={{gridColumn: 'span 9'}}/> }
        </div>
      </div>
    );
  }
}

export default Trasformare;
