
import React from 'react';

import '../../App.css';
import './ToolsAndMethods.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';


export default class ToolMethodCell extends React.Component
{
  constructor(props)
  {
    super(props);

    this.renderMethodCell = this.renderMethodCell.bind(this);
    this.renderToolCell = this.renderToolCell.bind(this);
  }

  render()
  {
    switch(this.props.type)
    {
      case "method" : return this.renderMethodCell();
      case "tool" : return this.renderToolCell();
      default : throw `type not recognized : ${this.props.type}`;
    }
  }

  renderMethodCell()
  {
    return (
      <div className="method-cell">
        <span className="method-type-box">METODOLOGIA</span>
        <br/>
        <br/>
        <h1>{this.props.title}</h1>
        <p>{this.props.description}</p>
      </div>
    );
  }

  renderToolCell()
  {
    return (
      <div className="tool-cell">
        <span className="tool-type-box">STRUMENTO</span>
        <br/>
        <br/>
        <h1>{this.props.title}</h1>
        <p>{this.props.description}</p>
      </div>
    );
  }
}
