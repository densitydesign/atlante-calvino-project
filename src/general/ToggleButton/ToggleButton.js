
import React from 'react';

import './ToggleButton.css';

export default class ToggleButton extends React.Component
{
  render()
  {
    return (
      <div
        id={this.props.id}
        className={this.props.pressed ? "toggle-button-down" : "toggle-button-up"}
        onClick={() => {
          this.props.callStateContainerToggleButtonPressed(this.props.id);
        }}>
        {this.props.caption}
      </div>
    );
  }
}