import React, { useState, useMemo, useRef, useEffect } from "react";
import { scaleLinear } from "d3";
import sumBy from "lodash/sumBy";
// import sumBy from 'lodash/sumBy'
import styles from "./Combine.module.css";

const MIN_VIZ_HEIGHT = 400;

function MarimekkoTopAxis({ width, height, booksDataWithPositions }) {
  const margins = {
    bottom: 15
  };

  return (
    <div style={{ height, width, overflow: "hidden" }}>
      <svg style={{ height, width, overflow: "hidden" }}>
        <g transform={`translate(0 ${height - margins.bottom})`}>
          {booksDataWithPositions.map(book => (
            <g key={book.textID} transform={`translate(${book.caratteriX})`}>
              <rect
                className={styles.topAxisRect}
                width={book.caratteriWidth}
                height={4}
              ></rect>
              <g transform="translate(2 -2)">
                <text  className={styles.topAxisText} x={5} transform={`rotate(-45)`}>{book.textID}</text>
              </g>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}



function MarimekkoChart({height, width, booksDataWithPositions}){
  
  return <svg style={{height, width}}>
    {booksDataWithPositions.map(book => (<g key={book.textID} transform={`translate(${book.caratteriX})`}>
      <rect className={styles.marimekkoRect} style={{height, width: book.caratteriWidth}}></rect>
    </g>))}

  </svg>
}





function MarimekkoViz({ booksData }) {
  const vizContainerRef = useRef();
  const topAxisContainerRef = useRef();

  const [dimensions, setDimensions] = useState({
    vizWidth: 0,
    vizHeight: 0,
    topAxisHeight: 0,
    widthScale: null,
    heightScale: null
  });

  const measure = () => {
    const vizRect = vizContainerRef.current.getBoundingClientRect();
    const topAxisRect = topAxisContainerRef.current.getBoundingClientRect();
    const widthScale = scaleLinear()
      .domain([0, 100])
      .range(0, vizRect.height);
    const heightScale = scaleLinear()
      .domain([0, 100])
      .range(0, vizRect.height);

    const dimensions = {
      vizWidth: vizRect.width,
      vizHeight: vizRect.height,
      topAxisHeight: topAxisRect.height,
      widthScale,
      heightScale
    };

    console.log(123, "measure", dimensions);

    setDimensions({ ...dimensions });
  };

  // this is like "componentDidMount" (useEffect with empty deps is evaluated only after first render)
  useEffect(() => {
    measure();
    window.addEventListener("resize", measure, true);
    return () => {
      window.removeEventListener("resize", measure, true);
    };
  }, []);

  const booksDataWithPositions = useMemo(() => {
    const totalChars = sumBy(booksData, "caratteri");
    const scaleChars = scaleLinear()
      .domain([0, totalChars])
      .range([0, dimensions.vizWidth]);
    const booksDataAnnotated = booksData.reduce((out, item, i) => {
      if (i === 0) {
        out.push({
          ...item,
          caratteriPos: 0,
          caratteriX: 0,
          caratteriWidth: scaleChars(item.caratteri)
        });
      } else {
        const caratteriPos = out[i - 1].caratteriPos + out[i - 1].caratteri;
        out.push({
          ...item,
          caratteriPos,
          caratteriX: scaleChars(caratteriPos),
          caratteriWidth: scaleChars(item.caratteri)
        });
      }
      return out;
    }, []);

    return booksDataAnnotated;
  }, [booksData, dimensions.vizWidth]);

  console.log(booksDataWithPositions);

  return (
    <div className="container-fluid h-100 bg-light d-flex flex-column">
      <div className="row no-gutters" style={{ flex: 2, minHeight: 100 }}>
        <div className="col-sm-1"></div>
        <div className="col-sm-9" ref={topAxisContainerRef}>
          <MarimekkoTopAxis
            height={dimensions.topAxisHeight}
            width={dimensions.vizWidth}
            booksDataWithPositions={booksDataWithPositions}
          />
        </div>
      </div>

      <div className="row no-gutters w-100" style={{ flex: 10 }}>
        <div className="col-sm-1"></div>
        <div className="col-sm-9 border" ref={vizContainerRef}>
          {dimensions.vizWidth > 0 && dimensions.vizHeight > 0 && (
            <MarimekkoChart booksDataWithPositions={booksDataWithPositions} height={dimensions.vizHeight} width={dimensions.vizWidth}></MarimekkoChart>
          )}
        </div>
        <div className="col-sm-2 px-2">legend here</div>
      </div>

      <div className="row no-gutters" style={{ flex: 1 }}></div>
    </div>
  );
}

export default MarimekkoViz;
