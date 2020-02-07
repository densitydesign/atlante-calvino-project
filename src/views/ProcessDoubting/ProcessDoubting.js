import React, { Component } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

import GlobalData from '../../utilities/GlobalData';

import MainMenu from '../../general/MainMenu';
import PageTitle from '../../general/PageTitle';
import MoreInfo from '../../general/MoreInfo';
import CompassButton from '../../general/CompassButton/CompassButton';
import HelpSidePanel from '../../panels/HelpSidePanel/HelpSidePanel';

import Loading from '../../general/Loading';

// import Options from '../../general/Options';
// import Search from '../../general/Search';
// import RangeFilter from '../../general/RangeFilter';

class ProcessDoubting extends Component {
  render() {
    return (
      <div className="process-doubting main">

        {/* <HelpSidePanel
					open={this.state.helpSidePanelOpen}
					page={helpPage}
					closeButtonClicked={this.toggleHelpSidePanel} /> */}

        <div className="top-nav navigations">
          <MainMenu className = "main-menu" style = {{gridColumn: 'span 1'}}/>
					<PageTitle title = {"Dubbi fase 2"} style = {{gridColumn: 'span 21'}}/>

          <MoreInfo
						style={{ gridColumn: "span 1" }}
						onClicked={this.toggleHelpSidePanel}
					/>
					<CompassButton
						style={{
						gridColumn: "span 1",
						color: "white",
						backgroundColor: "black"
						}}
					/>
        </div>

        <div className="bottom-nav navigations"></div>
        
      </div>
      
    );
  }
}

export default ProcessDoubting;
