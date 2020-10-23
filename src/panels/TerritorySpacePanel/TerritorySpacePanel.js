import React from "react"

import TerritoryDescriptionSubPanel from "../TerritoryDescriptionSubPanel/TerritoryDescriptionSubPanel"
import TerritorySpaceMainOptionsSubPanel from "../TerritorySpaceMainOptionsSubPanel/TerritorySpaceMainOptionsSubPanel"
import TerritoryPercentageSubPanel from "../TerritoryPercentageSubPanel/TerritoryPercentageSubPanel"
import TerritoryPlaceHierarchiesSubPanel from "../TerritoryPlaceHierarchiesSubPanel/TerritoryPlaceHierarchiesSubPanel"
import GlobalData from "../../utilities/GlobalData"

import "./TerritorySpacePanel.css"

export default class TerritorySpacePanel extends React.Component {
  genericCosmicRadioButtonId = "genericCosmicRadioButton"
  genericCosmicRadioButtonCaption = "Cosmici generici"

  namedCosmicRadioButtonId = "namedCosmicRadioButton"
  namedCosmicRadioButtonCaption = "Cosmici localizzabili"

  genericTerrestrialRadioButtonId = "genericTerrestrialRadioButton"
  genericTerrestrialRadioButtonCaption = "Terrestri generici"

  namedTerrestrialRadioButtonId = "namedTerrestrialRadioButton"
  namedTerrestrialRadioButtonCaption = "Terrestri localizzabili"

  inventedRadioButtonId = "inventedRadioButton"
  inventedRadioButtonCaption = "Terrestri inventati"

  noSettingRadioButtonId = "noSettingRadioButton"
  noSettingRadioButtonCaption = "Nessun luogo"

  proportionRadioButtonId = "proportionRadioButton"
  proportionRadioButtonCaption = "%"

  placeHierarchiesRadioButtonId = "placeHierarchiesRadioButton"
  placeHierarchiesRadioButtonCaption = "Livelli spaziali"

  optionRadioButtonsMap = new Map([
    [
      this.genericCosmicRadioButtonId,
      {
        analysisMode: GlobalData.analysisModes.space.genericCosmic,
        spacePanelMode: GlobalData.analysisPanelModes.space.genericCosmic,
      },
    ],
    [
      this.namedCosmicRadioButtonId,
      {
        analysisMode: GlobalData.analysisModes.space.namedCosmic,
        spacePanelMode: GlobalData.analysisPanelModes.space.namedCosmic,
      },
    ],
    [
      this.genericTerrestrialRadioButtonId,
      {
        analysisMode: GlobalData.analysisModes.space.genericTerrestrial,
        spacePanelMode: GlobalData.analysisPanelModes.space.genericTerrestrial,
      },
    ],
    [
      this.namedTerrestrialRadioButtonId,
      {
        analysisMode: GlobalData.analysisModes.space.namedTerrestrial,
        spacePanelMode: GlobalData.analysisPanelModes.space.namedTerrestrial,
      },
    ],
    [
      this.inventedRadioButtonId,
      {
        analysisMode: GlobalData.analysisModes.space.invented,
        spacePanelMode: GlobalData.analysisPanelModes.space.invented,
      },
    ],
    [
      this.noSettingRadioButtonId,
      {
        analysisMode: GlobalData.analysisModes.space.noSetting,
        spacePanelMode: GlobalData.analysisPanelModes.space.noSetting,
      },
    ],
    [
      this.proportionRadioButtonId,
      {
        analysisMode: GlobalData.analysisModes.space.proportion,
        spacePanelMode: GlobalData.analysisPanelModes.space.proportion,
      },
    ],
    [
      this.placeHierarchiesRadioButtonId,
      {
        analysisMode: GlobalData.analysisModes.space.placeHierarchies,
        spacePanelMode: GlobalData.analysisPanelModes.space.placeHierarchies,
      },
    ],
  ])

  state = {
    optionRadioButtonsStates: [
      {
        id: this.genericCosmicRadioButtonId,
        pressed:
          this.props.spacePanelMode ===
          this.optionRadioButtonsMap.get(this.genericCosmicRadioButtonId)
            .spacePanelMode,
      },
      {
        id: this.namedCosmicRadioButtonId,
        pressed:
          this.props.spacePanelMode ===
          this.optionRadioButtonsMap.get(this.namedCosmicRadioButtonId)
            .spacePanelMode,
      },
      {
        id: this.genericTerrestrialRadioButtonId,
        pressed:
          this.props.spacePanelMode ===
          this.optionRadioButtonsMap.get(this.genericTerrestrialRadioButtonId)
            .spacePanelMode,
      },
      {
        id: this.namedTerrestrialRadioButtonId,
        pressed:
          this.props.spacePanelMode ===
          this.optionRadioButtonsMap.get(this.namedTerrestrialRadioButtonId)
            .spacePanelMode,
      },
      {
        id: this.inventedRadioButtonId,
        pressed:
          this.props.spacePanelMode ===
          this.optionRadioButtonsMap.get(this.inventedRadioButtonId)
            .spacePanelMode,
      },
      {
        id: this.noSettingRadioButtonId,
        pressed:
          this.props.spacePanelMode ===
          this.optionRadioButtonsMap.get(this.noSettingRadioButtonId)
            .spacePanelMode,
      },
      {
        id: this.proportionRadioButtonId,
        pressed:
          this.props.spacePanelMode ===
          this.optionRadioButtonsMap.get(this.proportionRadioButtonId)
            .spacePanelMode,
      },
      {
        id: this.placeHierarchiesRadioButtonId,
        pressed:
          this.props.spacePanelMode ===
          this.optionRadioButtonsMap.get(this.placeHierarchiesRadioButtonId)
            .spacePanelMode,
      },
    ],
  }

