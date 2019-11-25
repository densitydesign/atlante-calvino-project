import React, { Component } from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';

class Search extends Component {
  render() {
    return <div style={this.props.style}>

      <Typeahead
        multiple
        onChange={(selected) => {
          console.log('wowowo', selected)

          // const filtered_data = { ...this.props.data }
          //
          // filtered_data.options
          //   .map(d=>{
          //     d.status = (selected.length>0) ? selected.map(s=>s.label).indexOf(d.label) > -1 : true
          //     return d
          //   })

          this.props.changeOptions(selected)

        }}
        options={this.props.data.options}
        id="main-search"
      />

    </div>;
  }
}

export default Search;

Search.defaultProps = {
  style: {
    gridColumn: 'span 4'
  }
}
