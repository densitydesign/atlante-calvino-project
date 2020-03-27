import * as d3 from 'd3';
// import DoubtingStackedBars from '../DoubtingStackedBars/DoubtingStackedBars';
import GlobalData from '../../utilities/GlobalData';

const V = {}

let width, legendWidth, height, lvl0 = 10, margin = {top: 25, right: 40, bottom: 20+lvl0, left: 40},
    svg, svg_style, title, master_g, g, baseLine, chapter, subject, mixed, doubt, label, arrow, arrow_label,

    x, y, color = d3.scaleOrdinal()
        .domain(["dubitativo","misto","soggetto","definitivo"])
        .range(["#bbbbff","#00c19c","#ffc806","#eaeaea"])
        .unknown("#ff3333"),
    
    xAxis, xAxisCall, yAxis, yAxisCall,   
    gradient = d3.scaleOrdinal()
        .domain(["soggetto","misto","dubitativo","capitolo"])
        .range(["url(#subj-gradient)","url(#mixed-gradient)","url(#doubt-gradient)","url(#chapter-gradient)"]),

    globalUpdateOptions, id_opera, selected_pairs = [];

V.initialize = (init_options) => {
    // console.log(init_options);
    id_opera = init_options.data.id;

    svg = d3.select(init_options.element);

    const defs = svg.append('defs');
    svg_style = defs.append('style');
    const gradientData = [
        {
            'id':'doubt-gradient',
            'x1': '50%',
            'y1': '100%',
            'x2': '50%',
            'y2': '0%',
            'stops':[
            {
                'offset': '0%',
                'color': '#ffffff',
                'opacity':1
            },
            {
                'offset': '75%',
                'color': '#dfdfff',
                'opacity': 1
            }
            ]
        },
        {
            'id':'mixed-gradient',
            'x1': '50%',
            'y1': '100%',
            'x2': '50%',
            'y2': '0%',
            'stops':[
            {
                'offset': '0%',
                'color': '#ffffff',
                'opacity':1
            },
            {
                'offset': '75%',
                'color': '#9defdf',
                'opacity': 1
            }
            ]
        },
        {
            'id':'subj-gradient',
            'x1': '50%',
            'y1': '100%',
            'x2': '50%',
            'y2': '0%',
            'stops':[
            {
                'offset': '0%',
                'color': '#ffffff',
                'opacity':1
            },
            {
                'offset': '75%',
                'color': '#fff0ba',
                'opacity': 1
            }
            ]
        },
        {
            'id':'chapter-gradient',
            'x1': '0%',
            'y1': '50%',
            'x2': '100%',
            'y2': '50%',
            'stops':[
            {
                'offset': '0%',
                'color': '#f6f6f6',
                'opacity':1
            },
            {
                'offset': '50%',
                'color': '#ffffff',
                'opacity': 1
            }
            ]
        }
    ]
    let gradient = defs.selectAll('linearGradient');
    gradient = gradient.data(gradientData, d=>d.id)
        .enter()
        .append('linearGradient')
            .attr('id', d=>d.id)
            .attr('x1', d=>d.x1)
            .attr('y1', d=>d.y1)
            .attr('x2', d=>d.x2)
            .attr('y2', d=>d.y2)
            .selectAll('stop').data(d=>d.stops)
                .enter()
            .append('stop')
                .attr('offset', d=>d.offset)
                .style('stop-color', d=>d.color)
                .style('stop-opacity', d=>d.opacity);

    width = svg.node().getBoundingClientRect().width - margin.left - margin.right;
    legendWidth = svg.node().getBoundingClientRect().width * 0.15;
    height = svg.node().getBoundingClientRect().height - margin.top - margin.bottom;

    x = d3.scaleLinear()
        .range([0,width])
        .domain([0,init_options.data.length])
        .interpolate(d3.interpolateNumber);
    
    y = d3.scaleLinear()
        .range([-height/3*2, 0])
        .domain([10,0]);

    title = svg.append('text')
        .attr('x', margin.left)
        .attr('y', margin.top/2);
    
    defs.append('clipPath').attr('id','clipping-mask').append('rect')
        .attr('x',margin.left)
        .attr('y',margin.top)
        .attr('width',width)
        .attr('height',height/2);

    master_g = svg.append('g').attr('transform', 'translate('+margin.left+','+(margin.top + height/3*2)+')');

    // g = master_g.append('g').attr('clip-path','url(#clipping-mask)');
    chapter = g.append('g').classed('group-chapters', true).style('pointer-events','none').selectAll('.chapter');
    subject = g.append('g').classed('group-subjects', true).selectAll('.subject');
    mixed = g.append('g').classed('group-mixeds', true).selectAll('.mixed');
    doubt = g.append('g').classed('group-doubts', true).selectAll('.doubt');
    label = g.append('g').classed('group-labels', true).selectAll('.label');
    arrow = g.append('g').classed('group-arrows', true).selectAll('.arrow');
    arrow_label = g.append('g').classed('group-arrows-labels', true).selectAll('.arrow-label');

    xAxis = master_g.append("g")
        .attr("class", "x-axis noselect")
        .attr("transform", `translate(${0},${lvl0})`);
        
    yAxis = master_g.append("g")
        .attr("class", "y-axis noselect")
        .attr("transform", `translate(${0},${0})`);

    // baseLine = g.append('line');
    // baseLine.attr('x1',x(0))
    //     .attr('x2',x(init_options.data.length))
    //     .attr('y1', 0)
    //     .attr('y2', 0)
    //     .attr('stroke', 'grey')
    //     .attr('stroke-width', 1)
    //     .attr('stroke-dasharray', '2 2');

    const zoomed = () => {
        // console.log(d3.event.transform);
        x.range( [0, width].map(d => d3.event.transform.applyX(d)) );
        const tickValues = [];
        tickValues.push(x.invert(0))
        // tickValues.push(x.invert(width/2))
        tickValues.push(x.invert(width))
        xAxis.call(
            xAxisCall
                .tickValues(tickValues)
                .scale(x)
        );
        globalUpdateOptions.transformed = true;
        V.update(globalUpdateOptions);
    }

    const zoom = d3.zoom()
        .scaleExtent([1, 35])
        .translateExtent([[0, 0], [width + margin.left + margin.right, height]])
        .on("zoom", zoomed);
    svg.call(zoom);

    V.update({data:init_options.data});
}

