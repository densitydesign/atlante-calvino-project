
import React from 'react';

import './RadioButton.css';

export default class RadioButton extends React.Component
{
  render()
  {
    console.log("buttonColor", this.props.buttonColor)
    return (
      <div
        id={this.props.id}
        style={ (this.props.pressed ? {backgroundColor:this.props.buttonColor} : {borderColor:this.props.buttonColor}) } 
        className={this.props.pressed ? "radio-button-down" : "radio-button-up"}
        onClick={() => {
          this.props.callStateContainerRadioButtonPressed(this.props.id);
        }}>
        {this.props.caption}
      </div>
    );
  }
}
