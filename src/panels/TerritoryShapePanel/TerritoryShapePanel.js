
import React from 'react';

import TerritoryDescriptionSubPanel from '../TerritoryDescriptionSubPanel/TerritoryDescriptionSubPanel';
import TerritoryShapeMainOptionsSubPanel from '../TerritoryShapeMainOptionsSubPanel/TerritoryShapeMainOptionsSubPanel';
import TerritoryPercentageSubPanel from '../TerritoryPercentageSubPanel/TerritoryPercentageSubPanel';
import GlobalData from '../../utilities/GlobalData';

import './TerritoryShapePanel.css';

export default class TerritoryShapePanel extends React.Component
{
  typesRadioButtonId = "allRadioButton";
  typesRadioButtonCaption = "TUTTE";

  proportionRadioButtonId = "proportionRadioButton";
  proportionRadioButtonCaption = "%";

  optionRadioButtonsMap = new Map([
    [ this.typesRadioButtonId,          { analysisMode : GlobalData.analysisModes.shape.types,          shapePanelMode : GlobalData.analysisPanelModes.shape.types } ],
    [ this.proportionRadioButtonId,     { analysisMode : GlobalData.analysisModes.shape.proportion,     shapePanelMode : GlobalData.analysisPanelModes.shape.proportion } ]
  ]);

  state = {
    optionRadioButtonsStates : [
      { id : this.typesRadioButtonId,        pressed : this.props.shapePanelMode === this.optionRadioButtonsMap.get(this.typesRadioButtonId).shapePanelMode },
      { id : this.proportionRadioButtonId,   pressed : this.props.shapePanelMode === this.optionRadioButtonsMap.get(this.proportionRadioButtonId).shapePanelMode }
    ]
  };

  optionRadioButtonPressed = buttonId => {
    const buttonState = this.state.optionRadioButtonsStates.find(item => item.id === buttonId);

    if(buttonState.pressed) return;

    const optionRadioButtonsStatesCopy = [...this.state.optionRadioButtonsStates];

    const buttonStateCopy = optionRadioButtonsStatesCopy.find(item => item.id === buttonId);
    buttonStateCopy.pressed = true;

    const otherButtons = optionRadioButtonsStatesCopy.filter(item => item.id !== buttonId);
    otherButtons.forEach(button => button.pressed = false);

    this.setState({ optionRadioButtonsStates : optionRadioButtonsStatesCopy });

    const value = this.optionRadioButtonsMap.get(buttonId);
    this.props.callTerritorySetHighlightMode(value.analysisMode);
    this.props.containerSetShapePanelMode(value.doubtPanelMode);
  };

  render()
  {
    return (
      <>

      <TerritoryDescriptionSubPanel
        title="L'ORGANIZZAZIONE DELLE FORME"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur dictum sapien sed sollicitudin"
        informationSheetRoute="/Phenomena/territory/shapeAnalysis/informationSheet"
        informationSheetDescription="SCHEDA"
        itineraryStop2Route="/Process/combining"
        itineraryStop2Description="TAPPA 2"
        itineraryStop3Route=""
        itineraryStop3Description="TAPPA 3"
      />

      <div className="territory-shape-panel">

        <TerritoryShapeMainOptionsSubPanel
          callStateContainerRadioButtonPressed={this.optionRadioButtonPressed}

          typesRadioButtonId={this.typesRadioButtonId}
          typesRadioButtonCaption={this.typesRadioButtonCaption}
          typesRadioButtonPressed={this.state.optionRadioButtonsStates.find(item => item.id === this.typesRadioButtonId).pressed}
        />
        </div>

          <div className="territory-percentage-panel">

        <TerritoryPercentageSubPanel
          callStateContainerRadioButtonPressed={this.optionRadioButtonPressed}

          percentageRadioButtonId={this.proportionRadioButtonId}
          percentageRadioButtonCaption={this.proportionRadioButtonCaption}
          percentageRadioButtonPressed={this.state.optionRadioButtonsStates.find(item => item.id === this.proportionRadioButtonId).pressed}
          />
          </div>
          </>
    );
  }
}
