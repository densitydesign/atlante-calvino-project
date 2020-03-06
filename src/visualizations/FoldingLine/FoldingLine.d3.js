import * as d3 from 'd3';
import DoubtingStackedBars from '../DoubtingStackedBars/DoubtingStackedBars';

const V = {}

let width, legendWidth, height, margin = {top: 10, right: 0, bottom: 10, left: 40},
    svg, title, g, baseLine, doubt, subject, label,

    x, y, color = d3.scaleOrdinal()
        .domain(["dubitativo","misto","soggetto","definitivo"])
        .range(["#bbbbff","#00c19c","#ffc806","#eaeaea"])
        .unknown("#ff3333"),
    
    xAxis, xAxisCall, yAxis, yAxisCall,   
    gradient = d3.scaleOrdinal()
        .domain(["soggetto","dubitativo"])
        .range(["url(#subj-gradient)","url(#doubt-gradient)"])

V.initialize = (init_options) => {
    // console.log(init_options);

    svg = d3.select(init_options.element);

    title = svg.append('text')
        .attr('x', margin.left)
        .attr('y', margin.top);

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
        .range([-height/2 + margin.top, -margin.bottom]);

    g = svg.append('g')
        .attr('transform', 'translate('+margin.left+','+(margin.top + height/2)+')');

    xAxis = g.append("g")
        .attr("class", "x-axis noselect")
        .attr("transform", `translate(${0},${margin.top})`);
        
    yAxis = g.append("g")
        .attr("class", "y-axis noselect")
        .attr("transform", `translate(${0},${0})`);

    subject = g.append('g').classed('group-subjects', true).selectAll('.subject');
    doubt = g.append('g').classed('group-doubts', true).selectAll('.doubt');
    label = g.append('g').classed('group-labels', true).selectAll('.label');

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
    console.log('V.update', options.data);

    title.text(options.data.id + ' ' + options.data.title)

    x.domain([0,options.data.length]);
    xAxisCall = d3.axisBottom(x);
    xAxis.call(xAxisCall);

    y.domain([d3.max(options.data.details, d=>d.depth), 0]);
    yAxisCall = d3.axisLeft(y).ticks(y.domain()[0]);
    yAxis.call(yAxisCall);

    // const text = options.data;
    let doubts = options.data.details.filter(d=>d.level===0||d.parent.open);
    doubts.forEach((d,i)=>{
        console.log(d.id)
        d.doubt_x = d.doubt_start;
        d.subj_x = d.subj_start;
        options.data.details
            .filter((dd,ii)=>!dd.open && ii<=i)
            .forEach((dd,ii)=>{
                const sbj_length = dd.subj_end - dd.subj_start;
                d.doubt_x-= sbj_length;
                d.subj_x-= sbj_length;
            });
    })
    const subjects = doubts.filter(d=>d.open);

    // console.log(doubts);

    doubt = doubt.data(doubts.reverse(), d=>options.data.id+'-doubt-'+d.id);
    doubt.exit().remove();
    doubt = doubt.enter().append('rect')
        .classed('doubt', true)
        .attr('stroke-width',1)
        .attr('stroke', color('dubitativo'))
        .attr('fill', gradient('dubitativo'))
        .merge(doubt)
        .attr('stroke-dasharray',d=>x(d.doubt_end)-x(d.doubt_start) + ' ' + (x(d.doubt_end)-x(d.doubt_start)+2*Math.abs(y(d.depth||0))) )
        .attr('x',d=>x(d.doubt_x))
        .attr('y',d=>y(d.depth?d.depth:0))
        .attr('width',d=>x(d.doubt_end)-x(d.doubt_start))
        .attr('height',d=>Math.abs(y(d.depth||0)))
        .on('click', (d,i)=>{
            console.log('clicked',d)
            d.open=!d.open;
            V.update(options);
        });

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
        .attr('font-size','0.75rem')
        .merge(label)
        .attr('x',d=>x(d.doubt_x))
        .attr('y',d=>y(d.depth?d.depth:0))
        .text(d=>d.id.replace('pair-', 'td '));
}

V.destroy = () => {
    console.log("destroy");
}

export default V;