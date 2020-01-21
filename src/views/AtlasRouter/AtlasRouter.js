import React from 'react';

import {
  BrowserRouter,
  Route
} from 'react-router-dom';

import SplashScreen from '../SplashScreen/SplashScreen';
import StaticSplashScreen from '../StaticSplashScreen/StaticSplashScreen';
import AtlasIntro from '../AtlasIntro/AtlasIntro';
import Compass from '../Compass/Compass';
import PhenomenaIntro from '../PhenomenaIntro/PhenomenaIntro';
import TerritoryWrapper from '../../visualizations/Territory/TerritoryWrapper';
import ProcessIntro from '../ProcessIntro/ProcessIntro';
import ProblemIntro from '../ProblemIntro/ProblemIntro';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import Trasformare from '../../Trasformare';
import Itineraries from '../Itineraries/Itineraries';
import AboutAndContacts from '../AboutAndContacts/AboutAndContacts';
import ToolsAndMethods from '../ToolsAndMethods/ToolsAndMethods';
import PressReview from '../PressReview/PressReview';
import Articles from '../Articles/Articles';
import Combine from '../../visualizations/Combine/Combine';

export default function AtlasRouter()
{
  return (
    <BrowserRouter basename="/atlante-calvino-project">

      <Route exact path="/"><StaticSplashScreen /></Route>
      <Route exact path="/SplashScreen"><SplashScreen /></Route>
      <Route exact path="/Home"><HamburgerMenu /></Route>
      <Route exact path="/AtlasIntro"><AtlasIntro /></Route>
      <Route exact path="/Compass"><Compass /></Route>

      <Route path="/Itineraries/"><Itineraries /></Route>

      <Route exact path="/Phenomena/intro"><PhenomenaIntro /></Route>
      <Route exact path="/Phenomena/territory"><TerritoryWrapper /></Route>
      <Route exact path="/Phenomena/shapeAnalysis">fenomeni / analisi della forma</Route>
      <Route exact path="/Phenomena/doubtAnalysis">fenomeni / analisi del dubbio</Route>
      <Route exact path="/Phenomena/spaceAnalysis">fenomeni / analisi dello spazio</Route>

      <Route exact path="/Process/intro"><ProcessIntro /></Route>
      <Route exact path="/Process/combining"><Combine /></Route>
      <Route exact path="/Process/doubting">processi / dubitare</Route>
      <Route exact path="/Process/transforming"><Trasformare title="Matrice dei luoghi" /></Route>

      <Route exact path="/Problem/intro"><ProblemIntro /></Route>
      <Route exact path="/Problem/realism">problema / realismo</Route>
      <Route exact path="/Problem/cancellation">problema / cancellazione</Route>
      <Route exact path="/Problem/plot">problema / trama</Route>

      <Route exact path="/About"><AboutAndContacts /></Route>
      <Route exact path="/Tools"><ToolsAndMethods /></Route>
      <Route exact path="/News"><PressReview /></Route>
      <Route exact path="/Papers"><Articles /></Route>

    </BrowserRouter>
  );
}
