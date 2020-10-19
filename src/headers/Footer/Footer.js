import React from "react";

import styles from "./Footer.module.css";

class Footer extends React.Component {
  render() {
    return (
      <footer className={["text-center", "d-flex", "align-items-center", "justify-content-center", styles.footer].join(" ")}>
        <p className="">
          Atlante Calvino © 2017-2020
        </p>
      </footer>
    );
  }
}

export default Footer;
