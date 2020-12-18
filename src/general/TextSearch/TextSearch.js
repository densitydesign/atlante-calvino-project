import React, { useEffect, useState } from "react";
import _ from "lodash";
import classnames from "classnames";
// import { withTranslation } from "react-i18next";

import Dropdown from "react-bootstrap/Dropdown";
import SearchDropDown from "../../general/Search/SearchDropDownControlled";
import styles from "./TextSearch.module.css";

import _titles from "./titles.json";
import _volumes from "./volumes.json";
import _periodicals from "./periodicals.json";
import { useTranslation } from "react-i18next";

export default function TextSearch({
  style,
  changeOptions,
  selectedOptions,
  availableIds,     // array of IDS, use this to filter available options in typeahead
  availableVolumes, // array of Volumes (as IDS), use this to filter available options in typeahead
  availableOptions, // array of options (title, volume, publication) use this to filter dropdown options
}) {
  console.log("text search", availableIds);
  let titles = _titles,
    volumes = _volumes,
    periodicals = _periodicals;

  if (availableIds && availableIds.length > 0) {
    titles = _titles.filter((d) => {
      return _.intersection(availableIds, d.value).length > 0;
    });
  }
  if (availableVolumes && availableVolumes.length > 0) {
    volumes = _volumes.filter(
      (d) => _.intersection(availableVolumes, d.value).length > 0
    );
  }

  let options = [
    { id: "title", label: "titolo", data: titles },
    { id: "volume", label: "volume", data: volumes },
    { id: "periodical", label: "periodico", data: periodicals },
  ];
  if (availableOptions && availableOptions.length > 0) {
    options = options.filter((o) => availableOptions.indexOf(o.id) > -1);
  }
  console.log(options);

  const [option, setOption] = useState(options[0].id);
  const { t } = useTranslation("translation");
  return (
    <div className={styles.container} style={style}>
      <div className={classnames("options-container", styles.selector)}>
        <Dropdown>
          <Dropdown.Toggle>
            <div>
              <span className="micro-title">{t("cerca_per")}</span>
              <span className="current-selection">{t(options.find(d=>d.id===option).label)}</span>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {options.map((d, i) => (
              <Dropdown.Item
                key={i}
                className={classnames(styles.dropdownItem, {
                  active: option === d.id,
                })}
                onClick={() => setOption(d.id)}
              >
                {t(d.label)}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <SearchDropDown
        data={{ options: options.find(d=>d.id===option).data }}
        changeOptions={changeOptions}
        selectedOptions={selectedOptions}
      />
    </div>
  );
}
