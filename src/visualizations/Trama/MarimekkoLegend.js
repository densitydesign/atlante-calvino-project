import React, { useState, useMemo, useRef, useEffect } from "react";
import groupBy from "lodash/groupBy";
import styles from "./Trama.module.css";
import { useTranslation } from "react-i18next";

export default function MarimekkoLegend({
  selectedLegendEntries,
  setSelectedLegendEntries,
  legendMap,
  dettaglio,
  currentBook,
}) {
  const { t } = useTranslation('combining')

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
        <h4>{dettaglio === 'ambito' ? 'TIPO DI PIANO': 'TIPO DI SEQUENZA'}</h4>
      </div>
      {Object.keys(byGruppo).map(gruppo => (
        <div key={gruppo} className="mt-1">
          {/* <div className={styles.legendGroupText}>{gruppo}</div> */}
          <div>
            {byGruppo[gruppo].map((item, i) => {
              const notFound = currentBook && !currentBook.categoriesMatchesForBook[item.valore]
              return (
              <div
                key={i}
                style={{filter: notFound ? 'saturate(0%)': undefined, opacity: notFound ? 0.3: undefined}}
                className={`w-100 d-flex align-items-center ${
                  styles.legendEntry
                } ${selectedLegendEntries[item.valore] ? styles.selected : ""}`}
              >
                <div
                  className={styles.legendEntryColor}
                  style={{ backgroundColor: notFound ? '#ccc' : item.colore, cursor: notFound ? undefined: 'pointer' }}
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
                <span className={styles.legendEntryText}>{t(`${dettaglio}.${item.label || item.valore}`)}</span>
              </div>
            )})}
          </div>
        </div>
      ))}
    </div>
  );
}
