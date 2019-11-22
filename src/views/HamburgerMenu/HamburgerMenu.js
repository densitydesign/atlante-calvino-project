import React from 'react';

import NavMenu from '../NavMenu/NavMenu';
import ViewSelector from '../ViewSelector/ViewSelector';

export default class HamburgerMenu extends React.Component
{
  render()
  {
    return (
      <div>
        <ViewSelector route="Compass" text="Bussola" />                
                
        <ViewSelector route="Spheres/shape" text="Forma" />
        <ViewSelector route="Spheres/doubt" text="Dubbio" />
        <ViewSelector route="Spheres/spaces" text="Spazi" />

        <ViewSelector route="Phenomena/intro" text="Fenomeno" />
        <ViewSelector route="Phenomena/shapeAnalysis" text="Forma" />
        <ViewSelector route="Phenomena/doubtAnalysis" text="Dubbio" />
        <ViewSelector route="Phenomena/spaceAnalysis" text="Spazio" />

        <ViewSelector route="Process/intro" text="Processo" />
        <ViewSelector route="Process/transforming" text="Trasformare" />
        <ViewSelector route="Process/doubting" text="Dubitare" />
        <ViewSelector route="Process/combining" text="Combinare" />

        <ViewSelector route="Problem/intro" text="Problema" />
        <ViewSelector route="Problem/realism" text="Realismo" />
        <ViewSelector route="Problem/cancellation" text="Cancellazione" />
        <ViewSelector route="Problem/plot" text="Trama" />    

        <NavMenu />
      </div>
    );
  }
}