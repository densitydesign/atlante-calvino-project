
import React from 'react';

import TerritoryDescriptionSubPanel from '../TerritoryDescriptionSubPanel/TerritoryDescriptionSubPanel';
import TerritorySpaceMainOptionsSubPanel from '../TerritorySpaceMainOptionsSubPanel/TerritorySpaceMainOptionsSubPanel';
import TerritoryPercentageSubPanel from '../TerritoryPercentageSubPanel/TerritoryPercentageSubPanel';
import GlobalData from '../../utilities/GlobalData';

import RadioButton from '../../general/RadioButton/RadioButton';


import './TerritorySpacePanel.css';

export default class TerritorySpacePanel extends React.Component
{
  genericNonTerrestrialRadioButtonId = "genericNonTerrestrialRadioButton";
  genericNonTerrestrialRadioButtonCaption = "GENERICI";

  namedNonTerrestrialRadioButtonId = "namedNonTerrestrialRadioButton";
  namedNonTerrestrialRadioButtonCaption = "NOMINATI";

  genericTerrestrialRadioButtonId = "genericTerrestrialRadioButton";
  genericTerrestrialRadioButtonCaption = "GENERICI";

  namedTerrestrialRadioButtonId = "namedTerrestrialRadioButton";
  namedTerrestrialRadioButtonCaption = "NOMINATI";

  inventedRadioButtonId = "inventedRadioButton";
  inventedRadioButtonCaption = "INVENTATI";

  noSettingRadioButtonId = "noSettingRadioButton";
  noSettingRadioButtonCaption = "NO AMBIENT";

  proportionRadioButtonId = "proportionRadioButton";
  proportionRadioButtonCaption = "%";

  placeHierarchiesRadioButtonId = "placeHierarchiesRadioButton";
  placeHierarchiesRadioButtonCaption = "MEDUSE";

  optionRadioButtonsMap = new Map([
    [ this.genericNonTerrestrialRadioButtonId, { analysisMode : GlobalData.analysisModes.space.genericNonTerrestrial, spacePanelMode : GlobalData.analysisPanelModes.space.genericNonTerrestrial } ],
    [ this.namedNonTerrestrialRadioButtonId,   { analysisMode : GlobalData.analysisModes.space.namedNonTerrestrial,   spacePanelMode : GlobalData.analysisPanelModes.space.namedNonTerrestrial } ],
    [ this.genericTerrestrialRadioButtonId,    { analysisMode : GlobalData.analysisModes.space.genericTerrestrial,    spacePanelMode : GlobalData.analysisPanelModes.space.genericTerrestrial } ],
    [ this.namedTerrestrialRadioButtonId,      { analysisMode : GlobalData.analysisModes.space.namedTerrestrial,      spacePanelMode : GlobalData.analysisPanelModes.space.namedTerrestrial } ],
    [ this.inventedRadioButtonId,              { analysisMode : GlobalData.analysisModes.space.invented,              spacePanelMode : GlobalData.analysisPanelModes.space.invented } ],
    [ this.noSettingRadioButtonId,             { analysisMode : GlobalData.analysisModes.space.noSetting,             spacePanelMode : GlobalData.analysisPanelModes.space.noSetting } ],
    [ this.proportionRadioButtonId,            { analysisMode : GlobalData.analysisModes.space.proportion,            spacePanelMode : GlobalData.analysisPanelModes.space.proportion } ],
    [ this.placeHierarchiesRadioButtonId,      { analysisMode : GlobalData.analysisModes.space.placeHierarchies,      spacePanelMode : GlobalData.analysisPanelModes.space.placeHierarchies } ]
  ]);

