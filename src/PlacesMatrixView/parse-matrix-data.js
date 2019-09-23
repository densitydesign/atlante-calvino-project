import * as d3 from 'd3'

const ParseMatrixData = {}

ParseMatrixData.parser = (rawData) => {

  rawData.forEach(function(d){ d.year = new Date(d.year); })

  let data = rawData.map(function(d) {
    d.year = new Date(d.year);
    if(!d.id) { d.id = d['data.id'] }
    var obj = {
			'id': d.id,
			'label': d['Occorrenza'],
			'part_of': d['Parte di ID'],
			'source': d['Fonte'],
			'sourceTitle': d['Titolo Fonte'],
			'year': +d.year,
			'category': d['Categoria'],
			'totalSubNodes':0,
      'publicationType': d['Pubblicazione Fonte'],
      'pubVenueTitle': d['Pubblicazioni Titoli'],
      'isGuessed': d['Luogo desunto'],
      'themes': d['Tema']
		}
		return obj
	})
  data = ParseMatrixData.handleHierarchies(data)

  const graph = ParseMatrixData.calculateNetwork(data);
  // console.log(graph)
  return graph;
}

ParseMatrixData.handleHierarchies = (nodes) => {
  let hierarchies = d3.nest()
		.key(function(d){ return d.part_of })
		.entries(nodes);

	hierarchies
		.filter(function(d){ return d.key === '' })[0]
		.values.forEach(function(d){
			var part_of_d = hierarchies.find(function(e){ return e.key === d.id })
			if (part_of_d) {
				// console.log('LVL 0',d.id, d.label, 'is parent of', part_of_d.values.length);
				d.subNodes = part_of_d.values;
				d.totalSubNodes = part_of_d.values.length

				part_of_d.values.forEach(function(e){
					var part_of_e = hierarchies.find(function(f){ return f.key === e.id })
					if (part_of_e) {
						// console.log('LVL 1',e.id, e.label, 'is parent of', part_of_e.values.length);
						e.subNodes = part_of_e.values
						e.totalSubNodes = part_of_e.values.length
						d.totalSubNodes += e.totalSubNodes

						part_of_e.values.forEach(function(f){
							var part_of_f = hierarchies.find(function(g){ return g.key === f.id})
							if (part_of_f) {
								// console.log('LVL 2', f.id, f.label, 'is parent of', part_of_f.values.length)
								f.subNodes = part_of_f.values
								f.totalSubNodes = part_of_f.values.length
								d.totalSubNodes += f.totalSubNodes

								part_of_f.values.forEach(function(g){
									var part_of_g = hierarchies.find(function(h){ return h.key === g.id })
									if (part_of_g) {
										// console.log('LVL 3', g.id, g.label, 'is parent of', part_of_g.values.length)
										g.subNodes = part_of_g.values
										g.totalSubNodes = part_of_g.values.length
										d.totalSubNodes += f.totalSubNodes

									}
								})
							}
						})
					}
				})
			}
		})
	// return array of hierarchical nodes
	return hierarchies.filter(function(d){ return d.key === '' })[0].values;
}

ParseMatrixData.calculateNetwork = (nodes) => {
	// create the array of edges
	var edges = []
	// base edges on works co-occurrences of places
	d3.nest()
		.key(function(d) { return d.source })
		.entries(nodes)
		.forEach((d) => {
			d.values.filter(function(e) {
				return e.part_of !== '';
			}).forEach((n, i) => {
				var obj = {}
				obj = {
					'source': n.id,
					'target': n.part_of,
					'volume': d.key,
					// 'year': n.year,
					'source_part_of': n.part_of,
					'kind': 'part_of'
				}
				edges.push(obj);
			})
		})
	return { 'nodes': nodes, 'edges': edges, 'root_nodes': nodes.filter(d => d.subNodes) }
}

export default ParseMatrixData
