
import * as d3 from 'd3';

function addWantedCoves(vertex_array, boundary_points, concavityTolerance) 
{
	if(boundary_points.length == 0) return [];

	if(boundary_points_count(boundary_points) <= 3) return boundary_points;

	const internal_points = arr_diff(vertex_array, boundary_points[0]);

	let new_boundary_points = [];

	for(let i = 0; i < boundary_points[0].length; ++i) 
  {
		let next_index = i == boundary_points[0].length - 1 ? 0 : i + 1;

		let p1 = boundary_points[0][i];
		new_boundary_points.push(p1);

		let p2 = boundary_points[0][next_index];

		let added_new_internal_points;

		let points_after_p1 = [];
		let points_before_p2 = [];

		do 
    {
			added_new_internal_points = false;
			const candidate_cove_points = [];
			const boundary_dist = Math.sqrt(dsq(p1, p2));

			for(let i = 0; i < internal_points.length; ++i) {
				let ip = internal_points[i];

				let distSum = Math.sqrt(dsq(p1, ip)) + Math.sqrt(dsq(p2, ip));

				if(distSum / boundary_dist <= concavityTolerance) {
					candidate_cove_points.push(ip);
				}
			}

			//    let pointsToBeAdded = findShortestPointsPath(p1, cove_points, p2);

			if(candidate_cove_points.length > 0) 
      {
				//        let distances_from_p1 = candidate_cove_points.map(p => { p: p; dist: Math.sqrt(dsq(p1, p)) });
				let distances_from_p1 = candidate_cove_points.map(function(p) { return { p: p, dist: Math.sqrt(dsq(p1, p)) }; });
				let nearest_point_to_p1_idx = minIndex(distances_from_p1, d => d.dist);
				let nearest_point_to_p1 = distances_from_p1[nearest_point_to_p1_idx];

				let distances_from_p2 = candidate_cove_points.map(function(p) { return { p: p, dist: Math.sqrt(dsq(p2, p)) }; });
				let nearest_point_to_p2_idx = minIndex(distances_from_p2, d => d.dist);
				let nearest_point_to_p2 = distances_from_p2[nearest_point_to_p2_idx];

				if(nearest_point_to_p1.dist <= nearest_point_to_p2.dist) 
        {
					internal_points.splice(internal_points.indexOf(nearest_point_to_p1.p), 1);
					//        new_boundary_points.push(nearest_point_to_p1.p);
					points_after_p1.push(nearest_point_to_p1.p);
					p1 = nearest_point_to_p1.p;
				} 
        else 
        {
					internal_points.splice(internal_points.indexOf(nearest_point_to_p2.p), 1);
					//        new_boundary_points.push(nearest_point_to_p2.p);
					points_before_p2.push(nearest_point_to_p2.p);
					p2 = nearest_point_to_p2.p;
				}

				added_new_internal_points = true;
			}
		} while(added_new_internal_points);

		new_boundary_points = new_boundary_points.concat(points_after_p1).concat(points_before_p2.reverse());

//		new_boundary_points = new_boundary_points.concat(pointsToBeAdded);
	}

	let result = [new_boundary_points];

	return result;
}

function angle(p1, p2) 
{
	return Math.atan2(p1.y - p2.y, p2.x - p1.x);
}

function arr_diff(a1, a2) 
{
  return a1.filter(elem => !arrayIncludesAnother(a2, elem));
}

function arrayEqualsAnother(array1, array2) {
	// if the other array is a falsy value, return
	if(!array2)
		return false;

	// compare lengths - can save a lot of time
	if(array1.length != array2.length)
		return false;

	for(var i = 0, l = array1.length; i < l; i++) {
		// Check if we have nested arrays
		if(array1[i] instanceof Array && array2[i] instanceof Array) {
			// recurse into the nested arrays
			if(!arrayEqualsAnother(array1[i], array2[i]))
				return false;
		} else if(array1[i] != array2[i]) {
			// Warning - two different object instances will never be equal: {x:20} != {x:20}
			return false;
		}
	}
	return true;
}

