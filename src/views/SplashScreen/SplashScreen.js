
import React from 'react';
import V from './logo.js';

import './SplashScreen.css';

export default class SplashScreen extends React.Component
{
  componentDidMount()
  {
    this._chart = V.initialize(
      this._rootNode,
      this.props.data,
      this.props.originalData);
  }

  componentDidUpdate()
  {
    V.update(null);
  }

  componentWillUnmount()
  {
    V.destroy(this._rootNode);
  }

  _setRef(componentNode)
  {
    this._rootNode = componentNode;
  }

  render()
  {
    return <div>pippo</div>;
/*    
    return (
      <section class="container-fluid">
        <section id="interactive-logo" class="container">
          <div class="row d-flex align-items-center">
            <div id="logo-box" class="col-12 col-sm-12 col-md-12 col-lg-10 mx-auto d-flex flex-column justify-content-center">
            </div>
          </div>
        </section>
      </section>
    );
*/
  }
}