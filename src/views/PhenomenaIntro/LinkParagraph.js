
import React from 'react';
import { Link } from 'react-router-dom';

export default class LinkParagraph extends React.Component
{
  render()
  {
    return (
      <nav>
        <Link to={this.props.route}>{this.props.linkText}</Link><br />
        <p>
          {this.props.description}
        </p>
      </nav>
    );
  }
}
