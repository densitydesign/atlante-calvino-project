import React from 'react';
import '../../App.css';
import CompassButton from '../../general/CompassButton/CompassButton';
import MainMenu from '../../general/MainMenu/MainMenu';
import MoreInfo from '../../general/MoreInfo/MoreInfo';

export default class HamburgerInfoCompassHeader extends React.Component
{
  render()
  {
    return (
      <div className="top-nav navigations">
        <MainMenu style={{ gridColumn : "span 1" }} />
        <div style={{ gridColumn : "span 21" }} />
        <MoreInfo
          style={{ gridColumn : "span 1" }}
          onClicked={this.props.helpButtonClicked} />
        <CompassButton style={{ gridColumn : "span 1"}} />
      </div>
    );
  }
}
