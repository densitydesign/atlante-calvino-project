import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

export default class ViewSelector extends React.Component
{
  render()
  {
    const children = React.Children.toArray(this.props.children);

    if(children.length < 1) children.push({ type : "span" });

    const style = this.props.image ? { backgroundImage : "url('" + process.env.PUBLIC_URL + this.props.image + "')" } : {};

    const innerPart = (
      <div>
        {
          children.map((d, i) =>
          {
            const this_class = d.props && d.props.dataClass ? d.props.dataClass : "";

            return (
              <d.type key={i} className={this_class}>
                {this.props.text}
                <h2>{this.props.subtitle}</h2>
              </d.type>
            );
          })
        }
      </div>
    );

    const result = 
      this.props.route.includes("#") ? 
      <HashLink to={this.props.route} className={this.props.className} style={style} >{innerPart}</HashLink> :
          <Link to={this.props.route} className={this.props.className} style={style} >{innerPart}</Link>;

    return result;
  }
}
