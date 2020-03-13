import * as d3 from 'd3';
// import DoubtingStackedBars from '../DoubtingStackedBars/DoubtingStackedBars';
import GlobalData from '../../utilities/GlobalData';

const V = {}

let width, legendWidth, height, margin = {top: 25, right: 40, bottom: 20, left: 40},
    svg, title, master_g, g, baseLine, chapter, doubt, subject, label,

    x, y, color = d3.scaleOrdinal()
        .domain(["dubitativo","misto","soggetto","definitivo"])
        .range(["#bbbbff","#00c19c","#ffc806","#eaeaea"])
        .unknown("#ff3333"),
    
    xAxis, xAxisCall, yAxis, yAxisCall,   
    gradient = d3.scaleOrdinal()
        .domain(["soggetto","misto","dubitativo","capitolo"])
        .range(["url(#subj-gradient)","url(#mixed-gradient)","url(#doubt-gradient)","url(#chapter-gradient)"]),

    globalUpdateOptions;

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
        .range([-height, 0])
        .domain([10,-1]);

    master_g = svg.append('g').attr('transform', 'translate('+margin.left+','+(margin.top + height)+')');

    g = master_g.append('g');
    chapter = g.append('g').classed('group-chapters', true).style('pointer-events','none').selectAll('.chapter');
    
    subject = g.append('g').classed('group-subjects', true).selectAll('.subject');
    doubt = g.append('g').classed('group-doubts', true).selectAll('.doubt');
    label = g.append('g').classed('group-labels', true).selectAll('.label');

    xAxis = master_g.append("g")
        .attr("class", "x-axis noselect")
        .attr("transform", `translate(${0},${0})`);
        
    yAxis = master_g.append("g")
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

    const zoomed = () => {
        // console.log(d3.event.transform);
        x.range( [margin.left, width - margin.right].map(d => d3.event.transform.applyX(d)) );
        xAxis.call(xAxisCall.scale(x));
        globalUpdateOptions.transformed = true;
        V.update(globalUpdateOptions);
    }

    const zoom = d3.zoom()
        // .scaleExtent([1, 10])
        // .translateExtent([[0, 0], [width, height]])
        .on("zoom", zoomed);
    svg.call(zoom);

    V.update({data:init_options.data});
}

V.update = (options) => {
    console.log('V.update');
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
            .tickValues([0,options.data.length/2,options.data.length])
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
            .attr('height', height)
            .attr('x', d=>x(d.start))
            .attr('y', -height);

    chapter.selectAll('text')
            .data(d=>{return [d]})
        .enter().append('text')
            .attr('font-size','0.65rem')
            .merge(chapter.selectAll('text'))
            .attr('x', d=>x(d.start)+5)
            .attr('y', -height+10)
            .text(d=>d.titolo);

    doubt = doubt.data(doubts.reverse(), d=>options.data.id+'-doubt-'+d.id);
    doubt.exit().remove();
    doubt = doubt.enter().append('rect')
        .classed('doubt', true)
        .attr('stroke-width',1)
        // .attr('stroke', d=>d.parent?color('misto'):color('dubitativo'))
        // .attr('fill', d=>d.parent?gradient('misto'):gradient('dubitativo'))
        .attr('stroke', color('dubitativo'))
        .attr('fill', gradient('dubitativo'))
        .merge(doubt)
        .attr('stroke-dasharray',d=>x(d.doubt_end)-x(d.doubt_start) + ' ' + (x(d.doubt_end)-x(d.doubt_start)+2*Math.abs(y(d.depth||0))) )
        .attr('x',d=>x(d.doubt_x))
        .attr('y',d=>y(d.depth?d.depth:0))
        .attr('width',d=>x(d.doubt_end)-x(d.doubt_start))
        .attr('height',d=>Math.abs(y(d.depth||0)))
        .on('click', (d,i)=>{
            selectSiblings(['subject','doubt'],d)
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
        .attr('height',d=>Math.abs(y(d.depth||0)))
        .on('click', (d,i)=>{
            selectSiblings(['subject','doubt'],d)
        });
    
    label = label.data(doubts, d=>{return options.data.id+'-label-doubt-'+d.id});
    label.exit().remove();
    label = label.enter().append('text')
        .classed('label noselect', true)
        .attr('font-size','0.65rem')
        .attr('transform','rotate(-30)')
        .merge(label)
        .attr('x',d=>x(d.doubt_x) + (x(d.doubt_end) - x(d.doubt_start))/2 )
        .attr('y',d=>y(d.depth)-4)
        .attr('transform-origin',d=> `${x(d.doubt_x) + (x(d.doubt_end) - x(d.doubt_start))/2}px ${y(d.depth)-4}px`)
        .text(d=>'td '+ (+d.id.replace('pair-','')+1));

}

V.destroy = () => {
    console.log("destroy");
}

export default V;

function getOverlap(a_start, a_end, b_start, b_end){
    return Math.max(0, Math.min(a_end, b_end) - Math.max(a_start, b_start));
}

function selectSiblings(arrSelectors, data) {
    const _selector = '.'+arrSelectors.join(', .');
    d3.selectAll(_selector)
        .filter(element=>element.id===data.id)
        .classed('selected', function(){return !d3.select(this).classed('selected')});
    d3.select('#folding-line').classed('there-is-selection', d3.selectAll('#folding-line .selected').size()>0);
}