
import React from 'react';
import { Link } from 'react-router-dom';

export default class LinkParagraph extends React.Component
{
  render()
  {
    return (
      <nav>
        <Link to={this.props.route}><h1>{this.props.linkText}< /h1></Link>
        <p>
          {this.props.description}
        </p>
      </nav>
    );
  }
}
