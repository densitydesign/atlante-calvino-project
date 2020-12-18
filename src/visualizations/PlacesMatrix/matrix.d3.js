import * as d3 from "d3";
import ParseMatrixData from "../../utilities/parse-matrix-data";
// import _ from 'lodash';

const categories = [
  "Cosmici generici",
  "Cosmici localizzabili",
  "Terrestri localizzabili",
  "Terrestri generici",
  "Terrestri Inventati",
  "Nessun luogo",
];
const categoriesColors = [
  "#3131ff",
  "#bbbbff",
  "#ffce00",
  "#ff6c39",
  "#00c19c",
  "#cecece",
];

const collisionPadding = 0.25;

// data
let originalData,
  graph,
  nodes = [],
  links = [],
  hullsData = [],
  last = 0,
  globalTimeFilter;

// Dimensions and scales
let x,
  y,
  r,
  color,
  margin = { top: 0, right: 50, bottom: 30, left: 50 },
  originalLabelsSize,
  width,
  height;
let xAxisCall, yAxisCall;

// elements
let svg,
  g,
  g_forceLayout,
  xAxis,
  yAxis,
  hull,
  link,
  node,
  presumed,
  label,
  information;

// force-layout
let simulation;

class VClass {
  initialize = (
    el,
    data,
    _originalData,
    _onChangeCategorie,
    _resetFilter,
    t
  ) => {
    // console.log('init');
    // console.log('data:', data);
    // console.log('filters:', filters);

    originalData = _originalData;

    // Root element and dimensions
    svg = d3.select(el).style("touch-action", "manipulation");
    width =
      svg.node().getBoundingClientRect().width - margin.left - margin.right;
    height =
      svg.node().getBoundingClientRect().height - margin.top - margin.bottom;

    svg
      .append("rect")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .classed("reset-rect", true)
      .on("click", (d) => {
        if (d3.event.timeStamp - last < 500) {
          console.log("reset");
          this.closeAll();
          this.reset("also categories");

          _resetFilter();
        } else {
          label.classed("selected", false);
          node.classed("selected", false);
          svg.classed("there-is-selection", false);
        }
        last = d3.event.timeStamp;
      });

    // Scales
    x = d3
      .scaleTime()
      .range([0, width])
      .domain(d3.extent(data.nodes, (d) => d.year));

    xAxisCall = d3.axisBottom(x).ticks(d3.timeYear.every(1));

    y = d3.scalePoint().range([0, height]).domain(categories).padding(0.5);

    yAxisCall = d3
      .axisRight(y)
      .tickSize(width)
      .tickFormat((d) => {
        const categoria = d.replace(/_/g, " ");
        if (typeof t === "function") {
          return t(`transform:categoria.${categoria}`);
        }
        return categoria;
      });

    r = d3
      .scalePow()
      .exponent(0.5)
      .range([3, 25])
      .domain([
        1,
        d3.max(data.nodes, function (d) {
          return d.totalSubNodes;
        }),
      ]);

    color = d3.scaleOrdinal().domain(categories).range(categoriesColors);

    // Groups and scales
    g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    xAxis = g.append("g").attr("class", "x-axis");
    yAxis = g.append("g").attr("class", "y-axis");
    g_forceLayout = g.append("g");

    xAxis.attr("transform", `translate(${0}, ${height})`).call(xAxisCall);

    yAxis
      .attr("transform", `translate(0, 0)`)
      .call(yAxisCall)
      .call((g) =>
        g.selectAll(".tick text").style("text-transform", "capitalize")
      )
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .attr("stroke-opacity", 0.5)
          .attr("stroke-dasharray", "2,2")
      )
      .call((g) =>
        g
          .selectAll(".tick text")
          .attr("x", 4)
          .attr("dy", -y.step() / 10)
      );

    this.selectedCategories = [];
    const selCats = this.selectedCategories;

    const self = this;