// checks if array1 contains array2 as one of its elements (and NOT as subset)
function arrayIncludesAnother(array1, array2) 
{
	if(!array1 || !array2) return false;

	for(let i = 0, l = array1.length; i < l; ++i)
  {
		if(arrayEqualsAnother(array1[i], array2)) return true;
	}

	return false;
}

function ascendingCoords(a, b) 
{
	return a[0] === b[0] ? b[1] - a[1] : b[0] - a[0];
}

function rotateArrayLeft(array, n)
{
  const a1 = array.slice(0, n);
  const a2 = array.slice(n);
  const rotatedArray = a2.concat(a1);

  return rotatedArray;
}

function rotateArrayRight(array, n)
{
  const n2 = array.length - n;
  const rotatedArray = rotateArrayLeft(array, n2);

  return rotatedArray;  
}

function arrayDifferences(array)
{
  return array.slice(1, array.length).map((d, i) => d - array[i]);
}

function borderOrientationIsCounterclockwise(points)
{
	const namedCoordPoints = points.map(vectorPoint_to_namedCoordPoint);

	const barycenter = pointsBarycenter(namedCoordPoints);

	const angles = namedCoordPoints.map(point => normalizeAngle(angle(barycenter, point)));

	const minAngle = Math.min(...angles);

	const minIndex = angles.indexOf(minAngle);

  const minSuccessorIndex = (minIndex + 1) % angles.length;

  const rotatedAngles = rotateArrayLeft(angles, minIndex);


  const angleDifferences = arrayDifferences(rotatedAngles);

  const negativeDifferencesCount = angleDifferences.reduce((n, val) => n + (val < 0), 0);

  return negativeDifferencesCount == 0;
//  return angles[2] > angles[1];
}

function boundary2(mesh) 
{
	let counts = {};
	let edges = {};
	let r;
	let result = [];
	let pointMap = new Map();

	mesh.forEach(
		triangle => {
			for(let i = 0; i < 3; ++i) 
      {
				let edge = [triangle[i], triangle[(i + 1) % 3]].sort(ascendingCoords).map(point => { pointMap.set(point.id, point); return point.id; });

				edges[edge[0]] = (edges[edge[0]] || []);

				if(!edges[edge[0]].includes(edge[1]))
					edges[edge[0]].push(edge[1]);

				edges[edge[1]] = (edges[edge[1]] || []);

				if(!edges[edge[1]].includes(edge[0]))
					edges[edge[1]].push(edge[0]);

				let k = edge.sort().join(":");
				if(counts[k]) delete counts[k];
				else counts[k] = 1;
			}
		});

	while(1)
  {
		let k = null;

		for(k in counts) break;

		if(k == null) break;

		result.push(r = k.split(":"));
		delete counts[k];

		let q = r[1];

		while(q !== r[0]) 
    {
			const p = q;
			const qs = edges[p];
			const n = qs.length;

			for(let i = 0; i < n; ++i) 
      {
				q = qs[i];

				const edge = [p, q].sort().join(":");

				if(counts[edge]) 
        {
					delete counts[edge];
					r.push(q);

					break;
				}
			}
		}
	}

	const transformed_array = r.map(id => pointMap.get(id));

	return [transformed_array];
}

function boundary_points_count(boundary_points) 
{
	return boundary_points[0].length - 1;
}

function calculate_u(circle1, circle2) 
{
	const center1 = circle1.p;
	const radius1 = circle1.r;

	const center2 = circle2.p;
	const radius2 = circle2.r;

	const HALF_PI = Math.PI / 2;
	const d = dist(center1, center2);
	const maxDistFactor = 50; // 2.5
	const maxDist = (radius1 + radius2) * maxDistFactor;
	let u1, u2;

	// No blob if a radius is 0
	// or if distance between the circles is larger than max-dist
	// or if circle2 is completely inside circle1
	if(radius1 === 0 || radius2 === 0 || d > maxDist || d <= Math.abs(radius1 - radius2)) {
		return [0, 0];
	}

	// Calculate u1 and u2 if the circles are overlapping
	if(d < radius1 + radius2) {
		let u1Calculated = Math.acos(
			(radius1 * radius1 + d * d - radius2 * radius2) / (2 * radius1 * d),
		);
		u1 = normalizeAngle(u1Calculated);
		let u2Calculated = Math.acos(
			(radius2 * radius2 + d * d - radius1 * radius1) / (2 * radius2 * d),
		);
		u2 = normalizeAngle(u2Calculated);
	} else { // Else set u1 and u2 to zero
		u1 = 0;
		u2 = 0;
	}

	return [u1, u2];
}

