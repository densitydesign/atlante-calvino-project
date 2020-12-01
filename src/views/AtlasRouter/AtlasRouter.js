import React from "react"

import LoadingWrapper from "../../general/LoadingWrapper"

<<<<<<< HEAD
import { BrowserRouter, Route, useHistory } from "react-router-dom"
=======
import { Router, Route } from "react-router-dom"
import { createHistoryHackedWithI18n } from '../../i18n'
>>>>>>> 7e3edac534d7ccca753e0dfb8ca8d05a620e3ca7

import GlobalData from "../../utilities/GlobalData"
import SplashScreen2 from "../../visualizations/SplashScreen2/"
import AtlasIntro from "../AtlasIntro/AtlasIntro"
import Compass from "../Compass/Compass"
import CompassTime from "../CompassTime/CompassTime"
import CompassFlux from "../CompassFlux/CompassFlux"
import Phases from "../Phases/Phases"
import TerritoryWrapper from "../../visualizations/Territory/TerritoryWrapper"
import IndexMenu from "../IndexMenu"
import Trasformare from "../../Trasformare"
import Itineraries from "../Itineraries/Itineraries"
import Instructions from "../Instructions"
import Equipe from "../Equipe/Equipe"
import Project from "../Project/Project"
import ToolsAndMethods from "../ToolsAndMethods/ToolsAndMethods"
import Articles from "../Articles/Articles"
import DoubtInformationSheet from "../../informationSheets/DoubtInformationSheet/DoubtInformationSheet"
import ShapeInformationSheet from "../../informationSheets/ShapeInformationSheet/ShapeInformationSheet"
import SpaceInformationSheet from "../../informationSheets/SpaceInformationSheet/SpaceInformationSheet"
import HesitationInformationSheet from "../../informationSheets/HesitationInformationSheet/HesitationInformationSheet"
import TransformInformationSheet from "../../informationSheets/TransformInformationSheet/TransformInformationSheet"
import CombineInformationSheet from "../../informationSheets/CombineInformationSheet/CombineInformationSheet"
import CancellationInformationSheet from "../../informationSheets/CancellationInformationSheet"
import PlotInformationSheet from "../../informationSheets/PlotInformationSheet"
import Trama from "../../visualizations/Trama"
import Trama2 from "../../visualizations/Trama2"
import Realismo from "../../visualizations/Realismo"
import RealismInformationSheet from "../../informationSheets/RealismInformationSheet"
import ProcessDoubting from "../ProcessDoubting/ProcessDoubting"
import Df3 from "../Df3"
import Cancellazione from "../Cancellazione"
import Capta from "../Capta"

const history = createHistoryHackedWithI18n({
  basename:"/atlante-calvino-project"
})

export default function AtlasRouter() {

  const history = useHistory()

  return (
    <Router history={history}>
      <Route exact path="/">
        <SplashScreen2 />
      </Route>
      <Route exact path="/navigation">
        <IndexMenu />
      </Route>
      <Route exact path="/HomeIndex">
        <IndexMenu />
      </Route>
      <Route exact path="/AtlasIntro">
        <AtlasIntro />
      </Route>
      <Route exact path="/compass">
        <Compass />
      </Route>
      <Route exact path="/compass/time-and-works">
        <CompassTime />
      </Route>
      <Route exact path="/compass/flows-of-stories">
        <CompassFlux />
      </Route>

      <Route path="/itineraries">
        <Itineraries />
      </Route>

      <Route exact path="/phases">
        <Phases />
      </Route>
      <Route exact path="/archipelago">
        <TerritoryWrapper
          router={history}
          title="L'ARCIPELAGO DELLE OPERE PER"
          bottomPanelMode={GlobalData.bottomPanelModes.noAnalysis}
          mainAnalysisMode={GlobalData.analysisModes.noAnalysis}
        />
      </Route>
      <Route exact path="/doubt/phase1">
        <TerritoryWrapper
          router={history}
          title="L'ARCIPELAGO DELLE OPERE PER"
          bottomPanelMode={GlobalData.bottomPanelModes.doubt}
          mainAnalysisMode={GlobalData.analysisModes.doubt}
        />
      </Route>
      <Route exact path="/doubt/phase1/focus">
        <DoubtInformationSheet />
      </Route>

      <Route exact path="/space/phase1">
        <TerritoryWrapper
          router={history}
          title="L'ARCIPELAGO DELLE OPERE PER"
          bottomPanelMode={GlobalData.bottomPanelModes.space}
          mainAnalysisMode={GlobalData.analysisModes.space}
        />
      </Route>
      <Route exact path="/space/phase1/focus">
        <SpaceInformationSheet />
      </Route>

      <Route exact path="/form/phase1">
        <TerritoryWrapper
          router={history}
          title="L'ARCIPELAGO DELLE OPERE PER"
          bottomPanelMode={GlobalData.bottomPanelModes.shape}
          mainAnalysisMode={GlobalData.analysisModes.shape}
        />
      </Route>
      <Route exact path="/form/phase1/focus">
        <ShapeInformationSheet />
      </Route>
      <Route exact path="/doubt/phase2">
        <ProcessDoubting title={"Dubitare"} />
      </Route>
      <Route exact path="/doubt/phase2/focus">
        <HesitationInformationSheet />
      </Route>
      <Route exact path="/space/phase2">
        <Trasformare title={"Trasformare"} />
      </Route>
      <Route exact path="/space/phase2/focus">
        <TransformInformationSheet />
      </Route>
      <Route exact path="/form/phase2">
        <Trama title={"Combinare"} />
      </Route>
      <Route exact path="/form/phase2/focus">
        <CombineInformationSheet />
      </Route>
      <Route exact path="/Problem/cancellation-draft">
        <Df3 />
      </Route>
      <Route exact path="/doubt/phase3">
        <Cancellazione title={"Cancellazione"} />
      </Route>
      <Route exact path="/doubt/phase3/focus">
        <CancellationInformationSheet />
      </Route>
      <Route exact path="/space/phase3">
        <Realismo title={"Realismo"} />
      </Route>
      <Route exact path="/space/phase3/focus">
        <RealismInformationSheet />
      </Route>
      <Route exact path="/equipe">
        <Equipe />
      </Route>
      <Route exact path="/form/phase3">
        <Trama2 title="Trama"></Trama2>
      </Route>
      <Route exact path="/form/phase3/focus">
        <PlotInformationSheet />
      </Route>
      <Route exact path="/instructions">
        <Instructions />
      </Route>
      <Route exact path="/project">
        <Project />
      </Route>
      <Route exact path="/toolsmeth">
        <ToolsAndMethods />
      </Route>
      <Route exact path="/capta">
        <Capta />
      </Route>
      <Route exact path="/publications">
        <Articles />
      </Route>

      <Route exact path="/loading-wrapper">
        <LoadingWrapper />
      </Route>
    </Router>
  )
}
