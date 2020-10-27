import React from "react"

import CloseButton from "../../general/CloseButton/CloseButton"

import GlobalData from "../../utilities/GlobalData"

import TerritoryMainHelp from "../../helpPages/territory/TerritoryMainHelp/TerritoryMainHelp"
import TerritoryDoubtHelp from "../../helpPages/territory/TerritoryDoubtHelp/TerritoryDoubtHelp"
import TerritoryShapeHelp from "../../helpPages/territory/TerritoryShapeHelp/TerritoryShapeHelp"
import TerritorySpaceHelp from "../../helpPages/territory/TerritorySpaceHelp/TerritorySpaceHelp"

import TransformMainHelp from "../../helpPages/transform/TransformMainHelp/TransformMainHelp"
import ProcessCombiningMainHelp from "../../helpPages/plot/ProcessCombiningMainHelp/ProcessCombiningMainHelp"
import ProcessDoubtingMainHelp from "../../helpPages/doubting/ProcessDoubtingMainHelp/ProcessDoubtingMainHelp"

import PlotMainHelp from "../../helpPages/plot/PlotMainHelp/PlotMainHelp"
import RealismHelp from "../../helpPages/transform/RealismHelp/RealismHelp"

import CompassTimeHelp from "../../helpPages/compass/CompassTimeHelp/CompassTimeHelp"
import CompassBonesHelp from "../../helpPages/compass/CompassBonesHelp/CompassBonesHelp"

import "./HelpSidePanel.css"

export default class HelpSidePanel extends React.Component {
  render() {
    let helpPage

    switch (this.props.page) {
      case GlobalData.helpPages.territory.main:
        helpPage = <TerritoryMainHelp helpProps={{ ...this.props }} />
        break
      case GlobalData.helpPages.territory.space:
        helpPage = <TerritorySpaceHelp helpProps={{ ...this.props }} />
        break
      case GlobalData.helpPages.territory.doubt:
        helpPage = <TerritoryDoubtHelp helpProps={{ ...this.props }} />
        break
      case GlobalData.helpPages.territory.shape:
        helpPage = <TerritoryShapeHelp helpProps={{ ...this.props }} />
        break

      case GlobalData.helpPages.transform.main:
        helpPage = <TransformMainHelp />
        break
      case GlobalData.helpPages.combine.main:
        helpPage = <ProcessCombiningMainHelp />
        break
      case GlobalData.helpPages.processDoubting.main:
        helpPage = <ProcessDoubtingMainHelp />
        break

      case GlobalData.helpPages.plot.main:
        helpPage = <PlotMainHelp helpProps={{ ...this.props }} />
        break
      case GlobalData.helpPages.realism.main:
        helpPage = <RealismHelp />
        break

      case GlobalData.helpPages.compass.time:
        helpPage = <CompassTimeHelp />
        break
      case GlobalData.helpPages.compass.bones:
        helpPage = <CompassBonesHelp />
        break

      default:
        break
    }

    return (
      <>
        <div
          className={
            "help-side-panel " +
            (this.props.open
              ? "help-side-panel-open"
              : "help-side-panel-closed")
          }
        >
          <div>
            <CloseButton
              id="helpSidePanelCloseButton"
              onClicked={this.props.closeButtonClicked}
            />
            {this.props.children ? this.props.children : helpPage}
          </div>
        </div>
      </>
    )
  }
}
