import * as d3 from 'd3';

const V = {}

let width,
    height,
    margin = {top: 20, right: 10, bottom: 40, left: 40},
    showPercentage,
    stackModeProperties = {
        "normalized": ["dubbio_perc", "misto_perc", "soggetto_perc", "definitivo_perc"],
        "absolute": ["dubbio", "misto", "soggetto", "definitivo"]
    },
    legendData = [
        {
          "id": "definitivo",
          "color": "#F3F3F3",
          "label": "Definitivo",
          "percentage": undefined,
          "baseCategory": true
        },
        {
            "id": "space-1",
            "color": "transparent",
            "label": " ",
            "percentage": undefined,
            "baseCategory": true
        },
        {
          "id": "soggetto",
          "color": "#FFD337",
          "label": "Soggetto",
          "percentage": undefined,
          "baseCategory": true
        },
        {
            "id": "space-2",
            "color": "transparent",
            "label": " ",
            "percentage": undefined,
            "baseCategory": true
        },
        {
          "id": "misto",
          "color": "#33CDAF",
          "label": "Misto",
          "percentage": undefined,
          "baseCategory": true
        },
        {
            "id": "space-3",
            "color": "transparent",
            "label": " ",
            "percentage": undefined,
            "baseCategory": true
        },
        {
          "id": "dubitativo",
          "color": "#CFCFFF",
          "label": "Dubitativo",
          "percentage": undefined,
          "baseCategory": true
        },
    ],

    svg,
    g,
    legend,
    legendItem,
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

    width = d3.select(el).node().getBoundingClientRect().width * 0.85;
    height = d3.select(el).node().getBoundingClientRect().height;

    svg = d3.select(el);
    g = svg.append("g");


    legend = svg.append("text")
    .attr("y", 10)
    .attr("x", 0)
    .text("TIPO DI TESTO")
    .attr("transform", `translate(${width},20)`);

    legend = svg.append("g")
    .classed("legend", true)
    .attr("transform", `translate(${width},60)`)

    legendItem = legend.selectAll(".legend-item");

    serie = g.selectAll(".serie");

    treemap_misto = svg.append("g")
    .classed("treemap-misto", true);

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

    let series = d3.stack().keys(stackModeProperties[stackMode])(data);

    x.domain(data.map(d => d.id));
    xAxis.call(xAxisCall.tickFormat(d=>data.find(datum=>datum.id===d).title))
        .call(g => xAxis.selectAll(".domain").remove())
        .call(g => xAxis.selectAll(".tick").style("display", "none"));

    y.domain([0, d3.max(series, d => d3.max(d, d => d[1]))]);
    yAxis.call(yAxisCall)
        .call(g => yAxis.selectAll(".domain").remove());

    const updateLegend = () => {
        legendItem = legendItem.data(legendData, d=>d.id)
        legendItem.exit().remove();
        legendItem = legendItem.enter().append("g")
            .classed("legend-item", true)
            .attr("id", d=>d.id)
            .on("click", (d)=>{
                console.log(d);
            })
            .merge(legendItem)
            // .attr("transform", (d,i)=>`translate(0,${i*20})`)
            .html(d=> {
                let this_percentage = ""
                if (showPercentage && d.percentage) this_percentage = " ("+d.percentage.toFixed(2)+"%)";
                let html = `<rect width="2rem" height="1rem" fill="${d.color}"></rect><text x="3rem" y="12">${d.label + '' + this_percentage}</text>`;
                return html;
            });

        legendItem.transition()
            .duration(0)
            .attr("transform", (d,i)=>`translate(0,${i*20})`);
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

        leaf_misto = leaf_misto.data([]);
        leaf_misto.exit().transition()
            .duration(500)
            .style("opacity",0)
            .remove();
        leaf_soggetto = leaf_soggetto.data([]);
        leaf_soggetto.exit().transition()
            .duration(500)
            .style("opacity",0)
            .remove();

        legendData = legendData.filter(d=>d.baseCategory);

        showPercentage = false;

        updateLegend();
    }

    removeSelectionAll();  // also calls updateLegend() inside


    serie = serie.data(series)
    serie.exit().remove()
    serie = serie.enter().append("g")
        .attr("class", (d,i)=>"serie serie-" + stackModeProperties[stackMode][i].replace("_perc","") )
        .merge(serie)
        .attr("fill", d => color(d.key.replace("_perc","")))

    let serie_rect = serie.selectAll("rect")
    serie_rect = serie_rect.data(d=>d);
    serie_rect.exit().remove();
    serie_rect = serie_rect.enter().append("rect")
        .merge(serie_rect)
        .attr("x", d => x(d.data.id))
        .attr("y", d => y(d[1]))
        .attr("height", d => y(d[0]) - y(d[1]))
        .attr("width", x.bandwidth())
        .style("opacity", .7)
        .style("cursor", "pointer")
        .on("mouseenter", d=>preSelection(d))
        .on("mouseleave", d=>removePreSelection(d))
        .on("click", function(d){
            // console.log(this);
            // console.log(d.data);
            if (!d3.select(this).classed("selected")) {
                selection(d, d3.select(this).classed("selected"))
            }
            else {
                removeSelectionAll();
            }
        });

    const preSelection = (d) => {
        const bar = d3.selectAll(".serie > rect").filter(rect=>rect.data.id===d.data.id);
        bar.style("opacity", 1);
        xAxis.selectAll(".tick").filter(tick=>tick===d.data.id).style("display", "block")
    }

    const removePreSelection = (d) => {
        const bar = d3.selectAll(".serie > rect").filter(rect=>rect.data.id===d.data.id)
        bar.style("opacity", .7)
        xAxis.selectAll(".tick").filter(tick=>tick===d.data.id).style("display", "none")
    }

    const selection = (d, isSelected) => {
        legendData = legendData.filter(d=>d.baseCategory);
        const allBars = d3.selectAll(".serie > rect").classed("selected", false);

        const width_factor = x.paddingOuter() * 2;
        const bar_index = data.map(d=>d.id).indexOf(d.data.id);
        const width_treemap = x.bandwidth()*width_factor;
        // const direction = bar_index*2>data.length?-1:1;

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
            .style("opacity", .7)
            .attr("width", x.bandwidth())
            .attr("transform", `translate(${ -width_treemap/2 }, 0)`);

        const ticks_on_left = xAxis.selectAll(".tick").filter((tick)=>{
            const this_index = x.domain().indexOf(tick);
            return this_index < bar_index;
        })
        ticks_on_left.transition()
            .duration(500)
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
            .attr("transform", d=>`translate(${ x(d) + x.bandwidth()/2 + width_treemap/2 }, 0)`);

        // draw treemap here
        // ref: https://observablehq.com/@d3/treemap

        let data_misto = d.data.levels_doubt.find(k=>k.name=="misto");
        // console.log(d.data);

        let height_misto = 0;

        if (data_misto) {
            const rect_misto = bar.filter( function(rect){ return d3.select(this.parentNode).classed("serie-misto")} );
            height_misto = rect_misto.attr("height");
            const x_misto = x(d.data.id) - width_treemap/2 + x.bandwidth()/2;
            const y_misto = rect_misto.attr("y");

            d3.select(".treemap-misto").attr("transform", `translate(${x_misto}, ${y_misto})`);

            legendData.find(d=>d.id==="definitivo").percentage = (d.data.definitivo/d.data.length) * 100;
            legendData.find(d=>d.id==="soggetto").percentage = (d.data.soggetto/d.data.length) * 100;
            legendData.find(d=>d.id==="misto").percentage = (d.data.misto/d.data.length) * 100;
            legendData.find(d=>d.id==="dubitativo").percentage = (d.data.dubbio/d.data.length) * 100;

            for(let iii=data_misto.children.length-1; iii>0; iii--) {
                const item = {
                    "id": "misto-"+data_misto.children[iii].name,
                    "color": d3.color(color("misto")).darker( 0.5*(+data_misto.children[iii].name-1) ),
                    "label": data_misto.children[iii].name + " volte",
                    "percentage": (data_misto.children[iii].value/d.data.length) * 100
                }
                const index = legendData.map(d=>d.id).indexOf("misto")+1
                legendData.splice( index, 0, item );
            }
            showPercentage = true;
            updateLegend();
        } else {
            data_misto = []
        }

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

        let data_soggetto = d.data.levels_doubt.find(k=>k.name=="soggetto");
        // console.log(d.data);
        // console.log(data_soggetto);

        let height_soggetto = 0;

        if (data_soggetto) {
            const rect_soggetto = bar.filter( function(rect){ return d3.select(this.parentNode).classed("serie-soggetto")} );
            height_soggetto = rect_soggetto.attr("height");
            const x_soggetto = x(d.data.id) - width_treemap/2 + x.bandwidth()/2;
            const y_soggetto = rect_soggetto.attr("y");

            d3.select(".treemap-soggetto").attr("transform", `translate(${x_soggetto}, ${y_soggetto})`);

            legendData.find(d=>d.id==="definitivo").percentage = (d.data.definitivo/d.data.length) * 100;
            legendData.find(d=>d.id==="soggetto").percentage = (d.data.soggetto/d.data.length) * 100;
            legendData.find(d=>d.id==="misto").percentage = (d.data.misto/d.data.length) * 100;
            legendData.find(d=>d.id==="dubitativo").percentage = (d.data.dubbio/d.data.length) * 100;

            for(let iii=data_soggetto.children.length-1; iii>0; iii--) {
                const item = {
                    "id": "soggetto-"+data_soggetto.children[iii].name,
                    "color": d3.color(color("soggetto")).darker( 0.5*(+data_soggetto.children[iii].name-1) ),
                    "label": data_soggetto.children[iii].name + " volte",
                    "percentage": (data_soggetto.children[iii].value/d.data.length) * 100
                }
                const index = legendData.map(d=>d.id).indexOf("soggetto")+1
                legendData.splice( index, 0, item );
            }
            showPercentage = true;
            updateLegend();
        } else {
            data_soggetto = []
        }

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

    const treemap = (data, width, height) => d3.treemap()
        .tile(d3.treemapBinary)
        .tile(d3.treemapSquarify)
        .size([width, height])
        .padding(0)
        .round(true)
    (d3.hierarchy(data)
        .sum(d => d.value)
        // .sort((a, b) => b.value - a.value))
        .sort((a, b) => b.name - a.name))
}

V.destroy = () => {
    console.log("destroy stacked bars dubbio fase 2")
}

export default V
