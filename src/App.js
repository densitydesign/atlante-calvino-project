import React from 'react';
import './App.css';
//import PlacesMatrixView from './PlacesMatrixView/PlacesMatrixView';
// import ContainerComp from './ContainerComp/ContainerComp';
import ViewSelector from './views/ViewSelector/ViewSelector';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import PhenomenaIntro from './views/PhenomenaIntro/PhenomenaIntro';

function App() {
  return (
    
    /*      <PlacesMatrixView /> */
    <BrowserRouter>

      <ViewSelector />

      <Switch>

        <Route path="/PhenomenaIntro"><PhenomenaIntro /></Route>

      </Switch>

    </BrowserRouter>
  );
}

export default App;
