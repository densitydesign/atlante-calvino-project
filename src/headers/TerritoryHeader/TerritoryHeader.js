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
          title={this.props.t("territorio:Esplorare l'opera come un territorio")}
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
            availableIds={["S001","S002","S003","S004","S005","S006","S007","S008","S009","S010","S011","S012","S013","S014","S015","S016","S017","S018","S019","S020","S021","S022","S023","S024","S025","S026","S027","S028","S029","S030","S031","S032","S033","S034","S035","S036","S037","S038","S039","S040","S041","S042","S043","S044","S045","S046","S047","S048","S049","S050","S051","S052","S053","S054","S055","S056","S057","S058","S059","S060","S061","S062","S063","S064","S065","S066","S067","S068","S069","S070","S071","S072","S073","S074","S075","S076","S077","S078","S079","S080","S081","S082","S083","S084","S085","S086","S087","S088","S089","S090","S091","S092","S093","S094","S095","S096","S097","S098","S099","S100","S101","S102","S103","S104","S105","S106","S107","S108","S109","S110","S111","S112","S113","S114","S115","S116","S117","S118","S119","S120","S121","S122","S123","S124","S125","S126","S127","S128","S129","S130","S131","S132","S133","S134","S135","S136","S137","S138","S139","S140","S141","S142","S143","S144","S145","S146","S147","S148","S149","S150","S151","S152","S153","S154","S155","S156","S157","S158","S159","S160","S161","S162","S163","S164","S165","S166","S167","S168","S169","S170","S171","S172","S173","S174","S175","S176","S177","S178","S179","S180","S181","S182","S183","S184","S185","S186","S187","S188","S189","S190","S191","S192","S193","S194","S195","S196","S197","S198","S199","S200","S201","S202","S203","S204","S205","S206","V001","V003","V005","V007","V008","V009","V010","V011","V016","V018","V019","V020","V021"]}
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
