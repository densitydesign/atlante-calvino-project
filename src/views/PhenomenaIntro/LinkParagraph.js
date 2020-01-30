
import React from 'react';
import { Link } from 'react-router-dom';

export default class LinkParagraph extends React.Component
{
  render()
  {
    return (
      <nav>
      <strong>{this.props.smallTitle}</strong>
        <Link to={this.props.route}>
          <h1 className="link title-category">{this.props.linkText}</h1>
        </Link>
        <p>
          {this.props.description}
        </p>
      </nav>
    );
  }
}
