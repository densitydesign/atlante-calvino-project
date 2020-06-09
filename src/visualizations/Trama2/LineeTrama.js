import React, {
  useRef,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { line, curveMonotoneX } from "d3-shape";
import { scaleLinear } from "d3-scale";

import { zoom } from "d3-zoom";
import range from "lodash/range";
import * as d3 from "d3";
import { select, selectAll, event as currentEvent } from "d3-selection";

const MAX_ZOOM_LEVEL = 10;
const TOP_SVG_PADDING = 20;



const splitPath = (d) => {

const pieces = d.split("C");
const paths = pieces.reduce((acc, item, i) => {
  if (i === 0) {
    return acc;
  }
  if (i === 1) {
    const path = pieces[0] + "C" + pieces[i];
    acc.push(path);
  } else {
    const [a, b] = pieces[i - 1].split(",").reverse();
    const path = `M${b},${a}C${pieces[i]}`;
    acc.push(path);
  }

  return acc;
}, []);

return paths
}

const LineaTrama = React.memo(({
  racconto,
  data,
  xScale,
  width,
  height,
  zoomLevel,
  index,
  gradient,
  itemSelected,
  toggleItem,
}) => {

  console.log("index", index)


  const lineGenerator = line()
    .x((d) => d.x)
    .y((d) => d.y * zoomLevel)
    .curve(curveMonotoneX);

  const d = lineGenerator(data);
  // console.log(123, data)

  

  const stroke = itemSelected ? `url('#trama-gradient-${zoomLevel}')` : "#ddd";

  const gRef = useRef()

  console.log("d", index, d)
  const subPaths = splitPath(d)


  return (
    <g ref={gRef}>
      {/* <rect
        width={width}
        height={height}
        style={{fill:`teal`, fillOpacity: 0.2}}
      ></rect> */}
    
   

      {/* {data.map((d, i) => {
        if(i < 2){ return null}
        const p = lineGenerator([data[i-2], data[i-1], data[i]])
        return <g>
        <rect x={data[i-2].x} width={data[i].x - data[i-2].x} height={height} style={{fill:'#ccc'}}>

        </rect>
        <path
        d={p}
         style={{ stroke: true ? `url('#${data[i-1].motivo_type}-${data[i].motivo_type}')` : '#fff', fill: 'none' }}
      ></path></g>
        
      })} */}
      
      {/* {cached && <image height={height} width={width} href={cached}></image>} */}
      {subPaths.map((subPath, i) => {
        const isFill = data[i+1].motivo_type === data[i].motivo_type
        const strokeSelected = isFill ? 'red' : `url('#${data[i+1].motivo_type}-${data[i].motivo_type}')`
        return <path key={i} d={subPath} style={{ stroke: itemSelected ? strokeSelected : '#fff', fill: 'none' }}></path>
      })}

      
      <path
        d={d}
        onClick={() => toggleItem(racconto.titolo)}
        className={`trama2-pointer ${itemSelected ? "selected" : ""}`}
      ></path>
      

      {/* <line x1={0} x2={width} y1={height} y2={height} style={{stroke: '#000'}}></line> */}
      
      {itemSelected && (
        <g>
          <g>
            <text x={width} y={0} style={{ textAnchor: "end" }}>
              {data.racconto.titolo}
            </text>
          </g>

          {data.map((d, i) => (
            <circle
              key={i}
              className="trama2-circle"
              cx={d.x}
              cy={d.y * zoomLevel}
              r={2}
            >
              <title>{d.motivo_type}</title>
            </circle>
          ))}
        </g>
      )}
    </g>
  );
})

export default function LineeTrama({
  racconti = [],
  data = {},
  height,
  scalaColore,
  scalaMotivoY,
  colors,
  selected,
  toggleSelect,
  tipologie,
}) {
  const containerRef = useRef(null);
  const [measures, setMeasures] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [zoomY, setZoomY] = useState(0);

  useEffect(() => {
    const m = containerRef.current.getBoundingClientRect();
    setMeasures(m);
  }, []);

  const scrollHandler = useCallback(
    (e, n) => {
      const sign = e.deltaY > 0 ? 1.0 : -1.0;

      const newLevel = zoomLevel + 0.1 * sign;

      if (newLevel > MAX_ZOOM_LEVEL) {
        return;
      }
      if (newLevel <= 1) {
        setZoomY(0);
        setZoomLevel(1);
        return;
      }
      setZoomLevel(Math.max(1, Math.min(newLevel, MAX_ZOOM_LEVEL)));
      if (!zoomY) {
        setZoomY(e.layerY);
      }

      return false;
    },
    [zoomLevel, zoomY]
  );

  // useEffect(() => {
  //   const n = containerRef.current;

  //   const sh = (e) => {
  //     scrollHandler(e, n);
  //   };

  //   n.addEventListener("wheel", sh, { passive: true });
  //   return () => {
  //     n.removeEventListener("wheel", sh, { passive: true });
  //   };
  // }, [scrollHandler]);

  

  const [translations, setTranslations] = useState([])

  useEffect(() => {
    if (measures) {
      let scaleY = scaleLinear()
        .domain([0, racconti.length])
        .range([0 + height, measures.height - height]);
      selectAll(".linea-container").attr(
        "transform",
        (d, i) => "translate(0, " + scaleY(i) + ")"
      );
      
      // const newTranslates = racconti.map((r, i ) => {
      //   return "translate(0, " + scaleY(i) + "px)"
      // })
      // setTranslations(newTranslates)
      
      function zoomz(){
        const newScaleY = currentEvent.transform.rescaleY(scaleY);
        // const newTranslates = racconti.map((r, i ) => {
        //   return "translate(0, " + newScaleY(i) + "px)"
        // })
        // setTranslations(newTranslates)
        selectAll(".linea-container").attr(
          "transform",
          (d, i) => "translate(0, " + newScaleY(i) + ")"
        );
      
      }


        select("#xxx")
          .call(zoom().on("zoom", zoomz))
        return () => {
          zoom.on("zoom", null)
        }
      
      
      // if(n && measures){
      //     //.extent([[0, 0], [measures.width, measures.height]])
      //   return () => {
      //     zoom.on("zoom", null)
      //   }
      // }


    }
  }, [height, measures, racconti, racconti.length]);

  // const zoomz = function (e) {
  //   console.log("xoo", currentEvent.transform, e);
  //   scaleY.current = currentEvent.transform.rescaleY(scaleY.current);
  //   const newTranslates = racconti.map((r, i ) => {
  //     return "translate(0, " + scaleY.current(i) + "px)"
  //   })
  //   setTranslations(newTranslates)
  //   console.log("newTranslates", newTranslates)
    
  //   // selectAll(".linea-container").attr("transform", (d, i)=>"translate(0, "+scaleY.current(i)+")");
  //   // const svg = containerRef.current;
  //   // select(svg).attr("transform", currentEvent.transform);
  //   //setZl(new Date())
  // };

  // useEffect(() => {
  //   const n = containerRef.current;
  //   if(n && measures){
  //     const s = select(n)
  //       .call(zoom().on("zoom", zoomz))
  //       //.extent([[0, 0], [measures.width, measures.height]])
  //     return () => {
  //       zoom.on("zoom", null)
  //     }
  //   }

  //   // const sel = select(n).call(zoom().on("zoom", zoomz))
  //   // return () => {
  //   //   sel.call(zoom().off("zoom", zoomz))
  //   // };
  // }, [containerRef, measures]);

  // const delta = useMemo(() => {
  //   if (!measures) {
  //     return 0;
  //   }
  //   return (measures.height - height) / racconti.length;
  // }, [height, measures, racconti.length]);

  const xScale = useMemo(() => {
    if (!measures) {
      return null;
    }
    return scaleLinear().domain([0, 1]).range([0, measures.width]);
  }, [measures]);

  const dataRacconti = useMemo(() => {
    if (!xScale) {
      return [];
    }
    return racconti.map((racconto) => {
      const out = data[racconto.titolo]
        .filter((d) => d.y !== undefined)
        .map((d) => {
          return {
            ...d,
            x: xScale(d.x),
            y: d.y,
          };
        });
      out.racconto = racconto;
      return out;
    });
  }, [data, racconti, xScale]);

  // const baseDisplacements = useMemo(() => {
  //   return dataRacconti.map((d, i) => {
  //     let dy = delta * i; //+ TOP_SVG_PADDING;
  //     return dy;
  //   });
  // }, [dataRacconti, delta]);

  // const displacements = useMemo(() => {
  //   if (!measures) {
  //     return [];
  //   }
  //   return dataRacconti.map((d, i) => {
  //     let dy = baseDisplacements[i];
  //     //return dy * zoomLevel

  //     const j = Math.floor(zoomY / delta);

  //     //const translation = zoomLevel === 1 ? 0 : (measures.height / (2 * delta * zoomLevel) - 1) * (delta * zoomLevel)
  //     //const translation =
  //     const factor = (zoomLevel - 1) / (MAX_ZOOM_LEVEL - 1);
  //     const diff =
  //       zoomLevel === 1 ? 0 : delta * j * zoomLevel - measures.height / 2; // / zoomLevel

  //     // const diff1 =  delta * j * 1
  //     // const diffMax =  delta * j * MAX_ZOOM_LEVEL - (measures.height / 2)
  //     // const diff = diff1 + (diffMax - diff1) / (MAX_ZOOM_LEVEL - 1) * (zoomLevel - 1)

  //     return dy//  - diff;
  //     // return diff - (j - i) * delta * zoomLevel
  //   });
  // }, [baseDisplacements, dataRacconti, delta, measures, zoomLevel, zoomY]);

  const deltaColors = useMemo(() => {
    return 100 / (colors.length - 1);
  }, [colors.length]);

  
  return (
    <div
      ref={containerRef}
      className="w-100 h-100"
      style={{ overflow: "hidden" }}
    >
      {/* <div>
        {colors.map(color => <div key={color} style={{background:color, height: 10}}></div>)}
      </div> */}
      {measures && (
        <svg
          id="xxx"
          style={{
            height: measures ? measures.height : 0,
            width: measures ? measures.width : 0,
            // transform: `perspective(${zoomLevel})`,
            // transformOrigin: `50% 50%`,
          }}
          ref={containerRef}
        >
          <defs>
            {tipologie.map((tipoFrom, i) =>
              tipologie.map((tipoTo, j) => (
                <linearGradient
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="1"
                  id={`${tipoFrom.tipologia}-${tipoTo.tipologia}`}
                  key={`${i}-${j}`}
                >
                  {+tipoFrom['ordine tipologia'] > +tipoTo['ordine tipologia'] && <>
                  <stop offset="0%" stopColor={tipoFrom.colore.colori}></stop>
                  <stop offset="100%" stopColor={tipoTo.colore.colori}></stop>
                  </>}
                  {+tipoFrom['ordine tipologia'] < +tipoTo['ordine tipologia'] && <>
                  <stop offset="0%" stopColor={tipoTo.colore.colori}></stop>
                  <stop offset="100%" stopColor={tipoFrom.colore.colori}></stop>
                  
                  </>}
                  {+tipoFrom['ordine tipologia'] === +tipoTo['ordine tipologia'] && <>
                  <stop offset="0%" stopColor={tipoTo.colore.colori}></stop>
                  <stop offset="100%" stopColor={tipoFrom.colore.colori}></stop>
                  
                  </>}

                  
                </linearGradient>
              ))
            )}
          </defs>

 

          {measures && dataRacconti.map((datum, i) => {
            //const dy = displacements[i];
            
            // if (dy < -height * zoomLevel) {
            //   return null;
            // }
            // if (dy > measures.height) {
            //   return null;
            // }

            // const datum = data[racconto]
            return (
              <g
                key={i}
                className="linea-container"
                // style={{
                //   transform: translations[i],
                // }}
              >
                {/* <line x1={0} x2={measures.width} y1={height} y2={height} style={{stroke: '#000'}}></line> */}
                <LineaTrama
                  scalaColore={scalaColore}
                  scalaMotivoY={scalaMotivoY}
                  index={i}
                  width={measures.width}
                  height={height}
                  zoomLevel={zoomLevel}
                  itemSelected={selected[racconti[i].titolo]}
                  toggleItem={toggleSelect}
                  xScale={xScale}
                  racconto={racconti[i]}
                  data={datum}
                ></LineaTrama>
              </g>
            );
          })}
        </svg>
      )}
      <canvas id="canvas"></canvas>
    </div>
  );
}
