import React, { useState } from 'react'
import Draggable from 'react-draggable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

const HANDLE_WIDTH = 12
const Brush = React.memo(({ width, onNextClick, onPrevClick }) => {
  const [x, setX] = useState(width - HANDLE_WIDTH / 2)
  return (
    <>
      <div
        style={{
          transform: `translateX(${x + HANDLE_WIDTH / 2}px)`,
        }}
        className="trama2-index-line"
      />
      <div className="trama2-brush-container">
        <button
          className="trama2-brush-button trama2-prev-brush-button"
          onClick={() => {
            onPrevClick(x + HANDLE_WIDTH / 2, (rawNextX) => {
              const nextX = rawNextX - HANDLE_WIDTH / 2
              if (nextX >= 0 && x <= width - HANDLE_WIDTH / 2) {
                setX(nextX)
              }
            })
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className="trama2-list-brush">
          <Draggable
            axis="x"
            position={{ x, y: 0 }}
            bounds={{
              left: 0,
              right: width - HANDLE_WIDTH / 2,
            }}
            onDrag={(e, position) => {
              setX(position.x)
            }}
          >
            <div className="trama2-drag-handle" />
          </Draggable>
        </div>
        <button
          className="trama2-brush-button trama2-next-brush-button"
          onClick={() => {
            onNextClick(x + HANDLE_WIDTH / 2, (rawNextX) => {
              const nextX = rawNextX - HANDLE_WIDTH / 2
              if (nextX >= 0 && x <= width - HANDLE_WIDTH / 2) {
                setX(nextX)
              }
            })
          }}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </>
  )
})
export default Brush