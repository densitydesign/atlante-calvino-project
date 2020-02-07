import React, { useEffect, useMemo, useCallback, useState, useRef } from "react";
import styles from "./Trama.module.css";
import useDimensions from "react-use-dimensions";
import { scaleLinear } from "d3";
import Draggable from "react-draggable"; // The default

export default function MarimekkoSlider({
  currentPosition,
  setCurrentPosition,
  currentBook,
  iceCycleData,
  setCurrentSequences,
  setCurrentSequencesSelected,
  currentSequencesSelected
}) {
  const [ref, { x, y, width, height }] = useDimensions();

  const SLIDER_WIDTH = 30;
  const CURSOR_HEIGHT = 10;
  const sliderX = useMemo(() => width / 2 - SLIDER_WIDTH / 2, [width])

  const yScale = useMemo(() => {
    return scaleLinear()
      .range([0, height - 20])
      .domain([0, +currentBook.caratteri]);
  }, [height, currentBook]);

  const handleDrag = useCallback(
    e => {
      const delta = e.movementY;
      if (!delta) {
        return;
      }
      const deltaPosition = yScale.invert(delta);
      const newPosition = currentPosition + deltaPosition;
      const safePosition = parseInt(
        Math.max(Math.min(newPosition, +currentBook.caratteri), 0)
      );
      if (safePosition !== currentPosition) {
        setCurrentSequencesSelected([]);
        setCurrentPosition(safePosition);
      }
    },
    [currentBook.caratteri, currentPosition, setCurrentPosition, setCurrentSequencesSelected, yScale]
  );

  const cursorY = useMemo(() => {
    return Math.max(yScale(currentPosition) + 10, 0);
  }, [yScale, currentPosition]);

  const currentSequences = useMemo(() => {
    const out = iceCycleData.filter(
      item =>
        item.starts_at <= currentPosition && item.ends_at >= currentPosition
    );
    return out;
  }, [iceCycleData, currentPosition]);

  useEffect(() => {
    setCurrentSequences(currentSequences);
  }, [currentSequences, setCurrentSequences]);

  const selected = useMemo(() => {
    return currentSequencesSelected && currentSequencesSelected.length;
  }, [currentSequencesSelected]);

  
  const dragging = useRef(0)


  return (
    <svg className={styles.slider} ref={ref}>
      {width && (
        <>
          <rect
            className={styles.slide}
            y={10}
            height={height - 20}
            width={SLIDER_WIDTH}
            x={sliderX}
          ></rect>
          <line
            x1={width / 2}
            x2={width}
            y1={cursorY}
            y2={cursorY}
            className={styles.cursorLine}
          ></line>
          <Draggable
            // allowAnyClick
            onDrag={handleDrag}
            onStart={e => {
              dragging.current = e.timeStamp;
            }}
            onStop={e =>
              //
              {
                if (e.timeStamp - dragging.current < 200) {
                  if (selected) {
                    setCurrentSequencesSelected([]);
                  } else if (currentSequences && currentSequences.length) {
                    setCurrentSequencesSelected(currentSequences);
                  }
                }
              }
            }
            axis={"y"}
            position={{ x: 0, y: cursorY }}
            bounds={{
              top: 10,
              bottom: height - 10
            }}
          >
            <rect
              className={`${styles.cursor} ${
                selected ? styles.cursorSelected : ""
              }`}
              width={SLIDER_WIDTH}
              y={-CURSOR_HEIGHT / 2}
              x={sliderX}
              height={CURSOR_HEIGHT}
            ></rect>
          </Draggable>
        </>
      )}
    </svg>
  );
}