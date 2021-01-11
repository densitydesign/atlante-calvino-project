import React, { useEffect, useMemo, useCallback, useState, useRef } from "react"
import styles from "./Trama.module.css"
import useDimensions from "react-use-dimensions"
import { scaleLinear } from "d3"
import classnames from "classnames"
import Slider from "rc-slider"
import "rc-slider/assets/index.css"
import "./Slider.css"
import { ReactComponent as DownIcon } from "./icons/chevron-down.svg"
import { ReactComponent as UpIcon } from "./icons/chevron-up.svg"
import { ReactComponent as Eye } from "./icons/eye.svg"

const SLIDER_WIDTH = 32
const CURSOR_HEIGHT = 12

export function MarimekkoSlider({
  currentPosition,
  setCurrentPosition,
  currentBook,
  iceCycleData,
  setCurrentSequences,
  setCurrentSequencesSelected,
  currentSequencesSelected,
}) {
  const [ref, { x, y, width, height }] = useDimensions()

  const sliderX = useMemo(() => width / 2 - SLIDER_WIDTH / 2, [width])

  const yScale = useMemo(() => {
    return scaleLinear()
      .range([0, height - CURSOR_HEIGHT])
      .domain([0, +currentBook.caratteri])
  }, [height, currentBook])

  const handleDrag = useCallback(
    (e) => {
      const delta = e.movementY
      if (!delta) {
        return
      }
      const deltaPosition = yScale.invert(delta)
      const newPosition = currentPosition + deltaPosition
      const safePosition = parseInt(
        Math.max(Math.min(newPosition, +currentBook.caratteri), 0)
      )
      if (safePosition !== currentPosition) {
        //setCurrentSequencesSelected([]);
        setCurrentPosition(safePosition)
      }
    },
    [
      currentBook.caratteri,
      currentPosition,
      setCurrentPosition,
      setCurrentSequencesSelected,
      yScale,
    ]
  )

  const handleDragNative = useCallback(
    (h) => {
      const deltaPosition = yScale.invert(h)
      const newPosition = deltaPosition
      const safePosition = parseInt(
        Math.max(Math.min(newPosition, +currentBook.caratteri), 0)
      )
      if (safePosition !== currentPosition) {
        //setCurrentSequencesSelected([]);
        setCurrentPosition(safePosition)
      }
    },
    [
      currentBook.caratteri,
      currentPosition,
      setCurrentPosition,
      setCurrentSequencesSelected,
      yScale,
    ]
  )

  const cursorY = useMemo(() => {
    return Math.max(yScale(currentPosition), 0)
  }, [yScale, currentPosition])

  const currentSequences = useMemo(() => {
    const out = iceCycleData.filter(
      (item) =>
        item.starts_at <= currentPosition && item.ends_at >= currentPosition
    )
    return out
  }, [iceCycleData, currentPosition])

  useEffect(() => {
    setCurrentSequences(currentSequences)
  }, [currentSequences, setCurrentSequences])

  const selected = useMemo(() => {
    return currentSequencesSelected && currentSequencesSelected.length
  }, [currentSequencesSelected])

  const dragging = useRef(0)

  return (
    <div ref={ref} className={`text-center position-relative ${styles.slider}`}>
      {height > 0 && (
        <div>
          {((currentSequences && currentSequences.length > 0) ||
            (currentSequencesSelected && currentSequencesSelected.length > 0)) >
            0 && (
            <div
              className={classnames("block-eye position-absolute btn", {
                "handle-blue": selected,
              })}
              style={{
                left: -45,
                top: -32,
                paddingTop: 2,
                paddingRight: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                width: 32,
                height: 30,
              }}
              onClick={() => {
                if (selected) {
                  setCurrentSequencesSelected([])
                } else if (currentSequences && currentSequences.length) {
                  setCurrentSequencesSelected(currentSequences)
                }
              }}
            >
              <Eye />
            </div>
          )}
          <Slider
            reverse
            vertical
            min={0}
            max={Math.floor(height - CURSOR_HEIGHT)}
            style={{ height: height - CURSOR_HEIGHT }}
            step={1}
            defaultValue={0}
            value={cursorY}
            onChange={handleDragNative}
          />
          {/* {((currentSequences && currentSequences.length > 0) ||
            (currentSequencesSelected && currentSequencesSelected.length > 0)) >
            0 && (
            <div
              onClick={() => {
                if (selected) {
                  setCurrentSequencesSelected([])
                } else if (currentSequences && currentSequences.length) {
                  setCurrentSequencesSelected(currentSequences)
                }
              }}
              style={{
                position: "absolute",
                top: cursorY - 1,
                left: -30,
                cursor: "pointer",
                width: CURSOR_HEIGHT,
                height: CURSOR_HEIGHT,
                border: "solid #222 1px",
                borderRadius: 20,
                background: selected ? "#222" : undefined,
                borderColor: `var(--dark-green)`,
              }}
            ></div>
          )} */}
        </div>
      )}
    </div>
  )
}

export function MarimekkoSliderArrow({
  currentBook,
  prevPosition,
  nextPosition,
  setCurrentPosition,
  up = false,
  down = false,
}) {
  const [ref, { x, y, width, height }] = useDimensions()
  const sliderX = useMemo(() => width / 2 - SLIDER_WIDTH / 2, [width])

  if (!currentBook) {
    return null
  }

  return (
    <div ref={ref} className="position-relative w-100">
      {width && up && (
        <button
          disabled={prevPosition === null}
          style={{
            left: sliderX,
            bottom: 0,
            width: SLIDER_WIDTH,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            background: "white",
            color: "#000",
          }}
          className={`btn position-absolute text-center p-1 ${styles["border-black"]}`}
          onClick={() =>
            prevPosition !== null && setCurrentPosition(prevPosition)
          }
        >
          <UpIcon />
        </button>
      )}
      {width && down && (
        <button
          disabled={nextPosition === null}
          className={`btn position-absolute text-center p-1 ${styles["border-black"]}`}
          style={{
            left: sliderX,
            width: SLIDER_WIDTH,
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
            background: "white",
            color: "#000",
          }}
          onClick={() =>
            nextPosition !== null && setCurrentPosition(nextPosition)
          }
        >
          <DownIcon />
        </button>
      )}
    </div>
  )
}
