import sumBy from "lodash/sumBy";
import { scaleLinear } from "d3";

export const levelMaps = {
  uno: 1,
  due: 2,
  tre: 3,
  quattro: 4,
  cinque: 5
};

const RIGHT_PADDING = 40
const RIGHT_PADDING_SAME_WIDTH = 100

export const computeHorizontalPositions = (booksData, width, sameWidth) => {
  if (sameWidth) {
    const bookWidth = width / booksData.length;

    const scaleSameWith = scaleLinear()
      .domain([0, booksData.length])
      .range([0, width - RIGHT_PADDING_SAME_WIDTH]);

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
      .range([0, width - RIGHT_PADDING]);

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
