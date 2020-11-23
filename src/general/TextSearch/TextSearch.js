import React, { useState } from "react";
import classnames from "classnames";
import { withTranslation } from "react-i18next";

import Dropdown from "react-bootstrap/Dropdown";
import styles from "./TextSearch.module.css";

import titles from "./TextSearchData - title.tsv";
import volumes from "./TextSearchData - volume.tsv";
import publications from "./TextSearchData - publication.tsv";

const options = []

export default function TextSearch({ style, ...props }) {
	const [show, setShow] = useState(false);
	const [option, setOption] = useState(options[0])
  return (
    <div className={styles.container} style={style}>
      <div className={styles.selector}>
        {/* <Dropdown onToggle={()=>setShow(!show)} show={show}>
          <Dropdown.Toggle>
            {"this.props.title"}
          </Dropdown.Toggle>
          <Dropdown.Menu
            // className={classnames({
            //   // "d-flex": this.props.isFlex,
            //   // "flex-wrap": this.props.isFlex,
            // })}
            onToggle={()=>setShow(!show)}
            show={show}
          >
            {this.props.data.options.map((d, i) => {
              return (
                <Dropdown.Item
                  style={{ borderRight: "1px solid #000" }}
                  key={i}
                  name={d.label}
                  onClick={this.handleChange}
                  className={classnames({
                    active: d.status,
                    "dropdown-chessboard": this.props.isFlex,
                  })}
                >
                  {this.props.t("options." + d.label)}
                </Dropdown.Item>
              );
            })}
            {this.props.data.multiple && (
              <Dropdown.Item
                key={5}
                name="all"
                onClick={this.handleChange}
                className={classnames({
                  active: false,
                  "dropdown-chessboard": this.props.isFlex,
                })}
              >
                {this.props.isFlex
                  ? this.props.t("options.Inverti")
                  : this.props.t("options.Inverti_Selezione")}
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown> */}
      </div>
      <div className={styles.textInput}>Text Search</div>
    </div>
  );
}
