
import React from 'react';

import RadioButton from '../../general/RadioButton/RadioButton';

import TerritoryDoubtPanel from '../TerritoryDoubtPanel/TerritoryDoubtPanel';
import TerritoryShapePanel from '../TerritoryShapePanel/TerritoryShapePanel';
import TerritoryRealismPanel from '../TerritoryRealismPanel/TerritoryRealismPanel';

import './TerritoryStepsPanel.css';

import GlobalData from '../../utilities/GlobalData';

export default class TerritoryStepsPanel extends React.Component
{
  doubtRadioButtonId = "doubtRadioButton";
  doubtRadioButtonCaption = "DUBBIO";

  shapeRadioButtonId = "shapeRadioButton";
  shapeRadioButtonCaption = "FORMA";

  realismRadioButtonId = "realismRadioButton";
  realismRadioButtonCaption = "REALISMO";

  state = {
    optionRadioButtonsStates : [
      { id : this.doubtRadioButtonId,   pressed : this.props.bottomPanelMode === GlobalData.bottomPanelModes.doubt },
      { id : this.shapeRadioButtonId,   pressed : this.props.bottomPanelMode === GlobalData.bottomPanelModes.shape },
      { id : this.realismRadioButtonId, pressed : this.props.bottomPanelMode === GlobalData.bottomPanelModes.realism }
    ]
  };

  optionRadioButtonsMap = new Map([
    [ this.doubtRadioButtonId,   { value : GlobalData.bottomPanelModes.doubt } ],
    [ this.shapeRadioButtonId,   { value : GlobalData.bottomPanelModes.shape } ],
    [ this.realismRadioButtonId, { value : GlobalData.bottomPanelModes.realism } ]
  ]);

  optionRadioButtonPressed = buttonId => {
    const buttonState = this.state.optionRadioButtonsStates.find(item => item.id === buttonId);

    if(buttonState.pressed) return;

    const optionRadioButtonsStatesCopy = [...this.state.optionRadioButtonsStates];

    const buttonStateCopy = optionRadioButtonsStatesCopy.find(item => item.id === buttonId);
    buttonStateCopy.pressed = true;

    const otherButtons = optionRadioButtonsStatesCopy.filter(item => item.id !== buttonId);
    otherButtons.forEach(button => button.pressed = false);

    this.setState({ optionRadioButtonsStates : optionRadioButtonsStatesCopy });

// !!! qui impostare non tanto l'highlight mode, quanto il panel mode (che implicherà il passaggio all'highlight mode memorizzato nel corrispondente panel state)
//    this.props.callTerritorySetHighlightMode(this.optionRadioButtonsMap.get(buttonId).value);
    this.props.containerSetBottomPanelMode(this.optionRadioButtonsMap.get(buttonId).value);
  };

  render()
  {
    let rendering;

    switch(this.props.bottomPanelMode)
    {
      case GlobalData.bottomPanelModes.doubt :

        rendering = (
          <TerritoryDoubtPanel 
            callTerritorySetHighlightMode={this.props.callTerritorySetHighlightMode} 
            doubtPanelMode={this.props.doubtPanelMode}
            containerSetDoubtPanelMode={this.props.containerSetDoubtPanelMode}
          />
        );

        break;

      case GlobalData.bottomPanelModes.shape :

        rendering = (
          <TerritoryShapePanel 
            callTerritorySetHighlightMode={this.props.callTerritorySetHighlightMode}
            shapePanelMode={this.props.shapePanelMode}
            containerSetShapePanelMode={this.props.containerSetShapePanelMode}
          />
        );

        break;
        
      case GlobalData.bottomPanelModes.realism :

        rendering = (
          <TerritoryRealismPanel 
            callTerritorySetHighlightMode={this.props.callTerritorySetHighlightMode} 
            realismPanelMode={this.props.realismPanelMode}
            containerSetRealismPanelMode={this.props.containerSetRealismPanelMode}
          />
        );

        break;
      
      default : rendering = <></>;
    }

    return (
      <div className="territory-steps-panel">
        <div className="territory-button-grid">

        <RadioButton 
          id={this.doubtRadioButtonId} 
          caption={this.doubtRadioButtonCaption} 
          pressed={this.state.optionRadioButtonsStates.find(item => item.id === this.doubtRadioButtonId).pressed}
          callStateContainerRadioButtonPressed={this.optionRadioButtonPressed} 
        />

        <RadioButton 
          id={this.shapeRadioButtonId} 
          caption={this.shapeRadioButtonCaption} 
          pressed={this.state.optionRadioButtonsStates.find(item => item.id === this.shapeRadioButtonId).pressed} 
          callStateContainerRadioButtonPressed={this.optionRadioButtonPressed} 
        />

        <RadioButton 
          id={this.realismRadioButtonId}
          caption={this.realismRadioButtonCaption}
          pressed={this.state.optionRadioButtonsStates.find(item => item.id === this.realismRadioButtonId).pressed}
          callStateContainerRadioButtonPressed={this.optionRadioButtonPressed} 
        />

        </div>
        {rendering}
      </div>
    );
  }
}
