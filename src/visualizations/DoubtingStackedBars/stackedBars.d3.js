import * as d3 from 'd3';

const V = {}

let width,
    height,
    margin = {top: 30, right: 0, bottom: 50, left: 40},
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
          "id": "dubbio",
          "color": "#CFCFFF",
          "label": "Dubitativo",
          "percentage": undefined,
          "baseCategory": true
        },
        {
            "id": "space-4",
            "color": "transparent",
            "label": " ",
            "percentage": undefined,
            "baseCategory": true
        }
    ],

    svg,
    g,
    legend,
    legendItem,
    selector,
    serie,
    treemap_misto,
    leaf_misto,
    treemap_soggetto,
    leaf_soggetto,

    x = d3.scaleBand().padding(0.2).paddingOuter(10),
    xAxis,
    xAxisCall = d3.axisTop(x),
    y = d3.scaleLinear(),
    yAxis,
    yAxisCall = d3.axisLeft(y).ticks(10, "s"),
    color = d3.scaleOrdinal()
        .domain(stackModeProperties.absolute)
        .range(["#bbbbff","#00c19c","#ffc806","#eaeaea"])
        .unknown("#ccc"),
    performed_selection_data;

V.initialize = (el, data_for_update) => {
    console.log("initialize dubbio fase 2")

    width = d3.select(el).node().getBoundingClientRect().width * 0.85 - margin.left - margin.right;
    height = d3.select(el).node().getBoundingClientRect().height - margin.top - margin.bottom;

    svg = d3.select(el);
    g = svg.append("g")
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    legend = svg.append("g")
        .classed("legend", true)
        .attr("transform", `translate(${width + margin.left},${80})`);

        legend.append("text")
        .attr("y", -40)
        .attr("x", 0)
        // .attr("transform", `translate(${width},${margin.top})`)
        .text("TIPO DI TESTO")
        .append("tspan")
            .attr("font-size", "0.9rem")
            .text("(clicca per riordinare)")
            .attr("dy", "1.3rem")
            .attr("x", 0);
    
    selector = svg.append("g").classed("selector", true);

    legendItem = legend.selectAll(".legend-item");

    serie = g.selectAll(".serie");

    treemap_misto = svg.append("g")
        .classed("treemap-misto", true);

    leaf_misto = treemap_misto.selectAll(".leaf-misto");

    treemap_soggetto = svg.append("g").classed("treemap-soggetto", true);

    leaf_soggetto = treemap_soggetto.selectAll(".leaf-soggetto");

    x.range([0, width]);
    xAxis = svg.append("g").classed("axis x-axis", true)
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    y.range([height, 0]);
    yAxis = svg.append("g").classed("axis y-axis", true)
        // .attr("transform", `translate(${margin.left},0)`)
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Run update to populate viz
    V.update(data_for_update.data, data_for_update.stackMode)
}

const sortData = (data, property, stackMode) => {
    if (property !== "id") {
        if (stackMode==="normalized") {
            property += "_perc";
        }
        data = data.sort((a,b)=>Number(b[property])-Number(a[property]));
    } else {
        data = data.sort((a, b) => a.id_index.localeCompare(b.id_index))
        // data = data.sort((a,b) => (a[property] > b[property]) ? 1 : ((b[property] > a[property]) ? -1 : 0)); 
    }  
    return data;
}

