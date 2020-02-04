import React, { useState, useMemo, useRef, useEffect } from "react";
import groupBy from "lodash/groupBy";
import styles from "./Trama.module.css";

export default function MarimekkoLegend({
  selectedLegendEntries,
  setSelectedLegendEntries,
  legendMap
}) {
  const byGruppo = groupBy(
    legendMap.filter(x => x.gruppo),
    "gruppo"
  );
  const anyLegendEntrySelected = Object.keys(
    selectedLegendEntries || {}
  ).filter(k => selectedLegendEntries[k]).length;

  return (
    <div
      className={`h-100 v-100 ${
        anyLegendEntrySelected ? styles.legendItemsSelected : ""
      }`}
    >
      <div
        style={{ height: 40 }}
        className="d-flex flex-column justify-content-center"
      >
        <div>
          <button
            className="btn btn-sm btn-outline-dark"
            onClick={() => {
              setSelectedLegendEntries({});
            }}
          >
            RESET
          </button>
        </div>
      </div>
      <div className="mt-1">
        <h4>LEGENDA</h4>
      </div>
      {Object.keys(byGruppo).map(gruppo => (
        <div key={gruppo}>
          <div className={styles.legendGroupText}>{gruppo}</div>
          <div>
            {byGruppo[gruppo].map((item, i) => (
              <div
                key={i}
                className={`w-100 d-flex align-items-center ${
                  styles.legendEntry
                } ${selectedLegendEntries[item.valore] ? styles.selected : ""}`}
              >
                <div
                  className={styles.legendEntryColor}
                  style={{ backgroundColor: item.colore, cursor:'pointer' }}
                  onClick={() => {
                    const newEntries = {
                      ...selectedLegendEntries,
                      [item.valore]: !!!selectedLegendEntries[item.valore]
                    };
                    setSelectedLegendEntries(newEntries);
                  }}
                ></div>
                <span className={styles.legendEntryText}>{item.valore}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
