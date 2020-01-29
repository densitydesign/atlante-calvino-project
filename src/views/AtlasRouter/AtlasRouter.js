import React from 'react';

import {
  BrowserRouter,
  Route
} from 'react-router-dom';

import SplashScreen from '../SplashScreen/SplashScreen';
import StaticSplashScreen from '../StaticSplashScreen/StaticSplashScreen';
import AtlasIntro from '../AtlasIntro/AtlasIntro';
import Compass from '../Compass/Compass';
import CompassTime from '../CompassTime/CompassTime';
import PhenomenaIntro from '../PhenomenaIntro/PhenomenaIntro';
import TerritoryWrapper from '../../visualizations/Territory/TerritoryWrapper';
import ProcessIntro from '../ProcessIntro/ProcessIntro';
import ProblemIntro from '../ProblemIntro/ProblemIntro';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import Trasformare from '../../Trasformare';
import Itineraries from '../Itineraries/Itineraries';
import AboutAndContacts from '../AboutAndContacts/AboutAndContacts';
import Project from '../Project/Project';
import ToolsAndMethods from '../ToolsAndMethods/ToolsAndMethods';
import PressReview from '../PressReview/PressReview';
import Articles from '../Articles/Articles';
import Combine from '../../visualizations/Combine/Combine';
import DoubtInformationSheet from '../../informationSheets/DoubtInformationSheet/DoubtInformationSheet';
import ShapeInformationSheet from '../../informationSheets/ShapeInformationSheet/ShapeInformationSheet';
import SpaceInformationSheet from '../../informationSheets/SpaceInformationSheet/SpaceInformationSheet';

export default function AtlasRouter()
{
  return (
    <BrowserRouter basename="/atlante-calvino-project">

      <Route exact path="/"><StaticSplashScreen /></Route>
      <Route exact path="/SplashScreen"><SplashScreen /></Route>
      <Route exact path="/Home"><HamburgerMenu /></Route>
      <Route exact path="/AtlasIntro"><AtlasIntro /></Route>
      <Route exact path="/Compass"><Compass /></Route>

      <Route exact path="/Compass/time"><CompassTime /></Route>

      <Route path="/Itineraries/"><Itineraries /></Route>

      <Route exact path="/Phenomena/intro"><PhenomenaIntro /></Route>
      <Route exact path="/Phenomena/territory"><TerritoryWrapper title="L'ARCIPELAGO DELLE OPERE ORDINATE PER" /></Route>

      <Route exact path="/Phenomena/shapeAnalysis">fenomeni / analisi della forma</Route>
      <Route exact path="/Phenomena/shapeAnalysis/informationSheet"><ShapeInformationSheet /></Route>

      <Route exact path="/Phenomena/doubtAnalysis">fenomeni / analisi del dubbio</Route>
      <Route exact path="/Phenomena/doubtAnalysis/informationSheet"><DoubtInformationSheet /></Route>

      <Route exact path="/Phenomena/spaceAnalysis">fenomeni / analisi dello spazio</Route>
      <Route exact path="/Phenomena/spaceAnalysis/informationSheet"><SpaceInformationSheet /></Route>



      <Route exact path="/Process/intro"><ProcessIntro /></Route>
      <Route exact path="/Process/combining"><Combine title="LA STRUTTURA DEI VOLUMI" /></Route>
      <Route exact path="/Process/doubting">processi / dubitare</Route>
      <Route exact path="/Process/transforming"><Trasformare title="LA MATRICE DEI LUOGHI" /></Route>





      <Route exact path="/Problem/intro"><ProblemIntro /></Route>
      <Route exact path="/Problem/realism">problema / realismo</Route>
      <Route exact path="/Problem/cancellation">problema / cancellazione</Route>
      <Route exact path="/Problem/plot">problema / trama</Route>

      <Route exact path="/About"><AboutAndContacts /></Route>
      <Route exact path="/Project"><Project/></Route>
      <Route exact path="/Tools"><ToolsAndMethods /></Route>
      <Route exact path="/News"><PressReview /></Route>
      <Route exact path="/Papers"><Articles /></Route>

    </BrowserRouter>
  );
}
