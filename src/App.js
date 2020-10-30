import React from 'react';
import './general/HK Grotesk/WEB/stylesheet.css';


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import PlacesMatrixView from './PlacesMatrixView/PlacesMatrixView';
// import ContainerComp from './ContainerComp/ContainerComp';
import AtlasRouter from './views/AtlasRouter/AtlasRouter';

function App() {
  return (
    <>
      <AtlasRouter />
      <div id='index-menu-modal-container' />
    </>
  );
}

export default App;
