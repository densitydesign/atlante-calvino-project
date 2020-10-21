
import React from 'react';

import TerritoryDescriptionSubPanel from '../TerritoryDescriptionSubPanel/TerritoryDescriptionSubPanel';
import TerritoryDoubtMainOptionsSubPanel from '../TerritoryDoubtMainOptionsSubPanel/TerritoryDoubtMainOptionsSubPanel';
import TerritoryPercentageSubPanel from '../TerritoryPercentageSubPanel/TerritoryPercentageSubPanel';
import GlobalData from '../../utilities/GlobalData';

import './TerritoryDoubtPanel.css';

export default class TerritoryDoubtPanel extends React.Component
{
  fogRadioButtonId = "fogRadioButton";
  fogRadioButtonCaption = "NEBBIA";

  cancellationRadioButtonId = "cancellationRadioButton";
  cancellationRadioButtonCaption = "CANCELLAZIONE";

  allRadioButtonId = "allRadioButton";
  allRadioButtonCaption = "ENTRAMBI";

  percentageRadioButtonId = "percentageRadioButton";
  percentageRadioButtonCaption = "%";

  optionRadioButtonsMap = new Map([
    [ this.fogRadioButtonId,          { analysisMode : GlobalData.analysisModes.doubt.fog,          doubtPanelMode : GlobalData.analysisPanelModes.doubt.fog } ],
    [ this.cancellationRadioButtonId, { analysisMode : GlobalData.analysisModes.doubt.cancellation, doubtPanelMode : GlobalData.analysisPanelModes.doubt.cancellation } ],
    [ this.allRadioButtonId,          { analysisMode : GlobalData.analysisModes.doubt.all,          doubtPanelMode : GlobalData.analysisPanelModes.doubt.all } ],
    [ this.percentageRadioButtonId,   { analysisMode : GlobalData.analysisModes.doubt.percentage,   doubtPanelMode : GlobalData.analysisPanelModes.doubt.percentage } ]
  ]);

  state = {
    optionRadioButtonsStates : [
      { id : this.fogRadioButtonId,          pressed : this.props.doubtPanelMode === this.optionRadioButtonsMap.get(this.fogRadioButtonId).doubtPanelMode },
      { id : this.cancellationRadioButtonId, pressed : this.props.doubtPanelMode === this.optionRadioButtonsMap.get(this.cancellationRadioButtonId).doubtPanelMode },
      { id : this.allRadioButtonId,          pressed : this.props.doubtPanelMode === this.optionRadioButtonsMap.get(this.allRadioButtonId).doubtPanelMode },
      { id : this.percentageRadioButtonId,   pressed : this.props.doubtPanelMode === this.optionRadioButtonsMap.get(this.percentageRadioButtonId).doubtPanelMode }
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
    this.props.containerSetDoubtPanelMode(value.doubtPanelMode);
  };

  render()
  {
    return (
      <>
        <TerritoryDescriptionSubPanel
          title="L'ORGANIZZAZIONE DELLA NEBBIA"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur dictum sapien sed sollicitudin"
          informationSheetRoute="/doubt/phase1/focus"
          informationSheetDescription="SCHEDA"
          itineraryStop2Route="/doubt/phase2"
          itineraryStop2Description="TAPPA 2"
          itineraryStop3Route="/doubt/phase3"
          itineraryStop3Description="TAPPA 3"
        />

        <div className="territory-doubt-panel">


          <TerritoryDoubtMainOptionsSubPanel
            callStateContainerRadioButtonPressed={this.optionRadioButtonPressed}

            fogRadioButtonId={this.fogRadioButtonId}
            fogRadioButtonCaption={this.fogRadioButtonCaption}
            fogRadioButtonPressed={this.state.optionRadioButtonsStates.find(item => item.id === this.fogRadioButtonId).pressed}

            cancellationRadioButtonId={this.cancellationRadioButtonId}
            cancellationRadioButtonCaption={this.cancellationRadioButtonCaption}
            cancellationRadioButtonPressed={this.state.optionRadioButtonsStates.find(item => item.id === this.cancellationRadioButtonId).pressed}

            allRadioButtonId={this.allRadioButtonId}
            allRadioButtonCaption={this.allRadioButtonCaption}
            allRadioButtonPressed={this.state.optionRadioButtonsStates.find(item => item.id === this.allRadioButtonId).pressed}
          />
        </div>

        <div className="territory-percentage-panel">
          <TerritoryPercentageSubPanel
            callStateContainerRadioButtonPressed={this.optionRadioButtonPressed}

            percentageRadioButtonId={this.percentageRadioButtonId}
            percentageRadioButtonCaption={this.percentageRadioButtonCaption}
            percentageRadioButtonPressed={this.state.optionRadioButtonsStates.find(item => item.id === this.percentageRadioButtonId).pressed}
          />
        </div>
      </>
    );
  }
}
