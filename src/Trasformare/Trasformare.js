import React, { Component, useEffect } from 'react';
import GlobalData from '../GlobalData';

import MainMenu from '../general/MainMenu';
import VizTitle from '../general/VizTitle';
import MoreInfo from '../general/MoreInfo';

import Options from '../general/Options';
import Search from '../general/Search';
import RangeFilter from '../general/RangeFilter';

class Trasformare extends Component {
  constructor(props) {
    super(props);

    this.changePubblicazioni = this.changePubblicazioni.bind(this);

    this.state = {
      data:'data still not loaded',
      isLoading: true,
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

  changePubblicazioni(newOptions) {
    console.log('view changePubblicazioni', newOptions)
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

          <Options
            title="Cerca per"
            data = {this.state.cerca_per}
            style={{gridColumn: 'span 5'}}
          />
          <Search style={{gridColumn: 'span 5'}}/>

          <MoreInfo style={{gridColumn: 'span 1'}}/>
        </div>

        <div className="the-body-viz">
          Body Viz
        </div>

        <div className="bottom-nav navigations">
          <Options title="Gruppi" data={this.state.gruppi} style={{gridColumn: 'span 5'}}/>
          <Options
            title="Pubblicazioni"
            data={this.state.pubblicazioni}
            style={{gridColumn: 'span 5'}}
            changeOptions={this.changePubblicazioni}
          />
          <Options title="Ambienti" data={this.state.ambienti} style={{gridColumn: 'span 5'}}/>
          <RangeFilter style={{gridColumn: 'span 9'}}/>
        </div>
      </div>
    );
  }
}

export default Trasformare;
