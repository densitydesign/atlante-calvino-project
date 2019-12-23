
import React from 'react';
import Options from '../../general/Options/Options';

import '../../App.css';

export default class TerritoryFooter extends React.Component
{
  state = {
    steps : {
      multiple : false,
      options : [
        { label : "dubbio", status : true },
        { label : "forma", status : false },
        { label : "realismo", setatus : false }
      ]
    }
  };

  changeSteps = (newOptions) => {};

  render()
  {
    return (
      <div className="bottom-nav navigations">

        <Options
          title="Tappe"
          data={this.state.steps}
          style={{gridColumn : "span 5", textAlign : "center" }}
          changeOptions = { this.changeSteps }
        />

      </div>
    );
  }
}