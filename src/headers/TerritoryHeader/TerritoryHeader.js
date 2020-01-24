import React from 'react';
import MainMenu from '../../general/MainMenu/MainMenu';
import Options from '../../general/Options/Options';
import Search from '../../general/Search/Search';
import GlobalData from '../../utilities/GlobalData';
import CompassButton from '../../general/CompassButton/CompassButton';
import MoreInfo from '../../general/MoreInfo/MoreInfo';
import PageTitle from "../../general/PageTitle";

export default class TerritoryHeader extends React.Component
{
  chronologyLabel = "cronologia";
  volumesLabel = "volume";

  state = {
    highlightModes : {
      multiple : false,
      options : [
        { label : this.chronologyLabel, status : true },
        { label : this.volumesLabel, status : false }
      ]
    }

  };

  highlightModeMap = new Map([
    [ this.chronologyLabel, GlobalData.analysisModes.noAnalysis.chronology ],
    [ this.volumesLabel, GlobalData.analysisModes.noAnalysis.volumes ]
  ]);

  changeHighlightModes = newOptions => this.props.callTerritorySetHighlightMode(this.highlightModeMap.get(this.getActiveOption(newOptions)));

  getActiveOption = options => options.find(item => item.status === true).label;

  changeTextsData = newOptions => this.props.callTerritoryApplySearchFilterBySearchResults(newOptions);

  changeSearchInput = input => this.props.callTerritoryApplySearchFilterByInputText(input);

  render()
  {
    return (
      <div className="top-nav navigations">

        <MainMenu style={{ gridColumn : "span 1" }} />
        <PageTitle title={"L'ARCIPELAGO DELLE OPERE ORDINATE PER"} style={{ gridColumn: "span 7" }} />


        <Options
          title=""
          data={this.state.highlightModes}
          style={{ gridColumn : "span 7", textAlign : "center" }}
          changeOptions={ this.changeHighlightModes }
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
