import React from 'react'
import HamburgerIntroHeader from '../../headers/HamburgerIntroHeader/HamburgerIntroHeader';
import SlidingPanel from '../../general/SlidingPanel/SlidingPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

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
    this.state.selectedPanel = selectedPanel;
  }

  panelClicked(panelId)
  {
    this.setState({ selectedPanel : panelId });
console.log("panelClicked : ", panelId);
  }

  render()
  {
console.log("render compass");
    return (
      <div>
        <HamburgerIntroHeader />

          <div className="compass-main-description">
            <h1>Bussola</h1>
            <div><p>Prima di iniziare il viaggio, ci vuole una bussola. Per quello abbiamo creato tre visualizzazioni orientative, che aiutino a muoversi dentro l’intero corpus dell’opera e che siano sempre a portata di mano.
            Fornendo un colpo d’occhio sulla storia dei volumi, sulla vicenda dei racconti e sulla biblioteca mentale dell’autore.</p></div>
          </div>
          <div>
            <SlidingPanel id="1" open={this.state.selectedPanel >= 1} zIndex="1" openClassName="panel1-open" closedClassName="panel1-closed" title="Lische" getSelectedPanel={this.getSelectedPanel} setSelectedPanel={this.setSelectedPanel} panelClicked={this.panelClicked} interactiveViewUrl="http://atlantecalvino.unige.ch/lische/" pdfUrl="http://atlantecalvino.unige.ch/assets/viz-02-flussi.zip" text="I racconti sono la spina dorsale dell’opera di Calvino. Per questo abbiamo schierato gli oltre duecento titoli in un lungo elenco, che consente di ricostruire il flusso della storia editoriale dei racconti grazie a un’unica visualizzazione: dalla prima pubblicazione su giornali o riviste, fino alla raccolta nei volumi e alle varie ricomposizioni che questi ultimi subiscono nel corso del tempo." />
            <SlidingPanel id="2" open={this.state.selectedPanel >= 2} zIndex="2" openClassName="panel2-open" closedClassName="panel2-closed" title="Sinuosa" getSelectedPanel={this.getSelectedPanel} setSelectedPanel={this.setSelectedPanel} panelClicked={this.panelClicked} interactiveViewUrl="http://atlantecalvino.unige.ch/sinuosa/" pdfUrl="http://atlantecalvino.unige.ch/assets/viz-01-sinuosa.zip" text="Si tratta di una mappa sintetica, che segue l’andamento dei quattro decenni della carriera letteraria di Calvino, mostrando gli snodi più importanti della sua storia editoriale: i principali volumi e le collaborazioni giornalistiche. La divisione per generi permette di seguire le oscillazioni tra forma breve e lunga, le sperimentazioni sulla struttura, l’articolarsi inquieto dell’opera in cerca della sua giusta forma." />
            <SlidingPanel id="3" open={this.state.selectedPanel >= 3} zIndex="3" openClassName="panel3-open" closedClassName="panel3-closed" title="Reti" getSelectedPanel={this.getSelectedPanel} setSelectedPanel={this.setSelectedPanel} panelClicked={this.panelClicked} interactiveViewUrl="" pdfUrl="http://atlantecalvino.unige.ch/assets/viz-03-arcipelago.zip" text="I saggi non saranno oggetto della nostra analisi, che si limita all’opera narrativa. Ma stanno sullo sfondo, come un arcipelago di isole e isolotti che con questo strumento si può circumnavigare, per farsi un’idea di quale sia stata la biblioteca mentale di Calvino. Quasi duemila nomi, citati nel gran numero di saggi e articoli che lo scrittore ha pubblicato nell’arco di quarant’anni, vengono qui riuniti per consentirne un’esplorazione inedita. " />
          </div>
{/*
          <div>
            <SlidingPanel open="true">
              Lische<br />
              Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich. Vogel Quax zwickt Johnys Pferd Bim. Sylvia wagt quick den Jux bei Pforzheim. Polyfon zwitschernd aßen
            </SlidingPanel>
            <SlidingPanel open="false">
              Sinuosa<br />
              Vogel Quax zwickt Johnys Pferd Bim. Sylvia wagt quick den Jux bei Pforzheim. Polyfon zwitschernd aßen Mäxchens Vögel Rüben, Joghurt und Quark. „Fix, Schwyz!“ quäkt Jürgen blöd vom Paß. Victor jagt zwölf Boxkämpfer quer über den großen Sylter Deich. Falsches Üben von Xylophonmusik quält jeden größeren Zwerg. Heizölrückstoßabdämpfung.Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch Bayern. Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich.
            </SlidingPanel>
            <SlidingPanel open="false">
              Reti<br />
              Seit 1975 fehlen in den meisten Testtexten die Zahlen, weswegen nach TypoGb. 204 § ab dem Jahr 2034 Zahlen in 86 der Texte zur Pflicht werden. Nichteinhaltung wird mit bis zu 245 € oder 368 $ bestraft. Genauso wichtig in sind mittlerweile auch Âçcèñtë, die in neueren Schriften aber fast immer enthalten sind. Ein wichtiges aber schwierig zu integrierendes Feld sind OpenType-Funktionalitäten. Je nach Software und Voreinstellungen können eingebaute Kapitälchen, Kerning oder Ligaturen (sehr pfiffig) nicht richtig dargestellt werden.Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle Buchstaben da sind und wie sie aussehen.
            </SlidingPanel>
          </div>
*/}
{/*
          <div id="fishbones" ref={ fishbones => this.fishbones = fishbones }>Lische</div>
          <div id="winding">Sinuosa</div>
          <div id="networks">Reti</div>
*/}
      </div>
    );
  }
}
