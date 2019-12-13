
import React from 'react';

import './CategoryEntryBlock.css';

export default class CategoryEntryBlock extends React.Component
{
  render()
  {
    return (
      <div className="category-entry-block">
        <small><strong>{this.props.smallTitle}</strong></small><br/>
        <h2>{this.props.title}</h2><br/>
        <p>{this.props.description}</p>
      </div>
    );
  }
}