import React from 'react';
import { Link } from 'react-router-dom';

export default class ViewSelector extends React.Component
{
  render()
  {
    return (
      <Link to={this.props.route}>{this.props.text}</Link>
    );
  }
}