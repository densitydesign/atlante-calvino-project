import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

export default class ViewSelector extends React.Component
{
  render()
  {
    let children = React.Children.toArray(this.props.children)
    let the_link = this.props.route.includes("#") ? <HashLink to={this.props.route}>{this.props.text}</HashLink> : <Link to={this.props.route}>{this.props.text}</Link>
    let content;
    if (this.props.subtitle) content =
    (
      <>
        {the_link}
        <h2>{this.props.subtitle}</h2>
      </>
    )
    else content = the_link;

    if (children.length < 1) {
      let obj = { type: 'span'}
      children.push(obj)
    }

    const style = this.props.image ? { backgroundImage : "url('" + process.env.PUBLIC_URL + this.props.image + "')" } : {};

    return (

      <div className={this.props.className} style={style} >
        {
          children.map((d,i)=>{
            // console.log(d);
            let this_class = ""
            if (d.props && d.props.dataClass) {
              this_class = d.props.dataClass
            }
            if (this.props.subtitle)
            return content

            else
            return <d.type key={i} className={this_class}>{content}</d.type>
          })
        }
      </div>
    );
  }
}
