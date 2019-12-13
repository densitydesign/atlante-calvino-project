import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import '../../App.css';

export default class ViewSelector extends React.Component
{
  render()
  {
    return (
      <div className={this.props.className}>
        {
          this.props.route.includes("#") ?
          <HashLink to={this.props.route}>{this.props.text}</HashLink> :
          <Link to={this.props.route}>{this.props.text}</Link>
        }
      </div>
    );
  }
}
