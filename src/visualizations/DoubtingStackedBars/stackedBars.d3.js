import * as d3 from 'd3';

const V = {}

let width,
    height,
    margin = {top: 20, right: 10, bottom: 40, left: 40},
    stackModeProperties = {
        "normalized": ["dubbio_perc", "misto_perc", "soggetto_perc", "definitivo_perc"],
        "absolute": ["dubbio", "misto", "soggetto", "definitivo"]
    },
    
    svg,
    g,
    serie,

    x = d3.scaleBand().padding(0.2),
    xAxis,
    xAxisCall = d3.axisBottom(x),
    y = d3.scaleLinear(),
    yAxis,
    yAxisCall = d3.axisLeft(y).ticks(null, "s"),
    color = d3.scaleOrdinal()
        .domain(stackModeProperties.absolute)
        .range(["#9469bf","#69bfbf","#94bf69","#cccccc"])
        .unknown("#ccc")

V.initialize = (el, data_for_update) => {
    console.log("initialize dubbio fase 2")
    // console.log(el)


    width = d3.select(el).node().getBoundingClientRect().width;
    height = d3.select(el).node().getBoundingClientRect().height;

    svg = d3.select(el);
    g = svg.append("g");
    serie = g.selectAll(".serie")

    x.range([margin.left, width - margin.right]);
    xAxis = svg.append("g").classed("axis x-axis", true)
        .attr("transform", `translate(0,${height - margin.bottom})`);

    y.range([height - margin.bottom, margin.top]);
    yAxis = svg.append("g").classed("axis y-axis", true)
        .attr("transform", `translate(${margin.left},0)`);

    // Run update to populate viz
    V.update(data_for_update.data, data_for_update.stackMode)
}

V.update = (data, stackMode) => {
    console.log("update dubbio fase 2")

    let series = d3.stack().keys(stackModeProperties[stackMode])(data)

    x.domain(data.map(d => d.id));
    xAxis.call(xAxisCall.tickFormat(d=>data.find(datum=>datum.id===d).title))
        .call(g => xAxis.selectAll(".domain").remove())
        .call(g => xAxis.selectAll(".tick").style("display", "none"));

    y.domain([0, d3.max(series, d => d3.max(d, d => d[1]))]);
    yAxis.call(yAxisCall)
        .call(g => yAxis.selectAll(".domain").remove());

    serie = serie.data(series)
    serie.exit().remove()
    serie = serie.enter().append("g")
        .classed("serie", true)
            .join("g")
        .attr("fill", d => color(d.key.replace("_perc","")))
        .selectAll("rect")
        .data(d => d)
        .join("rect")
            .attr("x", d => x(d.data.id))
            .attr("y", d => y(d[1]))
            .attr("height", d => y(d[0]) - y(d[1]))
            .attr("width", x.bandwidth())
            .style("opacity", .8)
            .on("mouseenter", d=>preSelection(d))
            .on("mouseleave", d=>removePreSelection(d))
            .on("click", (d)=>selection(d));
    
    const preSelection = (d) => {
        const bar = d3.selectAll(".serie > rect").filter(rect=>rect.data.id===d.data.id);
        bar.style("opacity", 1);
        xAxis.selectAll(".tick").filter(tick=>tick===d.data.id).style("display", "block")
    }

    const removePreSelection = (d) => {
        const bar = d3.selectAll(".serie > rect").filter(rect=>rect.data.id===d.data.id)
        bar.style("opacity", .8)
        xAxis.selectAll(".tick").filter(tick=>tick===d.data.id).style("display", "none")
    }

    const selection = (d) => {
        removeSelection();

        const width_factor = 20;
        const bar = d3.selectAll(".serie > rect").filter(rect=>rect.data.id===d.data.id)
        bar.transition()
            .duration(0)
            .attr("width", x.bandwidth()*width_factor)
            .style("opacity", 1);;

        const bar_index = data.map(d=>d.id).indexOf(d.data.id);
        const direction = bar_index*2>data.length?-1:1;

        const bars_to_move = d3.selectAll(".serie > rect").filter((rect)=>{
            const this_index = data.map(d=>d.id).indexOf(rect.data.id)
            return direction===1?this_index > bar_index:this_index <= bar_index
        })
        bars_to_move.transition()
            .duration(0)
            .attr("transform", `translate(${x.bandwidth()*(width_factor-1)*direction},0)`);
    }

    const removeSelection = () => {
        const allBars = d3.selectAll(".serie > rect");
        allBars.attr("transform", `translate(0,0)`)
            .attr("width", x.bandwidth())
            .style("opacity", .8);
    }
}

V.destroy = () => {
    console.log("destroy stacked bars dubbio fase 2")
}

export default V