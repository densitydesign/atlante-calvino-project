import React, {
  useEffect,
  useMemo,
  useCallback,
  useState,
  useRef
} from "react";
import styles from "./Trama.module.css";
import useDimensions from "react-use-dimensions";
import { scaleLinear } from "d3";
import Draggable from "react-draggable"; // The default
import findLastIndex from "lodash/findLastIndex";
import findIndex from "lodash/findIndex";
import { findAtChar } from "./helpers";
import sortBy from "lodash/sortBy";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Slider.css'

const SLIDER_WIDTH = 30;
const CURSOR_HEIGHT = 12;


export function MarimekkoSlider({
  currentPosition,
  setCurrentPosition,
  currentBook,
  iceCycleData,
  setCurrentSequences,
  setCurrentSequencesSelected,
  currentSequencesSelected
}) {
  const [ref, { x, y, width, height }] = useDimensions();

  const sliderX = useMemo(() => width / 2 - SLIDER_WIDTH / 2, [width]);

  const yScale = useMemo(() => {
    return scaleLinear()
      .range([0, height - CURSOR_HEIGHT])
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
        //setCurrentSequencesSelected([]);
        setCurrentPosition(safePosition);
      }
    },
    [
      currentBook.caratteri,
      currentPosition,
      setCurrentPosition,
      setCurrentSequencesSelected,
      yScale
    ]
  );

  const handleDragNative = useCallback(
    h => {
      const deltaPosition = yScale.invert(h);
      const newPosition = deltaPosition;
      const safePosition = parseInt(
        Math.max(Math.min(newPosition, +currentBook.caratteri), 0)
      );
      if (safePosition !== currentPosition) {
        //setCurrentSequencesSelected([]);
        setCurrentPosition(safePosition);
      }
    },
    [
      currentBook.caratteri,
      currentPosition,
      setCurrentPosition,
      setCurrentSequencesSelected,
      yScale
    ]
  );

  const cursorY = useMemo(() => {
    return Math.max(yScale(currentPosition), 0);
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

  const dragging = useRef(0);

  return (
    <div className={styles.slider} ref={ref} className="text-center position-relative">
      <Slider   reverse vertical min={0} max={height-CURSOR_HEIGHT} style={{height:height-CURSOR_HEIGHT}} 
        step={1} defaultValue={0} value={cursorY} onChange={handleDragNative}/>
      {/* <div style={{position: 'absolute', top: cursorY+CURSOR_HEIGHT/2 - 1.5, left: width /2, width: 100,  height:1, borderTop: 'solid #222 1px'}}></div> */}
      {currentSequences && currentSequences.length > 0 && <div  onClick={() => {
        if (selected) {
          setCurrentSequencesSelected([]);
        } else if (currentSequences && currentSequences.length) {
          setCurrentSequencesSelected(currentSequences);
        }
      }} style={{position: 'absolute', top: cursorY, left: -30, cursor:'pointer', width: CURSOR_HEIGHT,  height:CURSOR_HEIGHT, border: 'solid #222 1px', borderRadius: 20, background: selected ? '#222' : undefined}}></div>}
    </div>
  )

  return (
    <svg className={styles.slider} ref={ref}>
      {width && (
        <>
          <rect
            className={styles.slide}
            y={CURSOR_HEIGHT / 2}
            height={height - CURSOR_HEIGHT}
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
            onStop={e => {
              if (e.timeStamp - dragging.current < 200) {
                if (selected) {
                  setCurrentSequencesSelected([]);
                } else if (currentSequences && currentSequences.length) {
                  setCurrentSequencesSelected(currentSequences);
                }
              }
            }}
            axis={"y"}
            position={{ x: 0, y: cursorY }}
            bounds={{
              top: CURSOR_HEIGHT / 2,
              bottom: height - CURSOR_HEIGHT / 2
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

export function MarimekkoSliderArrow({
  currentBook,
  prevPosition,
  nextPosition,
  setCurrentPosition,
  up = false,
  down = false
}) {
  const [ref, { x, y, width, height }] = useDimensions();
  const sliderX = useMemo(() => width / 2 - SLIDER_WIDTH / 2, [width]);

  if (!currentBook) {
    return null;
  }

  return (
    <div ref={ref} className="position-relative w-100">
      {width && up && (
        <button
          disabled={prevPosition === null}
          style={{ left: sliderX, bottom: 0, width: SLIDER_WIDTH }}
          className="btn btn-outline-dark position-absolute text-center p-1"
          onClick={() =>
            prevPosition !== null && setCurrentPosition(prevPosition)
          }
        >
          ↑
        </button>
      )}
      {width && down && (
        <button
          disabled={nextPosition === null}
          className="btn btn-outline-dark position-absolute text-center p-1"
          style={{ left: sliderX, width: SLIDER_WIDTH }}
          onClick={() =>
            nextPosition !== null && setCurrentPosition(nextPosition)
          }
        >
          ↓
        </button>
      )}
    </div>
  );
}
