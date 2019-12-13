
import React from 'react';

export default class Article extends React.Component
{
  render()
  {
    return (
      <div>
        <strong><span>{this.props.title}</span></strong><br />
        <strong><span>{this.props.authors}, {this.props.year}</span></strong><br/>
        <br />
        <strong><span>Abstract</span></strong><br />
        <p>
          {this.props.abstract}
        </p>
        <a href={this.props.href}>{this.props.linkText}</a>
        <br />
        <br />
        <br />
      </div>
    );
  }
}