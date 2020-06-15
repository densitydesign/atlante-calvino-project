import * as d3 from 'd3';
import {ShapeInfo, Intersection} from "kld-intersections";

const V = {};
export default V;

// const combinations_arr =    [   "come_negazione", "come_esitazione", "come_riformulazione",
//                                 "cosa_negazione", "cosa_esitazione", "cosa_riformulazione",
//                                 "senso_negazione", "senso_esitazione", "senso_riformulazione"
//                             ]

let width, height, fontSize=6, strokeWidth=0.5, annotationsFontSize=12, annotationsStrokeWidth=1,
    svg, g1, g2, g3, length, combinations, label,
    // k=d3.scaleLinear().range([-3500,3500]).domain([-1,1]),
    // r=d3.scalePow().exponent(0.5).range([0,40]).domain([0,458335]),
    col_macrocategorie = d3.scaleOrdinal() .range(['#FFD93B', '#10BED2', '#FF3366']).domain(['cosa','come','senso']),
    matrix_grid = {
        x: d3.scalePoint().range([-2/5,2/5]).domain(['negazione','esitazione','riformulazione']),
        y: d3.scalePoint().range([-2/5,2/5]).domain(['cosa','come','senso'])
    },
    minPerc=2.5;
/**
 * 
 * @param {Obkect}      options             initialization options
 * @param {HTML Node}   options.container   the container of the SVG element
 * @param {number}      options.width       the max width of the visualization
 * @param {number}      options.height      the max height of the visualization
 * @param {Array}       options.data        the array of data
 */
V.init = async (options)=>{
    width = options.width;
    height = options.height;
    svg = d3.select(options.container).append('svg')
            .attr('width',width)
            .attr('height',height)
            .call(d3.zoom()
                .extent([[0, 0], [width, height]])
                .scaleExtent([0.5, 4])
                .on("zoom", ()=>{
                    g1.attr("transform", d3.event.transform);
                    length.filter(d=>d.perc_dubbio<minPerc).attr('stroke-width',strokeWidth/d3.event.transform.k);
                    g3.selectAll('text').attr("font-size",annotationsFontSize/d3.event.transform.k);
                    g3.selectAll('path').attr("stroke-width",annotationsStrokeWidth/d3.event.transform.k);
                    if (d3.event.transform.k>=2){
                        label.attr('display','block').attr("font-size",fontSize/d3.event.transform.k);
                    } else {
                        label.attr('display','none')
                    }
                }));
    g1 = svg.append('g');
    g2 = g1.append ('g').attr('transform','translate('+width/2+','+height/2+')');
    g3 = g1.append ('g').attr('transform','translate('+width/2+','+height/2+')');
    g2.append('rect')
        .attr('stroke','blue')
        .attr('fill','none')
        .attr('width',width*2)
        .attr('height',height*2)
        .attr('x',-width)
        .attr('y',-height);
    length = g2.selectAll('.length');
    combinations = g2.selectAll('.combinations');
    label = g2.selectAll('.label');
    
    const incomingSVG = await d3.svg(process.env.PUBLIC_URL+'/cancellazione-annotazioni.svg');
    const annotations=d3.select(incomingSVG).select('#annotazioni').attr('transform','translate('+(-width)+','+(-height)+')');
    g3.node().appendChild(annotations.node());

    V.update({data:options.data});
}
/**
 * 
 * @param {Object}  options 
 * @param {Array}   options.data 
 */
V.update = (options)=>{
    const reducedData = options.data.filter(d=>{
        d.state='metaball';
        d.color=interpolateColor(d);
        d.x*=-1
        return d.perc_dubbio>=minPerc;
    });

    length=length.data(options.data, d=>d.id);
    length.exit().remove();
    length=length.enter().append('circle')
            .classed('length',true)
            .attr('id',d=>'length-'+d.id)
            .attr('fill',d=>d.perc_dubbio>=minPerc?'rgba(255,255,255,0.6)':'none')
            .attr('stroke',d=>d.perc_dubbio>=minPerc?'none':'#999')
            .attr('stroke-width',strokeWidth)
            .attr('r',d=>d.r)
            .attr('cx',d=>d.x)
            .attr('cy',d=>d.y)
            .merge(length);

    combinations=combinations.data(reducedData, d=>d.id);
    combinations.exit().remove();
    combinations=combinations.enter().append('g')
        .classed('combinations',true)
        .attr('id',d=>'combinations-'+d.id)
        .merge(combinations)
        .attr('fill',d=>d.color)
        .attr('transform',d=>'translate('+d.x+','+d.y+')')
        .on('click',d=>{
            console.log(d.state)
        });

    combinations.selectAll('path').data(d=>[d.combinations])
        .enter().append('path')
            .attr('d',d=>drawMetaball(d))

    // combinations.selectAll('path')
    //     .transition()
    //         .duration(1000)
    //         .attr('d',d=>drawMatrix(d))

    // combinations.selectAll('circle').data(d=>d.combinations)
    //     .enter().append('circle')
    //         .classed('combination',true)
    //         .attr('stroke','blue')
    //         .attr('fill','none')
    //         // .attr('display','none')
    //         .attr('r',d=>d.r)
    //         .attr('cx',d=>d.x)
    //         .attr('cy',d=>d.y);
    
    label = label.data(options.data, d=>d.id);
    label.exit().remove();
    label = label.enter().append('text')
            .classed('label',true)
            .merge(label)
            .attr('x',d=>d.x)
            .attr('y',d=>d.y)
            // .attr('text-anchor','middle')
            .attr('font-size',fontSize)
            .attr('display','none')
            .each(function(d){truncateLabel(this,d.title,8)})
            .on('mouseenter',function(d){truncateLabel(this,d.title)})
            .on('mouseleave',function(d){truncateLabel(this,d.title,8)});
}

