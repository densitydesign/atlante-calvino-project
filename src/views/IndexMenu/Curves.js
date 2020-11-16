import React, { useState, useEffect, useCallback, useRef } from "react";
import * as d3 from "d3";
import styles from "./curves.module.css";
import pp_w4h3 from "./curves/curves-w4h3.json";
import pp_w16h9 from "./curves/curves-w4h3.json";
import pp_w3h4 from "./curves/curves-w4h3.json";

const curvesPoints = {
  [4 / 3]: pp_w4h3,
  [16 / 9]: pp_w16h9,
  [3 / 4]: pp_w3h4,
  [9 / 16]: pp_w16h9,
};

console.log(curvesPoints);

const line = d3
  .line()
  .curve(d3.curveNatural)
  .x((d) => d.x)
  .y((d) => d.y);

const whiteCircles = [
  [
    {
      x: 29.270833333333336,
      y: 30.100334448160538,
    },
    {
      x: 7.51953125,
      y: 41.040462427745666,
    },
    {
      x: 17.049666419570052,
      y: 76.54986522911051,
    },
  ],
  [
    {
      x: 49.53125,
      y: 38.46153846153847,
    },
    {
      x: 38.072916666666664,
      y: 57.63656633221851,
    },
    {
      x: 54.79166666666667,
      y: 83.61204013377926,
    },
  ],
  [
    {
      x: 71.82291666666667,
      y: 29.76588628762542,
    },
    {
      x: 86.40625,
      y: 44.569677,
    },
    {
      x: 83.95833333333333,
      y: 74.47045707915272,
    },
  ],
];

const Curves = () => {
  const svg = useRef();
  let bbox;

  const [pp, setPP] = useState(pp_w4h3);

  const drawCurves = useCallback(() => {
    bbox = svg.current.getBoundingClientRect();
    const goal = bbox.width / bbox.height;
    const ratio = Object.keys(curvesPoints).reduce(function (prev, curr) {
      return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
    });
    const pp = curvesPoints[ratio];
    const points = pp.map((arr) => {
      return arr.map((d) => ({
        position: d.position,
        x: (bbox.width / 100) * d.x,
        y: (bbox.height / 100) * d.y,
      }));
    });
    document
      .querySelectorAll("." + styles.curve)
      .forEach((path, i) => path.setAttribute("d", line(points[i])));
  }, []);

  useEffect(() => {
    bbox = svg.current.getBoundingClientRect();
    drawCurves();
    const dragHandler = d3.drag().on("drag", dragged).on("end", dragEnd);

    dragHandler(d3.select(svg.current).selectAll("circle"));

    function dragged() {
      var current = d3.select(this);
      const index1 = d3.select(this).attr("index1");
      const index2 = d3.select(this).attr("index2");
      const x = (d3.event.x / bbox.width) * 100 + "%";
      const y = (d3.event.y / bbox.height) * 100 + "%";
      current.attr("cx", x).attr("cy", y);

      pp[index1][index2].x = parseFloat(x);
      pp[index1][index2].y = parseFloat(y);

      drawCurves();
    }

    function dragEnd() {
      function copyStringToClipboard(str) {
        // Create new element
        var el = document.createElement("textarea");
        // Set value (string to be copied)
        el.value = str;
        // Set non-editable to avoid focus and move outside of view
        el.setAttribute("readonly", "");
        el.style = { position: "absolute", left: "-9999px" };
        document.body.appendChild(el);
        // Select text inside element
        el.select();
        // Copy text to clipboard
        document.execCommand("copy");
        // Remove temporary element
        document.body.removeChild(el);
      }
      copyStringToClipboard(JSON.stringify(pp, null, 2));
    }
  }, []);

  useEffect(() => {
    const cb = drawCurves;
    window.addEventListener("resize", cb);
    return () => void window.removeEventListener("resize", cb);
  }, [drawCurves]);

  return (
    <svg className={styles.curvesSvg} ref={svg}>
      {/* <defs>
        <radialGradient id="rgrad" cx="50%" cy="50%" r="75%">
          <stop
            offset="40%"
            stopColor="rgba(255,255,255,1)"
          />
          <stop
            offset="50%"
            stopColor="rgba(255,255,255,0)"
          />
        </radialGradient>
      </defs> */}
      <path className={styles.curve} />
      <path className={styles.curve} />
      <path className={styles.curve} />
      {/* White circles in the background */}
      {whiteCircles.map((arr,j)=>
        arr.map((p, i) => (
          <circle
            key={i}
            className={styles.whiteCircles}
            index={i}
            cx={p.x + "%"}
            cy={p.y + "%"}
          />
        ))
      )
          
      }
      {/* control points, hid in CSS module before publishing */}
      {pp.map((arr, i) =>
        arr.map((p, ii) => (
          <circle
            key={ii}
            className={styles.controlPoints}
            fill={d3.schemeCategory10[i]}
            index1={i}
            index2={ii}
            r="5"
            cx={p.x + "%"}
            cy={p.y + "%"}
          />
        ))
      )}
    </svg>
  );
};

export default Curves;
