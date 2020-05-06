import React, { Component } from 'react';
import * as d3 from 'd3';

const   simulation = d3.forceSimulation([]),
        p = d3.scaleLinear().range([-400, 400]).domain([-1,1]);

class Df3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            positioning: 'just the default one'
        }
    }
  _setRef(componentNode) {
    this._rootNode = componentNode;
  }
  async componentDidMount() {
    const _data = await (await d3.csv(process.env.PUBLIC_URL + '/Dataset flags - mds.csv')).filter(d=>{return d.id!=='V000a'&&d.id!=='V000b'});
    const _occurrences = await (await d3.csv(process.env.PUBLIC_URL + '/Dataset flags - mds.csv'))//.filter(d=>d.id==='V021');

    let width = this._rootNode.getBoundingClientRect().width,
        height = this._rootNode.getBoundingClientRect().height,
        margin= {},
        // size = d3.scaleLinear().range([0,10]).domain([0,1]),
        length = d3.scaleLinear().range([0,30]).domain([0,d3.max(_data,d=>+d.length)]),
        lengthClumped = (l)=>d3.max([2,length(Number(l))]),
        // side = (d)=>lengthClumped(d)/3*Number(d),
        // r_x = (d,i)=>i%3*lengthClumped(d)/3 + side(1)/2 - side(d)/2,
        // r_y = (d,i)=> Math.floor(i/3)*lengthClumped(d)/3 + side(1)/2 - side(d)/2, 
        master_g, g, node;

    simulation
        .force('x',d3.forceX(d=>p(+d.V1)))
        .force('y',d3.forceY(d=>p(-d.V2)))
        // .force('collision',d3.forceCollide( d=>d3.max([2,length(+d.length)])+1 ))
        .force('collision-rect', rectCollide().size(function (d) { return [lengthClumped(d.length)+4, lengthClumped(d.length)+4] }))
        .on('tick',()=>{node.attr('transform',d=>`translate(${d.x}, ${d.y})`)})
        // .on('end',()=>console.log(JSON.stringify(_data.map(d=>{return{'id':d.id,'x':d.x,'y':d.y,'r':lengthClumped(d.length)}})),null,2))
        .stop();

    const svg = d3.select(this._rootNode).select('svg');


    svg.attr('width',width).attr('height',height);
    master_g = svg.append('g');
    g = master_g.append('g').attr('transform',`translate(${width/2},${height/2})`);

    node = g.selectAll('.node').data(_data)
        .enter().append('g')
            .attr('data-id',d=>d.id)
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)
            );

    function dragstarted(d) {
        if (!d3.event.active) simulation.alpha(1).restart();
        d.fx = d.x;
        d.fy = d.y;
        }
        
    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }
    
    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
    
    // node.append('circle')
    //     .attr('fill','none')
    //     .attr('stroke','grey')
    //     .attr('r',d=>lengthClumped(d.length));

    node.append('rect')
        .attr('fill','black')
        .style('opacity',.5)
        // .attr('x',d=>-lengthClumped(d.length)/2)
        // .attr('y',d=>-lengthClumped(d.length)/2)
        .attr('width',d=>lengthClumped(d.length))
        .attr('height',d=>lengthClumped(d.length))

    // node.append('g').selectAll('rect').data(d=>{
    //   let arr = [
    //     "come-dubbio", "come-negazione", "come-riformulazione",
    //     "cosa-dubbio", "cosa-negazione", "cosa-riformulazione",
    //     "senso-dubbio", "senso-negazione", "senso-riformulazione"
    //   ].map(p=>+d[p]);
    //   return arr;
    // }).enter().append('rect')
    //   .attr('width',d=>side(d))
    //   .attr('height',d=>side(d))
    //   .attr('x',(d,i)=>r_x(d,i))
    //   .attr('y',(d,i)=>r_y(d,i))
    //   .attr('transform',`translate(${-length.range()[1]},${-length.range()[1]})`)
      
    const font_size = 5;
    node.append('text')
        .classed('label-title',true)
        .attr('text-anchor','middle')
        .attr('font-size',font_size)
        .attr('x',d=>0.5*lengthClumped(d.length))
        // .style('opacity',0.25)
        .text(d=>d.title)

    simulation.nodes(_data).alpha(1).restart();    
    let zoom = d3.zoom().on("zoom", ()=>{
      master_g.attr("transform", d3.event.transform);
      node.attr('stroke-width',1/d3.event.transform.k).selectAll('.label-title').attr('font-size',font_size/d3.event.transform.k)
    });
    svg.call(zoom)
  }
  componentDidUpdate(prevProps,prevState) {
      if (prevState.positioning !== this.state.positioning) {
          console.log('reposition according to', this.state.positioning)
          if (this.state.positioning === 'mds_one') {
            simulation.force('x').x(d=>p(+d.V1))
            simulation.force('y').y(d=>p(-d.V2))
            simulation.alpha(1).restart();
          } else if (this.state.positioning === 'random') {
            simulation.force('x').x((d,i)=>i)
            simulation.force('y').y((d,i)=>i)
            simulation.alpha(1).restart();
          }
      }
  }
  render() {
    return <div style={{width:'100vw',height:'100vh'}} ref={this._setRef.bind(this)}>
        <select id="mds-positioning" onChange={(event)=>this.setState({'positioning':event.target.value})}>
            <option value="mds_one">Posizionamento uno</option>
            <option value="random">Posizionamento random</option>
        </select>
        <svg />
    </div>;
  }
}

