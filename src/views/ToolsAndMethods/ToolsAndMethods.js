
import React from 'react';

import HamburgerIntroHeader from '../../headers/HamburgerIntroHeader/HamburgerIntroHeader';
import ToolMethodCell from './ToolMethodCell';

import '../../App.css';
import './ToolsAndMethods.css';
import '../../general/GridsWithScrollableColumns/GridWithScrollableColumn.css';
import '../../general/GridsWithScrollableColumns/ScrollableColumn.css';

export default class ToolsAndMethods extends React.Component
{
  render()
  {
    return (
      <>
        <HamburgerIntroHeader />
        <div className="grid-with-scrollable-column">
          <div className="scrollable-column col-md-8 col-lg-8">
            <h1>STRUMENTI E METODI</h1>
        <ToolMethodCell type="tool" title="Wanderer"
      description="Testo di sintesi che descrive che cos'è il Wanderer (specificare
          la sua differenza rispetto all’Explorer), come
          funziona e che tipi di risultati riporta."/>

            </div>
        </div>
      </>
    );
  }
}
