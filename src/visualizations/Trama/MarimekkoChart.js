import React, { useState, useMemo, useRef, useEffect } from "react";
import groupBy from "lodash/groupBy";
import keyBy from "lodash/keyBy";
import uniq from "lodash/uniq";
import styles from "./Trama.module.css";
import { useTransition, useSpring, animated } from "react-spring";
import { scaleLinear } from "d3";
import sortBy from "lodash/sortBy";
import omit from "lodash/omit";
import sumBy from "lodash/sumBy";

import { extent } from "d3-array";
import { levelMaps } from "./helpers";

function MarimekkoBookIcycle({
  book,
  currentTextID,
  selectedLegendEntries,
  anyLegendEntrySelected,
  height,
  width,
  iceCycleData,
  icycleWidth,
  currentPosition,
  currentSequencesSelected
}) {
  
  // utility measures
  const columnWidth = icycleWidth / 5;

  const sequenceScale = scaleLinear()
    .range([0 + 5, height - 5])
    .domain([0, +book.caratteri]);

  //annotating data
  const iCycleDataAnnotated = useMemo(() => {
    if (!iceCycleData) {
      return null;
    }
    const byLevel = groupBy(iceCycleData, x => x.livello);
    const byLevelSorted = Object.keys(byLevel).reduce((acc, item) => {
      acc[item] = sortBy(byLevel[item], x => +x.starts_at);
      return acc;
    }, {});

    //annotation for levels
    const byLevelAnnotated = Object.keys(byLevelSorted).reduce((acc, item) => {
      acc[item] = byLevelSorted[item].reduce((listOfBlocks, sequence) => {
        listOfBlocks.push({
          ...sequence,
          y1: sequenceScale(+sequence.starts_at),
          h:
            sequenceScale(+sequence.ends_at) -
            sequenceScale(+sequence.starts_at)
        });
        return listOfBlocks;
      }, []);
      return acc;
    }, {});
    return byLevelAnnotated;
  }, [iceCycleData, sequenceScale]);

  const isDetail = !!currentTextID;
  const wasDetailRef = useRef(false);
  useEffect(() => {
    wasDetailRef.current = isDetail;
  }, [isDetail]);
  const wasDetail = wasDetailRef.current;
  const isCurrentDetail = currentTextID === book.textID;

  // wether the current book is visible or not
  const isVisible = isCurrentDetail || !isDetail;

  // target positions for transation
  const translateToList = `translateX(${book.caratteriX}px)`;
  const translateToDetail = `translateX(0px)`;

  const [levelsTranslated, setLevelsTranslated] = useState(1);

  const sequencesSelected = useMemo(() => {
    if(!currentSequencesSelected){
      return null
    }

    const out = currentSequencesSelected.map(x => x['tipologia']).join("-")
    return book.sequencesMatchesForBook[out] || {}
    
  }, [book.sequencesMatchesForBook, currentSequencesSelected]) 


  const props = useSpring({
    config: { precision: 0.1 },

    from: {
      opacity: 1,
      transform: translateToList,
      width: book.caratteriWidth,
      levelsOpen: 0
    },

    to: [
      {
        opacity: isVisible ? 1 : 0,
        transform: isCurrentDetail ? translateToDetail : translateToList,
        width: columnWidth,
        levelsOpen: levelsTranslated
      },
      {
        // width: isCurrentDetail ? columnWidth : book.caratteriWidth,
        transform:
          isCurrentDetail || wasDetail ? translateToDetail : translateToList,
        levelsOpen: 1
      }
    ],

    onFrame({ levelsOpen }) {
      const x = Math.floor(levelsOpen);
      if (levelsTranslated !== x) {
        setLevelsTranslated(levelsOpen);
      }
    }
  });

  const cursorY = useMemo(() => {
    return sequenceScale(currentPosition);
  }, [currentPosition, sequenceScale]);

  const numLevels = useMemo(() => {
    return Object.keys(iCycleDataAnnotated).length;
  }, [iCycleDataAnnotated]);


  return (
    <>
      {iCycleDataAnnotated &&
        Object.keys(omit(iCycleDataAnnotated, "uno")).map(levelName => {
          const levelValue = levelMaps[levelName];
          const translate = `translateX(${(levelValue - 1) * columnWidth}px)`;

          

          return (
            <animated.g
              key={levelName}
              style={{
                transform: translate,
                opacity: props.levelsOpen
              }}
            >
              {iCycleDataAnnotated[levelName].map(block => {
                let opacity = 1
                if(currentSequencesSelected.length){
                  opacity = sequencesSelected[`${block['ID SEQ']}-${block.livello}`] ? 1 : 0.2
                } else if(anyLegendEntrySelected) {
                  opacity = selectedLegendEntries[block['cluster tipologie']] ? 1 : 0.2  
                }
                return (
                <rect
                  title={block['ID SEQ']}
                  style={{ fill: block.color, opacity}}
                  className={`${styles.marimekkoUnit}  ${
                    styles.marimekkoUnitIceCycle
                  } ${
                    selectedLegendEntries[block.label] ? styles.selected : ""
                  }`}
                  key={block["ID SEQ"]}
                  width={columnWidth}
                  y={block.y1}
                  height={block.h}
                ></rect>
              )})}
            </animated.g>
          );
        })}

      <animated.g
        key={book.textID}
        style={{
          transform: props.transform,
          opacity: props.opacity
        }}
      >
        {iCycleDataAnnotated["uno"].map(block => { 
          let opacity = 1
          if(currentSequencesSelected.length){
            opacity = sequencesSelected[`${block['ID SEQ']}-${block.livello}`] ? 1 : 0.2
          } else if(anyLegendEntrySelected) {
            opacity = selectedLegendEntries[block['cluster tipologie']] ? 1 : 0.2  
          }
          return (
          <rect
          title={block['ID SEQ']}
          style={{ fill: block.color, opacity}}
            className={`${styles.marimekkoUnit}  ${
              styles.marimekkoUnitIceCycle
            } ${selectedLegendEntries[block.label] ? styles.selected : ""}`}
            key={block["ID SEQ"]}
            width={columnWidth}
            y={block.y1}
            height={block.h}
          ></rect>
        )})}
      </animated.g>

      <line
        x1={0}
        x2={numLevels * columnWidth + 30}
        y1={cursorY}
        y2={cursorY}
        className={styles.cursorLine}
      ></line>
    </>
  );
}

