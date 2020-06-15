import realismoData from './data/realismo.json'
import groupBy from 'lodash/groupBy'
import uniqBy from 'lodash/uniqBy'
import {scaleLinear} from 'd3-scale'
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
    
    const circles = range(n).map(
      i => {
  
        const startNorm = i * circleWidth
        const endNorm = (i + 1) * circleWidth 
        const pos = (startNorm + endNorm) / 2
        const dataOrdered = sortBy(data, item => Math.abs(+item.locationNorm - pos))
  
        return dataOrdered[0]
      }
    )
  
    return circles
  
  })
}


