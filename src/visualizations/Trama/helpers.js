
import sumBy from "lodash/sumBy";
import { scaleLinear } from "d3";
import sortBy from "lodash/sortBy"
import groupBy from "lodash/groupBy"
import find from "lodash/find"
import invert from "lodash/invert"

export const levelMaps = {
  uno: 1,
  due: 2,
  tre: 3,
  quattro: 4,
  cinque: 5
};

export const levelMapsInverted = invert(levelMaps)


const RIGHT_PADDING = 40
const RIGHT_PADDING_SAME_WIDTH = 100

export const computeHorizontalPositions = (booksData, width, sameWidth, usePadding=true) => {
  
  if (sameWidth) {
    const bookWidth = (width - (usePadding ? RIGHT_PADDING_SAME_WIDTH : 0)) / booksData.length;

    const scaleSameWith = scaleLinear()
      .domain([0, booksData.length])
      .range([0, width - (usePadding ? RIGHT_PADDING_SAME_WIDTH : 0)]);

    return booksData.reduce((out, item, i) => {
      if (i === 0) {
        out.push({
          ...item,
          caratteriPos: 0,
          caratteriX: 0,
          caratteriWidth: bookWidth
        });
      } else {
        const caratteriPos = out[i - 1].caratteriPos + out[i - 1].caratteri;
        out.push({
          ...item,
          caratteriPos,
          caratteriX: scaleSameWith(i),
          caratteriWidth: bookWidth
        });
      }
      return out;
    }, []);
  } else {
    const totalChars = sumBy(booksData, "caratteri");
    const scaleChars = scaleLinear()
      .domain([0, totalChars])
      .range([0, width - (usePadding ? RIGHT_PADDING: 0)]);

    return booksData.reduce((out, item, i) => {
      if (i === 0) {
        out.push({
          ...item,
          caratteriPos: 0,
          caratteriX: 0,
          caratteriWidth: scaleChars(item.caratteri)
        });
      } else {
        const caratteriPos = out[i - 1].caratteriPos + out[i - 1].caratteri;
        out.push({
          ...item,
          caratteriPos,
          caratteriX: scaleChars(caratteriPos),
          caratteriWidth: scaleChars(item.caratteri)
        });
      }
      return out;
    }, []);
  }
};


export const findAtChar = (item, char) => {
  return +item.starts_at <= char && +item.ends_at >= char
}


// const SEQ_FIELD = "cluster tipologie"
const SEQ_FIELD = 'tipologia'

export const computeSequences = (data, textID) => {
  

  const sortedData = sortBy(data.filter(x => x.textID === textID), x => +x['starts_at'])
  const byLevel = groupBy(sortedData, x => x.livello)

  
  const levels = sortBy(Object.keys(byLevel), x => levelMaps[x])
  
  const computedSequences = sortedData.map(x => {
    const char = +x['starts_at']
    const seqItems = levels.map(level => find(byLevel[level], x => findAtChar(x, char)))
    let sequence = []
    let ids = {}
    let ends_at = +x.ends_at

    seqItems.forEach(s => {
      
      if(s){
        sequence.push(s[SEQ_FIELD])
        const key = `${s["ID SEQ"]}-${s['livello']}`
        ids[key] = true
        ends_at = Math.min(ends_at, +s['ends_at'])
      }
      
    })

    return {
      sequence,
      sequenceStr: sequence.join("-"),
      ids,
      ends_at,
      starts_at: +x.starts_at,

    }
  })
  return computedSequences

}