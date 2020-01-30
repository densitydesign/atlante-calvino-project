import React, { useState, useMemo, useRef, useEffect } from "react";
import groupBy from "lodash/groupBy";
import styles from "./Trama.module.css";
import { useChain, useSpring, animated } from "react-spring";
import { scaleLinear } from "d3";
import sortBy from "lodash/sortBy";
import omit from "lodash/omit";
import { extent } from "d3-array";

const levelMaps = {
  uno: 1,
  due: 2,
  tre: 3,
  quattro: 4,
  cinque: 5
};

function MarimekkoBook({
  book,
  currentTextID,
  bookDataAnnotated,
  selectedLegendEntries,
  height,
  width,
  iceCycleData
}) {
  const isCurrent = currentTextID === book.textID;

  const show = !currentTextID || isCurrent;

  const previousDetail = useRef(null);
  useEffect(() => {
    previousDetail.current = currentTextID;
  }, [currentTextID]);

  const fromDetail = !!previousDetail.current;

  const translateToList = `translate(${book.caratteriX}px)`;
  const translateToDetail = `translate(0px)`;

  const icycleWidth = (width / 10) * 8;
  const columnWidth = icycleWidth / 5;

  const iCycleDataAnnotated = useMemo(() => {
    if (!iceCycleData) {
      return null;
    }
    // const levels = uniqBy(iceCycleData, x => x.livello)
    const byLevel = groupBy(iceCycleData, x => x.livello);

    const byLevelSorted = Object.keys(byLevel).reduce((acc, item) => {
      acc[item] = sortBy(byLevel[item], x => +x.starts_at);
      return acc;
    }, {});

    const bookExtentStart = extent(byLevelSorted["uno"], x => +x.starts_at);
    const bookExtentEnd = extent(byLevelSorted["uno"], x => +x.ends_at);
    const sequenceScale = scaleLinear()
      .range([0, height])
      .domain([bookExtentStart[0], bookExtentEnd[1]]);

    //annotation for levels <> "uno"
    const byLevelAnnotated = Object.keys(omit(byLevelSorted, "uno")).reduce(
      (acc, item) => {
        acc[item] = byLevelSorted[item].reduce((listOfBlocks, sequence) => {
          listOfBlocks.push({
            ...sequence,
            y1: sequenceScale(+sequence.starts_at),
            h: sequenceScale(+sequence.ends_at - sequence.starts_at)
          });
          return listOfBlocks;
        }, []);
        return acc;
      },
      {}
    );
    console.log("byLevelAnnotated", byLevelAnnotated);
    return byLevelAnnotated;
  }, [height, iceCycleData]);

  console.log("iCycleDataAnnotated", iCycleDataAnnotated);

  const props = useSpring({
    config: { friction: 50 },
    from: {
      opacity: 1,
      transform:
        fromDetail || currentTextID ? translateToDetail : translateToList,
      width: fromDetail || isCurrent ? columnWidth : book.caratteriWidth
    },

    to: [
      {
        opacity: show ? 1 : 0,
        transform: currentTextID ? translateToDetail : translateToList,
        width: isCurrent ? columnWidth : book.caratteriWidth
      },
      {
        transform: isCurrent ? translateToDetail : translateToList,
        width: isCurrent ? columnWidth : book.caratteriWidth
      }
    ]
  });

  // useChain(isCurrent ? [springRef, rectSpringRef] : [rectSpringRef, springRef])
  // console.log(props)

  return (
    <>
      <animated.g
        key={book.textID}
        // transform={`translate(${book.caratteriX})`}
        style={{
          transform:
              isCurrent
              ? props.transform
              : translateToList,
          opacity: props.opacity
        }}
      >
        <rect
          className={`${styles.marimekkoRect}`}
          style={{ height, 
            width: fromDetail && isCurrent ? columnWidth : props.width 
          }}
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
      {isCurrent && (
        <g>
          {iCycleDataAnnotated &&
            sortBy(Object.keys(iCycleDataAnnotated), k => levelMaps[k]).map(
              levelName => (
                <g
                  key={levelName}
                  transform={`translate(${(levelMaps[levelName] - 1) *
                    columnWidth})`}
                >
                  {iCycleDataAnnotated[levelName].map(block => (
                    <rect
                      style={{ fill: block.color }}
                      className={`${styles.marimekkoUnit}  ${
                        selectedLegendEntries[block.label] ? styles.selected : ""
                      }`}
                      dataLevel={levelName}
                      key={block.id}
                      width={columnWidth}
                      y={block.y1}
                      height={block.h}
                    ></rect>
                  ))}
                </g>
              )
            )}
        </g>
      )}
    </>
  );
}

export default function MarimekkoChart({
  height,
  width,
  booksDataWithPositions,
  chartBooks,
  selectedLegendEntries,
  currentTextID,
  iceCycleData,
  coloriClusterTipologie
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
            iceCycleData={iceCycleData}
          ></MarimekkoBook>
        );
      })}
    </svg>
  );
}
