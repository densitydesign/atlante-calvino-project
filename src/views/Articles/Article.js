
import React from 'react';


export default class Article extends React.Component
{
  render()
  {
    return (
      <div>
        <h2><span>{this.props.title}</span></h2><br />
        <h3><span>{this.props.authors}, {this.props.year}</span></h3><br/>
        <br />
        <h4><span>Abstract</span></h4><br />
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
