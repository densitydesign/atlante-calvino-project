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

import datasetLines from './dati/dataset_lines.json'
import mappaMotivoTipologia from './dati/mappa_motivo_tipologia.json'
import coloriPosizioni from './dati/colori_posizioni.json'
import ordineColore from './dati/ordine_colore_y.json'

export function makeScalaMotivoY(lineHeight) {
  const motivoExtent = extent(ordineColore, (item) => +item['ordine tipologia'])
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