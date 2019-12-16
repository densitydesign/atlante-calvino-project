
import React from 'react';

import './CategoryEntryBlock.css';

export default class CategoryEntryBlock extends React.Component
{
  render()
  {
    return (
      <div className="category-entry-block">
        <strong>{this.props.smallTitle}</strong>
        <h2 className="title-category">{this.props.title}</h2><br/>
        <p>{this.props.description}</p>
      </div>
    );
  }
}
