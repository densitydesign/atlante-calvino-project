
import React from 'react';

import './RadioButton.css';

export default class RadioButton extends React.Component
{
/*  
  state = {
    pressed : false
  };

  setPressed = value => this.setState({ pressed : value });
*/
  render()
  {
    return (
      <div 
        id={this.props.id}
        className={this.props.pressed ? "radio-button-down" : "radio-button-up"}
        onClick={() => {
          this.props.callStateContainerRadioButtonPressed(this.props.id);
        }}>
        {this.props.caption}
      </div>
    );
  }
}