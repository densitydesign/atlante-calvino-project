import React, { useState, useMemo, useRef, useEffect } from "react";
import groupBy from "lodash/groupBy";
import styles from "./Trama.module.css";
import { useChain, useSpring, animated } from "react-spring";
import { scaleLinear } from "d3";
import sortBy from "lodash/sortBy";
import omit from "lodash/omit";
import find from "lodash/find";
import { extent } from "d3-array";
import { levelMaps } from './helpers'


function MarimekkoBookIcycle({
  book,
  currentTextID,
  bookDataAnnotated,
  selectedLegendEntries,
  height,
  width,
  iceCycleData
}) {
  // utility measures
  const icycleWidth = (width / 10) * 8;
  const columnWidth = icycleWidth / 5;

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

    const bookExtentStart = extent(byLevelSorted["uno"], x => +x.starts_at);
    const bookExtentEnd = extent(byLevelSorted["uno"], x => +x.ends_at);
    const sequenceScale = scaleLinear()
      .range([0, height])
      // .domain([bookExtentStart[0], bookExtentEnd[1]]);
      .domain([0, +book.caratteri])

    //annotation for levels <> "uno"
    const byLevelAnnotated = Object.keys(omit(byLevelSorted, "uno")).reduce(
      (acc, item) => {
        acc[item] = byLevelSorted[item].reduce((listOfBlocks, sequence) => {
          listOfBlocks.push({
            ...sequence,
            y1: sequenceScale(+sequence.starts_at),
            h: sequenceScale(+sequence.ends_at) - sequenceScale(+sequence.starts_at)
          });
          return listOfBlocks;
        }, []);
        return acc;
      },
      {}
    );
    return byLevelAnnotated;
  }, [book.caratteri, height, iceCycleData]);


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

  const [levelsTranslated, setLevelsTranslated] = useState(1)

  const props = useSpring({
    // config: { friction: 50 },

    from: {
      opacity: 1,
      transform: translateToList,
      width: book.caratteriWidth,
      levelsOpen: 0,
    },

    to: [
      {
        opacity: isVisible ? 1 : 0,
        transform: isCurrentDetail ? translateToDetail : translateToList,
        width: isCurrentDetail || wasDetail ? columnWidth : book.caratteriWidth,
        levelsOpen: levelsTranslated,
      },
      {
        // width: isCurrentDetail ? columnWidth : book.caratteriWidth,
        transform:
          isCurrentDetail || wasDetail ? translateToDetail : translateToList,
        levelsOpen: 1,
      }
    ],

    onFrame({ levelsOpen }) {
      const x = Math.floor(levelsOpen)
      if(levelsTranslated !== x){
        setLevelsTranslated(levelsOpen)
      }
    }

    
  });

  // useChain(isCurrent ? [springRef, rectSpringRef] : [rectSpringRef, springRef])
  // console.log(props)

  return isDetail && (
    <>


{iCycleDataAnnotated &&
            Object.keys(iCycleDataAnnotated).map(
              levelName => {
                const levelValue = levelMaps[levelName]
                const translate = `translateX(${(levelValue - 1) * columnWidth}px)`

                return (
                  <animated.g
                    key={levelName}
                    style={{
                      transform : translate,
                      opacity: props.levelsOpen,
                    }}
                  >
                    {iCycleDataAnnotated[levelName].map(block => (
                      <rect
                        title={levelName}
                        style={{ fill: block.color }}
                        className={`${styles.marimekkoUnit}  ${styles.marimekkoUnitIceCycle} ${
                          selectedLegendEntries[block.label]
                            ? styles.selected
                            : ""
                        }`}
                        key={block['ID SEQ']}
                        width={columnWidth}
                        y={block.y1}
                        height={block.h}
                      ></rect>
                    ))}
                  </animated.g>
                )
              }
            )}






      <animated.g
        key={book.textID}
        style={{
          transform: props.transform,
          opacity: props.opacity
        }}
      >
        <rect
          className={`${styles.marimekkoRect}`}
          style={{
            height,
            width: props.width
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
            stroke={"none"}
          ></animated.rect>
        ))}
      </animated.g>

       
          
   
     
    </>
  );
}

function MarimekkoBook({
  book,
  currentTextID,
  setCurrentTextID,
  bookDataAnnotated,
  selectedLegendEntries,
  height,
  width
}) {
  // target positions for transation
  const translateToList = `translate(${book.caratteriX}px)`;

  // useChain(isCurrent ? [springRef, rectSpringRef] : [rectSpringRef, springRef])
  // console.log(props)

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
            cursor: 'pointer',
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
            style={{pointerEvents: 'none'}}
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
  coloriClusterTipologie
}) {
  const heightScale = scaleLinear()
    .domain([0, 1])
    .range([0, height]);

  const anyLegendEntrySelected =
    Object.keys(selectedLegendEntries || {}).filter(
      k => selectedLegendEntries[k]
    ).length > 0;

  const mappedBooks = useMemo(() => {
    let out = {};
    booksDataWithPositions.forEach(book => {
      const bookData = chartBooks[book.textID];
      //annotating with top and height
      out[book.textID] = bookData
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
    });

    return out;
  }, [booksDataWithPositions, chartBooks, heightScale]);

  const currentBook = useMemo(() => {
    return find(booksDataWithPositions, x => x.textID === currentTextID);
  }, [booksDataWithPositions, currentTextID]);

  return (
    <>
      {!currentTextID && (
        <svg
          style={{ height, width, position: "absolute", zIndex: 0 }}
          className={
            anyLegendEntrySelected ? styles.withLegendItemSelected : ""
          }
        >
          {booksDataWithPositions.map(book => {
            const bookDataAnnotated = mappedBooks[book.textID];
            return (
              <MarimekkoBook
                key={book.textID}
                book={book}
                currentTextID={currentTextID}
                setCurrentTextID={setCurrentTextID}
                bookDataAnnotated={bookDataAnnotated}
                selectedLegendEntries={selectedLegendEntries}
                height={height}
                width={width}
                iceCycleData={iceCycleData}
              ></MarimekkoBook>
            );
          })}
        </svg>
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
            bookDataAnnotated={mappedBooks[currentTextID]}
            selectedLegendEntries={selectedLegendEntries}
            height={height}
            width={width}
            iceCycleData={iceCycleData}
          ></MarimekkoBookIcycle>
        </svg>
      )}
    </>
  );
}
