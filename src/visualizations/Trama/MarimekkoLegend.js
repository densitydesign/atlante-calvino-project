import React, { useState, useMemo, useRef, useEffect } from "react";
import groupBy from "lodash/groupBy";
import styles from "./Trama.module.css";

export default function MarimekkoLegend({
  selectedLegendEntries,
  setSelectedLegendEntries,
  legendMap,
  dettaglio,
  currentBook,
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
      <div className="">
        <h4>{dettaglio === 'ambito' ? 'TIPOLOGIA DI AMBITO': 'CATEGORIE DI ELENCO'}</h4>
      </div>
      {Object.keys(byGruppo).map(gruppo => (
        <div key={gruppo} className="mt-1">
          <div className={styles.legendGroupText}>{gruppo}</div>
          <div>
            {byGruppo[gruppo].map((item, i) => {
              const notFound = currentBook && !currentBook.categoriesMatchesForBook[item.valore]
              return (
              <div
                key={i}
                style={{opacity: notFound ? 0.3: undefined}}
                className={`w-100 d-flex align-items-center ${
                  styles.legendEntry
                } ${selectedLegendEntries[item.valore] ? styles.selected : ""}`}
              >
                <div
                  className={styles.legendEntryColor}
                  style={{ backgroundColor: item.colore, cursor:'pointer' }}
                  onClick={() => {
                    if(notFound){
                      return
                    }
                    const newEntries = {
                      ...selectedLegendEntries,
                      [item.valore]: !!!selectedLegendEntries[item.valore]
                    };
                    setSelectedLegendEntries(newEntries);
                  }}
                ></div>
                <span className={styles.legendEntryText}>{item.label || item.valore}</span>
              </div>
            )})}
          </div>
        </div>
      ))}
    </div>
  );
}
