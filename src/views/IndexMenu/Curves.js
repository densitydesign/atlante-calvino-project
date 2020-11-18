import React, { useState, useEffect, useCallback, useRef } from "react";
import * as d3 from "d3";
import { Link } from "react-router-dom";
import styles from "./curves.module.css";
import pp_w4h3 from "./curves/curves-w4h3.json";
import pp_w3h2 from "./curves/curves-w3h2.json";
import pp_w16h9 from "./curves/curves-w16h9.json";
import pp_w3h4 from "./curves/curves-w3h4.json";
import pp_w9h16 from "./curves/curves-w9h16.json";

import labels_w4h3 from "./curves/labels-w4h3.json";
import labels_w3h2 from "./curves/labels-w3h2.json";
import labels_w16h9 from "./curves/labels-w16h9.json";
import labels_w3h4 from "./curves/labels-w3h4.json";
import labels_w9h16 from "./curves/labels-w9h16.json";

const curvesPoints = {
  [4 / 3]: pp_w4h3,
  [3 / 2]: pp_w3h2,
  [16 / 9]: pp_w16h9,
  [3 / 4]: pp_w3h4,
  [9 / 16]: pp_w9h16,
};

const labelsData = {
  [4 / 3]: labels_w4h3,
  [3 / 2]: labels_w3h2,
  [16 / 9]: labels_w16h9,
  [3 / 4]: labels_w3h4,
  [9 / 16]: labels_w9h16,
};

let pp = pp_w4h3;
let labels = labels_w4h3;

const line = d3
  .line()
  .curve(d3.curveNatural)
  .x((d) => d.x)
  .y((d) => d.y);

const Curves = ({ dev }) => {
  const svg = useRef();
  const [ratio, setRatio] = useState(4 / 3);
  // const [controlPoints, setControlPoints] = useState(pp_w16h9);
  // const [labels, setLabels] = useState([labels_w4h3]);

  let bbox;
  const drawCurves = useCallback(() => {
    bbox = svg.current.getBoundingClientRect();
    // const goal = bbox.width / bbox.height;
    const goal = window.innerWidth / window.innerHeight;
    const _ratio = Object.keys(curvesPoints)
      .reduce(function (prev, curr) {
        return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
      })
      .toString();
    console.log(goal, _ratio);
    pp = curvesPoints[_ratio];
    labels = labelsData[_ratio];
    setRatio(ratio);
    // setControlPoints(pp);
    // setLabels(labelsData[ratio]);
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

    document
      .querySelectorAll("." + styles.labelItinerary)
      .forEach((l,i) => {
        l.setAttribute("x", labels[i].x+"%");
        l.setAttribute("y", labels[i].y+"%");
      } );
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
    <svg
      className={[styles.curvesSvg, dev ? styles.development : ""].join(" ")}
      ref={svg}
    >
      <path className={styles.curve} />
      <path className={styles.curve} />
      <path className={styles.curve} />
      {/* control points, hidden in CSS module before publishing */}
      {dev &&
        pp.map((arr, i) =>
          arr.map((p, ii) => (
            <circle
              key={ii}
              className={styles.controlPoints}
              stroke={d3.schemeCategory10[i]}
              index1={i}
              index2={ii}
              r="5"
              cx={p.x + "%"}
              cy={p.y + "%"}
            />
          ))
        )}
      {labels.map((l, i) => (
        <Link key={i} to={l.link} className={styles.linkItinerary}>
          <text
            x={l.x + "%"}
            y={l.y + "%"}
            textAnchor={l.anchor}
            className={styles.labelItinerary}
          >
            {l.name}
          </text>
        </Link>
      ))}
    </svg>
  );
};

export default Curves;
