
import React from 'react';

import CloseButton from '../../general/CloseButton/CloseButton';

import './HelpSidePanel.css';

export default class HelpSidePanel extends React.Component
{
  render()
  {
    return (
      <div className={"help-side-panel " + (this.props.open ? "help-side-panel-open" : "help-side-panel-closed")}>
        <CloseButton id="helpSidePanelCloseButton" onClicked={this.props.closeButtonClicked} />
        Help
      </div>
    );
  }
}