export function checkMapAndInsert(obj, mapName, key, value)
{
  if(obj[mapName] === undefined) obj[mapName] = new Map();

  obj[mapName].set(key, value);
}

function circleArcPath(p4, escaped, r) 
{
	return 'A' + r + ' ' + r + ' ' + 0 + ' ' + (escaped ? 1 : 0) + 0 + ' ' + p4.x + ' ' + p4.y + ' ';
}

function circles_to_vector_points(circles) 
{
	return circles.map(circle => {
		let coords = [circle.p.x, circle.p.y];
		coords.id = circle.id;
		return coords;
	});
}

export const CollectionMapNames = {
  metaballCorner : "metaballCorner",
  lobe : "lobe",
  lobeColor : "lobeColor"
};

function cubic1Path(p3, h1, h3) {
	return 'C' + h1.x + ' ' + h1.y + ', ' + h3.x + ' ' + h3.y + ', ' + p3.x + ' ' + p3.y + ' ';
}

function dist(p1, p2) 
{
	return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
}

function dsq(a, b) 
{
	const dx = a[0] - b[0];
	const dy = a[1] - b[1];

	return dx * dx + dy * dy;
}

function flatten_items_steps(nodes)
{
  const flattened_steps = [];

  for(let i = 0; i < nodes.length; ++i)
  {
		const node = nodes[i];

		for(let j = 0; j < node.steps.length; ++j) 
    {
			const step = node.steps[j];

			const item = {
				id: step.id,
				x: node.x,
				y: node.y,

				r: step.r,
				steps_length: node.steps.length,
				step: step,

				collections: node.attributes.collections,
				first_elem: step.first_elem,
				last_elem: step.last_elem,
				n_steps: step.n_steps,
				first_publication: step.first_publication,
				generico_non_terrestre: step.generico_non_terrestre,
				generico_terrestre: step.generico_terrestre,
				inventato: step.inventato,
				no_ambientazione: step.no_ambientazione,
				nominato_non_terrestre: step.nominato_non_terrestre,
				nominato_terrestre: step.nominato_terrestre,

				nebbia_normalizzata: step.nebbia_normalizzata,
				cancellazione_normalizzata: step.cancellazione_normalizzata,

				nebbia: step.nebbia,
				cancellazione: step.cancellazione,

				norma_pct_caratteri_nebbia_cancellazione: step.norma_pct_caratteri_nebbia_cancellazione,

				nebbia_words_ratio: step.nebbia_words_ratio,
				cancellazione_words_ratio: step.cancellazione_words_ratio,
				dubitative_ratio: step.dubitative_ratio
			};

			flattened_steps.push(item);
		}
  }

  return flattened_steps;
}

function getCircleJoint2(
	circle1,
	circle2,
	v)  
{
	const angleBetweenCenters = angle(circle1.p, circle2.p);
	const distanceBetweenCenters = dist(circle1.p, circle2.p);

	const maxSpreadCalculated = Math.acos((circle1.r - circle2.r) / distanceBetweenCenters);
	const maxSpread = normalizeAngle(maxSpreadCalculated);
	const spread = maxSpread * circle1.r / (circle1.r + circle2.r) * 1.1;

	const jointAngle = normalizeAngle(angleBetweenCenters - spread);

	const joint = getCirclePoint(circle1.p, jointAngle, circle1.r);

	return joint;
}

function getCircleJoint3(
	circle1,
	circle2,
	v) 
{
	const angleBetweenCenters = angle(circle1.p, circle2.p);
	const distanceBetweenCenters = dist(circle1.p, circle2.p);

	const maxSpreadCalculated = Math.acos((circle1.r - circle2.r) / distanceBetweenCenters);
	const maxSpread = normalizeAngle(maxSpreadCalculated);
	const spread = maxSpread * circle1.r / (circle1.r + circle2.r) * 1.1;

	const jointAngle = normalizeAngle(angleBetweenCenters + spread);

	const joint = getCirclePoint(circle1.p, jointAngle, circle1.r);

	return joint;
}

