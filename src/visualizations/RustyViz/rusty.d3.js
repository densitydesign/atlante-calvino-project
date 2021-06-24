import * as d3 from 'd3';
import annotazioni from "./cancellazione-annotazioni.svg";
import annotazioniEN from "./cancellazione-annotazioni_en.svg";
import styles from './RustyViz.module.css';

const V = {};
export default V;

let width, height, fontSize=12, strokeWidth=0.5, annotationsFontSize=12, annotationsStrokeWidth=1, zoom,
    svg, g0, g1, g2, g3, g4, length, combinations, label,
    col_macrocategorie = d3.scaleOrdinal().range(['#FFD93B', '#10BED2', '#FF3366']).domain(['cosa','come','senso']),
    col_manifestazioni = d3.scaleLinear().range(['#ffffff','#5151FC']).domain([0,1]),
    minPerc=0;

let riformStroke = d3.scaleLinear().range(['#999','#5151FC']).domain([0,1])
let riformStrokeWidth = d3.scaleLinear().range(['0.5','2']).domain([0,1])

/**
 *
 * @param {Obkect}      options             initialization options
 * @param {HTML Node}   options.container   the container of the SVG element
 * @param {number}      options.width       the max width of the visualization
 * @param {number}      options.height      the max height of the visualization
 * @param {Array}       options.data        the array of data
 * @param {Function}    options.onSelection    function that adds the selected element to the searchedItems
 */
V.init = async (options)=>{
    width = options.width;
    height = options.height;
    svg = d3.select(options.container).append('svg')
            .attr('width',width)
            .attr('height',height)
    
    zoom=d3.zoom()
        .extent([[0, 0], [width, height]])
        .scaleExtent([0.75, 100])
        .on("zoom", ()=>{
            g1.attr("transform", d3.event.transform);
            length.attr('stroke-width',strokeWidth/d3.event.transform.k);
            g3.selectAll('path,line').attr("stroke-width",annotationsStrokeWidth/d3.event.transform.k);
            if (d3.event.transform.k>=1.75){
                label.attr('display','block').attr("font-size",fontSize/d3.event.transform.k);
                g3.attr('display','none')
            } else {
                label.attr('display','none');
                g3.attr('display','block')
            }
        });
    svg.call(zoom);
    //for page items volumes
    g0 = svg.append('g').classed('volumes',true);

    g0.append('rect')
        .attr('x',0)
        .attr('y',0)
        .attr('width',width)
        .attr('height',height)
        .attr('fill','#faefe8')

    g0.append('line')
        .attr('x1',226.7717)
        .attr('y1',0)
        .attr('x2',226.7717)
        .attr('y2','100%')
        .attr('stroke','black')
        .attr('stroke-width','0.5px')

    g0.append('line')
        .attr('x1',793.7005)
        .attr('y1',0)
        .attr('x2',793.7005)
        .attr('y2','100%')
        .attr('stroke','grey')
        .attr('stroke-width','0.5px')

    g0.append('line')
        .attr('x1',807.8738)
        .attr('y1',0)
        .attr('x2',807.8738)
        .attr('y2','100%')
        .attr('stroke','black')
        .attr('stroke-width','0.5px')

    g0.append('line')
        .attr('x1',822.047)
        .attr('y1',0)
        .attr('x2',822.047)
        .attr('y2','100%')
        .attr('stroke','black')
        

    g0.append('line')
        .attr('x1',836.2202)
        .attr('y1',0)
        .attr('x2',836.2202)
        .attr('y2','100%')
        .attr('stroke','black')
        .attr('stroke-width','0.5px')
        
    g0.append('line')
        .attr('x1',850.3935)
        .attr('y1',0)
        .attr('x2',850.3935)
        .attr('y2','100%')
        .attr('stroke','grey')
        .attr('stroke-width','0.5px')

    g0.append('line')
        .attr('x1',1417.322)
        .attr('y1',0)
        .attr('x2',1417.322)
        .attr('y2','100%')
        .attr('stroke','black')
        .attr('stroke-width','0.5px')

    // original of viz
    g1 = svg.append('g');
    g2 = g1.append('g').attr('transform','translate('+width/2+','+height/2+')')
    g3 = g1.append('g').attr('transform','translate('+width/2+','+height/2+')')
            // animation for the info-sheet
            // .style('opacity',0);
    g4 = g1.append('g').attr('transform','translate('+width/2+','+height/2+')');

    // g2.append('rect')
    //     .attr('stroke','blue')
    //     .attr('fill','none')
    //     .attr('width',width)
    //     .attr('height',height)
    //     .attr('x',-width/2)
    //     .attr('y',-height/2);
    // g2.append('circle').attr('fill','none').attr('stroke','blue').attr('r',10);

    length = g2.selectAll('.length');
    combinations = g2.selectAll('.combinations');
    label = g2.selectAll('.label');

    let translatedSvg
    if (options.lang === 'en') {
        translatedSvg = annotazioniEN
    } else {
        translatedSvg = annotazioni
    }
    const incomingSVG = await d3.svg(translatedSvg)
    const annotations=d3.select(incomingSVG).select('#annotazioni').attr('transform','translate('+(-2740/2)+','+(-1568/2)+')');
    annotations.selectAll('#lines path, #lines line').attr('stroke-dasharray','2 4')
    g3.node().appendChild(annotations.node());
    //  Ended init, run the update to paint first time
    V.update(options);
}
/**
 *
 * @param {Object}  options
 * @param {Array}   options.data
 */
