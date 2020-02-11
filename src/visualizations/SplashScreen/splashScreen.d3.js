
import * as d3 from 'd3';
import * as SVGPoints from 'svg-points';

class VClass
{
  initialize = el => {

    const calogo = d3.select(el);

    const svgUrl = process.env.PUBLIC_URL + "/logo-big-polygons-01.svg";
/*
    svg
      .append("circle")
      .attr("r", 10)
      .attr("cx", 100)
      .attr("cy", 100)
      .attr("fill", "red");
*/

//d3.csv(process.env.PUBLIC_URL + "/territory_texts_data.csv").then(csv => {

    d3
      .xml(svgUrl)
      .then(xml => {
/*
          document
            .getElementById("logo-box")
            .appendChild(xml.documentElement);

          d3.select('#logo-box')
            .append('h2')
            .attr('class', 'text-center')
            .style('opacity', 0)
            .style('letter-spacing', '-0.5px')
            .html(`
              <span lang="it-IT">Letteratura e visualizzazione</span>
              <span lang="fr-FR">Littérature et visualisation</span>
              <span lang="en-UK">Literature and Visualization</span>
            `);
*/

        let
          width = 900,
          height = 900,
          rootNode,
          nodes = [],
          node = calogo.selectAll(".node"),
          scaleFactor = 1,
          lettersPolygons = [],
          margin = {};

        let config = [{
          collisionMargin: .25,
          amountNodes: 4000,
          radius: 6,
          rootPosition: [201.0764923095703 + 3 + 0.002, 88.30018615722656 + 3 - 0.002],
          margin: {
            top: 0,
            bottom: scaleFactor * height,
            left: 0,
            right: scaleFactor * width
          }
        }];

        let configuration = config[0];

        // A class for converting the poligons into an object suitable for the library svg-points.js
        class polygonModel {
          constructor(type, attr, element) {
            this['type'] = type;
            this[attr] = d3.select(element).attr(attr);
          }
        }

        // Convert all polygons in array of coordinates, thanks to svg-points.js
        calogo
          .selectAll('polygon')
          .each(function() {
            let thisPolygon = new polygonModel('polygon', 'points', this);
            let thisPolygonPointsObjects = SVGPoints.toPoints(thisPolygon);
            let thisPolygonPointsArray = [];
            thisPolygonPointsObjects.forEach(function(d) {
              thisPolygonPointsArray.push([d.x, d.y]);
            });
            lettersPolygons.push(thisPolygonPointsArray);
          });

        // This function checks whether the circle is or not whitin any of the letters polygon
        function checkIfInside(coordinates)
        {
          let flag = 0;
          lettersPolygons.forEach(function(d) {
            if (d3.polygonContains(d, coordinates)) {
                flag++;
            }
          })
          // if the flag is grater than one, the point is inside a letter eye
          return flag == 1;
        }

        // A function for randomly adding circles to the nodes array
        function addNodes(n) {
          const fibonacci = [1, 2, 3, 3, 5, 8, 13, 21, 34, 55];

          for(let i = 0; i < n; i++)
          {
            let myX = d3.randomUniform(configuration.margin.left, configuration.margin.right)();
            let myY = d3.randomUniform(configuration.margin.top, configuration.margin.bottom)();
            let myRadius = Math.round(fibonacci[Math.round(d3.randomUniform(1, 4)())]) / 3.1;

            nodes.push({ 'id': i, 'r': myRadius, 'x': myX, 'y': myY });
          }

          if(configuration.radiusRootNode && !rootNode)
          {
            rootNode = nodes[0];
            rootNode.fx = configuration.rootPosition[0];
            rootNode.fy = configuration.rootPosition[1];
            rootNode.r = configuration.radiusRootNode;
          }
        }

        let collideForce = d3.forceCollide(function(d) { return d.r + configuration.collisionMargin });

        function ticked()
        {
          node
            .attr("cx", function(d) { return d.x = Math.max(configuration.margin.left + d.r, Math.min(configuration.margin.right - d.r, d.x)); })
            .attr("cy", function(d) { return d.y = Math.max(configuration.margin.top + d.r, Math.min(configuration.margin.bottom - d.r, d.y)); })
            .classed('is-inside', function(d) { return checkIfInside([d.x, d.y]) })
        }

        //Declare simulation
        let simulation = d3
          .forceSimulation(nodes)
          .force("x", null)
          .force("y", null)
          .force("collide", d3.forceCollide(function(d) { return d.r + configuration.collisionMargin }))
          .alpha(1)
          .alphaMin(.5)
          .alphaDecay(0.01)
          .on("tick", ticked);

        // Update function
        function update()
        {
          function drawGraph()
          {
console.log("drawGraph");
            // Apply the general update pattern to the nodes.
            node = node.data(nodes, function(d) { return d.id; });

            node
              .exit()
              .remove();

            node = node
              .enter()
              .append("circle")
              .classed('node', true)
              .classed('is-inside', function(d) { return checkIfInside([d.x, d.y]) })
              .classed('root-node', function(d) { if (d.id == 0) { return true } else { return false } })
              .style("fill", "white")
              .style("stroke", "black")
              .style("stroke-width", 0.4)
              .attr('cx', function(d) { return d.x; })
              .attr('cy', function(d) { return d.y; })
              .attr("r", 0)
              .merge(node);

            node
              .transition()
              .delay(function(d, i) { return i+50; })
              .duration(1500)
              .ease(d3.easeElasticOut)
              .attr('r', function(d) { return d.r; });

            d3
              .select('#logo-box h2')
              .transition()
              .delay(500)
              .duration(1500)
              .style('opacity', 1)
              .style('letter-spacing', '.5px')
          }

          drawGraph();

          // Update and restart the simulation.
          simulation
            .nodes(nodes)
            .alpha(1)
            .restart();
        }

        // Anticollision on mouse move
        calogo.on("mousemove", function() {
          let p1 = d3.mouse(this);
          if(rootNode) {
            rootNode.fx = p1[0];
            rootNode.fy = p1[1];
            simulation
              .alpha(1)
              .restart(); //reheat the simulation
          }
        });

        // Anticolllision on touch
        calogo.on("touchmove", function() {
          let p1 = d3.touches(this)[0];
          d3.event.preventDefault();
          if(rootNode) {
            rootNode.fx = p1[0];
            rootNode.fy = p1[1];
            simulation
              .alpha(1)
              .restart(); //reheat the simulation
          }
        });

        calogo.on("mouseleave", function() {
          d3
            .select('.root-node')
            .transition()
            .duration(0)
            .on("end", function() {
              rootNode.fx = configuration.rootPosition[0];
              rootNode.fy = configuration.rootPosition[1];
            });
        });

        calogo.on("touchend", function() {
          d3
            .select('.root-node')
            .transition()
            .duration(0)
            .on("end", function() {
              rootNode.fx = configuration.rootPosition[0];
              rootNode.fy = configuration.rootPosition[1];
            });
        });
console.log("loading bubbles.json...");
        d3.json(process.env.PUBLIC_URL + '/bubbles.json').then(data => {
console.log("inside function");
          nodes = data;

          let maxRadius = d3.max(nodes, function(d) { return d.r });

          rootNode = nodes.filter(function(d) {
              return d.r == maxRadius;
          })[0];

          simulation
            .nodes(nodes)
            .force("x", d3.forceX(function(d) { return d.x }))
            .force("y", d3.forceY(function(d) { return d.y }))
console.log("calling update...");
          update();
        });

      });
  };

  destroy = () => {};
}

const V = new VClass();

export default V;
