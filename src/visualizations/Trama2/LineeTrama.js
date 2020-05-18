import React, { useRef, useState, useMemo, useEffect } from 'react'
import { line, curveMonotoneX } from 'd3-shape'
import { scaleLinear } from 'd3-scale'

const lineGenerator = line().x(d => d.x).y(d => d.y).curve(curveMonotoneX)

function LineaTrama({racconto, data}){
  const d = lineGenerator(data)
  return <g>
    <path d={d} className="trama2-line"></path>
    <g>
      {data.map((d,i) => (<circle key={i} className="trama2-circle" cx={d.x} cy={d.y} r={2}></circle>))}
    </g>
  </g>
}


export default function LineeTrama({racconti=[], data={}, MOTIVO_LINE_HEIGHT, scalaColore, scalaMotivoY}){
  

  const svgRef = useRef(null)
  const [measures, setMeasures] = useState(null)
  
  useEffect(() => {
    const m = svgRef.current.getBoundingClientRect() 
    setMeasures(m)
  }, [])

  const delta = useMemo(() => {
    if(!measures){ return 0}
    return (measures.height - MOTIVO_LINE_HEIGHT) / racconti.length

  }, [MOTIVO_LINE_HEIGHT, measures, racconti.length])

  const xScale = useMemo(() => {
    if(!measures){ return null}
    return scaleLinear().domain([0, 1]).range([0, measures.width])
  }, [measures])

  return <svg className="w-100 h-100 bg-dark" ref={svgRef}>
    {measures && racconti.map((racconto, i) => {
      const datum = data[racconto.titolo].map(d => {
        return {
          x: xScale(d.x),
          y: d.y || 0
        }
      })
      // const datum = data[racconto]
      return <g key={racconto.titolo} style={{
        transform: `translateY(${delta*i}px)`,
      }}>
        <LineaTrama scalaColore={scalaColore} scalaMotivoY={scalaMotivoY} 
          xScale={xScale} racconto={racconto} data={datum}></LineaTrama>
        
  
  
      </g>
    })}

  </svg>



}