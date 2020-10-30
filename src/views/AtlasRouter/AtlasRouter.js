import React from 'react';

import {
  BrowserRouter,
  Route
} from 'react-router-dom';

import GlobalData from '../../utilities/GlobalData';
import SplashScreenWrapper from '../../visualizations/SplashScreen/SplashScreenWrapper';
import SplashScreen2 from '../../visualizations/SplashScreen2/';
import AtlasIntro from '../AtlasIntro/AtlasIntro';
import Compass from '../Compass/Compass';
import CompassTime from '../CompassTime/CompassTime';
import CompassFlux from '../CompassFlux/CompassFlux';
import PhenomenaIntro from '../PhenomenaIntro/PhenomenaIntro';
import TerritoryWrapper from '../../visualizations/Territory/TerritoryWrapper';
import ProcessIntro from '../ProcessIntro/ProcessIntro';
import ProblemIntro from '../ProblemIntro/ProblemIntro';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import IndexMenu from '../IndexMenu';
import Trasformare from '../../Trasformare';
import Itineraries from '../Itineraries/Itineraries';
import Equipe from '../Equipe/Equipe';
import Project from '../Project/Project';
import ToolsAndMethods from '../ToolsAndMethods/ToolsAndMethods';
import PressReview from '../PressReview/PressReview';
import Articles from '../Articles/Articles';
import DoubtInformationSheet from '../../informationSheets/DoubtInformationSheet/DoubtInformationSheet';
import ShapeInformationSheet from '../../informationSheets/ShapeInformationSheet/ShapeInformationSheet';
import SpaceInformationSheet from '../../informationSheets/SpaceInformationSheet/SpaceInformationSheet';
import HesitationInformationSheet from '../../informationSheets/HesitationInformationSheet/HesitationInformationSheet';
import TransformInformationSheet from '../../informationSheets/TransformInformationSheet/TransformInformationSheet';
import CombineInformationSheet from '../../informationSheets/CombineInformationSheet/CombineInformationSheet';
import CancellationInformationSheet from '../../informationSheets/CancellationInformationSheet';
import PlotInformationSheet from '../../informationSheets/PlotInformationSheet';
import Trama from '../../visualizations/Trama';
import Trama2 from '../../visualizations/Trama2';
import Realismo from '../../visualizations/Realismo';
import RealismInformationSheet from '../../informationSheets/RealismInformationSheet';
import ProcessDoubting from '../ProcessDoubting/ProcessDoubting';
import Df3 from '../Df3';
import Cancellazione from '../Cancellazione';

export default function AtlasRouter()
{
  return (
    <BrowserRouter basename="/atlante-calvino-project">

{/*      <Route exact path="/"><StaticSplashScreen /></Route> */}
      {/* <Route exact path="/"><SplashScreenWrapper /></Route> */}
      <Route exact path="/"><SplashScreen2 /></Route>
      <Route exact path="/IntroFinished"><HamburgerMenu backRoute="/" /></Route>
      <Route exact path="/navigation"><IndexMenu /></Route>
      <Route exact path="/HomeIndex"><IndexMenu /></Route>
      <Route exact path="/AtlasIntro"><AtlasIntro /></Route>
      <Route exact path="/compass"><Compass /></Route>
      <Route exact path="/compass/time-and-works"><CompassTime /></Route>
      <Route exact path="/compass/flows-of-stories"><CompassFlux /></Route>

      <Route path="/itineraries"><Itineraries /></Route>

      <Route exact path="/phase1-phenomena"><PhenomenaIntro /></Route>
      <Route exact path="/archipelago">
        <TerritoryWrapper
          title="L'ARCIPELAGO DELLE OPERE PER"
          bottomPanelMode={GlobalData.bottomPanelModes.noAnalysis}
          mainAnalysisMode={GlobalData.analysisModes.noAnalysis}
        />
      </Route>

      <Route exact path="/doubt/phase1">
        <TerritoryWrapper
          title="L'ARCIPELAGO DELLE OPERE PER"
          bottomPanelMode={GlobalData.bottomPanelModes.doubt}
          mainAnalysisMode={GlobalData.analysisModes.doubt}
        />
      </Route>
      <Route exact path="/doubt/phase1/focus"><DoubtInformationSheet /></Route>

      <Route exact path="/space/phase1">
        <TerritoryWrapper
          title="L'ARCIPELAGO DELLE OPERE PER"
          bottomPanelMode={GlobalData.bottomPanelModes.space}
          mainAnalysisMode={GlobalData.analysisModes.space}
        />
      </Route>
      <Route exact path="/space/phase1/focus"><SpaceInformationSheet /></Route>

      <Route exact path="/form/phase1">
        <TerritoryWrapper
          title="L'ARCIPELAGO DELLE OPERE PER"
          bottomPanelMode={GlobalData.bottomPanelModes.shape}
          mainAnalysisMode={GlobalData.analysisModes.shape}
        />
      </Route>
      <Route exact path="/Phenomena/territory/shapeAnalysis/informationSheet"><ShapeInformationSheet /></Route>

      <Route exact path="/phase2-process"><ProcessIntro /></Route>
      <Route exact path="/doubt/phase2"><ProcessDoubting title= {'Dubitare'}/></Route>
      <Route exact path="/doubt/phase2/focus"><HesitationInformationSheet /></Route>
      <Route exact path="/space/phase2"><Trasformare title= {'Trasformare'} /></Route>
      <Route exact path="/space/phase2/focus"><TransformInformationSheet /></Route>
      <Route exact path="/form/phase2"><Trama title={'Combinare'}/></Route>
      <Route exact path="/space/phase3/focus"><CombineInformationSheet /></Route>

      <Route exact path="/phase3-problem"><ProblemIntro /></Route>
      <Route exact path="/Problem/cancellation-draft"><Df3 /></Route>

      <Route exact path="/doubt/phase3"><Cancellazione title={'Cancellazione'} /></Route>
      <Route exact path="/doubt/phase3/focus"><CancellationInformationSheet /></Route>

      <Route exact path="/space/phase3"> <Realismo title={'Realismo'}></Realismo></Route>
      <Route exact path="/realism-sheet"><RealismInformationSheet /></Route>

      <Route exact path="/equipe"><Equipe /></Route>
      <Route exact path="/form/phase3"><Trama2 title="Trama"></Trama2></Route>
      <Route exact path="/plot-sheet"><PlotInformationSheet /></Route>

      {/* <Route exact path="/About"><AboutAndContacts /></Route> */}
      <Route exact path="/project"><Project/></Route>
      <Route exact path="/capta"><ToolsAndMethods /></Route>
      <Route exact path="/News"><PressReview /></Route>
      <Route exact path="/publications"><Articles /></Route>

    </BrowserRouter>
  );
}
