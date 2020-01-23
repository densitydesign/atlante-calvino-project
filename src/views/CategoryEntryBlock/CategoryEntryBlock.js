
import React from 'react';
import { Link } from 'react-router-dom';

import './CategoryEntryBlock.css';

export default class CategoryEntryBlock extends React.Component
{
  render()
  {
    return (
      <div className="category-entry-block">
        <strong>{this.props.smallTitle}</strong>
        <Link to={this.props.route}>
        <h1 className="link title-category">{this.props.linkText}< /h1></Link>
        <p>
          {this.props.description}
        </p>
      </div>
    );
  }
}
