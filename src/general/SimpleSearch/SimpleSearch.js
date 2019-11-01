import React, { Component } from 'react';
import _ from 'lodash'

class SimpleSearch extends Component {
  constructor(props) {
    super(props);
    this.handleTyping = this.handleTyping.bind(this);
    this.selectResult = this.selectResult.bind(this);
  }

  handleTyping(event){
    if (event.target.value.length >= this.props.minLength) {
      this.debounceTyping(event.target.value)
    }
  }

  debounceTyping = _.debounce( (value) => {
    this.props.searching(value);
  }, 250);

  selectResult(event){
    this.props.selectResult(event.target.getAttribute('data-attr'))
  }

  render() {
    const ulStyle = {
      position: 'absolute'
    }
    const liStyle = {
      backgroundColor: 'peachpuff'
    }
    return (
      <div style={this.props.style}>
        <input type="text" name="fname" placeholder="Inserisci un nome" onChange={this.handleTyping} />
        <ul style={ulStyle}>
          {this.props.previewSearch.slice(0,8).map( (d,i)=>{
            return <li style={liStyle} key={i} onClick={this.selectResult} data-attr={d.values} >{d.key}</li>
          } )}
        </ul>

      </div>
    );
  }
}

export default SimpleSearch;
