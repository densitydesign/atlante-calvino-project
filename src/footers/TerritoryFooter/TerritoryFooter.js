
import React from 'react';
import Options from '../../general/Options/Options';
import ToggleButton from '../../general/ToggleButton/ToggleButton';

import '../../App.css';

export default class TerritoryFooter extends React.Component
{
  legendToggleButtonId = "legendToggleButton";
  legendToggleButtonCaption = "LEGENDA";

  timeFilterToggleButtonId = "timeFilterToggleButton";
  timeFilterToggleButtonCaption = "FILTRO CRONOLOGICO";

  state = {
    steps : {
      multiple : false,
      options : [
        { label : "territorio", status : true },
        { label : "dubbio", status : false },
        { label : "forma", status : false },
        { label : "realismo", status : false }
      ]
    },
    toggleButtonsStates : [
      { id : this.legendToggleButtonId, pressed : false },
      { id : this.timeFilterToggleButtonId, pressed : false }
    ]
  };

  changeSteps = newOptions => this.props.callTerritorySetHighlightMode(this.getActiveOption(newOptions));

  getActiveOption = options => options.find(item => item.status === true).label;

  toggleButtonPressed = buttonId => {
    const buttonState = this.state.toggleButtonsStates.find(item => item.id === buttonId);

    const toggleButtonsStatesCopy = [...this.state.toggleButtonsStates];

    const buttonStateCopy = toggleButtonsStatesCopy.find(item => item.id === buttonId);
    buttonStateCopy.pressed = !buttonStateCopy.pressed;

    this.setState({ toggleButtonsStates : toggleButtonsStatesCopy });
  };

  render()
  {
    return (
      <div className="bottom-nav navigations">

        <Options
          title="Tappe"
          data={this.state.steps}
          style={{ gridColumn : "span 8", textAlign : "center" }}
          changeOptions = { this.changeSteps }
        />

        <ToggleButton id={this.timeFilterToggleButtonId} caption={this.timeFilterToggleButtonCaption} pressed={this.state.toggleButtonsStates.find(item => item.id === this.timeFilterToggleButtonId).pressed} callStateContainerToggleButtonPressed={this.toggleButtonPressed} />
        <ToggleButton id={this.legendToggleButtonId} caption={this.legendToggleButtonCaption} pressed={this.state.toggleButtonsStates.find(item => item.id === this.legendToggleButtonId).pressed} callStateContainerToggleButtonPressed={this.toggleButtonPressed} />        

      </div>
    );
  }
}