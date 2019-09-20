import * as d3 from 'd3';
const V = {}

const categories = [
	'generico_non_terrestre',
	'nominato_non_terrestre',
	'nominato_terrestre',
	'generico_terrestre',
	'inventato',
	'no_ambientazione'
]

const categoriesColors = [
	'#3131ff',
	'#bbbbff',
	'#ffce00',
	'#ff6c39',
	'#00c19c',
	'#cecece'
]

const collisionPadding = 1;

// Dimensions and scales
let x, y, r, color, margin, width, height;
margin = { 'top': 0, 'right': 50, 'bottom': 75, 'left': 50 }

// elements
let svg, g, xAxis, yAxis, hull, link, node, label, information



V.initialize = (el, data) => {
  svg = d3.select(el);
  width = svg.node().getBoundingClientRect().width - margin.left - margin.right;
  height = svg.node().getBoundingClientRect().height - margin.top - margin.bottom;

  // Scales
  x = d3.scaleTime().range([0, width]);
  y = d3.scalePoint().range([0, height]).padding(0.5);
  r = d3.scalePow().exponent(0.5).range([15,75]).range([3.5,25]);
  color = d3.scaleOrdinal().domain(categories).range(categoriesColors);

  // elements
  g = svg.append('g').attr("transform", `translate(${margin.left},${margin.top})`);
  xAxis = g.append("g").attr("class", "x-axis");
  yAxis = g.append('g').attr("class", "y-axis");

  link = g.append('g').classed('links', true).selectAll('.link');
  hull = g.append('g').classed('hulls', true).selectAll('.hull');
  node = g.append('g').classed('nodes', true).selectAll('.node');
  label = g.append('g').classed('labels', true).selectAll('.label');
  information = g.append('g').classed('informations', true).selectAll('.information');







  console.log(margin)


}

V.update = (data, filters) => {
  console.log(margin)
}

V.destroy = () => {}

export default V
