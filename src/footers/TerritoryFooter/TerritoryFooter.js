
import React from 'react';
import Options from '../../general/Options/Options';

import '../../App.css';

export default class TerritoryFooter extends React.Component
{
  state = {
    steps : {
      multiple : false,
      options : [
        { label : "territorio", status : true },
        { label : "dubbio", status : false },
        { label : "forma", status : false },
        { label : "realismo", setatus : false }
      ]
    }
  };

  changeSteps = newOptions => this.props.callTerritorySetHighlightMode(this.getActiveOption(newOptions));

  getActiveOption = options => options.find(item => item.status === true).label;

  render()
  {
    return (
      <div className="bottom-nav navigations">

        <Options
          title="Tappe"
          data={this.state.steps}
          style={{ gridColumn : "span 8", textAlign : "center" }}
          changeOptions = { this.changeSteps }
        />

      </div>
    );
  }
}