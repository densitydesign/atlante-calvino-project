import * as d3 from 'd3';
import DoubtingStackedBars from '../DoubtingStackedBars/DoubtingStackedBars';

const V = {}

let width, legendWidth, height, margin = {top: 25, right: 0, bottom: 0, left: 40},
    svg, title, g, baseLine, doubt, subject, label,

    x, y, color = d3.scaleOrdinal()
        .domain(["dubitativo","misto","soggetto","definitivo"])
        .range(["#bbbbff","#00c19c","#ffc806","#eaeaea"])
        .unknown("#ff3333"),
    
    xAxis, xAxisCall, yAxis, yAxisCall,   
    gradient = d3.scaleOrdinal()
        .domain(["soggetto","misto","dubitativo"])
        .range(["url(#subj-gradient)","url(#mixed-gradient)","url(#doubt-gradient)"])

V.initialize = (init_options) => {
    // console.log(init_options);

    svg = d3.select(init_options.element);

    title = svg.append('text')
        .attr('x', margin.left)
        .attr('y', margin.top/2);

    const defs = svg.append('defs');
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

    width = svg.node().getBoundingClientRect().width*0.85 - margin.left - margin.right;
    legendWidth = svg.node().getBoundingClientRect().width * 0.15;
    height = svg.node().getBoundingClientRect().height - margin.top - margin.bottom;

    x = d3.scaleLinear()
        .range([0,width])
        x.domain([0,init_options.data.length]);
    
    y = d3.scaleLinear()
        .range([-height/2, 0]);

    g = svg.append('g')
        .attr('transform', 'translate('+margin.left+','+(margin.top + height/2)+')');

    subject = g.append('g').classed('group-subjects', true).selectAll('.subject');
    doubt = g.append('g').classed('group-doubts', true).selectAll('.doubt');
    label = g.append('g').classed('group-labels', true).selectAll('.label');

    xAxis = g.append("g")
        .attr("class", "x-axis noselect")
        .attr("transform", `translate(${0},${margin.top})`);
        
    yAxis = g.append("g")
        .attr("class", "y-axis noselect")
        .attr("transform", `translate(${0},${0})`);

    baseLine = g.append('line');
    baseLine.attr('x1',x(0))
        .attr('x2',x(init_options.data.length))
        .attr('y1', 0)
        .attr('y2', 0)
        .attr('stroke', 'grey')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '2 2');


    V.update({data:init_options.data});
}

V.update = (options) => {
    // console.log('V.update', options.data);

    // delete this, is created later when calculating offset of x positioning
    options.data.details.forEach(d=>{
        delete d.skip_now
    })

    title.text(options.data.id + ' ' + options.data.title)

    x.domain([0,options.data.length]);
    xAxisCall = d3.axisBottom(x);
    xAxis.call(xAxisCall);

    y.domain([d3.max(options.data.details, d=>d.depth), 0]);
    yAxisCall = d3.axisLeft(y).ticks(y.domain()[0]);
    yAxis.call(yAxisCall);

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
                    // // do not calculate overlap for the element with itself
                    // if (dd.id!==d.id){
                    //     const overlap = getOverlap(dd.subj_start, dd.subj_end, d.subj_start, d.subj_end);
                    //     offset -= overlap;
                    //     if (offset<1) {
                    //         d.skip_now=true;
                    //     }
                    // }
                    d.doubt_x-= offset;
                    d.subj_x-= offset;
                }   
            });
    })
    const subjects = doubts.filter(d=>d.open);

    console.log('visualized doubts', doubts);

    doubt = doubt.data(doubts.reverse(), d=>options.data.id+'-doubt-'+d.id);
    doubt.exit().remove();
    doubt = doubt.enter().append('rect')
        .classed('doubt', true)
        .attr('stroke-width',1)
        .attr('stroke', d=>d.parent?color('misto'):color('dubitativo'))
        .attr('fill', d=>d.parent?gradient('misto'):gradient('dubitativo'))
        .merge(doubt)
        .attr('stroke-dasharray',d=>x(d.doubt_end)-x(d.doubt_start) + ' ' + (x(d.doubt_end)-x(d.doubt_start)+2*Math.abs(y(d.depth||0))) )
        .attr('x',d=>x(d.doubt_x))
        .attr('y',d=>y(d.depth?d.depth:0))
        .attr('width',d=>x(d.doubt_end)-x(d.doubt_start))
        .attr('height',d=>Math.abs(y(d.depth||0)))
        .on('click', (d,i)=>{
            console.log('clicked',d)
            d.open=!d.open;
            if (d.open===false){
                close_recursive(d);
            }
            V.update(options);
        });

    function close_recursive(d){
        d.open = false;
        if (d.has_children){
            d.children.forEach(dd=>{
                close_recursive(dd);
            })
        }
    }

    subject = subject.data(subjects.reverse(), d=>options.data.id+'-subject-'+d.id);
    subject.exit().remove();
    subject = subject.enter().append('rect')
        .classed('subject', true)
        .attr('stroke-width', 1)
        .attr('stroke', d=>color('soggetto'))
        .attr('fill', gradient('soggetto'))
        .merge(subject)
        .attr('stroke-dasharray',d=>x(d.subj_end)-x(d.subj_start) + ' ' + (x(d.subj_end)-x(d.subj_start)+2*Math.abs(y(d.depth||0))) )
        .attr('x',d=>x(d.subj_x))
        .attr('y',d=>y(d.depth||0))
        .attr('width',d=>x(d.subj_end)-x(d.subj_start))
        .attr('height',d=>Math.abs(y(d.depth||0)));
    
    label = label.data(doubts, d=>{return options.data.id+'-label-doubt-'+d.id});
    label.exit().remove();
    label = label.enter().append('text')
        .classed('label noselect', true)
        .attr('font-size','0.65rem')
        .merge(label)
        .attr('x',d=>x(d.doubt_x) + (x(d.doubt_end) - x(d.doubt_start))/2 )
        .attr('y',d=>y(d.depth))
        .attr("transform", d=>`rotate(-30 ${x(d.doubt_x)} ${y(d.depth)})`)
        .text(d=>d.id.replace('pair-', 'td '));
}

V.destroy = () => {
    console.log("destroy");
}

export default V;

function getOverlap(a_start, a_end, b_start, b_end){
    return Math.max(0, Math.min(a_end, b_end) - Math.max(a_start, b_start));
}