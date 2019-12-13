import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass } from '@fortawesome/free-regular-svg-icons';
import '../../App.css';

class Bussola extends Component {
  render() {
    return <div style={this.props.style} className="more-info"><FontAwesomeIcon icon={faCompass} /></div>;
  }
}

export default Bussola;
