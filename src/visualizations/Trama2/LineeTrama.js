import React, {
  useRef,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { line, curveMonotoneX } from "d3-shape";
import { scaleLinear } from "d3-scale";
import { zoom } from "d3";

const MAX_ZOOM_LEVEL = 10;
const TOP_SVG_PADDING = 20;

function LineaTrama({
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
}) {
  const lineGenerator = line()
    .x((d) => d.x)
    .y((d) => d.y * zoomLevel)
    .curve(curveMonotoneX);
  const d = lineGenerator(data);

  const stroke = itemSelected ? `url('#trama-gradient-${zoomLevel}')` : "#ddd";
  return (
    <g>
      {/* <rect
        width={width}
        height={height}
        style={{fill:`teal`, fillOpacity: 0.2}}
      ></rect> */}
      <path
        d={d}
        className={`trama2-pointer ${itemSelected ? "selected" : ""}`}
        onClick={toggleItem}
      ></path>
      <path
        d={d}
        className="trama2-line"
        style={{ stroke, strokeWidth: zoomLevel }}
      ></path>

      {/* <line x1={0} x2={width} y1={height} y2={height} style={{stroke: '#000'}}></line> */}
      {itemSelected && (
        <g>
          <g>
            {/* <rect ></rect> */}
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
}

export default function LineeTrama({
  racconti = [],
  data = {},
  height,
  scalaColore,
  scalaMotivoY,
  colors,
  selected,
  toggleSelect,
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
        setZoomLevel(1)
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

  useEffect(() => {
    const n = containerRef.current;

    const sh = (e) => {
      scrollHandler(e, n);
    };

    n.addEventListener("wheel", sh, { passive: true });
    return () => {
      n.removeEventListener("wheel", sh, { passive: true });
    };
  }, [scrollHandler]);

  const delta = useMemo(() => {
    if (!measures) {
      return 0;
    }
    return (measures.height - height) / racconti.length;
  }, [height, measures, racconti.length]);

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

  const baseDisplacements = useMemo(() => {
    return dataRacconti.map((d, i) => {
      let dy = delta * i //+ TOP_SVG_PADDING;
      return dy;
    });
  }, [dataRacconti, delta]);

  const displacements = useMemo(() => {
    if(!measures){
      return []
    }
    return dataRacconti.map((d, i) => {
      let dy = baseDisplacements[i];
      //return dy * zoomLevel

      const j = Math.floor(zoomY / delta);

      
      //const translation = zoomLevel === 1 ? 0 : (measures.height / (2 * delta * zoomLevel) - 1) * (delta * zoomLevel)
      //const translation = 
      const factor = (zoomLevel-1) / (MAX_ZOOM_LEVEL-1);
      const diff = zoomLevel === 1 ? 0 : delta * j * zoomLevel - (measures.height / 2)// / zoomLevel

      // const diff1 =  delta * j * 1
      // const diffMax =  delta * j * MAX_ZOOM_LEVEL - (measures.height / 2)
      // const diff = diff1 + (diffMax - diff1) / (MAX_ZOOM_LEVEL - 1) * (zoomLevel - 1)


      return dy * zoomLevel - diff 
      // return diff - (j - i) * delta * zoomLevel
    });
  }, [baseDisplacements, dataRacconti, delta, measures, zoomLevel, zoomY]);

  const deltaColors = useMemo(() => {
    return 100 / (colors.length - 1);
  }, [colors.length]);

  return (
    <div
      ref={containerRef}
      className="w-100 h-100"
      style={{ overflow: "auto" }}
    >
      {/* <div>
        {colors.map(color => <div key={color} style={{background:color, height: 10}}></div>)}
      </div> */}
      {measures && (
        <svg
          style={{
            height: measures.height,
            width: measures.width,
            // transform: `perspective(${zoomLevel})`,
            // transformOrigin: `50% 50%`,
          }}
          ref={containerRef}
        >
          <linearGradient
            id={`trama-gradient-${zoomLevel}`}
            gradientUnits="userSpaceOnUse"
            y2={0}
            y1={height * zoomLevel}
            x1={0}
            x2={0}
          >
            {colors.map((color, i) => (
              <stop
                key={i}
                offset={`${deltaColors * i}%`}
                stopColor={color}
              ></stop>
            ))}
          </linearGradient>
          {/* <linearGradient id={`trama-gradient-${zoomLevel}`} gradientUnits="userSpaceOnUse" y1={0} y2={height* zoomLevel} x1={0} x2={0}>
            
              <stop offset={`0%`} stopColor={'#000'}></stop>
              <stop offset={`100%`} stopColor={'#fff'}></stop>
            
          </linearGradient> */}

          {dataRacconti.map((datum, i) => {
            const dy = displacements[i];

            if (dy < -height * zoomLevel) {
              return null;
            }
            if (dy > measures.height) {
              return null;
            }

            // const datum = data[racconto]
            return (
              <g
                key={i}
                style={{
                  transform: `translateY(${dy}px)`,
                }}
              >
                <LineaTrama
                  scalaColore={scalaColore}
                  scalaMotivoY={scalaMotivoY}
                  index={i}
                  width={measures.width}
                  height={height * zoomLevel}
                  zoomLevel={zoomLevel}
                  itemSelected={selected[racconti[i].titolo]}
                  toggleItem={toggleSelect(racconti[i].titolo)}
                  xScale={xScale}
                  racconto={racconti[i]}
                  data={datum}
                ></LineaTrama>
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}
