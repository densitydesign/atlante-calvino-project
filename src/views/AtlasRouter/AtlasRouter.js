import React from 'react';

import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';

import ViewSelector from '../ViewSelector/ViewSelector';
import Compass from '../Compass/Compass';
import PhenomenaIntro from '../PhenomenaIntro/PhenomenaIntro';
import ProcessIntro from '../ProcessIntro/ProcessIntro';
import ProblemIntro from '../ProblemIntro/ProblemIntro';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import PlacesMatrixView from '../../PlacesMatrixView/PlacesMatrixView';
import ContainerComp from '../../ContainerComp/ContainerComp';

export default function AtlasRouter()
{
  return (
    <BrowserRouter>

      <Route exact path="/">
        <HamburgerMenu />        
      </Route>
      <Route exact path="/Compass"><Compass /></Route>

      <Route exact path="/Spheres/shapes">sfere / le forme</Route>
      <Route exact path="/Spheres/doubt">sfere / il dubbio</Route>
      <Route exact path="/Spheres/spaces">sfere / gli spazi</Route>

      <Route exact path="/Phenomena/intro"><PhenomenaIntro /></Route>
      <Route exact path="/Phenomena/shapeAnalysis">fenomeni / analisi della forma</Route>
      <Route exact path="/Phenomena/doubtAnalysis">fenomeni / analisi del dubbio</Route>
      <Route exact path="/Phenomena/spaceAnalysis">fenomeni / analisi dello spazio</Route>

      <Route exact path="/Process/intro"><ProcessIntro /></Route>
      <Route exact path="/Process/combining">processi / combinare</Route>
      <Route exact path="/Process/doubting">processi / dubitare</Route>
      <Route exact path="/Process/transforming"><PlacesMatrixView /></Route>

      <Route exact path="/Problem/intro"><ProblemIntro /></Route>
      <Route exact path="/Problem/realism">problema / realismo</Route>
      <Route exact path="/Problem/cancellation">problema / cancellazione</Route>
      <Route exact path="/Problem/plot">problema / trama</Route>

      <Route exact path="/About">About</Route>
      <Route exact path="/Tools">Strumenti</Route>
      <Route exact path="/News">Rassegna</Route>
      <Route exact path="/Papers">Articoli</Route>

    </BrowserRouter>
  );
}