function getCirclePoint(center, angle, radius) 
{
	return {
		x: center.x + Math.cos(angle) * radius,
		y: center.y - Math.sin(angle) * radius,
		center: center,
		angle: normalizeAngle(angle),
		radius: radius
	};
}

function metaball(
	predecessorCircle,
	centralCircle,
	successorCircle,
	handleSize = 2.4,
	v = 0.5) 
{
	// console.log("metaball()");
	// console.log(predecessorCircle.id + " -> " + centralCircle.id + " -> " + successorCircle.id);
	const predecessorCentralCenterDistance = dist(predecessorCircle.p, centralCircle.p);

	const maxSpread = Math.cos((predecessorCircle.r - centralCircle.r) / predecessorCentralCenterDistance);

	const predecessorCentral_u_values = calculate_u(predecessorCircle, centralCircle);

	const u1 = predecessorCentral_u_values[0];

	const angleBetweenPredecessorCentralCenters = angle(predecessorCircle.p, centralCircle.p);

	// Angles for the points
	const angle1 = angleBetweenPredecessorCentralCenters + u1 + (maxSpread - u1) * v;

	let centralSuccessor_u_values = calculate_u(centralCircle, successorCircle);

	let u2 = predecessorCentral_u_values[1];

	const angleBetweenCentralSuccessorCenters = angle(centralCircle.p, successorCircle.p);

	const angle3 = normalizeAngle(-(angleBetweenPredecessorCentralCenters + Math.PI - u2 - (Math.PI - u2 - maxSpread) * v));


const angleBetweenCentralPredecessorCenters = angle(centralCircle.p, predecessorCircle.p);

const externalAngle = angleBetweenCentralPredecessorCenters - angleBetweenCentralSuccessorCenters;
const externalAngleIsConcave = Math.abs(externalAngle) < Math.PI;
// console.log("externalAngleIsConcave : " + externalAngleIsConcave);

	// Point locations
	const p1 = getCircleJoint2(predecessorCircle, centralCircle, v);

	const p3 = getCircleJoint3(centralCircle, predecessorCircle, v);

	const p4 = getCircleJoint2(centralCircle, successorCircle, v);

	// Define handle length by the distance between both ends of the curve
	const totalRadius = predecessorCircle.r + centralCircle.r;

	const d2Base = Math.min(v * handleSize, dist(p1, p3) / totalRadius);

	const HALF_PI = Math.PI / 2;

	// Handle locations
	const h1 = getCirclePoint(p1, HALF_PI + p1.angle, predecessorCircle.r);

	const h3 = getCirclePoint(p3, p3.angle - HALF_PI, centralCircle.r);

	const p3_p4_angle = normalizeAngle(p4.angle - p3.angle);
	const check_p3_p4_angle = p3_p4_angle > Math.PI;
	// console.log("p3_p4_angle : " + p3_p4_angle);
	// console.log(" > pi : " + check_p3_p4_angle);
	return metaballArc(p1, p3, p4, h1, h3, p3_p4_angle > Math.PI, p3_p4_angle > (Math.PI * 1.5), centralCircle.r);
}

function metaballArc(p1, p3, p4, h1, h3, largeArc, wrappingArc, r) 
{
	const s =
		wrappingArc ?
		'M' + p1.x + ' ' + p1.y + ' ' +
		cubic1Path(p3, h1, h3) :
		'M' + p1.x + ' ' + p1.y + ' ' +
		cubic1Path(p3, h1, h3) +
		circleArcPath(p4, largeArc, r);

	return s;
}

function minIndex(values, valueof) 
{
	let min;
	let minIndex = -1;
	let index = -1;

	if(valueof === undefined) 
  {
		for(const value of values) 
    {
			++index;

			if(
        value != null &&
				(min > value || (min === undefined && value >= value))) 
      {
				min = value; 
        minIndex = index;
			}
		}
	} 
  else 
  {
		for(let value of values) 
    {
			if(
        (value = valueof(value, ++index, values)) != null &&
				(min > value || (min === undefined && value >= value))) 
      {
				min = value; 
        minIndex = index;
			}
		}
	}

	return minIndex;
}

