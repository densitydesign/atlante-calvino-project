import React, { useState } from 'react';
import styles from './CancellazioneHelp.module.css'; // Import css modules stylesheet as styles

import * as d3 from 'd3';

import legend01 from "./legenda-01.svg";
import legend02 from "./legenda-02.svg";
import legend03 from "./legenda-03.svg";
import legend04 from "./legenda-04.svg";
import { group } from 'd3';

const datum = {
    "id": "S201",
    "title": "Come imparare a essere morto",
    "year": "1983",
    "length": "9295",
    "tot_dubbio": "2317",
    "cosa_esitazione": 0.0833333333,
    "cosa_negazione": 0.3333333333,
    "cosa_riformulazione": 0.125,
    "come_esitazione": 0,
    "come_negazione": 0,
    "come_riformulazione": 0.1666666667,
    "senso_esitazione": 0.0416666667,
    "senso_negazione": 0.0416666667,
    "senso_riformulazione": 0.2083333333,
    "perc_dubbio": 24.927380312,
    "mds_x": "-0.120658461",
    "mds_y": "0.03156862795",
    "length2use": 15000,
    "r": 7.236259113043538,
    "combinations": [
        {
            "id": "S201",
            "type": "come_riformulazione",
            "percentage_combination": 0.1666666667,
            "r": 1.4749483222196427,
            "x": 1.2394613724373844,
            "mx": 4.341755467826123,
            "y": -0.004707322022272251,
            "my": 0,
            "index": 0,
            "vy": 0.000001798066838157704,
            "vx": -0.000008329328507407282,
            "c": [
                1.2394613724373844,
                -0.004707322022272251
            ]
        },
        {
            "id": "S201",
            "type": "cosa_negazione",
            "percentage_combination": 0.3333333333,
            "r": 2.0858919207695767,
            "x": -2.2053141681294757,
            "mx": -4.341755467826123,
            "y": -0.9067983009914411,
            "my": -4.341755467826123,
            "index": 1,
            "vy": -0.000005778755736887955,
            "vx": -0.00000413159849650796,
            "c": [
                -2.2053141681294757,
                -0.9067983009914411
            ],
            "distance": 4.790489360048549,
            "position": 2
        },
        {
            "id": "S201",
            "type": "cosa_esitazione",
            "percentage_combination": 0.0833333333,
            "r": 1.0429459602283466,
            "x": 0.5323375292943665,
            "mx": 0,
            "y": -2.4213954422238575,
            "my": -4.341755467826123,
            "index": 2,
            "vy": 7.383215733185239e-7,
            "vx": 0.0000034228431808981065,
            "c": [
                0.5323375292943665,
                -2.4213954422238575
            ],
            "distance": 3.9397467716052392,
            "position": 3
        },
        {
            "id": "S201",
            "type": "cosa_riformulazione",
            "percentage_combination": 0.125,
            "r": 1.2773427161837123,
            "x": 2.8454899310166675,
            "mx": 4.341755467826123,
            "y": -2.2395562047466706,
            "my": -4.341755467826123,
            "index": 3,
            "vy": 0.0000030764637243628446,
            "vx": 0.000003239040656377747,
            "c": [
                2.8454899310166675,
                -2.2395562047466706
            ],
            "distance": 3.512246131500095,
            "position": 4
        },
        {
            "id": "S201",
            "type": "senso_negazione",
            "percentage_combination": 0.0416666667,
            "r": 0.7374741613310637,
            "x": -1.8787920418752166,
            "mx": -4.341755467826123,
            "y": 1.8977604799182073,
            "my": 4.341755467826123,
            "index": 4,
            "vy": -0.000007488297970208925,
            "vx": -0.000017566695751159116,
            "c": [
                -1.8787920418752166,
                1.8977604799182073
            ],
            "distance": 4.041315558674677,
            "position": 1
        },
        {
            "id": "S201",
            "type": "senso_esitazione",
            "percentage_combination": 0.0416666667,
            "r": 0.7374741613310637,
            "x": -0.509809056370939,
            "mx": 0,
            "y": 1.349695267553036,
            "my": 4.341755467826123,
            "index": 5,
            "vy": 0.000016102829625537864,
            "vx": 2.013200182049467e-7,
            "c": [
                -0.509809056370939,
                1.349695267553036
            ]
        },
        {
            "id": "S201",
            "type": "senso_riformulazione",
            "percentage_combination": 0.2083333333,
            "r": 1.6490423555943647,
            "x": 1.0952127863087793,
            "mx": 4.341755467826123,
            "y": 3.1158679572179997,
            "my": 4.341755467826123,
            "index": 6,
            "vy": 0.000004188493119190543,
            "vx": 0.000013312008583067351,
            "c": [
                1.0952127863087793,
                3.1158679572179997
            ],
            "distance": 2.1700180077417897,
            "position": 0
        }
    ],
    "index": 125,
    "x": 422.30457532536735,
    "y": -110.4901986182925,
    "vy": 1.2335357622572783e-10,
    "vx": 5.9359914528131345e-9,
    "metaballSegments": "M -0.5013909475524496,3.52841759976371 C -0.7614528555331622,2.5219549332227365 -1.2441904447652543,2.4954801556932176 -1.6942942328215682,2.6117833766696767A 0.7374741613310637,0.7374741613310637, 0 0,1, -2.552005586182954, 1.596676334883019C -2.4684351839167005,1.4098158587117724 -2.528387491286892,1.233709940107677 -3.0569087303948006,0.9973371476182225A 2.0858919207695767,2.0858919207695767, 0 1,1, -1.3043576101663796, -2.788080413221046C -0.7599296360909821,-2.5273508020727915 -0.536815937568705,-2.610452516927014 -0.403712292535915,-2.8813378375388865A 1.0429459602283466,1.0429459602283466, 0 0,1, 1.2900635140340466, -3.1380457111883713C 1.4995825300597245,-2.916517847996281 1.6964617929168881,-2.9109711069260573 1.9677771816750322,-3.1675781571975445A 1.2773427161837123,1.2773427161837123, 0 1,1, 3.105581799256722, -0.9889736866124286C 2.7341042777323614,-0.9117150641853359 2.603500618954613,-0.7166216981007869 2.6872267920513044,-0.2865722595165797A 1.4749483222196427,1.4749483222196427, 0 0,1, 2.267224579522031, 1.0532035170287424C 1.9548396313582272,1.3566863289241218 1.9496207667590535,1.6237434953865573 2.2863623682353835,1.9754718137571903A 1.6490423555943647,1.6490423555943647, 0 1,1, -0.5013909475524496, 3.52841759976371 Z",
    "state": "metaball",
    "color": "rgb(215, 164, 97)"
};

