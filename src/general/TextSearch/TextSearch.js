import React, { useLayoutEffect, useState } from "react";
import classnames from "classnames";
// import { withTranslation } from "react-i18next";

import Dropdown from "react-bootstrap/Dropdown";
import SearchDropDown from "../../general/Search/SearchDropDownControlled";
import styles from "./TextSearch.module.css";

import _titles from "./titles.json";
import _volumes from "./volumes.json";
import _publications from "./publications.json";

export default function TextSearch({
  style,
  changeOptions,
  selectedOptions,
  availableIds,
}) {
  // console.log("IDS available in visualization:", availableIds)
  let titles = _titles, volumes = _volumes, publications = _publications;
  const options = [
    { id: "titles", label: { it: "Titolo", en: "Title" }, data: titles },
    { id: "volume", label: { it: "Volume", en: "Volume" }, data: volumes },
    {
      id: "publication",
      label: { it: "Sede di pubblicazione", en: "Publication" },
      data: publications,
    },
  ];
  // console.log(options)
  const [option, setOption] = useState(options[0]);
  return (
    <div className={styles.container} style={style}>
      <div className={classnames("options-container", styles.selector)}>
        <Dropdown>
          <Dropdown.Toggle>
            <div>
              <span className="micro-title">Cerca per</span>
              <span className="current-selection">{option.label.it}</span>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {options.map((d, i) => (
              <Dropdown.Item
                key={i}
                className={classnames(styles.dropdownItem, {
                  active: option === d,
                })}
                onClick={() => setOption(d)}
              >
                {d.label.it}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <SearchDropDown
        data={{ options: option.data }}
        changeOptions={changeOptions}
        selectedOptions={selectedOptions}
      />
    </div>
  );
}
