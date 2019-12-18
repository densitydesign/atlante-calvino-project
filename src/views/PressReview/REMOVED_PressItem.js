
import React from 'react';

export default class PressItem extends React.Component
{
  render()
  {
    return (
      <div>
        <a href={this.props.href}>{this.props.linkText}</a><br/>
        <span>{this.props.note}</span>        
      </div>
    );
  }
}
