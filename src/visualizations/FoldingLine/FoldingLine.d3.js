import * as d3 from 'd3';

const V = {}

let width, legendWidth, height, margin = {top: 10, right: 0, bottom: 50, left: 40},
    svg, g, baseLine, doubt, subject,

    x, y, color = d3.scaleOrdinal()
        .domain(["dubitativo","misto","soggetto","definitivo"])
        .range(["#bbbbff","#00c19c","#ffc806","#eaeaea"])
        .unknown("#ffcccc");

V.initialize = (init_options) => {
    console.log(init_options);

    svg = d3.select(init_options.element);

    width = svg.node().getBoundingClientRect().width*0.85 - margin.left - margin.right;
    legendWidth = svg.node().getBoundingClientRect().width * 0.15;
    height = svg.node().getBoundingClientRect().height - margin.top - margin.bottom;

    x = d3.scaleLinear()
        .range([0,width])
        x.domain([0,init_options.data.length]);
    
    y = d3.scaleLinear()
        .range([-height/2 + margin.top, 0]);

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
    doubt = g.selectAll('.doubt');
    subject = g.selectAll('.subject');

    V.update({data:init_options.data});
}

V.update = (options) => {
    console.log('V.update');

    x.domain([0,options.data.length]);
    y.domain([d3.max(options.data.details, d=>d.depth), 0]);

    // const text = options.data;
    const doubts = options.data.details.filter(d=>d.level===0||d.parent.open);
    const subjects = options.data.details.filter(d=>d.open);

    // console.log(text,data);

    doubt = doubt.data(doubts, d=>'doubt-'+d.id);
    doubt.exit().remove();
    doubt = doubt.enter().append('path')
        .classed('doubt', true)
        .attr('stroke-width',d=>d.has_children?3:1)
        .attr('transform',d=>`translate(0,${y(d.depth||0)})`)
        .merge(doubt)
        .attr('stroke', d=>d.open?'red':color('dubitativo'))
        .attr('d',d=>`M${x(d.doubt_start)},0 H${x(d.doubt_end)}`)
        .on('click', d=>{
            console.log(d);
            d.open=!d.open;
            V.update(options);
        });
    
    subject = subject.data(subjects, d=>'subject-'+d.id);
    subject.exit().remove();
    subject = subject.enter().append('path')
        .classed('subject', true)
        .attr('stroke-width', 1)
        .attr('transform',d=>`translate(0,${y(d.depth)})`)
        .merge(subject)
        .attr('stroke', d=>d.open?'red':color('soggetto'))
        .attr('d',d=>`M${x(d.subj_start)},0 H${x(d.subj_end)}`)

}

V.destroy = () => {
    console.log("destroy");
}

export default V;