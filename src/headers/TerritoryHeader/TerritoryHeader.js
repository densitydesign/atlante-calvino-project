import React from "react";
import MainMenu from "../../general/MainMenu/MainMenu";
import Loading from "../../general/Loading";
// import ToggleButton from "../../general/ToggleButton/ToggleButton";
import Search from "../../general/Search/Search";
import GlobalData from "../../utilities/GlobalData";
import CompassButton from "../../general/CompassButton/CompassButton";
import MoreInfo from "../../general/MoreInfo/MoreInfo";
import PageTitle from "../../general/PageTitle";
import TextSearch from "../../general/TextSearch";
import TerritoryNoAnalysisDropDown from "../../general/TerritoryNoAnalysisDropDown/TerritoryNoAnalysisDropDown";
import { withTranslation } from "react-i18next";

class TerritoryHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchedItems:[]
    }
  }

  analysisLabel = "Cerca per titolo";
  chronologyLabel = "Cronologia";
  volumesLabel = "Volumi";

  noAnalysisModeVisualizationMap = new Map([
    [
      GlobalData.analysisModes.noAnalysis.chronology,
      { label: this.chronologyLabel },
    ],
    [GlobalData.analysisModes.noAnalysis.volumes, { label: this.volumesLabel }],
  ]);

  analysisModeToggleButtonId = "headerAnalysisModeToggleButton";

  analysisButtonVisualizationModeMap = new Map([
    [
      TerritoryNoAnalysisDropDown.chronologyButtonId,
      { analysisMode: GlobalData.analysisModes.noAnalysis.chronology },
    ],
    [
      TerritoryNoAnalysisDropDown.volumesButtonId,
      { analysisMode: GlobalData.analysisModes.noAnalysis.volumes },
    ],
  ]);

  //  changeHighlightModes = newOptions => this.props.callTerritorySetHighlightMode(this.highlightModeMap.get(this.getActiveOption(newOptions)));

  toggleButtonPressed = (buttonId) => {
    switch (buttonId) {
      case this.analysisModeToggleButtonId:
        if (
          this.props.mainAnalysisMode === GlobalData.analysisModes.noAnalysis
        ) {
          this.props.toggleNoAnalysisDropDownPosition();
        }

        break;

      case TerritoryNoAnalysisDropDown.chronologyButtonId:
      case TerritoryNoAnalysisDropDown.volumesButtonId:
        this.props.toggleNoAnalysisDropDownPosition();

        const visualizationMode = this.analysisButtonVisualizationModeMap.get(
          buttonId
        );
        this.props.callTerritorySetHighlightMode(
          visualizationMode.analysisMode
        );

        break;

      default:
        console.log("buttonId", buttonId);
        break;
    }
  };

  getActiveOption = (options) =>
    options.find((item) => item.status === true).label;

  changeTextsData = (newOptions) => {
    console.log(newOptions)
    const mustReset = newOptions.length === 0;
    this.props.callTerritoryApplySearchFilterBySearchResults(
      mustReset,
      newOptions
    );
  };

  changeTextsData2 = (newOptions) => {
    // console.log(newOptions)
    this.setState({
      searchedItems: newOptions
    })    
    // New options structure example
    // [
    //   {
    //     "label": "La giornata d'uno scrutatore",
    //     "id": "V009",
    //     "desc": "La giornata d'uno scrutatore - La giornata d'uno scrutatore",
    //     "status": false
    //   },
    //   {
    //     "label": "Diario in clinica",
    //     "id": "S107",
    //     "desc": "Diario in clinica - ",
    //     "status": false
    //   }
    // ]
    // It seems the visualizaitons only uses ID to perform filtering, so...
    let restructured_options = newOptions
    restructured_options = newOptions.map((d) => {
      const label = d.label;
      return d.value.map((dd) => ({
        label: label,
        id: dd,
        desc: label + " - " + label,
        status: false,
      }));
    });
    restructured_options = restructured_options.flat()
    // console.log(restructured_options)
    const mustReset = restructured_options.length === 0;
    this.props.callTerritoryApplySearchFilterBySearchResults(
      mustReset,
      restructured_options
    );
  };

  changeSearchInput = (input) => {
    this.props.callTerritoryApplySearchFilterByInputText(input);
  };

  componentDidMount() {
    this.props.containerSetNoAnalysisDropDownRadioButtonPressed(
      this.toggleButtonPressed
    );
  }

  render() {
    let analysisModeToggleButtonCaption;

    if (this.props.mainAnalysisMode === GlobalData.analysisModes.noAnalysis) {
      analysisModeToggleButtonCaption = this.noAnalysisModeVisualizationMap.get(
        this.props.noAnalysisMode
      ).label;
    } else analysisModeToggleButtonCaption = this.analysisLabel;

    return (
      <div className="top-nav navigations">
        <MainMenu style={{ gridColumn: "span 1" }} />
        <PageTitle
          title={this.props.t("territorio:header.esplorare_opera")}
          style={{ gridColumn: "span 9" }}
        />

        {/* <div
          className="d-flex justify-content-center"
          style={{
            gridColumn: "span 3",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {this.props.t("territorio:header.cerca_per_titolo")}
        </div> */}

        {/* <ToggleButton
          id={this.analysisModeToggleButtonId}
          style={{ gridColumn: "span 4", textAlign: "center" }}
          caption={analysisModeToggleButtonCaption}
          pressed={
            this.props.mainAnalysisMode === GlobalData.analysisModes.noAnalysis
          }
          callStateContainerToggleButtonPressed={this.toggleButtonPressed}
        /> */}

        {/* {this.props.isLoading && (
          <div
            className="search-component"
            style={{ gridColumn: "span 10", paddingBottom: "5px" }}
          >
            /
          </div>
        )} */}

        {/* {!this.props.isLoading && (
          <Search
            style={{ gridColumn: "span 9" }}
            data={this.props.textsData}
            filterBy={["desc"]}
            changeOptions={this.changeTextsData}
            onInputChange={this.changeSearchInput}
          />
        )} */}

        {this.props.isLoading &&
          <Loading style={{ gridColumn: "span 12" }} />
        }
        {!this.props.isLoading && (
          <TextSearch
            style={{ gridColumn: "span 12" }}
            changeOptions={(opts)=>{
              this.changeTextsData2(opts)
            }}
            selectedOptions={this.state.searchedItems}
            // availableOptions={["title","volume"]}
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
    );
  }
}

export default withTranslation("territorio")(TerritoryHeader);
