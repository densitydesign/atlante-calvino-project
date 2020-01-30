import React from 'react';

import HamburgerCompassHeader from '../../headers/HamburgerCompassHeader/HamburgerCompassHeader';
import CompassLische from '../../visualizations/CompassLische/CompassLische';

import V from './compassFlux.d3'

import './CompassFlux.css';

export default class CompassFlux extends React.Component
{
  render()
  {
    const rhythm = 70;

    return (
      <>
        <HamburgerCompassHeader />
        <div id="main--bones" className="container">
        <div className="row">
    <div className="col-12">
      <h1 className="my-3 font-italic">I racconti di Italo Calvino: <br className="d-block d-sm-none d-md-block d-lg-none"/>dai periodici alle raccolte</h1>
    </div>
    <div className="col-12 col-xl-11">
      <p>La visualizzazione ricostruisce le vicende editoriali dei racconti pubblicati da Italo Calvino, che hanno spesso visto la luce su riviste e quotidiani prima di confluire nelle raccolte. La scrittura dei racconti ha occupato Calvino per tutto l&#x2019;arco della sua carriera e costituisce la spina dorsale della sua opera. La maggior parte dei testi &#xE8; uscita in prima battuta su quotidiani e riviste (mostrati sulla sinistra), che nel corso del Novecento hanno largamente contribuito alla fortuna della narrativa breve.</p>
      <p>Per Calvino, i singoli racconti trovano un ulteriore senso una volta collocati all&#x2019;interno delle raccolte (mostrate invece sulla destra), grazie al loro combinarsi con altri testi. Combinarsi ma anche ricombinarsi, perch&#xE9; spesso le raccolte sono soggette a ricomposizione e il flusso di un singolo racconto pu&#xF2; attraversare diverse tappe editoriali.</p>
      <p>Le tre grandi famiglie genealogiche dei racconti gravitano intorno all’antologia dei <span className="font-italic">Racconti</span>, alla serie delle <span className="font-italic">Cosmicomiche</span> e infine a <span className="font-italic">Palomar</span>.</p>

      <p><a href="" data-toggle="modal" data-target="#exampleModal">Guarda la legenda</a> per sapere come si legge la visualizzazione.</p>
    </div>

    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div className="modal-content p-3">
          <div className="modal-header">
            <h5 className="pb-0">Come leggere la visualizzazione</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body legend">
            <div className="row">
              <div className="col-12 col-sm-10 col-lg-6 offset-sm-1 offset-lg-0 the-place pb-3"></div>
              <div className="col-12 col-lg-6">
                <p>La visualizzazione mostra la storia editoriale di tutti i racconti pubblicati da Italo Calvino, elencati al centro della pagina secondo l&#x2019;anno di prima pubblicazione, in sequenza verticale dall&#x2019;alto verso il basso.</p>
                <p>A sinistra i collegamenti indicano le pubblicazioni in riviste o quotidiani, mentre quelli nella parte destra rappresentano pubblicazioni in raccolta, distinte per colore.</p>
                <p>Anche le raccolte compaiono secondo l&#x2019;anno di pubblicazione, ma su un asse orizzontale che va da sinistra verso destra. In questo modo &#xE8; possibile mostrare come alcuni racconti, dopo essere stati pubblicati in una prima raccolta, confluiscano in una o pi&#xF9; raccolte successive.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-12 mt-3">
      <p className="caption">&#x201C;I racconti di Italo Calvino: dai periodici alle raccolte&#x201D; &#xA9; UNIGE/DensityDesign<br/>Visualizzazione realizzata all&#x2019;interno del progetto <a href="http://atlantecalvino.unige.ch/" target="_blank">Atlante Calvino: letteratura e visualizzazione</a>.
        </p>
      <p className="caption">COORDINATORI SCIENTIFICI: Francesca Serra, Paolo Ciuccarelli.<br/>AUTORI: Serena Del Nero, Virginia Giustetto, Valeria Cavalloro, Margherita Parigini, Tommaso Elli.</p>
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
