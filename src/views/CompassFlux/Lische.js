import React, {useRef, useEffect} from "react";
import * as d3 from "d3"
import { ReactComponent as LischeHeaderSVG} from "./lische-header.svg"
import { ReactComponent as LischeSVG} from "./lische-web.svg"

import { ReactComponent as LischeHeaderSVG_en} from "./lische-header-en.svg"
import { ReactComponent as LischeSVG_en} from "./lische-web-en.svg"

import { withTranslation } from 'react-i18next'

import styles from "./Lische.module.css"

function Lische(i18n) {
    const vizEl = useRef(null)
    useEffect(()=>{
			// console.log(vizEl.current)
			const viz = d3.select(vizEl.current);

			let selectedItems = [];
			let selectionType = null;

			viz.selectAll('*[data-name]').each(function(d,i){
				let data_name = d3.select(this).attr('data-name');
				if (data_name) {
					data_name = data_name.replace(/\s/g,'-')
					data_name = data_name.replace(/\|/g,' ')
					d3.select(this).classed(data_name, true);
				}
			})

			d3.selectAll('g.stories > g').on('click', function(d,i){
				resetOpacity();
		
				d3.selectAll('g.collections > g').transition().duration(250).style('opacity', .2);
				d3.selectAll('g.collections-labels > g').transition().duration(250).style('opacity', .5);
				d3.selectAll('g.magazines > g').transition().duration(250).style('opacity', .2);
				d3.selectAll('g.stories > g').transition().duration(250).style('opacity', .2);
		
				if (d3.event.shiftKey && selectionType == 'story') {
					selectedItems.push(this);
				} else {
					selectedItems = []
				}
				if (selectedItems.length < 1) {
					selectedItems.push(this)
					selectionType = 'story'
				}
		
				selectedItems.forEach(function(s){
					let magazine = d3.select(s).attr('class').split(' ')[1];
					d3.select('g.magazines > g.'+magazine).transition().duration(250).style('opacity', 1);
					let collections = d3.select(s).attr('class').split(' ');
					collections.forEach(function(c){
						d3.select('g.collections > g.'+c).transition().duration(250).style('opacity', 1);
					})
					d3.select(s).transition().duration(250).style('opacity', 1);
				})
		
				document.getSelection().removeAllRanges();
		
			})
		
			d3.selectAll('g.magazines > g').on('click', function(d,i){
				console.log(this)
				resetOpacity();
		
				d3.selectAll('g.collections > g').transition().duration(250).style('opacity', .2);
				d3.selectAll('g.collections-labels > g').transition().duration(250).style('opacity', .5);
				d3.selectAll('g.magazines > g').transition().duration(250).style('opacity', .2);
				d3.selectAll('g.stories > g').transition().duration(250).style('opacity', .2);
		
				if (d3.event.shiftKey && selectionType == 'magazine') {
					selectedItems.push(this);
				} else {
					selectedItems = []
				}
				if (selectedItems.length < 1) {
					selectedItems.push(this)
					selectionType = 'magazine'
				}
		
				selectedItems.forEach(function(m){
					d3.select(m).transition().duration(250).style('opacity', 1);
					let thisClass = d3.select(m).attr('class');
					let collections = [];
					d3.selectAll('g.stories > g.'+thisClass)
						.transition().duration(250).style('opacity', 1)
						.each(function(s){
							let classes = d3.select(this).attr('class').split(' ');
							classes.forEach( (c) => {
								d3.select('g.collections > g.'+c).transition().duration(250).style('opacity',1);
							})
						});
				})
		
				document.getSelection().removeAllRanges();
		
			})
		
			d3.selectAll('g.collections > g, g.collections-labels > g').on('click', function(d,i){
				resetOpacity();
		
				d3.selectAll('g.stories > g').transition().duration(250).style('opacity', .2);
				d3.selectAll('g.magazines > g').transition().duration(250).style('opacity', .2);
				d3.selectAll('g.collections > g').transition().duration(250).style('opacity', .2);
				d3.selectAll('g.collections-labels > g').transition().duration(250).style('opacity', .5);
		
				if (d3.event.shiftKey && selectionType == 'collection') {
					selectedItems.push(this);
				} else {
					selectedItems = []
				}
				if (selectedItems.length < 1) {
					selectedItems.push(this)
					selectionType = 'collection'
				}
		
				selectedItems.forEach(function(c){
		
					let thisClass = d3.select(c).attr('class');
					let magazines = [];
					d3.selectAll('g.stories > g.'+thisClass)
						.transition().duration(250).style('opacity', 1)
						.each(function(s){
							let thisMagazine = d3.select(this).attr('class').split(' ')[1];
							magazines.push(thisMagazine);
						});
					magazines.forEach(function(m){
						d3.select('g.magazines > g.'+m).transition().duration(250).style('opacity',1);
					})
		
					// d3.select(c).transition().duration(250).style('opacity',1)
					d3.select('g.collections > g.'+thisClass).transition().duration(250).style('opacity', 1);
					d3.select('g.collections-labels > g.'+thisClass).transition().duration(250).style('opacity', 1);
		
				})
		
				document.getSelection().removeAllRanges();
		
			})
		
			d3.select('.reset').on('click', function(d){
				console.log('reset')
				resetOpacity();
			})
		
			function resetOpacity() {
				d3.selectAll('g.stories > g').transition().duration(250).style('opacity', 1);
				d3.selectAll('g.magazines > g').transition().duration(250).style('opacity', 1);
				d3.selectAll('g.collections > g').transition().duration(250).style('opacity', 1);
				d3.selectAll('g.collections-labels > g').transition().duration(250).style('opacity', 1);
			}

	},[]);
	console.log(i18n)
    return (
        <>
			{i18n.i18n.language==='it' &&
				<>
					<LischeHeaderSVG className={["sticky-element", styles.lischeHeader].join(" ")} />
					<LischeSVG className={styles.lische} ref={vizEl} />
				</>
			}
            {i18n.i18n.language==='en' &&
				<>
					<LischeHeaderSVG_en className={["sticky-element", styles.lischeHeader].join(" ")} />
					<LischeSVG_en className={styles.lische} ref={vizEl} />
				</>
			}
        </>
    )
}

export default withTranslation()(Lische)