  optionRadioButtonPressed = (buttonId) => {
    console.log("buttonId", buttonId)
    const buttonState = this.state.optionRadioButtonsStates.find(
      (item) => item.id === buttonId
    )

    if (buttonState.pressed) return

    const optionRadioButtonsStatesCopy = [
      ...this.state.optionRadioButtonsStates,
    ]

    const buttonStateCopy = optionRadioButtonsStatesCopy.find(
      (item) => item.id === buttonId
    )
    buttonStateCopy.pressed = true

    const otherButtons = optionRadioButtonsStatesCopy.filter(
      (item) => item.id !== buttonId
    )
    otherButtons.forEach((button) => (button.pressed = false))

    this.setState({ optionRadioButtonsStates: optionRadioButtonsStatesCopy })

    const value = this.optionRadioButtonsMap.get(buttonId)
    this.props.callTerritorySetHighlightMode(value.analysisMode)
    this.props.containerSetSpacePanelMode(value.spacePanelMode)
  }

  render() {
    return (
      <>
        <TerritoryDescriptionSubPanel
          title="Vedere i luoghi"
          text="Come i luoghi d'ambientazione si distribuiscono nell'opera"
          informationSheetRoute="/space/phase1/focus"
          informationSheetDescription="SCHEDA"
          itineraryStop2Route="/space/phase2"
          itineraryStop2Description="TAPPA 2"
          itineraryStop3Route="/space/phase3"
          itineraryStop3Description="TAPPA 3"
        />

        <div className="territory-space-panel">
          <TerritorySpaceMainOptionsSubPanel
            callStateContainerRadioButtonPressed={this.optionRadioButtonPressed}
            genericCosmicRadioButtonId={this.genericCosmicRadioButtonId}
            genericCosmicRadioButtonCaption={
              this.genericCosmicRadioButtonCaption
            }
            genericCosmicRadioButtonPressed={
              this.state.optionRadioButtonsStates.find(
                (item) => item.id === this.genericCosmicRadioButtonId
              ).pressed
            }
            namedCosmicRadioButtonId={this.namedCosmicRadioButtonId}
            namedCosmicRadioButtonCaption={this.namedCosmicRadioButtonCaption}
            namedCosmicRadioButtonPressed={
              this.state.optionRadioButtonsStates.find(
                (item) => item.id === this.namedCosmicRadioButtonId
              ).pressed
            }
            genericTerrestrialRadioButtonId={
              this.genericTerrestrialRadioButtonId
            }
            genericTerrestrialRadioButtonCaption={
              this.genericTerrestrialRadioButtonCaption
            }
            genericTerrestrialRadioButtonPressed={
              this.state.optionRadioButtonsStates.find(
                (item) => item.id === this.genericTerrestrialRadioButtonId
              ).pressed
            }
            namedTerrestrialRadioButtonId={this.namedTerrestrialRadioButtonId}
            namedTerrestrialRadioButtonCaption={
              this.namedTerrestrialRadioButtonCaption
            }
            namedTerrestrialRadioButtonPressed={
              this.state.optionRadioButtonsStates.find(
                (item) => item.id === this.namedTerrestrialRadioButtonId
              ).pressed
            }
            inventedRadioButtonId={this.inventedRadioButtonId}
            inventedRadioButtonCaption={this.inventedRadioButtonCaption}
            inventedRadioButtonPressed={
              this.state.optionRadioButtonsStates.find(
                (item) => item.id === this.inventedRadioButtonId
              ).pressed
            }
            noSettingRadioButtonId={this.noSettingRadioButtonId}
            noSettingRadioButtonCaption={this.noSettingRadioButtonCaption}
            noSettingRadioButtonPressed={
              this.state.optionRadioButtonsStates.find(
                (item) => item.id === this.noSettingRadioButtonId
              ).pressed
            }
          />
        </div>
        <div className="territory-percentage-panel-double">
          <TerritoryPercentageSubPanel
            callStateContainerRadioButtonPressed={this.optionRadioButtonPressed}
            percentageRadioButtonId={this.proportionRadioButtonId}
            isDouble
            percentageRadioButtonCaption={this.proportionRadioButtonCaption}
            percentageRadioButtonPressed={
              this.state.optionRadioButtonsStates.find(
                (item) => item.id === this.proportionRadioButtonId
              ).pressed
            }
          />
          <TerritoryPlaceHierarchiesSubPanel
            callStateContainerRadioButtonPressed={this.optionRadioButtonPressed}
            placeHierarchiesRadioButtonId={this.placeHierarchiesRadioButtonId}
            placeHierarchiesRadioButtonCaption={
              this.placeHierarchiesRadioButtonCaption
            }
            placeHierarchiesRadioButtonPressed={
              this.state.optionRadioButtonsStates.find(
                (item) => item.id === this.placeHierarchiesRadioButtonId
              ).pressed
            }
          />
        </div>
      </>
    )
  }
}
