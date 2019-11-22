import React from 'react';

import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';

import ViewSelector from '../ViewSelector/ViewSelector';
import PhenomenaIntro from '../PhenomenaIntro/PhenomenaIntro';

export default function AtlasRouter()
{
  return (
    <BrowserRouter>

      <Route exact path="/"><ViewSelector /></Route>
      <Route exact path="/PhenomenaIntro"><PhenomenaIntro /></Route>

    </BrowserRouter>
  );
}