function interpolateColor(d) {
    let col_r = 0;
    let col_g = 0;
    let col_b = 0;

    const tot_cosa = Number(d["cosa_negazione"] + Number(d["cosa_esitazione"]) + Number(d["cosa_riformulazione"]));
    const tot_come = Number(d["come_negazione"] + Number(d["come_esitazione"]) + Number(d["come_riformulazione"]));
    const tot_senso = Number(d["senso_negazione"] + Number(d["senso_esitazione"]) + Number(d["senso_riformulazione"]));

    col_r   =   tot_cosa * d3.color(col_macrocategorie('cosa')).r
            +   tot_come * d3.color(col_macrocategorie('come')).r
            +   tot_senso * d3.color(col_macrocategorie('senso')).r;

    col_g   =   tot_cosa * d3.color(col_macrocategorie('cosa')).g
            +   tot_come * d3.color(col_macrocategorie('come')).g
            +   tot_senso * d3.color(col_macrocategorie('senso')).g;

    col_b   =   tot_cosa * d3.color(col_macrocategorie('cosa')).b
            +   tot_come * d3.color(col_macrocategorie('come')).b
            +   tot_senso * d3.color(col_macrocategorie('senso')).b;

    return d3.rgb(col_r, col_g, col_b).toString();
}

/**
 * 
 * @param {SVGTextElement} el the text node where to append tspans
 * @param {string} text the text you wanna truncate
 * @param {number} length must be an integer
 */
function truncateLabel(el, text, length=undefined, fade=3) {
    const opacity = d3.scaleLinear().range([1,0]);
    if (length) {
        text=text.split('').splice(0,length);
        opacity.domain([length-fade,length]);
    }
    let tspan = d3.select(el).selectAll('tspan');
    tspan = tspan.data(text,(d,i)=>d+''+i);
    tspan.exit().remove();
    tspan=tspan.enter().append('tspan')
        .text(d=>d)
        .merge(tspan)
        .style('opacity',(d,i)=>length?opacity(i):1);
}

function drawPacked(d) {
    let segments='';
    for (let j=0; j<d.length; j++) {
        segments+=`
            M ${d[j]['x']-d[j]['r']},${d[j]['y']} 
            a ${d[j]['r']},${d[j]['r']} 0 1, 0 ${d[j]['r']*2},0 
            a ${d[j]['r']},${d[j]['r']} 0 1, 0 ${-d[j]['r']*2},0 
            Z 
        `
    }
    return segments.replace(/\n/g,'').replace(/\s\s/g,'');
}
function drawMatrix(d) {
    let segments='';
    for (let j=0; j<d.length; j++) {
        segments+=`
            M ${d[j]['mx']-d[j]['r']},${d[j]['my']}
            a ${d[j]['r']},${d[j]['r']} 0 1, 0 ${d[j]['r']*2},0
            a ${d[j]['r']},${d[j]['r']} 0 1, 0 ${-d[j]['r']*2},0
            Z
        `
    }
    return segments;
}

function drawMetaball(data, subset_data=undefined) {
    // console.log('metaball',data, subset_data);

    //  add "c" property to all data elements
    data.forEach(d=>d.c=[d.x,d.y]);

    //  only in first iteration
    if (!subset_data) {
        if (data.length===1) {
            return 'M0,0 Z'
        } else if (data.length===2) {
            return 'M0,0 Z'
        }
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
    metaball_path+='Z';

    // console.log(metaball_path)

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
        // console.log('do again',metaball_path)
        //  calcualte the metaball segments with the new circles array
        return drawMetaball(data, subset_data);
    } else {
        // console.log('export',metaball_path)
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