function MarimekkoBook({
  book,
  currentTextID,
  setCurrentTextID,
  bookData,
  selectedLegendEntries,
  height,
  width
}) {
  // target positions for transation
  const translateToList = useMemo(() => `translate(${book.caratteriX}px)`, [book.caratteriX])
  const heightScale = scaleLinear()
    .domain([0, 1])
    .range([0, height]);

  const bookDataAnnotated = useMemo(() => {
    return bookData
      .map(item => ({
        label: item.label,
        value: item.value,
        color: item.color,
        height: heightScale(item.value)
      }))
      .reduce((out, item, i) => {
        if (i === 0) {
          out.push({ ...item, top: item.top !== undefined ? item.top : 0 });
        } else {
          out.push({
            ...item,
            top:
              item.top !== undefined
                ? item.top
                : out[i - 1].top + out[i - 1].height
          });
        }
        return out;
      }, []);
  }, [bookData, heightScale]);

  return (
    <>
      <animated.g
        key={book.textID}
        style={{
          transform: translateToList
        }}
      >
        <rect
          className={`${styles.marimekkoRect}`}
          style={{
            height,
            width: book.caratteriWidth,
            cursor: "pointer"
          }}
          onClick={() => setCurrentTextID(book.textID)}
        ></rect>

        {bookDataAnnotated.map((d, i) => (
          <animated.rect
            key={i}
            y={d.top}
            width={book.caratteriWidth}
            height={d.height}
            className={`${styles.marimekkoUnit}  ${
              selectedLegendEntries[d.label] ? styles.selected : ""
            }`}
            fill={d.color}
            stroke={"none"}
            style={{ pointerEvents: "none" }}
          ></animated.rect>
        ))}
      </animated.g>
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
  setCurrentTextID,
  iceCycleData,
  icycleWidth,
  currentBook,
  currentPosition,
  currentSequencesSelected
}) {
  const anyLegendEntrySelected = useMemo(() => {
    return Object.keys(selectedLegendEntries || {}).filter(
      k => selectedLegendEntries[k]
    ).length > 0;
  }, [selectedLegendEntries])
    

  const transitions = useTransition(!currentTextID, null, {
    from: { opacity: 1 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  return (
    <>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.svg
              key={key}
              style={{
                height,
                width,
                position: "absolute",
                zIndex: 0,
                opacity: props.opacity
              }}
              className={
                anyLegendEntrySelected ? styles.withLegendItemSelected : ""
              }
            >
              {booksDataWithPositions.map(book => {
                return (
                  <MarimekkoBook
                    key={book.textID}
                    book={book}
                    currentTextID={currentTextID}
                    setCurrentTextID={setCurrentTextID}
                    selectedLegendEntries={selectedLegendEntries}
                    height={height}
                    width={width}
                    iceCycleData={iceCycleData}
                    bookData={chartBooks[book.textID]}
                  ></MarimekkoBook>
                );
              })}
            </animated.svg>
          )
      )}

      {currentTextID && (
        <svg
          style={{ height, width, position: "absolute", zIndex: 2 }}
          className={
            anyLegendEntrySelected ? styles.withLegendItemSelected : ""
          }
        >
          <MarimekkoBookIcycle
            book={currentBook}
            currentTextID={currentTextID}
            bookData={chartBooks[currentBook.textID]}
            selectedLegendEntries={selectedLegendEntries}
            anyLegendEntrySelected={anyLegendEntrySelected}
            height={height}
            width={width}
            iceCycleData={iceCycleData}
            icycleWidth={icycleWidth}
            currentPosition={currentPosition}
            currentSequencesSelected={currentSequencesSelected}
          ></MarimekkoBookIcycle>
        </svg>
      )}
    </>
  );
}
