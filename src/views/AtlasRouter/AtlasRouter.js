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
      <Route exact path="/Home"><HamburgerMenu /></Route>
      <Route exact path="/AtlasIntro"><AtlasIntro /></Route>
      <Route exact path="/Compass"><Compass /></Route>

      <Route exact path="/Compass/time"><CompassTime /></Route>
      <Route exact path="/Compass/flux"><CompassFlux /></Route>

      <Route path="/Itineraries/"><Itineraries /></Route>

      <Route exact path="/Phenomena/intro"><PhenomenaIntro /></Route>
      <Route exact path="/Phenomena/territory">
        <TerritoryWrapper
          title="L'ARCIPELAGO DELLE OPERE PER"
          bottomPanelMode={GlobalData.bottomPanelModes.noAnalysis}
          mainAnalysisMode={GlobalData.analysisModes.noAnalysis}
        />
      </Route>

      <Route exact path="/Phenomena/territory/doubtAnalysis">
        <TerritoryWrapper
          title="L'ARCIPELAGO DELLE OPERE PER"
          bottomPanelMode={GlobalData.bottomPanelModes.doubt}
          mainAnalysisMode={GlobalData.analysisModes.doubt}
        />
      </Route>
      <Route exact path="/Phenomena/territory/doubtAnalysis/informationSheet"><DoubtInformationSheet /></Route>

      <Route exact path="/Phenomena/territory/spaceAnalysis">
        <TerritoryWrapper
          title="L'ARCIPELAGO DELLE OPERE PER"
          bottomPanelMode={GlobalData.bottomPanelModes.space}
          mainAnalysisMode={GlobalData.analysisModes.space}
        />
      </Route>
      <Route exact path="/Phenomena/territory/spaceAnalysis/informationSheet"><SpaceInformationSheet /></Route>

      <Route exact path="/Phenomena/territory/shapeAnalysis">
        <TerritoryWrapper
          title="L'ARCIPELAGO DELLE OPERE PER"
          bottomPanelMode={GlobalData.bottomPanelModes.shape}
          mainAnalysisMode={GlobalData.analysisModes.shape}
        />
      </Route>
      <Route exact path="/Phenomena/territory/shapeAnalysis/informationSheet"><ShapeInformationSheet /></Route>

      <Route exact path="/Process/intro"><ProcessIntro /></Route>
      <Route exact path="/Process/doubting"><ProcessDoubting /></Route>
      <Route exact path="/Process/doubting/Hesitation/informationSheet"><HesitationInformationSheet /></Route>
      <Route exact path="/Process/transforming"><Trasformare title="LA MATRICE DEI LUOGHI" /></Route>
      <Route exact path="/Process/transforming/Transform/informationSheet"><TransformInformationSheet /></Route>
      <Route exact path="/Process/combining"><Trama title="LA STRUTTURA DEI VOLUMI" /></Route>
      <Route exact path="/Process/combining/Combine/informationSheet"><CombineInformationSheet /></Route>

      <Route exact path="/Problem/intro"><ProblemIntro /></Route>
      <Route exact path="/Problem/cancellation-draft"><Df3 /></Route>

      <Route exact path="/Problem/cancellation"><Cancellazione /></Route>
      <Route exact path="/cancellation-sheet"><CancellationInformationSheet /></Route>

      <Route exact path="/Problem/realism">
        <Realismo title={'Realismo'}></Realismo>
      </Route>
      <Route exact path="/Problem/plot"><Trama2 title="COMBINARE"></Trama2></Route>
      <Route exact path="/realism-sheet"><RealismInformationSheet /></Route>

      <Route exact path="/equipe"><Equipe /></Route>
      <Route exact path="/Project"><Project/></Route>
      <Route exact path="/Tools"><ToolsAndMethods /></Route>
      <Route exact path="/News"><PressReview /></Route>
      <Route exact path="/Papers"><Articles /></Route>

    </BrowserRouter>
  );
}
