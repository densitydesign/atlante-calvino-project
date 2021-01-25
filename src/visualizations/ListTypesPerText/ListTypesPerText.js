
import React from 'react';

import V from './listTypesPerText.d3';

import { withTranslation } from "react-i18next";

class ListTypesPerText extends React.Component
{
  componentDidMount()
  {
    V.initialize(this._rootNode, this.props.data, this.props.t);
  }

  componentWillUnmount()
  {
    V.destroy(this._rootNode);
  }

  _setRef = componentNode => this._rootNode = componentNode;

  render()
  {
    const style = {
      height: '300px',
      marginTop: '1em',
      marginBottom: '2em'
    }
    return <svg id={this.props.id} style={style} ref={this._setRef}></svg>;
  }
}

export default withTranslation("elenchi-sheet")(ListTypesPerText)