    yAxis.selectAll(".tick").on("click", function (d) {
      if (d3.select(this).classed("cat-selected") === false) {
        selCats.push(d);
        let toOpen = [];
        nodes.forEach((n0) => {
          // console.log('n0',n0);
          if (n0.totalSubNodes > 0) {
            if (n0.subNodes.map((n) => n.category).indexOf(d) > -1) {
              toOpen.push(n0);
            }
            n0.subNodes.forEach((n1) => {
              // console.log('n1',n1);
              if (n1.totalSubNodes > 0) {
                if (n1.subNodes.map((n) => n.category).indexOf(d) > -1) {
                  toOpen.push(n0);
                  toOpen.push(n1);
                }
                n1.subNodes.forEach((n2) => {
                  // console.log('n2',n2);
                  if (n2.totalSubNodes > 0) {
                    if (n2.subNodes.map((n) => n.category).indexOf(d) > -1) {
                      toOpen.push(n0);
                      toOpen.push(n1);
                      toOpen.push(n2);
                    }
                  }
                });
              }
            });
          }
        });
        toOpen.forEach((n) => {
          self.openSubnodes(n, false);
        });

        d3.select(this)
          .select("rect")
          .attr("fill", (d) => color(d));
      } else {
        const index = selCats.indexOf(d);
        if (index !== -1) selCats.splice(index, 1);

        let toClose = [];
        nodes.forEach((n0) => {
          // console.log('n0',n0);
          if (n0.totalSubNodes > 0) {
            if (n0.subNodes.map((n) => n.category).indexOf(d) > -1) {
              toClose.push(n0);
            }
            n0.subNodes.forEach((n1) => {
              // console.log('n1',n1);
              if (n1.totalSubNodes > 0) {
                if (n1.subNodes.map((n) => n.category).indexOf(d) > -1) {
                  toClose.push(n0);
                  toClose.push(n1);
                }
                n1.subNodes.forEach((n2) => {
                  // console.log('n2',n2);
                  if (n2.totalSubNodes > 0) {
                    if (n2.subNodes.map((n) => n.category).indexOf(d) > -1) {
                      toClose.push(n0);
                      toClose.push(n1);
                      toClose.push(n2);
                    }
                  }
                });
              }
            });
          }
        });
        toClose.forEach((n) => {
          self.closeSubnodes(n, false);
        });
        d3.select(this).select("rect").attr("fill", "transparent");
      }

      self.update();

      // Now that everything is done, assign the class
      d3.select(this).classed(
        "cat-selected",
        !d3.select(this).classed("cat-selected")
      );

      _onChangeCategorie(selCats);
    });

    yAxis
      .selectAll(".tick")
      .append("rect")
      .attr("width", "14px")
      .attr("height", "14px")
      .attr("x", -14)
      .attr("y", -22)
      .attr("rx", 2)
      .attr("fill", "transparent")
      .attr("stroke", (d) => color(d));

    yAxis
      .selectAll(".tick")
      .selectAll("text")
      .each(function () {
        const cat_label = this.innerHTML.split(" ");
        this.innerHTML = "";
        d3.select(this)
          .attr("transform", "translate(-15,-48)")
          .selectAll("tspan")
          .data(cat_label)
          .enter()
          .append("tspan")
          .attr("x", 0)
          .attr("dy", (d, i) => i * 16)
          .text((d) => d);
      });

    // function adjust_labels(){
    //   // const cat_label = this.innerHTML
    //   console.log(this)
    // }

    link = g_forceLayout.append("g").classed("links", true).selectAll(".link");
    hull = g_forceLayout.append("g").classed("hulls", true).selectAll(".hull");
    node = g_forceLayout.append("g").classed("nodes", true).selectAll(".node");
    presumed = g_forceLayout
      .append("g")
      .classed("presumed", true)
      .selectAll(".presumed");
    label = g_forceLayout
      .append("g")
      .classed("labels", true)
      .selectAll(".label");
    information = g
      .append("g")
      .classed("informations", true)
      .selectAll(".information");

