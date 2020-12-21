import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import styles from "./RangeFilter.module.css";

export default function RangeFilterSnap({ extent, update, style }) {
  extent = extent.map((d) => new Date(d));

  const svgEl = useRef(null);

  useEffect(() => {
    const bbox = svgEl.current.getBoundingClientRect();
    console.log(bbox);
    const width = bbox.width,
      height = bbox.height,
      margin = { top: 10, right: 10, bottom: 10, left: 10 },
      svg = d3.select(svgEl.current).attr("viewBox", [0, 0, width, height]);

    const interval = d3.timeYear.every(1);

    const x = d3
      .scaleTime()
      .domain(extent)
      .rangeRound([margin.left, width - margin.right]);

    const xAxis = (g) =>
      g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call((g) =>
          g
            .append("g")
            .call(
              d3
                .axisBottom(x)
                .ticks(interval)
                .tickSize(-height + margin.top + margin.bottom)
                .tickFormat(() => null)
            )
            .call((g) =>
              g.select(".domain").attr("fill", "#ddd").attr("stroke", null)
            )
            .call((g) =>
              g
                .selectAll(".tick line")
                .attr("stroke", "#fff")
                .attr("stroke-opacity", (d) => (d <= d3.timeDay(d) ? 1 : 0.5))
            )
        )
        .call((g) =>
          g
            .append("g")
            .call(d3.axisBottom(x).ticks(d3.timeYear.every(4)).tickPadding(0))
            .attr("text-anchor", null)
            .call((g) => g.select(".domain").remove())
            .call((g) => g.selectAll("text").attr("x", 6))
        );

    const brush = d3.brushX().extent([
      [margin.left, margin.top],
      [width - margin.right, height - margin.bottom],
    ]);

    // svg.append("g").call(xAxis);

    svg
      .append("g")
      .call(brush)
      // set brush active selection
      .call(brush.move, x.range());

    // bind the "brush" event after the active selection is set
    brush.on("brush", brushed);

    let year = svg.append("g").selectAll("text");
    updateYears(extent);

    function updateYears(data) {
      year = year.data(
        data.map((d, i) => {
          // text-anchor value
          let anchor, dx, fill;
          if (i % 2 === 0) {
            if (x(d) >= width / 4) {
              anchor = "end";
              dx = -5;
              fill = "white";
            } else {
              anchor = "start";
              dx = 5;
              fill = "black";
            }
          } else {
            if (x(d) <= (width / 4) * 3) {
              anchor = "start";
              dx = 5;
              fill = "white";
            } else {
              anchor = "end";
              dx = -5;
              fill = "black";
            }
          }
          return {
            date: d,
            year: d.getFullYear(),
            anchor: anchor,
            dx: dx,
            fill: fill,
          };
        }),
        (d, i) => i
      );
      year.exit().remove();
      year = year
        .enter()
        .append("text")
        .merge(year)
        .attr("fill", d=>d.fill)
        .style("font-weight", "500")
        .attr("x", (d) => x(d.date) + d.dx)
        .attr("y", 33)
        .attr("text-anchor", d=>d.anchor)
        .text((d) => d.year);
    }

    function brushed() {
      if (d3.event.sourceEvent.type === "brush") return;
      const d0 = d3.event.selection.map(x.invert);
      const d1 = d0.map(interval.round);

      // If empty when rounded, use floor instead.
      if (d1[0] >= d1[1]) {
        d1[0] = interval.floor(d0[0]);
        d1[1] = interval.offset(d1[0]);
      }
      d3.select(this).call(brush.move, d1.map(x));

      // span = span.map(d => new Date(d));
      // Viz.update(span);
      updateYears(d1);

      // Apply filter
      update(d1);
    }
  }, []);

  return (
    <div style={style}>
      <svg ref={svgEl} className={styles["range-filter"]} />
    </div>
  );
}
