import * as d3 from 'd3';

const V = {}

let width, legendWidth, height, margin = {top: 10, right: 0, bottom: 10, left: 40},
    svg, g, baseLine, doubt, subject,

    x, y, color = d3.scaleOrdinal()
        .domain(["dubitativo","misto","soggetto","definitivo"])
        .range(["#bbbbff","#00c19c","#ffc806","#eaeaea"])
        .unknown("#ff3333"),
    gradient = d3.scaleOrdinal()
        .domain(["soggetto","dubitativo"])
        .range(["url(#subj-gradient)","url(#doubt-gradient)"])

V.initialize = (init_options) => {
    console.log(init_options);

    svg = d3.select(init_options.element);

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

    let gradient = defs.selectAll('linearGradient').data(gradientData, d=>d.id)
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
    baseLine = g.append('line');
    baseLine.attr('x1',x(0))
        .attr('x2',x(init_options.data.length))
        .attr('y1', 0)
        .attr('y2', 0)
        .attr('stroke', 'grey')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '2 2');

    subject = g.append('g').classed('group-subjects', true).selectAll('.subject');
    doubt = g.append('g').classed('group-doubts', true).selectAll('.doubt');

    V.update({data:init_options.data});
}

V.update = (options) => {
    console.log('V.update');

    x.domain([0,options.data.length]);
    y.domain([d3.max(options.data.details, d=>d.depth), 0]);

    // const text = options.data;
    const doubts = options.data.details.filter(d=>d.level===0||d.parent.open);
    const subjects = doubts.filter(d=>d.open||d.depth===0);

    // console.log(text,data);
    subject = subject.data(subjects, d=>'subject-'+d.id);
    subject.exit().remove();
    subject = subject.enter().append('rect')
        .classed('subject', true)
        .attr('stroke-width', 1)
        .attr('stroke', d=>color('soggetto'))
        .attr('stroke-dasharray',d=>x(d.subj_end)-x(d.subj_start) + ' ' + (x(d.subj_end)-x(d.subj_start)+2*Math.abs(y(d.depth||0))) )
        // .attr('stroke-linejoin','miter')
        .attr('fill', gradient('soggetto'))
        .attr('x',d=>x(d.subj_start))
        .attr('y',d=>y(d.depth||0))
        .attr('width',d=>x(d.subj_end)-x(d.subj_start))
        .attr('height',d=>Math.abs(y(d.depth||0)))
        .merge(subject);
    
    doubt = doubt.data(doubts, d=>'doubt-'+d.id);
    doubt.exit().remove();
    doubt = doubt.enter().append('rect')
        .classed('doubt', true)
        .attr('stroke-width',1)
        .attr('stroke', color('dubitativo'))
        .attr('stroke-dasharray',d=>x(d.doubt_end)-x(d.doubt_start) + ' ' + (x(d.doubt_end)-x(d.doubt_start)+2*Math.abs(y(d.depth||0))) )
        // .attr('stroke-linejoin','miter')
        .attr('fill', gradient('dubitativo'))
        .attr('x',d=>x(d.doubt_start))
        .attr('y',d=>y(d.depth||0))
        .attr('width',d=>x(d.doubt_end)-x(d.doubt_start))
        .attr('height',d=>Math.abs(y(d.depth||0)))
        .merge(doubt)
        .on('click', d=>{
            d.open=!d.open;
            V.update(options);
        });
}

V.destroy = () => {
    console.log("destroy");
}

export default V;