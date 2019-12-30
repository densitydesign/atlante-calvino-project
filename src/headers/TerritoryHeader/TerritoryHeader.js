import React from 'react';
import MainMenu from '../../general/MainMenu/MainMenu';
import Options from '../../general/Options/Options';

export default class TerritoryHeader extends React.Component
{
  state = {
    hillColoringModes : {
      multiple : false,
      options : [
        { label : "cronologia", status : true },
        { label : "volume", status : false }
      ]
    }
  };

  changeHillColoringModes = newOptions => this.props.callTerritorySetHillColoringMode(this.getActiveOption(newOptions));

  getActiveOption = options => options.find(item => item.status === true).label;

  render()
  {
    return (
      <div className="top-nav navigations">

        <MainMenu style={{ gridColumn : "span 1" }} />

        <span style={{ gridColumn : "span 7" }}>L'ARCIPELAGO DELLE OPERE DI ITALO CALVINO PER</span>

        <Options
          title=""
          data={this.state.hillColoringModes}
          style={{ gridColumn : "span 8", textAlign : "center" }}
          changeOptions = { this.changeHillColoringModes }
        />

        <div style={{ gridColumn : "span 8" }} />

      </div>
    );
  }
}