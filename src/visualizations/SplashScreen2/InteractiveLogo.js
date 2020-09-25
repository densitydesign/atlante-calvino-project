import React, { useState, useRef, useEffect, useReducer } from 'react';
import * as d3 from 'd3'
import json from './dataLogo.json';

const InteractiveLogo = () => {
    const [data, setData] = useState(json.slice(0).map(d=>({...d,_x:d.x,_y:d.y})));
    const svgRef = useRef(null)
    const simulation = d3.forceSimulation(data)
        .force('collide', d3.forceCollide(d=>d.r))
        .force('x', d3.forceX(d=>d._x))
        .force('y', d3.forceY(d=>d._y))
        .alpha(1)
        .restart();
    useEffect(()=>{
        const svg = d3.select(svgRef.current);
        const circle = svg.selectAll('circle')
                .data(data)
                .enter().append('circle')
                    .attr('r',d=>d.r)
                    .attr('r',0)
                    .attr('cx',d=>d._x)
                    .attr('cy',d=>d._y)
                    .attr('fill','var(--dark-blue)');
        circle.transition()
            .duration(1000)
            .delay((d,i)=>Math.floor(i/50)*50)
            .ease(d3.easeElasticOut)
            .attr('r',d=>d.r);
        simulation.on('tick',()=>{
            circle.attr('cx',d=>d.x).attr('cy',d=>d.y);
        });
        svg.on("mousemove touchmove", function() {
            let p1 = d3.mouse(this);
            data.find(d=>d.id==='cursor').fx = p1[0];
            data.find(d=>d.id==='cursor').fy = p1[1];
            simulation.alpha(1).restart();
        });
        svg.on('mouseleave touchend',function(){
            let p1 = d3.mouse(this);
            const cursor = data.find(d=>d.id==='cursor');
            cursor.fx = null;
            cursor.fy = null;
            simulation.alpha(1).restart();
        })
    })

    return (
        <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 672 350" >
            {/* Circles will be generated here with D3 */}
        </svg>
    )
}

export default InteractiveLogo