import React from "react";
import keyBy from "lodash/keyBy";

export default function SideBar({ tipologie, height, bounds, addBound, setBounds }) {
  const boundsByKey = keyBy(bounds);

  const itemHeight = height / tipologie.length

  return (
    <div className="trama2-sidebar">
      <div className="trama2-sidebar-header"></div>
      {tipologie.map((tipologia) => (
        <div
          key={tipologia.tipologia}
          onClick={addBound(tipologia.tipologia)}
          className={`trama2-sidebar-item ${boundsByKey[tipologia.tipologia] ? 'selected' : ''}`}
          style={{
            height: itemHeight,
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
