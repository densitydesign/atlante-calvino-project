import React from 'react'
import HamburgerCloseHeader from '../../headers/HamburgerCloseHeader/HamburgerCloseHeader';
import SlidingPanel from '../../panels/SlidingPanel/SlidingPanel';

import './Compass.css';

export default class Compass extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = { selectedPanel : 1 };

    this.getSelectedPanel = this.getSelectedPanel.bind(this);
    this.setSelectedPanel = this.setSelectedPanel.bind(this);
    this.panelClicked = this.panelClicked.bind(this);
  }

  componentDidUpdate()
  {
//    this.refs.fishbones.getDOMNode().focus();
  }

  getSelectedPanel()
  {
    return this.state.selectedPanel;
  }

  setSelectedPanel(selectedPanel)
  {
    this.setState({ selectedPanel : selectedPanel });
  }

  panelClicked(panelId)
  {
    this.setState({ selectedPanel : panelId });
  }

  render()
  {
    return (
      <div>

        <HamburgerCloseHeader containerToggleCompassPanel={this.props.containerToggleCompassPanel} />

          <div className="compass-main-description">
            <h1>Bussola</h1>
            <div><p className="intro">Prima di iniziare il viaggio, ci vuole una <strong>bussola</strong>.
            <br></br>
            Per quello abbiamo creato tre visualizzazioni orientative, <em>I flussi dei racconti, Il tempo e le opere</em> e <em>L'arcipelago dei nomi</em> che aiutino a muoversi dentro l’intero corpus dell’opera e che siano sempre a portata di mano.
            Fornendo un colpo d’occhio sulla storia dei volumi, sulla vicenda dei racconti e sulla biblioteca mentale dell’autore.</p></div>
          </div>
          <div>

            <SlidingPanel
              id="1"
              open={this.state.selectedPanel >= 1}
              zIndex="1"
              openClassName="panel1-open"
              closedClassName="panel1-closed"
              hide={this.props.hide}
              title="I flussi dei racconti"
              getSelectedPanel={this.getSelectedPanel}
              setSelectedPanel={this.setSelectedPanel}
              panelClicked={this.panelClicked}
              interactiveViewUrl="/Compass/flux"
              pdfUrl="http://atlantecalvino.unige.ch/assets/viz-02-flussi.zip"
              text="I racconti sono la spina dorsale dell’opera di Calvino. Per questo abbiamo schierato gli oltre duecento titoli in un lungo elenco, che consente di ricostruire il flusso della storia editoriale dei racconti grazie a un’unica visualizzazione: dalla prima pubblicazione su giornali o riviste, fino alla raccolta nei volumi e alle varie ricomposizioni che questi ultimi subiscono nel corso del tempo." />

            <SlidingPanel
              id="2"
              open={this.state.selectedPanel >= 2}
              zIndex="2"
              openClassName="panel2-open"
              closedClassName="panel2-closed"
              hide={this.props.hide}
              title="Il tempo e le opere"
              getSelectedPanel={this.getSelectedPanel}
              setSelectedPanel={this.setSelectedPanel}
              panelClicked={this.panelClicked}
              interactiveViewUrl="/Compass/time"
              pdfUrl="http://atlantecalvino.unige.ch/assets/viz-01-sinuosa.zip"
              text="Si tratta di una mappa sintetica, che segue l’andamento dei quattro decenni della carriera letteraria di Calvino, mostrando gli snodi più importanti della sua storia editoriale: i principali volumi e le collaborazioni giornalistiche. La divisione per generi permette di seguire le oscillazioni tra forma breve e lunga, le sperimentazioni sulla struttura, l’articolarsi inquieto dell’opera in cerca della sua giusta forma."
            />

            <SlidingPanel
              id="3"
              open={this.state.selectedPanel >= 3}
              zIndex="3"
              openClassName="panel3-open"
              closedClassName="panel3-closed"
              hide={this.props.hide}
              title="L'arcipelago dei nomi"
              getSelectedPanel={this.getSelectedPanel}
              setSelectedPanel={this.setSelectedPanel}
              panelClicked={this.panelClicked}
              interactiveViewUrl=""
              pdfUrl="http://atlantecalvino.unige.ch/assets/viz-03-arcipelago.zip"
              text="I saggi non saranno oggetto della nostra analisi, che si limita all’opera narrativa. Ma stanno sullo sfondo, come un arcipelago di isole e isolotti che con questa visualizzazione si suggerisce di circumnavigare, per farsi un’idea di quale sia stata la biblioteca mentale di Calvino. Quasi duemila nomi, citati nel gran numero di saggi e articoli che lo scrittore ha pubblicato nell’arco di quarant’anni, vengono qui riuniti per indicare la via di una loro esplorazione inedita." 
            />

          </div>

      </div>
    );
  }
}
