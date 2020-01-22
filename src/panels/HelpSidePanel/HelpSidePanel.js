
import React from 'react';

import CloseButton from '../../general/CloseButton/CloseButton';

import GlobalData from '../../utilities/GlobalData';

import TerritoryMainHelp from '../../helpPages/territory/TerritoryMainHelp/TerritoryMainHelp';
import TerritoryPlaceHierarchiesHelp from '../../helpPages/territory/TerritoryPlaceHierarchiesHelp/TerritoryPlaceHierarchiesHelp';

import './HelpSidePanel.css';

export default class HelpSidePanel extends React.Component
{
  render()
  {
    let helpPage;

    switch(this.props.page)
    {
      case GlobalData.helpPages.territory.main             : helpPage = <TerritoryMainHelp />; break;
      case GlobalData.helpPages.territory.placeHierarchies : helpPage = <TerritoryPlaceHierarchiesHelp />; break;
      default : break;
    }

    return (
      <div className={"help-side-panel " + (this.props.open ? "help-side-panel-open" : "help-side-panel-closed")}>
        <CloseButton id="helpSidePanelCloseButton" onClicked={this.props.closeButtonClicked} />
        { helpPage }
      </div>
    );
  }
}
