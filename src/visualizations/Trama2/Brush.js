import React, { useState } from 'react'
import Draggable from 'react-draggable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { ReactComponent as FaLeft } from './icons/chevron-left.svg'
import { ReactComponent as FaRight } from './icons/chevron-right.svg'

export const BRUSH_HANDLE_WIDTH = 12
const Brush = React.memo(({
  width,
  onNextClick,
  onPrevClick,
  x: controlledX,
  onXChange,
  className = 'trama2-brush-container',
}) => {
  const [uncontrolledX, setX] = useState(width - BRUSH_HANDLE_WIDTH / 2)
  const x = controlledX === undefined ? uncontrolledX : controlledX

  return (
    <>
      <div
        style={{
          transform: `translateX(${x + BRUSH_HANDLE_WIDTH / 2}px)`,
        }}
        className="trama2-index-line"
      />
      <div className={`${className} trama2-brush-container-flex`}>
        <button
          className="trama2-brush-button trama2-prev-brush-button"
          onClick={() => {
            if (controlledX !== undefined) {
              onPrevClick()
              return
            }
            onPrevClick(x + BRUSH_HANDLE_WIDTH / 2, (rawNextX) => {
              const nextX = rawNextX - BRUSH_HANDLE_WIDTH / 2
              if (nextX >= 0 && x <= width - BRUSH_HANDLE_WIDTH / 2) {
                setX(nextX)
              }
            })
          }}
        >
          <FaLeft height='19' width='19' />
        </button>
        <div className="trama2-list-brush">
          <Draggable
            axis="x"
            position={{ x, y: 0 }}
            bounds={{
              left: 0,
              right: width - BRUSH_HANDLE_WIDTH / 2,
            }}
            onDrag={(e, position) => {
              if (controlledX === undefined) {
                setX(position.x)
              } else {
                onXChange(position.x)
              }
            }}
          >
            <div className="trama2-drag-handle" />
          </Draggable>
        </div>
        <button
          className="trama2-brush-button trama2-next-brush-button"
          onClick={() => {
            if (controlledX !== undefined) {
              onNextClick()
              return
            }
            onNextClick(x + BRUSH_HANDLE_WIDTH / 2, (rawNextX) => {
              const nextX = rawNextX - BRUSH_HANDLE_WIDTH / 2
              if (nextX >= 0 && x <= width - BRUSH_HANDLE_WIDTH / 2) {
                setX(nextX)
              }
            })
          }}
        >
          <FaRight height='19' width='19' />
        </button>
      </div>
    </>
  )
})
export default Brush