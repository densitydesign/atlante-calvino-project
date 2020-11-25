import React, { useLayoutEffect, useState } from "react";
import _ from "lodash";
import classnames from "classnames";
// import { withTranslation } from "react-i18next";

import Dropdown from "react-bootstrap/Dropdown";
import SearchDropDown from "../../general/Search/SearchDropDownControlled";
import styles from "./TextSearch.module.css";

import _titles from "./titles.json";
import _volumes from "./volumes.json";
import _publications from "./publications.json";
import { useTranslation } from "react-i18next";

export default function TextSearch({
  style,
  changeOptions,
  selectedOptions,
  availableIds, // array of IDS, use this to filter available options in typeahead
  availableOptions // array of options (title, volume, publication) use this to filter dropdown options
}) {
  let titles = _titles,
      volumes = _volumes,
      publications = _publications;

  // console.log("IDS available in visualization:", availableIds)
  // console.log("titles not in viz:", _.difference(_titles.map(d=>d.id).flat(), availableIds))
  // console.log("all titles", _titles)
  if (availableIds && availableIds.length > 0) {
    titles = _titles.filter(
      (d) => _.intersection(availableIds, d.id).length > 0
    );
  }

  let options = [
    { id: "title", label: "titolo", data: titles },
    { id: "volume", label: "volume", data: volumes },
    {
      id: "publication",
      label: "sede di pubblicazione",
      data: publications,
    },
  ];
  if (availableOptions && availableOptions.length > 0) {
    options = options.filter(o=>availableOptions.indexOf(o.id)>-1);
  }
  const {t} = useTranslation("translation")
  const [option, setOption] = useState(options[0]);
  return (
    <div className={styles.container} style={style}>
      <div className={classnames("options-container", styles.selector)}>
        <Dropdown>
          <Dropdown.Toggle>
            <div>
              <span className="micro-title">{t("cerca_per")}</span>
              <span className="current-selection">{t(option.label)}</span>
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
                {t(d.label)}
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