export default function CancellazioneHelp(){
    const [view, setView] = useState('legend');
    const pack = (arr)=>{
        d3.selectAll('.animated-group circle')
            .transition()
                .duration(1000)
                    .attr('fill',"rgb(215, 164, 97)")
                    .attr('cx',(d,i)=>arr[i].x)
                    .attr('cy',(d,i)=>arr[i].y)
                    .on('end',(d,i)=>{if(i==datum.combinations.length-1){
                        d3.selectAll('.animated-group path')
                            .transition()
                                .duration(1000)
                                    .style('opacity',1)
                                    .on('end',()=>matrix(datum.combinations));
                    }})
    }
    const matrix = (arr)=>{
        d3.selectAll('.animated-group path')
            .transition()
                .duration(1000)
                    .style('opacity',0)
                    .on('end',()=>{
                        d3.selectAll('.animated-group circle')
                            .transition()
                                .duration(1000)
                                    .attr('fill',(d,i)=>{
                                        if (arr[i].type.includes('cosa')){
                                            return '#ffd93b'
                                        } else if (arr[i].type.includes('come')){
                                            return '#10bed2'
                                        } else if (arr[i].type.includes('senso')){
                                            return '#ff3366'
                                        }
                                    })
                                    .on('end',(d,i)=>{
                                        if(i==datum.combinations.length-1)
                                        {
                                            d3.selectAll('.animated-group circle')
                                                .transition()
                                                .duration(1000)
                                                .attr('cx',(d,i)=>arr[i].mx)
                                                .attr('cy',(d,i)=>arr[i].my)
                                                .on('end',(d,i)=>{if(i==datum.combinations.length-1){pack(datum.combinations)}})
                                        }
                                    });
                    })
                    

    };
    const makeCircles = (arr)=>{
        console.log(arr)
        matrix(arr);
    }

    return <>
        <small>TAPPA 3</small>
        <h1 className={styles.h1}>Cancellazione</h1>
        <small>
            <a className={styles.switchView} onClick={()=>setView('legend')}>LEGENDA</a> | <a className={styles.switchView} onClick={()=>setView('help')}>COME SI LEGGE</a>
        </small>
        { tabs[view] }
        {
            matrix(datum.combinations)
        }
    </>
}



