import React from 'react';
import { Link } from 'react-router-dom';

import '../../App.css';
import './NavMenu.css'

export default class NavMenu extends React.Component
{
  render()
  {
    let children = React.Children.toArray(this.props.children)
    let the_link = <Link to={this.props.route}>{this.props.text}</Link>

    if (children.length < 1) {
      let obj = { type: 'span'}
      children.push(obj)
    }

    return (
      <div className={this.props.className}>
        {
          children.map((d,i)=>{
            console.log(d);
            let this_class = ""
            if (d.props && d.props.dataClass) {
              this_class = d.props.dataClass
            }
            return <d.type key={i} className={this_class}>{the_link}</d.type>
          })
        }
      </div>
    );
  }

}

  // import React from 'react';
  // import { Link } from 'react-router-dom';
  //
  // import '../../App.css';
  // import './NavMenu.css'
  //
  // export default class NavMenu extends React.Component
  // {
  //   render()
  //   {
  //     return (
  //       <div className="nav-menu-cell-grid" >
  //         <div className="nav-menu-cell"><Link to="/About"><h2>About</h2></Link></div>
  //         <div className="nav-menu-cell"><Link to="/Tools"><h2>Strumenti</h2></Link></div>
  //         <div className="nav-menu-cell"><Link to="/News"><h2>Rassegna</h2></Link></div>
  //         <div className="nav-menu-cell"><Link to="/Papers"><h2>Articoli</h2></Link></div>
  //       </div>
  //     );
  //   }
  // }
