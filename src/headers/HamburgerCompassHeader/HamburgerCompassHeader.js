import React from 'react';
import '../../App.css';
import CompassButton from '../../general/CompassButton/CompassButton';
import MainMenu from '../../general/MainMenu/MainMenu';

export default class HamburgerCompassHeader extends React.Component
{
  render()
  {
    return (
      <div className="top-nav navigations">
        <MainMenu style={{ gridColumn : "span 1" }} />
        <div style={{ gridColumn : "span 22" }} />
        <CompassButton toggleFlowOfStories={this.props.toggleFlowOfStories} style={{ gridColumn : "span 1" }} />
      </div>
    );
  }
}
