import React from 'react';
import { Link } from 'react-router-dom';

export default class ArrowButton extends React.Component {
  render() {

    let leftLine = <polygon points="84.7,9.8 4.2,9.8 9.6,4.8 8.4,3.5 0.7,10.7 8.4,17.8 9.6,16.6 4.3,11.6 84.7,11.6"/>
    let rightLine = <polygon points="0.7,11.6 81.2,11.6 75.8,16.6 77,17.8 84.7,10.7 77,3.5 75.8,4.8 81.2,9.8 0.7,9.8 "/>
    let noLine = <polygon points=""/>

    let line;

    switch(this.props.arrowDirection) {
      case "left":
        line = leftLine;
        break;
      case "right":
        line = rightLine;
        break;

        case "none":
          line = noLine;
          break;
      default: throw new Error(`direction ${this.props.arrowDirection} not recognized`);
    }

    return (
      <div className="arrow-button" style={this.props.style}>
        <Link to={this.props.route}>
          <div>
            <div style={{width : "87px", textAlign : this.props.textAlign}}><strong>{this.props.text}</strong></div>
            <svg width="120px">
              {line}
            </svg>
          </div>
        </Link>
      </div>
    );
  }
}
