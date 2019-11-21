import React, { Component, useEffect } from 'react';

import MainMenu from '../general/MainMenu';
import VizTitle from '../general/VizTitle';
import MoreInfo from '../general/MoreInfo';

import Options from '../general/Options';
import Search from '../general/Search';
import RangeFilter from '../general/RangeFilter';

class Trasformare extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data:'data still not loaded',
      isLoading: true,
      gruppi: {
        multiple: false,
        options: ['aperti','chiusi'],
        set: 'all'
      }
    };
  }

  componentDidMount() {
    setTimeout(() => {
      console.log('test')

      this.setState(prevState => ({
        gruppi: {                    // object that we want to update
          ...prevState.gruppi,       // keep all other key-value pairs
          set: []
        }
      }))
    }, 6000)
  }

  render() {

    return (
      <div className="trasformare main">

        <div className="top-nav navigations">
          <MainMenu className="main-menu" style={{gridColumn: 'span 1'}}/>
          <VizTitle title={this.props.title} style={{gridColumn: 'span 12'}}/>

          <Options
            title="Cerca per"
            style={{gridColumn: 'span 5'}}
            data={this.state.gruppi}
            // multiple={this.state.gruppi.multiple}
            // options={this.state.gruppi.options}
            // set={this.state.gruppi.set}
          />
          <Search style={{gridColumn: 'span 5'}}/>

          <MoreInfo style={{gridColumn: 'span 1'}}/>
        </div>

        <div className="the-body-viz">
          Body Viz
        </div>

        <div className="bottom-nav navigations">
          <Options title="Gruppi" style={{gridColumn: 'span 5'}}/>
          <Options title="Pubblicazione" style={{gridColumn: 'span 5'}}/>
          <Options title="Ambienti" style={{gridColumn: 'span 5'}}/>
          <RangeFilter style={{gridColumn: 'span 9'}}/>
        </div>
      </div>
    );
  }
}

export default Trasformare;