function normalizeAngle(angle) 
{
	if(angle < 0) return normalizeNegativeAngle(angle);
	else return normalizePositiveAngle(angle);
}

function normalizeNegativeAngle(angle) 
{
	while(angle < -Math.PI * 2) 
  {
		angle += Math.PI;
	}

	return 2 * Math.PI + angle;
}

function normalizePositiveAngle(angle) 
{
	while(2 * Math.PI < angle) 
  {
		angle -= 2 * Math.PI;
	}

	return angle;
}

function pointsBarycenter(points) 
{
	const barycenter = {
		x: points.reduce((p1, p2) => ({ x: p1.x + p2.x })).x / points.length,
		y: points.reduce((p1, p2) => ({ y: p1.y + p2.y })).y / points.length
	};

	return barycenter;
}

export function prepareMetaballData(
  json_nodes, 
  collection, 
  metaballWantedCoves)
{
	const flattened_steps = flatten_items_steps(json_nodes);

	const hillBases = flattened_steps
		.filter(function(d) {
			return d.first_elem && d.collections.includes(collection.id);
		});

	const metaballLineBaseSeparation = 30;
	const metaballLineStepSeparation = 30;

	const hillBase_circles = hillBases.map(hillBase => ({
		p: { x: hillBase.x, y: hillBase.y },
		r: hillBase.r + metaballLineBaseSeparation + metaballLineStepSeparation * (hillBase.collections.length - 1 - hillBase.collections.indexOf(collection.id)),
		color: "#5151fc'",
		step: hillBase.step,
		id: hillBase.id
	}));

	const vertex_array = circles_to_vector_points(hillBase_circles);

	const alpha = 1000000; //150 * scale;
	const asq = alpha * alpha;

	const voronoi = d3.voronoi();

	const mesh = voronoi
		.triangles(vertex_array)
		.filter(
			function(t) {
				return (
					dsq(t[0], t[1]) < asq &&
					dsq(t[0], t[2]) < asq &&
					dsq(t[1], t[2]) < asq);
			});

  let boundary_points = boundary2(mesh);

  const border_points = boundary_points[0].slice(0, boundary_points[0].length - 1);

	if(!borderOrientationIsCounterclockwise(border_points)) 
  {
		boundary_points[0] = boundary_points[0].reverse();
	}

	if(metaballWantedCoves)
		boundary_points = addWantedCoves(vertex_array, boundary_points, collection.concavityTolerance);

	if(boundary_points.length == 0) return;

	const point_circle_map = new Map();

	for(let i = 0; i < hillBase_circles.length; ++i) 
  {
		point_circle_map.set(vertex_array[i], hillBase_circles[i]);
	}

	const ordered_boundary_circles = boundary_points[0]
		.slice(0, boundary_points_count(boundary_points))
		.map(point => point_circle_map.get(point));

	const nCirclesToBeDrawn = ordered_boundary_circles.length;
//			let nCirclesToBeDrawn = 1;

	renderMetaballLogically(collection, ordered_boundary_circles, nCirclesToBeDrawn);  
}

function renderMetaballLogically(collection, hillBaseCircles, nCirclesToBeDrawn) 
{
	const nCircles = hillBaseCircles.length;

	for(let i = 0; i < nCirclesToBeDrawn; ++i) {
		let predecessorCircle = hillBaseCircles[i == 0 ? nCircles - 1 : i - 1];

		const centralCircle = hillBaseCircles[i];

		const successorCircle = hillBaseCircles[i < nCircles - 1 ? i + 1 : 0];

		const lobe = metaball(predecessorCircle, centralCircle, successorCircle);

		checkMapAndInsert(centralCircle.step, CollectionMapNames.metaballCorner, collection.id, true);
		checkMapAndInsert(centralCircle.step, CollectionMapNames.lobe, collection.id, lobe);
		checkMapAndInsert(centralCircle.step, CollectionMapNames.lobeColor, collection.id, collection.c);
		centralCircle.step.x = centralCircle.p.x;
		centralCircle.step.y = centralCircle.p.y;
	}
}

function vectorPoint_to_namedCoordPoint(point) 
{
	return { x: point[0], y: point[1] };
}