V.update = (options) => {
    // console.log('V.update');
    if (options) {
        globalUpdateOptions = options;
    }
    // delete this, is created later when calculating offset of x positioning
    options.data.details.forEach(d=>{
        delete d.skip_now;
    })

    title.text(options.data.id + ' ' + options.data.title)

    if (!options.transformed) {
        x.domain([0,options.data.length]);
        xAxisCall = d3.axisBottom(x)
            .tickValues([0,options.data.length])
            .tickFormat(d=>{
                const percentage = ` (${Math.floor(d/options.data.length*100)}%)`;
                return Math.floor(d) + percentage;
            });
        xAxis.call(xAxisCall);

        yAxisCall = d3.axisLeft(y);
        yAxis.call(yAxisCall);
    }

    // const text = options.data;
    let doubts = options.data.details.filter(d=>d.level===0||d.parent.open);
    doubts.forEach((d)=>{
        d.doubt_x = JSON.parse(JSON.stringify(d.doubt_start));
        d.subj_x = JSON.parse(JSON.stringify(d.subj_start));
        options.data.details
            .filter((dd,ii)=>!dd.open && ii<=options.data.details.indexOf(d))
            .forEach((dd,ii)=>{
                if (!d.skip_now) {
                    let offset = dd.subj_end - dd.subj_start;
                    d.doubt_x-= offset;
                    d.subj_x-= offset;
                }   
            });
    })
    const subjects = doubts.filter(d=>d.open);

    const chapters = GlobalData.chapters_subdivision.filter(d=>{
        d.id = d['id opera'] + '-' + d['numero sezione'];
        return d['id opera']===options.data.id;
    });

    chapter = chapter.data( chapters, d=>d.id );
    chapter.exit().remove();
    chapter = chapter.enter().append('g')
        .classed('chapter', true)
        .merge(chapter);

    chapter.selectAll('rect')
            .data(d=>{return [d]})
        .enter().append('rect')
            .attr('fill', gradient('capitolo'))
            .merge(chapter.selectAll('rect'))
            .attr('width', d=>x(d.end)-x(d.start))
            .attr('height', y(0)-y(10)+lvl0)
            .attr('x', d=>x(d.start))
            .attr('y', y(10));

    chapter.selectAll('text')
            .data(d=>{return [d]})
        .enter().append('text')
            .attr('font-size','0.65rem')
            .merge(chapter.selectAll('text'))
            .attr('x', d=>x(d.start)+5)
            .attr('y', y(10)+10)
            .text(d=>d.titolo);

    doubt = doubt.data(doubts.reverse(), d=>options.data.id+'-doubt-'+d.id);
    doubt.exit().remove();
    doubt = doubt.enter().append('rect')
        .classed('doubt', true)
        .attr('stroke-width',1)
        .attr('stroke', color('dubitativo'))
        .attr('fill', gradient('dubitativo'))
        .merge(doubt)
        .attr('stroke-dasharray',d=>x(d.doubt_end)-x(d.doubt_start) + ' ' + (x(d.doubt_end)-x(d.doubt_start)+2* (d.depth?Math.abs(y(d.depth)):lvl0) ) )
        .attr('x',d=>x(d.doubt_x))
        .attr('y',d=>y(d.depth?d.depth:0))
        .attr('width',d=>x(d.doubt_end)-x(d.doubt_start))
        .attr('height',d=> (d.depth?Math.abs(y(d.depth)):lvl0) )
        .on('click', (d,i)=>{
            selectSiblings(['subject','doubt','mixed'],d)
        });

    let mixed_data = []
    options.data.chunks
        .filter(d=>d.category==='misto')
        .forEach(d=>{
            subjects.filter(dd=>dd.subj_start<=d.start&&dd.subj_end>=d.end)
                    .forEach(dd=>{
                        let obj = {
                            id: dd.id,
                            start: d.start,
                            end: d.end,
                            depth: dd.depth
                        }
                        mixed_data.push(obj)
                    })
        })
    mixed_data = mixed_data.sort((a,b)=>(a.end > b.end) ? 1 : -1);
    mixed = mixed.data(mixed_data, (d,i)=>options.data.id+'-mixed-'+i);
    mixed.exit().remove();
    mixed = mixed.enter().append('rect')
        .classed('mixed', true)
        .attr('stroke-width',1)
        .attr('stroke', color('soggetto'))
        .attr('fill', gradient('misto'))
        .merge(mixed)
        .attr('stroke-dasharray',d=>x(d.end)-x(d.start) + ' ' + (x(d.end)-x(d.start)+2*Math.abs(y(d.depth||0))) )
        .attr('x',d=>x(d.start))
        .attr('width',d=> x(d.end)-x(d.start))
        .attr('y',d=>y(d.depth?d.depth:0))
        .attr('height',d=>Math.abs(y(d.depth)));

    subject = subject.data(subjects.reverse(), d=>options.data.id+'-subject-'+d.id);
    subject.exit().remove();
    subject = subject.enter().append('rect')
        .classed('subject', true)
        .attr('stroke-width', 1)
        .attr('stroke', d=>color('soggetto'))
        .attr('fill', gradient('soggetto'))
        .merge(subject)
        .attr('stroke-dasharray',d=>x(d.subj_end)-x(d.subj_start) + ' ' + (x(d.subj_end)-x(d.subj_start)+2*(d.depth?Math.abs(y(d.depth)):lvl0) ))
        .attr('x',d=>x(d.subj_x))
        .attr('y',d=>y(d.depth||0))
        .attr('width',d=>x(d.subj_end)-x(d.subj_start))
        .attr('height',d=> (d.depth?Math.abs(y(d.depth)):lvl0) )
        .on('click', (d,i)=>{
            selectSiblings(['subject','doubt','mixed'],d)
        });
    
    label = label.data(doubts, d=>{return options.data.id+'-label-doubt-'+d.id});
    label.exit().remove();
    label = label.enter().append('text')
        .classed('label noselect', true)
        .attr('font-size','0.65rem')
        .style('pointer-events ','none')
        .merge(label)
        .attr('transform',d=>'translate('+( x(d.doubt_x) + (x(d.doubt_end) - x(d.doubt_start))/2 )+','+(y(d.depth)-4)+') rotate(-21)')
        .text(d=>'td '+ (+d.id.replace('pair-','')+1));
    
    drawArrows();
}

