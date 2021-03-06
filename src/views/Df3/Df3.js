import React, { Component } from 'react';
import * as d3 from 'd3';

import './Df3.css'

const   simulation = d3.forceSimulation([]),
        p = d3.scaleLinear().range([-3500, 3500]).domain([-1,1]),
        matrix_grid = {
            x: d3.scalePoint().range([-2/5,2/5]).domain(['negazione','dubbio','riformulazione']),
            y: d3.scalePoint().range([-2/5,2/5]).domain(['cosa','come','senso'])
        },
        matrix_color = d3.scaleLinear().range(['#000','#f00']).domain([0,75]).clamp(true),
        filter_color = d3.scaleLinear().range(['#fff','#5151FC']).domain([0,1]),
        labels_tspan_opacity = d3.scaleLinear().range(['1','0']).domain([5,10]).clamp(true),
        col_macrocategorie = d3.scaleOrdinal()
            .range(['#FF3366', '#FFD93B', '#10BED2'])
            .range(['#FFD93B', '#10BED2', '#FF3366'])
            // .range(['#FF3366', '#ffa500', '#5151fc'])
            // .range(['#ffa500', '#FF3366', '#5151fc'])
            .domain(['cosa','come','senso']);

let     trail, node;

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
    
    let _data = await (await d3.csv(process.env.PUBLIC_URL + '/Dataset Fase 3 - flagged - mds.csv'))

    let width = this._rootNode.getBoundingClientRect().width,
        height = this._rootNode.getBoundingClientRect().height,
        margin= {},
        radius = d3.scalePow().exponent(0.5).range([0,40]).domain([0,d3.max(_data,d=>+d.length)]),
        master_g, g;

    _data = _data
        // .slice(50,75)
        .filter(d=>{return d.id!=='V000a'&&d.id!=='V000b'})
        // .filter(d=>{return d.length<15000})
        .map(d=>{
            d.originalLength = JSON.parse(JSON.stringify(d.length));

            d.x = p(+d.prop_occ_perc_x);
            d.y = p(-d.prop_occ_perc_y);

            d.length = d3.max([Number(d.length), 30000])
            d.color_macrocategorie=color_macrocategorie(d);
            d.color_manifestazioni_stilistiche=color_manifestazioni_stilistiche(d);
            d.percentage_combinations=0;
            d.combinations  =   [   "come-dubbio", "come-negazione", "come-riformulazione",
                                    "cosa-dubbio", "cosa-negazione", "cosa-riformulazione",
                                    "senso-dubbio", "senso-negazione", "senso-riformulazione"
                                ].map(p=>{
                                    let obj={};
                                    obj['id']=d['ID opera'];
                                    obj.type=p;
                                    obj.percentage_combination = Number(d['cont_car_'+p])/d.originalLength;
                                    obj.proportion_combination = Number(d['prop_occ_'+p]);
                                    obj.size=radius(obj.percentage_combination*d.length);
                                    obj.mrx = matrix_grid.x(p.split('-')[1]) * radius(d.length)
                                            + radius(d.length)/6
                                            - obj.size/2;
                                    obj.mry = matrix_grid.y(p.split('-')[0]) * radius(d.length) 
                                            + radius(d.length)/6
                                            - obj.size/2;
                                    
                                    obj.mx = obj.x = matrix_grid.x(p.split('-')[1]) * radius(d.length);
                                    obj.my = obj.y = matrix_grid.y(p.split('-')[0]) * radius(d.length);

                                    d.percentage_combinations+=obj.percentage_combination;
                                    return obj;
                                });
            return d;
        })

    simulation
        .force('x',d3.forceX(d=>p(+d._4c_x)))
        .force('y',d3.forceY(d=>p(-d._4c_y)))
        .force('collision',d3.forceCollide( d=>radius(d.length)*0.80 ))
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
            // .call(d3.drag()
            //     .on("start", dragstarted)
            //     .on("drag", dragged)
            //     .on("end", dragended)
            // )
            .on('mouseenter',function(){
                const selectedNodes = node.filter(function(){return d3.select(this).classed('selected')});
                if (selectedNodes.size()>0){
                    d3.select(this).style('opacity', 1);
                }
                d3.select(this).selectAll('.combination')
                    .transition()
                        .duration(350)
                        .attr('fill',d=>col_macrocategorie(d.type.split('-')[0]));

                d3.select(this).selectAll('tspan')
                    .style('opacity',1)
                    .attr('display','block');
            })
            .on('mouseleave',function(d){
                const selectedNodes = node.filter(function(){return d3.select(this).classed('selected')});
                if (selectedNodes.size()>0){
                    d3.select(this).style('opacity', d3.select(this).classed('selected')?1:0.3 );
                } else {
                   d3.select(this).selectAll('.combination')
                    .transition()
                        .duration(350)
                        .attr('fill',d.color_macrocategorie); 
                }
                d3.select(this).selectAll('tspan')
                    .style('opacity',(d,i)=>labels_tspan_opacity(i))
                    .attr('display',(d,i)=>i<labels_tspan_opacity.domain()[1]?'block':'none');
            })
            .on('click',function(d){
                d3.select(this).classed('selected', !d3.select(this).classed('selected'));
                if (d3.select(this).classed('selected')) {
                    d.selected=true;
                    d.trail=[];
                    d3.select(this).select('.metaball-g')
                        .attr('filter','');
                    d3.select(this).selectAll('.combination')
                        .transition()
                            .duration(350)
                            .attr('cx',d=>d.mx)
                            .attr('cy',d=>d.my);
                } else {
                    d.selected=false;
                    delete d.trail;
                    d3.select(this).select('.metaball-g')
                        .attr('filter', d.combinations.filter(c=>c.size>0).length>1?'url(#gooey-effect-cluster)':'');
                    d3.select(this).selectAll('.combination')
                        .transition()
                            .duration(350)
                            .attr('cx',d=>d.x)
                            .attr('cy',d=>d.y);
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
        .attr('class','circle-length')
        .attr('r',d=>radius(d.length))
        .attr('stroke-width',0.5)
        .attr('stroke-dasharray','1 2')
        .attr('stroke','#aaa')
        .style('fill','transparent')
        .style('mix-blend-mode','multiply')
        .style('pointer-events','none')
        .attr('display',d=>d.percentage_combinations>0.025?'block':'none');

    node.each(function(d){
        if (d.percentage_combinations<=0.025) return;
        const node_data = d;
        const combination = d3.select(this).append('g').classed('metaball-g',true)
            .attr('filter',node_data.combinations.filter(c=>c.size>0).length>1?'url(#gooey-effect-cluster)':'')
            .selectAll('.combination')
            .data(node_data.combinations)
            .enter()
            .append('circle')
            .classed('combination',true)
            .attr('r',d=>d.size)
            .attr('fill',node_data.color_macrocategorie)
            // .attr('fill',d=>col_macrocategorie(d.type.split('-')[0]));
        
        d3.forceSimulation(combination.data())
            .force('x',d3.forceX(0))
            .force('y',d3.forceY(0))
            .force('collision', d3.forceCollide(d=>d.size))
            .on('tick', ()=>combination.attr('cx',d=>d.x).attr('cy',d=>d.y))
            .alpha(1)
            .alphaMin(0.1)
            .restart();

    }) // node each
      
    const font_size = 10;
    node.append('text')
        .classed('label-title',true)
        .attr('text-anchor','start')
        .attr('font-size',font_size)
        .selectAll('tspan')
            .data(d=>d.title.split(''))
            .enter()
            .append('tspan')
                .style('opacity',(d,i)=>labels_tspan_opacity(i))
                .attr('display',(d,i)=>i<labels_tspan_opacity.domain()[1]?'block':'none')
                .text(d=>d);

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

          else if (this.state.positioning === 'def_mds') {
            simulation.force('x',d3.forceX(d=>p(+d.def_mds_x)))
            simulation.force('y',d3.forceY(d=>p(-d.def_mds_y)))
            simulation.alpha(1).restart();
          } else if (this.state.positioning === 'def_mds_all') {
            simulation.force('x',d3.forceX(d=>p(+d.def_mds_all_x)))
            simulation.force('y',d3.forceY(d=>p(-d.def_mds_all_y)))
            simulation.alpha(1).restart();
          }

          else if (this.state.positioning === '_4c') {
            simulation.force('x',d3.forceX(d=>p(+d._4c_x)))
            simulation.force('y',d3.forceY(d=>p(-d._4c_y)))
            simulation.alpha(1).restart();
          }
      }
      if (prevState.manifestazione !== this.state.manifestazione) {
        console.log(this.state.manifestazione)
        if (this.state.manifestazione==='none') {
            node.each(function(d){
                d3.select(this).selectAll('.combination').attr('fill',d.color_macrocategorie);
            })
        } else {
            const manifestazione = this.state.manifestazione;
            node.each(function(d){
                let value = 0;
                d.combinations.filter(dd=>dd.type.includes(manifestazione)).forEach(dd=>value+=dd.proportion_combination);
                d3.select(this).selectAll('.combination').attr('fill',filter_color(value));
            })
        }
      }
  }
  render() {
    return <div style={{width:'100vw',height:'100vh'}} ref={this._setRef.bind(this)}>
        <svg />
        <p style={{position:'absolute',top:0,left:0, fontSize:12}}>
            <select defaultValue={'_4c'} id="mds-positioning" onChange={(event)=>this.setState({'positioning':event.target.value})}>
                <option value="prop_occ">MDS 003 - Proporzione fra tipi di occorrenze</option>
                <option value="cont_occ">MDS 003 - Conteggio tipi di occorrenze</option>
                <option value="cont_e_prop_occ">MDS 003 - Proporzione e conteggio tipi di occorrenze</option>

                <option value="prop_car">MDS 003 - Proporzione fra occorrenze in caratteri</option>
                <option value="cont_car">MDS 003 - Conteggio occorrenze in caratteri</option>
                <option value="cont_e_prop_car">MDS 003 - Proporzione e conteggio occorrenze in caratteri</option>

                <option value="prop_occ_perc">MDS 004 - Proporzione fra tipi di occorrenze + percentuale dubbio</option>
                <option value="prop_car_perc">MDS 004 - Proporzione fra tipi occorrenze in caratteri + percentuale dubbio</option>
                <option value="prop_occ_car_perc">MDS 004 - Proporzione occorrenze + proporzione in caratteri + percentuale dubbio</option>

                <option value="def_mds">MDS 004b - > 2.5%</option>
                <option value="def_mds_all">MDS 004b - All</option>

                <option value="_4c">MDS 004c</option>
            </select>

            <select defaultValue={'none'} id="manifestazioni-filter" onChange={(event)=>this.setState({'manifestazione':event.target.value})}>
                {
                    ['none','negazione','dubbio','riformulazione'].map((d,i)=>{
                        return <option key={'manif-'+i} value={d}>{d}</option>
                    })
                }
            </select>
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

    return d3.rgb(col_r, col_g, col_b);
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

    //d.color_manifestazioni_stilistiche = d3.rgb(col_r, col_g, col_b);

    return d3.rgb(col_r, col_g, col_b);   
}