  state = {
    optionRadioButtonsStates : [
      { id : this.genericNonTerrestrialRadioButtonId, pressed : this.props.spacePanelMode === this.optionRadioButtonsMap.get(this.genericNonTerrestrialRadioButtonId).spacePanelMode },
      { id : this.namedNonTerrestrialRadioButtonId,   pressed : this.props.spacePanelMode === this.optionRadioButtonsMap.get(this.namedNonTerrestrialRadioButtonId).spacePanelMode },
      { id : this.genericTerrestrialRadioButtonId,    pressed : this.props.spacePanelMode === this.optionRadioButtonsMap.get(this.genericTerrestrialRadioButtonId).spacePanelMode },
      { id : this.namedTerrestrialRadioButtonId,      pressed : this.props.spacePanelMode === this.optionRadioButtonsMap.get(this.namedTerrestrialRadioButtonId).spacePanelMode },
      { id : this.inventedRadioButtonId,              pressed : this.props.spacePanelMode === this.optionRadioButtonsMap.get(this.inventedRadioButtonId).spacePanelMode },
      { id : this.noSettingRadioButtonId,             pressed : this.props.spacePanelMode === this.optionRadioButtonsMap.get(this.noSettingRadioButtonId).spacePanelMode },
      { id : this.proportionRadioButtonId,            pressed : this.props.spacePanelMode === this.optionRadioButtonsMap.get(this.proportionRadioButtonId).spacePanelMode },
      { id : this.placeHierarchiesRadioButtonId,      pressed : this.props.spacePanelMode === this.optionRadioButtonsMap.get(this.placeHierarchiesRadioButtonId).spacePanelMode }
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
    this.props.containerSetSpacePanelMode(value.spacePanelMode);
  };

  render()
  {
    return (
      <>

        <TerritoryDescriptionSubPanel
          title="L'ORGANIZZAZIONE DEI LUOGHI"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur dictum sapien sed sollicitudin"
          informationSheetRoute=""
          informationSheetDescription="SCHEDA"
          itineraryStop2Route="/Process/transforming"
          itineraryStop2Description="TAPPA 2"
          itineraryStop3Route=""
          itineraryStop3Description="TAPPA 3"
        />

      <div className="territory-space-panel">

        <TerritorySpaceMainOptionsSubPanel
          callStateContainerRadioButtonPressed={this.optionRadioButtonPressed}

          genericNonTerrestrialRadioButtonId={this.genericNonTerrestrialRadioButtonId}
          genericNonTerrestrialRadioButtonCaption={this.genericNonTerrestrialRadioButtonCaption}
          genericNonTerrestrialRadioButtonPressed={this.state.optionRadioButtonsStates.find(item => item.id === this.genericNonTerrestrialRadioButtonId).pressed}

          namedNonTerrestrialRadioButtonId={this.namedNonTerrestrialRadioButtonId}
          namedNonTerrestrialRadioButtonCaption={this.namedNonTerrestrialRadioButtonCaption}
          namedNonTerrestrialRadioButtonPressed={this.state.optionRadioButtonsStates.find(item => item.id === this.namedNonTerrestrialRadioButtonId).pressed}

          genericTerrestrialRadioButtonId={this.genericTerrestrialRadioButtonId}
          genericTerrestrialRadioButtonCaption={this.genericTerrestrialRadioButtonCaption}
          genericTerrestrialRadioButtonPressed={this.state.optionRadioButtonsStates.find(item => item.id === this.genericTerrestrialRadioButtonId).pressed}

          namedTerrestrialRadioButtonId={this.namedTerrestrialRadioButtonId}
          namedTerrestrialRadioButtonCaption={this.namedTerrestrialRadioButtonCaption}
          namedTerrestrialRadioButtonPressed={this.state.optionRadioButtonsStates.find(item => item.id === this.namedTerrestrialRadioButtonId).pressed}

          inventedRadioButtonId={this.inventedRadioButtonId}
          inventedRadioButtonCaption={this.inventedRadioButtonCaption}
          inventedRadioButtonPressed={this.state.optionRadioButtonsStates.find(item => item.id === this.inventedRadioButtonId).pressed}

          noSettingRadioButtonId={this.noSettingRadioButtonId}
          noSettingRadioButtonCaption={this.noSettingRadioButtonCaption}
          noSettingRadioButtonPressed={this.state.optionRadioButtonsStates.find(item => item.id === this.noSettingRadioButtonId).pressed}

/>

        </div>

        <div className="territory-percentage-subpanel">

        <RadioButton
          id={this.placeHierarchiesRadioButtonId}
          caption={this.placeHierarchiesRadioButtonCaption}
          pressed={this.state.optionRadioButtonsStates.find(item => item.id === this.placeHierarchiesRadioButtonId).pressed}
          callStateContainerRadioButtonPressed={this.optionRadioButtonPressed}
        />

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
