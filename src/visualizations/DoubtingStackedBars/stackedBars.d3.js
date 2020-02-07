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
    treemap_misto,
    leaf_misto,
    treemap_soggetto,

    x = d3.scaleBand().padding(0.2),
    xAxis,
    xAxisCall = d3.axisBottom(x),
    y = d3.scaleLinear(),
    yAxis,
    yAxisCall = d3.axisLeft(y),
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
    serie = g.selectAll(".serie");
    treemap_misto = svg.append("g").classed("treemap-misto", true);
    leaf_misto = treemap_misto.selectAll(".leaf-misto");
    // treemap_soggetto = svg.append("g").classed("leaf-soggetto-g", true).selectAll("g")

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
        .attr("class", (d,i)=>"serie serie-" + stackModeProperties[stackMode][i].replace("_perc","") )
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
            .style("cursor", "pointer")
            .on("mouseenter", d=>preSelection(d))
            .on("mouseleave", d=>removePreSelection(d))
            .on("click", function(d){console.log(this, d.data); selection(d, d3.select(this).classed("selected"))});
    
    const preSelection = (d) => {
        const bar = d3.selectAll(".serie > rect").filter(rect=>rect.data.id===d.data.id);
        // bar.style("opacity", 1);
        xAxis.selectAll(".tick").filter(tick=>tick===d.data.id).style("display", "block")
    }

    const removePreSelection = (d) => {
        const bar = d3.selectAll(".serie > rect").filter(rect=>rect.data.id===d.data.id)
        // bar.style("opacity", .8)
        xAxis.selectAll(".tick").filter(tick=>tick===d.data.id).style("display", "none")
    }

    const selection = (d,isSelected) => {
        const allBars = d3.selectAll(".serie > rect").classed("selected", false);

        if (isSelected) {
            removeSelection();
            return;
        }

        const width_factor = 25;
        const bar_index = data.map(d=>d.id).indexOf(d.data.id);
        const width_treemap = x.bandwidth()*width_factor;
        const direction = bar_index*2>data.length?-1:1;

        const bar = d3.selectAll(".serie > rect").filter(rect=>rect.data.id===d.data.id);
        bar.classed("selected", true)
            .transition()
            .duration(500)
            .style("opacity", 1)
            .attr("transform", `translate(0,0)`)
            // .attr("width", x.bandwidth()*width_factor);
        
        const tick = xAxis.selectAll(".tick").filter((tick)=>tick===d.data.id)
        tick.transition()
            .duration(500)
            .attr("transform", d=>`translate(${ x(d) + x.bandwidth()/2 }, 0)`);

        const bars_on_left = d3.selectAll(".serie > rect").filter((rect)=>{
            const this_index = data.map(d=>d.id).indexOf(rect.data.id)
            return this_index < bar_index
        })
        bars_on_left.transition()
            .duration(500)
            .style("opacity", .6)
            .attr("transform", `translate(${ -width_treemap/2 }, 0)`);
        
        const ticks_on_left = xAxis.selectAll(".tick").filter((tick)=>{
            const this_index = x.domain().indexOf(tick);
            return this_index < bar_index;
        })
        ticks_on_left.transition()
            .duration(500)
            .style("opacity", .6)
            .attr("transform", d=>`translate(${ x(d) + x.bandwidth()/2 - width_treemap/2 }, 0)`);

        const bars_on_right = d3.selectAll(".serie > rect").filter((rect)=>{
            const this_index = data.map(d=>d.id).indexOf(rect.data.id)
            return this_index > bar_index
        })
        bars_on_right.transition()
            .duration(500)
            .style("opacity", .3)
            .attr("transform", `translate(${ width_treemap/2 },0)`);
        
        const ticks_on_right = xAxis.selectAll(".tick").filter((tick)=>{
            const this_index = x.domain().indexOf(tick);
            return this_index > bar_index;
        })
        ticks_on_right.transition()
            .duration(500)
            .style("opacity", .6)
            .attr("transform", d=>`translate(${ x(d) + x.bandwidth()/2 + width_treemap/2 }, 0)`);
        
        // draw treemap here

        // const rect_misto = bar.filter(function(rect){
        //     return d3.select(this.parentNode).classed("serie-misto")
        // })

        // console.log(rect_misto.node())

        // const data_misto = rect_misto.data()[0].data.levels_doubt.find(d=>d.key==="misto");

        // console.log(d.data)

        // console.log( data.find(dd=>dd.id=d.data.id).levels_doubt )

        // console.log(data_misto)
        
        // if (data_misto && data_misto.key && false) {

        //     const height_misto = rect_misto.attr("height");
        //     const x_misto = rect_misto.attr("x");
        //     const y_misto = rect_misto.attr("y");
        //     const data_misto = rect_misto.data()[0].data.levels_doubt.find(d=>d.key==="misto");
    
        //     data_misto.name = data_misto.key;
        //     data_misto.children = data_misto.values.map(c=>{
        //         return {
        //             'name': c.key,
        //             'value': c.value
        //         }
        //     });
        //     delete data_misto.key;
        //     delete data_misto.values;
        
        //     // d3.selectAll(".leaf-misto-g").attr("transform", `translate(${x_misto}, ${y_misto})`)
    
        //     const root_misto = treemap(data_misto, width_treemap, height_misto);
    
        //     leaf_misto = leaf_misto.data(root_misto.leaves(), l=>d.data.id + '-' + l.data.name);
        //     leaf_misto.exit().remove();
        //     leaf_misto = leaf_misto.enter().append("g")
        //         .classed("leaf-misto", true)
        //         .merge(leaf_misto)
        //         .attr("transform", d => `translate(${d.x0},${d.y0})`)
    
        //     leaf_misto.selectAll("rect").remove()
        //     leaf_misto.append("rect")
        //         .attr("id", l=>d.data.id + '-' + l.data.name)
        //         .attr("darkness", d=>d.data.name-1)
        //         .attr("fill", d => {
        //             while (d.depth > 1) d = d.parent;
        //             return d3.color(color("misto")).darker( 0.35*(+d.data.name-1) ); })
        //         .attr("fill-opacity", 1)
        //         .attr("width", d => d.x1 - d.x0)
        //         .attr("height", d => d.y1 - d.y0);
        // }

        // const rect_soggetto = bar.filter(function(rect){
        //     return d3.select(this.parentNode).classed("serie-soggetto")
        // })
        // const height_soggetto = rect_soggetto.attr("height");
        // const data_soggetto = rect_soggetto.data()[0].data.levels_doubt.find(d=>d.key==="soggetto");

        // data_soggetto.name = data_soggetto.key
        // data_soggetto.children = data_soggetto.values.map(c=>{
        //     return {
        //         'name': c.key,
        //         'value': c.value
        //     }
        // })
        // delete data_soggetto.key
        // delete data_soggetto.values

        // console.log(data_soggetto)
    }

    const removeSelection = () => {
        const allBars = d3.selectAll(".serie > rect");
        allBars.classed("selected", false)
            .transition()
                .duration(500)
                .attr("transform", `translate(0,0)`)
                .attr("width", x.bandwidth())
                .style("opacity", .8);
        
        const allTicks = xAxis.selectAll(".tick")
        allTicks.attr("transform", d=>`translate(${ x(d) + x.bandwidth()/2 }, 0)`);
    }

    const treemap = (data, width, height) => d3.treemap()
        .tile(d3.treemapBinary)
        .size([width, height])
        .padding(0)
        .round(true)
    (d3.hierarchy(data)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value))
}

V.destroy = () => {
    console.log("destroy stacked bars dubbio fase 2")
}

export default V