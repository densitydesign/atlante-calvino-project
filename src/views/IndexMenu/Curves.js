import React, { useEffect, useCallback, useRef } from "react";
import * as d3 from "d3";
import styles from "./curves.module.css";
import pp from "./curves-points.json";

const line = d3
  .line()
  .curve(d3.curveNatural)
  .x((d) => d.x)
  .y((d) => d.y);

const whiteCircles = [
  [0, 5, 10],
  [0, 5, 10],
  [0, 4, 10],
];

const Curves = () => {
  const svg = useRef();
  let bbox;

  const drawCurves = useCallback(() => {
    bbox = svg.current.getBoundingClientRect();
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
      <defs>
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
      </defs>
      <path className={styles.curve} />
      <path className={styles.curve} />
      <path className={styles.curve} />
      {pp.map((arr, i) =>
        arr
          .filter((f, j) => whiteCircles[i].indexOf(j) > -1)
          .map((p, ii) => (
            <circle
              key={ii}
              className={styles.whiteCircles}
              index1={i}
              index2={ii}
              cx={p.x + "%"}
              cy={p.y + "%"}
            />
          ))
      )}
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
