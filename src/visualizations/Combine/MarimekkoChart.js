import React, { useState, useMemo, useRef, useEffect } from "react";
import groupBy from "lodash/groupBy";
import styles from "./Combine.module.css";
import { useChain, useSpring, animated } from "react-spring";
import { scaleLinear } from "d3";


function MarimekkoBook({
  book,
  currentTextID,
  bookDataAnnotated,
  selectedLegendEntries,
  height,
  width,
}) {
  const isCurrent = currentTextID === book.textID
  const show = !currentTextID || isCurrent

  const translateToList = `translate(${book.caratteriX}px)`
  const translateToDetail = `translate(0px)`
  
  const props = useSpring({ 
    config: { friction: 50},
    from: { opacity :1,  transform: translateToList, width: book.caratteriWidth},
  
    to: [{opacity: show ? 1 : 0, transform: isCurrent ? translateToDetail : translateToList, width: book.caratteriWidth}, 
      {width:  isCurrent ?  200 : book.caratteriWidth}]
    })
    
  
  // useChain(isCurrent ? [springRef, rectSpringRef] : [rectSpringRef, springRef])
  // console.log(props)

  return (
    <animated.g
      key={book.textID}
      // transform={`translate(${book.caratteriX})`}
      style={{transform:props.transform, opacity: props.opacity}}
    >
      <rect
        className={`${styles.marimekkoRect}`}
        style={{ height, width: props.width }}
      ></rect>
      {bookDataAnnotated.map((d, i) => (
        <animated.rect
          key={i}
          y={d.top}
          width={props.width}
          height={d.height}
          className={`${styles.marimekkoUnit}  ${
            selectedLegendEntries[d.label] ? styles.selected : ""
          }`}
          fill={d.color}
        ></animated.rect>
      ))}
    </animated.g>
  );
}

export default function MarimekkoChart({
  height,
  width,
  booksDataWithPositions,
  chartBooks,
  selectedLegendEntries,
  currentTextID
}) {
  const heightScale = scaleLinear()
    .domain([0, 1])
    .range([0, height]);

  const anyLegendEntrySelected =
    Object.keys(selectedLegendEntries || {}).filter(
      k => selectedLegendEntries[k]
    ).length > 0;

  return (
    <svg
      style={{ height, width, position: "absolute" }}
      className={anyLegendEntrySelected ? styles.withLegendItemSelected : ""}
    >
      {booksDataWithPositions.map(book => {
        const bookData = chartBooks[book.textID];

        //annotating with top and height
        const bookDataAnnotated = bookData
          .map(item => ({
            label: item.label,
            value: item.value,
            color: item.color,
            height: heightScale(item.value)
          }))
          .reduce((out, item, i) => {
            if (i === 0) {
              out.push({ ...item, top: 0 });
            } else {
              out.push({ ...item, top: out[i - 1].top + out[i - 1].height });
            }
            return out;
          }, []);

        return (
          <MarimekkoBook
            key={book.textID}
            book={book}
            currentTextID={currentTextID}
            bookDataAnnotated={bookDataAnnotated}
            selectedLegendEntries={selectedLegendEntries}
            height={height}
            width={width}
          ></MarimekkoBook>
        );
      })}
    </svg>
  );
}