import React, { useState, useRef, useEffect, useReducer } from 'react';
import * as d3 from 'd3'
import json from './dataLogo.json';

const InteractiveLogo = () => {
    const [data, setData] = useState(json);
    // const [cursorData, setCursorData] = useState(json.find(d=>d.id==='cursor'))

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const svgRef = useRef(null)

    const simulation = d3.forceSimulation(data)
        .force('x', d3.forceX(d=>d.x))
        .force('y', d3.forceY(d=>d.y))
        .force('collide', d3.forceCollide(d=>d.r))
        .on('tick',()=>{
            // console.log(simulation.alpha())
            forceUpdate()
            d3.select(svgRef.current)
        })
        .alphaMin(.5)
        .stop()
    
    useEffect(()=>{
        d3.select(svgRef.current).on("mousemove", function() {
            let p1 = d3.mouse(this);

            data.find(d=>d.id==='cursor').fx = p1[0];
            data.find(d=>d.id==='cursor').fy = p1[1];

            simulation
              .alpha(1)
              .restart(); //reheat the simulation
            
        });
    })

    return (
        <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 672 350" preserveAspectRatio="xMidYMid meet" xstyle={{backgroundColor:'rgba(234,10,45,0.1)'}}>
            {/* <rect x="0" y="0" width="672" height="350" stroke="blue" fill="none" /> */}
            {/* <circle r="30" cx="336" cy="175" /> */}
            {
                data.map(d=> <circle className="circle" id={d.id} key={d.id} r={d.r} cx={d.x} cy={d.y} fill="#5151fc"/> )
            }
        </svg>
    )
}

export default InteractiveLogo