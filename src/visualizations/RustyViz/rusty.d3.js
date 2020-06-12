import * as d3 from 'd3';

const V = {};
export default V;

const combinations_arr =    [   "come_negazione", "come_esitazione", "come_riformulazione",
                            "cosa_negazione", "cosa_esitazione", "cosa_riformulazione",
                            "senso_negazione", "senso_esitazione", "senso_riformulazione"
                        ]

let width, height,
    svg, g1, g2, length, combinations, circle,
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
            const k=d.length>200000?0.60:0.7;
            return (r(d.length2use)+1)*k
        }))
        .on('tick',()=>{
            length.attr('cx',d=>d.x).attr('cy',d=>d.y);
            combinations.attr('transform',d=>'translate('+d.x+','+d.y+')')
        })
        .alphaMin(0.1)
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
    // circle = combinations.selectAll('circle');

    for(let i=0; i<options.data.length; i++){
        const d = options.data[i];
        d.length2use=d3.max([Number(d.length), 25000]);
        d.combinations=combinations_arr.map(p=>{
            let obj={};
            obj['id']=d.id;
            obj.type=p;
            obj.percentage_combination = d[p];
            obj.r=r(obj.percentage_combination*d.length2use);
            obj.mx = obj.x = matrix_grid.x(p.split('_')[1]) * r(d.length2use);
            obj.my = obj.y = matrix_grid.y(p.split('_')[0]) * r(d.length2use);
            return obj;
        });
    }

    V.update({data:options.data});
}
/**
 * 
 * @param {Object}  options 
 * @param {Array}   options.data 
 */
V.update = (options)=>{
    const reducedData = options.data.filter(d=>d.perc_dubbio>=2.5);
    length=length.data(reducedData);
    length.exit().remove();
    length=length.enter().append('circle')
            .attr('fill','rgba(255,255,255,0.6)')
            .attr('r',d=>r(d.length2use))
            .merge(length);

    combinations=combinations.data(reducedData);
    combinations.exit().remove();
    combinations=combinations.enter().append('g')
        .classed('combinations',true)
        .merge(combinations);

    combinations.selectAll('circle').data(d=>d.combinations).enter().append('circle')
            .classed('combination',true)
            .attr('r',d=>d.r)
            .attr('cx',d=>d.x)
            .attr('cy',d=>d.y);
            
    simulation.nodes(options.data)
        .alpha(1)
        .restart()
        .on('end',()=>{
            console.log('get circles positions')
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
                        combinations
                            .selectAll('circle')
                                // .transition()
                                //     .duration(350)
                                        .attr('cx',d=>d.x)
                                        .attr('cy',d=>d.y);
                    });
            }
        });
}