import React, { useState, useMemo, useRef, useEffect } from "react";
import { useChain, useSpring, animated } from "react-spring";
import styles from "./Trama.module.css";

export default function MarimekkoTopAxis({
  width,
  height,
  booksDataWithPositions,
  setCurrentTextID,
  currentTextID,
}) {
  const margins = {
    bottom: 15
  };

  const isBookDetail = !!currentTextID

  const props = useSpring({ 
    delay: 1200,
    // config: { friction: 50},
    from: { width: width, left: 0},
  
    to: {width: isBookDetail ? width / 2 : width, left: isBookDetail ?  width / 2 : 0}
    })

  return (
    <animated.div style={{ height, width:props.width, overflow: "hidden"}}>
      <animated.svg className="position-absolute" style={{ height, width:props.width, overflow: "hidden", left:props.left }} >
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
      </animated.svg>
    </animated.div>
  );
}