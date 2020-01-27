
import * as d3 from 'd3';

class VClass
{
  initialize = (el, input_data) =>
  {
    let svg = d3.select(el);

    svg
      .append("circle")
      .attr("r", 30 * input_data[0].generico_terrestre)
      .attr("cx", 100)
      .attr("cy", 100)
      .attr("fill", "red");
  };

  destroy = () => {};
}

const V = new VClass();

export default V;