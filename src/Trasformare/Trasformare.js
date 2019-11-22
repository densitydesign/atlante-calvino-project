import React, { Component, useEffect } from 'react';
import GlobalData from '../GlobalData';

import MainMenu from '../general/MainMenu';
import VizTitle from '../general/VizTitle';
import MoreInfo from '../general/MoreInfo';
import Loading from '../general/Loading';

import Options from '../general/Options';
import Search from '../general/Search';
import RangeFilter from '../general/RangeFilter';

class Trasformare extends Component {
  constructor(props) {
    super(props);

    this.changeCercaPer = this.changeCercaPer.bind(this);
    this.changeRicerca = this.changeRicerca.bind(this);

    this.changePubblicazioni = this.changePubblicazioni.bind(this);

    this.state = {
      data:'data still not loaded',
      isLoading: false,
      cerca_per: {
        multiple: false,
        options: [
          {
            'label':'luogo',
            'status':true
          },
          {
            'label':'titolo',
            'status':false
          }
        ]
      },
      ricerca: {
        options: [
          {
            // 'id':1,
            'id-calvino':'S001',
            'label':'uno',
            'status':false
          },
          {
            // 'id':2,
            'id-calvino':'S002',
            'label':'due',
            'status':false
          },
          {
            // 'id':3,
            'id-calvino':'S003',
            'label':'tre',
            'status':false
          },
          {
            // 'id':4,
            'id-calvino':'S004',
            'label':'quattro',
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
      },
      pubblicazioni: {
        multiple: true,
        options: GlobalData.allVolumes.map(d=>{
          return {
            ...d,
            'status':true
          }
        }),
      },
      ambienti: {
        multiple: true,
        options:  [
          {
            'label':'uno',
            'status':true
          },
          {
            'label':'due',
            'status':true
          },
          {
            'label':'tre',
            'status':true
          },
          {
            'label':'quattro',
            'status':true
          }
        ]
      }
    };
  }

  changeCercaPer(newOptions) {
    let selection = newOptions.filter(d=>d.status)
    if (selection.length<1){
      console.error('err');
      return;
    }
    selection = selection[0].label
    console.log(selection)

    let research_options;

    if (selection==='luogo') {
      research_options = [
        {
          // 'id':1,
          'id-calvino':'S001',
          'label':'uno',
          'status':false
        },
        {
          // 'id':2,
          'id-calvino':'S002',
          'label':'due',
          'status':false
        },
        {
          // 'id':3,
          'id-calvino':'S003',
          'label':'tre',
          'status':false
        },
        {
          // 'id':4,
          'id-calvino':'S004',
          'label':'quattro',
          'status':false
        }
      ]
    } else {
      research_options = [
        {
          // 'id':1,
          'id-calvino':'S005',
          'label':'cinque',
          'status':false
        },
        {
          // 'id':2,
          'id-calvino':'S006',
          'label':'sei',
          'status':false
        },
        {
          // 'id':3,
          'id-calvino':'S007',
          'label':'sette',
          'status':false
        },
        {
          // 'id':4,
          'id-calvino':'S008',
          'label':'otto',
          'status':false
        }
      ]
    }

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
    this.setState(prevState => ({
      ricerca: {
        ...prevState.ricerca,
        options: newOptions
      }
    }))
  }

  changePubblicazioni(newOptions) {
    this.setState(prevState => ({
      pubblicazioni: {
        ...prevState.pubblicazioni,
        options: newOptions
      }
    }))
  }

  componentDidMount() {
    // setTimeout(() => {
    //   console.log('test')
    //
    //   this.setState(prevState => ({
    //     gruppi: {                    // object that we want to update
    //       ...prevState.gruppi,       // keep all other key-value pairs
    //       set: 'all'
    //     }
    //   }))
    // }, 6000)
  }

  render() {

    return (
      <div className="trasformare main">

        <div className="top-nav navigations">
          <MainMenu className="main-menu" style={{gridColumn: 'span 1'}}/>
          <VizTitle title={this.props.title} style={{gridColumn: 'span 12'}}/>

          { this.state.isLoading && <Loading style={{gridColumn: 'span 5'}} /> }
          { !this.state.isLoading && <Options
              title="Cerca per"
              data = {this.state.cerca_per}
              style={{gridColumn: 'span 5'}}
              changeOptions={this.changeCercaPer}
            /> }

          { this.state.isLoading && <Loading style={{gridColumn: 'span 5'}} /> }
          { !this.state.isLoading && <Search style={{gridColumn: 'span 5'}} data={this.state.ricerca} changeOptions={this.changeRicerca}/> }

          <MoreInfo style={{gridColumn: 'span 1'}}/>
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
          { !this.state.isLoading && <Options title="Ambienti" data={this.state.ambienti} style={{gridColumn: 'span 5'}}/> }

          { this.state.isLoading && <Loading style={{gridColumn: 'span 5'}} /> }
          { !this.state.isLoading && <RangeFilter style={{gridColumn: 'span 9'}}/> }
        </div>
      </div>
    );
  }
}

export default Trasformare;
