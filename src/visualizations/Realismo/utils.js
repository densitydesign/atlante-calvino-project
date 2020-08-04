import realismoData from './data/realismo.json'
import groupBy from 'lodash/groupBy'
import uniqBy from 'lodash/uniqBy'
import { scaleOrdinal } from 'd3-scale'
import range from 'lodash/range'
import find from 'lodash/find'
import mapValues from 'lodash/mapValues'
import { extent } from 'd3-array'

const realismoDataNormalized = realismoData.map((item) => ({
  ...item,
  startNorm: +item.start / item.length,
  endNorm: +item.end / item.length,
  locationNorm: +item['occurrence_location'] / +item.length,
}))

export const yearsExtent = extent(realismoData, (d) => +d.year).map(
  (y) => new Date(y, 0)
)

export const racconti = uniqBy(realismoData, 'title').map((item) => ({
  title: item.title,
  length: item.length,
  year: +item.year,
  volume: item.volume_primo,
}))

export const dataset = groupBy(realismoDataNormalized, 'title')

const maxLength = Math.max(...realismoData.map(d => +d.length).filter(Boolean))
export const detailWormsCircles = mapValues(dataset, (data) => {

  // // Filled the pie
  // const dataFilled = data.reduce((filledWithCream, calv0, i) => {
  //   if (i === 0) {
  //     // We are about to start
  //     if (+calv0.start > 0) {
  //       // The first piece of our story start from n0000where
  //       // filled the start
  //       filledWithCream.push({
  //         ...calv0,
  //         level: 0,
  //         occurrence_location: 0,
  //         start: 0,
  //         end: calv0.start - 1,
  //         ghost: true,
  //       })
  //     }
  //   } else {
  //     // Rewind back 2 prev
  //     const prevCalvix = data[i - 1]
  //     if (data.start > prevCalvix.end + 1) {
  //       filledWithCream.push({
  //         ...calv0,
  //         level: 0,
  //         occurrence_location: prevCalvix.end + 1,
  //         start: prevCalvix.end + 1,
  //         end: calv0.start - 1,
  //         ghost: true,
  //       })
  //     }
  //   }
  //   // Add item
  //   filledWithCream.push(calv0)
  //   return filledWithCream
  // }, [])
  return data.map(item => ({
    ...item,
    startTotalNorm: +item.start / maxLength,
    endTotalNorm: +item.end / maxLength,
    locationTotalNorm: +item['occurrence_location'] / maxLength,
    lengthTotalNorm: +item.length / maxLength,
  }))
})

export function datasetToCircles(n) {
  return mapValues(dataset, (data) => {
    const circleWidth = 1 / n

    const circles = range(n).reduce((acc, item, i) => {
      const startNorm = i * circleWidth
      const endNorm = (i + 1) * circleWidth
      const out =
        find(
          data,
          (item) => item.startNorm <= startNorm && item.endNorm >= endNorm
        ) || {}
      let place = false
      if (
        out.occurrence &&
        out.locationNorm >= startNorm &&
        out.locationNorm <= endNorm
      ) {
        place = true
      }
      acc.push({ ...out, place })
      return acc
    }, [])

    return circles
  })
}

export const colorScale = scaleOrdinal()
  .range(['#ffc33e', '#00c97c', '#4a4aff'])
  .domain(['indoor', 'outdoor', 'transportation'])
  .unknown(['#ccc'])

const GAP_SIZE = 1
export const LEGEND_SIZE = 10

function calculateDegs() {
  const uniqueYears = uniqBy(racconti, (item) => item.year)
    .map((x) => x.year)
    .sort()

  const numGaps = uniqueYears.reduce((acc, year, i) => {
    if (i > 0) {
      return acc + year - uniqueYears[i - 1]
    }
    return acc
  }, 0)
  const unitDeg = (360 - LEGEND_SIZE - numGaps * GAP_SIZE) / racconti.length

  let lastRotation = LEGEND_SIZE / 2 + unitDeg / 2
  const raccontiDegs = racconti.map((racconto, i) => {
    if (i > 0) {
      lastRotation =
        lastRotation +
        unitDeg +
        (racconto.year - racconti[i - 1].year) * GAP_SIZE
    }
    return {
      ...racconto,
      rotation: lastRotation - 90,
    }
  })

  const byYear = groupBy(raccontiDegs, 'year')
  const yearsArcs = uniqueYears.map((year) => {
    const data = byYear[year]
    const startAngleDeg = (data[0].rotation + 90 - unitDeg / 2)
    const startAngle = (startAngleDeg / 360) * (2 * Math.PI)

    const endAngle =
      ((data[data.length - 1].rotation + 90 + unitDeg / 2) / 360) *
      (2 * Math.PI)

    return {
      startAngle,
      angleLabel: startAngleDeg + unitDeg - 90 + unitDeg / 2,
      endAngle,
      year,
    }
  })

  return { raccontiDegs, yearsArcs }
}

export const { raccontiDegs, yearsArcs } = calculateDegs()
