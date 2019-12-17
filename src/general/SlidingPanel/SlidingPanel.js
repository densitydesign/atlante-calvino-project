
import React from 'react';


import './SlidingPanel.css';
import '../../views/Compass/Compass.css';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

export default class SlidingPanel extends React.Component
{
  constructor(props)
  {
    super(props);

//    this.state = { open : JSON.parse(props.open) };
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount()
  {
    document.addEventListener("mousedown", this.handleClick);
  }

  componentWillUnmount()
  {
    document.removeEventListener("mousedown", this.handleClick);
  }

  setWrapperRef(node)
  {
    this.wrapperRef = node;
  }

  handleClick(event)
  {
    if(!this.wrapperRef) return;

    if(this.wrapperRef.contains(event.target)) this.props.panelClicked(this.props.id);

//    this.setState({ open : this.wrapperRef.contains(event.target) });

//console.log("panel id : ", this.props.id);

//    this.setState({ open : this.wrapperRef.contains(event.target) || this.props.getSelectedPanel() > Number.parseInt(this.props.id)});
  }

  render()
  {
console.log("render panel");
    
    const interactiveViewLink = this.props.interactiveViewUrl ? <a className="button-text" href={this.props.interactiveViewUrl} target="blank">Esplora</a> : <></>;

    return (
      <div
        className={"sliding-panel " + (this.props.open ? this.props.openClassName : this.props.closedClassName)}
        ref={this.setWrapperRef}
        style={{
          zIndex : this.props.zIndex
        }}>
          <div className="rotated-title"><h1>{this.props.title}</h1></div>
        <div className="sliding-panel-main-text">
        <p><a href={this.props.pdfUrl} target="_blank">PDF<FontAwesomeIcon icon={faLink}></FontAwesomeIcon></a>
        </p>
          <p>{this.props.text}</p> {interactiveViewLink}
        </div>
      </div>
    );
  }
}
