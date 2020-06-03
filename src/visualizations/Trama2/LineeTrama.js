import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react'
import { line, curveMonotoneX } from 'd3-shape'
import { scaleLinear } from 'd3-scale'


const MAX_ZOOM_LEVEL = 10




function LineaTrama({racconto, data, xScale, width, height, zoomLevel, index}){
  const lineGenerator = line().x(d => d.x).y(d => d.y * zoomLevel).curve(curveMonotoneX)
  const d = lineGenerator(data)
  return <g>
    {/* <rect width={width} height={height} style={{fill: "teal", fillOpacity:0.3}}></rect> */}
    <path d={d} className="trama2-line"></path>
    <text x={0} y={height-10}>{index}</text>
    {/* <line x1={0} x2={width} y1={height} y2={height} style={{stroke: '#000'}}></line> */}
    <g>
      {data.map((d,i) => (<circle key={i} className="trama2-circle" cx={d.x} cy={d.y*zoomLevel  } r={2}></circle>))}
    </g>
  </g>
}


export default function LineeTrama({racconti=[], data={}, height, scalaColore, scalaMotivoY}){
  

  const containerRef = useRef(null)
  const [measures, setMeasures] = useState(null)
  const [zoomLevel, setZoomLevel] = useState(1.0)
  const [zoomY, setZoomY] = useState(0)

  
  
  useEffect(() => {
    const m = containerRef.current.getBoundingClientRect() 
    setMeasures(m)
  }, [])

  const scrollHandler = useCallback((e, n) => {
      
      
      const sign = e.deltaY > 0 ? 1.0 : -1.0
     
      const newLevel = zoomLevel + (0.1 * sign)
      
      if(newLevel > MAX_ZOOM_LEVEL){
        return
      }
      if(newLevel <= 1){
        setZoomY(0)
        return
      }
      setZoomLevel(Math.max(1, Math.min(newLevel, MAX_ZOOM_LEVEL)))
      if(!zoomY){
        setZoomY(e.layerY)
      }
      
      
      return false
      
    
  }, [zoomLevel, zoomY])

  useEffect(() => {
    const n = containerRef.current

    const sh = (e) => {scrollHandler(e, n)}
    
    n.addEventListener('wheel', sh, {passive: true});
    return () => {
      n.removeEventListener('wheel', sh, {passive: true});
    }
    
  }, [scrollHandler])
  

  const delta = useMemo(() => {
    if(!measures){ return 0}
    return (measures.height - height) / racconti.length

  }, [height, measures, racconti.length])

  const xScale = useMemo(() => {
    if(!measures){ return null}
    return scaleLinear().domain([0, 1]).range([0, measures.width])
  }, [measures])


  const dataRacconti = useMemo(() => {
    if(!xScale){
      return []
    }
    return racconti.map(racconto => {
      return data[racconto.titolo].filter(d => !!d.y).map(d => {
        return {
          x: xScale(d.x),
          y: d.y
        }
      })
    })
  }, [data, racconti, xScale])

  
  const baseDisplacements = useMemo(() => {
    return dataRacconti.map((d, i) => {
      let dy = delta * i;
      return dy
    })
  }, [dataRacconti, delta])

  
  const displacements = useMemo(() => {
    return dataRacconti.map((d, i) => {
      let dy = baseDisplacements[i]

      const j = Math.round(zoomY/delta)

      const diff =  delta * j * zoomLevel
      const factor = (zoomLevel - 1) / (MAX_ZOOM_LEVEL - 1) * zoomLevel

      return dy * zoomLevel - diff * factor
    })
  }, [baseDisplacements, dataRacconti, delta, zoomLevel, zoomY])



  return <div ref={containerRef} className="w-100 h-100" style={{overflow:'auto'}}>
    {measures && <svg 
      style={{height:measures.height, width: measures.width, 
        transform : `perspective(${zoomLevel})`, transformOrigin:`50% 50%`
      }} ref={containerRef}>
    {dataRacconti.map((datum, i) => {
       

      
      const dy = displacements[i]
      

      if(dy < - height * zoomLevel){
        return null
      }
      if(dy > measures.height){
        return null
      }
      
      
      // const datum = data[racconto]
      return <g key={i} style={{
        transform: `translateY(${dy}px)`,
      }}>
        <LineaTrama scalaColore={scalaColore} scalaMotivoY={scalaMotivoY} 
          index={i}
          width={measures.width} 
          height={height*zoomLevel}
          zoomLevel={zoomLevel}
          xScale={xScale} racconto={racconti[i]} data={datum}></LineaTrama>
      </g>
    })}

    </svg>}
  </div>


}