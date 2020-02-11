import React, { useState, useMemo, useRef, useCallback } from "react";
import { useChain, useSpring, animated } from "react-spring";
import styles from "./Trama.module.css";
import { computeHorizontalPositions } from "./helpers";
import find from "lodash/find";
import some from "lodash/some";

export default function MarimekkoTopAxis({
  width,
  fullWidth,
  height,
  booksData,
  setCurrentTextID,
  currentTextID,
  currentPosition,
  sequencesSelected
}) {
  const margins = {
    bottom: 15
  };

  const [short, setShort] = useState(false);

  const currentBook = useMemo(() => {
    return find(booksData, x => x.textID === currentTextID);
  }, [booksData, currentTextID]);

  const isBookDetail = useMemo(() => !!currentTextID, [currentTextID])

  const props = useSpring({
    delay: isBookDetail ? 800 : 0,
    config: { precision: 0.15 },
    from: { width: width, left: 0, opacity: 0 },

    to: {
      width: isBookDetail ? width / 2 : width,
      left: isBookDetail ? (fullWidth - width) +  width / 2 : 0,
      opacity: isBookDetail ? 1 : 0
    },
    onFrame({ left }) {
      if (left > width / 4) setShort(true);
      if (left < width / 4) setShort(false);
    }
  });

  const booksDataWithPositions = useMemo(() => {
    // const widthForLong = booksData.length < 5 ? width / 2 : width

    return !short
      ? computeHorizontalPositions(booksData, width, false)
      : computeHorizontalPositions(booksData, width / 2, true);
  }, [booksData, width, short]);

  const getCurrenBookClasses = useCallback(
    book => {
      if (book.textID === currentTextID && currentTextID) {
        return {
          text: styles.topAxisTextEmpty,
          rect: styles.topAxisRectEmpty
        };
      } else {
        if (!sequencesSelected || !sequencesSelected.length) {
          return {
            text: styles.topAxisText,
            rect: styles.topAxisRect
          };
        } else {
          const isCurrentSeq = !!book.sequencesMatchesForBook[sequencesSelected]
          return isCurrentSeq
            ? {
                text: styles.topAxisText,
                rect: styles.topAxisRect
              }
            : {
                text: styles.topAxisTextNoSeq,
                rect: styles.topAxisRectNoSeq
              };
        }
      }
    },
    [currentTextID, sequencesSelected]
  );

  return (
    <animated.div style={{ height, width: props.width, overflow: "hidden" }}>
      {currentTextID && (
        <div className="position-absolute">
          <small>Slider position: {currentPosition}</small>
        </div>
      )}
      {isBookDetail && (
        <animated.div
          className="pl-2 position-absolute border rounded border-dark d-flex align-items-center"
          style={{
            top: height - margins.bottom - 50,
            opacity: props.opacity,
            height: 34
          }}
        >
          <span className="mr-2">{currentBook.titolo}</span>
          <animated.button
            onClick={() => {
              setCurrentTextID(null);
            }}
            className="btn border-left-dark border-right-0 border-top-0 border-bottom-0 m-0 rounded-0 btn-outline-dark"
            // style={{ top: height - margins.bottom - 50 }}
          >
            X
          </animated.button>
        </animated.div>
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
          {booksDataWithPositions.map(book => {
            const bookClasses = getCurrenBookClasses(book);
            return (
              <g key={book.textID} transform={`translate(${book.caratteriX})`}>
                <rect
                  className={bookClasses.rect}
                  width={book.caratteriWidth}
                  height={4}
                ></rect>
                <g transform={`translate(${currentTextID ? 4 : 2} 0)`}>
                  <text
                    className={bookClasses.text}
                    x={5}
                    transform={`rotate(-45)`}
                    onClick={() => {
                      setCurrentTextID(book.textID);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {book.titolo}
                  </text>
                </g>
              </g>
            );
          })}
        </g>
      </animated.svg>
    </animated.div>
  );
}
