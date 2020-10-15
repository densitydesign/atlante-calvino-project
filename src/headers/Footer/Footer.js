import React from 'react';
import '../../App.css';

class Footer extends React.Component
{
  render(){
  return (

      <footer className="footer text-center">
      <div className="container">
      <p className="">© Atlante Calvino 2017-{new Date().getFullYear()}</p></div>
</footer>
  );
}
}

export default Footer;
