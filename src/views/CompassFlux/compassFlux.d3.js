import * as d3 from 'd3';

class VSvg {
  initialize = (el) => {

    console.log("hello");

    d3.selectAll(".lische-box g").on("click", highlightFlux);

    function highlightFlux() {
      console.log("click");
      d3.selectAll("g").style("opacity", 0.5);
      d3.select(this).style("opacity", 1);
    }

  };

  destroy = () => {};
}

const V = new VSvg();

export default V;
