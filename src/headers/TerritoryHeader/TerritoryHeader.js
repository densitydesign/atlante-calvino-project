import React from "react"
import MainMenu from "../../general/MainMenu/MainMenu"
import ToggleButton from "../../general/ToggleButton/ToggleButton"
import Search from "../../general/Search/Search"
import GlobalData from "../../utilities/GlobalData"
import CompassButton from "../../general/CompassButton/CompassButton"
import MoreInfo from "../../general/MoreInfo/MoreInfo"
import PageTitle from "../../general/PageTitle"
import TerritoryNoAnalysisDropDown from "../../general/TerritoryNoAnalysisDropDown/TerritoryNoAnalysisDropDown"

export default class TerritoryHeader extends React.Component {
  analysisLabel = "Filtra per volume"
  chronologyLabel = "Cronologia"
  volumesLabel = "Volumi"

  noAnalysisModeVisualizationMap = new Map([
    [
      GlobalData.analysisModes.noAnalysis.chronology,
      { label: this.chronologyLabel },
    ],
    [GlobalData.analysisModes.noAnalysis.volumes, { label: this.volumesLabel }],
  ])

  analysisModeToggleButtonId = "headerAnalysisModeToggleButton"

  analysisButtonVisualizationModeMap = new Map([
    [
      TerritoryNoAnalysisDropDown.chronologyButtonId,
      { analysisMode: GlobalData.analysisModes.noAnalysis.chronology },
    ],
    [
      TerritoryNoAnalysisDropDown.volumesButtonId,
      { analysisMode: GlobalData.analysisModes.noAnalysis.volumes },
    ],
  ])

  //  changeHighlightModes = newOptions => this.props.callTerritorySetHighlightMode(this.highlightModeMap.get(this.getActiveOption(newOptions)));

  toggleButtonPressed = (buttonId) => {
    switch (buttonId) {
      case this.analysisModeToggleButtonId:
        if (
          this.props.mainAnalysisMode === GlobalData.analysisModes.noAnalysis
        ) {
          this.props.toggleNoAnalysisDropDownPosition()
        }

        break

      case TerritoryNoAnalysisDropDown.chronologyButtonId:
      case TerritoryNoAnalysisDropDown.volumesButtonId:
        this.props.toggleNoAnalysisDropDownPosition()

        const visualizationMode = this.analysisButtonVisualizationModeMap.get(
          buttonId
        )
        this.props.callTerritorySetHighlightMode(visualizationMode.analysisMode)

        break

      default:
        console.log("buttonId", buttonId)
        break
    }
  }

  getActiveOption = (options) =>
    options.find((item) => item.status === true).label

  changeTextsData = (newOptions) => {
    const mustReset = newOptions.length === 0

    this.props.callTerritoryApplySearchFilterBySearchResults(
      mustReset,
      newOptions
    )
  }

  changeSearchInput = (input) =>
    this.props.callTerritoryApplySearchFilterByInputText(input)

  componentDidMount() {
    this.props.containerSetNoAnalysisDropDownRadioButtonPressed(
      this.toggleButtonPressed
    )
  }

  render() {
    let analysisModeToggleButtonCaption

    if (this.props.mainAnalysisMode === GlobalData.analysisModes.noAnalysis) {
      analysisModeToggleButtonCaption = this.noAnalysisModeVisualizationMap.get(
        this.props.noAnalysisMode
      ).label
    } else analysisModeToggleButtonCaption = this.analysisLabel

    return (
      <div className="top-nav navigations">
        <MainMenu style={{ gridColumn: "span 1" }} />
        <PageTitle
          title={"Esplorare l’opera come un territorio"}
          style={{ gridColumn: "span 7" }}
        />

        <div
          className="d-flex justify-content-center"
          style={{
            gridColumn: "span 4",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Filtra per volume
        </div>

        {/* <ToggleButton
          id={this.analysisModeToggleButtonId}
          style={{ gridColumn: "span 4", textAlign: "center" }}
          caption={analysisModeToggleButtonCaption}
          pressed={
            this.props.mainAnalysisMode === GlobalData.analysisModes.noAnalysis
          }
          callStateContainerToggleButtonPressed={this.toggleButtonPressed}
        /> */}

        {this.props.isLoading && (
          <div
            className="search-component"
            style={{ gridColumn: "span 10", paddingBottom: "5px" }}
          >
            /
          </div>
        )}

        {!this.props.isLoading && (
          <Search
            style={{ gridColumn: "span 10" }}
            data={this.props.textsData}
            filterBy={["desc"]}
            changeOptions={this.changeTextsData}
            onInputChange={this.changeSearchInput}
          />
        )}

        <MoreInfo
          helpSidePanelOpen={this.props.helpSidePanelOpen}
          style={{ gridColumn: "span 1" }}
          onClicked={this.props.helpButtonClicked}
        />

        <CompassButton
          style={{
            gridColumn: "span 1",
          }}
          containerToggleCompassPanel={this.props.containerToggleCompassPanel}
        />
      </div>
    )
  }
}