const tabs = {
    'legend': (
        <div className="legend">
            <h2 className={styles.h2}>Legenda</h2>
            <div className={styles.legendSection}>
                <h5 className={styles.legendTitle}>Dimensione</h5>
                <img className={styles.legendImg} src={legend01} />
                <p>Le circonferenze rappresentano le lunghezze delle opere, mentre le 'macchie' al loro interno rappresentano la quantità di testo dubitativo.</p>
            </div>
            <div className={styles.legendSection}>
                <h5 className={styles.legendTitle}>Disposizione</h5>
                <img className={styles.legendImg} src={legend02} />
                <p>La vicinanza degli elementi indica una similarità in:</p>
                <ol>
                    <li><p>Quantità di testo dubitativo in proporzione alla lunghezza totale dell’opera;</p></li>
                    <li><p>Combinazioni delle macro-categorie e delle manifestazioni stilistiche (griglia) nel testo dubitativo.</p></li>
                </ol>
            </div>
            <div className={styles.legendSection}>
                <h5 className={styles.legendTitle}>Colore</h5>
                <img className={styles.legendImg} src={legend03} />
                <svg className={styles.colorAnimation}>
                    <g transform="translate(150,50)">
                        <g transform="scale(4)" className="animated-group">
                            <path className="metaball" fill="rgb(215, 164, 97)" d="M -0.5013909475524496,3.52841759976371 C -0.7614528555331622,2.5219549332227365 -1.2441904447652543,2.4954801556932176 -1.6942942328215682,2.6117833766696767A 0.7374741613310637,0.7374741613310637, 0 0,1, -2.552005586182954, 1.596676334883019C -2.4684351839167005,1.4098158587117724 -2.528387491286892,1.233709940107677 -3.0569087303948006,0.9973371476182225A 2.0858919207695767,2.0858919207695767, 0 1,1, -1.3043576101663796, -2.788080413221046C -0.7599296360909821,-2.5273508020727915 -0.536815937568705,-2.610452516927014 -0.403712292535915,-2.8813378375388865A 1.0429459602283466,1.0429459602283466, 0 0,1, 1.2900635140340466, -3.1380457111883713C 1.4995825300597245,-2.916517847996281 1.6964617929168881,-2.9109711069260573 1.9677771816750322,-3.1675781571975445A 1.2773427161837123,1.2773427161837123, 0 1,1, 3.105581799256722, -0.9889736866124286C 2.7341042777323614,-0.9117150641853359 2.603500618954613,-0.7166216981007869 2.6872267920513044,-0.2865722595165797A 1.4749483222196427,1.4749483222196427, 0 0,1, 2.267224579522031, 1.0532035170287424C 1.9548396313582272,1.3566863289241218 1.9496207667590535,1.6237434953865573 2.2863623682353835,1.9754718137571903A 1.6490423555943647,1.6490423555943647, 0 1,1, -0.5013909475524496, 3.52841759976371 Z" display="block">
                            </path>
                            {
                                datum.combinations.map((d,i)=>{
                                    return <circle key={i} r={d.r} cx={d.x} cy={d.y} fill="rgb(215, 164, 97)"></circle>
                                })
                            }
                            {/* <circle className="circle-combination" display="none" r="1.4749483222196427" cx="1.2394613724373844" cy="-0.004707322022272251" fill="rgb(215, 164, 97)"></circle>
                            <circle className="circle-combination" display="none" r="2.0858919207695767" cx="-2.2053141681294757" cy="-0.9067983009914411" fill="rgb(215, 164, 97)"></circle>
                            <circle className="circle-combination" display="none" r="1.0429459602283466" cx="0.5323375292943665" cy="-2.4213954422238575" fill="rgb(215, 164, 97)"></circle>
                            <circle className="circle-combination" display="none" r="1.2773427161837123" cx="2.8454899310166675" cy="-2.2395562047466706" fill="rgb(215, 164, 97)"></circle>
                            <circle className="circle-combination" display="none" r="0.7374741613310637" cx="-1.8787920418752166" cy="1.8977604799182073" fill="rgb(215, 164, 97)"></circle>
                            <circle className="circle-combination" display="none" r="0.7374741613310637" cx="-0.509809056370939" cy="1.349695267553036" fill="rgb(215, 164, 97)"></circle>
                            <circle className="circle-combination" display="none" r="1.6490423555943647" cx="1.0952127863087793" cy="3.1158679572179997" fill="rgb(215, 164, 97)"></circle> */}
                        </g>
                    </g>
                </svg>
                <p>Colore corrispondente alla percentuale di utilizzo delle marco-categorie nel testo dubitativo di un’opera.</p>
            </div>
            <div className={styles.legendSection}>
                <h5 className={styles.legendTitle}>Composizione</h5>
                <img className={styles.legendImg} src={legend04} />
                <p>La mancanza di un pallino indica l'assenza della combinazione di macro-categoria e manifestazione stilistica.</p>
            </div>
        </div>
    ),
    'help': (
        <>
            <h2 className={styles.h2}>Come si legge</h2>
        </>
    )
}