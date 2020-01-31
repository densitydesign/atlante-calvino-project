import React, { useState, useMemo, useRef, useEffect } from "react";
import { useChain, useSpring, animated } from "react-spring";
import styles from "./Trama.module.css";
import { computeHorizontalPositions } from "./helpers";

export default function MarimekkoTopAxis({
  width,
  height,
  booksData,
  setCurrentTextID,
  currentTextID
}) {
  const margins = {
    bottom: 15
  };

  const [short, setShort] = useState(false)

  const isBookDetail = !!currentTextID;

  const props = useSpring({
    delay: isBookDetail ? 1200 : 0,
    // config: { friction: 50},
    from: { width: width, left: 0, opacity: 0 },

    to: {
      width: isBookDetail ? width / 2 : width,
      left: isBookDetail ? width / 2 : 0,
      opacity: isBookDetail ? 1 : 0
    },
    onFrame({ left }) {
      if (left > width / 4) setShort(true);
      if (left < width / 4) setShort(false);
    }
  });

  const booksDataWithPositions = useMemo(() => {
    return !short ? computeHorizontalPositions(booksData, width) : computeHorizontalPositions(booksData, width / 2);
  }, [booksData, width, short]);

  return (
    <animated.div style={{ height, width: props.width, overflow: "hidden" }}>
      {isBookDetail && (
        <animated.button
          onClick={() => {
            setCurrentTextID(null);
          }}
          className="btn btn-outline-dark position-absolute"
          style={{ top: height - margins.bottom - 50, opacity: props.opacity }}
        >
          BACK
        </animated.button>
      )}
      <animated.svg
        className="position-absolute"
        style={{
          height,
          width: props.width,
          overflow: "hidden",
          left: props.left
        }}
      >
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
                  style={{cursor: 'pointer',}}
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
