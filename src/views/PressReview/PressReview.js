
import React from 'react';

import HamburgerIntroHeader from '../../headers/HamburgerIntroHeader/HamburgerIntroHeader';
import PressItem from './PressItem';
import Footer from '../../headers/Footer/Footer';

import '../../general/GridsWithScrollableColumns/GridWithScrollableColumn.css';
import '../../general/GridsWithScrollableColumns/ScrollableColumn.css';

export default class PressReview extends React.Component
{
  render()
  {
    return (
      <>
        <HamburgerIntroHeader />
        <div className="grid-with-scrollable-column">
          <div className="scrollable-column-2 col-md-12 col-lg-12" style={{ height : "95%" }}>
            <h1>RASSEGNA STAMPA</h1>
            <PressItem href="www.corriere.it" linkText="Calvino sul Corriere" note="Corriere della Sera, 10 settembre 2010" />
            <PressItem href="www.corriere.it" linkText="Calvino sul Corriere" note="Corriere della Sera, 10 settembre 2010" />
            <PressItem href="www.corriere.it" linkText="Calvino sul Corriere" note="Corriere della Sera, 10 settembre 2010" />
            <PressItem href="www.corriere.it" linkText="Calvino sul Corriere" note="Corriere della Sera, 10 settembre 2010" />
            <PressItem href="www.corriere.it" linkText="Calvino sul Corriere" note="Corriere della Sera, 10 settembre 2010" />
            <PressItem href="www.corriere.it" linkText="Calvino sul Corriere" note="Corriere della Sera, 10 settembre 2010" />
            <PressItem href="www.corriere.it" linkText="Calvino sul Corriere" note="Corriere della Sera, 10 settembre 2010" />
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
