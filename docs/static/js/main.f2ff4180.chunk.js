(window["webpackJsonpatlante-calvino-project"]=window["webpackJsonpatlante-calvino-project"]||[]).push([[0],{19:function(e,t,n){e.exports=n(40)},24:function(e,t,n){},25:function(e,t,n){},26:function(e,t,n){},27:function(e,t,n){},33:function(e,t,n){},34:function(e,t,n){},35:function(e,t,n){},36:function(e,t,n){},38:function(e,t,n){},39:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(15),o=n.n(i),s=(n(24),n(25),n(16)),c=n(4),l=n(5),u=n(7),d=n(6),f=n(2),p=n(8),h=(n(26),function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"the-header",style:this.props.style},this.props.children)}}]),t}(a.Component)),g=(n(27),function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:this.props.className},this.props.children)}}]),t}(a.Component)),m=n(10),b=n(12),y=(n(33),function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"main-menu",style:this.props.style},r.a.createElement(m.a,{icon:b.a}))}}]),t}(a.Component)),v=n(1),k=function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{style:this.props.style},"Loading ...")}}]),t}(a.Component),O=(n(34),function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).handleChange=n.handleChange.bind(Object(f.a)(n)),n}return Object(p.a)(t,e),Object(l.a)(t,[{key:"handleChange",value:function(e){var t=e.target.checked;this.props.selected(t)}},{key:"render",value:function(){return r.a.createElement("div",{className:"set-option",style:this.props.style},r.a.createElement("h5",null,this.props.title),r.a.createElement("label",{className:"switch"},r.a.createElement("input",{type:"checkbox",onChange:this.handleChange}),r.a.createElement("span",{className:"slider round"})))}}]),t}(a.Component)),x=O;O.defaultProps={title:"Option"};n(35);var j={initialize:function(e,t,n){j.changeSpan=n;j.margin={top:0,right:15,bottom:e.getBoundingClientRect().height-20,left:15},j.svg=v.t(e),j.width=e.getBoundingClientRect().width-j.margin.left-j.margin.right,j.height=e.getBoundingClientRect().height-j.margin.top-j.margin.bottom,j.svg.append("defs").append("clipPath").attr("id","timeclip").append("rect").classed("clip",!0).attr("x",0).attr("y",j.margin.top).attr("width",j.width+j.margin.left+j.margin.right).attr("height",j.height).attr("transform","translate("+-j.margin.left+","+-j.margin.top+")"),j.x=v.s().range([0,j.width]).domain(v.f(t,(function(e){return e}))),j.xAxis=v.a(j.x),j.brush=v.c().extent([[0,0],[j.width,j.height]]).handleSize(30).on("brush end",N),j.context=j.svg.append("g").attr("class","context").attr("transform","translate("+j.margin.left+","+j.margin.top+")"),j.info=j.context.append("g").selectAll(".info"),j.line=j.context.append("g").selectAll(".info-line"),j.dotted=j.context.append("g").selectAll(".dotted"),j.context.append("line").attr("x1",0).attr("y1",j.height/2).attr("x2",j.width).attr("y2",j.height/2).attr("stroke","var(--dark-green)"),j.context.append("g").attr("class","brush").call(j.brush).call(j.brush.move,j.x.range())},update:function(e){j.info=j.info.data(e,(function(e){return e})),j.info.exit().remove(),j.info=j.info.enter().append("text").attr("class","info").attr("x",(function(e){return j.x(e)})).attr("y",j.height+j.margin.top+12).attr("text-anchor",(function(e,t){return function(e,n,a){return t%2===0?n(e)>=a/4?"end":"start":n(e)<=a/4*3?"start":"end"}(e,j.x,j.width)})).text((function(e){return e.getFullYear()})).merge(j.info),j.line=j.line.data(e,(function(e){return e})),j.line.exit().remove(),j.line=j.line.enter().append("line").attr("class","info-line").attr("stroke","var(--calvino-red)").attr("stroke-width","2px").attr("x1",(function(e){return j.x(e)})).attr("y1",0).attr("x2",(function(e){return j.x(e)})).attr("y2",j.height).merge(j.line),j.dotted=j.dotted.data([e],(function(e,t){return e})),j.dotted.exit().remove(),j.dotted=j.dotted.enter().append("line").attr("class","dotted").attr("x1",j.info._groups[0][0].getBBox().x+j.info._groups[0][0].getBBox().width+5).attr("x2",j.info._groups[0][1].getBBox().x-5).attr("y1",j.height+j.margin.top+6).attr("y2",j.height+j.margin.top+6).attr("stroke-width","1.5px").attr("stroke","var(--dark-green)").attr("stroke-linecap","round").attr("stroke-dasharray","0,15").merge(j.dotted)},destroy:function(e){}},E=j;function N(){if((!v.e.sourceEvent||"zoom"!==v.e.sourceEvent.type)&&v.e.selection){var e=v.e.selection||j.x.range();e=e.map((function(e){return j.x.invert(e)})),v.e.type,j.changeSpan(e),e=e.map((function(e){return new Date(e)})),j.update(e)}}var S=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).changeSpan=n.changeSpan.bind(Object(f.a)(n)),n}return Object(p.a)(t,e),Object(l.a)(t,[{key:"changeSpan",value:function(e){this.props.changeSpan(e)}},{key:"componentDidMount",value:function(){this._chart=E.initialize(this._rootNode,this.props.data,this.changeSpan)}},{key:"componentDidUpdate",value:function(){}},{key:"componentWillUnmount",value:function(){E.destroy(this._rootNode)}},{key:"_setRef",value:function(e){this._rootNode=e}},{key:"render",value:function(){return r.a.createElement("div",{style:this.props.style},r.a.createElement("h5",null,this.props.title),r.a.createElement("svg",{id:"time-filter",ref:this._setRef.bind(this)}))}}]),t}(a.Component),C=S;S.defaultProps={title:"Time Filter"};n(36);var w=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).handleChange=n.handleChange.bind(Object(f.a)(n)),n}return Object(p.a)(t,e),Object(l.a)(t,[{key:"handleChange",value:function(){var e=document.getElementById(this.props.id).getElementsByTagName("input");e=(e=(e=(e=Array.from(e)).map((function(e){return{name:e.name,status:e.checked}}))).filter((function(e){return e.status}))).map((function(e){return e.name})),this.props.changeOptions(e)}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{style:this.props.style},r.a.createElement("h5",null,this.props.title),r.a.createElement("ul",{id:this.props.id,className:"multiple-selection-menu"},this.props.options.map((function(t,n){return r.a.createElement("li",{key:n},r.a.createElement("input",{type:"checkbox",name:t,onChange:e.handleChange,defaultChecked:!0}),t)}))))}}]),t}(a.Component),_=w;w.defaultProps={title:"Select an option"};var A=n(9),T=n.n(A),L=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).handleChange=n.handleChange.bind(Object(f.a)(n)),n}return Object(p.a)(t,e),Object(l.a)(t,[{key:"handleChange",value:function(e){this.props.changeOption(e.target.value)}},{key:"render",value:function(){return r.a.createElement("select",{style:this.props.style,onChange:this.handleChange},this.props.options.map((function(e,t){return r.a.createElement("option",{key:t},e)})))}}]),t}(a.Component),D=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).debounceTyping=T.a.debounce((function(e){n.props.searching(e)}),250),n.handleTyping=n.handleTyping.bind(Object(f.a)(n)),n.selectResult=n.selectResult.bind(Object(f.a)(n)),n}return Object(p.a)(t,e),Object(l.a)(t,[{key:"handleTyping",value:function(e){e.target.value.length>=this.props.minLength&&this.debounceTyping(e.target.value)}},{key:"selectResult",value:function(e){this.props.selectResult(e.target.getAttribute("data-attr"))}},{key:"render",value:function(){var e=this,t={backgroundColor:"peachpuff"};return r.a.createElement("div",{style:this.props.style},r.a.createElement("input",{type:"text",name:"fname",placeholder:"Inserisci un nome",onChange:this.handleTyping}),r.a.createElement("ul",{style:{position:"absolute"}},this.props.previewSearch.slice(0,8).map((function(n,a){return r.a.createElement("li",{style:t,key:a,onClick:e.selectResult,"data-attr":n.values},n.key)}))))}}]),t}(a.Component),R=function(e){function t(e){var n;Object(c.a)(this,t);var a=(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).props.originalData.map((function(e){return e.pubVenueTitle.split(";")}));a=T.a.flattenDeep(a),a=v.m().key((function(e){return e})).entries(a).map((function(e){return e.key}));var r=[];return a.forEach((function(e){var t=n.props.originalData.filter((function(t){return t.pubVenueTitle.includes(e)})),a={key:e,values:t.map((function(e){return e.id}))};r.push(a)})),n.state={option:n.props.options[0],previewSearch:[],publicationsTitles:a,nodesByPublicationTitle:r},n.handleSearch=n.handleSearch.bind(Object(f.a)(n)),n.changeOption=n.changeOption.bind(Object(f.a)(n)),n.searching=n.searching.bind(Object(f.a)(n)),n.selectResult=n.selectResult.bind(Object(f.a)(n)),n.resetSearch=n.resetSearch.bind(Object(f.a)(n)),n}return Object(p.a)(t,e),Object(l.a)(t,[{key:"handleSearch",value:function(e){this.props.searchRecord(e)}},{key:"changeOption",value:function(e){var t=this.props.options.filter((function(t){return t.label===e}))[0];this.setState({option:t})}},{key:"searching",value:function(e){var t=this,n=[];(n="raccolta"===this.state.option.label?this.state.nodesByPublicationTitle.filter((function(t){return t.key.toLowerCase().includes(e.toLowerCase())})):v.m().key((function(e){return e[t.state.option.dimension]})).entries(this.props.originalData).map((function(e){return{key:e.key,values:e.values.map((function(e){return e.id}))}})).filter((function(t){return t.key.toLowerCase().includes(e.toLowerCase())}))).length&&this.setState({previewSearch:n})}},{key:"selectResult",value:function(e){this.setState({previewSearch:[]}),this.props.searchRecord(e.split(","))}},{key:"resetSearch",value:function(){this.props.resetSearch()}},{key:"render",value:function(){return r.a.createElement("div",{className:"filter-search",style:this.props.style},r.a.createElement("h5",null,this.props.title),r.a.createElement(L,{style:{display:"inline-block"},options:this.props.options.map((function(e){return e.label})),changeOption:this.changeOption}),r.a.createElement(D,{style:{display:"inline-block"},searching:this.searching,previewSearch:this.state.previewSearch,selectResult:this.selectResult,minLength:this.props.minLength}),this.props.search&&this.props.search.length>0&&r.a.createElement("span",{onClick:this.resetSearch},r.a.createElement(m.a,{icon:b.b})))}}]),t}(a.Component),P=R;R.defaultProps={title:"Search for a Record"};n(38);var z,F,B,M,I,Y,U,V,W,q,G,H,J,X,$,K,Q,Z,ee,te,ne,ae,re,ie,oe=n(17),se=function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"more-info"},r.a.createElement(m.a,{icon:oe.a}))}}]),t}(a.Component),ce=(n(39),{parser:function(e){e.forEach((function(e){e.year=new Date(e.year)}));var t=e.map((function(e){return e.year=new Date(e.year),e.id||(e.id=e["data.id"]),{id:e.id,label:e.Occorrenza,part_of:e["Parte di ID"],source:e.Fonte,sourceTitle:e["Titolo Fonte"],year:+e.year,category:e.Categoria,totalSubNodes:0,publicationType:e["Pubblicazione Fonte"].split(";"),pubVenueTitle:e["Pubblicazioni Titoli"],isGuessed:e["Luogo desunto"],themes:e.Tema.split(";")}})),n=ce.handleHierarchies(t);return{graph:ce.calculateNetwork(n),data:t}},handleHierarchies:function(e){var t=v.m().key((function(e){return e.part_of})).entries(e);return t.filter((function(e){return""===e.key}))[0].values.forEach((function(e){var n=t.find((function(t){return t.key===e.id}));n&&(e.subNodes=n.values,e.totalSubNodes=n.values.length,n.values.forEach((function(n){var a=t.find((function(e){return e.key===n.id}));a&&(n.subNodes=a.values,n.totalSubNodes=a.values.length,e.totalSubNodes+=n.totalSubNodes,a.values.forEach((function(n){var a=t.find((function(e){return e.key===n.id}));a&&(n.subNodes=a.values,n.totalSubNodes=a.values.length,e.totalSubNodes+=n.totalSubNodes,a.values.forEach((function(a){var r=t.find((function(e){return e.key===a.id}));r&&(a.subNodes=r.values,a.totalSubNodes=r.values.length,e.totalSubNodes+=n.totalSubNodes)})))})))})))})),t.filter((function(e){return""===e.key}))[0].values},calculateNetwork:function(e){var t=[];return v.m().key((function(e){return e.source})).entries(e).forEach((function(e){e.values.filter((function(e){return""!==e.part_of})).forEach((function(n,a){var r;r={source:n.id,target:n.part_of,volume:e.key,source_part_of:n.part_of,kind:"part_of"},t.push(r)}))})),{nodes:e,edges:t,root_nodes:e.filter((function(e){return e.subNodes}))}}}),le=ce,ue={},de=["generico_non_terrestre","nominato_non_terrestre","nominato_terrestre","generico_terrestre","inventato","no_ambientazione"],fe=["#3131ff","#bbbbff","#ffce00","#ff6c39","#00c19c","#cecece"],pe=[],he=[],ge=[],me=[],be=0,ye=!1,ve=!1;function ke(e,t){if(e.subNodes&&e.subNodes.length){""===e.part_of&&(e.fx=1*e.x,e.fy=1*e.y),e.subNodes.forEach((function(t,n){t.x=e.x,t.y=e.y})),e.opened=!0;var n=[e].concat(e.subNodes);ge.push(n),ge.forEach((function(e){e.indexOf(n[0])>0&&n.forEach((function(t,n){0!==n&&e.push(t)}))}));var a=pe.concat(e.subNodes);F=le.calculateNetwork(a),pe=F.nodes,he=F.edges,!1!==t&&ue.update(F,B)}else console.log("No nodes to expand")}function Oe(e,t){if(e.opened){e.opened=!1,e.fx=null,e.fy=null;var n=[],a=[e.id];return function e(t){t.subNodes.forEach((function(t){t.opened&&(t.opened=!1,a.push(t.id),e(t))})),n.push(t.subNodes)}(e),n.forEach((function(e){var t=e.map((function(e){return e.id})),n=pe.filter((function(e){return!t.includes(e.id)}));(ge=ge.filter((function(e){return!a.includes(e[0].id)}))).forEach((function(e,n){ge[n]=e.filter((function(e){return!t.includes(e.id)}))})),F=le.calculateNetwork(n),pe=F.nodes,he=F.edges})),void(!1!==t&&ue.update(F,B))}}function xe(e,t){t&&Ee(),e.forEach((function(e){te.filter((function(t){return t.source!==e.source})).style("opacity",.1),ne.filter((function(t){return t.source!==e.source})).style("opacity",.1),ae.filter((function(t){return e.id===t.id})).classed("selected",!0).style("display","block"),je([e])}))}V={top:0,right:50,bottom:30,left:50};var je=function(e){(re=re.data(e,(function(e){return e.id}))).exit().remove(),re=re.enter().append("text").classed("information",!0).classed("label",!0).attr("text-anchor",(function(e){return M(e.year)>=W/2?"end":"start"})).attr("x",(function(e){return M(e.year)>=W/2?M(e.year)+4.8:M(e.year)-3.2})).attr("y",q-10).text((function(e){return M(e.year)>=W/2?e.sourceTitle+" \u2193":"\u2193 "+e.sourceTitle})).merge(re)};function Ee(){ve||(te.style("opacity",1),ne.style("opacity",1),ae.classed("selected",!1).style("display","none"),je([]))}ue.initialize=function(e,t,n,a){F=t,me=t.nodes.filter((function(e){return e.totalSubNodes>0})),z=a,J=v.t(e).style("touch-action","manipulation"),W=J.node().getBoundingClientRect().width-V.left-V.right,q=J.node().getBoundingClientRect().height-V.top-V.bottom;var r=v.x().translateExtent([[0,0],[W+V.left+V.right,q+V.top+V.bottom]]).scaleExtent([1,10]).on("zoom",(function(){$.attr("transform",v.e.transform),Q.attr("transform",v.e.transform);var e=v.e.transform.rescaleX(M);K.call(G.scale(e));parseInt(v.t("html").style("font-size"));v.t(".labels").style("font-size",(function(e){var t=.75/v.e.transform.k;return t+="rem"})),re.attr("x",(function(t){return e(t.year)>=W/2?e(t.year)+4.8:e(t.year)-3.2}))}));J.call(r).on("dblclick.zoom",null),M=v.s().range([0,W]).domain(v.f(t.nodes,(function(e){return e.year}))),G=v.a(M).ticks(v.v.every(1)),I=v.q().range([0,q]).padding(.5),H=v.b(I).tickSize(W).tickFormat((function(e){return e=e.replace(/_/g," ")})),I.domain(de),Y=v.r().exponent(.5).range([3,25]).domain([1,v.l(t.nodes,(function(e){return e.totalSubNodes}))]),U=v.p().domain(de).range(fe),J.append("rect").classed("reset",!0).attr("x",V.left).attr("width",W).attr("height",q).attr("fill","transparent").on("click",(function(e){ve=!1,v.e.timeStamp-be<500&&Ee(),be=v.e.timeStamp})),X=J.append("g").attr("transform","translate(".concat(V.left,",").concat(V.top,")")).append("g"),K=X.append("g").attr("class","x-axis"),(Q=X.append("g").attr("class","y-axis")).attr("transform","translate(0, 0)").call(H).call((function(e){return e.selectAll(".tick text").style("text-transform","capitalize")})).call((function(e){return e.select(".domain").remove()})).call((function(e){return e.selectAll(".tick line").attr("stroke-opacity",.5).attr("stroke-dasharray","2,2")})).call((function(e){return e.selectAll(".tick text").attr("x",4).attr("dy",-I.step()/10)})),Q.selectAll(".tick").on("click",(function(e){if(!1===v.t(this).classed("selected")){v.u(".tick.selected").size()>0&&(me.forEach((function(e){Oe(e,!1)})),v.u(".tick.selected").classed("selected",!1));var t=[];pe.forEach((function(n){n.totalSubNodes>0&&(n.subNodes.map((function(e){return e.category})).indexOf(e)>-1&&t.push(n),n.subNodes.forEach((function(a){a.totalSubNodes>0&&(a.subNodes.map((function(e){return e.category})).indexOf(e)>-1&&(t.push(n),t.push(a)),a.subNodes.forEach((function(r){r.totalSubNodes>0&&r.subNodes.map((function(e){return e.category})).indexOf(e)>-1&&(t.push(n),t.push(a),t.push(r))})))})))})),t.forEach((function(e){ke(e,!1)})),te.filter((function(t){return t.category!==e})).style("opacity",.1)}else{var n=[];pe.forEach((function(t){t.totalSubNodes>0&&(t.subNodes.map((function(e){return e.category})).indexOf(e)>-1&&n.push(t),t.subNodes.forEach((function(a){a.totalSubNodes>0&&(a.subNodes.map((function(e){return e.category})).indexOf(e)>-1&&(n.push(t),n.push(a)),a.subNodes.forEach((function(r){r.totalSubNodes>0&&r.subNodes.map((function(e){return e.category})).indexOf(e)>-1&&(n.push(t),n.push(a),n.push(r))})))})))})),n.forEach((function(e){Oe(e,!1)})),te.style("opacity",1)}ue.update(F,B),v.t(this).classed("selected",!v.t(this).classed("selected"))})),$=X.append("g"),ee=$.append("g").classed("links",!0).selectAll(".link"),Z=$.append("g").classed("hulls",!0).selectAll(".hull"),te=$.append("g").classed("nodes",!0).selectAll(".node"),ne=$.append("g").classed("presumed",!0).selectAll(".presumed"),ae=$.append("g").classed("labels",!0).selectAll(".label"),re=X.append("g").classed("informations",!0).selectAll(".information"),ie=v.i(pe).force("link",v.h().strength(.1).distance(Y.range()[0]).id((function(e){return e.id}))).force("x",v.j((function(e){return e.x})).strength(1)).force("y",v.k((function(e){return e.y})).strength(1)).force("collision",v.g((function(e){var t=e.totalSubNodes>0?2.25:.25;return e.opened?Y(1)+t:Y(e.totalSubNodes+1)+t})).iterations(12).strength(.35)).on("tick",(function(){te.attr("cx",(function(e){return e.positionedYear=M.invert(e.x),e.x})).attr("cy",(function(e){return e.y})),ne.attr("cx",(function(e){return e.x})).attr("cy",(function(e){return e.y})),ae.attr("x",(function(e){return e.x})).attr("y",(function(e){return e.y})),ee.attr("x1",(function(e){return e.source.x})).attr("y1",(function(e){return e.source.y})).attr("x2",(function(e){return e.target.x})).attr("y2",(function(e){return e.target.y})),Z.attr("d",(function(e){var t=e.map((function(e){return[e.x,e.y]})),n=t.length<3?t:v.n(t);return Ae(n,e)})),ie.alpha()<.15&&(ie.force("x").strength(.5),ie.force("y").strength(.1))})).on("end",(function(){console.log("simulation ended")})).stop(),ue.update(t,n)},ue.update=function(e,t){if(e||(e=F),pe=e.nodes,he=e.edges,B=t,t.search.length){var n=[];t.search.forEach((function(e){!function e(t){var a=z.filter((function(e){return e.id===t}))[0];""!==a.part_of&&(n.push(a.part_of),e(a.part_of))}(e)})),n.length>0&&(n.reverse().forEach((function(e,t){ke(z.filter((function(t){return t.id===e}))[0],!1)})),t.update=!0)}if(t.update){var a=!1;t.timeFilter&&(t.timeFilter[0].getFullYear()==M.domain()[0].getFullYear()&&t.timeFilter[1].getFullYear()==M.domain()[1].getFullYear()||(a=!0,ie.force("x").strength(1),ie.force("y").strength(.7)),M.domain(v.f(pe.filter((function(e){var n=new Date(e.year);return n>=t.timeFilter[0]&&n<=t.timeFilter[1]})),(function(e){return e.year}))),K.attr("transform","translate(".concat(0,", ",q,")")).call(G)),e.nodes.forEach((function(e){e.x=e.x&&!a?e.x:M(e.year),e.y=e.y?e.y:I(e.category),e.fx&&a&&(e.fx=null)})),ie.force("x").x((function(e){return e.x})),(te=te.data(pe,(function(e){return e.id}))).exit().remove(),te=te.enter().append("circle").attr("class",(function(e){return"node"})).classed("sub-node",(function(e){return""!==e.part_of})).on("click",(function(e){if(ve=e,xe([e],"do reset opacity"),v.e.timeStamp-be<500)return console.log("toggle subnodes of",e),void function(e,t){e.opened&&Oe(e,t),e.subNodes&&e.subNodes.length?ke(e,t):console.log("No nodes to expand")}(e);be=v.e.timeStamp})).on("mouseenter",(function(e){ve&&e.source!==ve.source||xe([e],"do reset opacity")})).on("mouseleave",(function(e){ve&&e.source!==ve.source||Ee(),ae.filter((function(t){return t.id===e.id})).classed("selected",!1).style("display","none")})).attr("key",(function(e){return e.id})).attr("cx",(function(e){return e.x})).attr("cy",(function(e){return e.y})).merge(te).style("cursor",(function(e){return e.subNodes&&e.subNodes.length?"pointer":"auto"})).attr("fill",(function(e){return!0===e.opened?"white":U(e.category)})).attr("stroke",(function(e){if(e.totalSubNodes>0)return v.d(U(e.category)).darker(1)})).attr("r",(function(e){return e.opened?Y(1):Y(e.totalSubNodes+1)})),(ne=ne.data(pe.filter((function(e){return e.isGuessed})),(function(e){return e.id}))).exit().remove(),ne=ne.enter().append("circle").classed("presumed",!0).attr("r",1.5).attr("fill",(function(e){return v.d(U(e.category)).darker(1)})).attr("cx",(function(e){return e.x})).attr("cy",(function(e){return e.y})).merge(ne),(ee=ee.data(he,(function(e){return e.source.id+"-"+e.target.id}))).exit().remove(),ee=ee.enter().append("line").classed("link",!0).classed("part-of",(function(e){return"part_of"===e.kind})).attr("stroke-width",.5).attr("stroke","#ccc").on("click",(function(e){return console.log(e)})).merge(ee),(ae=ae.data(pe,(function(e){return e.id}))).exit().remove(),ae=ae.enter().append("text").classed("label",!0).style("display","none").attr("text-anchor","middle").style("pointer-events","none").text((function(e){return e.label})).merge(ae),(Z=Z.data(ge,(function(e){return e[0].id}))).exit().remove(),Z=Z.enter().append("path").classed("hull",!0).attr("fill",(function(e){return U(e[0].category)})).style("opacity",.25).merge(Z),ie.nodes(pe),ie.force("link")&&ie.force("link").links(he),ie.alpha(1).restart()}ue.filter(t)},ue.filter=function(e){if(e){void 0!==e.openAll&&e.openAll!==ye&&(console.log("open or close all",e.openAll),!0===(ye=e.openAll)?ue.openAll():ue.closeAll());var t=[],n=e.selectedPublications;t[0]=pe.filter((function(e){return n.map((function(t){return e.publicationType.indexOf(t)>-1})).indexOf(!0)>-1})).map((function(e){return e.id}));var a=e.selectedThemes;if(t[1]=pe.filter((function(e){return a.map((function(t){return e.themes.indexOf(t)>-1})).indexOf(!0)>-1})).map((function(e){return e.id})),e.search.length){t[2]=e.search;var r=[];e.search.forEach((function(e){!function e(t){var n=z.filter((function(e){return e.id===t}))[0];""!==n.part_of&&(r.push(n.part_of),e(n.part_of))}(e)})),t[2]=T.a.union(t[2],r)}var i=[];t.forEach((function(e,n){0===n?i=e:t[n].length&&(i=T.a.intersection(i,t[n]))})),te.classed("faded",(function(e){return i.indexOf(e.id)<0}))}},ue.openAll=function(){!function e(t){t.forEach((function(t){t.totalSubNodes>0&&(ke(t,!1),e(t.subNodes))}))}(pe),ue.update(F,B)},ue.closeAll=function(){me.forEach((function(e){Oe(e,!1)})),ue.update(F,B)},ue.destroy=function(){};var Ne=ue,Se=.25,Ce=function(e,t){return[e*t[0],e*t[1]]},we=function(e,t){return[e[0]+t[0],e[1]+t[1]]},_e=function(e,t){var n=[e[1]-t[1],t[0]-e[0]],a=Math.sqrt(n[0]*n[0]+n[1]*n[1]);return[n[0]/a,n[1]/a]},Ae=function(e,t){if(Se=v.l(t,(function(e){return e.opened?Y(1)+.25:Y(e.totalSubNodes+1)+.25})),!e||e.length<1)return"";if(1===e.length)return Te(e,t);if(2===e.length)return Le(e,t);for(var n=new Array(e.length),a=0;a<n.length;++a){var r=0===a?e[e.length-1]:e[a-1],i=e[a],o=Ce(Se,_e(r,i));n[a]=[we(r,o),we(i,o)]}var s="A "+[Se,Se,"0,0,0,"].join(",");return(n=n.map((function(e,t){var a="";if(0===t)a="M "+n[n.length-1][1]+" ";return a+=s+e[0]+" L "+e[1]}))).join(" ")},Te=function(e,t){var n=[e[0][0],e[0][1]-Se],a=[e[0][0],e[0][1]+Se];return"M "+n+" A "+[Se,Se,"0,0,0",a].join(",")+" A "+[Se,Se,"0,0,0",n].join(",")},Le=function(e,t){var n=Ce(Se,_e(e[0],e[1])),a=Ce(-1,n),r=we(e[0],n),i=we(e[1],n),o=we(e[1],a),s=we(e[0],a);return"M "+r+" L "+i+" A "+[Se,Se,"0,0,0",o].join(",")+" L "+s+" A "+[Se,Se,"0,0,0",r].join(",")};document.addEventListener("keydown",(function(e){"l"===e.key&&ae.classed("make-visible",!0);"L"===e.key&&ae.classed("make-visible",!1)}));var De=function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this._chart=Ne.initialize(this._rootNode,this.props.data,this.props.filters,this.props.originalData)}},{key:"componentDidUpdate",value:function(){Ne.update(null,this.props.filters)}},{key:"componentWillUnmount",value:function(){Ne.destroy(this._rootNode)}},{key:"_setRef",value:function(e){this._rootNode=e}},{key:"render",value:function(){return r.a.createElement("svg",{id:this.props.id,style:{width:"100%",height:"100%"},ref:this._setRef.bind(this)})}}]),t}(a.Component);function Re(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function Pe(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Re(n,!0).forEach((function(t){Object(s.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Re(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var ze=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).loadData=n.loadData.bind(Object(f.a)(n)),n.state={data:"data still not loaded",isLoading:!0,openAll:!1,filters:{search:[]}},n.openAll=n.openAll.bind(Object(f.a)(n)),n.changeSpan=n.changeSpan.bind(Object(f.a)(n)),n.changePublications=n.changePublications.bind(Object(f.a)(n)),n.changeThemes=n.changeThemes.bind(Object(f.a)(n)),n.searchRecord=n.searchRecord.bind(Object(f.a)(n)),n.resetSearch=n.resetSearch.bind(Object(f.a)(n)),n}return Object(p.a)(t,e),Object(l.a)(t,[{key:"loadData",value:function(){var e=this;v.w("./places-matrix-data.tsv").then((function(e){return le.parser(e)})).then((function(t){e.setState({data:t.graph,originalData:t.data,dataTimeFilter:v.f(t.graph.nodes,(function(e){return e.year})),themes:["fabbrica","guerra","mare","metropoli","natura ligure","paesaggio urbano","protagonista bambino","viaggio","paesaggio cosmico","mito","nessuno"],publicationsTypes:["raccolta","volume","altro"],searchOptions:[{label:"luogo",dimension:"label"},{label:"raccolta",dimension:"pubVenueTitle"},{label:"titolo",dimension:"sourceTitle"}],isLoading:!1,filters:{update:!0,openAll:!1,selectedThemes:["fabbrica","guerra","mare","metropoli","natura ligure","paesaggio urbano","protagonista bambino","viaggio","paesaggio cosmico","mito","nessuno"],selectedPublications:["raccolta","volume","altro"],search:[]}})}))}},{key:"componentDidMount",value:function(){this.loadData()}},{key:"changeSpan",value:function(e){this.setState((function(t){return{span:e,filters:Pe({},t.filters,{timeFilter:e,update:!0})}}))}},{key:"changePublications",value:function(e){this.setState((function(t){return{filters:Pe({},t.filters,{selectedPublications:e,update:!1})}}))}},{key:"changeThemes",value:function(e){this.setState((function(t){return{filters:Pe({},t.filters,{selectedThemes:e,update:!1})}}))}},{key:"searchRecord",value:function(e){this.setState((function(t){return{filters:Pe({},t.filters,{search:e,update:!1})}}))}},{key:"resetSearch",value:function(){this.setState((function(e){return{filters:Pe({},e.filters,{search:[],update:!1})}}))}},{key:"openAll",value:function(e){this.setState((function(t){return{filters:Pe({},t.filters,{openAll:e,update:!0})}}))}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(h,null,r.a.createElement(y,{style:{gridColumn:"span 1"}}),this.state.isLoading&&r.a.createElement(k,{style:{gridColumn:"span 2"}}),!this.state.isLoading&&r.a.createElement(x,{style:{gridColumn:"span 2"},selected:this.openAll,title:"Apri tutto"}),this.state.isLoading&&r.a.createElement(k,{style:{gridColumn:"span 6"}}),!this.state.isLoading&&r.a.createElement(C,{style:{gridColumn:"span 6"},data:this.state.dataTimeFilter,changeSpan:this.changeSpan,title:"Imposta un filtro temporale"}),this.state.isLoading&&r.a.createElement(k,{style:{gridColumn:"span 4"}}),!this.state.isLoading&&r.a.createElement(_,{style:{gridColumn:"span 4"},options:this.state.publicationsTypes,changeOptions:this.changePublications,title:"Tipo di pubblicazione",id:"multiple-selection-publications"}),this.state.isLoading&&r.a.createElement(k,{style:{gridColumn:"span 4"}}),!this.state.isLoading&&r.a.createElement(_,{style:{gridColumn:"span 4"},options:this.state.themes,changeOptions:this.changeThemes,title:"Evidenzia un tema",id:"multiple-selection-themes"}),this.state.isLoading&&r.a.createElement(k,{style:{gridColumn:"span 6"}}),!this.state.isLoading&&r.a.createElement(P,{style:{gridColumn:"span 6"},data:this.state.data,originalData:this.state.originalData,options:this.state.searchOptions,searchRecord:this.searchRecord,search:this.state.filters.search,resetSearch:this.resetSearch,minLength:1,title:"Cerca"}),this.state.isLoading&&r.a.createElement(k,{style:{gridColumn:"span 1"}}),!this.state.isLoading&&r.a.createElement(se,{style:{gridColumn:"span 1"}})),r.a.createElement(g,{className:"the-body-viz"},this.state.isLoading&&r.a.createElement(k,null),!this.state.isLoading&&r.a.createElement(De,{data:this.state.data,originalData:this.state.originalData,filters:this.state.filters})))}}]),t}(a.Component);var Fe=function(){return r.a.createElement(ze,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(Fe,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[19,1,2]]]);
//# sourceMappingURL=main.f2ff4180.chunk.js.map