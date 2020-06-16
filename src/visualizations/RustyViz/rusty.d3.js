import * as d3 from 'd3';
import {ShapeInfo, Intersection} from "kld-intersections";
// import {ShapeInfo, Intersection} from "../../../node_modules/kld-intersections/dist/index-esm.js";

const V = {};
export default V;

// const combinations_arr =    [   "come_negazione", "come_esitazione", "come_riformulazione",
//                                 "cosa_negazione", "cosa_esitazione", "cosa_riformulazione",
//                                 "senso_negazione", "senso_esitazione", "senso_riformulazione"
//                             ]

let width, height, fontSize=10, strokeWidth=0.5, annotationsFontSize=12, annotationsStrokeWidth=1,
    svg, g1, g2, g3, g4, length, combinations, label,
    // k=d3.scaleLinear().range([-3500,3500]).domain([-1,1]),
    // r=d3.scalePow().exponent(0.5).range([0,40]).domain([0,458335]),
    col_macrocategorie = d3.scaleOrdinal().range(['#FFD93B', '#10BED2', '#FF3366']).domain(['cosa','come','senso']),
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
                .scaleExtent([0.5, 100])
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
    g2 = g1.append('g').attr('transform','translate('+width/2+','+height/2+')');
    g3 = g1.append('g').attr('transform','translate('+width/2+','+height/2+')');
    g4 = g1.append('g').attr('transform','translate('+width/2+','+height/2+')');
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
    const annotations=d3.select(incomingSVG).select('#annotazioni').attr('transform','translate('+(-2740/2)+','+(-1568/2)+')');
    g3.node().appendChild(annotations.node());
    
    // options.data = options.data.filter(d=>d.id==='V021'||d.id==='V010'||d.id==='V018')
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
            .attr('fill',d=>d.perc_dubbio>=minPerc?'rgba(255,255,255,0.5)':'rgba(255,255,255,0.25)')
            .attr('stroke',d=>d.perc_dubbio>=minPerc?'none':'#fff')
            .attr('stroke-width',strokeWidth)
            .attr('r',d=>d.r)
            .attr('cx',d=>d.x)
            .attr('cy',d=>d.y)
            .merge(length)
            .on('click',function(d){
                if (d.perc_dubbio>=minPerc) {
                   toggleMetaball(d); 
                }
            });

    combinations=combinations.data(reducedData, d=>d.id);
    combinations.exit().remove();
    combinations=combinations.enter().append('g')
        .classed('combinations',true)
        .attr('id',d=>'combinations-'+d.id)
        .merge(combinations)
        .attr('fill',d=>d.color)
        .attr('transform',d=>'translate('+d.x+','+d.y+')')
        .on('click',function(d){
            toggleMetaball(d);
        });

    combinations.selectAll('path').data(d=>[d.combinations])
        .enter().append('path')
            .attr('d',function(d){return drawMetaball(d, this.parentNode)});

    combinations.selectAll('.circle-combination').data(d=>d.combinations)
        .enter().append('circle')
            .classed('circle-combination',true)
            // .attr('stroke','blue')
            // .attr('fill','none')
            .attr('display','none')
            .attr('stroke-width',0.1)
            .attr('r',d=>d.r)
            .attr('cx',d=>d.x)
            .attr('cy',d=>d.y);
    
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

function toggleMetaball(data){
    const color=data.color;
    data.state=data.state==='metaball'?'matrix':'metaball';
    const this_combination = combinations.filter(d=>d.id===data.id);
    if (data.state==='matrix') {
        this_combination.select('path').attr('display','none');
        this_combination.selectAll('circle')
            .attr('display','block')
            .transition()
                .duration(350)
                    .attr('cx',d=>d.mx)
                    .attr('cy',d=>d.my)
                    .attr('fill',d=>col_macrocategorie(d.type.split('_')[0]));    
    } else {
        this_combination.selectAll('circle')
            .transition()
                .duration(350)
                    .attr('cx',d=>d.x)
                    .attr('cy',d=>d.y)
                    .attr('fill',color);
            
            setTimeout( ()=>{
                this_combination.select('path').attr('display','block');
                this_combination.selectAll('circle').attr('display','none');
            }, 350);
    }
}