V.update = (options)=>{
    const reducedData = options.data
    .filter(d=>{
        d.state='metaball';
        d.color=interpolateColor(d);
        return true || d.perc_dubbio>=minPerc;
    });

    length=length.data(options.data, d=>d.id);
    length.exit().remove();
    length=length.enter().append('circle')
            .classed('length',true)
            .attr('id',d=>'length-'+d.id)
            .attr('fill',d=>d.perc_dubbio>=minPerc?'#fff':'transparent')
            .attr('fill-opacity','0.8')
            .attr('stroke','#999')
            // .attr('stroke',d=>riformStroke(d.cosa_riformulazione+d.senso_riformulazione+d.come_riformulazione))
            .attr('stroke-width',strokeWidth)
            // .attr('stroke-width',d=>riformStrokeWidth(d.cosa_riformulazione+d.senso_riformulazione+d.come_riformulazione))
            .attr('r',d=>d.r)
            .attr('cx',d=>d.x)
            .attr('cy',d=>d.y)
            .style('cursor',d=>d.perc_dubbio>=minPerc?'pointer':'unset')
            .on('click',function(d){
                if (d.perc_dubbio>=minPerc) {
                   toggleMetaball(d);
                }
                if (options.onSelection) {
                   options.onSelection(d.id);
                }
            })
            .merge(length);

    length.filter(d=>d.perc_dubbio <= minPerc)
        .attr('fill','#ddddda')
        .attr('fill-opacity','1')
        .attr('stroke','white')


    combinations=combinations.data(reducedData, d=>d.id);
    combinations.exit().remove();
    combinations=combinations.enter().append('g')
        .classed('combinations',true)
        .attr('id',d=>'combinations-'+d.id)
        .style('cursor',d=>d.perc_dubbio>=minPerc?'pointer':'unset')
        .attr('transform',d=>'translate('+d.x+','+d.y+')')
        .on('click',(d)=>{
            toggleMetaball(d);
            if (options.onSelection) {
                options.onSelection(d.id);
            }
        })
        .merge(combinations);

    combinations.append('path')
            .classed('metaball',true)
            .attr('fill',d=>d.color)
            .attr('d',d=>d.metaballSegments);

    combinations.selectAll('.circle-combination').data(d=>d.combinations)
        .enter().append('circle')
            .classed('circle-combination',true)
            .attr('display','none')
            .attr('r',d=>d.r)
            .attr('cx',d=>d.x)
            .attr('cy',d=>d.y);

    label = label.data(options.data, d=>d.id);
    label.exit().remove();
    label = label.enter().append('text')
            // .classed('label',true)
            .attr('x',d=>d.x)
            .attr('y',d=>d.y)
            .attr('font-size',7)
            .attr('font-family','brera condensed, serif')
            // .attr('display','none')
            // animation for the info-sheet
            // .style('opacity',0)
            .merge(label)
            .text(d=>d.title)
            // .each(function(d){truncateLabel(this,d.title,8)})
            // .on('mouseenter',function(d){truncateLabel(this,d.title)})
            // .on('mouseleave',function(d){truncateLabel(this,d.title,8)});

    const bbox=g1.node().getBBox();
    const x0=bbox.x, y0=bbox.y, x1=x0+bbox.width, y1=y0+bbox.height;
    // svg.call(
    //     zoom.transform,
    //     d3.zoomIdentity
    //         .translate(width/2, height/2)
    //         .scale(Math.min(8, 0.95 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
    //         .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
    //   );

    g1.attr("transform", `translate(-102, 48) scale(1.05) rotate(-9.4 ${width/2} ${height/2})`)
}

V.changeColor = (value)=>{
    if (value==='negazione'||value==='esitazione'||value==='riformulazione') {
        combinations.select('path')
            .attr('fill',d=>{
                const amount=d.combinations
                    .filter(dd=>dd.type.includes(value))
                    .map(dd=>dd.percentage_combination)
                    .reduce((a,b)=>a+b,0);
                return col_manifestazioni(amount);
            })
    } else {
        combinations.select('path')
            .attr('fill',d=>d.color)
    }

}

V.filter = (filter)=>{
    if (filter==='no filters') {
        length.style('opacity',1).attr('fill-opacity','0.5');
        length.filter(d=>d.perc_dubbio <= minPerc)
            .attr('fill','#ddddda')
            .attr('fill-opacity','1')
            .attr('stroke','white')
        combinations.style('opacity',1);
        label.style('opacity',1);
    } else {
        length.style('opacity',1).attr('fill-opacity','1')
        length.filter(d=>d.perc_dubbio <= minPerc)
            .attr('fill','#ddddda')
            .attr('fill-opacity','1')
            .attr('stroke','white')
        length.filter(d=>filter.indexOf(d.id)<0)
                .style('opacity',0.2).attr('fill-opacity','0.5');

        combinations
            .style('opacity',1)
            .filter(d=>filter.indexOf(d.id)<0)
                .style('opacity',0.2);

        label
            .style('opacity',1)
            .filter(d=>filter.indexOf(d.id)<0)
                .style('opacity',0.2);
    }

    // label.style('opacity',0.3)
    //         .classed('keepVisible',false)
    //         .filter(d=>ids.indexOf(d.id)>-1)
    //             .style('opacity',1)
    //             .attr('display','block')
    //             .classed('keepVisible',label.size()!==ids.length?'true':false)
    //             .each(function(d){truncateLabel(this,d.title)})
}

function toggleMetaball(data){
    data.state=data.state==='metaball'?'matrix':'metaball';
    const this_combination = combinations.filter(d=>d.id===data.id);
    const color = this_combination.select('path').attr('fill')
    if (data.state==='matrix') {
        this_combination.select('path').attr('display','none');
        this_combination.selectAll('circle')
            .attr('display','block')
            .attr('fill',color)
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