import React from 'react';
import { Link } from 'react-router-dom';

export default class ArrowButton extends React.Component {
  render() {
    
    let leftArrowHead = (
      <marker id="leftArrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
        <polygon points="0 3.5, 10 0, 10 7" />
      </marker>
    );
    let leftLine = <line x1="0" y1="10" x2="120" y2="10" stroke="#000" strokeWidth="2" markerStart="url(#leftArrowhead)" />

    let rightArrowHead = (
      <marker id="rightArrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
        <polygon points="10 3.5, 0 0, 0 7" />
      </marker>
    );
    let rightLine = <line x1="0" y1="10" x2="100" y2="10" stroke="#000" strokeWidth="2" markerEnd="url(#rightArrowhead)" />

    let line, arrowHead;

    switch (this.props.direction) {
      case "left":
        line = leftLine;
        arrowHead = leftArrowHead;
        break;
      case "right":
        line = rightLine;
        arrowHead = rightArrowHead;
        break;
      default: throw `direction ${this.props.direction} not recognized`;
    }

    return (
      <div className="arrow-button" style={this.props.style}>
        <Link to={this.props.route}>
          <div>
            <span><strong>{this.props.text}</strong></span>
            <svg>
              <defs>
                {arrowHead}
              </defs>
              {line}
            </svg>
          </div>
        </Link>
      </div>
    );
  }
}