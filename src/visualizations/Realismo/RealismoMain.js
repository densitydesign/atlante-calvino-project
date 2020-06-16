import React from 'react'

import { datasetToCircles , dataset, racconti} from './utils'
import CircleWorms from './CircleWorms'

const circlesMap = datasetToCircles(30)



console.log("dataset", dataset)
console.log("circlesMap", circlesMap)



export default function RealismoMain(){

  return <div>
    <CircleWorms circlesMap={circlesMap} racconti={racconti} size={800}></CircleWorms>



    
  </div>
}