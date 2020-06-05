import React from "react";
import keyBy from "lodash/keyBy";

export default function SideBar({ tipologie, bounds, addBound, setBounds }) {
  const boundsByKey = keyBy(bounds);

  return (
    <div className="trama2-sidebar">
      <div className="trama2-sidebar-header"></div>
      {tipologie.map((tipologia) => (
        <div
          key={tipologia.tipologia}
          onClick={addBound(tipologia.tipologia)}
          className={`trama2-sidebar-item ${boundsByKey[tipologia.tipologia] ? 'selected' : ''}`}
          style={{
            background: boundsByKey[tipologia.tipologia]
              ? tipologia.colore.colori
              : undefined,
          }}
        >
          {tipologia.tipologia}
        </div>
      ))}
    <div>
      {bounds.length > 0 && <span onClick={()=> {setBounds([])}}>Clear</span>}
    </div>
    </div>
  );
}
