import React from 'react';
import MainMenu from '../../general/MainMenu/MainMenu';
import Options from '../../general/Options/Options';
import ToggleButton from '../../general/ToggleButton/ToggleButton';
import Search from '../../general/Search/Search';
import GlobalData from '../../utilities/GlobalData';
import CompassButton from '../../general/CompassButton/CompassButton';
import MoreInfo from '../../general/MoreInfo/MoreInfo';
import PageTitle from "../../general/PageTitle";

export default class TerritoryHeader extends React.Component
{
  analysisLabel = "ANALISI";
  chronologyLabel = "CRONOLOGIA";
  volumesLabel = "VOLUME";
/*
  highlightModeMap = new Map([
    [ this.chronologyLabel, GlobalData.analysisModes.noAnalysis.chronology ],
    [ this.volumesLabel, GlobalData.analysisModes.noAnalysis.volumes ]
  ]);
*/
  noAnalysisModeVisualizationMap = new Map([
    [ GlobalData.analysisModes.noAnalysis.chronology, { label : this.chronologyLabel } ],
    [ GlobalData.analysisModes.noAnalysis.volumes,    { label : this.volumesLabel } ]
  ]);

  analysisModeToggleButtonId = "headerAnalysisModeToggleButton";

//  changeHighlightModes = newOptions => this.props.callTerritorySetHighlightMode(this.highlightModeMap.get(this.getActiveOption(newOptions)));

  toggleButtonPressed = buttonId => {    
console.log("-------------------");
console.log("toggleButtonPressed");
console.log("buttonId", buttonId);
console.log("this.props.mainAnalysisMode", this.props.mainAnalysisMode);        
console.log("this.props.noAnalysisMode", this.props.noAnalysisMode);
    
    switch(buttonId)
    {
      case this.analysisModeToggleButtonId :
        if(this.props.mainAnalysisMode === GlobalData.analysisModes.noAnalysis)
        {
          this.props.toggleNoAnalysisDropDownPosition();
        }

        break;  

      default : console.log("buttonId", buttonId); break;
    }
  }

  getActiveOption = options => options.find(item => item.status === true).label;

  changeTextsData = newOptions => 
  {
    const mustReset = newOptions.length === 0;

    this.props.callTerritoryApplySearchFilterBySearchResults(mustReset, newOptions);
  }

  changeSearchInput = input => this.props.callTerritoryApplySearchFilterByInputText(input);  

  componentDidMount()
  {
    this.props.containerSetNoAnalysisDropDownRadioButtonPressed(this.toggleButtonPressed);
  }

  render()
  {
    let analysisModeToggleButtonCaption;

    if(this.props.mainAnalysisMode === GlobalData.analysisModes.noAnalysis)
    {
      analysisModeToggleButtonCaption = this.noAnalysisModeVisualizationMap.get(this.props.noAnalysisMode).label;
    }
    else analysisModeToggleButtonCaption = this.analysisLabel;

    return (
      <div className="top-nav navigations">

        <MainMenu style={{ gridColumn : "span 1" }} />
        <PageTitle title={"L'ARCIPELAGO DELLE OPERE ORDINATE PER"} style={{ gridColumn: "span 7" }} />

        <ToggleButton 
          id={this.analysisModeToggleButtonId} 
          style={{ gridColumn : "span 8" }}
          caption={analysisModeToggleButtonCaption}
          pressed={this.props.mainAnalysisMode === GlobalData.analysisModes.noAnalysis}
          callStateContainerToggleButtonPressed={this.toggleButtonPressed} 
        />

        <Search
          style={{ gridColumn : "span 7" }}
          data={this.props.textsData}
          filterBy={["desc"]}
          changeOptions={ this.changeTextsData }
          onInputChange={ this.changeSearchInput }
        />

        <MoreInfo
          style={{ gridColumn : "span 1" }}
          onClicked={this.props.helpButtonClicked} />

        <CompassButton style={{ gridColumn : "span 1", color : "white", backgroundColor : "black" }} />

      </div>
    );
  }
}
