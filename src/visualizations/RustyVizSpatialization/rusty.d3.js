import * as d3 from 'd3';
import {ShapeInfo, Intersection} from "kld-intersections";

const V = {};
export default V;

const combinations_arr= [   "come_negazione", "come_esitazione", "come_riformulazione",
                            "cosa_negazione", "cosa_esitazione", "cosa_riformulazione",
                            "senso_negazione", "senso_esitazione", "senso_riformulazione"
                        ]

let width, height,
    svg, g1, g2, length, combinations,
    k=d3.scaleLinear().range([-3500,3500]).domain([-1,1]),
    r=d3.scalePow().exponent(0.5).range([0,40]).domain([0,458335]),
    matrix_grid = {
        x: d3.scalePoint().range([-2/5,2/5]).domain(['negazione','esitazione','riformulazione']),
        y: d3.scalePoint().range([-2/5,2/5]).domain(['cosa','come','senso'])
    },
    simulation=d3.forceSimulation()
        .force('x',d3.forceX(d=>k(d.mds_x)))
        .force('y',d3.forceY(d=>-k(d.mds_y)))
        .force('collide',d3.forceCollide(d=>{
            const k=d.length>200000?0.65:0.8;
            return (r(d.length2use)+1)*k
        }))
        .on('tick',()=>{
            length.attr('cx',d=>d.x).attr('cy',d=>d.y);
            combinations.attr('transform',d=>'translate('+d.x+','+d.y+')')
        })
        // .alphaMin(0.1)
        .alpha(1)
        .stop();
/**
 * 
 * @param {Obkect}          options             initialization options
 * @param {HTMLElement}     options.container   the container of the SVG element
 * @param {number}          options.width       the max width of the visualization
 * @param {number}          options.height      the max height of the visualization
 * @param {Array}           options.data        the array of data
 */
V.init = (options)=>{
    width = options.width;
    height = options.height;

    svg = d3.select(options.container).append('svg')
            .attr('width',width)
            .attr('height',height)
            .call(d3.zoom()
                .extent([[0, 0], [width, height]])
                .scaleExtent([0.5, 8])
                .on("zoom", ()=>{
                    g1.attr("transform", d3.event.transform);
                }));
    
    g1 = svg.append('g');
    g2 = g1.append ('g').attr('transform','translate('+width/2+','+height/2+')');
    length = g2.selectAll('.length');
    combinations = g2.selectAll('.combinations');

    for(let i=0; i<options.data.length; i++){
        const d = options.data[i];
        d.length2use=d3.max([Number(d.length), 10000]);
        d.perc_dubbio=Number(d.perc_dubbio);
        d.combinations=new Array();
        for(let ii=0; ii<combinations_arr.length; ii++) {
            const p = combinations_arr[ii];
            d[p]=Number(d[p])
            if (d[p]===0) continue; // skip this combinationi n case it is zero, we don't want any circle
            let obj={};
            obj['id']=d.id;
            obj.type=p;
            obj.percentage_combination = d[p];
            obj.r=r(obj.percentage_combination*(d.length2use/100*d.perc_dubbio));
            obj.mx = obj.x = matrix_grid.x(p.split('_')[1]) * r(d.length2use);
            obj.my = obj.y = matrix_grid.y(p.split('_')[0]) * r(d.length2use);
            d.combinations.push(obj);
        }
    }

    V.update({data:options.data});
}
/**
 * 
 * @param {Object}  options 
 * @param {Array}   options.data 
 */
