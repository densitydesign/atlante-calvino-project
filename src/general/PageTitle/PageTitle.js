import React, { Component } from 'react';
import '../../App.css';

class PageTitle extends Component {
  render() {
    return <div className="page-title" style={this.props.style}>{this.props.title}</div>;
  }
}

export default PageTitle;

PageTitle.defaultProps = {
  title: 'This page needs a title',
  style: {gridColumn: 'span 12'}
};
