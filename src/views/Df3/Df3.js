import React, { Component } from 'react';
import * as d3 from 'd3';

import './Df3.css'

const   simulation = d3.forceSimulation([]),
        p = d3.scaleLinear().range([-3000, 3000]).domain([-1,1]),
        matrix_grid = {
            x: d3.scaleBand().range([0,1]).domain(['negazione','dubbio','riformulazione']),
            y: d3.scaleBand().range([0,1]).domain(['cosa','come','senso'])
        },
        matrix_color = d3.scaleLinear().range(['#000','#f00']).domain([0,75]).clamp(true),
        col_macrocategorie = d3.scaleOrdinal().range(['#FF3366', '#FFD93B', '#10BED2']).domain(['cosa','come','senso']);

let     trail;

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
    
    let _data = await (await d3.csv(process.env.PUBLIC_URL + '/✅ Dataset Fase 3 - flagged - mds.csv'))

    let width = this._rootNode.getBoundingClientRect().width,
        height = this._rootNode.getBoundingClientRect().height,
        margin= {},
        radius = d3.scalePow().exponent(0.5).range([0,25]).domain([0,d3.max(_data,d=>+d.length)]),
        radiusClumped = (l)=>d3.max([,radius(Number(l))]),
        // percentage = d3.scaleLinear().range([0.05,1]).domain([0.1,51]),
        master_g, g, node;

    // radiusClumped = radius;

    _data = _data.filter(d=>{return d.id!=='V000a'&&d.id!=='V000b'}).map(d=>{
        d.color_macrocategorie=color_macrocategorie(d);
        d.color_manifestazioni_stilistiche=color_manifestazioni_stilistiche(d);

        d.combinations  =   [   "come-dubbio", "come-negazione", "come-riformulazione",
                                "cosa-dubbio", "cosa-negazione", "cosa-riformulazione",
                                "senso-dubbio", "senso-negazione", "senso-riformulazione"
                            ].map(p=>{

                                let obj={};
                                obj['id']=d['ID opera'];
                                obj.type=p;

                                obj.size=radiusClumped(Number(d['cont_car_'+p]));

                                obj.mx  = matrix_grid.x(p.split('-')[1]) * radiusClumped(d.length)
                                        + radiusClumped(d.length)/6
                                        - obj.size/2;

                                obj.my  = matrix_grid.y(p.split('-')[0]) * radiusClumped(d.length) 
                                        + radiusClumped(d.length)/6
                                        - obj.size/2;

                                return obj;
                            });

        return d;
    });

    simulation
        .force('x',d3.forceX(d=>p(+d.prop_occ_perc_x)))
        .force('y',d3.forceY(d=>p(-d.prop_occ_perc_y)))
        .force('collision',d3.forceCollide( d=>radiusClumped(d.length) ))
        // .force('collision-rect', rectCollide().size(function (d) { return [lengthClumped(d.length)+4, lengthClumped(d.length)+4] }))
        .alphaMin(0.1)
        .on('tick',()=>{
            node.attr('transform',d=>`translate(${d.x}, ${d.y})`)
                .filter(d=>d.selected===true)
                .each(d=>d.trail.push([d.x,d.y]));
            
            const dataTrails = _data.filter(d=>d.trail).map(d=>{return{id:d['ID opera'],trail:d.trail}})

            trail = trail.data(dataTrails, d=>d.id);
            trail.exit().remove();
            trail = trail.enter().append('path')
                        .attr('fill','none')
                        .attr('stroke','#aaa')
                        .classed('trail',true)
                        .merge(trail)
                        .attr('d',d=>d3.line()(d.trail));
        })
        // .on('end',()=>{
        //     console.log(_data)
        //     console.log(JSON.stringify(_data.map(d=>{return{'id':d['ID opera'],'x':d.x,'y':d.y,'r':lengthClumped(d.length)}})),null,2)
        // })
        .stop();
    
    const svg = d3.select(this._rootNode).select('svg');

    svg.attr('width',width).attr('height',height);
    const defs = svg.append('defs')
        .html(`
            <filter id="blur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="matrix" operator="atop"/>
            </filter>

            <filter id="gooey-effect-cluster">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1" color-interpolation-filters="sRGB" result="blur"/>
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 19 -9" result="gooey"/>
            </filter>
        `);
    master_g = svg.append('g');
    g = master_g.append('g').attr('transform',`translate(${width/2},${height/2})`);
    trail = g.append('g').classed('trails-group',true).selectAll('.trail');
    
    node = g.selectAll('.node').data(_data)
        .enter().append('g')
            .classed('node',true)
            .attr('data-id',d=>d.id)
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)
            )
            .on('mouseenter',function(){
                const selectedNodes = node.filter(function(){return d3.select(this).classed('selected')});
                if (selectedNodes.size()>0){
                    d3.select(this).style('opacity', 1 );
                }
            })
            .on('mouseleave',function(){
                const selectedNodes = node.filter(function(){return d3.select(this).classed('selected')});
                if (selectedNodes.size()>0){
                    d3.select(this).style('opacity', d3.select(this).classed('selected')?1:0.3 );
                }  
            })
            .on('click',function(d){
                d3.select(this).classed('selected', !d3.select(this).classed('selected'));
                if (d3.select(this).classed('selected')) {
                    d.selected=true;
                    d.trail=[];
                } else {
                    d.selected=false;
                    delete d.trail;
                }
                const selectedNodes = node.filter(function(){return d3.select(this).classed('selected')});
                if (selectedNodes.size()>0){
                    selectedNodes.style('opacity',1);
                    node.filter(function(){return !d3.select(this).classed('selected')}).style('opacity',0.3);
                } else {
                    node.style('opacity',1);
                }
            });

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

    node.append('circle')
        .attr('r',d=>radiusClumped(d.length))
        .attr('fill','white')
        .attr('stroke-width',0.5)
        .attr('stroke-dasharray','1 2')
        .attr('stroke','#666');

    // node.append('rect')
    //     .attr('fill','#000')
    //     // .attr('stroke', '#aaa')
    //     .attr('opacity',d=>percentage(d.percentuale_dubbio))
    //     .attr('width',d=>lengthClumped(d.length))
    //     .attr('height',d=>lengthClumped(d.length))

    // node.append('g').selectAll('rect').data(d=>{
    //   let arr = [
    //     "come-dubbio", "come-negazione", "come-riformulazione",
    //     "cosa-dubbio", "cosa-negazione", "cosa-riformulazione",
    //     "senso-dubbio", "senso-negazione", "senso-riformulazione"
    //   ].map(p=>{
    //       let obj={};
    //       obj['id']=d['ID opera'];
    //       obj.type=p;
    //       obj.valueColor=Number(d['cont_occ_'+p]);
    //       obj.size=Number(d['prop_occ_'+p])*lengthClumped(d.length)/3;

    //       obj.x =   matrix_grid.x(p.split('-')[1]) * lengthClumped(d.length)
    //                 + lengthClumped(d.length)/6
    //                 - obj.size/2;
    //       obj.y =   matrix_grid.y(p.split('-')[0]) * lengthClumped(d.length) 
    //                 + lengthClumped(d.length)/6
    //                 - obj.size/2;

    //       return obj;
    //     });
    //   return arr;
    // }).enter().append('rect')
    //   .attr('width',d=>d.size)
    //   .attr('height',d=>d.size)
    //   .attr('x',d=>d.x)
    //   .attr('y',d=>d.y)
    //   .attr('fill',d=>matrix_color(d.valueColor));

    node.each(function(d){
        //console.log(d)
        const combination = d3.select(this).append('g')
            .attr('filter','url(#gooey-effect-cluster)')
            .selectAll('.combination')
            .data(d=>d.combinations)
            .enter()
            .append('circle')
            .attr('r',d=>d.size)
            .attr('fill',d=>color_macrocategorie(d));
        
        const this_simulation = d3.forceSimulation(combination.data())
            .force('x',d3.forceX(0))
            .force('y',d3.forceY(0))
            .force('collision', d3.forceCollide(d=>d.size))
            .on('tick', ()=>{
                combination.attr('cx',d=>d.x).attr('cy',d=>d.y);
            })
            .alpha(1)
            .alphaMin(0.1)
            .restart();

    }) // node each
      
    const font_size = 8;
    node.append('text')
        .classed('label-title',true)
        .attr('text-anchor','start')
        .attr('font-size',font_size)
        // .attr('x',d=>0.5*lengthClumped(d.length))
        // .attr('y', d=>-lengthClumped(d.length)/2 -1)
        .text(d=>d.title.slice(0,10));
    node.append('text')
        .classed('label-title-complete',true)
        .attr('text-anchor','start')
        .attr('font-size',font_size*1.5)
        // .attr('x',d=>0.5*lengthClumped(d.length))
        // .attr('y', d=>-lengthClumped(d.length)/2 -1)
        .text(d=>d.title + '-' +d.year)

    simulation.nodes(_data).alpha(1).restart();

    let zoom = d3.zoom().on("zoom", ()=>{
      master_g.attr("transform", d3.event.transform);
      node.attr('stroke-width',1/d3.event.transform.k).selectAll('.label-title').attr('font-size',font_size/d3.event.transform.k)
      node.selectAll('.label-title-complete').attr('font-size',(font_size*1.5)/d3.event.transform.k)
    });

    svg.call(zoom)
  }
  componentDidUpdate(prevProps,prevState) {
      if (prevState.positioning !== this.state.positioning) {
          console.log('reposition according to', this.state.positioning)
          if (this.state.positioning === 'prop_occ') {
            simulation.force('x',d3.forceX(d=>p(+d.prop_occ_x)))
            simulation.force('y',d3.forceY(d=>p(-d.prop_occ_y)))
            simulation.alpha(1).restart();
          } else if (this.state.positioning === 'cont_occ') {
            simulation.force('x',d3.forceX(d=>p(+d.cont_occ_x)))
            simulation.force('y',d3.forceY(d=>p(-d.cont_occ_y)))
            simulation.alpha(1).restart();
          } else if (this.state.positioning === 'cont_e_prop_occ') {
            simulation.force('x',d3.forceX(d=>p(+d.cont_e_prop_occ_x)))
            simulation.force('y',d3.forceY(d=>p(-d.cont_e_prop_occ_y)))
            simulation.alpha(1).restart();
          }

          else if (this.state.positioning === 'prop_car') {
            simulation.force('x',d3.forceX(d=>p(+d.prop_car_x)))
            simulation.force('y',d3.forceY(d=>p(-d.prop_car_y)))
            simulation.alpha(1).restart();
          } else if (this.state.positioning === 'cont_car') {
            simulation.force('x',d3.forceX(d=>p(+d.cont_car_x)))
            simulation.force('y',d3.forceY(d=>p(-d.cont_car_y)))
            simulation.alpha(1).restart();
          } else if (this.state.positioning === 'cont_e_prop_car') {
            simulation.force('x',d3.forceX(d=>p(+d.cont_e_prop_car_x)))
            simulation.force('y',d3.forceY(d=>p(-d.cont_e_prop_car_y)))
            simulation.alpha(1).restart();
          }

          else if (this.state.positioning === 'prop_occ_perc') {
            simulation.force('x',d3.forceX(d=>p(+d.prop_occ_perc_x)))
            simulation.force('y',d3.forceY(d=>p(-d.prop_occ_perc_y)))
            simulation.alpha(1).restart();
          } else if (this.state.positioning === 'prop_car_perc') {
            simulation.force('x',d3.forceX(d=>p(+d.prop_car_perc_x)))
            simulation.force('y',d3.forceY(d=>p(-d.prop_car_perc_y)))
            simulation.alpha(1).restart();
          } else if (this.state.positioning === 'prop_occ_car_perc') {
            simulation.force('x',d3.forceX(d=>p(+d.prop_occ_car_perc_x)))
            simulation.force('y',d3.forceY(d=>p(-d.prop_occ_car_perc_y)))
            simulation.alpha(1).restart();
          }
      }
  }
  render() {
    return <div style={{width:'100vw',height:'100vh'}} ref={this._setRef.bind(this)}>
        <svg />
        <p style={{position:'absolute',top:0,left:0, fontSize:12}}>
            <select defaultValue={'prop_occ_perc'} id="mds-positioning" onChange={(event)=>this.setState({'positioning':event.target.value})}>
                <option value="prop_occ">MDS 003 - Proporzione fra tipi di occorrenze</option>
                <option value="cont_occ">MDS 003 - Conteggio tipi di occorrenze</option>
                <option value="cont_e_prop_occ">MDS 003 - Proporzione e conteggio tipi di occorrenze</option>

                <option value="prop_car">MDS 003 - Proporzione fra occorrenze in caratteri</option>
                <option value="cont_car">MDS 003 - Conteggio occorrenze in caratteri</option>
                <option value="cont_e_prop_car">MDS 003 - Proporzione e conteggio occorrenze in caratteri</option>

                <option value="prop_occ_perc">MDS 004 - Proporzione fra tipi di occorrenze + percentuale dubbio</option>
                <option value="prop_car_perc">MDS 004 - Proporzione fra tipi occorrenze in caratteri + percentuale dubbio</option>
                <option value="prop_occ_car_perc">MDS 004 - Proporzione occorrenze + proporzione in caratteri + percentuale dubbio</option>
            </select>
            Dimensione quadratini = percentuale tipo di occorrenza (0% 👉 100%), colore = conteggio tipo di occorrenza (nero = 0 👉 rosso >= 75).
        </p>  
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

function color_macrocategorie(d) {
    let col_r = 0;
    let col_g = 0;
    let col_b = 0;

    const tot_cosa = 1*(Number(d['prop_occ_cosa-dubbio']) + Number(d['prop_occ_cosa-negazione']) + Number(d['prop_occ_cosa-riformulazione']));
    const tot_come = 1*(Number(d['prop_occ_come-dubbio']) + Number(d['prop_occ_come-negazione']) + Number(d['prop_occ_come-riformulazione']));
    const tot_senso = 1*(Number(d['prop_occ_senso-dubbio']) + Number(d['prop_occ_senso-negazione']) + Number(d['prop_occ_senso-riformulazione']));

    col_r   =   tot_cosa * d3.color(col_macrocategorie('cosa')).r
            +   tot_come * d3.color(col_macrocategorie('come')).r
            +   tot_senso * d3.color(col_macrocategorie('senso')).r;

    col_g   =   tot_cosa * d3.color(col_macrocategorie('cosa')).g
            +   tot_come * d3.color(col_macrocategorie('come')).g
            +   tot_senso * d3.color(col_macrocategorie('senso')).g;

    col_b   =   tot_cosa * d3.color(col_macrocategorie('cosa')).b
            +   tot_come * d3.color(col_macrocategorie('come')).b
            +   tot_senso * d3.color(col_macrocategorie('senso')).b;

    // d.color_macrocategorie = d3.rgb(col_r, col_g, col_b);

    return color_macrocategorie;
}

function color_manifestazioni_stilistiche(d) {
    let col_r = 0;
    let col_g = 0;
    let col_b = 0;

    // dubbio
    // negazione
    // riformulazione

    const tot_dubbio = 1*(Number(d['prop_occ_cosa-dubbio']) + Number(d['prop_occ_come-dubbio']) + Number(d['prop_occ_senso-dubbio']));
    const tot_negazione = 1*(Number(d['prop_occ_cosa-negazione']) + Number(d['prop_occ_come-negazione']) + Number(d['prop_occ_senso-negazione']));
    const tot_riformulazione = 1*(Number(d['prop_occ_cosa-riformulazione']) + Number(d['prop_occ_come-riformulazione']) + Number(d['prop_occ_senso-riformulazione']));

    col_r   =   tot_dubbio * d3.color('#8AE297').r
            +   tot_negazione * d3.color('#FFA500').r
            +   tot_riformulazione * d3.color('#BBBBFF').r;
    
    col_g   =   tot_dubbio * d3.color('#8AE297').g
            +   tot_negazione * d3.color('#FFA500').g
            +   tot_riformulazione * d3.color('#BBBBFF').g;

    col_b   =   tot_dubbio * d3.color('#8AE297').b
            +   tot_negazione * d3.color('#FFA500').b
            +   tot_riformulazione * d3.color('#BBBBFF').b;

    d.color_manifestazioni_stilistiche = d3.rgb(col_r, col_g, col_b);

    return d.color_manifestazioni_stilistiche   
}