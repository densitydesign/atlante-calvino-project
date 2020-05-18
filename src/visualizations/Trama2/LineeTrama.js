import React, { useRef, useState, useMemo, useEffect } from 'react'


export default function LineeTrama({racconti=[], MOTIVO_LINE_HEIGHT}){
  

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

  console.log("measures", measures, delta)

  return <svg className="w-100 h-100 bg-dark" ref={svgRef}>
    {measures && racconti.map((racconto, i) => <g key={racconto} style={{
      transform: `translateY(${delta*i}px)`,
    }}>
      <line className="trama2-line" x1={0} x2={measures.width}></line>


    </g>)}

  </svg>



}