export default Df3;

function rectCollide() {
  var nodes, sizes, masses
  var size = constant([0, 0])
  var strength = 1
  var iterations = 1

  function force() {
      var node, size, mass, xi, yi
      var i = -1
      while (++i < iterations) { iterate() }

      function iterate() {
          var j = -1
          var tree = d3.quadtree(nodes, xCenter, yCenter).visitAfter(prepare)

          while (++j < nodes.length) {
              node = nodes[j]
              size = sizes[j]
              mass = masses[j]
              xi = xCenter(node)
              yi = yCenter(node)

              tree.visit(apply)
          }
      }

      function apply(quad, x0, y0, x1, y1) {
          var data = quad.data
          var xSize = (size[0] + quad.size[0]) / 2
          var ySize = (size[1] + quad.size[1]) / 2
          if (data) {
              if (data.index <= node.index) { return }

              var x = xi - xCenter(data)
              var y = yi - yCenter(data)
              var xd = Math.abs(x) - xSize
              var yd = Math.abs(y) - ySize

              if (xd < 0 && yd < 0) {
                  var l = Math.sqrt(x * x + y * y)
                  var m = masses[data.index] / (mass + masses[data.index])

                  if (Math.abs(xd) < Math.abs(yd)) {
                      node.vx -= (x *= xd / l * strength) * m
                      data.vx += x * (1 - m)
                  } else {
                      node.vy -= (y *= yd / l * strength) * m
                      data.vy += y * (1 - m)
                  }
              }
          }

          return x0 > xi + xSize || y0 > yi + ySize ||
                 x1 < xi - xSize || y1 < yi - ySize
      }

      function prepare(quad) {
          if (quad.data) {
              quad.size = sizes[quad.data.index]
          } else {
              quad.size = [0, 0]
              var i = -1
              while (++i < 4) {
                  if (quad[i] && quad[i].size) {
                      quad.size[0] = Math.max(quad.size[0], quad[i].size[0])
                      quad.size[1] = Math.max(quad.size[1], quad[i].size[1])
                  }
              }
          }
      }
  }

  function xCenter(d) { return d.x + d.vx + sizes[d.index][0] / 2 }
  function yCenter(d) { return d.y + d.vy + sizes[d.index][1] / 2 }

  force.initialize = function (_) {
      sizes = (nodes = _).map(size)
      masses = sizes.map(function (d) { return d[0] * d[1] })
  }

  force.size = function (_) {
      return (arguments.length
           ? (size = typeof _ === 'function' ? _ : constant(_), force)
           : size)
  }

  force.strength = function (_) {
      return (arguments.length ? (strength = +_, force) : strength)
  }

  force.iterations = function (_) {
      return (arguments.length ? (iterations = +_, force) : iterations)
  }

  return force
}

function constant(_) {
  return function () { return _ }
}