import realismoData from './data/realismo.json'
import groupBy from 'lodash/groupBy'
import uniqBy from 'lodash/uniqBy'
import {scaleOrdinal} from 'd3-scale'
import range from 'lodash/range'
import find from 'lodash/find'
import mapValues from 'lodash/mapValues'
import sortBy from 'lodash/sortBy'


const realismoDataNormalized = realismoData.map(item => ({
  ...item,
  startNorm: +item.start / item.length,
  endNorm: +item.end / item.length,
  locationNorm: +item['occurrence_location'] / +item.length,

}))


export const racconti = uniqBy(realismoData, 'title').map(item => ({
  title: item.title,
  length: item.length,
}))


export const dataset = groupBy(realismoDataNormalized, 'title')


export function datasetToCircles(n){
  return mapValues(dataset, data => {

    const circleWidth = 1 / n
    
    const circles = range(n).reduce(
      (acc, item, i) => {
  
        const startNorm = i * circleWidth
        const endNorm = (i + 1) * circleWidth 
        // const pos = (startNorm + endNorm) / 2
        // const dataOrdered = sortBy(data, item => Math.abs(+item.locationNorm - pos))
        const out = find(data, item => item.startNorm <= startNorm && item.endNorm >= endNorm) || {}
        let place = false
        if(i === 0 || acc[i-1].occurrence !== out.occurrence){
          place = true
        } 
        acc.push({...out, place})
        return acc

        // return dataOrdered[0]
      }
    , [])
  
    return circles
  
  })
}



export const colorScale = scaleOrdinal()
  .range(['#ffc33e','#00c97c','#4a4aff'])
  .domain(['indoor','outdoor','transportation'])
  .unknown(['#ccc'])