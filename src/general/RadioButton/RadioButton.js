
import React from 'react';

import './RadioButton.css';

export default class RadioButton extends React.Component
{
  render()
  {
    const buttonDownClass = this.props.buttonDownClass || "radio-button-down";
    const buttonUpClass = this.props.buttonUpClass || "radio-button-up";

    return (
      <div
        id={this.props.id}
        style={ (this.props.pressed ? {backgroundColor:this.props.buttonColor} : {borderColor:this.props.buttonColor}) } 
        className={this.props.pressed ? buttonDownClass : buttonUpClass}
        onClick={() => {
          this.props.callStateContainerRadioButtonPressed(this.props.id);
        }}>
        {this.props.caption}
      </div>
    );
  }
}
