//visual helpers
import { scaleLinear } from 'd3-scale'
import { extent } from 'd3-array'

//data management
import groupBy from 'lodash/groupBy'
import keyBy from 'lodash/keyBy'
import sortBy from 'lodash/sortBy'
import uniqBy from 'lodash/uniqBy'
import minBy from 'lodash/minBy'
import maxBy from 'lodash/maxBy'
import mapValues from 'lodash/mapValues'
import get from 'lodash/get'
import take from 'lodash/take'
import sum from 'lodash/sum'
import flatten from 'lodash/flatten'

import datasetLines from './dati/dataset_lines.json'
import mappaMotivoTipologia from './dati/mappa_motivo_tipologia.json'
import coloriPosizioni from './dati/colori_posizioni.json'
import ordineColore from './dati/ordine_colore_y.json'


export const MOTIVO_LINE_HEIGHT = 50;



export const motivoExtent = extent(ordineColore, (item) => +item['ordine tipologia'])

export function makeScalaMotivoY(lineHeight) {

  return scaleLinear().domain(motivoExtent).range([lineHeight, 0])
}

export function makeVizData(scaleY) {
  const ordineByCluster = keyBy(coloriPosizioni, 'valore')
  const tipologie = ordineColore.map((item) => ({
    ...item,
    colore: get(ordineByCluster, item['cluster tipologia']),
  }))
  const colors = sortBy(tipologie, (item) => item.colore.ordine).map(
    (x) => x.colore.colori
  )
  const tipologieByTipologia = keyBy(tipologie, (item) => item.tipologia)

  const clusterByMotivo = mapValues(
    keyBy(mappaMotivoTipologia, 'motivo_type'),
    (item) => item['cluster tipologie']
  )
  const ordineMotivoByMotivo = mapValues(
    keyBy(ordineColore, 'tipologia'),
    (item) => +item['ordine tipologia']
  )


// // we must filter items with no scale associated and renormalize data
// const datasetTmp = datasetLines.filter(item => {
//   const motivo = item['motivo_type']
//   return !!get(ordineMotivoByMotivo, motivo)
// }).map(item => {
//   const numCaratteri = +item['end_motivo'] -item['start_motivo'] + 1
//   return {...item, numCaratteri}
// })

// function normalizeCharters(data) {
//   let shift = []
//   let lenHoles = data.reduce((acc, item, i) => {
//     const motivo = item['motivo_type']
//     const ordineMotivo = !!get(ordineMotivoByMotivo, motivo)
//     if (ordineMotivo) {
//       shift.push({
//         ...item,
//         start_motivo: item.start_motivo - acc,
//         end_motivo: item.end_motivo - acc,
//       })
//       return acc
//     } else {
//       acc += item.end_motivo - item.start_motivo + 1
//       return acc
//     }
//   }, 0)
//   // console.log('BEFORE', lenHoles, shift)
//   lenHoles += ((+shift[0].end_motivo) - shift[0].start_motivo) / 2
//   lenHoles += ((+shift[shift.length - 1].end_motivo) - shift[shift.length - 1].start_motivo) / 2
//   console.log('After', lenHoles)


//   return shift.map(item => ({
//     ...item,
//     'tot caratteri': (+item['tot caratteri']) - lenHoles
//   }))
// }

// let datasetTmpByRacconto = groupBy(datasetLines, 'titolo racconto')
// datasetTmpByRacconto = mapValues(datasetTmpByRacconto, normalizeCharters)
// const finalDataSet = flatten(Object.values(datasetTmpByRacconto))

// console.log(finalDataSet)
// const titoli = Object.keys(datasetTmpByRacconto)
// datasetTmpByRacconto = titoli.reduce((acc, item) => {

//   const data = datasetTmpByRacconto[item]
//   const len = sum(data.map(item => item.numCaratteri))
//   acc[item] = len
//   return acc

// }, {})


// const finalDataset = datasetTmp.map(item => ({...item, len:lunghezze[item['titolo racconto']]  }))




  const datasetLinesNormalized = datasetLines.map((item) => {
    const tot = +item['tot caratteri']
    const motivo = item['motivo_type']
    const cluster = get(clusterByMotivo, motivo)
    const coloreCluster = get(ordineByCluster, `[${cluster}].colori`)
    const ordineCluster = get(ordineByCluster, `[${cluster}].ordine`)
    const ordineMotivo = get(ordineMotivoByMotivo, motivo)

    const startMotivoNorm = +item.start_motivo / tot
    const endMotivoNorm = +item.end_motivo / tot
    const y =
      ordineMotivo !== undefined ? scaleY(ordineMotivo) : undefined
    const x = (startMotivoNorm + endMotivoNorm) / 2

    return {
      ...item,
      startMotivoNorm,
      endMotivoNorm,
      cluster,
      coloreCluster,
      ordineCluster: ordineCluster ? +ordineCluster : undefined,
      ordineMotivo,
      y,
      x,
    }
  })

  const byRacconto = groupBy(datasetLinesNormalized, 'titolo racconto')

  let racconti = sortBy(
    uniqBy(datasetLines, (item) => item['titolo racconto']).map((item) => ({
      titolo: item['titolo racconto'],
      anno: item['anno'],
      mese: item['mese'],
    })),
    (item) => {
      const anno = +item.anno
      const mese = +item.mese

      return `${anno.toFixed(4)}${mese.toFixed(2)}`
    }
  )
  // //#TODO: remove this (limiting for debug)
  // racconti = take(racconti, 5)
  //pre-computing filters
  racconti = racconti.map((racconto) => {
    const minDatum = minBy(
      byRacconto[racconto.titolo],
      (item) => item.ordineMotivo
    )
    const maxDatum = maxBy(
      byRacconto[racconto.titolo],
      (item) => item.ordineMotivo
    )
    // console.log(123, racconto.titolo, minDatum, maxDatum)
    return { ...racconto, minDatum, maxDatum }
  })

  return {
    tipologie,
    tipologieByTipologia,
    colors,
    racconti,
    byRacconto,
  }
}

export const splitPath = (d) => {
  const pieces = d.split('C')
  const paths = pieces.reduce((acc, item, i) => {
    if (i === 0) {
      return acc
    }
    if (i === 1) {
      const path = pieces[0] + 'C' + pieces[i]
      acc.push(path)
    } else {
      const [a, b] = pieces[i - 1].split(',').reverse()
      const path = `M${b},${a}C${pieces[i]}`
      acc.push(path)
    }

    return acc
  }, [])

  return paths
}