    simulation = d3
      .forceSimulation(nodes)
      .force(
        "collision",
        d3
          .forceCollide(function (d) {
            let thisCollisionPadding =
              d.totalSubNodes > 0 ? collisionPadding + 2 : collisionPadding;
            return d.opened
              ? r(1) + thisCollisionPadding
              : r(d.totalSubNodes + 1) + thisCollisionPadding;
          })
          .strength(0.3)
          .iterations(12)
      )
      .force(
        "link",
        d3
          .forceLink()
          .strength(0.45)
          .distance(r.range()[0])
          .id(function (d) {
            return d.id;
          })
      )
      .force(
        "x",
        d3.forceX((d) => x(d.year))
      )
      .force(
        "y",
        d3
          .forceY((d) => y(d.category))
          .strength((d) => (d.part_of === "" ? 0.1 : 0))
      )
      .on("tick", this.ticked)
      //.on("end", () => { console.log('simulation ended') })
      .stop();

    // handle the zoom function

    let zoom = d3
      .zoom()
      .translateExtent([
        [0, 0],
        [
          width + margin.left + margin.right,
          height + margin.top + margin.bottom,
        ],
      ])
      .scaleExtent([1, 10])
      .on("zoom", zoomed);

    function zoomed() {
      // so a simple resize+translate for the main group and the y axis
      g_forceLayout.attr("transform", d3.event.transform);
      yAxis.attr("transform", d3.event.transform);

      // the x axis has to be resscaled according to the zoom
      // taken from: https://bl.ocks.org/rutgerhofste/5bd5b06f7817f0ff3ba1daa64dee629d
      let new_x = d3.event.transform.rescaleX(x);
      xAxis.call(xAxisCall.scale(new_x));

      // rescale labels
      if (!originalLabelsSize) {
        originalLabelsSize = d3.select(".label").style("font-size");
        originalLabelsSize = parseFloat(originalLabelsSize);
      }
      const newSize = originalLabelsSize / d3.event.transform.k;
      // change style on the parent
      // this will propagate the new size to all children (label)
      d3.select("g.labels").style("font-size", newSize + "px");

      // display all labels of selected compositions
      if (d3.event.transform.k > 2.5) {
        // make the labels of selected nodes via filter visible
        d3.selectAll(".node:not(.filtered)").each((d) => {
          label.filter((l) => l.id === d.id).classed("zoom-selected", true);
        });

        // make the labels of selected nodes visible
        d3.selectAll(".node.selected").each((d) => {
          label.filter((l) => l.id === d.id).classed("zoom-selected", true);
        });

        // all labels visible
        //label.classed('zoom-selected', true)
      } else {
        label.classed("zoom-selected", false);
      }

      information.attr("x", (d) =>
        new_x(d.year) >= width / 2 ? new_x(d.year) + 4.8 : new_x(d.year) - 3.2
      );
    }

    svg.call(zoom).on("dblclick.zoom", null);

    //Store data in global variable
    graph = data;
    // globalTimeFilter = filter;

