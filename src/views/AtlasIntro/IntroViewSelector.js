import React from 'react';

import '../../App.css';
import './AtlasIntro.css';
import '../HamburgerMenu/HamburgerMenu.css';

export default class IntroViewSelector extends React.Component
{
  render()
  {
    const children = React.Children.toArray(this.props.children)

    const style = this.props.image ?
    {
      backgroundImage : "url('" + process.env.PUBLIC_URL + this.props.image + "')",
      opacity : this.props.transitionData.percent,
      backgroundSize : "cover",
      backgroundRepeat: "no-repeat",
      width : "100%",
      height : "100%",
      border:"transparent"
    } :
    {
      width : "100%",
      height : "100%",
      border:"transparent"
    };

    return (

      <div className={this.props.className}>
        <div className={this.props.className} style={style} >
          {
            children.map((d, i) => <d.type key={i} style={this.props.keepLabelVisible ? {opacity : 1} : {}}>{d.props.children}</d.type>)
          }
        </div>
      </div>
    );
  }
}
