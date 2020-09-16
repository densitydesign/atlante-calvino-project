import React from 'react';

import HamburgerCompassHeader from '../../headers/HamburgerCompassHeader/HamburgerCompassHeader';
import CompassLische from '../../visualizations/CompassLische/CompassLische';

import V from './compassFlux.d3'

import './CompassFlux.css';
import '../../App.css'

export default class CompassFlux extends React.Component
{
  render()
  {
    const rhythm = 70;

    return (
      <>
        <HamburgerCompassHeader />
        <div id="main--bones" className="container-fluid">
                <h4>Bussola</h4>
        <div className="row intro">
    <div className="col-12">
      <h1>I racconti di Italo Calvino: <br className="d-block d-sm-none d-md-block d-lg-none"/>dai periodici alle raccolte</h1>
    </div>
    <div className="col-8 col-xl-8">
      <p>La visualizzazione ricostruisce le vicende editoriali dei racconti pubblicati da Italo Calvino, che hanno spesso visto la luce su riviste e quotidiani prima di confluire nelle raccolte. La scrittura dei racconti ha occupato Calvino per tutto l&#x2019;arco della sua carriera e costituisce la spina dorsale della sua opera. La maggior parte dei testi &#xE8; uscita in prima battuta su quotidiani e riviste (mostrati sulla sinistra), che nel corso del Novecento hanno largamente contribuito alla fortuna della narrativa breve.</p>
      <p>Per Calvino, i singoli racconti trovano un ulteriore senso una volta collocati all&#x2019;interno delle raccolte (mostrate invece sulla destra), grazie al loro combinarsi con altri testi. Combinarsi ma anche ricombinarsi, perch&#xE9; spesso le raccolte sono soggette a ricomposizione e il flusso di un singolo racconto pu&#xF2; attraversare diverse tappe editoriali.</p>
      <p>Le tre grandi famiglie genealogiche dei racconti gravitano intorno all’antologia dei <span className="font-italic">Racconti</span>, alla serie delle <span className="font-italic">Cosmicomiche</span> e infine a <span className="font-italic">Palomar</span>.</p>
    </div>
    <div className="col-3 col-xl-3">
    <h4 style={{ marginBottom: "2rem" }}>Come si legge la visualizzazione: </h4>
    <div className="legend">
    <img src={ process.env.PUBLIC_URL + "/CompassLische/legenda.png" } style={{ width: "100%" }} alt="information complement" />
    </div>
    </div>

    <div className="col-12">
      <p className="references">&#x201C;I racconti di Italo Calvino: dai periodici alle raccolte&#x201D; &#xA9; UNIGE/DensityDesign<br/>Visualizzazione realizzata all&#x2019;interno del progetto <a href="http://atlantecalvino.unige.ch/" target="_blank" rel="noopener noreferrer">Atlante Calvino: letteratura e visualizzazione</a>.
        </p>
      <p className="references"><strong>Coordinatrice e coordinatore scientifici</strong>: Francesca Serra, Paolo Ciuccarelli.<br/><strong>Autor*</strong>: Serena Del Nero, Virginia Giustetto, Valeria Cavalloro, Margherita Parigini, Tommaso Elli.</p>
    </div>
  </div>
</div>
<div className="container-fluid lische-box">
  <div className="row">
    <div className="col-12 lische my-lg-3 py-1 py-md-4">
    <CompassLische id="lische"/>
    </div>
  </div>
        </div>
      </>
    );
  }
}
