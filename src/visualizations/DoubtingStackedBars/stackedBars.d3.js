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
    leaf_soggetto,

    x = d3.scaleBand().padding(0.2).paddingOuter(10),
    xAxis,
    xAxisCall = d3.axisBottom(x),
    y = d3.scaleLinear(),
    yAxis,
    yAxisCall = d3.axisLeft(y),
    color = d3.scaleOrdinal()
        .domain(stackModeProperties.absolute)
        .range(["#bbbbff","#00c19c","#ffc806","#f0f0f0"])
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
    treemap_soggetto = svg.append("g").classed("treemap-soggetto", true);
    leaf_soggetto = treemap_soggetto.selectAll(".leaf-soggetto");

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
            .on("click", function(d){
                // console.log(this);
                // console.log(d.data);
                if (!d3.select(this).classed("selected")) {
                    selection(d, d3.select(this).classed("selected"))
                } else {
                    removeSelectionAll();
                }
            });
    
            d3.selectAll(".serie").each(function(d){
                const _class = d3.select(this).attr("class").split(" ")[1].split("-")[1]
                d3.select(this).selectAll("rect").each(function(dd){
                    let _id = _class + '-' + dd.data.id;
                    d3.select(this).attr("id", _id )
                })
            })
    
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

    const selection = (d, isSelected) => {
        const allBars = d3.selectAll(".serie > rect").classed("selected", false);

        const width_factor = x.paddingOuter() * 2;
        const bar_index = data.map(d=>d.id).indexOf(d.data.id);
        const width_treemap = x.bandwidth()*width_factor;
        const direction = bar_index*2>data.length?-1:1;

        const bar = d3.selectAll(".serie > rect").filter(rect=>rect.data.id===d.data.id);
        bar.classed("selected", true)
            .transition()
            .duration(500)
            .style("opacity", 1)
            .attr("transform", `translate(${ -width_treemap/2 + x.bandwidth()/2 },0)`)
            .attr("width", x.bandwidth()*width_factor);
        
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
            .style("opacity", .8)
            .attr("width", x.bandwidth())
            .attr("transform", `translate(${ -width_treemap/2 }, 0)`);
        
        const ticks_on_left = xAxis.selectAll(".tick").filter((tick)=>{
            const this_index = x.domain().indexOf(tick);
            return this_index < bar_index;
        })
        ticks_on_left.transition()
            .duration(500)
            .style("opacity", .8)
            .attr("transform", d=>`translate(${ x(d) + x.bandwidth()/2 - width_treemap/2 }, 0)`);

        const bars_on_right = d3.selectAll(".serie > rect").filter((rect)=>{
            const this_index = data.map(d=>d.id).indexOf(rect.data.id)
            return this_index > bar_index
        })
        bars_on_right.transition()
            .duration(500)
            .attr("width", x.bandwidth())
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
        // ref: https://observablehq.com/@d3/treemap

        let data_misto = d.data.levels_doubt.find(k=>k.name=="misto");
        // console.log(d.data);
        // console.log(data_misto);

        if (data_misto) {
            const rect_misto = bar.filter( function(rect){ return d3.select(this.parentNode).classed("serie-misto")} );            
            const height_misto = rect_misto.attr("height");
            const x_misto = x(d.data.id) - width_treemap/2 + x.bandwidth()/2;
            const y_misto = rect_misto.attr("y");

            d3.select(".treemap-misto")
                .attr("transform", `translate(${x_misto}, ${y_misto})`);

            d3.selectAll(".circle-test").remove();
            g.append("circle").classed("circle-test", true).attr("r",3).attr("cx",x_misto).attr("cy",y_misto);

            const root_misto = treemap(data_misto, width_treemap, height_misto);
            leaf_misto = leaf_misto.data(root_misto.leaves(), l=>d.data.id + '-' + l.data.name);
            leaf_misto.exit().remove();
            leaf_misto = leaf_misto.enter().append("g")
                .classed("leaf-misto", true)
                .merge(leaf_misto)
                .style("opacity",0)
                .attr("transform", d => `translate(${d.x0},${d.y0})`);
            
            let leaf_misto_rect = leaf_misto.selectAll("rect").data(d=>[d])
            leaf_misto_rect.exit().remove()
            leaf_misto_rect = leaf_misto_rect.enter().append("rect")
                .merge(leaf_misto_rect)    
                .attr("darkness", d=>d.data.name-1)
                .attr("fill",d=> d3.color(color("misto")).darker( 0.5*(+d.data.name-1) ) )
                .attr("width", d => d.x1 - d.x0)
                .attr("height", d => d.y1 - d.y0);

            leaf_misto.transition()
                .delay(500)
                .duration(250)
                .style("opacity",1);

        }

        let data_soggetto = d.data.levels_doubt.find(k=>k.name=="soggetto");
        // console.log(d.data);
        // console.log(data_soggetto);

        if (data_soggetto) {
            const rect_soggetto = bar.filter( function(rect){ return d3.select(this.parentNode).classed("serie-soggetto")} );            
            const height_soggetto = rect_soggetto.attr("height");
            const x_soggetto = x(d.data.id) - width_treemap/2 + x.bandwidth()/2;
            const y_soggetto = rect_soggetto.attr("y");

            d3.select(".treemap-soggetto")
                .attr("transform", `translate(${x_soggetto}, ${y_soggetto})`);

            d3.selectAll(".circle-test").remove();
            g.append("circle").classed("circle-test", true).attr("r",3).attr("cx",x_soggetto).attr("cy",y_soggetto);

            const root_soggetto = treemap(data_soggetto, width_treemap, height_soggetto);
            leaf_soggetto = leaf_soggetto.data(root_soggetto.leaves(), l=>d.data.id + '-' + l.data.name);
            leaf_soggetto.exit().remove();
            leaf_soggetto = leaf_soggetto.enter().append("g")
                .classed("leaf-soggetto", true)
                .merge(leaf_soggetto)
                .style("opacity",0)
                .attr("transform", d => `translate(${d.x0},${d.y0})`);
            
            let leaf_soggetto_rect = leaf_soggetto.selectAll("rect").data(d=>[d])
            leaf_soggetto_rect.exit().remove()
            leaf_soggetto_rect = leaf_soggetto_rect.enter().append("rect")
                .merge(leaf_soggetto_rect)    
                .attr("darkness", d=>d.data.name-1)
                .attr("fill",d=> d3.color(color("soggetto")).darker( 0.5*(+d.data.name-1) ) )
                .attr("width", d => d.x1 - d.x0)
                .attr("height", d => d.y1 - d.y0);

            leaf_soggetto.transition()
                .delay(500)
                .duration(250)
                .style("opacity",1);

        }

    }

    const removeSelectionAll = () => {
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
        .tile(d3.treemapSquarify)
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