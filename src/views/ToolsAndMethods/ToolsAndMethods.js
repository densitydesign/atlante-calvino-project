
import React from 'react';

import HamburgerIntroHeader from '../../headers/HamburgerIntroHeader/HamburgerIntroHeader';
import ToolMethodCell from './ToolMethodCell';
import Footer from '../../headers/Footer/Footer';

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
        <div className="grid-with-scrollable-column ">
          <div className="scrollable-column-3 col-lg-10">
            <h1>STRUMENTI</h1>
        <ToolMethodCell type="tool" title="Wanderer" description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur"/>

        <img src={process.env.PUBLIC_URL + '/wanderer1.png'} className="img-fluid image" alt="information complement" />
        </div>
        </div>
        <Footer />
      </>
    );
  }
}