V.update = (options)=>{
    const reducedData = options.data//.filter(d=>d.perc_dubbio>=2.5);
    length=length.data(reducedData);
    length.exit().remove();
    length=length.enter().append('circle')
            .attr('fill','rgba(255,255,255,0.6)')
            .attr('r',d=>{d.r=r(d.length2use);return d.r;})
            .merge(length);

    combinations=combinations.data(reducedData);
    combinations.exit().remove();
    combinations=combinations.enter().append('g')
        .classed('combinations',true)
        .attr('id',d=>d.id)
        .merge(combinations);

    combinations.selectAll('circle').data(d=>d.combinations).enter().append('circle')
            .classed('combination',true)
            .attr('fill','#dedede')
            .attr('r',d=>d.r)
            .attr('cx',d=>d.x)
            .attr('cy',d=>d.y);
            
    simulation.nodes(options.data)
        .alpha(1)
        .restart()
        .on('end',()=>{
            console.log('get combinations circles positions')
            for(let i=0; i<reducedData.length; i++){
                const innerSimulation=d3.forceSimulation(reducedData[i].combinations)
                    .force('x',d3.forceX())
                    .force('y',d3.forceY())
                    .force('collision',d3.forceCollide(d=>d.r))
                    .alpha(1)
                    // .alphaMin(0.1)
                    .restart()
                    .on('end',()=>{
                        console.log('end',reducedData[i].id)
                        console.log(options.data)
                        combinations
                            .selectAll('circle')
                                .attr('cx',d=>d.x)
                                .attr('cy',d=>d.y);

                        // combinations.selectAll('path').data(d=>[d.combinations])
                        //     .enter().append('path')
                        //         .attr('fill','none')
                        //         .attr('stroke','blue')
                        //         .attr('d',d=>{
                        //             const segments = drawMetaball(d);
                        //             if (!segments) {
                        //                 console.log(d[0].id, segments);
                        //                 console.log(d)
                        //             }
                        //             return segments;
                        //         });
                        
                    });
            }
        });
}

function drawMetaball(data, subset_data=undefined) {
    // console.log('all data',data);

    //  add "c" property to all data elements
    data.forEach(d=>d.c=[d.x,d.y]);

    //  only in first iteration
    if (!subset_data) {

        if (data.length>2){
           // calculate convex hull
            const convex_hull = d3.polygonHull(data.map(d=>([d.x,d.y])))

            // visual feedbacks
            // convex_hulls.selectAll('polygon').remove()
            // convex_hulls.append('polygon')
            //     .attr('points',convex_hull)
            //     .attr('fill','none')
            //     .attr('stroke','red');
            // console.log('convex hull points',convex_hull);

            // generate first metaball with circles whose center are used in the hull
            subset_data = convex_hull.reverse().map(d=>{
                const elm=data.find(dd=>dd.x===d[0]&&dd.y===d[1]);
                return elm;
            } ) 
        } else {
            console.log(data[0].id,data);
            return 'M0,0 Z'
        }
        
    }

    // console.log('subset data',subset_data);

    //  init the path
    let metaball_path='';
    for (let i=0; i<subset_data.length; i++) {
        const circles = subset_data.slice(0,3);
        subset_data.push(subset_data.shift());

        //  calculate points and handles for metaball path
        const pointsAndHandles=curvesBetweenCircles(circles[0].r, circles[1].r, circles[0].c, circles[1].c);
        //  calculate for the next one, to draw arch (this could be optimized)
        const next=curvesBetweenCircles(circles[1].r, circles[2].r, circles[1].c, circles[2].c);

        //  set the starting point of the path ONLY in case it is the first circle
        if (i===0) metaball_path+=`M ${pointsAndHandles.p[1][0]},${pointsAndHandles.p[1][1]} `;

        //  draw bezier curve and arc
        metaball_path+=`C ${pointsAndHandles.h[1][0]},${pointsAndHandles.h[1][1]} ${pointsAndHandles.h[3][0]},${pointsAndHandles.h[3][1]} ${pointsAndHandles.p[3][0]},${pointsAndHandles.p[3][1]}`
        metaball_path+=`A ${next.r1}, ${next.r1}, 1, 0, 1, ${next.p[1][0]}, ${next.p[1][1]}`
    }
    //  close the path
    metaball_path+='Z'

    // visual feedback
    // metaballs.selectAll('path').remove()
    // const metaball = metaballs.append('path')
    //     .attr('d',metaball_path)
    //     .attr('fill','none')
    //     .attr('stroke-width',2)
    //     .attr('stroke','blue');

    // circles not used to check for intersections
    const check_intersections = data.filter(d=>subset_data.indexOf(d)<0);
    // console.log('circles to check for intersections',check_intersections);

    let redo_metaball=false;

    for (let i=0; i<check_intersections.length; i++){
        const this_circle = check_intersections[i];
        // console.log('circle id', this_circle.id,' - ',this_circle);
        const path = ShapeInfo.path(metaball_path);
        const circle = ShapeInfo.circle([this_circle.x, this_circle.y], this_circle.r);
        const intersections_data = Intersection.intersect(path, circle);
        
        // console.log('intersection data',intersections_data);

        if (intersections_data.status==="Intersection") {
            redo_metaball=true;
            // intersections.append('g').selectAll('circle').data(intersections_data.points).enter().append('circle')
            //     .attr('r',2)
            //     .attr('cx',d=>d.x)
            //     .attr('cy',d=>d.y);

            //  add the circle to the array of elements that are used to generate the metaball, in the corrent position
            //  find the two adjacent circles

            const adjacent_circles = intersections_data.points.map(d=>{
                const subset_with_distances = subset_data.map( (dd,i)=>{
                    const a = d.x - dd.x;
                    const b = d.y - dd.y;
                    dd.distance =  Math.sqrt( a*a + b*b );
                    dd.index = i;
                    return dd;
                }).sort((a,b)=>a.distance-b.distance);
                
                return subset_with_distances[0];
            })

            // console.log(adjacent_circles);
            // console.log(subset_data.map(d=>d.id).join(', '));



            if ( (adjacent_circles[0].index===0&&adjacent_circles[1].index===subset_data.length-1) || (adjacent_circles[1].index===0&&adjacent_circles[0].index===subset_data.length-1) ) {
                subset_data.push(this_circle);
            } else {
                const append_after = adjacent_circles.sort((a,b)=>a.index-b.index)[0].index;
                subset_data.splice(append_after+1, 0, this_circle);
            }

            // console.log(subset_data.map(d=>d.id).join(', '));
            
        }                   
        
    }
    if (redo_metaball) {
        //  calcualte the metaball segments with the new circles array
        drawMetaball(data, subset_data);
    } else {
        return metaball_path;
    }
}