function interpolateColor(d) {
    const tot_cosa  = Number(d["cosa_negazione"] + Number(d["cosa_esitazione"]) + Number(d["cosa_riformulazione"]));
    const tot_come  = Number(d["come_negazione"] + Number(d["come_esitazione"]) + Number(d["come_riformulazione"]));
    const tot_senso = Number(d["senso_negazione"] + Number(d["senso_esitazione"]) + Number(d["senso_riformulazione"]));
    const col_r =   tot_cosa * d3.color(col_macrocategorie('cosa')).r
                +   tot_come * d3.color(col_macrocategorie('come')).r
                +   tot_senso * d3.color(col_macrocategorie('senso')).r;
    const col_g =   tot_cosa * d3.color(col_macrocategorie('cosa')).g
                +   tot_come * d3.color(col_macrocategorie('come')).g
                +   tot_senso * d3.color(col_macrocategorie('senso')).g;
    const col_b =   tot_cosa * d3.color(col_macrocategorie('cosa')).b
                +   tot_come * d3.color(col_macrocategorie('come')).b
                +   tot_senso * d3.color(col_macrocategorie('senso')).b;
    return d3.rgb(col_r, col_g, col_b).toString();
}

/**
 * 
 * @param {SVGTextElement} el the text node where to append tspans
 * @param {string} text the text you wanna truncate
 * @param {number} length must be an integer
 * @param {number} fade amount of characters to fade out
 */
function truncateLabel(el, text, length=undefined, fade=3) {
    const opacity = d3.scaleLinear().range([1,0]);
    let tspans;
    if (length) {
        tspans=text.substring(length-fade,length).split('');
        text=text.substring(0,length-fade);
        opacity.domain([0,fade]);
    }
    const txt_el = d3.select(el).text(text);
    if (!tspans) return;
    let tspan = txt_el.selectAll('tspan');
    tspan = tspan.data(tspans,(d,i)=>d+''+i);
    tspan.exit().remove();
    tspan=tspan.enter().append('tspan')
        .text(d=>d)
        .merge(tspan)
        .style('opacity',(d,i)=>length?opacity(i):1);
}

function drawMetaball(data, parent){
    //  Init the path
    let metaball='';
    //  Return a simple circle in case we only have one circle
    if (data.length===1)
    {
        metaball+=`
        M ${data[0]['x']-data[0]['r']},${data[0]['y']} 
        a ${data[0]['r']},${data[0]['r']} 0 1, 0 ${data[0]['r']*2},0 
        a ${data[0]['r']},${data[0]['r']} 0 1, 0 ${-data[0]['r']*2},0 
        Z`;
        metaball=metaball.replace(/\n/g,'').replace(/\s\s/g,'');
        return metaball;
    }
    else if (data.length===2) 
    {
        //  Add "c" property (center) to all data elements
        data.forEach(d=>d.c=[d.x,d.y]);
        const pointsAndHandles1=curvesBetweenCircles(data[0].r, data[1].r, data[0].c, data[1].c);
        const pointsAndHandles2=curvesBetweenCircles(data[1].r, data[0].r, data[1].c, data[0].c);
        
        //  set the starting point of the path
        metaball+=`M ${pointsAndHandles1.p[1][0]},${pointsAndHandles1.p[1][1]} `;

        //  1st Bezier Curve
        metaball+=`
        C ${pointsAndHandles1.h[1][0]},${pointsAndHandles1.h[1][1]} 
        ${pointsAndHandles1.h[3][0]},${pointsAndHandles1.h[3][1]} 
        ${pointsAndHandles1.p[3][0]},${pointsAndHandles1.p[3][1]} `;
        
        //  1st arc
        metaball+=`
        A ${pointsAndHandles1.r},${pointsAndHandles1.r} 
        0 1,1 
        ${pointsAndHandles2.p[1][0]},${pointsAndHandles2.p[1][1]} `;
        
        //  2ndt Bezier Curve
        metaball+=`
        C ${pointsAndHandles2.h[1][0]},${pointsAndHandles2.h[1][1]} 
        ${pointsAndHandles2.h[3][0]},${pointsAndHandles2.h[3][1]} 
        ${pointsAndHandles2.p[3][0]},${pointsAndHandles2.p[3][1]} `;
        
        //  2nd arc
        metaball+=`
        A ${pointsAndHandles2.r},${pointsAndHandles2.r} 
        0 1,1 
        ${pointsAndHandles1.p[1][0]},${pointsAndHandles1.p[1][1]} `;
        
        metaball=metaball.replace(/\n/g,'').replace(/\s\s/g,'');
        return metaball;
    }
    else
    {
        //  Add "c" property (center) to all data elements
        data.forEach(d=>d.c=[d.x,d.y]);
        //  Init subsetData
        let subsetData = data;
        //  Can't do convex hull with less than 3 points
        if (data.length>2)
        { 
            //  Calculate convex hull
            const convex_hull = d3.polygonHull(data.map(d=>([d.x,d.y])));
            //  Subset the data according to convex hull
            subsetData = convex_hull.reverse().map(d=>{
                const elm=data.find(dd=>dd.x===d[0]&&dd.y===d[1]);
                return elm;
            });
        }
        //  Save segments
        metaball=metaballSegments(subsetData);

        //  Do a second iteration:
        //  check for intersections with circles not part of subsetData
        const check_intersections = data.filter(d=>subsetData.indexOf(d)<0);

        for (let i=0; i<check_intersections.length; i++){
            //  Look for intersections
            const this_circle = check_intersections[i];

            var pathToSample = document.createElementNS('http://www.w3.org/2000/svg','path');
            pathToSample.setAttribute('d',metaball);

            const length = pathToSample.getTotalLength();
            const rate = 50;
            const unit = length/rate;
            const sampledPoints = [];
            for (let j=0; j<rate; j++) {
                sampledPoints.push(pathToSample.getPointAtLength(unit*j))
            }

            const polygon = ShapeInfo.polygon(sampledPoints);
            // const path = ShapeInfo.path(metaball);   //  looks like it has a bug
            const circle = ShapeInfo.circle({center: {x:this_circle.x, y:this_circle.y}, radius:this_circle.r});
            
            const intersections_data = Intersection.intersect(polygon, circle);
            
            //  If true
            if (intersections_data.status==="Intersection") {
                //  Identify the two adjacent circles
                const adjacent_circles = intersections_data.points.map(d=>{
                    const subset_with_distances = subsetData.map( (dd,i)=>{
                        const a = d.x - dd.x;
                        const b = d.y - dd.y;
                        dd.distance =  Math.sqrt( a*a + b*b );
                        dd.position=i;
                        return dd;
                    }).sort((a,b)=>a.distance-b.distance);

                    return subset_with_distances[0];
                })
                
                //  Insert the new circle between its two adjacent mates
                if ( (adjacent_circles[0].position===0&&adjacent_circles[1].position===subsetData.length-1) || (adjacent_circles[1].position===0&&adjacent_circles[0].position===subsetData.length-1) ) {
                    subsetData.push(this_circle);
                }
                else
                {
                    const append_after = adjacent_circles.sort((a,b)=>a.position-b.position)[0].position;
                    subsetData.splice(append_after+1, 0, this_circle);
                }
                metaball=metaballSegments(subsetData);
            }                   
        }
    }
    return metaball;
    }

