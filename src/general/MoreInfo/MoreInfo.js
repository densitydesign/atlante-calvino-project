import React, { Component } from 'react';
import '../../App.css';
import './MoreInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';

class MoreInfo extends Component {
  render() {
    return <div style={this.props.style} className="more-info"><FontAwesomeIcon icon={faQuestionCircle} /></div>;
  }
}

export default MoreInfo;