/**
 * Based on Metaball script by SATO Hiroyuki
 * http://shspage.com/aijs/en/#metaball
 */
function curvesBetweenCircles(radius1, radius2, center1, center2, handleSize = 2.4, v = 0.5) {
const HALF_PI = Math.PI / 2;
const d = dist(center1, center2);
let u1 = 0, u2 = 0;

if (radius1 === 0 || radius2 === 0 || d <= Math.abs(radius1 - radius2)) {
    return null;
}

if (d < radius1 + radius2) {
    u1 = Math.acos(
    (radius1 * radius1 + d * d - radius2 * radius2) / (2 * radius1 * d),
    );
    u2 = Math.acos(
    (radius2 * radius2 + d * d - radius1 * radius1) / (2 * radius2 * d),
    );
}

// All the angles
const angleBetweenCenters = angle(center2, center1);
const maxSpread = Math.acos((radius1 - radius2) / d);

const angle1 = angleBetweenCenters + u1 + (maxSpread - u1) * v;
const angle2 = angleBetweenCenters - u1 - (maxSpread - u1) * v;
const angle3 = angleBetweenCenters + Math.PI - u2 - (Math.PI - u2 - maxSpread) * v;
const angle4 = angleBetweenCenters - Math.PI + u2 + (Math.PI - u2 - maxSpread) * v;

// Points
const p1 = getVector(center1, angle1, radius1);
const p2 = getVector(center1, angle2, radius1);
const p3 = getVector(center2, angle3, radius2);
const p4 = getVector(center2, angle4, radius2);

// Define handle length by the
// distance between both ends of the curve
const totalRadius = radius1 + radius2;
const d2Base = Math.min(v * handleSize, dist(p1, p3) / totalRadius);

// Take into account when circles are overlapping
const d2 = d2Base * Math.min(1, d * 2 / (radius1 + radius2));

const r1 = radius1 * d2;
const r2 = radius2 * d2;

const h1 = getVector(p1, angle1 - HALF_PI, r1);
const h2 = getVector(p2, angle2 + HALF_PI, r1);
const h3 = getVector(p3, angle3 + HALF_PI, r2);
const h4 = getVector(p4, angle4 - HALF_PI, r2);

return {
    p : [ p1, p2, p3, p4 ],
    h : [ h1, h2, h3, h4 ],
    escaped : d > radius1,
    r : radius2,
    r1 : radius1
}
}

/**
 * Utils
 */
function moveTo([x, y] = [0, 0], element) {
element.setAttribute('cx', x);
element.setAttribute('cy', y);
}

function line([x1, y1] = [0, 0], [x2, y2] = [0, 0], element) {
element.setAttribute('x1', x1);
element.setAttribute('y1', y1);
element.setAttribute('x2', x2);
element.setAttribute('y2', y2);
}

function dist([x1, y1], [x2, y2]) {
return ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** 0.5;
}

function angle([x1, y1], [x2, y2]) {
return Math.atan2(y1 - y2, x1 - x2);
}

function getVector([cx, cy], a, r) {
return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}