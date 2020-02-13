

import React from 'react';

import ToggleButton from '../ToggleButton/ToggleButton';

import './TerritoryNoAnalysisDropDown.css';
import GlobalData from '../../utilities/GlobalData';

export default class TerritoryNoAnalysisDropDown extends React.Component
{
  static get chronologyButtonId() { return "doubtButton"; }
  chronologyButtonCaption = "CRONOLOGIA";

  static get volumesButtonId() { return "spaceButton"; }
  volumesButtonCaption = "VOLUMI";

  render()
  {
    return (
      <div className="territory-no-analysis-drop-down">

        <ToggleButton
          id={TerritoryNoAnalysisDropDown.chronologyButtonId}
          caption={this.chronologyButtonCaption}
          buttonColor={"white"}
          pressed={
            this.props.mainAnalysisMode === GlobalData.analysisModes.noAnalysis && 
            this.props.noAnalysisMode   === GlobalData.analysisModes.noAnalysis.chronology
          }
          callStateContainerToggleButtonPressed={this.props.callStateContainerToggleButtonPressed}
        />

        <ToggleButton
          id={TerritoryNoAnalysisDropDown.volumesButtonId}
          caption={this.volumesButtonCaption}
          buttonColor={"white"}
          pressed={
            this.props.mainAnalysisMode === GlobalData.analysisModes.noAnalysis && 
            this.props.noAnalysisMode   === GlobalData.analysisModes.noAnalysis.volumes
          }
          callStateContainerToggleButtonPressed={this.props.callStateContainerToggleButtonPressed}
        />

      </div>
    );
  }
}