function metaballSegments(incomingData){
    let pathSegments='';
    const subsetData = Array.from(incomingData);
    //  calculate metaball segments
    for (let i=0; i<subsetData.length; i++) {
        const circles = subsetData.slice(0,3);
        subsetData.push(subsetData.shift());
        //  calculate points and handles for metaball path
        const pointsAndHandles=curvesBetweenCircles(circles[0].r, circles[1].r, circles[0].c, circles[1].c);
        
        //  calculate for the next one, to draw arch (this could be optimized)
        const next=curvesBetweenCircles(circles[1].r, circles[2].r, circles[1].c, circles[2].c);

        //  set the starting point of the path ONLY in case it is the first circle
        if (i===0) pathSegments+=`M ${pointsAndHandles.p[1][0]},${pointsAndHandles.p[1][1]} `;

        //  Bezier Curve
        pathSegments+=`
        C ${pointsAndHandles.h[1][0]},${pointsAndHandles.h[1][1]} 
        ${pointsAndHandles.h[3][0]},${pointsAndHandles.h[3][1]} 
        ${pointsAndHandles.p[3][0]},${pointsAndHandles.p[3][1]}`;
        
        const p1 = {x:pointsAndHandles.p[3][0],y:pointsAndHandles.p[3][1]};
        const p2 = { x:next.p[1][0], y:next.p[1][1] };
        const c = { x:circles[1].x, y:circles[1].y };
            
        let ang = Math.atan2(p2.y-c.y, p2.x-c.x) - Math.atan2(p1.y-c.y, p1.x-c.x)
        ang=ang<0?ang+2*Math.PI:ang;
            
        const largeArchFlag = ang>=Math.PI?1:0;
        const sweepFlag=1;
        
        // Arc
        pathSegments+=`A ${next.r1},${next.r1}, 0 ${largeArchFlag},${sweepFlag}, ${next.p[1][0]}, ${next.p[1][1]}`
    }
    //  close the path
    pathSegments+=' Z';
    pathSegments=pathSegments.replace(/\n/g,'').replace(/\s\s/g,'');
    return pathSegments;
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

/**
 * Other functions
 */

/**
 * 
 * @param {Object} p1 is the first point {x: number, y: number}
 * @param {*} p2 is the second point {x: number, y: number}
 */
function distance(p1,p2){
    const a = p1.x - p2.x;
    const b = p1.y - p2.y;
    return Math.sqrt( a*a + b*b );
  }