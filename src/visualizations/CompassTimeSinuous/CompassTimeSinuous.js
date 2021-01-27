
import React from 'react';

import V from './compassTimeSinuous.d3';
import CompassTimeDefs from './CompassTimeDefs';

import { withTranslation } from "react-i18next";

class CompassTimeSinuous extends React.Component
{
  componentDidMount()
  {
    V.initialize(this._rootNode, this.props.data, this.props.i18n.language);
  }

  componentWillUnmount()
  {
    V.destroy(this._rootNode);
  }

  _setRef = componentNode => this._rootNode = componentNode;

  render()
  {
    const style = {
      width: '100%',
      height: window.innerHeight - parseFloat(getComputedStyle(document.body).getPropertyValue("--navigation-height"))
    }

    return <svg id={this.props.id} style={style} ref={this._setRef}>

    <CompassTimeDefs />

    </svg>;
  }
}

export default withTranslation()(CompassTimeSinuous)