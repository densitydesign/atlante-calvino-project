
import React from 'react';

import CloseButton from '../CloseButton/CloseButton';

import './RadioButtonWithClose.css';

export default class RadioButtonWithClose extends React.Component
{
  render()
  {
    return (
      <div 
        id={this.props.id}
        className={this.props.pressed ? "radio-button-with-close-down" : "radio-button-with-close-up"}
        onClick={() => {
          this.props.callStateContainerRadioButtonPressed(this.props.id);
        }}>
        {this.props.caption}
        { this.props.pressed &&
          <div className="close-button-wrapper">          
            <CloseButton id={this.props.closeButtonId} onClicked={this.props.callStateContainerCloseButtonClicked} />
          </div>
        }
      </div>
    );
  }
}