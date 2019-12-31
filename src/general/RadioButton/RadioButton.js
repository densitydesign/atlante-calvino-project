
import React from 'react';

import './RadioButton.css';

export default class RadioButton extends React.Component
{
  state = {
    pressed : false
  };

  render()
  {
    return (
      <div 
        className={this.state.pressed ? "radio-button-down" : "radio-button-up"}
        onClick={() => this.setState({ pressed : !this.state.pressed })}>
        radiobutton
      </div>
    );
  }
}