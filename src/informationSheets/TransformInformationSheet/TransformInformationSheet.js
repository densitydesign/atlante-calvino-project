import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import SheetStyles from '../SheetStyles.module.css';
import HamburgerCompassHeader from '../../headers/HamburgerCompassHeader/HamburgerCompassHeader';
import ArrowButton from '../../general/ArrowButton/ArrowButton';

import './TransformInformationSheet.css';

import inquadramento from './inquadramento.svg';
import table from './table.svg'


import legenda_01 from './legenda_01.svg'
import legenda_02 from './legenda_02.svg'
import legenda_03 from './legenda_03.svg'
import legenda_04 from './legenda_04.svg'

import zoom_1 from './zoom_1.svg'
import zoom_2 from './zoom_2.svg'
import zoom_3 from './zoom_3.svg'
import zoom_4 from './zoom_4.svg'

import slide_01 from './slide_01.svg'
import slide_02 from './slide_02.svg'
import slide_03 from './slide_03.svg'
import slide_04 from './slide_04.svg'


class TransformInformationSheet extends Component {

  render()
  {
    return ( <>
        <HamburgerCompassHeader />
        <main className={SheetStyles.main}>
          <div className={SheetStyles.gridRow}>
            <h4 className={SheetStyles.titleH4}>Tappa 2 > trasformare</h4>
            <h1 className={SheetStyles.titleH1}>L'orizzonte geografico e letterario in Calvino</h1>
            <h2 className={SheetStyles.titleH2}>L'idea</h2>
                  <img className = {SheetStyles.image} style={{gridColumn:'1 / span 12',width:'100%'}} src={inquadramento}/>
                  <h2 className={SheetStyles.titleH2}>L'analisi</h2>
                  <h3 className={SheetStyles.titleH3}>Geoletteratura</h3>
            <p className={SheetStyles.paragraph}>

            Questa scheda nasce come approfondimento o spin-off del lavoro di rappresentazione di tutti i luoghi del corpus (la matrice). L’idea di partenza è quella di concentrarsi soltanto sulla categoria delle ambientazioni specifiche terrestri, mostrando come queste coincidano abbastanza meticolosamente con la biografia geografica di Calvino. In ragione di ciò la scheda si propone anche di evidenziare come, nel passaggio dagli anni Quaranta del ‘900 agli anni Ottanta, l’orizzonte geografico dello scrittore si amplia progressivamente, arrivando alla fine a comprendere tutto il mondo.

  Questa scheda nasce come approfondimento o spin-off del lavoro di rappresentazione di tutti i luoghi del corpus (la matrice). L’idea di partenza è quella di concentrarsi soltanto sulla categoria delle ambientazioni specifiche terrestri, mostrando come queste coincidano abbastanza meticolosamente con la biografia geografica di Calvino. In ragione di ciò la scheda si propone anche di evidenziare come, nel passaggio dagli anni Quaranta del ‘900 agli anni Ottanta, l’orizzonte geografico dello scrittore si amplia progressivamente, arrivando alla fine a comprendere tutto il mondo.
</p>

  <img className = {SheetStyles.sideContent} src={table}/>
    </div>

          <div className={SheetStyles.gridRow}>
  <div className="CarouselSlide" data-interval="false">
  <h2 className={SheetStyles.titleH2}>Approfondimento</h2>
<Carousel>
<Carousel.Item>
  <Carousel.Caption>
  <h2 className={SheetStyles.titleH2} style={{fontStyle:'italic', color:'#5151fc'}}>1945 - 1955</h2>
    <div className={SheetStyles.gridRow}>
        <img className={SheetStyles.image} style = {{gridColumn:'1 / span 7'}} src={legenda_01}/>
        <img className={SheetStyles.sideContent} style = {{gridColumn:'9 / span 5'}} src={zoom_1}/>
        <p className={SheetStyles.captionLeft} style = {{gridColumn:'9 / span 5'}}> Orizzonte dal 1945 al 1955 </p>

    </div>
  </Carousel.Caption>
    <img className="d-block w-100" src={slide_01} alt="First slide" />
</Carousel.Item>

<Carousel.Item>
  <Carousel.Caption>
  <h2 className={SheetStyles.titleH2} style={{fontStyle:'italic', color:'#5151fc'}}>1956 - 1965</h2>
    <div className={SheetStyles.gridRow}>
        <img className={SheetStyles.image} style = {{gridColumn:'1 / span 7'}}  src={legenda_02}/>
        <img className={SheetStyles.sideContent} style = {{gridColumn:'9 / span 5'}} src={zoom_2}/>
        <p className={SheetStyles.captionLeft} style = {{gridColumn:'9 / span 5'}}> Orizzonte dal 1956 al 1965 </p>
    </div>
  </Carousel.Caption>
    <img className="d-block w-100" src={slide_02} alt="First slide" />
</Carousel.Item>

<Carousel.Item>
  <Carousel.Caption>
  <h2 className={SheetStyles.titleH2} style={{fontStyle:'italic', color:'#5151fc', color:'#5151fc'}}>1966 - 1975</h2>
    <div className={SheetStyles.gridRow}>
        <img className={SheetStyles.image} style = {{gridColumn:'1 / span 7'}}  src={legenda_03}/>
        <img className= {SheetStyles.sideContent} style = {{gridColumn:'9 / span 5'}} src={zoom_3}/>
        <p className={SheetStyles.captionLeft} style = {{gridColumn:'9 / span 5'}}> Orizzonte dal 1966 al 1975 </p>
    </div>
  </Carousel.Caption>
    <img className="d-block w-100" src={slide_03} alt="First slide" />
</Carousel.Item>

<Carousel.Item>
  <Carousel.Caption>
  <h2 className={SheetStyles.titleH2} style={{fontStyle:'italic', color:'#5151fc'}}>1976 - 1985</h2>
    <div className={SheetStyles.gridRow}>
        <img className={SheetStyles.image} style = {{gridColumn:'1 / span 7'}}  src={legenda_04}/>
        <img className={SheetStyles.sideContent} style = {{gridColumn:'9 / span 5'}} src={zoom_4}/>
        <p className={SheetStyles.captionLeft} style = {{gridColumn:'9 / span 5'}}> Orizzonte dal 1976 al 1985 </p>
    </div>
  </Carousel.Caption>
    <img className="d-block w-100" src={slide_04} alt="First slide" />
</Carousel.Item>
</Carousel>
</div>
  </div>

                      <div className={SheetStyles.gridRow}>
                      <div style={{gridColumn:'1 / span 3'}}><ArrowButton arrowDirection="none" textAlign="left" text="RITORNA ALL'ANALISI" route="/Process/transforming" /></div>
                      <div style={{gridColumn:'4 / span 2'}}><ArrowButton arrowDirection="left" textAlign="left" text="TAPPA 1" route="/Phenomena/territory/spaceAnalysis"/></div>
                      <div style={{gridColumn:'6 / span 2'}}><ArrowButton arrowDirection="right" textAlign="left" text="TAPPA 3" route="/Problem/realism" /></div>
                    </div>
        </main>
      </>
    );
  }
}

export default TransformInformationSheet;
