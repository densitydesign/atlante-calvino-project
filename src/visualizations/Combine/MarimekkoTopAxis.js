import React, { useState, useMemo, useRef, useEffect } from "react";
import styles from "./Combine.module.css";

export default function MarimekkoTopAxis({
  width,
  height,
  booksDataWithPositions,
  setCurrentTextID
}) {
  const margins = {
    bottom: 15
  };

  return (
    <div style={{ height, width, overflow: "hidden" }}>
      <svg style={{ height, width, overflow: "hidden" }}>
        <g transform={`translate(0 ${height - margins.bottom})`}>
          {booksDataWithPositions.map(book => (
            <g key={book.textID} transform={`translate(${book.caratteriX})`}>
              <rect
                className={styles.topAxisRect}
                width={book.caratteriWidth}
                height={4}
              ></rect>
              <g transform="translate(2 0)">
                <text
                  className={styles.topAxisText}
                  x={5}
                  transform={`rotate(-45)`}
                  onClick={() => {
                    setCurrentTextID(book.textID);
                  }}
                >
                  {book.titolo}
                </text>
              </g>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}