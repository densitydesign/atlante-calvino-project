
import React from 'react';

import RadioButtonWithClose from '../../general/RadioButtonWithClose/RadioButtonWithClose';

import TerritoryDoubtPanel from '../TerritoryDoubtPanel/TerritoryDoubtPanel';
import TerritoryShapePanel from '../TerritoryShapePanel/TerritoryShapePanel';
import TerritorySpacePanel from '../TerritorySpacePanel/TerritorySpacePanel';

import './TerritoryItinerariesPanel.css';

import GlobalData from '../../utilities/GlobalData';

export default class TerritoryItinerariesPanel extends React.Component
{
  doubtRadioButtonId = "doubtRadioButton";
  doubtRadioButtonCaption = "DUBBIO";

  shapeRadioButtonId = "shapeRadioButton";
  shapeRadioButtonCaption = "FORMA";

  spaceRadioButtonId = "spaceRadioButton";
  spaceRadioButtonCaption = "SPAZIO";

  state = {
    optionRadioButtonsStates : [
      { id : this.doubtRadioButtonId, pressed : this.props.bottomPanelMode === GlobalData.bottomPanelModes.doubt },
      { id : this.shapeRadioButtonId, pressed : this.props.bottomPanelMode === GlobalData.bottomPanelModes.shape },
      { id : this.spaceRadioButtonId, pressed : this.props.bottomPanelMode === GlobalData.bottomPanelModes.space }
    ]
  };

  optionRadioButtonsMap = new Map([
    [ this.doubtRadioButtonId, { bottomPanelMode : GlobalData.bottomPanelModes.doubt, mainAnalysisMode : GlobalData.analysisModes.doubt } ],
    [ this.shapeRadioButtonId, { bottomPanelMode : GlobalData.bottomPanelModes.shape, mainAnalysisMode : GlobalData.analysisModes.shape } ],
    [ this.spaceRadioButtonId, { bottomPanelMode : GlobalData.bottomPanelModes.space, mainAnalysisMode : GlobalData.analysisModes.space } ]
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

    const visualizationMode = this.optionRadioButtonsMap.get(buttonId);
console.log("setting main analysis mode...");
console.log("visualizationMode.mainAnalysisMode", visualizationMode.mainAnalysisMode);
    this.props.setMainAnalysisMode(visualizationMode.mainAnalysisMode);
    this.props.containerSetBottomPanelMode(visualizationMode.bottomPanelMode);
  };

  optionRadioButtonCloseButtonClicked = buttonId => {
    this.props.setMainAnalysisMode(GlobalData.analysisModes.noAnalysis);
    this.props.containerSetBottomPanelMode(GlobalData.bottomPanelModes.noAnalysis);
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
        
      case GlobalData.bottomPanelModes.space :

        rendering = (
          <TerritorySpacePanel 
            callTerritorySetHighlightMode={this.props.callTerritorySetHighlightMode} 
            spacePanelMode={this.props.spacePanelMode}
            containerSetSpacePanelMode={this.props.containerSetSpacePanelMode}
          />
        );

        break;
      
      default : rendering = <></>;
    }

    return (
      <div className="territory-itineraries-panel">
        <div className="territory-button-grid">

        <RadioButtonWithClose
          id={this.doubtRadioButtonId} 
          caption={this.doubtRadioButtonCaption} 
          pressed={this.state.optionRadioButtonsStates.find(item => item.id === this.doubtRadioButtonId).pressed}
          callStateContainerRadioButtonPressed={this.optionRadioButtonPressed} 
          callStateContainerCloseButtonClicked={this.optionRadioButtonCloseButtonClicked}
        />          

        <RadioButtonWithClose 
          id={this.spaceRadioButtonId}
          caption={this.spaceRadioButtonCaption}
          pressed={this.state.optionRadioButtonsStates.find(item => item.id === this.spaceRadioButtonId).pressed}
          callStateContainerRadioButtonPressed={this.optionRadioButtonPressed} 
          callStateContainerCloseButtonClicked={this.optionRadioButtonCloseButtonClicked}
        />          

        <RadioButtonWithClose
          id={this.shapeRadioButtonId} 
          caption={this.shapeRadioButtonCaption} 
          pressed={this.state.optionRadioButtonsStates.find(item => item.id === this.shapeRadioButtonId).pressed} 
          callStateContainerRadioButtonPressed={this.optionRadioButtonPressed}
          callStateContainerCloseButtonClicked={this.optionRadioButtonCloseButtonClicked}
        />

        </div>
        {rendering}
      </div>
    );
  }
}