    // Precalculating the position of nodes allows to make them appear in place
    graph.nodes = graph.nodes.map((d) => {
      return {
        ...d,
        x: x(d.year),
        y: y(d.category),
      };
    });
  };

  update = (timeFilter) => {
    // console.log('update');
    // console.log('graph:', graph);
    if (timeFilter) {
      globalTimeFilter = timeFilter;
    } else {
      timeFilter = globalTimeFilter;
    }

    // update data
    nodes = graph.nodes;
    links = graph.edges;

    // update fx before updating the x scale
    nodes.forEach((d) => {
      if (d.fx) {
        d.correspondingYear = x.invert(d.fx);
      } else {
        delete d.correspondingYear;
      }
    });

    // Update x domain
    x.domain(timeFilter);
    xAxis.call(xAxisCall);

    // calculate new fx
    nodes.forEach((d) => {
      if (d.correspondingYear) {
        d.fx = x(d.correspondingYear);
      }
    });

    node = node.data(nodes, (d) => {
      return d.id;
    });
    node.exit().remove();

    const self = this;

    node = node
      .enter()
      .append("circle")
      .attr("class", (d) => `node`)
      .classed("sub-node", (d) => d.part_of !== "")
      .classed("selected", (d) => d.isSelected)
      .attr("key", (d) => d.id)
      .on("mouseenter", (d) => {
        label.filter((l) => l.id === d.id).style("display", "block");
        node
          .style("opacity", 0.25)
          .filter((n) => n.source === d.source)
          .style("opacity", 1);
        self.displayTitle(d);
      })
      .on("mouseleave", (d) => {
        label.filter((l) => l.id === d.id).style("display", "none");
        node.style("opacity", "");
        self.displayTitle(d);
      })

      .on("click", function (d) {
        console.log("clicked on", d);
        // if double click/tap
        const _delay = 500;
        if (d3.event.timeStamp - last < _delay) {
          console.log("dbl clicked on", d);
          self.toggleSubnodes(d, "restart the force");
        }
        const isSelected = d3.select(this).classed("selected");
        // do this after the nodes have been opened
        if (!isSelected) {
          self.selectLabel(d);
          self.selectSameComposition(d);
          self.displayTitle([d]);
        } else {
          self.unselectLabel(d);
          self.unselectNode(d);
        }

        last = d3.event.timeStamp;
      })
      .merge(node)
      .attr("display", (d) => {
        return d.year >= timeFilter[0] && d.year <= timeFilter[1]
          ? "block"
          : "none";
      })
      .style("cursor", function (d) {
        return d.subNodes && d.subNodes.length ? "pointer" : "auto";
      })
      .attr("fill", (d) => (d.opened === true ? "white" : color(d.category)))
      .attr("stroke", function (d) {
        if (d.totalSubNodes > 0) return d3.color(color(d.category)).darker(1);
      })
      .attr("r", function (d) {
        return d.opened ? r(1) : r(d.totalSubNodes + 1);
      }); // +1 means plus itself

    presumed = presumed.data(
      nodes.filter((d) => d.isGuessed),
      (d) => d.id
    );
    presumed.exit().remove();
    presumed = presumed
      .enter()
      .append("circle")
      .classed("presumed", true)
      .attr("r", 1.5)
      .attr("fill", (d) => d3.color(color(d.category)).darker(1))
      .merge(presumed)
      .attr("display", (d) =>
        d.year >= timeFilter[0] && d.year <= timeFilter[1] ? "block" : "none"
      );

    // Apply the general update pattern to the links.
    link = link.data(links, (d) => d.source.id + "-" + d.target.id);
    link.exit().remove();
    link = link
      .enter()
      .append("line")
      .classed("link", true)
      .classed("part-of", function (d) {
        return d.kind === "part_of";
      })
      .attr("stroke-width", 0.5)
      .attr("stroke", "#ccc")
      .merge(link);

    // Apply the general update pattern to the labels.
    label = label.data(nodes, (d) => d.id);
    label.exit().remove();
    label = label
      .enter()
      .append("text")
      .classed("label", true)
      .style("display", "none")
      .attr("text-anchor", "middle")
      .style("pointer-events", "none")
      .text((d) => d.label)
      .merge(label);

    // Apply the general update pattern to the convex hulls.
    hull = hull.data(hullsData, (d) => d[0].id);
    hull.exit().remove();
    hull = hull
      .enter()
      .append("path")
      .classed("hull", true)
      .attr("fill", (d) => color(d[0].category))
      .style("opacity", 0.25)
      .merge(hull);

    simulation.nodes(nodes);
    if (simulation.force("link")) {
      simulation.force("link").links(links);
    }
    simulation.alpha(1).restart();
  };

  filter = (filter, selectLabelsArr) => {
    this.applyFilter(filter, "do reset");

    if (selectLabelsArr && selectLabelsArr.length < originalData.length) {
      selectLabelsArr.forEach((an_id) => {
        const obj = { id: an_id };
        this.selectLabel(obj);
      });
    }
  };

  openOnSearch = (arr) => {
    let parents2open = [];
    const self = this;
    arr.forEach((s) => {
      search4Parent(s);
    });

    // console.log(parents2open);

    function search4Parent(nodeId) {
      const thisNode = originalData.filter((od) => od.id === nodeId)[0];
      if (thisNode.part_of !== "") {
        parents2open.push(thisNode.part_of);
        search4Parent(thisNode.part_of);
      }
    }

    if (parents2open.length > 0) {
      parents2open.reverse().forEach((parentId, i) => {
        const parent_id = originalData.filter((od) => od.id === parentId)[0].id;
        // surviveFilters[2].push(parent_id);
        const parent = nodes.filter((d) => d.id === parent_id)[0];
        self.openSubnodes(parent, "do not restart the force");
      });

      self.update();
    }
  };

  openAll = () => {
    const self = this;
    runAll(nodes);

    function runAll(nodesList) {
      nodesList.forEach((n) => {
        if (n.totalSubNodes > 0) {
          self.openSubnodes(n, "do not restart simulation");
          runAll(n.subNodes);
        }
      });
    }
  };

  closeAll = () => {
    const self = this;
    nodes
      .filter((d) => d.part_of === "")
      .forEach(function (d) {
        self.closeSubnodes(d, "do not restart simulation");
      });
    this.update();
  };

  destroy = () => {};

  // Other functions
  openSubnodes = (d, doRestart) => {
    // If it happens that the node is already open, just skip.
    if (d.opened) return;

    // If not, let's open it
    d.opened = true;

    // fix the position only if it is a "root node"
    if (d.part_of === "") {
      d.fx = d.x;
      d.fy = d.y;
    } else {
      d.x = nodes.filter((n) => n.id === d.part_of)[0].x;
      d.fy =
        nodes.filter((n) => n.id === d.part_of)[0].y + r.range()[0] * 2 * 3;
    }

    // make subnodes appear at the place of their parent
    d.subNodes.forEach(function (subNode) {
      subNode.x = d.x;
      subNode.y = d.y;
      subNode.isSelected = true;
    });

    // Make convex hull
    var thisHullNodes = [d].concat(d.subNodes); // first element in array is always the one opened, so we can use its ID as identifier for the convex hull
    hullsData.push(thisHullNodes);

    // check if the first point of the hull is inside another hulls
    // if so it means this hull should be part of that opened
    // add these points to that hullsData
    hullsData.forEach(function (thisHull) {
      // if the element is in the array, but is not the first
      if (thisHull.indexOf(thisHullNodes[0]) > 0) {
        thisHullNodes.forEach(function (n, i) {
          if (i !== 0) {
            thisHull.push(n);
          }
        });
      }
    });

    // calculate Graph
    var augmentedNodes = nodes.concat(d.subNodes);
    graph = ParseMatrixData.calculateNetwork(augmentedNodes);
    nodes = graph.nodes;
    links = graph.edges;
    if (doRestart === "restart the force") {
      this.update();
    }
  };

  closeSubnodes = (d, doRestart) => {
    // If it is already opened or if it has no children, just skip
    if (!d.opened || d.totalSubNodes === 0) return;

    d.opened = false;
    delete d.fx;
    delete d.fy;

    var subNodes2Remove = [];
    var hulls2Remove = [d.id];

    // recursive functions, it makes possible to close contained cluster of nodes
    function collectSubNodes(parentNode) {
      parentNode.subNodes.forEach((childNode) => {
        if (childNode.opened) {
          childNode.opened = false;
          hulls2Remove.push(childNode.id);
          collectSubNodes(childNode);
        }
      });
      subNodes2Remove.push(parentNode.subNodes);
    }

    collectSubNodes(d);

    // cycle in the subNodes2Remove array and for each list of sub-nodes to be removed remove and re-calculate the network.
    // Probably not the best way, but the simplest at the moment of the coding.
    subNodes2Remove.forEach((subNodes) => {
      let toRemove = subNodes.map((d) => d.id);
      let filtered = nodes.filter((el) => {
        return !toRemove.includes(el.id);
      });

      // remove this hull
      hullsData = hullsData.filter(function (h) {
        return !hulls2Remove.includes(h[0].id);
      });

      // remove extra points from the outer hull
      hullsData.forEach(function (thisHull, i) {
        hullsData[i] = thisHull.filter(function (n) {
          return !toRemove.includes(n.id);
        });
      });

      // calculate graph
      graph = ParseMatrixData.calculateNetwork(filtered);
      nodes = graph.nodes;
      links = graph.edges;
    });

    if (doRestart === "restart the force") {
      this.update();
    }
  };

  toggleSubnodes = (d, doRestart) => {
    // console.log("Ohhhhh, let's toggle the sub nodes of", d.label, d.id)
    if (d.opened) {
      this.unselectLabel(d);
      this.closeSubnodes(d, doRestart);
    } else if (d.subNodes && d.subNodes.length) {
      this.selectLabel(d);
      this.openSubnodes(d, doRestart);
    } else {
      console.log("No nodes to expand");
    }
  };

  // Interactions
  displayTitle = (data) => {
    if (Array.isArray(data)) {
      // show composition title
      information = information.data(data, function (d) {
        return d.id;
      });
      information.exit().remove();
      information = information
        .enter()
        .append("text")
        .classed("information", true)
        .attr("text-anchor", (d) => (x(d.year) >= width / 2 ? "end" : "start"))
        .attr("x", (d) =>
          x(d.year) >= width / 2 ? x(d.year) + 4.8 : x(d.year) - 3.2
        )
        .attr("y", height - 10)
        .text((d) =>
          x(d.year) >= width / 2 ? d.sourceTitle + " ↓" : "↓ " + d.sourceTitle
        )
        .merge(information);
    }
  };

  selectLabel = (d) => {
    label.filter((l) => l.id === d.id).classed("selected", true);
  };

  unselectLabel = (d) => {
    label.filter((l) => l.id === d.id).classed("selected", false);
    if (svg.selectAll(".selected").size() < 1) {
      svg.classed("there-is-selection", false);
    }
  };

  selectNode = (d) => {
    svg.classed("there-is-selection", true);
    node.filter((n) => n.id === d.id).classed("selected", true);
  };

  unselectNode = (d) => {
    node.filter((n) => n.id === d.id).classed("selected", false);
    console.log(svg.selectAll(".selected"));
    if (svg.selectAll(".selected").size() < 1) {
      svg.classed("there-is-selection", false);
    }
  };

  applyFilter = (filter, doReset, alsoCategories) => {
    if (doReset === "do reset") this.reset();

    svg.classed("there-is-filter", true);
    node
      .classed("filtered", false)
      .filter((n) => filter.indexOf(n.id) < 0)
      .classed("filtered", true);
  };

  selectSameComposition = (d) => {
    svg.classed("there-is-selection", true);
    node.filter((n) => n.source === d.source).classed("selected", true);
  };

  unselectSameComposition = (d) => {
    node.filter((n) => n.source === d.source).classed("selected", false);

    if (svg.selectAll(".selected").size() === 0) {
      svg.classed("there-is-selection", false);
    }
  };

  reset = (alsoCategories) => {
    svg
      .selectAll("*")
      .classed("selected", false)
      .classed("zoom-selected", false);
    node.classed("filtered", false);
    if (alsoCategories === "also categories") {
      svg
        .selectAll(".tick")
        .classed("cat-selected", false)
        .selectAll("rect")
        .attr("fill", "transparent");
    }
    svg.classed("there-is-selection", false);
    this.displayTitle([]);
  };

  //
  //
  //
  //
  // convex hull from http://bl.ocks.org/hollasch/f70f1fe7700f092b5a505e3efd1d9232
  //
  //
  //
  //

  hullPadding = collisionPadding;

  vecScale = (scale, v) => {
    // Returns the vector 'v' scaled by 'scale'.
    return [scale * v[0], scale * v[1]];
  };

  vecSum = (pv1, pv2) => {
    // Returns the sum of two vectors, or a combination of a point and a vector.
    return [pv1[0] + pv2[0], pv1[1] + pv2[1]];
  };

  unitNormal = (p0, p1) => {
    // Returns the unit normal to the line segment from p0 to p1.
    var n = [p0[1] - p1[1], p1[0] - p0[0]];
    var nLength = Math.sqrt(n[0] * n[0] + n[1] * n[1]);
    return [n[0] / nLength, n[1] / nLength];
  };

  strictHull = (polyPoints) => {
    // This method returns a polygon given the specified points. The points are assumed to be in polygon order.
    return (
      "M " +
      polyPoints[0] +
      " L " +
      d3
        .range(1, polyPoints.length)
        .map(function (i) {
          return polyPoints[i];
        })
        .join(" L") +
      " Z"
    );
  };

  roundedHull = (polyPoints, data) => {
    // Returns the SVG path data string representing the polygon, expanded and rounded.
    this.hullPadding = d3.max(data, function (d) {
      return d.opened
        ? r(1) + collisionPadding
        : r(d.totalSubNodes + 1) + collisionPadding;
    });

    // Handle special cases
    if (!polyPoints || polyPoints.length < 1) return "";
    if (polyPoints.length === 1) return this.roundedHull1(polyPoints, data);
    if (polyPoints.length === 2) return this.roundedHull2(polyPoints, data);

    var segments = new Array(polyPoints.length);

    // Calculate each offset (outwards) segment of the convex hull.
    for (var segmentIndex = 0; segmentIndex < segments.length; ++segmentIndex) {
      var p0 =
        segmentIndex === 0
          ? polyPoints[polyPoints.length - 1]
          : polyPoints[segmentIndex - 1];
      var p1 = polyPoints[segmentIndex];

      // Compute the offset vector for the line segment, with length = hullPadding.
      var offset = this.vecScale(this.hullPadding, this.unitNormal(p0, p1));

      segments[segmentIndex] = [
        this.vecSum(p0, offset),
        this.vecSum(p1, offset),
      ];
    }

    var arcData =
      "A " + [this.hullPadding, this.hullPadding, "0,0,0,"].join(",");

    segments = segments.map(function (segment, index) {
      var pathFragment = "";
      if (index === 0) {
        pathFragment = "M " + segments[segments.length - 1][1] + " ";
      }
      pathFragment += arcData + segment[0] + " L " + segment[1];

      return pathFragment;
    });

    return segments.join(" ");
  };

  roundedHull1 = (polyPoints, data) => {
    // Returns the path for a rounded hull around a single point (a circle).

    var p1 = [polyPoints[0][0], polyPoints[0][1] - this.hullPadding];
    var p2 = [polyPoints[0][0], polyPoints[0][1] + this.hullPadding];

    return (
      "M " +
      p1 +
      " A " +
      [this.hullPadding, this.hullPadding, "0,0,0", p2].join(",") +
      " A " +
      [this.hullPadding, this.hullPadding, "0,0,0", p1].join(",")
    );
  };

  roundedHull2 = (polyPoints, data) => {
    // Returns the path for a rounded hull around two points (a "capsule" shape).

    var offsetVector = this.vecScale(
      this.hullPadding,
      this.unitNormal(polyPoints[0], polyPoints[1])
    );
    var invOffsetVector = this.vecScale(-1, offsetVector);

    var p0 = this.vecSum(polyPoints[0], offsetVector);
    var p1 = this.vecSum(polyPoints[1], offsetVector);
    var p2 = this.vecSum(polyPoints[1], invOffsetVector);
    var p3 = this.vecSum(polyPoints[0], invOffsetVector);

    return (
      "M " +
      p0 +
      " L " +
      p1 +
      " A " +
      [this.hullPadding, this.hullPadding, "0,0,0", p2].join(",") +
      " L " +
      p3 +
      " A " +
      [this.hullPadding, this.hullPadding, "0,0,0", p0].join(",")
    );
  };

  ticked = () => {
    node.attr("cx", (d, i) => d.x).attr("cy", (d) => d.y);

    presumed
      .attr("cx", function (d) {
        return d.x;
      })
      .attr("cy", function (d) {
        return d.y;
      });

    label
      .attr("x", function (d) {
        return d.x;
      })
      .attr("y", function (d) {
        return d.y;
      });

    link
      .attr("x1", function (d) {
        return d.source.x;
      })
      .attr("y1", function (d) {
        return d.source.y;
      })
      .attr("x2", function (d) {
        return d.target.x;
      })
      .attr("y2", function (d) {
        return d.target.y;
      });

    hull.attr("d", (d) => {
      let thisHullPoints = d.map((d) => {
        return [d.x, d.y];
      });
      var points = thisHullPoints;
      var convexHull = points.length < 3 ? points : d3.polygonHull(points);
      return this.roundedHull(convexHull, d);
    });
  };
}

const V = new VClass();

export default V;
