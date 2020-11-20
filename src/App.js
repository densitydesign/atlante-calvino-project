import React, { Suspense } from 'react';
import LoadingWrapper from "./general/LoadingWrapper";
import './i18n'
import './general/HK Grotesk/WEB/stylesheet.css';


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import PlacesMatrixView from './PlacesMatrixView/PlacesMatrixView';
// import ContainerComp from './ContainerComp/ContainerComp';
import AtlasRouter from './views/AtlasRouter/AtlasRouter';

function App() {
  return (
    <Suspense fallback={<LoadingWrapper/>}>
      <AtlasRouter />
      <div id='index-menu-modal-container' />
    </Suspense>
  );
}

export default App;
