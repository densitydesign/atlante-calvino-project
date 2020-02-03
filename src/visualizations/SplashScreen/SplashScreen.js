
import React from 'react';

import * as d3 from 'd3';

import V from './splashScreen.d3';

import '../../App.css';
import './SplashScreen.css';

export default class SplashScreen extends React.Component
{
  loadData()
  {
    d3
      .xml("./logo-big-polygons-01.svg")
      .then(xml => xml)
      .then(data => {
        this.setState({
          data : data,
          isLoading : false
        });
      })
  }

  componentDidMount()
  {
    this.loadData();

    V.initialize(this._rootNode);
  }
  
  componentWillUnmount()
  {
    V.destroy(this._rootNode);
  }

  _setRef = componentNode => this._rootNode = componentNode;

  render()
  {
//    return <div>pippo</div>;

/*
    return (
      <section className="container-fluid">
        <section id="interactive-logo" className="container">
          <div className="row d-flex align-items-center">
            <AnimatedLogo />
          </div>
        </section>
      </section>
    );
*/
/*
console.log("this.state.data.documentElement", this.state.data.documentElement);
//const s = new XMLSerializer().serializeToString(this.state.data.documentElement);
//const s = this.state.data.documentElement.toString();
//console.log("s : ", s);

    return (
      <section className="container-fluid">
        <section id="interactive-logo" className="container">
          <div className="row d-flex align-items-center">
            <div id="logo-box" className="col-12 col-sm-12 col-md-12 col-lg-10 mx-auto d-flex flex-column justify-content-center" dangerouslySetInnerHTML={{__html: this.state.data.documentElement}} >
            </div>
          </div>
        </section>
      </section>
    );
*/

    const style = { width : "100vh", height : "80vh", marginLeft : "30vh", flexGrow : 1, enableBackground : "new 0 0 324.8 150"};

    return <svg id={this.props.id} style={style} ref={this._setRef} viewBox="0 0 324.8 150"></svg>;
  }
}
