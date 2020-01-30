import * as d3 from 'd3';

class VClass {
  initialize = () => {

    let svg = d3.select("#lische");

    svg.selectAll("g.stories > g").on("click", highlightFlux);

    function highlightFlux() {
      d3.selectAll('g.stories > g').style('opacity', 0.2);
      d3.select(this).style("opacity", 1);
    }

    d3.select('.reset').on('click', function(d){
      resetOpacity();
    })

    function resetOpacity() {
      d3.selectAll('g.stories > g').style('opacity', 1);
      d3.selectAll('g.magazines > g').style('opacity', 1);
      d3.selectAll('g.collections > g').style('opacity', 1);
      d3.selectAll('g.collections-labels > g').style('opacity', 1);
    }
  };

  destroy = () => {};
}

const V = new VClass();

export default V;
