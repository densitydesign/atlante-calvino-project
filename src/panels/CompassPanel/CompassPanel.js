
import React from 'react';

import Compass from '../../views/Compass/Compass';

import './CompassPanel.css';

export default class CompassPanel extends React.Component
{
  render()
  {    
    return <div className={"compass-panel " + (this.props.open ? "compass-panel-open" : "compass-panel-closed")}>
        <Compass containerToggleCompassPanel={this.props.containerToggleCompassPanel} hide={!this.props.open} />
      </div>;
  }
}