V.update = (data, stackMode, baseLayer) => {
    console.log("update dubbio fase 2");

    let keys = JSON.parse(JSON.stringify(stackModeProperties[stackMode]));
    if (baseLayer && baseLayer !== "id" && baseLayer !== "definitivo") {
        for (var i=0; i < keys.length; i++) {
            if (keys[i].replace("_perc", "") === baseLayer) {
                var a = keys.splice(i,1);   // removes the item
                keys.unshift(a[0]);         // adds it back to the beginning
                break;
            }
        }
    }

    let series = d3.stack().keys(keys)(data);

    x.domain(data.map(d => d.id));
    xAxis
        .call(xAxisCall.tickFormat(d=>{
            const item = data.find(datum=>datum.id===d);
            return item.id + " - " + item.year + " - " + item.title;
        }))
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
            .merge(legendItem)
            .on("click", (d)=>{
                if (d.baseCategory) {
                    if (d.id !== "id" && !legendData.find(d=>d.id==="id")) {
                        let obj = {
                            "id": "id",
                            "color": "transparent",
                            "label": "Reset",
                            "percentage": undefined,
                            "baseCategory": true
                        }
                        legendData.push(obj);
                    } else if (d.id === "id") {
                        legendData.pop();
                    }

                    let sortedData = sortData(data, d.id, stackMode);
                    // d.id is the baselayer ordering setting
                    // In the Update cycle it is skipped if equal to "id" or "definitivo"
                    V.update(sortedData, stackMode, d.id);
                }
                
            })
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

    serie = serie.data(series, d=>d.key)
    serie.exit().remove()
    serie = serie.enter().append("g")
        .merge(serie)
        .attr("class", (d,i)=>"serie serie-" + keys[i].replace("_perc","") )
        .attr("fill", d => color(d.key.replace("_perc","")))

    let serie_rect = serie.selectAll("rect")
    serie_rect = serie_rect.data(d=>{
        d.forEach(dd=>dd.key=d.key)
        return d
    }, d=>d.key+'-'+d.data.id);
    serie_rect.exit().remove();
    serie_rect = serie_rect.enter().append("rect")
        .merge(serie_rect)
        .attr("id", d=>d.key+'-'+d.data.id)
        .attr("x", d => x(d.data.id))
        .attr("y", d => y(d[1]))
        .attr("height", d => y(d[0]) - y(d[1]))
        .attr("width", x.bandwidth())
        .style("opacity", .7)
        .on("mouseenter", d=>preSelection(d))
        .on("mouseleave", d=>removePreSelection(d))
        .on("click", function(d){
            // console.log(this);
            // console.log(d);
            if (!d3.select(this).classed("selected") && !d3.select(this).classed("filtered")) {
                selection(d, d3.select(this).classed("selected"));
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
        // remove any 'preSelection'
        if (performed_selection_data) {
            removePreSelection(performed_selection_data);
        }
        performed_selection_data = d;
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
            const y_misto = +rect_misto.attr("y");

            d3.select(".treemap-misto").attr("transform", `translate(${x_misto+margin.left}, ${y_misto+margin.top})`);

            legendData.find(d=>d.id==="definitivo").percentage = (d.data.definitivo/d.data.length) * 100;
            legendData.find(d=>d.id==="soggetto").percentage = (d.data.soggetto/d.data.length) * 100;
            legendData.find(d=>d.id==="misto").percentage = (d.data.misto/d.data.length) * 100;
            legendData.find(d=>d.id==="dubbio").percentage = (d.data.dubbio/d.data.length) * 100;

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
            .attr("width", d => d.x1 - d.x0)
            .attr("height", d => d.y1 - d.y0)
            .attr("fill",d=> d3.color(color("misto")).darker( 0.5*(+d.data.name-1) ) );

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
            const y_soggetto = +rect_soggetto.attr("y");

            d3.select(".treemap-soggetto").attr("transform", `translate(${x_soggetto+margin.left}, ${y_soggetto+margin.top})`);

            legendData.find(d=>d.id==="definitivo").percentage = (d.data.definitivo/d.data.length) * 100;
            legendData.find(d=>d.id==="soggetto").percentage = (d.data.soggetto/d.data.length) * 100;
            legendData.find(d=>d.id==="misto").percentage = (d.data.misto/d.data.length) * 100;
            legendData.find(d=>d.id==="dubbio").percentage = (d.data.dubbio/d.data.length) * 100;

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
            .attr("darkness", d=>d.data.name-1 )
            .attr("width", d => d.x1 - d.x0)
            .attr("height", d => d.y1 - d.y0)
            .attr("fill",d=> d3.color(color("soggetto")).darker( 0.5*(+d.data.name-1) ) );

        leaf_soggetto.transition()
            .delay(500)
            .duration(250)
            .style("opacity",1);

    }

    selector.attr('transform', `translate(${margin.left + x.step()*10}, ${height + margin.top + 5})`).selectAll('*').remove();

    let selector_prev = selector.append("g")
        .attr("transform", `translate(${-36},0)`)
        .on("click", ()=>{
            let index = x.domain().length-1;
            if (performed_selection_data){
                removePreSelection(performed_selection_data);
                let current_index = x.domain().indexOf( performed_selection_data.data.id );
                if (current_index > 0) {
                    index = current_index-1
                }
            }
            let the_value = x.domain()[index];
            let to_be_selected = d3.selectAll(".serie-dubbio rect").filter(d=>d.data.id===the_value).data()[0];
            preSelection(to_be_selected);
            selection(to_be_selected, false);
        })
        .append("image")
            .attr("width", 36)
            .attr("height", 36)
            .attr("href", process.env.PUBLIC_URL + "/arrow-left.svg")

    let selector_next = selector.append("g")
        .attr("transform", `translate(${width - x.step()*20},0)`)
        .on("click", ()=>{
            let index = 0;
            if (performed_selection_data){
                removePreSelection(performed_selection_data);
                let current_index = x.domain().indexOf( performed_selection_data.data.id );
                if (current_index < x.domain().length-1) {
                    index = current_index+1
                }
            }
            let the_value = x.domain()[index];
            let to_be_selected = d3.selectAll(".serie-dubbio rect").filter(d=>d.data.id===the_value).data()[0];
            preSelection(to_be_selected);
            selection(to_be_selected, false);
        })
        .append("image")
            .attr("width", 36)
            .attr("height", 36)
            .attr("href", process.env.PUBLIC_URL + "/arrow-right.svg")

    let selector_background = selector.append("rect")
        .attr("width", `${width-x.step()*20}`)
        .attr("height", 36)
        .attr("fill","WHITESMOKE")
    
    let selector_handle = selector.append("g")
        .style("cursor", "grab")
        .call(d3.drag()
            .on("start", function(){
                selector_handle_line.style("opacity", 1);
                if (performed_selection_data) {
                    removePreSelection(performed_selection_data);
                    removeSelectionAll();
                } 
            })
            .on("drag", function(){
                // console.log(d3.event.x)
                let event_x = d3.event.x;
                if (d3.event.x<0)
                    { event_x = 0 };
                if (d3.event.x > (width-x.step()*20) )
                    { event_x = (width-x.step()*20) };
                selector_handle.attr("transform",`translate(${event_x}, 0)`);

                let the_index = Math.round(d3.event.x / x.step());
                
                if (the_index<0)
                    { the_index = 0 };
                if (the_index > (x.domain().length - 1) )
                    { the_index = (x.domain().length - 1) };

                let the_value = x.domain()[the_index];
                xAxis.selectAll(".tick").style("display", "none").filter(tick=>tick===the_value).style("display", "block")

            })
            .on("end", function(){
                // console.log(d3.event.x)
                selector_handle_line.style("opacity", 0)
                let the_index = Math.round(d3.event.x / x.step());
                
                if (the_index<0)
                    { the_index = 0 };
                if (the_index > (x.domain().length - 1) )
                    { the_index = (x.domain().length - 1) };

                let the_value = x.domain()[the_index];
                let the_selection = d3.selectAll(".serie-dubbio rect").filter(d=>d.data.id===the_value);
                
                if (!the_selection.classed("selected") && !the_selection.classed("filtered")) {
                    preSelection(the_selection.data()[0])
                    selection(the_selection.data()[0], the_selection.classed("selected"));
                }
                    
            })
        )

    let selector_handle_area = selector_handle.append("rect")
        .attr("width", 36)
        .attr("x",-36/2)
        .attr("height", 36)
        .attr("fill","transparent");
    
    let selector_handle_cursor = selector_handle.append("rect")
        .attr("width", x.step()*2)
        .attr("x",-x.step()*2/2)
        .attr("height", 36)
        .attr("fill", "white")
        .attr("stroke", "black")
        .attr("rx", x.step()*2/2);
    
    let selector_handle_line = selector_handle.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", -height)
        .attr("stroke-width", 1) 
        .attr("stroke", "var(--navigation-borders)")
        .style("opacity", 0);

    const treemap = (data, width, height) => d3.treemap()
        .tile(d3.treemapBinary)
        .tile(d3.treemapSquarify)
        .size([width, height])
        .padding(0)
        .round(true)
    (d3.hierarchy(data)
        .sum(d => d.value)
        .sort((a, b) => b.name - a.name))
}

V.filter = (survive_filters) => {
    // console.log("filter visualization - survivers:", survive_filters.length);
    svg.classed('there-is-filter', true);
    serie.selectAll("rect")
        .classed('filtered', true)
        .filter(n => {
            return survive_filters.indexOf(n.data.id) > -1
        } ).classed('filtered', false);
}

V.destroy = () => {
    console.log("destroy stacked bars dubbio fase 2")
}

export default V
