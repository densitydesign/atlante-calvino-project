import React from 'react';
import { Link } from 'react-router-dom';

export default class ViewSelector extends React.Component
{
  render()
  {
    return (
      <div className={this.props.className}>
        <Link to={this.props.route}>{this.props.text}</Link>
      </div>
    );
  }
}