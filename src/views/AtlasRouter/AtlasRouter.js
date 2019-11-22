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
import NavMenu from '../NavMenu/NavMenu';

export default function AtlasRouter()
{
  return (
    <BrowserRouter>

      <Route exact path="/">
        <ViewSelector route="Compass" text="Bussola" />        
        <ViewSelector route="PhenomenaIntro" text="Fenomeno" />
        <ViewSelector route="ProcessIntro" text="Processo" />
        <ViewSelector route="ProblemIntro" text="Problema" />
        <NavMenu />        
      </Route>
      <Route exact path="/Compass"><Compass /></Route>
      <Route exact path="/PhenomenaIntro"><PhenomenaIntro /></Route>
      <Route exact path="/ProcessIntro"><ProcessIntro /></Route>
      <Route exact path="/ProblemIntro"><ProblemIntro /></Route>
      <Route exact path="/About">About</Route>
      <Route exact path="/Tools">Strumenti</Route>
      <Route exact path="/News">Rassegna</Route>
      <Route exact path="/Papers">Articoli</Route>

    </BrowserRouter>
  );
}