V.destroy = () => {
    console.log("destroy");
}

export default V;

function selectSiblings(arrSelectors, data) {
    const _selector = '.'+arrSelectors.join(', .');

    let _selected;
    d3.selectAll(_selector)
        .filter(element=>element.id===data.id)
        .classed('selected', function(){
            _selected = !d3.select(this).classed('selected');
            return !d3.select(this).classed('selected')
        });

    const index = selected_pairs.indexOf(data);
    if (_selected){
        if (index===-1){
            selected_pairs.push(data);
        }
    } else {
        if (index!==-1) {
            selected_pairs.splice(index,1);
        }
    }

    drawArrows();

    d3.select('#folding-line').classed('there-is-selection', d3.selectAll('#folding-line .selected').size()>0);
}

function drawArrows(){
    arrow = arrow.data(selected_pairs, d=>{return id_opera+'-arrow-'+d.id});
    arrow.exit().remove();
    arrow = arrow.enter().append('path')
        .classed('arrow', true)
        .attr('fill','transparent')
        .attr('stroke',color('dubitativo'))
        .merge(arrow)
        .attr('d', d=>{
            let y0 = lvl0;
            let y1 = y0+(d.depth?Math.abs(y(d.depth)):y0);
            let x0 = x(Math.max(d.doubt_end-5, d.doubt_start));
            let x1 = x(Math.min(d.subj_start+5, d.subj_end));

            let path='';
            path+='M'+x0+','+y0;
            path+='V'+y1;
            path+='L'+x1+','+y1;
            path+='V'+y0;
            return path;
        })
        .each(function(d){
            if (d3.select(this).style('animation-name')!=='none') return;
            const length = this.getTotalLength();
            if (!svg_style.node().innerHTML.includes('arcs-direction-'+d.id)) {
                const keyframes = '@keyframes arcs-direction-'+d.id+
                    ' {\nfrom {stroke-dashoffset:'+length+';}\nto {stroke-dashoffset:0;} }';
                svg_style.node().innerHTML += keyframes; 
            };
            d3.select(this)
                .style('stroke-dasharray','5')
                .style('animation-name','arcs-direction-'+d.id)
                .style('animation-timing-function','linear')
                .style('animation-iteration-count','infinite')
                .style('animation-duration',length/10+'s');
        });

    arrow_label = arrow_label.data(selected_pairs, d=>{return id_opera+'-arrow-label-'+d.id})
    arrow_label.exit().remove();
    arrow_label = arrow_label.enter().append('text')
        .classed('arrow-label', true)
        .attr('text-anchor','middle')
        .attr('font-size','0.65rem')
        .merge(arrow_label)
        .attr('x',d=>x(d.subj_start+(d.doubt_end-d.subj_start)/2))
        .attr('y',d=>{
            let y0 = lvl0;
            let y1 = y0+(d.depth?Math.abs(y(d.depth)):y0) + lvl0;
            return y1;
        })
        .text(d=>d.formula)
}